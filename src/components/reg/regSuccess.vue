<template>
<div>
  <!--顶部导航-->
  <pageheader class="pageheader"></pageheader>
  <div class="regSuccess">
       <img src="../../assets/images/reg/注册成功.png" class="img">
       <h4>注册成功！</h4>
       <p>
           企业认证后将获得更多特权，立即进行
           <!--<span @click="onclick_company">企业认证</span>-->
           <span class="span_color" @click="click_login">登录</span> 进行企业认证
       </p>
   </div>
</div>
</template>

<script>
	import pageheader from '@/components/common/pageheader_reg';
export default {
  name: 'regSuccess',
 	components: {
       pageheader
	},
	methods: {
		click_login(){
			this.$router.push('/login');
		}
	},
	mounted(){
		let that=this;
		setTimeout(function () { 
			localStorage.clear();
		}, 5000);
		setTimeout(function(){ that.$router.push('/login'); }, 5000);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.regSuccess{
	width: 480px;
	height: 485px;
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translateX(-50%) translateY(-50%);
	transform: translateX(-50%) translateY(-50%);
	margin: 0 auto;
	background: #FFFFFF;
	border-radius: 8px;
	text-align: center;
}
.regSuccess h4 {
    margin: 30px 0 28px 0;
    font-size: 36px;
    color: #F95714;
    letter-spacing: 0.42px;
}
.span_color{
	  /*text-decoration: underline;*/
    color: #2569F6;
    cursor: pointer;
}
</style>
