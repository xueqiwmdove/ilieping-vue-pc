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
        <a>查询记录</a>
    </p>
    <div class="table-parent">
        <table class="table " id="table">
            <tr>
                <td>序号</td>
                <td>搜索条件</td>
                <td>搜索类型</td>
                <td>查询日期</td>
                <td>操作</td>
            </tr>
            <tr class="no-result">
                <td colspan="5" >
                    <p>很抱歉，暂无符合条件的数据！</p>
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
