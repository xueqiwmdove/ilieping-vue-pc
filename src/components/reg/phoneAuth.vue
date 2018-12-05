<template>
	<div>
  <!--顶部导航-->
  <pageheader class="pageheader"></pageheader>
  <div class="main">
  <div class="content">
  <div class="reg">
    <div>
    	<div class="title x-center">登录爱猎评</div>
	    <span class="circle_left"></span>
	    <span class="circle_right"></span>
      <div class="two-step">
	        <div class="first-step">
	            <img class=" center-block first-img" src="../../assets/images/reg/第一步.png" alt="1">
	            <span class="active x-center first">验证手机号码</span>
	        </div>
	        <div class="line"></div>
	        <div class="second-step">
	            <img class=" center-block second-img" src="../../assets/images/reg/第二部灰.png" alt="2">
	            <span class=" x-center two">重置密码</span>
	        </div>
	    </div>
    	<!--验证码登录-->
	    <div class="form_phoneAuth auth-code-login">
	     <!--错误提示-->
	     <div class="phone-error-info " v-if="err_div">
	         <img class="err_img" src="../../assets/images/reg/info.svg" alt="提示">
	         <span>{{err_info}}</span>
	     </div>
	    <div class="form-group box-phone">
	        <label>手机号码</label>
	        <input type="tel" class="form-control phone" autocomplete="off" v-model="phone_code" id="phone1" placeholder="请输入手机号码" maxlength="11" @blur="isPhone"/>
	    </div>
	    <div class="form-group box-psd">
	        <label>短信验证码</label>
	        <input type="text" class="form-control inputYzm" autocomplete="off" v-model="txt_code" id="yzm" placeholder="请输入短信验证码" maxlength="6">
	        <button class="button getYzm pull-right" @click="get_code"  v-if="codeState" :class="click_button_phone" :disabled="button_phone_dis">获取验证码</button>
	        <button class="button getYzm pull-right time_div" disabled="true" v-if="codeState2">{{timeNum}}s后重发</button>
	    </div>
	    <div class="form-group login-button">
	        <input type="submit" class="button x-button-active form-group" @click="login_code" name="loginCode" value="找回密码" :class="click_button_code" :disabled="login_codeDisabled" style="text-align: center;"/>
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
  import api from '@/api/api.js'
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader_reg';

