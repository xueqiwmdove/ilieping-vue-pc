<template>
  <div>
  	<div class="mainCon el-col-24">
  		<!--顶部导航-->
  	<pageheader class="pageheader"></pageheader>
  		<!--侧边栏-->
  		<!--<div class="aside">-->
  			<pageaside></pageaside>
  		<!--</div>-->
  		<!--右侧内容栏-->
  		<div class="right-content pull-right">
  			<div class="content">
  				<!--主体内容-->

    <p class="headline">
        <span><i>账号安全</i> /修改手机号</span>
    </p>
    <div class="account-content">
    <!--第一步-->
    <div class="mobile-content" id="updateMobile_f_code_div" v-show="flag">
        <div class="error-info">
          <div class="error_div_img"><img src="../../assets/img/reg/info.svg" ></div>您正在修改手机号，请先使用手机验证码验证身份。
        </div>
        <p>当前手机号码：<span class="telephone">{{phoneUser}}</span></p>
         <div class="form-group">
             <label for="updateMobile_f_code_id">验证码</label>
             <input type="text" autocomplete="off" id="updateMobile_f_code_id" v-model="updateMobile_f_code" placeholder="请输入验证码" minlenght='6' maxlength="6" v-bind:pattern="/d{6}$/">
             <button class="getYzm" id="updateMobile_f_sendPhoneCode" @click="updateMobile_sms" v-if="codeState">获取验证码</button>
             <button class="getYzm time_div" disabled="true" v-if="codeState2">{{timeNum}}s后重发</button>
         </div>
        <p class="error-info errorMsg warning" :class="objecthide">
            <img src="../../assets/img/reg/info.svg" >{{errorMsg}}
        </p>
        <div class="form-group">
            <input type="button" id="input_btn" class="button next click_acive" :class="click_opacity_next"  value="下一步" :disabled="click_dis_next" @click="next()">
        </div>


    </div>
    <!--第二步-->
    <div class="mobile-content" id="updateMobile_s_div" v-show="!flag">
        <div class="form-group">
            <label for="updateMobile_s_newMobile">新手机号</label>
            <input type="text" autocomplete="off" id="updateMobile_s_newMobile" v-model="updateMobile_s_newMobile" minlength='11' maxlength="11" style="width: 300px;" @blur="isPhone" placeholder="请输入新手机号码">
        </div>
        <div class="form-group">
            <label class="different">验证码</label>
            <input type="text" class="yzm" autocomplete="off" id="newCode" v-model="newCode" placeholder="请输入验证码" minlength='6' maxlength="6">
             <button class="getYzm2" id="updateMobile_s_sendPhoneCode" :class="click_opacity_s" :disabled="click_dis_s" @click="updateMobile_new_sms" v-if="codeState_new">获取验证码</button>
             <button class="getYzm2 time_div" disabled="true" v-if="codeState2_new">{{timeNum_new}}s后重发</button>
        </div>
        <p class="error-info errorMsg warning" :class="objecthide_new">
            <img src="../../assets/img/reg/info.svg" >{{errorMsg}}
        </p>

        <div class="form-group">
            <input type="button" class="button submit click_acive" id="updateMobile_s_sendPhonebtn" :class="click_opacity_q" :disabled="click_dis_q" @click="updateMobile_q" value="确定">
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
  name: 'updateMobile',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
				flag:true,
				updateMobile_f_code:'',
				errorMsg:'',
				newCode:'',
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
				updateMobile_s_newMobile:'',
				objecthide_new:{
					hide:true
				}
      };
    },
    watch:{
      updateMobile_f_code:function(){
      	this.updateMobile_f_code=this.updateMobile_f_code.replace(/[^\d]/g,'');
      },
      updateMobile_s_newMobile:function(){
      	this.updateMobile_s_newMobile=this.updateMobile_s_newMobile.replace(/[^\d]/g,'');
      },
      newCode:function(){
      	this.newCode=this.newCode.replace(/[^\d]/g,'');
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
        if ((this.updateMobile_s_newMobile != "" && this.updateMobile_s_newMobile.length == 11) || this.isLoading){
          return false
        }
        else {
          return true
        }
      },
      click_opacity_s: function(){ // 使用按钮样式
      if ((this.updateMobile_s_newMobile != "" && this.updateMobile_s_newMobile.length == 11) && !this.isLoading) {
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
        if ((this.updateMobile_s_newMobile != "" && this.updateMobile_s_newMobile.length == 11 && this.newCode != "" &&this.newCode.length == 6) || this.isLoading){
          return false
        }
        else {
          return true
        }
      },
      click_opacity_q: function(){ // 使用按钮样式
      if ((this.updateMobile_s_newMobile != "" && this.updateMobile_s_newMobile.length == 11 && this.newCode != "" &&this.newCode.length == 6) && !this.isLoading) {
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
    //验证该手机号是否已注册
      isPhone(){
      	let that=this;
      	if(that.updateMobile_s_newMobile==""){
      		that.err_div=true;
      		that.err_info='请填写手机号码';
      		return false;
      	}else if(!that.updateMobile_s_newMobile.match(/^1[345678]\d{9}/)){
      		that.err_div=true;
      		that.err_info='请正确手机号码';
      		return false;
      	}else{
      		that.$http({
	  			method:"post",
	  			url:api.isPhone+that.updateMobile_s_newMobile,
	  			headers:headers("application/x-www-form-urlencoded"),
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code===10000){
	  				console.log(res.data.data);
	          if(!res.data.data){
	          	that.isphonevalue=true;
	          }else{
	          	that.isphonevalue=false;
              that.err_div=true;
		          that.err_info='该手机号已注册,请点击立即登录';
	          }
	  			}else{
	  				that.$message.error(res.message || res.data.msg);
	  			}

	  		});
      	}

      },
    	updateMobile(){
    		let that=this;
        that.phoneMobile=localStorage.getItem('loginAccount');
        //前3后4，中间用*代替
        let num=that.phoneMobile.substr(0,3)+"****"+that.phoneMobile.substr(7,4);
        that.phoneUser=num;
	     /* that.$http({
	  			method:"get",
	  			url:api.user,
	  			headers:headers("application/json;charset=utf-8"),
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code==10000 && res.data!=""){
	  				let mobile=res.data.data.enterprisePhone;
	  				that.phoneMobile=res.data.data.enterprisePhone;
	  				//前3后4，中间用*代替
	  				let num=mobile.substr(0,3)+"****"+mobile.substr(7,4);
	  				that.phoneUser=num;
	  			}
		    });*/
    	},
    	updateMobile_sms(){
    		let that=this;
//  		that.codeState = false;
    		that.timingCode();//倒计时方法
    		//发送验证码
          that.$http({
						method:"post",
						url:api.smstoken+"/"+that.phoneMobile+'/42',
						headers:headers(),
//    			data:"mobile="+that.phoneMobile,
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
    	updateMobile_new_sms(){
    		let that=this;
    		if(that.updateMobile_s_newMobile.length!=11){
            that.errorMsg = "请输入正确的手机号码";
            that.objecthide_new.hide=false;
            return false;
        }else if(that.updateMobile_s_newMobile == window.localStorage.getItem("oldPhone")){
            that.errorMsg = "新手机号不能和旧手机号一样";
            that.objecthide_new.hide=false;
            return false;
    		}else{
//  			that.codeState_new = false;
    			that.timingCode_new();//倒计时方法
          that.$http({//发送验证码
						method:"post",
						url:api.smstoken+"/"+that.updateMobile_s_newMobile+'/42',
						headers:headers(),
//    			data:"mobile="+that.updateMobile_s_newMobile,
      			cache:false
      		}).then(function(res){
      			if(res.data.code===10000){

				     that.$message({
		          message: '成功发送验证码，请查看',
		          type: 'success'
		         });
      			}else{
      				that.$message.error(res.message || res.data.msg);
      				that.codeState_new = true;
      			}

      		});
      		}
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
          that.$http({
      			method:"post",
      			url:api.update_phone,
      			headers:headers(),
      			data:{
      				oldPhone:that.phoneMobile,
      				smsCode:that.updateMobile_f_code,
      				type:0
      			},
      			//"smsCode="+that.updateMobile_f_code,
      			cache:false
      		}).then(function(res){
                if (res.data.code == 10000 && res.data != "") {
                    that.flag = false;
                    that.objecthide.hide=false;
                } else {
				            that.errorMsg = "验证码错误";
				            that.objecthide.hide=false;
                    return;
                }
            })

      	}

      },
      updateMobile_q(){
      	let that=this;
      	if(that.updateMobile_s_newMobile=="" || that.updateMobile_s_newMobile==undefined){
	        that.errorMsg = "请输入新手机号";
	        that.objecthide.hide=false;
	        return false;
      	}else if(that.newCode=="" || that.newCode==undefined){
	        that.errorMsg = "请输入验证码";
	        that.objecthide.hide=false;
	        return false;
      	}else if(that.updateMobile_s_newMobile.length!=11 && that.newCode.length!=6){
	        that.errorMsg = "请输入正确的验证码";
	        that.objecthide.hide=false;
	        return false;
      	}else{
		      that.$http({
		  			method:"post",
		  			url:api.update_phone,
		  			headers:headers(),
		  			data:{
				    newPhone:that.updateMobile_s_newMobile,
				    oldPhone:window.localStorage.getItem("oldPhone"),
				    smsCode:that.newCode,
				    type:2
		  			},
		  			//"newPhone="+that.updateMobile_s_newMobile+'&oldPhone='+window.localStorage.getItem("oldPhone")+'&smsCode='+that.newCode,
		  			cache:false
		  		}).then(function(res){
						if (res.data.code == 10000 && res.data != "") {
			        that.$message({
			          message: '恭喜你，修改成功',
			          type: 'success'
			        });
				    localStorage.clear();
				    that.$router.push('/login');
				    } else {
	            that.errorMsg = res.data.msg;
	            that.objecthide.hide=false;
	            return;
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
      timingCode_new() {
      	let that=this;
        let interval = setInterval(() => {
          if (that.timeNum_new > 0 && this.timeNum_new < 61) {
            that.codeState_new = false;
            that.codeState2_new=true;
            that.timeNum_new--;
          }
          else if (that.timeNum_new == 0) {
            that.codeState_new = true;
            that.codeState2_new=false;
            clearInterval(interval);
            that.timeNum_new = 60;
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
.getYzm2{
	vertical-align: middle;
}
.form-group .different{display: inline-block;}
.error_div_img{
    float: left;
    display: inline-block;
    margin: -1.3px 0px;
}
</style>
