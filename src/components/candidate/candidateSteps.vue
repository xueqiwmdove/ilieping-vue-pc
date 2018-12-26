<template >
  <!--候选人信息弹窗-->
  <el-dialog title="候选人信息" :visible="addVisible"  custom-class="candidateSteps" :before-close="hideModel">
    <img src="../../assets/img/candidate/tanhcuang_ic_editor.png" class="save">
    <div class="addMain">
      <div class="personInfo" v-for="(item,index)  in candidateStepsData" :key="index">
        <p class="primary ">
          <span  class="name">{{item.candidateName}}</span>
          <span class="post">{{item.postName}}.{{item.resumeChannelStr}}（<i v-if="item.resumeSource==0">主动搜索</i><i v-if="item.resumeSource==1">候选人投递</i>）</span>
          <span class="tag">内推</span>
        </p>
        <p class="minor">
          <span class="phone">{{item.candidatePhone}}</span>
          <span class="email">{{item.candidateEmail}}</span>
          <span class="sex" v-if="item.candidateSex==1">男 {{item.candidateAge}}</span>
          <span class="sex" v-if="item.candidateSex==0">女 {{item.candidateAge}}</span>
          <span class="workExp" v-if="item.candidateExperience!=0">{{item.candidateExperience}}年工作经验</span>
          <span class="workExp" v-if="item.candidateExperience==0">无年工作经验</span>
          <span class="address">{{item.candidateLocation}}</span>
        </p>
        <div class="fivesteps">
          <div class="onStep">
            <span class="up">1 <em></em></span>
            <span class="down">初筛</span>
          </div>
          <div :class="status1==2 || status1==3 || status1==4 || status1==5?'onStep':''">
            <span class="up">2<em></em></span>
            <span class="down">用人部门筛选</span>
          </div>
          <div :class="status1==3 || status1==4 || status1==5?'onStep':''">
            <span class="up">3<em></em></span>
            <span class="down">面试</span>
          </div>
          <div :class="status1==4 || status1==5?'onStep':''">
            <span class="up">4<em></em></span>
            <span class="down">offer/录用</span>
          </div>
          <div :class="status1==5 ?'onStep':''">
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
       <el-scrollbar style="height:100%;overflow-x: hidden">
          <basicFirst  v-show="step==1" :candidateStepsData="candidateStepsData" :standardResume="standardResume" :candidateWorkExperienceDTOList="candidateWorkExperienceDTOList" :candidateEducationExperienceDTOList="candidateEducationExperienceDTOList"></basicFirst>

          <interviewSecond   v-show="step==2" ref="interviewChild" :candidateStepsData="candidateStepsData"   :addressList="addressList" :commendEmployeeIdData="commendEmployeeIdData"></interviewSecond><!--:listentochild="showMsgformChild"-->
          <offerThird v-show="step==3"  ref="offerChild" :candidateStepsData="candidateStepsData"  :addressList="addressList"></offerThird>
          <remarkForth v-show="step==4" ref="barget" @addMack="addMack" ></remarkForth>
          <accessoryFifth v-show="step==5" ref="accessoryChild"></accessoryFifth>
          <opsRecordSeventh v-show="step==6" ref="opsRecordChild"></opsRecordSeventh>
       </el-scrollbar>
      </div>
      <!--<candidateContent></candidateContent>-->
      <candidateRight  @getList="getList"   @listento-flag="getFlag" :step="step" :signs="signs" :candidateStepsData="candidateStepsData" ></candidateRight>
      <!--右边-->

      <!--取消面试弹窗-->
      <!-- <div class = "cov"  v-clickoutside="handleClose2" >&lt;!&ndash;v-if="cancelInterview==true"&ndash;&gt;
         <div class = "con create_dialog" style="height:340px;">
           <p class = "ptitle">取消面试 <i class="el-icon-close closes_s"></i></p>
           <div class="rescs beires" style="height:220px;">
             <el-form>
               <el-form :model="cerateList"  ref="cerateList" id="re_styles">
                 <span class="title_bei">请填写取消面试原因</span>
                 <el-input :rows="4" type="textarea" v-model="text" style="width:460px;margin-left:60px;" placeholder="请输入内容"></el-input>
               </el-form>
             </el-form>
           </div>
           <div slot="footer" class="dialog-footer">
             <el-button  type="primary"    style="height:36px;" >保存</el-button>
           </div>
         </div>
       </div>-->


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
    export default {
        name: "candidateSteps",
        props:['addVisible','candidateStepsData','standardResume','candidateEducationExperienceDTOList','candidateWorkExperienceDTOList','signs'],
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
            // addVisible:false,
            status1:'',
            step:1,
            conShow:false,//推荐人
            text:'',
            type:'',
            flag:1,//默认标准简历
            addressList:[],//企业地址集合
            commendEmployeeIdData:[],//公司人员集合
            candidateID:localStorage.getItem('candidateID')
          }
      },
      computed:{
      },
      methods:{
    //调用子组件里面的方法
        getList() {
          this.$refs.barget.getList()
        },
        //添加备注
        addMack() {
          this.beizhu=true
        } ,
        //点击切换时，调用对应子组件的方法
        changeTab(flag){
          let that=this;
          this.step=flag;
          if(flag==1){

          }else if(flag==2){
            this.$refs.interviewChild.getInterview();
          }else if(flag==3){
            this.$refs.offerChild.offerIsExist();
          } else if(flag==4){
            this.$refs.barget.getList();
          }else if(flag==5){
            this.$refs.accessoryChild.getList();
          }else if(flag==6){
            this.$refs.opsRecordChild.getList();
          }else{

          }
        },
        getFlag(flag){
          this.step=flag;//子组件穿过的flag值，赋值给step；
          this.status1=flag;
          console.log(this.status1);
        },
        //  关闭弹窗
        hideModel(){
          this.conShow=false
          let that=this;
          that.$emit('hideModel','steps');//向父组件派发事件
        },
        showMsgformChild(){

        },
        changeTab2(flag){
          this.flag=flag;
        },
        //获取企业地址集合
        getAddress() {
          let that = this;
          this.$http({
            method:"get",
            url:api.getAddress,
            headers:headers(),
            cache:false
          }).then(function(res){
            if(res.data.code==10000 || res.data.data==null){
              that.addressList=res.data.data;
            }else{
              that.$message.error(res.data.msg);
            }
          });
        },
        //获取员工列表,公司人员
        getEmployeeList() {
          let that = this;
          let currPage=that.currPage || 1;
          let pageSize=that.pageSize || 10;
          let employeeName = that.names || '';
          this.$http({
            method:"post",
            url:api.getEmployeeList,
            headers:headers(),
            data:{
              currPage:currPage,
              pageSize:pageSize,
              employeeName:"",
            },
          }).then(function(res){
            if(res.data.code==10000 || res.data.data==null){
              that.commendEmployeeIdData = res.data.data
            }else{
              that.$message.error(res.data.msg);
            }
          });
        },
      },
      mounted(){
          let that=this;
        that.getAddress();
        that.getEmployeeList();
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

</style>
<style>
 .candidate_content .el-scrollbar__wrap {
  overflow-x: hidden !important;
 }


</style>

