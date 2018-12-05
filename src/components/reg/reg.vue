<template>
	<div>
  <!--顶部导航-->
  <pageheader class="pageheader"></pageheader>
  <div class="main">
  <div class="content">

  <div class="reg" v-show="IsReg">
    <div>
    	<div class="title x-center">注册爱猎评</div>
	    <span class="circle_left"></span>
	    <span class="circle_right"></span>
    	<div class="form">
     <!--错误提示-->
     <div class="phone-error-info " v-if="err_div">
         <img src="../../assets/images/reg/info.svg" alt="提示">
         <span>{{err_info}}</span>
     </div>
	    <!--注册-->
	        <div class="form-group">
	            <label>手机号码</label>
	            <input type="tel" v-model="reg_phone" autocomplete="off" class="form-control mobile" id="registerPhone" placeholder="请输入手机号码" maxlength="11" @blur="isPhone">
	        </div>
			<div class="form-group box-psd">
			    <label>短信验证码</label>
			    <input type="text" class="form-control inputYzm" autocomplete="off" v-model="txt_code" id="yzm" placeholder="请输入短信验证码" maxlength="6">
			    <button class="button getYzm pull-right" @click="get_code" v-if="codeState" :class="click_button_phone" :disabled="button_phone_dis">获取验证码</button>
			    <button class="button getYzm pull-right time_div" disabled="true" v-if="codeState2">{{timeNum}}s后重发</button>
			</div>
	        <div class="form-group">
	            <label>登录密码</label>
	            <input type="password" class="form-control password" autocomplete="off" @keyup.enter="click_regCompany" v-model="reg_password" placeholder="请设置6-16位登录密码" id="password" minlength='6' maxlength="16">
	        </div>
	        <div class="regButton">
	            <input type="button" class="button" name="reg" value="下一步" :class="click_button_reg" :disabled="button_reg_dis" @click="click_regCompany"/>
	        </div>
	        <div class="footer">
	            <span class="pull-left">
	                点击注册表示同意
	                <span class="agreement" @click="click_agree">《爱猎评用户协议》</span>
	            </span>
	            <span class="pull-right">
	                如已有账号，请
	                <span class="reg_login" @click="click_login">立即登录</span>
	                <em class="triangle"></em>
	            </span>
	        </div>
	    </div>
    </div>
  </div><!-- 注册框 end -->
	<div class="agreePage" v-show="IsAgreePage"><!-- 协议框 start -->
	        <div class="classify">
	            <!-- <router-link to="/reg">注册</router-link> -->
	            <span class="active user">用户协议</span>
							<span class="el-icon-close close_span" @click="click_close"></span>
	        </div>
	        <div class="content">
	            <p class="title">
	                爱猎评用户协议
	            </p>
	            <div>
	                <p>一、总则</p>
	                <p>1.1 爱猎评的所有权和运营权归上海棋至文化传媒有限公司所有。</p>
	                <p>1.2 用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与爱猎评之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。</p>
	                <p>1.3 本协议则可由爱猎评随时更新，用户应当及时关注并同意本站不承担通知义务。本站的通知、公告、声明或其它类似内容是本协议的一部分。</p>
	
	                <p>二、服务内容</p>
	                <p>2.1 爱猎评的具体内容由本站根据实际情况提供。</p>
	                <p>2.2 本站仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。</p>
	
	                <p>三、用户帐号</p>
	                <p>3.1 经本站注册系统完成注册程序并通过身份认证的用户即成为正式用户，可以获得本站规定用户所应享有的一切权限；未经认证仅享有本站规定的部分会员权限。保宝网有权对会员的权限设计进行变更。</p>
	                <p>3.2 用户只能按照注册要求使用真实姓名，及身份证号注册。用户有义务保证密码和帐号的安全，用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。</p>
	
	                <p>四、使用规则</p>
	                <p>4.1 遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释󞪄]1号)》、《全国人大常委会关于维护互联网安全的决定》、《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》和《信息网络传播权保护条例》等有关计算机互联网规定和知识产权的法律和法规、实施办法。</p>
	                <p>4.2 用户对其自行发表、上传或传送的内容负全部责任，所有用户不得在本站任何页面发布、转载、传送含有下列内容之一的信息，否则本站有权自行处理并不通知用户：</p>
	                <p>(1)违反宪法确定的基本原则的；</p>
	                <p>(2)危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的；</p>
	                <p>(3)损害国家荣誉和利益的；</p>
	                <p>(4)煽动民族仇恨、民族歧视，破坏民族团结的；</p>
	                <p>(5)破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
	                <p>(6)散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
	                <p>(7)散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</p>
	                <p>(8)侮辱或者诽谤他人，侵害他人合法权益的；</p>
	                <p>(9)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；</p>
	                <p>(10)以非法民间组织名义活动的；</p>
	                <p>(11)含有法律、行政法规禁止的其他内容的。</p>
	                <p>4.3 用户承诺对其发表或者上传于本站的所有信息(即属于《中华人民共和国著作权法》规定的作品，包括但不限于文字、图片、音乐、电影、表演和录音录像制品和电脑程序等)均享有完整的知识产权，或者已经得到相关权利人的合法授权；如用户违反本条规定造成本站被第三人索赔的，用户应全额补偿本站一切费用(包括但不限于各种赔偿费、诉讼代理费及为此支出的其它合理费用)；</p>
	                <p>4.4 当第三方认为用户发表或者上传于本站的信息侵犯其权利，并根据《信息网络传播权保护条例》或者相关法律规定向本站发送权利通知书时，用户同意本站可以自行判断决定删除涉嫌侵权信息，除非用户提交书面证据材料排除侵权的可能性，本站将不会自动恢复上述删除的信息；</p>
	                <p>(1)不得为任何非法目的而使用网络服务系统；</p>
	                <p>(2)遵守所有与网络服务有关的网络协议、规定和程序；</p>
	                <p>(3)不得利用本站进行任何可能对互联网的正常运转造成不利影响的行为；</p>
	                <p>(4)不得利用本站进行任何不利于本站的行为。</p>
	                <p>4.5 如用户在使用网络服务时违反上述任何规定，本站有权要求用户改正或直接采取一切必要的措施(包括但不限于删除用户张贴的内容、暂停或终止用户使用网络服务的权利)以减轻用户不当行为而造成的影响。</p>
	
	                <p>五、隐私保护</p>
	                <p>5.1 本站不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在本站的非公开内容，但下列情况除外：</p>
	                <p>(1)事先获得用户的明确授权；</p>
	                <p>(2)根据有关的法律法规要求；</p>
	                <p>(3)按照相关政府主管部门的要求；</p>
	                <p>(4)为维护社会公众的利益。</p>
	                <p>5.2 本站可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本站同等的保护用户隐私的责任，则本站有权将用户的注册资料等提供给该第三方。</p>
	                <p>5.3 在不透露单个用户隐私资料的前提下，本站有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p>
	
	                <p>六、版权声明</p>
	                <p>6.1 本站的文字、图片、音频、视频等版权均归上海棋至文化传媒有限公司享有或与作者共同享有，未经本站许可，不得任意转载。</p>
	                <p>6.2 本站特有的标识、版面设计、编排方式等版权均属上海棋至文化传媒有限公司享有，未经本站许可，不得任意复制或转载。</p>
	                <p>6.3 使用本站的任何内容均应注明“来源于爱猎评”及署上作者姓名，按法律规定需要支付稿酬的，应当通知本站及作者及支付稿酬，并独立承担一切法律责任。</p>
	                <p>6.4 本站享有所有作品用于其它用途的优先权，包括但不限于网站、电子杂志、平面出版等，但在使用前会通知作者，并按同行业的标准支付稿酬。</p>
	                <p>6.5 本站所有内容仅代表作者自己的立场和观点，与本站无关，由作者本人承担一切法律责任。</p>
	                <p>6.6 恶意转载本站内容的，本站保留将其诉诸法律的权利。</p>
	
	                <p>七、责任声明</p>
	                <p>7.1 用户明确同意其使用本站网络服务所存在的风险及一切后果将完全由用户本人承担，爱猎评对此不承担任何责任。</p>
	                <p>7.2 本站无法保证网络服务一定能满足用户的要求，也不保证网络服务的及时性、安全性、准确性。</p>
	                <p>7.3 本站不保证为方便用户而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由本站实际控制的任何网页上的内容，本站不承担任何责任。</p>
	                <p>7.4 对于因不可抗力或本站不能控制的原因造成的网络服务中断或其它缺陷，本站不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</p>
	                <p>7.5 对于站向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本站无需承担任何责任：</p>
	                <p>(1)本站向用户免费提供的各项网络服务；</p>
	                <p>(2)本站向用户赠送的任何产品或者服务。</p>
	                <p>7.6 本站有权于任何时间暂时或永久修改或终止本服务(或其任何部分)，而无论其通知与否，本站对用户和任何第三人均无需承担任何责任。</p>
	
	                <p>八、附则</p>
	                <p>8.1 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p>
	                <p>8.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>
	                <p>8.3 本协议解释权及修订权归上海棋至文化传媒有限公司所有。</p>
	
	            </div>
	        </div>
	    </div><!-- 协议框 end -->
