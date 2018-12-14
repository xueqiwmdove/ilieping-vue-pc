<!-- 
    Author:周双
    日期：2018/11/27
-->
<template>
    <div>
        <p class="uploadTitle">薪资福利</p>
        <div class="uploadLeaveInfo3" >
            <button class="el-icon-edit icon_reset" @click="tag_revise(4)"></button>
            <div class="form">
							  <input type="hidden" v-model="employeeSalary.id">
                <div class="item">
                    <label>基本工资<i class="notice-red">*</i></label>
                    <input v-if="flag3"  type="number" placeholder="请输入基本工资" v-model="employeeSalary.basicWage">
                    <span v-else class="font_sty">{{employeeSalary ? (employeeSalary.basicWage ? employeeSalary.basicWage : '') :''}}</span>
                </div>
                <div class="item">
                    <label>绩效工资<i class="notice-red">*</i></label>
                    <input v-if="flag3"  type="number" placeholder="请输入绩效工资" v-model="employeeSalary.performancePay" required>
                    <span v-else class="font_sty">{{employeeSalary ? (employeeSalary.performancePay ? employeeSalary.performancePay : '') :''}}</span>
                </div>

                <div class="item">
                    <label>社保账号<i class="notice-red">*</i></label>
                    <input v-if="flag3"  type="number" placeholder="请输入社保账号" v-model="employeeSalary.socialSecurityAccount" required>
                    <span v-else class="font_sty">{{employeeSalary ? (employeeSalary.socialSecurityAccount ? employeeSalary.socialSecurityAccount : '') :''}}</span>
                </div> 

                <div class="item">
                    <label>公积金号<i class="notice-red">*</i></label>
                    <input v-if="flag3"  type="number" placeholder="请输入公积金账号" v-model="employeeSalary.providentFundAccount" required>
                    <span v-else class="font_sty">{{employeeSalary ? (employeeSalary.providentFundAccount ? employeeSalary.providentFundAccount : '') :''}}</span>
                </div>
								
