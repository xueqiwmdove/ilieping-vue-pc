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
                    <a>录入新员工</a>
                </p>
                <div class="sendOfferMain">
                    <div class="sendOfferSteps">
                        <div class="sendOffer-status">
                            <div class="sendOffer_one">
                                <div>
                                    <img src="../../assets/img/dismission/step1_a.svg" />
                                    <i class="step_a" ></i>
                                </div>
                                <span>基本信息</span>
                            </div>
                            <!--<i class="step_a" ></i>-->
                            <div class="sendOffer_two">
                                <div>
                                    <img src="../../assets/img/dismission/step2_a.svg" />
                                    <i class="step_a" ></i>
                                </div>
                                <span>薪资福利</span>
                            </div>
                            <!--<i class="step_a" ></i>-->
                            <div class="sendOffer_three">
                                <img src="../../assets/img/dismission/step3.svg" />
                                <span>添加成功</span>
                            </div>
                        </div>
                    </div>
                    <div class="personDataBox">
                    <!--薪资福利-->
                    <div class="personData basicInfo">
                        <p class="title">薪资福利</p>
                        <div class="inputBox">
                            <div class="items">
                                <div class="input-group">
                                    <label>基本工资</label>
                                    <input type="tel" v-model="basicWage" placeholder="请输入基本工资" maxlength="10">
                                </div>
                                <div class="input-group special">
                                    <label>工资卡号</label>
                                    <input type="tel"  v-model="salaryCardNumber"  placeholder="请输入工资卡号" maxlength="16">
                                </div>
                            </div>
                            <div class="items">
                                <div class="input-group">
                                    <label>绩效工资</label>
                                    <input type="tel"  v-model="performancePay" placeholder="请输入绩效工资" maxlength="10">
                                </div>
                                <div class="input-group special">
                                    <label class="position">工资开户行</label>
                                    <input type="text" v-model="salaryBank" placeholder="请输入工资开户行">
                                </div>
                                <span class="input-group bankNotice">示例：招商银行浦东大道支行</span>
                            </div>
                        </div>
                    </div>
                    <div class="personData basicInfo">
                        <p class="title">薪资福利</p>
                        <div class="inputBox">
                            <div class="items">
                                <div class="input-group departmentTreeBox">
                                    <label>社保账号</label>
                                    <input type="tel"  v-model="socialSecurityAccount"  placeholder="请输入社保账号">
                                </div>
                                <div class="input-group special">
                                    <label class="position">公积金号</label>
                                    <input type="tel" v-model="providentFundAccount" placeholder="请输入公积金号">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nextButton">
                        <input type="button" class="sendOfferNext" value="下一步" :disabled="nextDisabled" :class="nextClass" @click="confirm"> <!-- :disabled="nextDisabled" :class="nextClass"  -->
                    </div>
                    <div class="skipSalary" @click="insertSuccess">
                        暂不填写，跳过
                    </div>
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
  import {headers} from '@/assets/js/common/lp.js';
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';

export default {
  name: 'account',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
          basicWage:'',
          performancePay:'',
          socialSecurityAccount:'',
          salaryBank:'',
          salaryCardNumber:'',
          providentFundAccount:'',
          employeeId:'',
      };
    },
    methods: {
      insertSuccess(){
        this.$router.push('/insertSuccess');
      },
      confirm(){
    	let that=this;
    	 that.$http({
  			method:"post",
  			url:api.employSalary,
  			headers:headers("application/json;charset=utf-8"),
  			data:{
                  employeeId:this.$route.params.employeeId,
                  basicWage:that.basicWage,//基本工资
                  performancePay:that.performancePay,//绩效工资
                  socialSecurityAccount:that.socialSecurityAccount,//社保账号
                  salaryBank:that.salaryBank,//开户行
                  salaryCardNumber:that.salaryCardNumber,//工资卡号
                  providentFundAccount:that.providentFundAccount//公积金
  			},
  			cache:false
  		}).then(function(res){
  			if(res.data.code===10000){
                that.$router.push('/insertSuccess')
                return res.data.data;
                console.log(res.data.data)
  			}else{
                return
  			}
  		});
      },
    },
     watch: {
      basicWage:function(){//基本工资
      	this.basicWage=this.basicWage.replace(/[^\d]/g,'');
      },
      salaryCardNumber:function(){//工资卡
      	this.salaryCardNumber=this.salaryCardNumber.replace(/[^\d]/g,'');
      },
      socialSecurityAccount:function(){//社保账号
      	this.socialSecurityAccount=this.socialSecurityAccount.replace(/[^\d]/g,'');
      },
      performancePay:function(){//绩效工资
      	this.performancePay=this.performancePay.replace(/[^\d]/g,'');
      },
      pprovidentFundAccounty:function(){//公积金账户
      	this.providentFundAccount=this.providentFundAccount.replace(/[^\d]/g,'');
      },

    },
    computed:{
        nextDisabled:function () {
            if(this.basicWage!="" || this.salaryCardNumber!="" || this.salaryCardNumber.length==16 || this.socialSecurityAccount!="" || this.performancePay!="" ||
            this.salaryBank!="" || this.providentFundAccount!=""){
                return false
            }else{
                return true
            }
        },
        nextClass:function () {
            if(this.basicWage!="" || this.salaryCardNumber!="" || this.salaryCardNumber.length==16 || this.socialSecurityAccount!="" || this.performancePay!="" ||
            this.salaryBank!="" || this.providentFundAccount!=""){
                return {
                    click_opacity:false
                }
            }else{
                return {
                    click_opacity:true
                }
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .main .right-content .content{
 	border: none;
 }
 .allianceBox .rules{
	display: block;
}
.span_right{
	float: right;
  color: #2064F5;
  cursor: pointer;
}
.error_div_img{
    float: left;
    display: inline-block;
    margin: -1.3px 0px;
}
.twoMethod .multipleMethod{
  border: 0;
}
.method .insertemployee{
  float: right;
  width: 180px;
  height: 40px;
  border: 1px solid #e5e5e5;
  margin: 24px 15px 0 0;
  line-height: 40px;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #394A66;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 0;
}
.insertemployee img{
  padding: 11px 0 11px 26px;
  float: left;
}
.sendOfferMain .personDataBox .personData .inputBox .items .input-group label{
    min-width: 77px;
    display: inline-block;
}
 .skipSalary{
    font-size: 16px;
    color: #F95714;
    text-align: center;
    cursor: pointer;
    margin-bottom: 48px;
 }
 .bankNotice{
    font-size: 14px !important;
    color: #F95714;
    float: left;
    margin-left: 86px;
 }
</style>
