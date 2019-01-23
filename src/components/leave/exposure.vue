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
            <span><i>猎评曝光</i> /曝光失信人员</span>
          </p>
          <div class="uploadLeaveSetp2" v-if='isSuccess_con'>
            <!--个人资料-->
            <!--<personData ref="personData_child"></personData>-->
            <personData :sendData="sendData"></personData>
            <!--工作经历-->
            <!--<workExperience ref="workExperience_child"></workExperience>-->
            <workExperience :sendData="sendData"></workExperience>
            <!--风险选项-->
            <p class="uploadTitle">风险选项（必填）</p>
            <div class="uploadLeaveInfo exposure">
              <p>工作经历核实</p>
              <div class="inline">
                <span>是否与公司有劳务纠纷<i>*</i></span>
							  <el-radio-group v-model="dispute" @change="change_dispute">
							    <el-radio :label="1">是</el-radio>
							    <el-radio :label="0">否</el-radio>
							  </el-radio-group>
                <!--<label for="dispute_1">
                  <input type="radio" class="rem" id="dispute_1" name="dispute" value="1">
                  <em></em>
                  <i>是</i>
                </label>
                <label for="dispute_0">
                  <input type="radio" class="rem" id="dispute_0" name="dispute" value="0">
                  <em></em>
                  <i>否</i>
                </label>-->
              </div>
              <div class="inline learnerShip">
                <span>是否与公司签署培训协议<i>*</i></span>
							  <el-radio-group v-model="learnerShip" @change="change_learnerShip">
							    <el-radio :label="1">是</el-radio>
							    <el-radio :label="0">否</el-radio>
							  </el-radio-group>
                <!--<label for="learnerShip_1">
                  <input type="radio" class="rem" id="learnerShip_1" name="learnerShip" value="1">
                  <em></em>
                  <i>是</i>
                </label>
                <label for="learnerShip_0">
                  <input type="radio" class="rem" id="learnerShip_0" name="learnerShip" value="0">
                  <em></em>
                  <i>否</i>
                </label>-->
              </div>
              <div class="inline">
                <span>是否与公司签署竞业协议<i>*</i></span>
							  <el-radio-group v-model="competition" @change="change_competition">
							    <el-radio :label="1">是</el-radio>
							    <el-radio :label="0">否</el-radio>
							  </el-radio-group>
                <!--<label for="competition_1">
                  <input type="radio" class="rem" id="competition_1" name="competition" value="1" >
                  <em></em>
                  <i>是</i>
                </label>
                <label for="competition_0">
                  <input type="radio" class="rem" id="competition_0" name="competition" value="0">
                  <em></em>
                  <i>否</i>
                </label>-->
              </div>
            </div>
            <p class="uploadTitle">失信行为（必填）</p>
            <div class="uploadLeaveInfo">
              <dishonest  @child_component="getDishonestChildData"></dishonest>
            </div>

            <div class="submin_div">
              <button class="uploadLeaveSetup4 active" @click="submin" :class="button_class" :disabled="submin_disabled" id="step2_entry">确认上传</button>
            </div>
          </div>
				  <!--曝光成功提示-->
				  <div class="uploadLeaveSetp6" v-if='isSuccess'>
				    <div class="uploadLeaveConfirm">
				      <img src="../../assets/img/dismission/ic_success.svg" class="uploadLeaveimg" alt="">
				      <div class="uploadLeaveContent">
				        <p>该员工失信行为已成功曝光至猎评诚信联盟</p>
				        <span class="text-center" v-if="integral==5">职场诚信积分<i style="color: #f95714;">+{{integral}}</i>，已发送至您的账户</span>
				      </div>
				    </div>
				    <div class="btn_div">
				      <button class="uploadLeaveSetup4 active btn_w"  @click="look_exposure"> 查看我的曝光</button>
				      <button class="uploadLeaveSetup4 active btn_w2" @click="next_exposure">继续曝光</button>
				    </div>
				  </div>
				  <!--主体内容end-->
    <!--行业地区弹窗-->
        <div v-show="Is_model">
          <div class="masking" @click="closeAlertFun"></div>
          <div class="industryArea blance_alert">
            <div class="alert_header">地区/行业
              <img src="../../assets/img/dismission/ic_close.svg" alt="" class="pull-right" @click="closeAlertFun">
            </div>
            <div class="alert_body">
              <div class="industryBox">
                <label>行业</label>
                <el-select v-model="industry" placeholder="请选择行业" id="industry" @change="getIndustryId">
                  <el-option v-for="(item,key) in industryData" :key="key" :label="item.enumValue" :value="item.enumCode"></el-option>
                </el-select>
              </div>
              <div class="areaBox">
                <label >地区</label>
                <el-select v-model="area" filterable placeholder="请选择地区" id="area">
                  <el-option v-for="(item,key) in areaData" :key="key" :label="item" :value="item"></el-option>
                </el-select>
              </div>
              <div class="phone-error-info">
                <img src="../../assets/img/reg/info.svg" alt="提示">
                <span>请选择该离职人员所处的行业与地区</span>
              </div>
            </div>
            <div class="alert_footer">
              <input type="button" value="提交" class="submit" :disabled="industry_disabled" :class="industry_click_opacity2" @click="confirm">
            </div>
          </div>
      </div>
    <!--行业地区弹窗 end-->
  		</div>
  	</div>
   </div>
  </div>
