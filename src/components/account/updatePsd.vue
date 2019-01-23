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
      <span><i>账号安全</i> /修改密码</span>
    </p>
    <div class="account-content">
    <!--第一步-->
    <div class="mobile-content" id="updateMobile_f_code_div" v-show="flag">
        <div class="error-info">
          <div class="error_div_img"><img src="../../assets/img/reg/info.svg" ></div>您正在修改密码，请先使用手机验证码验证身份。
        </div>
        <p>当前手机号码：<span class="telephone">{{phoneUser}}</span></p>
         <div class="form-group">
             <label for="updateMobile_f_code_id">验证码</label>
             <input type="text" autocomplete="off" id="updateMobile_f_code_id" v-model="updateMobile_f_code" placeholder="请输入验证码" minlenght='6' maxlength="6" @keyup.enter="next">
             <button class="getYzm" id="updateMobile_f_sendPhoneCode" @click="updateMobile_sms" v-if="codeState">获取验证码</button>
             <button class="getYzm time_div" disabled="true" v-if="codeState2">{{timeNum}}s后重发</button>
         </div>
        <p class="error-info errorMsg warning" :class="objecthide">
            <img src="../../assets/img/reg/info.svg" >{{errorMsg}}
        </p>
        <div class="form-group">
            <input type="button" id="input_btn" class="button next click_acive" :class="click_opacity_next"  value="下一步" :disabled="click_dis_next" @click="next">
        </div>


    </div>
    <!--第二步-->
    <div class="mobile-content" id="updateMobile_s_div" v-show="!flag">
        <div class="form-group">
            <label for="set_newPsd">设置新密码</label>
            <input type="text" autocomplete="off" id="set_newPsd" v-model="set_newPsd" minlength="6" maxlength="16" style="width: 300px;" placeholder="请设置6-16位新登录密码">
        </div>
        <div class="form-group">
            <label for="confirm_newPsd">确认新密码</label>
            <input type="text" id="confirm_newPsd" autocomplete="off" v-model="confirm_newPsd" minlength="6" maxlength="16" style="width: 300px;" placeholder="确认6-16位新登录密码" @keyup.enter="updatePsd_q">
        </div>
        <p class="error-info errorMsg warning" :class="objecthide_new">
            <img src="../../assets/img/reg/info.svg" >{{errorMsg}}
        </p>

        <div class="form-group">
            <input type="button" class="button submit click_acive" id="updateMobile_s_sendPhonebtn" :class="click_opacity_q" :disabled="click_dis_q" @click="updatePsd_q" value="确定">
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
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';

