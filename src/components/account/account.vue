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
        <span>账号安全</span>
    </p>
    <div class="account-content">
        <p>账户信息</p>
        <div class="account-info first">
            <p style="margin-bottom: 20px;">手机号码：{{phoneUser}} <span class="span_right" @click="updatePhone">修改手机</span></p>
        </div>
        <p>设置密码</p>
        <div class="account-info">
            <div class="error-info special">
                <div class="error_div_img"><img src="../../assets/images/reg/提示.png" ></div>安全性高的密码可以使账号更安全，建议您定期修改密码
                <span class="span_right" @click="click_updatePsd">修改密码</span>
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
  name: 'account',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
				phoneUser:'',
      };
    },
    methods: {

    	updatePsd(){
    		let that=this;
	      that.$http({
	  			method:"get",
	  			url:api.getphone,
	  			headers:headers("application/json;charset=utf-8"),
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code==10000 && res.data!=""){
	  				let mobile=res.data.data;
	  				window.localStorage.setItem("oldPhone",res.data.data);
//	  				that.phoneUser=res.data.enterprisePhone;
	  				//前3后4，中间用*代替
	  				let num=mobile.substr(0,3)+"****"+mobile.substr(7,4);
	  				that.phoneUser=num;
	  			}
		    });
    	},
    	updatePhone(){
    		this.$router.push('updateMobile');
    	},
    	click_updatePsd(){
    		this.$router.push('updatePsd');
    	}

    },
	 mounted(){
	 	let that=this;
	 	that.updatePsd();
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
  cursor: pointer;
}
.error_div_img{
    float: left;
    display: inline-block;
    margin: -1.3px 0px;
}
</style>
