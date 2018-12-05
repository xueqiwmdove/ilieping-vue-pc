
<template xmlns="http://www.w3.org/1999/html">
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
          <!--start-->
          <!--行业地区弹窗-->
          <div class="masking" v-show="isShowMasking"></div>
          <div class="industryArea blance_alert" v-show="isShowIndustry">
            <div class="alert_header">
              地区/行业
              <img src="../../assets/img/dismission/ic_close.svg" alt="" class="pull-right" @click="closeAlertFun()">
            </div>
            <div class="alert_body">
              <div class="industryBox">
                <label>行业</label>
                <el-select v-model="industry" placeholder="请选择行业" id="industry" @change="getIndustryId">
                  <el-option
                    v-for="(item,key) in industryData"
                    :key="key"
                    :label="item.enumValue"
                    :value="item.enumCode">
                  </el-option>
                </el-select>
                <!--<em class="triangleBottom"></em>-->
              </div>
              <div class="areaBox">
                <label >地区</label>
                <el-select v-model="area" filterable placeholder="请选择地区" id="area">
                  <el-option
                    v-for="(item,key) in areaData"
                    :key="key"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>

                <!--<input type="text" placeholder="请选择地区" id="area" onclick="$(this).next().next('.areaPullDown').toggle()">
                    <em class="triangleBottom"></em>
                     <div class="areaPullDown">
                         <input type="text" class="areaSearch" placeholder="请输入地区首字母或名称检索">
                         <ul>
                             <li ng-repeat="item in cityArr">{{item}}</li>
                         </ul>
                     </div>-->
              </div>
              <div class="phone-error-info">
                <img src="../../assets/img/reg/info.svg" alt="提示">
                <span>请选择该离职人员所处的行业与地区</span>
              </div>
            </div>
            <div class="alert_footer">
              <input type="button" value="提交" class="submit" @click="submit_quick" :disabled="disabled" :class="click_opacity2">
            </div>

          </div>
         <!-- <industryArea ref="mychild"  v-show="isShowIndustry"></industryArea>-->

          <p class="headline">
            <router-link to="/twoUpload">上传离职评价</router-link>
            <a class="active">快速评价</a>
          </p>
          <!--成功提示-->
          <div class="uploadLeaveSetp6" v-if='isSuccess'>
            <div class="uploadLeaveConfirm">
              <img src="../../assets/img/dismission/ic_success.svg" class="uploadLeaveimg" alt="">
              <div class="uploadLeaveContent">
                <p>该员工离职报告已成功上传至联盟数据库</p>
                <span class="text-center" v-if="integral==5">职场诚信积分<i style="color: #f95714;">+{{integral}}</i>，已发送至您的账户</span>
              </div>
            </div>
            <div class="btn_div">
              <button class="uploadLeaveSetup4 active btn_w"  @click="goUpload"> 查看我的上传</button>
              <button class="uploadLeaveSetup4 active btn_w2" @click="goTwoUpload">继续上传</button>
            </div>
          </div>
          <!--快速评价-->
          <div class="uploadLeaveSetp2" v-if="!isSuccess">
            <!--个人资料-->
           <!-- <personData ref="personChild" ></personData>-->
            <personData :sendData="sendData" ></personData>
            <!--工作经历-->
            <!--<workExperience ref="workChild"></workExperience>-->
            <workExperience :sendData="sendData"></workExperience>

            <p class="uploadTitle">
              离职原因（必填）
            </p>
            <div class="uploadLeaveInfo3" id="leaveReason">
              <!--layui-form-->
              <div class="step_blance">
                <!--<leaveReason ref="leaveChild"></leaveReason>-->
                <leaveReason :sendData="sendData"></leaveReason>
                <div class="item">
                  <label style="width: auto;vertical-align: top;">一句话点评</label>
                  <textarea class="dimissionDescribe" id="dimissionDescribe" name="dimissionDescribe" v-model="dimissionDescribe" @input="descInput" maxlength="1000" style="width: 94.5%;height: 107px;" placeholder="请输入工作职责、任务及取得的成绩等"></textarea>
                  <div class="decribe" >
                    {{wordCount}}/1000字
                  </div>
                </div>
              </div>
            </div>
            <div class="submitBox text-center">
              <input type="button" value="确认上传" id="rapidButton"    @click="show_Industry_alert" :class="click_opacity" :disabled="ctrl_disabled" ><!--:disabled="ctrl_disabled" :class="click_opacity"-->
            </div>
          </div>
          <!--end-->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
  import http from '@/http/http';
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import personData from '@/components/common/personData';
  import workExperience from '@/components/common/workExperience';
  import leaveReason from '@/components/common/leaveReason';
  // import industryArea from '@/components/common/industryArea';


  export default {
    name: "quickUpload",
    components:{
      pageheader,
      pageaside,
      personData,
      workExperience,
      leaveReason,
      // industryArea
    },
    data(){
      return{
        isShowMasking:false,
        isShowIndustry:false,
        industry:'',
        industryData:[],
        area:'',
        areaData:[
          '全国','北京市','上海市','天津市','重庆市','河北省','山西省','内蒙古','辽宁省','吉林省','黑龙江省','江苏省','浙江省','广西','安徽省',
          '福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','海南省','四川省','贵州省','云南省','西藏','陕西省','甘肃省','青海省',
          '宁夏','新疆','台湾','香港','澳门'
        ],
        // ctrl_disabled:true,
        // click_opacity:'click_opacity',
      /*  click_opacity2:'click_opacity',
        disabled:true,*/
        personChild:'',
        workChild:'',
        leaveChild:'',
        dimissionDescribe:'',
        obj:'',
        sendData:{//个人资料
          name:'',
          birthDate: '',
          sex:'',
          cardNumber:'',
          phone:'',

          workTime:'',
          post:'',
          department:'',
          workDescribe:'',
          enterpriseName:'',
          workType:'',

          isActivePassivity:'',
          checkedId:'',//选中离职原因id
          reasonContent:'',//选中离职原因content,
          liValue:'个人原因'
        },
        wordCount:0,
        isSuccess:false,
        integral:5,
      }
    },
    watch:{

    /*  personChild(){
        this.$refs.personChild.name;
        console.log(12+this.$refs.personChild.name)
      },*/
        // parent(){
        //   this.$.refs.mychild.closeAlertFun()
        // }


    },
    computed:{
      disabled(){
        let that=this;
        if(that.industry!=""&&that.area!=""){
          return false
        }else{
          return true
        }
      },
      click_opacity2(){
        let that=this;
        if(that.industry!=""&&that.area!=""){
          return{
            click_opacity:false
          }
        }else{
          return{
            click_opacity:true
          }
        }
      },
      //样式控制
      ctrl_disabled:function() {
        let that=this;
        // console.log(that.sendData.name);
        if(
          that.sendData.name!=""&&
          that.sendData.birthDate!=""&&
          that.sendData.sex!=""&&
          that.sendData.cardNumber!=""&&
          that.sendData.phone!=""&&
          that.sendData.workTime[0]!=""&&
          that.sendData.workTime[1]&&
          that.sendData.workType!=""&&
          that.sendData.department!=""&&
          that.sendData.post!=""&&
          that.sendData.reasonContent&&
          that.sendData.liValue!=""
        ){
          return false;
        }else{
          return true;
        }
      },
      //禁用控制
      click_opacity:function () {
        let that=this;
        if(that.sendData.name!=""&&that.sendData.birthDate!=""&&that.sendData.sex!=""&&that.sendData.cardNumber!=""
          &&that.sendData.phone!=""&& that.sendData.workTime[0]!=""&&that.sendData.workTime[1]&&that.sendData.workType!=""
          &&that.sendData.department!=""&&that.sendData.post!=""&&that.sendData.reasonContent&&that.sendData.liValue!="")
        {
          return {
            click_opacity:false
          }
        }else{
          return {
            click_opacity:true
          }
        }
      },
    },
    methods:{
      descInput(){//统计textarea 输入字数
        this.wordCount=this.dimissionDescribe.length;
      },

      //获取下拉行业的数据
      getIndustryData(){
        let that=this;
        that.$http({
          url:api.industry,
          method:'get',
          headers:headers()
        }).then(function (res) {
          console.log(res);
          let result=res.data;
          console.log(result);
          if(result.code==10000){
            that.industryData=result.data.valueList;
            console.log(that.industryData)
          }
        })
      },
        //获取行业的id
      getIndustryId(value){//这个vId也就是value值
        let that=this;
        that.obj = {};
        that.obj = that.industryData.find((item)=>{//这里的userList就是上面遍历的数据源
          // console.log(item.enumCode)
          return item.enumCode == value;//筛选出匹配数据
        });
        console.log(that.obj.enumCode);//我这边的name就是对应label的
      },

        //关闭弹窗
      closeAlertFun(){
        let that=this;
        that.isShowIndustry=false;
        that.isShowMasking=false;
      },
      //显示行业地区弹窗
      show_Industry_alert() {
        let that=this;
        that.isShowMasking=true;
        that.isShowIndustry=true;
        //判断必填项不为空
      /*  if(that.$refs.personChild.name!="" && that.$refs.personChild.birthDate!="" && that.$refs.personChild.sex!="" && that.$refs.personChild.cardNumber &&
          that.$refs.personChild.phone && that.$refs.workChild.enterpriseName!="" &&  that.$refs.workChild.workTime[0]!="" && that.$refs.workChild.workTime[1] &&
          that.$refs.workChild.workType && that.$refs.workChild.department && that.$refs.workChild.post && that.$refs.leaveChild.isActivePassivity!="" &&   that.$refs.leaveChild.checkedId!="")
        {
          that.isShowMasking=true;
          that.isShowIndustry=true;
        }else{
          that.$message.error("还有必填项没填完！");
        }*/


      },
      //提交上传离职
      submit_quick(){
       let that=this;

        that.$http({
          url:api.quickUpload,
          method:"post",
          headers:headers(),
          data:{
            userInfo:{
              userName:that.sendData.name,
              birthDate:that.sendData.birthDate,
              userSex:that.sendData.sex,
              cardNumber:that.sendData.cardNumber,
              phoneUser: that.sendData.phone
            },
            workExperience:{
              corporateName:that.sendData.enterpriseName,
              startJobTime:  that.sendData.workTime[0],
              endJobTime: that.sendData.workTime[1],
              workType:that.sendData.workType,
              deptName:that.sendData.department,
              postName:that.sendData.post,
              workDescribe:that.sendData.workDescribe
            },
            dimissionReason:{
              dimissionType:that.sendData.isActivePassivity,
              dimissionReasonType:that.sendData.checkedId,//leaveReasonType,
              dimissionDescribe:that.dimissionDescribe
            },
           /* userInfo:{
              userName:that.$refs.personChild.name,
              birthDate:that.$refs.personChild.birthDate,
              userSex:that.$refs.personChild.sex,
              cardNumber:that.$refs.personChild.cardNumber,
              phoneUser: that.$refs.personChild.phone
            },
            workExperience:{
              corporateName:that.$refs.workChild.enterpriseName,
              startJobTime:  that.$refs.workChild.workTime[0],
              endJobTime: that.$refs.workChild.workTime[1],
              workType:that.$refs.workChild.workType,
              deptName:that.$refs.workChild.department,
              postName:that.$refs.workChild.post,
              workDescribe:that.$refs.workChild.workDescribe
            },
            dimissionReason:{
              dimissionType:that.$refs.leaveChild.isActivePassivity,
              dimissionReasonType:that.$refs.leaveChild.checkedId,//leaveReasonType,
              dimissionDescribe:that.dimissionDescribe
            },*/
            evaluationReport:{
              industry:that.obj.enumCode,//init 类型
              ownArea:that.area,
              reportType:3
            }
          }
        }).then(function (res) {
          let result=res.data;
          // console.log(result);

          that.isShowMasking=false;
          that.isShowIndustry=false;

          if(result.code==10000 ){
              if(result.integral==5){
                that.integral=5;
                that.isSuccess=true;

              }else{
                that.integral=0;
                that.isSuccess=true;
              }

            //that.$router.push('/myupload');
            // this.$router.push({name: 'myupload'})
          }
        })
      },

      goUpload(){
        this.$router.push('/myupload')
      },
      goTwoUpload(){
        this.$router.push('/twoUpload')
      }

    },
    mounted(){
      //页面加载调用方法
      let that=this;
      that.getIndustryData();


    }
  }
</script>

<style scoped>
  .masking{
    z-index: 100;
  }
  .industryArea{
    z-index:101;
  }
  .text-center{
    text-align: center;
  }
  .click_opacity{
    opacity: 0.6;
  }
  #leaveReason{
    position: relative;
  }
  .decribe{
    color:rgba(151,162,179,1);
    text-align: right;
    margin-top: 12px;
    position: absolute;
    right: 30px;
    bottom: 5px;
  }
  span.text-center{
    display: inline-block;
    margin: 15px 0 0;
    height: 20px;
    font-size: 14px;
    color: #748093;
    line-height: 20px;
  }
  .uploadLeaveConfirm{
    padding: 82px 0 96px;
  }
  .btn_div{width: 100%;background: #ffffff;text-align: center;}
  .btn_div .btn_w{width: 160px;margin: 10px 10px;background: transparent;color:#F95714;border: 1px solid #F95714;}
  .btn_div .btn_w2{width: 160px;margin: 10px 10px}
  .dimissionDescribe{
    margin: 10px 0 0;
  }
</style>