export default {
  name: 'updatePsd',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
				flag:true,
				updateMobile_f_code:'',
				errorMsg:'',
				confirm_newPsd:'',
				phoneUser:'',
				phoneMobile:'',
				timeNum: 60,
				timeNum_new:60,
        codeState_new:true,
        codeState2:false,
        codeState:true,
        codeState2_new:false,
				objecthide: {
				    hide: true
				},
				set_newPsd:'',
				objecthide_new:{
					hide:true
				}
      };
    },
    watch:{
      updateMobile_f_code:function(){
      	this.updateMobile_f_code=this.updateMobile_f_code.replace(/[^\d]/g,'');
      },
      set_newPsd:function(){
      	this.set_newPsd=this.set_newPsd.replace(/[\W]/g,'');
      },
      confirm_newPsd:function(){
      	this.confirm_newPsd=this.confirm_newPsd.replace(/[\W]/g,'');
      }
    },
    computed: {
      click_dis_next:function(){
        if ((this.updateMobile_f_code != "" && this.updateMobile_f_code.length == 6) || this.isLoading){
          return false
        }
        else {
          return true
        }
      },
      click_opacity_next: function(){ // 使用按钮样式
      if ((this.updateMobile_f_code != "" && this.updateMobile_f_code.length == 6) && !this.isLoading) {
          return {
            click_opacity: false
          }
        }
        else {
          return {
            click_opacity: true
          }
        }
      },
      click_dis_s:function(){
        if (this.set_newPsd != "" || this.isLoading){
          return false
        }
        else {
          return true
        }
      },
      click_opacity_s: function(){ // 使用按钮样式
      if (this.set_newPsd != "" && !this.isLoading) {
          return {
            click_opacity: false
          }
        }
        else {
          return {
            click_opacity: true
          }
        }
      },
      click_dis_q:function(){
        if ((this.set_newPsd != "" && this.confirm_newPsd != "") || this.isLoading){
          return false
        }
        else {
          return true
        }
      },
      click_opacity_q: function(){ // 使用按钮样式
      if ((this.set_newPsd != "" && this.confirm_newPsd != "") && !this.isLoading) {
          return {
            click_opacity: false
          }
        }
        else {
          return {
            click_opacity: true
          }
        }
      },
    },
    methods: {

    	updateMobile(){
    		let that=this;
        that.phoneMobile=localStorage.getItem('loginAccount');
        //前3后4，中间用*代替
        let num=that.phoneMobile.substr(0,3)+"****"+that.phoneMobile.substr(7,4);
        that.phoneUser=num;
	      // that.$http({
	  		// 	method:"get",
	  		// 	url:api.user,
	  		// 	headers:headers("application/json;charset=utf-8"),
	  		// 	cache:false
	  		// }).then(function(res){
	  		// 	if(res.data.code==10000 && res.data!=""){
	  		// 		let mobile=res.data.data.enterprisePhone;
	  		// 		that.phoneMobile=res.data.data.enterprisePhone;
	  		// 		//前3后4，中间用*代替
	  		// 		let num=mobile.substr(0,3)+"****"+mobile.substr(7,4);
	  		// 		that.phoneUser=num;
	  		// 	}
		   //  });
    	},
    	updateMobile_sms(){
    		let that=this;
//  		that.codeState = false;
    		that.timingCode();//倒计时方法
	      that.$http({//发送验证码
					method:"post",
					url:api.smstoken+"/"+that.phoneMobile+'/46',
					headers:headers(),
//	  			data:"mobile="+that.phoneMobile,
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code===10000){
				    that.$message({
		          message: '成功发送验证码，请查看',
		          type: 'success'
		         });
	  			}else{
	  				that.$message.error(res.message || res.data.msg);
	  				that.codeState = true;
	  			}

	  		});
    	},
      next(){//下一步按钮
      	let that=this;
      	if(that.updateMobile_f_code==""){
            that.errorMsg = "请输入验证码";
            that.objecthide.hide=false;
            return false;
      	}else if(that.updateMobile_f_code.length != 6){
            that.errorMsg = "请输入正确的验证码";
            that.objecthide.hide=false;
            return false;
      	}else{
      		that.objecthide.hide=true;
          that.$http({
      			method:"post",
      			url:api.update_password,
      			headers:headers(),
      			data:{
      				phone:that.phoneMobile,
      				vcode:that.updateMobile_f_code,
      				type:0
      			},
      			//"smsCode="+that.updateMobile_f_code+'&mobile='+localStorage.getItem('phone'),
      			cache:false
      		}).then(function(res){
                if (res.data.code == 10000 && res.data != "") {
                    that.flag = false;
                    that.objecthide.hide=true;
                } else {
				            that.errorMsg = "验证码错误";
				            that.objecthide.hide=false;
                    return;
                }
            })

      	}

      },
      updatePsd_q(){
      	let that=this;
      	if(that.set_newPsd=="" || that.set_newPsd==undefined){
	        that.errorMsg = "请输入新密码";
	        that.objecthide_new.hide=false;
	        return false;
      	}else if(that.confirm_newPsd=="" || that.confirm_newPsd==undefined){
	        that.errorMsg = "请输入确认密码";
	        that.objecthide_new.hide=false;
	        return false;
      	}else if(that.set_newPsd != that.confirm_newPsd){
	        that.errorMsg = "两次输入的密码不一致";
	        that.objecthide_new.hide=false;
	        return false;
      	}else{
          that.$http({
      			method:"post",
      			url:api.update_password,
      			headers:headers(),
      			data:{
      				phone:that.phoneMobile,
      				password:that.set_newPsd,
      				type:1
      			},
      			cache:false
      		}).then(function(res){
              if (res.data.code == 10000 && res.data != "") {
					        that.$message({
					          message: '恭喜你，修改成功请重新登录',
					          type: 'success'
					        });
                	localStorage.clear();
                  that.$router.push('/login');
              } else {
			            that.errorMsg = res.data.msg;
			            that.objecthide_new.hide=false;
                  return;
              }
            })
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
	 mounted(){
	 	 let that=this;
	 	 that.updateMobile();
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
}
.main .right-content .content .headline span{    display: inline-block;
    height: 100%;
    line-height: 50px;
    padding: 0 10px;
    margin: 0 10px;
    }
.hide {
    display: none !important;
}
.mobile-content .error-info{
	margin: 0 0 26px !important;
}
.time_div{
	color: #97A2B3 !important;
    letter-spacing: 0.19px !important;
    background: #F5F5F5 !important;
    border: 1px solid #EEEEEE !important;
    border-radius: 4px;
    opacity: 1 !important;
}

.different{width: 63px;
    text-align: right;}
.error_div_img{
    float: left;
    display: inline-block;
    margin: -1.3px 0px;
}
</style>