export default {
  name: 'phoneAuth',
	components: {
       pageheader
	},
   data() {
      return {
        err_div:false,
        err_info:"",
        phone_code:'',
        txt_code:"",
        codeState:true,
        codeState2:false,
        timeNum: 60,
        isLoading:false,
      };
    },
    watch:{
      phone_code:function(){
      	this.phone_code=this.phone_code.replace(/[^\d]/g,'');
      },
      txt_code:function(){
      	this.txt_code=this.txt_code.replace(/[^\d]/g,'');
      },
    },
    computed: {
    	//使用验证码登录
      login_codeDisabled: function () {
        if ((this.phone_code == "" || this.txt_code == "" && this.phone_code.length == 11) || this.isLoading) {
          return true
        }
        else {
          return false
        }
      },
      click_button_code: function(){ // 使用按钮样式密码登录
      if ((this.phone_code != "" && this.txt_code != "" && this.phone_code.length == 11) && !this.isLoading) {
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
     click_button_phone: function(){ // 使用按钮样式验证码
      if ((this.phone_code != "" && this.phone_code.length == 11) && !this.isLoading) {
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
      button_phone_dis: function () {
        if ((this.phone_code != "" && this.phone_code.length == 11) && !this.isLoading) {
          return false
        }
        else {
          return true
        }
      },
    },
    methods: {
      //验证该手机号是否已注册
      isPhone(){
      	let that=this;
      	if(that.phone_code==""){
      		that.err_div=true;
      		that.err_info='请填写手机号码';
      		return false;
      	}else if(!this.phone_code.match(/^1[345678]\d{9}/)){
      		that.err_div=true;
      		that.err_info='请正确手机号码';
      		return false;
      	}else{
      		that.err_div=false;
      		that.$http({
	  			method:"post",
	  			url:api.isPhone+that.phone_code,
	  			headers:headers("application/x-www-form-urlencoded"),
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code===10000){
	  				console.log(res.data.data);
	              if(!res.data.data){
	              	that.isphonevalue=false;
		            that.err_div=true;
				    that.err_info='该手机号未注册,请点击立即注册';
	              }else{
	              	that.isphonevalue=true;
	              	that.err_div=false;
	              }
	  			}else{
	  				that.$message.error(res.message || res.data.msg);
	  			}

	  		});
      	}

      },
      get_code(){//获取验证码
      	let that=this;
      	if(that.phone_code==""){
      		that.err_div=true;
      		that.err_info='请填写手机号码';
      		return false;
      	}else if(!that.phone_code.match(/^1[345678]\d{9}/)){
      		that.err_div=true;
      		that.err_info='请正确手机号码';
      		return false;
      	}else{
//    	  that.codeState=false;
          that.timingCode();//倒计时方法
          that.$http({//发送验证码
      			method:"post",
      			url:api.smstoken+'/'+that.phone_code+'/46',
      			headers:headers(),
//    			data:"mobile="+this.phone_code,
      			cache:false
      		}).then(function(res){
      		 if(res.data.code===10000){
				 that.$message({
		          message: '成功发送验证码，请查看',
		          type: 'success'
		         });
      		 }else{
	      		that.err_div=true;
	      		that.err_info=res.data.msg;
	      		that.codeState=true;
      		 }

      		});

      	}
      },
       login_code(){//
      	let that=this;
      	if(that.phone_code==""){
      		that.err_div=true;
      		that.err_info='请填写手机号码';
      		return false;
      	}else if(!that.phone_code.match(/^1[345678]\d{9}/)){
      		that.err_div=true;
      		that.err_info='请正确手机号码';
      		return false;
      	}else if(!that.isphonevalue){
          that.err_div=true;
      	  that.err_info='该手机号未注册,请点击立即注册';
      	  return false;
      	}else if(that.txt_code==""){
      		that.err_div=true;
      		that.err_info='请填写验证码';
      		return false;
      	}else{
      		//找回密码
          that.$http({
      			method:"post",
      			url:api.password+'/one',
      			headers:headers(),
      			data:{
      				phone:that.phone_code,
      				vcode:that.txt_code,
      			},//"smsCode="+that.txt_code,
      			cache:false
      		}).then(function(res){
      			console.log(res);
      			console.log(res.data.code);
      			if(res.data.code===10000){
      				window.localStorage.setItem("phoneAuth",that.phone_code);
      				window.localStorage.setItem("phonecode",res.data.data);
                    that.$router.push('restPsd');
      			}else{
		      		that.err_div=true;
		      		that.err_info=res.data.msg;
      			}

      		});

      	}
      },
        //发送验证码倒计时
      timingCode() {
      	let that=this;
        let interval = setInterval(() => {
          if (that.timeNum > 0 && this.timeNum < 61) {
            that.codeState = false;
            that.codeState2=true;
            that.timeNum--;
          }
          else if (that.timeNum == 0) {
            that.codeState = true;
            that.codeState2=false;
            clearInterval(interval);
            that.timeNum = 60;
          }
        }, 1000)
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reg{
  width: 480px;
	height: 512px;
	position: absolute;
	margin: 114px auto;
	left: 0;
	right: 0;
	background: #FFFFFF;
	border-radius: 8px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	-webkit-box-shadow: 0 2px 4px 0 #d3d3d3;
	box-shadow: 0 2px 4px 0 #d3d3d3;
    }
.reg .title{
    height: 74.5px;
    line-height: 74.5px;
    border-bottom: 1px solid #E5E5E5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    font-size: 20px;
    color: #21324E;
    letter-spacing: 0.24px;
    position: relative;
  }
.reg .circle_left,.reg .circle_right{
	  width: 25px;
    height: 25px;
    display: inline-block;
    border-radius: 50%;
    position: absolute;
    top: 60px;
    background: #FAFAFA;

    }
.reg .circle_left{box-shadow: 2px 0 0 #d3d3d3;left: -10px;}
.reg .circle_right{box-shadow: -2px 0 0 #d3d3d3;right: -10px;}
.reg .form_phoneAuth{
	font-size: 16px;
  letter-spacing: 0.19px;
}
.reg .form_phoneAuth > div {
    width: 400px;
    margin: 20px auto auto;
}
.reg .form_phoneAuth .phone-error-info{
	font-size: 0;
    height: 19px;
    margin: 16px auto auto;
    width: 400px;
}
.reg .form_phoneAuth .form-group{
	width: 400px;
  margin: 20px auto auto;
  text-align: left;
  }
.reg .form_phoneAuth .form-group label{
	  display:block;
    max-width: 100%;
	  font-size: 16px;
    color: #748093;
    letter-spacing: 0.19px;
    margin: 0 0 10px 0;
    font-weight: normal;
}
.reg .form_phoneAuth .form-group .form-control{
	  height: 44px;
    text-indent: 22px;
    padding: 0;
    background: #fff;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    display: block;
    width: 100%;
    font-size: 14px;
    line-height: 1.42857143;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
.forgetPsd{
	color: #2569F6;
	float: right;
}
.form-group .button{box-shadow: 0 2px 4px 0 #BBBBBB;
    height: 44px;
    font-size: 16px;
    border: none;
    color: #fff;
    background: #F95714;
    width: 400px;
    border-radius: 4px;}
.reg .form_phoneAuth .has-no-account {
    margin: 62px 0 0;
    color: #999999;
    letter-spacing: 0.14px;
    position: relative;
}
.reg .form_phoneAuth .inputYzm {
    width: 260px !important;
    display: inline-block !important;
}
.reg .form_phoneAuth > div .getYzm {
    display: inline-block;
    width: 120px;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 16px;
    background: #F95714;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    border: none;
}
.reg .regButton .button {
    width: 100%;
    height: 44px;
    text-indent: 0;
    color: #fff;
    background: #F95714;
    -webkit-box-shadow: 0 2px 4px 0 #BBBBBB;
    box-shadow: 0 2px 4px 0 #BBBBBB;
    border-radius: 4px;
    border: none;
}
.reg .two-step{
	height: 60px;
	line-height: 60px;
	margin-top: 20px;
	font-size: 0;
	position: relative;
	box-sizing: border-box;
}
.reg .two-step .first-step {
    width: 85px;
    font-size: 0;
    margin: 0 0 0 85px;
}
.reg .two-step div {
    display: inline-block;
}
.reg .two-step .line {
    width: 117.5px;
    height: 1px;
    border-bottom: 1px dashed #D8D8D8;
    margin-bottom: 40px;
}
.reg .two-step .second-step {
    width: 57px;
    font-size: 0;
}
.reg .two-step .first-step img, .reg .two-step .first-step span,.reg .two-step .second-step img, .reg .two-step .second-step span  {
    display: block;
    vertical-align: middle;
    margin-right: auto;
    margin-left: auto;
}
.reg .two-step span {
    height: 19px;
    line-height: 19px;
    margin-top: 11px;
    font-size: 14px;
    color: #394A66;
    letter-spacing: 0.16px;
    cursor: pointer;
}
.x-button-active {
    background: #F95714 !important;
    -webkit-text-fill-color: #fff !important;
}
.click_btn{opacity: 0.6;}
.phone-error-info {
    font-size: 0;
    height: 19px;
    color: #F95714;
    letter-spacing: 0.16px;
    margin: 20px auto;
    width: 400px;
}
.phone-error-info img {
    float: left;
    display: inline-block;
    margin-top: -1px;
}
.phone-error-info span{    font-size: 14px;
    color: #F95714;
    letter-spacing: 0.16px;
    margin: 0 0 0 7.7px;}
.time_div{
	color: #97A2B3 !important;
    letter-spacing: 0.19px !important;
    background: #F5F5F5 !important;
    border: 1px solid #EEEEEE !important;
    border-radius: 4px;
    opacity: 1 !important;
}
.err_img{
	display: inline-block;
    float: left;
    margin-top: -1px;
}
</style>
