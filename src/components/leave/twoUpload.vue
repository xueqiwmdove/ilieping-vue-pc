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
			        <span><i>猎评曝光</i> /上传离职评价</span>
			    </p>
       <!--上传离职评价两种方式-->
    <div class="twoMethod">
        <!--多维度评价-->
        <div class="multipleMethod method">
            <img src="../../assets/img/dismission/ic_multidimensional.svg" alt="">
            <span>多维度评价离职员工，包括任职信息，HR及上级领导对胜任力模型的测评等</span>
            <input type="button" class="multipleButton" value="多维度评价" @click="click_uploadOne">
        </div>
        <!--快速评价-->
        <div class="quickMethod method">
            <img src="../../assets/img/dismission/ic_rapid.svg" alt="" >
            <span>快速点评，选择离职原因后一句话点评离职员工</span>
            <input type="button" class="quickButton" value="快速评价" @click="click_quickUpload">
        </div>
    </div>

  		</div>
  	</div>
   </div>
  </div>
</template>

<script>
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';

export default {
  name: 'exposure',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {

      };
    },
    methods: {
      click_quickUpload(){
        this.$router.push('/quickUpload/0');
      },
      click_uploadOne(){
        this.$router.push('/uploadOne/0');
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .company-content .module .module-content span{
 	color: #2064F5;
  font-size: 14px;
 }
 .messageContent{
 	margin: 20px;
 }
 .nav > li {
    position: relative;
    display: block;
}
.nav-tabs > li{
	float: left;
}
#msgTabs{
	height: 54px;
}
 .messageContent #msgTabs li span {
    height: 34px;
    line-height: 34px;
    color: #394A66;
    background: #FAFBFC;
    cursor: pointer;
    padding: 0;
    margin: 0;
    border: 1px solid #E5E5E5;
    border-radius: 2px;
    position: relative;
    display: block;
}
.messageContent #msgTabs li.active span{
    color: #FFFFFF;
    background: #F95714;
}
.table-parent table tr td span{
	font-size: 14px;
	color: #2569F6;
	cursor: pointer;
	margin: 0 20px 0 0;
}
.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    border: 1px solid #E5E5E5;
    margin-bottom: 0;
}
.table-parent table tr td:last-child {
border-right: 1px solid #ddd;
}

</style>
