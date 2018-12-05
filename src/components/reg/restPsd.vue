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
	        <div class="line active"></div>
	        <div class="second-step">
	            <img class=" center-block second-img" src="../../assets/images/reg/第二部红.png" alt="2">
	            <span class=" x-center">重置密码</span>
	        </div>
	    </div>
    	<!--验证码登录-->
	    <div class="form auth-code-login">
	     <!--错误提示-->
	     <div class="phone-error-info " v-if="err_div">
	         <img src="../../assets/images/reg/info.svg" alt="提示">
	         <span>{{err_info}}</span>
	     </div>
	    <div class="form-group">
	        <label>输入新密码</label>
	        <input type="password" v-model="Password" autocomplete="off" class="form-control phone" placeholder="请输入新密码" id="newPsd" minlenght="6" maxlength="16" />
	    </div>
	    <div class="form-group">
	        <label>再次确认密码</label>
	        <input type="password" v-model="CkPassword" autocomplete="off" class="form-control phone" id="psd" placeholder="请再次输入密码" minlenght="6" maxlength="16"/>
	    </div>
	    <div class="form-group confirm-button">
	        <input type="submit" class="button x-button-active form-group" @click="click_confirm" name="confirm" value="确认" :class="click_button_code" :disabled="button_password_dis" style="text-align: center;"/>
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
  import pageheader from '@/components/common/pageheader_reg';
  import {headers} from '@/assets/js/common/lp.js'

export default {
  name: 'phoneAuth',
 	components: {
       pageheader
	},
   data() {
      return {
        err_div:false,
        err_info:'',
        Password:'',
        CkPassword:'',
      };
    },
    watch:{
      Password:function(){
      	this.Password=this.Password.replace(/[\W]/g,'');
      },
      CkPassword:function(){
      	this.CkPassword=this.CkPassword.replace(/[\W]/g,'');
      }
    },
    computed: {
      click_button_code: function(){ // 使用按钮样式密码登录
      if ((this.Password != "" && this.CkPassword != "" && this.Password.length >= 6 && this.CkPassword.length >= 6) && !this.isLoading) {
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
      button_password_dis: function () {
        if ((this.Password != "" && this.CkPassword != "" && this.Password.length >= 6 && this.CkPassword.length >= 6) && !this.isLoading) {
          return false
        }
        else {
          return true
        }
      },
    },
    methods: {
      click_confirm(){
        let that=this;
      	if(that.Password==""){
      		that.err_div=true;
      		that.err_info='请输入新密码';
      		return false;
      	}else if(that.CkPassword==""){
      		that.err_div=true;
      		that.err_info='请再次输入密码';
      		return false;
      	}else if(that.Password.length <= 5 || that.Password.length >=17){
      		that.err_div=true;
      		that.err_info='请输入6-16位密码，字母区分大小写';
      		return false;
      	}else if(that.CkPassword.length <= 5 || that.CkPassword.length >=17){
      		that.err_div=true;
      		that.err_info='请输入6-16位密码，字母区分大小写';
      		return false;
      	}else if(that.Password != that.CkPassword){
      		that.err_div=true;
      		that.err_info='两次密码输入不一致';
      		return false;
      	}else{

      	that.$http({
  			method:"post",
  			url:api.password,
  			headers:headers(),
	        data:{
	            phone:window.localStorage.getItem("phoneAuth"),
  				vcode:window.localStorage.getItem("phonecode"),
	            password: that.CkPassword
	        },
	  	   cache:false
		}).then(function(res){
		  	if(res.data.code===10000){
		        that.$message({
		          message: '恭喜你，修改成功',
		          type: 'success'
		        });
	            setTimeout(function () {
	            	that.$router.push('/login');
	            },3000)
		  	}else{
	      		that.err_div=true;
	      		that.err_info=res.data.msg;
		  	}

		  });
      	}
      }

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
.reg .form{
	font-size: 16px;
  letter-spacing: 0.19px;
}
.reg .form > div {
    width: 400px;
    margin: 20px auto auto;
}
.reg .form .phone-error-info{
	  font-size: 0;
    height: 19px;
    margin: 16px auto auto;
    width: 400px;
}
.phone-error-info img {
    float: left;
    display: inline-block;
    margin-top: -1px;
}
.phone-error-info span {
    font-size: 14px;
    color: #F95714;
    letter-spacing: 0.16px;
    margin: 0 0 0 7.7px;
}
.reg .form .form-group{
	width: 400px;
  margin: 20px auto auto;
  }
.reg .form .form-group label{
	  display:block;
    max-width: 100%;
	  font-size: 16px;
    color: #748093;
    letter-spacing: 0.19px;
    margin: 0 0 10px 0;
    font-weight: normal;
}
.reg .form .form-group .form-control{
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
.reg .form .has-no-account {
    margin: 62px 0 0;
    color: #999999;
    letter-spacing: 0.14px;
    position: relative;
}
.reg .form .inputYzm {
    width: 260px !important;
    display: inline-block !important;
}
.reg .form > div .getYzm {
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
	height: 50px;
	line-height: 50px;
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
</style>
