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
			      <span>企业资料</span>
			    </p>
    <div class="company-content" >
        <div class="module">
            <p class="module-title">公司名称</p>
            <p class="module-content">
                {{companyData.enterpriseName}}
                <span class="active" style="color: #fc8e00;" v-if="companyData.isAuthentication=='3'">
                    <img src="../../assets/images/account/af_authentication.png">
                    已认证
                </span>
                <span v-if="companyData.isAuthentication=='1'">
                    <img src="../../assets/images/account/authentication.png">
                    <span class="span_color">未认证</span>
                    <span class="pull-right" @click="certificate" v-if="loginType!=1">企业认证</span>
                </span>
                <span class="activing" v-if="companyData.isAuthentication=='2'">
                    <img src="../../assets/images/account/审核中.png" >
                   审核中
                </span>
                <span class="active_error" v-if="companyData.isAuthentication=='0'">
                    <img src="../../assets/img/account/icon_reject.svg">
                   审核失败
                      <span class="pull-right" @click="certificate" v-if="loginType!=1">企业认证</span>
                </span>
            </p>
        </div>
        <div class="module">
            <p class="module-title">所属行业</p>
            <p class="module-content no-result" v-if="companyData.enterpriseIndustry==null">
                未设置
                <span class="pull-right" @click="updateIndustry" v-if="loginType!=1">立即设置</span>
            </p>
            <p class="module-content " v-if="companyData.enterpriseIndustry!=null">
                {{companyData.enterpriseIndustry}}
                <span class="pull-right" @click="updateIndustry" v-if="loginType!=1">修改</span>
            </p>
        </div>
        <div class="module">
            <p class="module-title">企业规模</p>
            <p class="module-content  no-result" v-if="companyData.enterpriseScale==null">
                未设置
                <span class="pull-right" @click="updateScale" v-if="loginType!=1">立即设置</span>
            </p>
            <p class="module-content" v-if="companyData.enterpriseScale!=null">
               {{companyData.enterpriseScale}}
                <span class="pull-right" @click="updateScale" v-if="loginType!=1">修改</span>
            </p>
        </div>
        <div class="module ">
            <p class="module-title">企业地址</p>
            <p class="module-content no-result" v-if="companyData.enterpriseAddressList==null">
                未设置
                <span class="pull-right" @click="updateAddress" v-if="loginType!=1">立即设置</span>
            </p>
            <p class="module-content" v-if="companyData.enterpriseAddressList!=null">
                 <span class="pull-right" @click="updateAddress" v-if="loginType!=1">修改/添加</span>
                <!-- <span class="pull-right" @click="updateAddress">修改</span> -->
            </p>
            <div class="adress_sty">
               <ul>
                   <li v-for="(item,index) in companyData.enterpriseAddressList " :key="index" style="margin-bottom:10px">
                     <span style="display:inline-block;width:20%;color:#394A66;font-size:14px;">{{item.city?item.city:''}}{{item.address}}</span>
                   </li>
               </ul>
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
  name: 'company',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
        loginType:'',
        companyData:[{
	      	enterpriseName:"",
	        enterpriseIndustry:"",
	        enterpriseScale:"",
	        enterpriseAddress:"",
	        isAuthentication:0,
      	}],

      };
    },
    methods: {
      loginTypeFun(){
        let that=this;
        that.loginType=localStorage.getItem('loginType');//1子账号；0主账号
      },
    	company_detail(){
    		let that=this;
	      that.$http({
	  			method:"get",
	  			url:api.detail,
	  			headers:headers("application/json;charset=utf-8"),
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code==10000 && res.data!=""){
	  				that.companyData=res.data.data;
	  				localStorage.setItem('companyData',JSON.stringify(that.companyData));
	  				localStorage.setItem('enterpriseName',res.data.data.enterpriseName);
	  			}
		    });
    	},
    	certificate(){
    		this.$router.push('businessCert');
    	},
    	updateAddress(){
    		this.$router.push('address');
    	},
    	updateScale(){
    		this.$router.push('scale');
    	},
    	updateIndustry(){
    		this.$router.push('industry');
    	}

    },
	 mounted(){
	 	let that=this;
	 	that.company_detail();
	 	that.loginTypeFun();
	 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .company-content .module .module-content span{
  color: #2064F5;
  font-size: 14px;
  cursor: pointer;
 }
 .span_color{
 	font-size: 12px !important;
    color: #97A2B3 !important;
    margin-left: 15px !important;
 }
 .adress_sty {
	/* border-bottom: 1px solid #EEEEEE; */
    margin-bottom: 30px;
}
.adress_sty ul li {
	font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #394A66;
    letter-spacing: 0;
}
</style>