</template>

<script>
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
  import selectIndustry from '@/components/common/selectIndustry';
  import personData from '@/components/common/personData';
  import workExperience from '@/components/common/workExperience';
  import dishonest from '@/components/common/dishonest';
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
export default {
  name: 'exposure',
	components: {
	  pageheader,
	  pageaside,
    selectIndustry,
    personData,
    workExperience,
    dishonest
	},
   data() {
      return {
				dispute:1,//是否与公司有劳务纠纷
				learnerShip:1,//是否与公司签署培训协议
				competition:1,//是否与公司签署竞业协议
				isSuccess:false,//是否存入后台数据成功
				dishonestData:[],
				isSuccess_con:true,//主体内容
				Is_model:false,//行业地区弹窗
				industry:'',
		    industryData:[],
		    area:'',
		    areaData:[
		      '全国','北京市','上海市','天津市','重庆市','河北省','山西省','内蒙古','辽宁省','吉林省','黑龙江省','江苏省','浙江省','广西','安徽省',
		      '福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','海南省','四川省','贵州省','云南省','西藏','陕西省','甘肃省','青海省',
		      '宁夏','新疆','台湾','香港','澳门'
		    ],
		    reprotId:'',//失信报告id
        integral:5,

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
      };
    },
    computed:{
	    industry_disabled:function(){
	      if(this.industry!="" && this.area!=""){
	        return false
	      }else{
	        return true
	      }
	    },
	    industry_click_opacity2:function(){
	      if(this.industry !="" && this.area!=""){
	        return{
	          click_opacity:false
	        }
	      }else{
	        return{
	          click_opacity:true
	        }
	      }
	    },
      submin_disabled: function () {//禁用状态
        if(this.dispute !== "" && this.learnerShip !== "" && this.competition !== ""&&
          this.sendData.name!=""&&
          this.sendData.birthDate!=""&&
          this.sendData.sex!=""&&
          this.sendData.cardNumber!=""&&
          this.sendData.phone!=""&&
          this.sendData.workTime[0]!=""&&
          this.sendData.workTime[1]&&
          this.sendData.workType!=""&&
          this.sendData.department!=""&&
          this.sendData.post!=""
        ){
          return false
        }
        else {
          return true
        }
      },
      button_class: function(){ // 使用按钮样式
      if(this.dispute !== "" && this.learnerShip !=="" && this.competition !== ""&&
        this.sendData.name!=""&&
        this.sendData.birthDate!=""&&
        this.sendData.sex!=""&&
        this.sendData.cardNumber!=""&&
        this.sendData.phone!=""&&
        this.sendData.workTime[0]!=""&&
        this.sendData.workTime[1]&&
        this.sendData.workType!=""&&
        this.sendData.department!=""&&
        this.sendData.post!=""
      ){
          return {
            click_btn: false
          }
        }
        else {
          return {
            click_btn: true
          }
        }
      },
    },
    methods: {
    	look_exposure(){//
    		let that=this;
    		that.$router.push('/exposureReport/'+that.reprotId);
    	},
    	next_exposure(){//继续曝光
    		let that=this;
//  		that.$router.push('exposure');
        that.isSuccess=false;
        that.isSuccess_con=true;
    	},
    	change_dispute(value){//是否与公司有劳务纠纷
    		let that=this;
    		that.dispute=value;
    	},
    	change_learnerShip(value){//是否与公司签署培训协议
    		let that=this;
    		that.learnerShip=value;
    	},
    	change_competition(value){//是否与公司签署竞业协议
    		let that=this;
    		that.competition=value;
    	},
    	getDishonestChildData(value){
          let that=this;
          that.dishonestData=value;
          //console.log(JSON.stringify(that.dishonestData));
    	},
			//获取下拉行业的数据
			getIndustryData(){
			  let that=this;
			  that.$http({
			    url:api.industry,
			    method:'get',
			    headers:headers()
			  }).then(function (res) {
			    //console.log(res);
			    let result=res.data;
			    //console.log(result);
			    if(result.code==10000){
			      that.industryData=result.data.valueList;
			      //console.log(that.industryData)
			    }
			  })
			},
	    //获取行业的id
	    getIndustryId(value){//这个vId也就是value值
	      let that=this;
	      that.obj = {};
	      that.obj = that.industryData.find((item)=>{//这里的userList就是上面遍历的数据源
	        return item.enumCode == value;//筛选出匹配数据
	      });
	      //console.log(that.obj.enumCode);//我这边的name就是对应label的
	    },
    	closeAlertFun(){//关闭弹框
    		let that=this;
    		that.Is_model=false;
    	},
     submin(){//确认上传
     	let that=this;
//   	console.log(that.dispute+"***");
//   	console.log(that.dispute==="");
//   	console.log(that.dispute === 0 || that.dispute === 1);

       that.Is_model=true;
     	// let re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
     // 	if(that.$refs.personData_child.name=="" || that.$refs.personData_child.name ==undefined){
     //    this.$message({
     //      message: '请输入姓名',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(that.$refs.personData_child.birthDate=="" || that.$refs.personData_child.birthDate ==undefined){
     //    this.$message({
     //      message: '请选择出生日期',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(that.$refs.personData_child.sex =="" || that.$refs.personData_child.sex == undefined){
     //    this.$message({
     //      message: '请选择性别',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(that.$refs.personData_child.cardNumber =="" || that.$refs.personData_child.cardNumber == undefined){
     //    this.$message({
     //      message: '请输入身份证号码',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(!re.test(that.$refs.personData_child.cardNumber) || that.$refs.personData_child.cardNumber.length != 18) {
     //    this.$message({
     //      message: '请输入正确的身份证号码',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(that.$refs.personData_child.phone =="" || that.$refs.personData_child.phone == undefined){
     //    this.$message({
     //      message: '请输入手机号码',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(that.$refs.workExperience_child.workTime[0] == "" || that.$refs.workExperience_child.workTime[0] == undefined){
     //    this.$message({
     //      message: '请选择开始时间',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(that.$refs.workExperience_child.workTime[1] == "" || that.$refs.workExperience_child.workTime[1] == undefined){
     //    this.$message({
     //      message: '请选择结束时间',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(that.$refs.workExperience_child.workType == "" || that.$refs.workExperience_child.workType == undefined){
     //    this.$message({
     //      message: '请选择工作类型',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(that.$refs.workExperience_child.department == "" || that.$refs.workExperience_child.department == undefined){
     //    this.$message({
     //      message: '请输入任职部门',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(that.$refs.workExperience_child.post == "" || that.$refs.workExperience_child.post == undefined){
     //    this.$message({
     //      message: '请输入任职岗位',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(that.dishonestData == "" || that.dishonestData == undefined){
     //    this.$message({
     //      message: '请填写失信行为',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(that.dispute === "" || that.dispute === undefined){
     //    this.$message({
     //      message: '请选择是否与公司有劳务纠纷',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(that.learnerShip === "" || that.learnerShip === undefined){
     //    this.$message({
     //      message: '请选择是否与公司签署培训协议',
     //      type: 'warning'
     //    });
     // 		return false;
     // 	}else if(that.competition === "" || that.competition === undefined){
     //    this.$message({
     //      message: '请选择是否与公司签署竞业协议',
     //      type: 'warning'
     //    });
     // 		return false;
     //
		// 	}else{//选择行业，地区
     //    that.Is_model=true;
     //
     // }
    },
    confirm(){
    	let that=this;
    	 that.$http({
  			method:"post",
  			url:api.workVerify,
  			headers:headers("application/json;charset=utf-8"),
  			data:{
	        industry:that.industry,
	        ownArea:that.area,
          userInfo:{
            userName: that.sendData.name,//姓名
            birthDate: that.sendData.birthDate,//出生日期
            userSex: that.sendData.sex,//性别
            cardNumber: that.sendData.cardNumber,//身份证
            phoneUser: that.sendData.phone,//手机号
          },
          workExperience:{
            corporateName: that.sendData.enterpriseName,//公司
            startJobTime: that.sendData.workTime[0],//开始时间
            endJobTime: that.sendData.workTime[1],//结束时间
            workType:that.sendData.workType, //工作类型
            deptName: that.sendData.department,//任职部门
            postName: that.sendData.post, //任职岗位
            workDescribe: that.sendData.workDescribe,//工作描述 非必填
          },
  				/*userInfo:{
            userName: that.$refs.personData_child.name,//姓名
            birthDate: that.$refs.personData_child.birthDate,//出生日期
            userSex: that.$refs.personData_child.sex,//性别
            cardNumber: that.$refs.personData_child.cardNumber,//身份证
            phoneUser: that.$refs.personData_child.phone,//手机号
	        },
	        workExperience:{
            corporateName: that.$refs.workExperience_child.enterpriseName,//公司
            startJobTime: that.$refs.workExperience_child.workTime[0],//开始时间
            endJobTime: that.$refs.workExperience_child.workTime[1],//结束时间
            workType:that.$refs.workExperience_child.workType, //工作类型
            deptName: that.$refs.workExperience_child.department,//任职部门
            postName: that.$refs.workExperience_child.post, //任职岗位
            workDescribe: that.$refs.workExperience_child.workDescribe,//工作描述 非必填
	        },*/
	        dimissionDishonesty:that.dishonestData,//添加失信行业
	        workVerifyTopic:{
	            laborDispute:that.dispute,//是否与公司有劳务纠纷
	            trainingAgreement:that.learnerShip,//是否与公司签署培训协议
	            competitionAgreement:that.competition,//是否与公司签署竞业协议
	        }
  			},
  			cache:false
  		}).then(function(res){
  			if(res.data.code===10000){
	        that.$message({
	          message: '恭喜你，保存成功',
	          type: 'success'
	        });
					that.reprotId=res.data.data;

          if(res.data.integral==5){
            that.integral=5;
            that.isSuccess=true;
          }else{
            that.integral=0;
            that.isSuccess=true;
          }

					that.isSuccess_con=false;
					that.Is_model=false;
  			}else{
		  		that.$message.error(res.message || res.data.msg);
  			}
  		});
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
	  that.getIndustryData();
	  that.getStaffData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .company-content .module .module-content span{
 	color: #2064F5;
  font-size: 14px;
 }
 .messageContent{
 	margin: 20px;
 }
 .nav > li {
    position: relative;
    display: block;
}
.nav-tabs > li{
	float: left;
}
#msgTabs{
	height: 54px;
}
 .messageContent #msgTabs li span {
    height: 34px;
    line-height: 34px;
    color: #394A66;
    background: #FAFBFC;
    cursor: pointer;
    padding: 0;
    margin: 0;
    border: 1px solid #E5E5E5;
    border-radius: 2px;
    position: relative;
    display: block;
}
.messageContent #msgTabs li.active span{
    color: #FFFFFF;
    background: #F95714;
}
.table-parent table tr td span{
	font-size: 14px;
	color: #2569F6;
	cursor: pointer;
	margin: 0 20px 0 0;
}
.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    border: 1px solid #E5E5E5;
    margin-bottom: 0;
}
.table-parent table tr td:last-child {
border-right: 1px solid #ddd;
}
.hide{
	display: none;
}
.click_btn{opacity: 0.6;}
/* 弹框样式 */
.modelDismissal{
	position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    background: #000;
    opacity: 0.4;
}
.uploadLeaveSetp6{
	padding: 20px;
}
.uploadLeaveConfirm{
	padding: 82px 0 96px;
}
.uploadLeaveContent .text-center{display: inline-block;margin: 15px 0 0;height: 20px;font-size: 14px;color: #748093;line-height: 20px;}
.btn_div{width: 100%;background: #ffffff;text-align: center;}
.btn_div .btn_w{width: 160px;margin: 10px 10px;background: transparent;color:#F95714;border: 1px solid #F95714;}
.btn_div .btn_w2{width: 160px;margin: 10px 10px}
.submin_div{width: 100%;background: #ffffff;text-align: center;}
.uploadLeaveimg{width:60px;height: 60px;}
.exposure .inline span{
	width: 180px;
	margin-right: 10px;
	text-align: left;
}
</style>
