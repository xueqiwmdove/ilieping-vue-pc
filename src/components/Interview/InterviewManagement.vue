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
  			<!--主内容 start-->
				<div class="header_title"><i class="header_home"></i><span>面试管理</span></div>
				<div class="content">
				  <div class="con_today"><!--主内容 今天的面试 start-->
					 <div class="con_title">今天的面试（3）</div>
					 <div class="today_table">
						<el-table style="width: 100%">
							<el-table-column label="面试信息" width="280">
								<template slot-scope="scope">
									<span v-if="scope.row.interviewType === 1" class="firstTry">初试</span>
									<span v-if="scope.row.interviewType === 2" class="reExamination">复试</span>
									<span v-if="scope.row.interviewType === 3" class="finalTest">终试</span>
									<span v-if="scope.row.interviewMode === 0" class="Interview">现场面试</span>
									<span v-if="scope.row.interviewMode === 1" class="Interview">电话面试</span>
									<span v-if="scope.row.interviewMode === 3" class="Interview">视频面试</span>
								</template>
							</el-table-column>
							<el-table-column label="候选人" width="180"></el-table-column>
							<el-table-column label="联系方式"></el-table-column>
							<el-table-column label="应聘职位"></el-table-column>
							<el-table-column label="面试地点"></el-table-column>
							<el-table-column label="面试负责人"></el-table-column>
							<el-table-column label="状态">
								<template slot-scope="scope">
									<span v-if="scope.row.status === 2" class="NoSignIn">未签到</span>
									<span v-if="scope.row.status === 3">已签到</span>
								</template>
							</el-table-column>
						</el-table>
					 </div>
					</div><!--主内容 今天的面试 end-->
				  <div class="con_today"><!--主内容 明天及之后的面试 start-->
					 <div class="con_title">明天及之后的面试（0）</div>
					 <div class="today_table">
						<el-table style="width: 100%">
							<el-table-column label="面试信息" width="280"></el-table-column>
							<el-table-column label="候选人" width="180"></el-table-column>
							<el-table-column label="联系方式"></el-table-column>
							<el-table-column label="应聘职位"></el-table-column>
							<el-table-column label="面试地点"></el-table-column>
							<el-table-column label="面试负责人"></el-table-column>
							<el-table-column label="状态"></el-table-column>
						</el-table>
					 </div>
					</div><!--主内容 明天及之后的面试 end-->
				  <div class="con_today"><!--主内容 昨天及之前的面试 start-->
					 <div class="con_title">昨天及之前的面试（6）</div>
					 <div class="today_table">
						<el-table style="width: 100%">
							<el-table-column label="面试信息" width="280"></el-table-column>
							<el-table-column label="候选人" width="180"></el-table-column>
							<el-table-column label="联系方式"></el-table-column>
							<el-table-column label="应聘职位"></el-table-column>
							<el-table-column label="面试地点"></el-table-column>
							<el-table-column label="面试负责人"></el-table-column>
							<el-table-column label="状态"></el-table-column>
						</el-table>
					 </div>
					</div><!--主内容 昨天及之前的面试 end-->
				</div>
				<!--主内容 end-->
  		</div>
  	</div>

  </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js'
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';

export default {
  name: 'InterviewManagement',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
				InterviewManagementList:[],
			  totalCount:0,
			  pageIndex: 1,
			  pageSize: 5,
			}

    },
    methods: {
      getInterviewManagementList(){
	      let currentPage=that.pageIndex || 1;
	      let pageSize=that.pageSize || 5;
        that.$http({
	  			method:"post",
	  			url:api.hr_list,
	  			headers:headers('application/json;charset=utf-8'),
	  			data:{
				    "currPage":currentPage,
				    "pageSize":pageSize,
	  			}
	  		}).then(function(res){
	  			if(res.data.code==10000){
             that.InterviewManagementList=res.data.data;
             that.totalCount=res.data.count;
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
			}
    },
    mounted(){
      let that=this;
			that.getInterviewManagementList();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header_title{height: 40px;line-height: 40px;color: #394A66;font-size: 14px;}
.header_home{width:17px;height:17px;float: left; display: inline-block; margin:10px; background: url(../../assets/img/edition_1.5/houxuan_ic_weizhi.png) no-repeat;background-size: 100%;}
.content .con_title{height: 70px;line-height: 40px;padding-top: 20px; color: #394A66;font-size: 14px;font-weight: bold;padding-left: 20px;}
.firstTry{height:24px;background:#66ADFF;border-radius:4px; color: #fff;}
.reExamination{height:24px;background:#9C73DE;border-radius:4px; color: #fff;}
.finalTest{height:24px;background:#FF6767;border-radius:4px; color: #fff;}
.Interview{color: #F95714;background: #fff; border: 1px solid #F95714;border-radius: 4px;}
.NoSignIn{color: #F95714;}
</style>
