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
<!--我的上传-->
<p class="headline">
    <span>上传曝光记录</span>
</p>
<div class="table-parent">
    <table class="table " >
        <tr>
            <td>序号</td>
            <td>姓名</td>
            <td>性别</td>
            <td>年龄</td>
            <td>手机号</td>
            <td>上传日期</td>
            <td>操作</td>
        </tr>
        <tr class="no-result" v-if="no_data">
            <td colspan="8" class="text-center">
                <p>很抱歉，暂无符合条件的数据！</p>
            </td>
        </tr>
        <tr>
            <td>1</td>
            <td>薛琦</td>
            <td v-if="userSex==0">女</td>
            <td v-if="userSex==1">男</td>
            <td>0</td>
            <td>15921820231</td>
            <td>2018-08-16</td>
            <td>
                <span class="detail">
                    查看
                </span>
                <span class="delete">
                    删除
                </span>
            </td>
        </tr>
    </table>
       
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
  name: 'exposureUpload',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
        userSex:0,
        no_data:false
      };
    },
    methods: {
      
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