</div>
</div>
</div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader_reg';
  import store from 'store' //引入储存信息store的插件
export default {
  name: 'reg',
 	components: {
    pageheader
	},
   data() {
      return {
       reg_phone:'',
       err_div:false,
       err_info:'',
       txt_code:"",
			 codeState:true,
			 codeState2:false,
			 timeNum: 60,
       reg_password:'',
       isphonevalue:false,
			 IsReg:true,
			 IsAgreePage:false
      };
    },
    watch:{
      reg_phone:function(){
      	this.reg_phone=this.reg_phone.replace(/[^\d]/g,'');
      },
      txt_code:function(){
      	this.txt_code=this.txt_code.replace(/[^\d]/g,'');
      },
      reg_password:function(){
      	this.reg_password=this.reg_password.replace(/[\W]/g,'');
      }
    },
    computed: {
      click_button_phone: function(){ // 使用按钮样式验证码
      if ((this.reg_phone != "" && this.reg_phone.length == 11) && !this.isLoading) {
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
        if ((this.reg_phone != "" && this.reg_phone.length == 11) && !this.isLoading) {
          return false
        }
        else {
          return true
        }
      },
      click_button_reg: function(){ // 使用按钮样式验证码
      if ((this.reg_phone != "" && this.reg_phone.length == 11) && (this.txt_code != "" && this.txt_code.length == 6) && this.reg_password != '' && !this.isLoading) {
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
      button_reg_dis: function () {
        if ((this.reg_phone != "" && this.reg_phone.length == 11) && (this.txt_code != "" && this.txt_code.length == 6) && this.reg_password!='' && !this.isLoading) {
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
      	if(that.reg_phone==""){
      		that.err_div=true;
      		that.err_info='请填写手机号码';
      		return false;
      	}else if(!that.reg_phone.match(/^1[345678]\d{9}/)){
      		that.err_div=true;
      		that.err_info='请正确手机号码';
      		return false;
      	}else{
      	 that.err_div=false;
      		that.$http({
	  			method:"post",
	  			url:api.isPhone+that.reg_phone,
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
	  				that.$message.error(res.data.msg);
	  			}

	  		});
      	}

      },
     get_code(){//获取验证码
      	let that=this;
      	if(that.reg_phone==""){
      		that.err_div=true;
      		that.err_info='请填写手机号码';
      		return false;
      	}else if(!that.reg_phone.match(/^1[345678]\d{9}/)){
      		that.err_div=true;
      		that.err_info='请正确手机号码';
      		return false;
      	}else if(that.isphonevalue==false){
            that.err_div=true;
		    that.err_info='该手机号已注册,请点击立即登录';
          return false;
      	}else{
      	  that.err_div=false;
      	  that.codeState=false;
          that.$http({//发送验证码
      			method:"post",
      			url:api.smstoken+'/'+that.reg_phone+'/43',
      			headers:headers(),
//    			data:"mobile="+that.reg_phone,
      			cache:false
      		}).then(function(res){
      			console.log(res);
      			console.log(res.data.code);
      			if(res.data.code===10000){
	             that.codeState = false;
	             that.codeState2=true;	
      		     that.timingCode();//倒计时
      			}else{
      			 that.$message.error(res.data.msg);
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
			click_close(){
				let that=this;
				that.IsReg=true;
				that.IsAgreePage=false;
			},
      click_agree() {//用户协议
        // this.$router.push('agree');
				let that=this;
				that.IsReg=false;
				that.IsAgreePage=true;
      },
      click_login() {//立即登录
        this.$router.push('/login');
      },
      click_regCompany(){
      	let that=this;
      	if(that.reg_phone==""){
      		that.err_div=true;
      		that.err_info='请填写手机号码';
      		return false;
      	}else if(!that.reg_phone.match(/^1[345678]\d{9}/)){
      		that.err_div=true;
      		that.err_info='请正确手机号码';
      		return false;
      	}else if(that.txt_code==""){
      		that.err_div=true;
      		that.err_info='请输入验证码';
      		return false;
      	}else if(that.txt_code.length!=6){
      		that.err_div=true;
      		that.err_info='请输入正确验证码';
      		return false;
      	}else if(!that.reg_password.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,16}$/)){
      		that.err_div=true;
      		that.err_info='请设置6-16位登录密码且必须包含字母和数字';
      		return false;
      	}else{
      	  that.err_div=false;
          that.$http({ //验证验证码是否正确
      			method:"post",
      			url:api.validate+'/'+that.reg_phone+'/'+that.txt_code,
      			headers:headers(),
//    			data:"smsCode="+that.txt_code+"&mobile="+that.reg_phone,
      			cache:false
      		}).then(function(res){
               if(res.data.code===10000){
		      	   localStorage.setItem('phone',that.reg_phone);
		      	   localStorage.setItem('password',that.reg_password);
		      	   let registerCode=res.data.data;
                   localStorage.setItem('registerCode',registerCode); 
		      	   that.$router.push('regCompany');
      			}else{
		  		  that.$message.error(res.data.msg);
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
    padding-bottom: 38px;
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
  text-align: left;
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
    margin: 20px auto auto;
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
.footer{
	font-size: 12px;
  color: #999999;
  letter-spacing: 0.14px;
  margin-top: 30px;
}
.footer .pull-left{
	float: left;
}
.footer .pull-right{
	float: right;
}
.form input{
	min-width: 0;
}
.footer .pull-left .agreement,.footer .pull-right .reg_login{color: #2569F6; cursor: pointer;}
.reg .form .getYzm{
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
    float: right;
    margin-top: 0px;
}
.click_btn{opacity: 0.6;}
.time_div{
	color: #97A2B3 !important;
    letter-spacing: 0.19px !important;
    background: #F5F5F5 !important;
    border: 1px solid #EEEEEE !important;
    border-radius: 4px;
    opacity: 1 !important;
}
/* 注册协议 */
.agreePage{
 	max-width: 1280px;
    margin: 60px 30px 30px 30px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    padding: 0 20px 36px;
 }
 .agreePage .classify {
    border-bottom: 1px solid #E5E5E5;
    text-align: left;
}
.agreePage .classify span {
    text-align: center;
    font-size: 16px;
    color: #21324E;
    letter-spacing: 0;
    height: 48px;
    line-height: 48px;
}
.agreePage .classify span.active {
    color: #FC8E00;
    border-bottom: 2px solid #FC8E00;
  margin: 0 10px;
  padding: 0 10px;
}
.agreePage .classify .user {
    width: auto;
    display: inline-block;
}
.agreePage .classify span {
    text-align: center;
    font-size: 16px;
    color: #21324E;
    letter-spacing: 0;
    height: 48px;
    line-height: 48px;
}
.agreePage .content div {
    font-size: 14px;
    color: #748093;
    letter-spacing: 0.16px;
    line-height: 24px;
}
.main .agreePage .content .title {
    height: 68px;
    line-height: 68px;
    text-align: center;
    font-size: 20px;
    color: #282828;
    letter-spacing: 0;
}
.close_span{
	display: inline-block;
	float: right;
}
</style>
