<template>
  <div>
    <div class="main">
      <!--顶部导航-->
      <pageheader class="pageheader"></pageheader>
      <!--侧边栏-->
      <div class="aside">
        <pageaside></pageaside>
      </div>
      <!--右侧内容栏-->
      <div class="right-content pull-right">
        <div class="content">
          <!--主体内容-->
          <el-dialog
            title=""
            :visible.sync="editorAlert"
            class="editorAlert"
            custom-class="editorAlertContent">
            <el-row class="warp">
              <el-col :span="24" class="warp-main">
                <el-form label-width="50px">
                  <el-form-item label="标题" >
                    <el-input v-model="title" placeholder="新条目名称（可为空）"></el-input>
                  </el-form-item>

                  <el-form-item label="详细"  >
                    <div class="edit_container">
                      <UEditor :config=config ref="ueditor"></UEditor>
                    </div>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" class="confirm" @click="appendNewSingle">确 定</el-button>
              <el-button  class="cancel" @click="editorAlert=false">取 消</el-button>
            </span>
          </el-dialog>
          <p class="headline">
            <span>offer模板设置</span>
          </p>

          <div class="offerTemplateBox">
            <div v-html="emailData">

            </div>
           <!-- <div class="offerTemplate">
              &lt;!&ndash;<span class="img_top"></span>&ndash;&gt;
              <img src="http://ougpyv2il.bkt.clouddn.com/1.svg" alt="" class="img_top">
              <div class="templateContent">
                <p class="title">尊敬的<input type="text" id = "user_name" >：</p>
                <div>
                  <p>您好！欢迎您加入<input type="text" id="enterprise_name">在此荣幸的邀请您出任<input type="text" id="user_position">一职。</p>
                  <p>请您仔细阅读此录取通知书并及时保存；请您在收到录取通知书后，在规定日期内报到并办理入职。</p>
                </div>
                <div>
                  <p>１、报到信息：</p>
                  <p>请您在<input type="text" id="report_time">（时间）　来<input type="text" id="report_addr">（地址）办理报到；
                    报到联系人<input type="text" id = "report_contacts">,联系人电话<input type="text" id = "contacts_mobile">
                    逾期录取通知书将自动失效。</p>
                </div>
                <div>
                  <p>２、薪资待遇：</p>
                  <p>基本工资（日薪/月薪/年薪）<input type="text" id = "user_salary">元，奖金（月度/季度/年度）<input type="text" id = "salary_type">　</p>
                </div>
                <div>
                  <p>３、工作性质和试用期：</p>
                  <p>工作性质 <input type="text" id = "employee_type">，试用期 <input type="text" id = "probation"></p>
                </div>
                <div v-for="(item,index) in items" class="newElement"  @mouseover="hover_show=true" @mouseout="hover_show=false">
                  <p>{{4+index}}、{{title}}</p>
                  <p>{{content}}</p>
                  <div class="hover_show pull-right" v-show="hover_show">
                    <span class="hover_replace"></span>
                    <span class="hover_remove"></span>
                    &lt;!&ndash;<img src="../../assets/img/contract/ic_replace.svg" alt="" >&lt;!&ndash; @click=""&ndash;&gt;
                    <img src="../../assets/img/contract/faqi_ic_shanchu.svg" alt="">&ndash;&gt;
                  </div>
                </div>
                <p>期待您的加入！</p>
              </div>
              &lt;!&ndash;<span class="img_bottom"></span>&ndash;&gt;
              <img src="http://ougpyv2il.bkt.clouddn.com/1.svg" alt="" class="img_bottom">
            </div>-->
            <div class="buttonBox">
              <input type="button" value="添加新条目" class="addNewNum" @click="editorAlert=true">
              <input type="button" value="保存" class="save " @click="saveNew">
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
  import UEditor from '@/components/common/ueditor.vue'
  import breadcrumb from '@/components/common/breadcrumb'
  import {mapState,mapActions} from 'vuex'
  export default {
    name: 'setupTemplate',
    components: {
      pageheader,
      pageaside,
      UEditor,
      breadcrumb
    },
    data() {
      return {
        editorAlert:false,//富文本编辑器弹窗
        title: '',//标题
        config: {
          //可以在此处定义文本编辑器工具栏的内容
          toolbars: [
            [ 'undo', 'redo','|','bold', 'italic', 'underline', 'fontborder',
              '|', 'forecolor', 'backcolor','|', 'removeformat','|', 'insertorderedlist', 'insertunorderedlist',
              '|','selectall', 'cleardoc','|',
              'link','unlink']
          ],
          autoHeightEnabled: false,
          autoFloatEnabled: true,　　//是否工具栏可浮动
          initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
          autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
          initialFrameWidth: null,
          initialFrameHeight: 150,
          //关闭字数统计
          wordCount:false,
          //关闭elementPath
          elementPathEnabled:false,
          //更多其他参数，请参考ueditor.config.js中的配置项
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/ueditor/'
        },
        addFormVisible: false,
        //
        items:[],
        hover_show:false,
        emailData:[],
      }
    },
    watch: {},
    computed:{
    },
    methods: {
      //文本编辑器弹窗，确定按钮，将输入的信息
      appendNewSingle(){
        let that=this;
        let title=that.title;
        let content = that.$refs.ueditor.getContentTxt();

        let newitems = { title: title,content:content};

        that.items.push(newitems);//往items中添加newitems
        // console.log(that.items);

        let  newBox= document.getElementById('supplement');
        // console.log(1+newBox)
        let div=document.createElement("div");
        div.className='newElement';
        div.innerHTML = "<div class='newSingle'><p>"+newitems.title+"</p>\n" +
          " <p>"+newitems.content+"</p></div>" +
          "<div class='hover_show' v-show='hover_show'>"+
         /* " <em class=\"hover_replace\" @click='hoverReplace()' ></em>\n" +
          " <em class=\"hover_remove\" @click='hoverRemove()'></em>"+*/
          "</div>";

        if(newitems.content!=""){
          newBox.appendChild(div);
          // newBox.push(div);
          that.editorAlert=false;
        }
        // console.log(div)



      },


      //保存新条目
      saveNew(){
        let that=this;
        let  newBox= document.getElementById('supplement');
        // console.log(newBox.innerHTML)
        that.$http({
          url:api.updateOfferModel,
          method:'post',
          data:{
            id:1,
            variableContent:newBox.innerHTML
          },
          headers:headers()
        }).then((res)=>{
          // console.log(res)
          if(res.data.code=10000){
            that.editorAlert=false;
            that.$message.success("添加新条目成功！")
          }
        }).catch((res)=>{
            that.$message.error("添加新条目失败！")
        })
      },
      //展示模板
      showModel(){
        let that=this;
        that.$http({
          url:api.offerModelSearch+1,
          method:'get',
          headers:headers(),
        }).then(res=>{
          if(res.data.code==10000){
            that.emailData=res.data.data.fixedContent;
          }
        },error=>{
          that.$message.error("模板查询失败！");
        })
      }
    },
    mounted() {
      let that=this;
      that.showModel();
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
  .offerTemplateBox .offerTemplate .img_bottom, .offerTemplateBox .offerTemplate .img_top{
    height: 20px;
  }
  .offerTemplateBox .offerTemplate{
    font-family: "MicrosoftYaHei"!important;
  }
  .offerTemplate .templateContent   .hover_show{
    margin: -23px 0 0;
    /*display: none;*/
    display: inline-block;
    margin-right: 20px;
    width: 80px;
    height: 40px;
  }

  .offerTemplate .templateContent .newElement:hover .hover_replace{
    width: 16px;
    height: 15px;
    display: inline-block;
    margin: 0 5px;
    background: url(../../assets/img/contract/ic_replace.svg) no-repeat center;
  }
  .offerTemplate .templateContent .newElement:hover .hover_remove{
    width: 16px;
    height: 15px;
    margin: 0 5px;
    display: inline-block;
    background: url(../../assets/img/contract/faqi_ic_shanchu.svg) no-repeat center;
  }
  .hover_show .hover_replace,.hover_show .hover_remove{
    display:inline-block;
  }
  .hover_show img{
    cursor: pointer;
    margin: 0 10px;
  }
  .editorAlertContent{

  }
  .el-dialog.editorAlertContent .el-dialog__footer{
    border: none;
  }
  .offerTemplateBox{
    padding: 30px 45px 60px;
  }
  .offerTemplateBox .buttonBox{
    margin: 62px auto 0;
    text-align: center;

  }
  .offerTemplateBox .buttonBox input{
    height: 44px;
    border-radius: 4px;
    font-size: 16px;
    letter-spacing: 0;
    cursor: pointer;
    border: none;
    outline: none;
  }
  .offerTemplateBox .buttonBox .addNewNum,.offerTemplateBox .buttonBox .save{
    background: #FAFBFC;
    border: 1px solid #E5E5E5;
    color: #394A66;
  }
  .offerTemplateBox .buttonBox .addNewNum{
    width: 180px;
  }
  .offerTemplateBox .buttonBox .save{
    /*width: 120px;*/
    width: 180px;
    margin: 0 20px;
    background: #F95714;
    color: #fff;
  }
  .offerTemplateBox .buttonBox .saveAndSend{
    width: 200px;
    background: #F95714;
    color: #fff;
  }
  .offerTemplate{
    width: 100%;
    border: 1px solid #E5E5E5;
    /*padding: 0 30px;*/
    font-size: 0;
    background:#F9F9F9;
  }
  .img_top{
    width:100%;
  }
  .img_bottom{
    width: 100%;
    transform: rotate(180deg);
  }
  .offerTemplate p.title{
    color: #394A66;
    margin-bottom: 30px;
  }
  .offerTemplate p{
    font-size: 16px;
    /*height: 20px;*/
    line-height: 20px;
    color: #748093;
    letter-spacing: 0;
    margin-bottom: 10px;
  }
  .templateContent{
    padding: 0 30px;
  }
  .templateContent div{
    margin-bottom: 40px;
  }
  .templateContent input{
    width: 200px;
    border: none;
    background: none;
    border-bottom: 1px solid #748093;
    text-align: center;
    margin: 0 10px;
    outline: none;
    font-size: 16px;
    color: #1B002A;
    font-weight: bold;

  }
  #user_name,#employee_type{
    width: 100px;
  }
  #report_contacts,#probation,#user_salary,#user_position{
    width: 120px;
  }
  #contacts_mobile,#salary_type{
    width: 130px;
  }
  #report_time{
    width: 150px;
  }
</style>
