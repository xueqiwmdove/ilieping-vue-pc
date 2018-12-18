<template >
  <!--候选人信息弹窗-->
  <el-dialog  title="候选人信息" :visible="addVisible"  custom-class="candidateSteps" :before-close="hideModel">
    <img src="../../assets/img/candidate/tanchuang_ic_save.png" class="save">
    <div class="addMain">
      <div class="personInfo">
        <p class="primary ">
          <span  class="name">张三</span>
          <span class="post">测试工程师.拉钩（主动搜索）</span>
          <span class="tag">内推</span>
        </p>
        <p class="minor">
          <span class="phone">15921720256</span>
          <span class="email">78995677900@163.com</span>
          <span class="sex">男 28</span>
          <span class="workExp">五年工作经验</span>
          <span class="address">上海</span>
        </p>
        <div class="fivesteps">
          <div class="onStep">
            <span class="up">1 <em></em></span>
            <span class="down">初筛</span>
          </div>
          <div>
            <span class="up">2<em></em></span>
            <span class="down">用人部门筛选</span>
          </div>
          <div>
            <span class="up">3<em></em></span>
            <span class="down">面试</span>
          </div>
          <div>
            <span class="up">4<em></em></span>
            <span class="down">offer/录用</span>
          </div>
          <div>
            <span class="up">5</span>
            <span class="down">待入职</span>
          </div>
        </div>
        <ul class="change_tab_title">
          <li :class="step==1?'active':''" @click="changeTab(1)">基本信息</li>
          <li :class="step==2?'active':''" @click="changeTab(2)">面试</li>
          <li :class="step==3?'active':''" @click="changeTab(3)">offer/录用</li>
          <li :class="step==4?'active':''" @click="changeTab(4)">备注</li>
          <li :class="step==5?'active':''" @click="changeTab(5)">附件管理</li>
          <li :class="step==6?'active':''" @click="changeTab(6)">操作记录</li>
        </ul>
      </div>

      <div class="candidate_content">
       <el-scrollbar style="height:100%">
          <basicFirst  v-show="step==1"></basicFirst>
          <interviewSecond   v-show="step==2"></interviewSecond>
          <offerThird v-show="step==3"></offerThird>
          <remarkForth v-show="step==4"></remarkForth>
          <accessoryFifth v-show="step==5"></accessoryFifth>
          <opsRecordSeventh v-show="step==6"></opsRecordSeventh>
       </el-scrollbar>
      </div>
      <!--<candidateContent></candidateContent>-->
      <candidateRight @showmodel1="showmodel1" @showmodel2="showmodel2" @showmodel3="showmodel3"  @listento-flag="getFlag"></candidateRight>
      <!--右边-->

    <!-- 弹窗推荐人 -->
       <div v-if="conShow" class = "cov"  v-clickoutside="handleClose2">
        <div class = "con create_dialog">
            <p class = "ptitle">推荐给用人部门 <i @click="hideModel2" class="el-icon-close closes_s"></i></p>
             <div class="rescs">
                <el-form :model="cerateList"  ref="cerateList" id="re_styles">
                        <el-form-item label="推荐到" style="text-align:center;" >
                          <!-- <span style="margin-right:23px;"></span> -->
                            <div v-if="isflag" class="manage_se">
                                <ul>
                                    <li>
                                        <span class="name_f">{{showList.employeeName?showList.employeeName.substr(0, 1):''}}</span> 
                                        <span style="float:left;">
                                            <p>{{showList.employeeName}}</p> 
                                            <p>{{showList.deptName}}-{{showList.position}}</p>    
                                        </span>
                                    </li>
                                </ul>
                          </div>
                        <el-input v-else style="width:280px;height:40px;"  @click.native="ldClick"  v-model="cerateList.name"  placeholder="选择招聘负责人"  class="el-icon-arrow-down"></el-input>
                                <div v-if="ldVisabled" class="form_tree tree_sty manage_sty " >
                                    <el-scrollbar style="height:100%" >   
                                        <div style="height:100%">
                                        <div class="search">
                                            <el-input  class="input_search" v-model="names" placeholder="输入你想搜索的内容" >
                                                <i @click="searchName()" slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                                            </el-input>
                                        </div>
                                        <ul>
                                            <li @click="selectItem(item)" v-for="(item,index) in employeeList" :key='index'>
                                                <span class="name_f">{{item.employeeName.substr(0, 1)}}</span> 
                                                <span style="float:left;">
                                                    <p>{{item.employeeName}}</p> 
                                                    <p>{{item.deptName}}-{{item.position}}</p>    
                                                </span>
                                            </li>
                                        </ul>
                                        </div>  
                                    </el-scrollbar> 
                                </div>
                        </el-form-item>
                        <el-form-item label="推荐理由">
                            <el-input :rows="3" type="textarea" style="width:280px;margin-left:20px;" placeholder="请输入推荐理由（如名校经历等）"></el-input>
                        </el-form-item> 
                        <el-form-item label="使用简历" >
                          <!-- <span style="margin-right:23px;">使用简历</span> -->
                            <el-radio-group v-model="type">
                                <el-radio-button label="0" >原始简历</el-radio-button>
                                <el-radio-button label="1">标准简历</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
              </el-form>
             </div>
            <div slot="footer" class="dialog-footer">
                    <el-button  type="primary" :class="searchBtnClass1" :disabled="searchDisabled1"   style="height:36px;" >保存</el-button>
            </div>  
        </div>
      </div>
      <!-- 弹窗备注 -->
      <div v-if="beizhu" class = "cov"  v-clickoutside="handleClose2">
        <div class = "con create_dialog" style="height:340px;">
            <p class = "ptitle">备注 <i @click="hideModel2" class="el-icon-close closes_s"></i></p>
             <div class="rescs beires" style="height:220px;">
               <el-form>
                  <el-form :model="cerateList"  ref="cerateList" id="re_styles">
                    <span class="title_bei">输入对该候选人的备注</span>
                     <el-input :rows="4" type="textarea" v-model="text" style="width:460px;margin-left:60px;" placeholder="请输入内容"></el-input>
                </el-form>
               </el-form>
             </div>
            <div slot="footer" class="dialog-footer">
                    <el-button  type="primary" :class="searchBtnClass2" :disabled="searchDisabled2"   style="height:36px;" >保存</el-button>
            </div>  
        </div>
      </div>

      <!-- 弹窗-淘汰候选人 -->
       <div v-if="quitdia" class = "cov"  v-clickoutside="handleClose2">
        <div class = "con create_dialog" style="height:400px;">
            <p class = "ptitle">淘汰候选人 <i @click="hideModel2" class="el-icon-close closes_s"></i></p>
             <div class="rescs beires" style="height:220px;">
                <el-form :model="cerateList"  ref="cerateList" id="re_styles reset_styless">
                    <span class="title_quit"><i><img src="../../assets/img/zhiwei/cuowu.png" alt=""></i> 此候选人将被归档到人才库，请选择归档原因</span>
                     <el-form-item label="淘汰原因" style="margin-left:31px;" >
                          <el-select style="width:280px;height:40px;" v-model="text" placeholder="请选择工作经验">
                              <el-option label="胜任力不足" value="0"></el-option>
                              <el-option label="没有回应" value="1"></el-option>
                              <el-option label="淘汰" value="2"></el-option>
                              <el-option label="与公司文化不符合" value="2"></el-option>
                              <el-option label="福利待遇不匹配" value="2"></el-option>
                              <el-option label="待定" value="2"></el-option>
                          </el-select>
                     </el-form-item>
                     <el-form-item label="具体原因(选填)" >
                        <el-input :rows="4" type="textarea" v-model="text" style="width:280px;margin-left:-4px;" placeholder="请输入内容"></el-input>
                     </el-form-item>
               </el-form>
             </div>
            <div slot="footer" class="dialog-footer">
                 <el-button  type="primary" :class="searchBtnClass3" :disabled="searchDisabled3"   style="height:36px;" >保存</el-button>
            </div>  
        </div>
      </div>
    </div>
         
  </el-dialog>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import candidateContent from '@/components/candidate/common/candidateContent';
  import basicFirst from '@/components/candidate/common/basicFirst';
  import interviewSecond from '@/components/candidate/common/interviewSecond';
  import offerThird from '@/components/candidate/common/offerThird';
  import remarkForth from '@/components/candidate/common/remarkForth';
  import accessoryFifth from '@/components/candidate/common/accessoryFifth'
  import opsRecordSeventh from '@/components/candidate/common/opsRecordSeventh'
  // import addreviews from '@/components/candidate/commons/addreviews';
  // import weekOutAlert from '@/components/candidate/common/weekOutAlert'
  // import remarkAlert from '@/commponents/candidate/common/remarkAlert'

  import candidateRight from '@/components/candidate/common/candidateRight';
  import {checkMobile,compareDate,isNumber,isEmail} from '@/assets/js/common/verify.js'
  import {formatDate} from '@/assets/js/common/date_year.js';
  // duanyanhong
