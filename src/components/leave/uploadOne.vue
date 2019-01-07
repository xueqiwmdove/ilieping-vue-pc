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

          <p class="headline">
            <router-link to="/twoUpload">上传离职评价</router-link>
            <a class="active">多维度评价</a>
          </p>
          <div class="uploadleave">
            <div class="uploadleave-status">
              <img src="../../assets/img/dismission/step1_a.svg" />
              <i class="step_a" ></i>
              <img src="../../assets/img/dismission/step2.svg" />
              <i class="step_a" ></i>
              <img src="../../assets/img/dismission/step3.svg" />
              <i class="step_a" ></i>
              <img src="../../assets/img/dismission/step4.svg" />
            </div>
            <div class="uploadleave-step">
              <dl>
                <dd>录入</dd>
                <dd>员工基础信息</dd>
              </dl>
              <dl>
                <dd>录入</dd>
                <dd>员工离职信息</dd>
              </dl>
              <dl>
                <dd>（选填）</dd>
                <dd>曝光失信行为</dd>
              </dl>
              <dl>
                <dd>上传</dd>
                <dd>联盟数据库</dd>
              </dl>
            </div>
          </div>
          <div class="uploadLeaveSetp2">
            <!--个人资料-->
            <!--<personData ref="personChild"></personData>-->
            <personData :sendData="sendData"></personData>
            <!--工作经历-->
            <!--<workExperience  ref="workChild"></workExperience>-->
            <workExperience :sendData="sendData"></workExperience>
            <!--教育经历-->
            <div class="uploadTitle">
            	<div class="f_l">教育经历（选填）</div>
            	<div class="f_r">
								<!--<el-switch v-model="IsEducation" active-text="选填" inactive-text="必填" @change="changeEducation"></el-switch>-->
            	</div>
            </div>
            <div class="uploadLeaveInfo4">
              <div class="form " style="margin: 20px 0 24px 55px;">
                <div class="inline">
                  <div class="item" style="margin-left:0;">
                    <label>学校</label>
                    <input type="text" placeholder="请输入名称"  maxlength="20" v-model="graduateSchool">
                  </div>
                  <div class="item " style="margin-right:0;width: 130%;">
                    <label>学历</label>
                    <el-select v-model="education" placeholder="请选择学历">
                      <el-option v-for="item in educationData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <div style="margin-top: 10px;margin-left: 6px;">
                      <input type="checkbox" style="max-width: 13px;min-width: 13px;margin-top:-1px;" v-model="isFullTime" name="isFullTime" id="checkbox-id">
                      <i style="padding-top: 5px;">全日制</i>
                    </div>
                  </div>
                </div>
                <div class="inline" style="margin-left:110px;">
                  <div class="item">
                    <label>时间</label>
                    <el-date-picker v-model="schoolTime" type="daterange" start-placeholder="请选择时间" end-placeholder="" style="height: 34px;line-height: 20px;" value-format="yyyy-MM-dd" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                  </div>
                  <div class="item">
                    <label>专业</label>
                    <input type="text" placeholder="请输入专业" maxlength="20" v-model="professionalSkills">
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 100%;background: #ffffff;text-align: center;">
              <button class="uploadLeaveSetup4 active" id="step2_entry" @click="insert" :class="click_opacity" :disabled="ctrl_disabled" >下一步</button>
            </div>
          </div>

          <!--主体内容-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '@/http/http';
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
  import selectIndustry from '@/components/common/selectIndustry';
  import personData from '@/components/common/personData';
  import workExperience from '@/components/common/workExperience';

  import {isCardNo,checkMobile} from '@/assets/js/common/verify.js'

  export default {
    name:'uploadOne',
    components:{
      pageheader,
      pageaside,
      personData,
      workExperience
    },
    data(){
      return{
      	IsEducation:true,
        educationData: [{
          value: '初中及以下',
          label: '初中及以下'
        }, {
          value: '高中',
          label: '高中'
        }, {
          value: '中专',
          label: '中专'
        },{
          value:'大专',
          label:'大专'
        },{
          value:'本科',
          label:'本科'
        },{
          value:'硕士',
          label:'硕士'
        },{
          value:'博士',
          label:'博士'
        },{
          value:'MBA',
          label:'MBA'
        }
        ],
        education: '',
        personChild:'',
        workChild:'',
        schoolTime:[],
        isFullTime:0,
        graduateSchool:'',
        professionalSkills:'',
        input_disabled:true,

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

        },
      }
    },
    computed:{
      //样式控制
      ctrl_disabled:function() {
        let that=this;
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
          that.sendData.post!=""
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
          &&that.sendData.department!=""&&that.sendData.post!="")
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
    	changeEducation(value){
    		console.log(value);
    		this.input_disabled=value;
    	},
      //插入数据
        insert(){
        let that=this;
          that.getsetData();
       /* if(that.$refs.personChild.name==""){
        	that.$message.error('请输入姓名');
        	return false;
        }else if(that.$refs.personChild.sex==""){
        	that.$message.error('请选择性别');
        	return false;
        }else if(that.$refs.personChild.birthDate==""){
        	that.$message.error('请选择出生日期');
        	return false;
        }else if(!isCardNo(that.$refs.personChild.cardNumber)){
        	that.$message.error('请输入正确的身份证号码');
        	return false;
        }else if(checkMobile(that.$refs.personChild.phone)){
        	that.$message.error('请输入正确的手机号码');
        	return false;
        }else if(that.$refs.workChild.workTime==""){
        	that.$message.error('请选择任职时间');
        	return false;
        }else if(that.$refs.workChild.workType==""){
        	that.$message.error('请选择工作类型');
        	return false;
        }else if(that.$refs.workChild.department==""){
        	that.$message.error('请输入任职部门');
        	return false;
        }else if(that.$refs.workChild.post==""){
        	that.$message.error('请输入任职岗位');
        	return false;
        }else if(that.schoolTime!="" || that.graduateSchool!="" || that.education!="" || that.professionalSkills!="" || that.isFullTime!=0){
          if(that.schoolTime==""){
	        	that.$message.error('请选择教育经历的开始时间与结束时间');
	        	return false;
        	}else if(that.graduateSchool==""){
	        	that.$message.error('请输入您的毕业学校名称');
	        	return false;
        	}else if(that.education==""){
	        	that.$message.error('请选择您的学历');
	        	return false;
        	}else if(that.professionalSkills==""){
	        	that.$message.error('请选择您的专业');
	        	return false;
        	}
        	// else if(that.isFullTime==0){
          // 	that.$message.error('请选择是否是全日制');
          // 	return false;
          // }
        	else{
        		that.getsetData();
        	}
        }else{
        	that.getsetData();
        }*/

        },
        getsetData(){
        	let that=this;
          that.$http({
            method: 'post',
            url:api.uploadOne,
            data: {
              userInfo: {
                userName: that.sendData.name,
                birthDate:that.sendData.birthDate,
                userSex: that.sendData.sex,
                cardNumber: that.sendData.cardNumber,
                phoneUser:that.sendData.phone,
              },
              workExperience: {
                corporateName:that.sendData.enterpriseName,
                startJobTime:  that.sendData.workTime[0],
                endJobTime: that.sendData.workTime[1],
                workType:that.sendData.workType,
                deptName:that.sendData.department,
                postName:that.sendData.post,
                workDescribe:that.sendData.workDescribe
              },
              educationalExperience: {
                startTime: that.schoolTime[0],
                endTime:  that.schoolTime[1],
                educationInfo:that.education,
                isFullTime: that.isFullTime==true?1:0,
                graduateSchool: that.graduateSchool,
                professionalSkills: that.professionalSkills
              }
            },
            headers:headers()
          }).then(function (res) {
            console.log(res);
            let result = res.data;
            if (result.code == 10000 && result.data != "") {

              // $('#jump_step_entry').attr('dimiss_id', result.data);
              //TODO dimiss_id==>回显测评用户基本信息
             localStorage.setItem("reportId",result.data);
             that.$router.push("/uploadTwo");

            }else if(result.code == 40001){
              that.$message.error(res.data.msg);
            }else{
              that.$message.error("系统错误，请稍后再试");
            }
          })
        },
        // 根据 emloyeeid 查员工档案的接口
        getStaffData(){
          //员工档案相关数据
          let that=this;
          let employeeId=that.$route.params.id;
          this.$http({
            url:`${api.employeeArchives}/${employeeId}`,
            method:'GET',
            headers:headers('application/json;charset=utf-8'),
          }).then(function (res) {

            let resData = res.data;
            if(resData.code == 10000){
              // that.employeeInfo = resData.data.employeeInfo;
              that.sendData.birthDate =  resData.data.employeeInfo.employeeBrithday;
              // that.sendData.sex =  resData.data.employeeInfo.employeeSex;
              that.sendData.name =  resData.data.employeeInfo.employeeName;
              that.sendData.cardNumber =  resData.data.employeeInfo.employeeIdCard;
              that.sendData.phone =  resData.data.employeeInfo.employeePhone;
              that.sendData.post = resData.data.employeeInfo.position;
              that.sendData.department=resData.data.employeeInfoDetailResponse.deptName;
            }

          }).catch(function (error) {
            that.$message.error(error);
          });
        }

    },
    mounted(){
      let that=this;
      that.getStaffData();
    }
  }
</script>

<style scoped>
	.f_l{
		float: left;display: inline-block;
	}
	.f_r{
		float: right;display: inline-block;
	}
	.uploadTitle{
    margin: 50px 20px 20px 20px;
    height: 16px;
	}
  .main .right-content .content .headline{
   margin: 0;
 }
</style>
