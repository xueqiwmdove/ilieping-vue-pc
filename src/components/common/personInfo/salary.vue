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
                <div class="item">
                    <label>基本工资</label>
                    <input v-if="flag3"  type="number" placeholder="请输入基本工资" v-model="employeeSalary.basicWage">
                    <span v-else class="font_sty">{{employeeSalary ? (employeeSalary.basicWage ? employeeSalary.basicWage : '') :''}}</span>
                </div>

                <div class="item">
                    <label>工资卡号</label>
                    <input v-if="flag3"  type="number" placeholder="请输入工资卡号" v-model="employeeSalary.salaryCardNumber" required>
                    <span v-else class="font_sty">{{employeeSalary ? (employeeSalary.salaryCardNumber ? employeeSalary.salaryCardNumber : '') :''}}</span>
                </div>

                <div class="item">
                    <label>社保账号</label>
                    <input v-if="flag3"  type="number" placeholder="请输入社保账号" v-model="employeeSalary.socialSecurityAccount" required>
                    <span v-else class="font_sty">{{employeeSalary ? (employeeSalary.socialSecurityAccount ? employeeSalary.socialSecurityAccount : '') :''}}</span>
                </div>  

                <div class="item">
                    <label>绩效工资</label>
                    <input v-if="flag3"  type="number" placeholder="请输入绩效工资" v-model="employeeSalary.performancePay" required>
                    <span v-else class="font_sty">{{employeeSalary ? (employeeSalary.performancePay ? employeeSalary.performancePay : '') :''}}</span>
                </div>
                <div class="item">
                    <label>工资卡开户行</label>
                    <input v-if="flag3"  type="text" placeholder="请输入工资卡开户行" v-model="employeeSalary.salaryBank" required>
                    <span v-else class="font_sty">{{employeeSalary ? (employeeSalary.salaryBank ? employeeSalary.salaryBank : '') :''}}</span>
                </div>
                <div class="item">
                    <label>公积金账号</label>
                    <input v-if="flag3"  type="number" placeholder="请输入公积金账号" v-model="employeeSalary.providentFundAccount" required>
                    <span v-else class="font_sty">{{employeeSalary ? (employeeSalary.providentFundAccount ? employeeSalary.providentFundAccount : '') :''}}</span>
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
          basicWage:'',
          salaryCardNumber:'',
          socialSecurityAccount:'',
          performancePay:'',
          salaryBank:'',
          providentFundAccount:''
        }  
      },
      methods: {
       //修改切换 
        tag_revise(val) {
          if(val=='4') {
            // console.log(this.employeeSalary);
            if(this.employeeSalary){
                if(this.flag3 == false){//获取表单原始值
                    this.basicWage = this.employeeSalary.basicWage;
                    this.salaryCardNumber = this.employeeSalary.salaryCardNumber;
                    this.socialSecurityAccount = this.employeeSalary.socialSecurityAccount;
                    this.performancePay = this.employeeSalary.performancePay;
                    this.salaryBank = this.employeeSalary.salaryBank;
                    this.providentFundAccount = this.employeeSalary.providentFundAccount;
                    
                }else{//重置表单
                    this.employeeSalary.basicWage = this.basicWage;
                    this.employeeSalary.salaryCardNumber = this.salaryCardNumber;
                    this.employeeSalary.socialSecurityAccount = this.socialSecurityAccount;
                    this.employeeSalary.performancePay = this.performancePay;
                    this.employeeSalary.salaryBank = this.salaryBank;
                    this.employeeSalary.providentFundAccount = this.providentFundAccount;
                }
            }
            this.flag3 = !this.flag3
          }
        },
        updateSalary(){
          let isSuccess = this.$emit('updateSalary');
          if(isSuccess){
              this.flag3 = false;
          }          
        }
      }

    }
</script>
<style scoped>
  @import './base.css';
</style>