<!--             <div class="item">
                    <label>工资卡1<i class="notice-red">*</i></label>
                    <input v-if="flag3"  type="number" placeholder="请输入工资卡号" v-model="employeeSalary.employeeSalaryCardList[0].salaryCardNumber" required>
                    <span v-else class="font_sty">{{employeeSalary ? (employeeSalary.employeeSalaryCardList[0].salaryCardNumber ? employeeSalary.employeeSalaryCardList[0].salaryCardNumber : '') :''}}</span>
                </div>
								
               <div class="item">
                    <label>工资卡开户行<i class="notice-red">*</i></label>
                    <input v-if="flag3"  type="text" placeholder="请输入工资卡开户行" v-model="employeeSalary.employeeSalaryCardList[0].salaryBank" required>
                    <span v-else class="font_sty">{{employeeSalary ? (employeeSalary.employeeSalaryCardList[0].salaryBank ? employeeSalary.employeeSalaryCardList[0].salaryBank : '') :''}}</span>
                </div> -->
								<!-- <div v-if="employeeSalary.employeeSalaryCardList.length!=0"> -->
									<div v-if="employeeSalary.employeeSalaryCardList.length!=0">
									<div v-for="(items,index) in employeeSalary.employeeSalaryCardList" :key="index">
										<div class="item">
												<label>工资卡{{index+1}}</label>
												<input v-if="flag3" type="number" :id="cardId(index+1)" class="cardClass" :value="items.salaryCardNumber" placeholder="请输入工资卡号" required>
												<span v-else class="font_sty">{{employeeSalary ? (items.salaryCardNumber ? items.salaryCardNumber : '') :''}}</span>
										</div> 
										
										<div class="item">
												<label>工资卡开户行</label>
												<input v-if="flag3" :id="bankId(index)" type="text" class="bankClass" :value="items.salaryBank" placeholder="请输入工资卡开户行" required>
												<span v-else class="font_sty">{{employeeSalary ? (items.salaryBank ? items.salaryBank : '') :''}}</span>
											<div v-if="flag3 && index!=0" class="delete_div"><img src="../../../assets/img/dismission/deleteH34.png" class="delete" @click="deleteDimissiom(index+1)"></div>
										</div>
									</div>
								</div>
								
								<div class="addNewPaycard" v-if="flag3">
									<div @click="breakPromiseFun" class="click_font">
									<div class="addNewPaycardIcon"><img src="../../../assets/img/dismission/addNewPayCard.png"  class="addDepartment"></div>
								  <span style="font-size: 14px;">添加工资卡</span>
								</div>
								<div class="paycard_warning" v-if="isDimissionAll_count">
								<div class="warning5"><img style="vertical-align: middle;" src="../../../assets/img/reg/info.svg" alt="" class="img_dismissal"></div>
								<span style="color: #97A2B3;font-size: 14px;">最多可添加五张银行卡</span>
								</div>
								</div>
								
                <div v-if="flag3" style="text-align:center;">
                    <el-button :plain="true" class="btn_resite" @click="updateSalary()">保存</el-button>
                    <el-button class="btn-default" @click="tag_revise(4)" >取消</el-button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
      name:'salary'  ,
      props:['employeeSalary'],
      data() {
        return {
          flag3:false,//判断是否为编辑状态
          formLabelWidth: '120px',
					id:'',
          basicWage:'',
          salaryCardNumber:'',
          socialSecurityAccount:'',
          performancePay:'',
          salaryBank:'',
          providentFundAccount:'',
					insertData:[],
					isDimissionAll_count:false,
					liHtml:'',
        }  
      },
      methods: {
			cardId(index){//银行卡ID
				return 'cardId_'+index
			},
			bankId(index){//开户行ID
				return 'bankId_'+index
			},
			deleteDimissiom(index){//删除银行卡html
				let that=this;
				let length= this.employeeSalary.employeeSalaryCardList.length;
				this.test_test1(length);
			  that.employeeSalary.employeeSalaryCardList.splice(--index,1);
				if(index!=5){
					that.isDimissionAll_count=false;
				}
			},
				breakPromiseFun(){//添加银行卡html
				
				let length= this.employeeSalary.employeeSalaryCardList.length;
				if(length==0){
					this.employeeSalary.employeeSalaryCardList.push({});
					return;
				}
				
				if(!this.test_test(length)){
					return false;
				}
				
				this.test_test1(length);
					
				if(this.employeeSalary.employeeSalaryCardList.length==5){
					this.isDimissionAll_count=true;										
					return false;
				}
				
				this.employeeSalary.employeeSalaryCardList.push({});
				return true;
					
				},
				test_test(length){			
					let nowLenght = length-1;															
					let cardList = document.getElementsByClassName("cardClass");
					let bankList = document.getElementsByClassName("bankClass");
					let salaryCardNumber = cardList[nowLenght].value;
					let salaryBank = bankList[nowLenght].value;
					if(!salaryCardNumber||!salaryBank){
						this.$message.error('银行卡开户行不能为空');
						return false;
					}
					return true;
				},
				test_test1(length){
					
					let cardList = document.getElementsByClassName("cardClass");
					let bankList = document.getElementsByClassName("bankClass");
					
					let arr = this.employeeSalary.employeeSalaryCardList;
					debugger
					for(let i =0;i<length;i++){
						let obj = {
							"salaryCardNumber":cardList[i].value,
							"salaryBank":bankList[i].value
						}
						arr[i]=obj;
					}
				},
       //修改切换 
        tag_revise(val) {
					let that=this;
          if(val=='4') {
            if(that.employeeSalary){
							
                if(that.flag3 == false){//获取表单原始值
								    that.employeeSalary.id=that.employeeSalary.id;
                    that.basicWage = that.employeeSalary.basicWage;
                    
                    that.socialSecurityAccount = that.employeeSalary.socialSecurityAccount;
                    that.performancePay = that.employeeSalary.performancePay;
//                     that.salaryBank = that.employeeSalary.employeeSalaryCardList[0].salaryBank;
// 										that.salaryCardNumber = that.employeeSalary.employeeSalaryCardList[0].salaryCardNumber;

                    that.providentFundAccount = that.employeeSalary.providentFundAccount;
								
										 that.insertData=that.employeeSalary.employeeSalaryCardList;
										
                }else{//重置表单
                    that.employeeSalary.basicWage = that.basicWage;
                    that.employeeSalary.salaryCardNumber = that.salaryCardNumber;
                    that.employeeSalary.socialSecurityAccount = that.socialSecurityAccount;
                    that.employeeSalary.performancePay = that.performancePay;
                    that.employeeSalary.salaryBank = that.salaryBank;
                    that.employeeSalary.providentFundAccount = that.providentFundAccount;
										
										that.insertData=that.employeeSalary.employeeSalaryCardList;
                }
            }
            that.flag3 = !that.flag3
          }
        },
        updateSalary(){
					let length= this.employeeSalary.employeeSalaryCardList.length;
					this.test_test1(length);
					let that=this;
          let isSuccess = that.$emit('updateSalary');
          if(isSuccess){
            that.flag3 = false;
          }          
        },
      },

    }
</script>
<style scoped>
  @import './base.css';
	.addNewPaycard{ height: 40px; clear: both; margin-bottom: 10px;line-height: 18px;}
	.addNewPaycard .addNewPaycardIcon img{float: left;display: inline-block;vertical-align: middle; margin: 0 5px;}
	.addNewPaycard .click_font{float: left; display: inline-block; cursor: pointer;width: 160px;}
	.warning_div{height: 40px; line-height: 40px;font-size: 14px; color: #F95714;}
	.warning_div .warning_img{float: left;display: inline-block;vertical-align: middle; margin: 0 5px;}
	.paycard_warning{float: left;display: inline-block; margin-left: 100px;}
	.warning5{float: left;display: inline-block;vertical-align: middle; margin: 0 5px;}
	.delete_div{display: inline-block;vertical-align: middle;}
</style>