<template>
	<div>
  <!--顶部导航-->
  <pageheader class="pageheader"></pageheader>
  <div class="main">
  <div class="content">

  <div class="reg">
    <div>
    	<div class="title x-center">完善企业信息</div>
	    <span class="circle_left"></span>
	    <span class="circle_right"></span>
    	<div class="form_reCompany">
     <!--错误提示-->
     <div class="phone-error-info " v-if="err_div">
         <img src="../../assets/images/reg/info.svg" alt="提示">
         <span>{{err_info}}</span>
     </div>
	    <!--完善企业信息-->
	        <div class="form-group">
	            <label>企业名称</label>
	            <input type="text" v-model="companyName" autocomplete="off" class="form-control mobile" id="companyName" placeholder="请输入企业名称" required maxlength="20">
	        </div>
		    <div class="form-group">
		      <label>企业规模</label>
	          <el-select v-model="value_scale" placeholder="请选择企业规模" style="width: 400px; height: 44px; line-height: 44px;" required>
			    <el-option v-for="(item,key) in options" :label="item.label" :value="item.value" :key="key"></el-option>
			  </el-select>
		    </div>
		    <div class="form-group">
		        <label>所属行业</label>
	          <el-select v-model="value_industry" placeholder="请选择所属行业" style="width: 400px; height: 44px; line-height: 44px;" required @keyup.enter="get_regCompany">
			    <el-option v-for="(item,key) in options_industry" :label="item.label" :value="item.value" :key="key"></el-option>
			  </el-select>
		    </div>

	        <div class="regButton">
	            <input type="button" class="button" name="reg" value="注册" :class="click_button_reg" :disabled="button_reg_dis" @click="get_regCompany"/>
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
  name: 'regCompany',
 	components: {
       pageheader
	},
   data() {
      return {
       err_div:false,
       err_info:'',
       companyName:'',
       options: [{
          value: '少于50人',
          label: '少于50人'
        }, {
          value: '50-100人',
          label: '50-100人'
        }, {
          value: '150-500人',
          label: '150-500人'
        }, {
          value: '500-1000人',
          label: '500-1000人'
        }, {
          value: '1000-5000人',
          label: '1000-5000人'
        }, {
          value: '5000-10000人',
          label: '5000-10000人'
        },{
          value: '10000人以上',
          label: '10000人以上'
        }
        ],
        value_scale: '',
        options_industry: [{
          value: '计算机/互联网/通信/电子',
          label: '计算机/互联网/通信/电子'
        }, {
          value: '贸易消费/制造/营运',
          label: '贸易消费/制造/营运'
        }, {
          value: '制药/医疗制药/医疗',
          label: '制药/医疗制药/医疗'
        }, {
          value: '广告/媒体',
          label: '广告/媒体'
        }, {
          value: '房地产/建筑',
          label: '房地产/建筑'
        }, {
          value: '专业服务/教育/培训',
          label: '专业服务/教育/培训'
        },{
          value: '能源/原材料能源/原材料',
          label: '能源/原材料能源/原材料'
        },{
          value: '政府/非盈利机构/其他',
          label: '政府/非盈利机构/其他'
        },{
          value: '金融业/证劵',
          label: '金融业/证劵'
        }
        ],
        value_industry: ''
      };
    },
	computed: {
      click_button_reg: function(){ // 使用按钮样式验证码
      if ((this.companyName != "" && this.value_scale != "" && this.value_industry!="") && !this.isLoading) {
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
        if ((this.companyName != "" && this.value_scale != "" && this.value_industry!="") && !this.isLoading) {
          return false
        }
        else {
          return true
        }
      },
	},
    methods: {
    	get_regCompany(){//注册
      	let that=this;
      	if(that.companyName==""){
      		that.err_div=true;
      		that.err_info='请输入企业名称';
      		return false;
      	}else if(that.value_scale==""){
      		that.err_div=true;
      		that.err_info='请选择企业规模';
      		return false;
      	}else if(that.value_industry==""){
      		that.err_div=true;
      		that.err_info='请选择所属行业';
      		return false;
      	}else{
          that.$http({
      			method:"post",
      			url:api.register,
      			headers:headers("application/x-www-form-urlencoded"),
      			data:"enterprisePhone="+localStorage.getItem("phone")+'&enterprisePassword='+localStorage.getItem("password")+'&enterpriseScale='+that.value_scale+'&enterpriseName='+that.companyName+'&enterpriseIndustry='+that.value_industry+'&registerCode='+localStorage.getItem("registerCode"),
      			cache:false
      		}).then(function(res){
      			console.log(res);
      			console.log(res.data.code);
      			if(res.data.code===10000){
      				//localStorage.clear();
                    that.$router.push('regSuccess');
      			}else{
      				that.$message.error(res.data.msg);
      			}

      		});

      	}
      },

      click_agree() {//用户协议
        this.$router.push('agree');
      },
      click_login() {//立即登录
        this.$router.push('/login');
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reg{
    width: 480px;
    /*height: 624px;*/
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
.reg .form_reCompany{
	font-size: 16px;
  letter-spacing: 0.19px;
}
.reg .form_reCompany > div {
    width: 400px;
    /*margin: 20px auto auto;*/
}
.footer{
  margin: 20px auto auto;
}
.reg .form_reCompany .phone-error-info{
	  font-size: 0;
    height: 19px;
    margin: 16px auto auto;
    width: 400px;
    display: none;
}
.phone-error-info img {
    float: left;
    display: inline-block;
    margin-top: -1px;
}
.reg .form_reCompany .form-group{
	width: 400px;
  margin: 20px auto auto;
  text-align: left;
  }
.reg .form_reCompany .form-group label{
	  display:block;
    max-width: 100%;
	  font-size: 16px;
    color: #748093;
    letter-spacing: 0.19px;
    margin: 0 0 10px 0;
    font-weight: normal;
}
.reg .form_reCompany .form-group .form-control{
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
.reg .form_reCompany .has-no-account {
    margin: 62px 0 0;
    color: #999999;
    letter-spacing: 0.14px;
    position: relative;
}
.reg .form_reCompany .inputYzm {
    width: 260px !important;
    display: inline-block !important;
}
.reg .form_reCompany > div .getYzm {
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
.reg .regButton {
  margin: 40px auto 20px;
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
}
.footer .pull-left{
	float: left;
}
.footer .pull-right{
	float: right;
}

.footer .pull-left .agreement,.footer .pull-right .reg_login{color: #2569F6;cursor: pointer;}
.reg .form_reCompany .getYzm{
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
</style>
