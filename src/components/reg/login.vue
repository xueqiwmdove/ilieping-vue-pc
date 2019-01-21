<template>
	<div>
  <!--顶部导航-->
  <pageheader class="pageheader"></pageheader>
  <div class="main">
  <div class="content">

  <div class="login">
    <div>
    	<div class="title x-center">登录爱猎评</div>
    	<div>
        <div class="two-kind-login">
            <span class="x1-borderB-active x-font-active x-center" @click="psdLogin(1)" :class="flag==1?'active':''">密码登录</span>
            <span class="x1-borderB-gray x-center" @click="codeLogin(2)" :class="flag==2?'active':''">验证码登录</span>
            <em class="circle_left"></em>
            <em class="circle_right"></em>
        </div>
     <!--错误提示-->
     <div class="phone-error-info" v-if="err_div">
         <img src="../../assets/images/reg/info.svg" alt="提示">
         <span>{{err_info}}</span>
     </div>
     <!--密码登录-->
     <div class="form_login psd-login" v-if="psd_login">
       <form class="form" @click.submit.prevent>
         <div class="form-group box-phone">
             <label>手机号码</label>
             <input type="tel" class="form-control phone" autocomplete="off" v-model="phone_pwd" id="phone" name="phone" maxlength="11" placeholder="请输入手机号码" @blur="isPhone"/>
         </div>
         <div class="form-group box-psd">
             <label>登录密码</label>
             <input type="password" class="form-control password" autocomplete="off" v-model="password_pwd" name="password" id="password" placeholder="请输入登录密码" maxlength="16" minlength="6"/>
         </div>
         <div class="form-group box-rem">
             <span class="forgetPsd pull-right" @click="forgetPwd">忘记密码？</span>
         </div>
         <div class="form-group">
            <button class="button x-button-active" type="submit" @click="login_pwd" :class="click_button_pwd" :disabled="login_pwdDisabled" name="loginPwd" >登录</button>
         </div>
         <p class="has-no-account x-center">没有账号？<span @click="click_reg" class="color_span">立即注册</span><em class="triangle"></em>
         </p>
       </form>
     </div>
    	  <!--验证码登录-->
        <div class="form_login auth-code-login" v-if="code_login">
            <div class="form-group box-phone">
                <label>手机号码</label>
                <input type="tel" class="form-control phone" autocomplete="off" v-model="phone_code" id="phone1" placeholder="请输入手机号码" maxlength="11" @blur="isPhone_code"/>
            </div>
            <div class="form-group box-psd">
                <label>短信验证码</label>
                <input type="text" class="form-control inputYzm" autocomplete="off" v-model="txt_code" id="yzm" placeholder="请输入短信验证码" maxlength="6" @keyup.enter="login_code">
                <button class="button getYzm pull-right" @click="get_code"  v-if="codeState" :class="click_button_phone" :disabled="button_phone_dis">获取验证码</button>
                <button class="button getYzm pull-right time_div" disabled="true" v-if="codeState2">{{timeNum}}s后重发</button>
            </div>
            <div class="form-group login-button">
                <input type="submit" class="button x-button-active form-group" @click="login_code"  name="loginCode" value="登录" :class="click_button_code" :disabled="login_codeDisabled" style="text-align: center;"/>
            </div>
            <p class="has-no-account x-center">没有账号？<span @click="click_reg" class="color_span">立即注册</span><em class="triangle"></em>
            </p>
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
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader_reg';

