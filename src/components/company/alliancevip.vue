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
  				
  				<div class="recruit" style="margin: 0;">
			      <img src="../../assets/images/company/会员招募.png" alt="会员招募">
			      <span class="marks pull-left">“</span>
			      <div>
			        <p>猎评联盟是由“爱猎评网”建立的大型职场人士评价、职场失信人信息综合查询平台。
			          同时，企业可以自主提交失信违约员工信息，在针对失信人施加舆论压力，社交压力的同时，
			          实现联盟企业间的跨平台查询，为招错人、用错人等风险情况提出了良好的解决方案。
			        </p>
			        <p>平台通过企业建立员工职场评价档案，实现约束、信任机制的工具，
			          让企业为优秀员工背书站台，使失信者受到惩罚，致力于构建
			          和谐职场环境，打造良性循环的健康职场环境。
			        </p>
			      </div>
			      <span class="marks pull-right">”</span>
			    </div>
			    <div class="open-recruit">
			      <p class="title">开通联盟会员</p>
			      <div class="two-kinds stair">
			        <p><span>2000 </span>元/1年</p>
			        <p>30次／天免费查询</p>
			      </div>
			      <div class="two-kinds">
			        <p><span>1400 </span>元/1年</p>
			        <p>20次／天免费查询</p>
			      </div>
			      <div class="payFor">
			        <h4>选择充值方式</h4>
			        <p class="alipay"></p>
			        <p class="weChart"></p>
			      </div>
			      <input type="text" value="加入联盟" class="join-in btn">
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
  name: 'alliancevip',
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
 
</style>