// 2018.12.2
// 自定义控制员工架构下拉框点击空白处隐藏
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};
    export default {
        name: "candidateSteps",
        props:['addVisible'],
        components:{
          candidateContent,
          basicFirst,
          interviewSecond,
          offerThird,
          remarkForth,
          accessoryFifth,
          opsRecordSeventh,
          candidateRight,

          // weekOutAlert,
          // remarkAlert
        },
      data(){
          return{
            // addVisible:true,
            step:1,
            conShow:false,//推荐人
            beizhu:false,//备注
            quitdia:false,//淘汰候选人
            employeeList:[],//员工集合
            isflag:false,
            ldVisabled:false,
            showList:[],
            text:'',
            names:'',//搜索人员名称
            type:'',
            cerateList:{
                region:'',
                name:''
            },
              cerateList:{
              type:'',
            },
          }
      },
      computed:{
        // 选择负责人提交按钮样式
            searchBtnClass1:function () {
            if(this.showList.employeeName ){
                return{
                    click_opacity:false
                }
            }else{
                return{
                    click_opacity:true
                }
            }
            },
            // 选择负责人提交禁用 true
            searchDisabled1:function () {
                if(this.showList.employeeName ){
                    return false
                }else{
                    return true
                }
          }, 
           // 备注提交按钮样式
            searchBtnClass2:function () {
            if(this.text !='' ){
                return{
                    click_opacity:false
                }
            }else{
                return{
                    click_opacity:true
                }
            }
            },
            // 备注提交禁用 true
            searchDisabled2:function () {
                if(this.text !='' ){
                    return false
                }else{
                    return true
                }
          }, 
             // 备注提交按钮样式
            searchBtnClass3:function () {
            if(this.text !='' ){
                return{
                    click_opacity:false
                }
            }else{
                return{
                    click_opacity:true
                }
            }
            },
            // 备注提交禁用 true
            searchDisabled3:function () {
                if(this.text !='' ){
                    return false
                }else{
                    return true
                }
          }, 
      },
      directives: {clickoutside},
      methods:{
    //获取面试官，负责人列表  
        getEmployeeList() {
            let that = this
            let currPage=that.pageIndex || 1;
            let pageSize=that.pageSize || 10;
            let employeeName = that.names || ''
            this.$http({
            method:"post",
            url:api.getEmployeeList,
            headers:headers('application/json;charset=utf-8'),
            data:{
            "currPage":currPage,
            "pageSize":pageSize,
            'employeeName':employeeName
            },
            cache:false
            }).then(function(res){
            if(res.data.code==10000 || res.data.data==null){
                that.employeeList = res.data.data
            }else{
            that.$message.error(res.data.msg);
            }
            });
        },
        showmodel1() {
          this.conShow=true
        },
        showmodel2() {
          this.beizhu=true
        },    
        showmodel3() {
          this.quitdia=true
        },
       handleClose2() {//点击空白处收起弹窗
       console.log(333)
        this.conShow=false
        this.beizhu=false
        this.quitdia=false
      },
    //选择招聘负责人 
        selectItem(val) {
            this.ldVisabled=false
            this.isflag = true
            this.showList = val
          },
        //招聘负责人  
        ldClick() {
            this.getEmployeeList()
            this.ldVisabled = !this.ldVisabled
        },
    //搜索
        searchName() {
            this.getEmployeeList()
        },
        changeTab(flag){
          this.step=flag;
        },
        getFlag(flag){
          this.step=flag;//子组件穿过的flag值，赋值给step；
          // console.log('接收的数据--------->'+flag)
        },
    //  关闭弹窗
        hideModel(){
          this.conShow=false
          let that=this;
          that.$emit('hideModel','steps');//向父组件派发事件
        },
        hideModel2(){
          this.conShow=false
          this.beizhu = false
          this.quitdia =false
          this.showList=[]
        },
      }
    }