export default {
  name: 'login',
	components: {
       pageheader
	},
   data() {
      return {
        psd_login: true,
        code_login: false,
        flag:1,
        msg_error:"",
        phone_pwd:"",
        password_pwd:"",
        phone_code:"",
        txt_code:"",
        isLoading:false,
        err_info:'',
        err_div:false,
        codeState:true,
        codeState2:false,
        timeNum: 60,
        isphonevalue:false,
      };
    },
    watch:{
      phone_pwd:function(){
      	this.phone_pwd=this.phone_pwd.replace(/[^\d]/g,'');
      },
      phone_code:function(){
      	this.phone_code=this.phone_code.replace(/[^\d]/g,'');
      },
      password_pwd:function(){
      	this.password_pwd=this.password_pwd.replace(/[\W]/g,'');
      },
      txt_code:function(){
      	this.txt_code=this.txt_code.replace(/[^\d]/g,'');
      }
    },
    computed: {
      // 使用密码登录
      login_pwdDisabled: function () {
        if ((this.phone_pwd == "" || this.password_pwd == "") || this.isLoading) {
          return true
        }
        else {
          return false
        }
      },
      click_button_pwd: function(){ // 使用按钮样式密码登录
      if ((this.phone_pwd != "" && this.password_pwd != "") && !this.isLoading) {
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
      //使用验证码登录
      login_codeDisabled: function () {
        if ((this.phone_code == "" || this.txt_code == "") || this.isLoading) {
          return true
        }
        else {
          return false
        }
      },
      click_button_code: function(){ // 使用按钮样式密码登录
      if ((this.phone_code != "" && this.txt_code != "") && !this.isLoading) {
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
      // 改变登录方式
      psdLogin(a) {//密码登录样式
      	let that=this;
        that.psd_login = true;
        that.code_login = false;
        that.flag=a;
        that.err_div=false;
      },
      codeLogin(a) {//验证码登录样式
      	let that=this;
        that.psd_login = false;
        that.code_login = true;
        that.flag=a;
        that.err_div=false;
      },
      click_reg() {//立即注册
      	let that=this;
        that.$router.push('reg');
      },
      forgetPwd(){//忘记密码
      	let that=this;
      	that.$router.push('phoneAuth');
      },

      //验证该手机号是否已注册
      isPhone(){
      	window.localStorage.clear();
      	let that=this;
      	if(that.phone_pwd==""){
      		that.err_div=true;
      		that.err_info='请填写手机号码';
      		return false;
      	}else if(!this.phone_pwd.match(/^1[345678]\d{9}/)){
      		that.err_div=true;
      		that.err_info='请填写正确手机号码';
      		return false;
      	}else{
      		that.err_div=false;
      		that.$http({
	  			method:"post",
	  			url:api.isPhone+that.phone_pwd,
	  			headers:headers("application/x-www-form-urlencoded"),
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code===10000){
//	  				console.log(res.data.data);
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
      isPhone_code(){
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
	  			headers:headers(),
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code===10000){
//	  				console.log(res.data.data);
	              if(!res.data.data){
	              	that.isphonevalue=false;
		              that.err_div=true;
				      that.err_info='该手机号未注册,请点击立即注册';
	              }else{
	              	that.isphonevalue=true;
	              }
	  			}else{
	  				that.$message.error(res.message || res.data.msg);
	  			}

	  		});
      	}
      },
      login_pwd(){//密码登录
      	let that=this;
      	if(that.phone_pwd==""){
      		that.err_div=true;
      		that.err_info='请填写手机号码';
      		return false;
      	}else if(!that.phone_pwd.match(/^1[345678]\d{9}/)){
      		that.err_div=true;
      		that.err_info='请正确手机号码';
      		return false;
      	}else if(!that.isphonevalue){
          that.err_div=true;
      		that.err_info='该手机号未注册,请点击立即注册';
      		return false;
      	}else if(that.password_pwd.lenght==""){
      		that.err_div=true;
      		that.err_info='请填写登录密码';
      		return false;
      	}else{
      		that.err_div=false;
      		that.$http({
      			method:"post",
      			url:api.login,
      			headers:headers(),
      			data:{
      				username:that.phone_pwd,
      				password:that.password_pwd
      			},
      			cache:false
      		}).then(function(res){
      			if(res.data.code===10000){
//    				console.log(res.data.data.token +new Date()+"*****");
      				window.localStorage.setItem('phone',that.phone_pwd);
      				window.localStorage.setItem('jingjing_login_token',res.data.data.token);
      			    //密码登录
                      // that.$router.push('account_alliancevip');
              that.$router.push('admin');
      			}else{
      				that.$message.error(res.message || res.data.msg);
      			}

      		})

      	}
      },
      login_code(){//验证码登录
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
      	 that.err_div=false;
      		//验证码登录
          that.$http({
      			method:"post",
      			url:api.mobiletoken,
      			headers:headers(),
      			data:{
      				username:that.phone_code,
      				validateCode:that.txt_code
      			},
      			cache:false
      		}).then(function(res){
      			if(res.data.code===10000){
                 window.localStorage.setItem('jingjing_login_token',res.data.data.token);
                 // that.$router.push('account_alliancevip');
								 that.$router.push('admin');
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
      	}else if(!that.isphonevalue){
          that.err_div=true;
      	  that.err_info='该手机号未注册,请点击立即注册';
          return false;
      	}else{
      	  that.err_div=false;
      	  that.timingCode(); //倒计时
			that.$http({//发送验证码
				method:"post",
				url:api.smstoken+"/"+that.phone_code+'/41',
				headers:headers(),
				cache:false
			}).then(function(res){
				if(res.data.code===10000){
				 that.$message({
		          message: '成功发送验证码，请查看',
		          type: 'success'
		         });
				}else{
				 that.$message.error(res.message || res.data.msg);
				 that.codeState=true;
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

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
    width: 480px;
    box-shadow: 0 2px 4px 0 #d3d3d3;
    position: absolute;
    margin: 133px auto 0;
    left: 0;
    right: 0;
    padding-bottom: 38px;
    background: #fff
    }
.login .title{
	margin: 23px 0 0;
	font-size: 20px;
	color: #21324E;
	letter-spacing: 0.24px;
	text-align: center;
  }
.two-kind-login{
	  height: 50px;
    line-height: 50px;
    font-size: 0;
    position: relative;
    text-align: center;
    }
.two-kind-login span.active {
    border-bottom: 1px solid #F95714;
    color: #F95714;
}
.two-kind-login span {
    width: 50%;
    display: inline-block;
    font-size: 18px;
    color: #748093;
    border-bottom: 1px solid #E6E6E6;
    letter-spacing: 0.21px;
    cursor: pointer;
}
.main .login .form_login .inputYzm {
    width: 260px;
    display: inline-block;
}
.two-kind-login .circle_left,.two-kind-login .circle_right{
	  width: 25px;
    height: 25px;
    display: inline-block;
    border-radius: 50%;
    position: absolute;
    top: 40px;
    background: #FAFAFA;

    }
.two-kind-login .circle_left{box-shadow: 2px 0 0 #d3d3d3;left: -10px;}
.two-kind-login .circle_right{box-shadow: -2px 0 0 #d3d3d3;right: -10px;}
.login .form_login .phone-error-info{
	font-size: 0;
    height: 19px;
    margin: 16px auto auto;
    width: 400px;
    display: none;
}
.login .form_login .form-group{
	width: 400px;
  margin: 20px auto auto;
  text-align: left;
  }
.login .form_login .form-group label{
	  display:block;
    max-width: 100%;
	  font-size: 16px;
    color: #748093;
    letter-spacing: 0.19px;
    margin: 0 0 10px 0;
    font-weight: normal;
}
.login .form_login .form-group .form-control{
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
	cursor: pointer;
}
.form-group .button{box-shadow: 0 2px 4px 0 #BBBBBB;
    height: 44px;
    font-size: 16px;
    border: none;
    color: #fff;
    background: #F95714;
    width: 400px;
    margin: 20px auto auto;
    border-radius: 4px;
    cursor: pointer;
    }
.login .form_login .has-no-account {
    margin: 62px 0 0;
    color: #999999;
    letter-spacing: 0.14px;
    position: relative;
    text-align: center;
}
.login .form_login .inputYzm {
    width: 260px !important;
    display: inline-block !important;
}
.login .form_login .getYzm {
    display: inline-block;
    width: 120px;
    height: 44px;
    line-height: 44px;
    color: #fff;
    font-size: 16px;
/*    opacity: 0.6;*/
    background: #F95714;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    float: right;
    margin-top: 0px;
}
.color_span{
	color: #2569F6;
	cursor: pointer;
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
</style>
