<template>
  <div >
    <p class="uploadTitle">
      个人资料（必填）
    </p>
    <div class="uploadLeaveInfo">
      <div class="imgBox">
        <img src="../../assets/img/dismission/women_19_32.svg" alt="icon" class="female" v-if="sex_img==0"><!-- 女19-32 -->
        <img src="../../assets/img/dismission/men_19_32.svg" alt="icon" class="female" v-if="sex_img==1"><!-- 男19-32 -->
        <img src="../../assets/img/dismission/men_0_18.svg" alt="icon" class="female" v-if="sex_img==2"><!-- 男18岁以下 -->
        <img src="../../assets/img/dismission/men_33_45.svg" alt="icon" class="female" v-if="sex_img==3"><!-- 男33-45 -->
        <img src="../../assets/img/dismission/men_46_60.svg" alt="icon" class="female" v-if="sex_img==4"><!-- 男46-60 -->
        <img src="../../assets/img/dismission/men_60+.svg" alt="icon" class="female" v-if="sex_img==5"><!-- 男60+ -->
        <img src="../../assets/img/dismission/women_0_18.svg" alt="icon" class="female" v-if="sex_img==6"><!-- 女18岁以下 -->
        <img src="../../assets/img/dismission/women_33_45.svg" alt="icon" class="female" v-if="sex_img==7"><!-- 女33-45 -->
        <img src="../../assets/img/dismission/women_46_60.svg" alt="icon" class="female" v-if="sex_img==8"><!-- 女46-60 -->
        <img src="../../assets/img/dismission/women_60＋.svg" alt="icon" class="female" v-if="sex_img==9"><!-- 女60+ -->
      </div>
      <div class="contentBox">
        <div class="left">
          <div>姓名<label style="color:#F95714">*</label>&nbsp;&nbsp;
            <!--<input type="text" id="exposure_name" autocomplete="off" placeholder="请输入姓名" v-model="name" name="user"  maxlength="5" required>-->
            <input type="text" id="exposure_name" autocomplete="off" placeholder="请输入姓名" v-model.trim="sendData.name" name="user"  maxlength="5" required>
            <input type="hidden"  >
          </div>
          <div style="position: relative;text-align: left;"> 出生日期<label style="color:#F95714">*</label>&nbsp;&nbsp;
	        <el-date-picker v-model="sendData.birthDate" type="date" placeholder="请选择出生日期" value-format="yyyy-MM-dd" required style="margin:0;" @change="click_data" ></el-date-picker>
          </div>
          <div>手机号码<label style="color:#F95714">*</label>&nbsp;&nbsp;
            <input type="text" autocomplete="off" id="phone" placeholder="请输入手机号码" minlength="11" maxlength="11" v-model="sendData.phone" required>
          </div>
        </div>
        <div class="right">
          <div>性别<label style="color:#F95714">*</label>&nbsp;&nbsp;
            <el-select v-model="sendData.sex" placeholder="请选择性别" :label="sexValue" @change="getSex">
              <el-option v-for="item in sexData" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <!--<select-Sex></select-Sex>-->

            <!-- <span class="uploadLeaveWoman sex active">女</span>
             <span class="uploadLeaveMan sex"  >男</span>-->
          </div>
          <div>身份证号<label style="color:#F95714">*</label>&nbsp;&nbsp;
            <input id="card" type="text" autocomplete="off" placeholder="请输入身份证号码"  v-model="sendData.cardNumber" minlength="18" maxlength="18" @blur="blurCardNumber">
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>

    export default {
        name: "personData",
        props:{
         sendData:''
        }, // 用来接收父组件传给子组件的数据
      data(){
          return{
            pickerOptions1: {
              disabledDate(time) {
                return time.getTime() > Date.now();
              }

            },
            birthDate: '',
            name:'',
            sexData: [{
              value: '1',
              label: '男'
            }, {
              value: '0',
              label: '女'
            }],
            sex: '',
            cardNumber:'',
            phone:'',
            sexValue:'',
            sex_img:0,
            age:19,
            msg: 'I like you!'

          }
        },
        computed: {

        },
      methods:{
      	sex_age(){//判断性别和年龄段
      		let that=this;
      		// console.log(that.sendData.sex,that.sex_img)
      		if(that.sendData.sex==0){ //女
						  if(that.age <= 18){//女年龄段
						  	that.sex_img=6;
						  }else if(that.age >= 19 && that.age <= 32){
						  	that.sex_img=0;
						  }else if(that.age >= 33 && that.age <= 45){
						    that.sex_img=7;
						  }else if(that.age >= 46 && that.age <= 60){
						    that.sex_img=8;
						  }else if(that.age >= 60){
						    that.sex_img=9;
						  }else{
						  	that.sex_img=0;
						  }

          }else{ //男
						  if(that.age <= 18){//男年龄段
						  	that.sex_img=2;
						  }else if(that.age >= 19 && that.age <= 32){
						  	that.sex_img=1;
						  }else if(that.age >= 33 && that.age <= 45){
						    that.sex_img=3;
						  }else if(that.age >= 46 && that.age <= 60){
						    that.sex_img=4;
						  }else if(that.age >= 60){
						    that.sex_img=5;
						  }else{
						  	that.sex_img=1;
						  }
          	}
      	},
          //性别
          getSex(){
            let that=this;
            that.sex_age();
          },
          click_data(){
          	let that=this;
          	let now_date = new Date();
						let seperator1 = "-";
					  let year = now_date.getFullYear();
					  let month = now_date.getMonth() + 1;
					  let strDate = now_date.getDate();
					  if (month >= 1 && month <= 9) {
					    month = "0" + month;
					  }
					  if (strDate >= 0 && strDate <= 9) {
					    strDate = "0" + strDate;
					  }
					  let currentdate = year + seperator1 + month + seperator1 + strDate;
					  if(currentdate.substring(0,4)>=that.sendData.birthDate.substring(0,4) && currentdate.substring(5,7) >=that.sendData.birthDate.substring(5,7)
                && currentdate.substring(8,10)>=that.sendData.birthDate.substring(8,10)){
					  	that.age = year - parseInt(that.sendData.birthDate.substring(0,4));
					  }else{
					  	that.age = year - parseInt(that.sendData.birthDate.substring(0,4)) - 1;
					  }

            that.getSex();
         },

          blurCardNumber:function(){//身份证只能输入数字和字符
            let reg=(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/)||(/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/);
            if(reg.test(this.sendData.cardNumber) === false){
              this.$message.error("身份证输入不合法")
            }
          },
      },
      watch:{
//      name:function () {//姓名不能输入数字
//        this.name=this.name.replace(/[^\d]/g,'');
//      },
        phone:function () {//手机号只能输入数字
          this.phone=this.phone.replace(/[^\d]/g,'');
        },
	      cardNumber:function(){//身份证只能输入数字和字符

          this.cardNumber=this.cardNumber.replace(/[\W]/g,'');
	      },

      },
      mounted(){
        // this.getSex()
      }
    }
</script>

<style scoped>
  .el-input .el-input--suffix{
    margin: 0;
  }

</style>