</script>

<style  scoped>
.candidate_content {
  height: 765px;
}
.modal_open {
    position: fixed;
 }
.cov{
	width:1900px;
	height:1200px;
	background-color:rgba(0, 0, 0, 0.2);
	z-index:100000;
  /* display:none; */
  left: -351px;
  top: 0;
	position:absolute;
	text-align:center;
	font-size: 16px;
	box-shadow:0px 0px 5px black;
}
.con{
	z-index:110000;
	width:540px;
	height:400px;
	background-color:white;
	position:fixed;
	right:36%;
	top:30%;
	position:fixed;
}
.ptitle{
	width:100%;
  height:60px;
  line-height:60px;
  background-color:#fff;
  border-bottom: 1px solid #E5E5E5;
	font-size: 16px;
  color: #21324E;
}
.ptitle .closes_s {
  float: right;
  margin-top: 20px;
  margin-right: 20px;
  color: #A8ABB3 ;
  font-size: 18px;
  cursor: pointer;
}

.dbt{
	border-radius: 5px;
    width: 70px;
	height:30px;
	background-color:#3daae9;
	right:20px;
	bottom:20px;
	position:absolute;
	line-height:30px;
	color:white;
}
/* 弹窗 开始 */
.create_dialog .el-icon-arrow-down:before {
    content: "\E603";
    position: absolute;
    top: 15px;
    left: 210px;
    color: #AAADB5;
    cursor: pointer;
}
.create_dialog .manage_sty {
    left: 16%;
    width: 280px; 
}
.manage_sty .search {
    float: right;
    width: 400px;
    height: 40px;
    margin-top: 30px;
    position: relative;
    left: -25px;
}
.manage_sty .search .input_search {
    width: 260px;
    position: absolute;
    top:-21px;
}
.manage_sty .search .input_search .se_icon {
    position: absolute;
    right:-208px;
    height: 30px;
    top:8px;
    font-size: 18px;
    font-weight: 700;
    border-left: 1px solid #E5E5E5;
    color: #F95714;
}
.manage_sty .search .el-icon-search:before {
    content: "\E619";
    margin-left: 2px;
}
.createBut {
     background: #F95714;
     border-radius: 4px;
     height: 40px;
     width: 220px;
     color: #fff;
     margin-top: 100px;
     margin-left:35%;
}
.form_tree {
    width:300px;
    height:280px;
    border: 1px solid #E5E5E5;
    text-align:center;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 44;
    position: absolute;
    background-color: #fff;
}
.manage_sty  ul li .name_f{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color:#66ADFF ;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    float: left;
    margin-right: 10px;
    margin-left:20px;
}
.manage_sty  ul {
    padding-top:55px;
}
.manage_sty  ul li  p {
    height: 30px;
    text-align: left;
    line-height: 30px;
}
.manage_sty ul li {
    height: 60px;
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
    line-height: 50px;
}
.manage_se  ul li .name_f{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color:#66ADFF ;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    float: left;
    margin-right: 10px;
    margin-left:30px;
}
.manage_se ul li  p {
    height: 30px;
    text-align: left;
    line-height: 30px;
}
.manage_se ul li {
    height: 60px;
    width: 100%;
    margin-top: 5px;
    cursor: pointer;
    line-height: 50px;
}
#re_styles .el-radio-button, .el-radio-button__inner {
    margin-right: 20px; 
    height: 40px;
    width: 90px;
    border-color: #E5E5E5;
    border-radius: 5px;
}
#re_styles .el-radio-button, .el-radio-button__inner:nth-child(2) {
    border-left: 1px solid #E5E5E5;
}
.rescs {
  width: 100%;
  height: 280px;
  padding: 20px 40px;
  padding-left:80px;
}
.beires {
  width: 100%;
  height: 280px;
  padding: 20px 40px;
  padding-left:40px;
}
.title_bei,.title_quit {
  width: 100%;
  display: inline-block;
  text-align: left;
  font-size: 14px;
  margin-bottom: 15px;
  color: #394A66;
}
.title_quit {
color: #F95714 ;
}
.dialog-footer {
    height: 60px;
    position: absolute;
    width: 100%;
    bottom: 0;
    border-top: 1px solid #E5E5E5;
    background: #FAFBFC;
    line-height: 60px;
}
/* 弹窗 */
</style>
<style>
 .candidate_content .el-scrollbar__wrap {
  overflow-x: hidden !important;
 }
 .create_dialog .el-dialog__body {
    padding: 30px 70px;
    color: #606266;
    font-size: 14px;
}

#re_styles .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background-image: url('../../assets/img/zhiwei/zhiwei_ic_choose.png');
    background-repeat:no-repeat;
    background-position:100% 100%;
    border-color:#F95714;
    background-color: #fff;
    color:#F95714;
}
.create_dialog .manage_sty .el-scrollbar__wrap {
     overflow-x: hidden !important;
 }
 #re_styles .el-textarea__inner  {
     margin-left:-55px;  
 }
 #re_styles .el-input__inner {
     margin-left:-80px;  
 } 
 #reset_styless .el-input__inner  {
     margin-left:-55px; 
 }
 #re_styles .el-form-item__label  {
     margin-right:20px;
 }
#re_styles .el-radio-group {
    margin-right: 111px;
}
.beires #re_styles .title_quit .el-input__suffix {
  right: 50px !important  ;
}
</style>

