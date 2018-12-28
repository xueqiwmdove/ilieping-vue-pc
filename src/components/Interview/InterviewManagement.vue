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
					 <div class="con_title">今天的面试（{{totalCountTodoy}}）</div>
					 <div class="today_table">
						<el-table :data="InterviewManagementListTodoy" style="width: 100%">
							<el-table-column label="面试信息" width="280" align='left'>
								<template slot-scope="scope">
									<span v-if="scope.row.interviewType === 1" class="firstTry">初试</span>
									<span v-if="scope.row.interviewType === 2" class="reExamination">复试</span>
									<span v-if="scope.row.interviewType === 3" class="finalTest">终试</span>
									<span v-if="scope.row.interviewMode === 1" class="Interview">现场面试</span>
									<span v-if="scope.row.interviewMode === 2" class="Interview">电话面试</span>
									<span v-if="scope.row.interviewMode === 3" class="Interview">视频面试</span>
									<span>{{scope.row.interviewDate}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="candidateName" label="候选人"></el-table-column>
							<el-table-column prop="candidatePhone" label="联系方式"></el-table-column>
							<el-table-column prop="positionName" label="应聘职位"></el-table-column>
							<el-table-column prop="interviewAddress" width="200" label="面试地点"></el-table-column>
							<el-table-column prop="interviewerName" label="面试负责人"></el-table-column>
							<el-table-column label="状态">
								<template slot-scope="scope">
									<span v-if="scope.row.status === 0" class="NoSignIn">面试取消</span>
									<span v-if="scope.row.status === 1">侍确认</span>
									<span v-if="scope.row.status === 2" class="NoSignIn">侍面试</span>
									<span v-if="scope.row.status === 3">已签到</span>
									<span v-if="scope.row.status === 4">已面试</span>
									<span v-if="scope.row.status === 6">已拒绝</span>
								</template>
							</el-table-column>
						</el-table>
					 </div>
						<!-- 分页  -->
						<div class="bottom-pagination" v-if="totalCountTodoy > 5">
							<el-pagination @current-change="changePageTodoy" @size-change="changeSizeTodoy" :current-page="pageIndexTodoy" :page-size="pageSizeTodoy" :page-sizes="[5,10, 25, 50, 100]" layout="total, prev, pager, next, sizes, jumper" :total="totalCountTodoy">
							</el-pagination>
						</div>
					</div><!--主内容 今天的面试 end-->
				  <div class="con_today"><!--主内容 明天及之后的面试 start-->
					 <div class="con_title">明天及之后的面试（{{totalCountTomorrow}}）</div>
					 <div class="today_table">
						<el-table :data="InterviewManagementListTomorrow" style="width: 100%">
							<el-table-column label="面试信息" width="280">
								<template slot-scope="scope">
									<span v-if="scope.row.interviewType === 1" class="firstTry">初试</span>
									<span v-if="scope.row.interviewType === 2" class="reExamination">复试</span>
									<span v-if="scope.row.interviewType === 3" class="finalTest">终试</span>
									<span v-if="scope.row.interviewMode === 1" class="Interview">现场面试</span>
									<span v-if="scope.row.interviewMode === 2" class="Interview">电话面试</span>
									<span v-if="scope.row.interviewMode === 3" class="Interview">视频面试</span>
									<span>{{scope.row.interviewDate}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="candidateName" label="候选人"></el-table-column>
							<el-table-column prop="candidatePhone" label="联系方式"></el-table-column>
							<el-table-column prop="positionName" label="应聘职位"></el-table-column>
							<el-table-column prop="interviewAddress" width="200" label="面试地点"></el-table-column>
							<el-table-column prop="interviewerName" label="面试负责人"></el-table-column>
							<el-table-column label="状态">
								<template slot-scope="scope">
									<span v-if="scope.row.status === 0" class="NoSignIn">面试取消</span>
									<span v-if="scope.row.status === 1">侍确认</span>
									<span v-if="scope.row.status === 2" class="NoSignIn">侍面试</span>
									<span v-if="scope.row.status === 3">已签到</span>
									<span v-if="scope.row.status === 4">已面试</span>
									<span v-if="scope.row.status === 6">已拒绝</span>

								</template>
							</el-table-column>
						</el-table>
					 </div>
						<!-- 分页  -->
						<div class="bottom-pagination" v-if="totalCountTomorrow > 5">
							<el-pagination @current-change="changePageTomorrow" @size-change="changeSizeTomorrow" :current-page="pageIndexTomorrow" :page-size="pageSizeTomorrow" :page-sizes="[5,10, 25, 50, 100]" layout="total, prev, pager, next, sizes, jumper" :total="totalCountTomorrow">
							</el-pagination>
						</div>
					</div><!--主内容 明天及之后的面试 end-->
				  <div class="con_today"><!--主内容 昨天及之前的面试 start-->
					 <div class="con_title">昨天及之前的面试（{{totalCountYesterday}}）</div>
					 <div class="today_table">
						<el-table :data="InterviewManagementListYesterday" style="width: 100%">
							<el-table-column label="面试信息" width="280">
								<template slot-scope="scope">
									<span v-if="scope.row.interviewType === 1" class="firstTry">初试</span>
									<span v-if="scope.row.interviewType === 2" class="reExamination">复试</span>
									<span v-if="scope.row.interviewType === 3" class="finalTest">终试</span>
									<span v-if="scope.row.interviewMode === 1" class="Interview">现场面试</span>
									<span v-if="scope.row.interviewMode === 2" class="Interview">电话面试</span>
									<span v-if="scope.row.interviewMode === 3" class="Interview">视频面试</span>
									<span>{{scope.row.interviewDate}}</span>
								</template>
							</el-table-column>
							<el-table-column prop="candidateName" label="候选人"></el-table-column>
							<el-table-column prop="candidatePhone" label="联系方式"></el-table-column>
							<el-table-column prop="positionName" label="应聘职位"></el-table-column>
							<el-table-column prop="interviewAddress" width="200" label="面试地点"></el-table-column>
							<el-table-column prop="interviewerName" label="面试负责人"></el-table-column>
							<el-table-column label="状态">
								<template slot-scope="scope">
									<span v-if="scope.row.status === 0" class="NoSignIn">面试取消</span>
									<span v-if="scope.row.status === 1">侍确认</span>
									<span v-if="scope.row.status === 2" class="NoSignIn">侍面试</span>
									<span v-if="scope.row.status === 3">已签到</span>
									<span v-if="scope.row.status === 4">已面试</span>
									<span v-if="scope.row.status === 6">已拒绝</span>

								</template>
							</el-table-column>
						</el-table>
					 </div>
						<!-- 分页  -->
						<div class="bottom-pagination" v-if="totalCountYesterday > 5">
							<el-pagination @current-change="changePageYesterday" @size-change="changeSizeYesterday" :current-page="pageIndexYesterday" :page-size="pageSizeYesterday" :page-sizes="[5,10, 25, 50, 100]" layout="total, prev, pager, next, sizes, jumper" :total="totalCountYesterday">
							</el-pagination>
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
				InterviewManagementListTodoy:[],
			  totalCountTodoy:0,
			  pageIndexTodoy: 1,
			  pageSizeTodoy: 5,
				InterviewManagementListTomorrow:[],
				totalCountTomorrow:0,
				pageIndexTomorrow: 1,
				pageSizeTomorrow: 5,
				InterviewManagementListYesterday:[],
				totalCountYesterday:0,
				pageIndexYesterday: 1,
				pageSizeYesterday: 5,
			}
    },
    methods: {
     changePageTodoy(newPage) {
      	let that=this;
				if(that.pageIndexTodoy === newPage) {
					return;
				}
				that.pageIndexTodoy = newPage;
				that.getInterviewManagementList();
			},
			changeSizeTodoy(newSize) {
				let that=this;
				that.pageSizeTodoy = newSize;
				that.getInterviewManagementList();
			},
      getInterviewManagementListTodoy(){//今天
			  let that=this;
	      let currentPage=that.pageIndexTodoy || 1;
	      let pageSize=that.pageSizeTodoy || 5;
        that.$http({
	  			method:"get",
	  			url:api.interviewListToday+currentPage+"/"+pageSize,
	  			headers:headers('application/json;charset=utf-8'),
	  		}).then(function(res){
	  			if(res.data.code==10000){
             that.InterviewManagementListTodoy=res.data.data;
             that.totalCountTodoy=res.data.count;
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
			},
     changePageTomorrow(newPage) {
      	let that=this;
				if(that.pageIndexTomorrow === newPage) {
					return;
				}
				that.pageIndexTomorrow = newPage;
				that.getInterviewManagementList();
			},
			changeSizeTomorrow(newSize) {
				let that=this;
				that.pageSizeTomorrow = newSize;
				that.getInterviewManagementList();
			},
			getInterviewManagementListTomorrow(){
        let that=this;
	      let currentPage=that.pageIndexTomorrow || 1;
	      let pageSize=that.pageSizeTomorrow || 5;
        that.$http({
	  			method:"get",
	  			url:api.interviewListBefore+currentPage+"/"+pageSize,
	  			headers:headers('application/json;charset=utf-8'),
	  		}).then(function(res){
	  			if(res.data.code==10000){
             that.InterviewManagementListTomorrow=res.data.data;
             that.totalCountTomorrow=res.data.count;
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
			},
     changePageYesterday(newPage) {
      	let that=this;
				if(that.pageIndexYesterday === newPage) {
					return;
				}
				that.pageIndexYesterday = newPage;
				that.getInterviewManagementList();
			},
			changeSizeYesterday(newSize) {
				let that=this;
				that.pageSizeYesterday = newSize;
				that.getInterviewManagementList();
			},
			getInterviewManagementListYesterday(){
        let that=this;
	      let currentPage=that.pageIndexYesterday || 1;
	      let pageSize=that.pageSizeYesterday || 5;
        that.$http({
	  			method:"get",
	  			url:api.interviewListAfter+currentPage+"/"+pageSize,
	  			headers:headers('application/json;charset=utf-8'),
	  		}).then(function(res){
	  			if(res.data.code==10000){
             that.InterviewManagementListYesterday=res.data.data;
             that.totalCountYesterday=res.data.count;
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
			}
    },
    mounted(){
      let that=this;
			that.getInterviewManagementListTodoy();//今天
			that.getInterviewManagementListTomorrow();//明天
			that.getInterviewManagementListYesterday();//昨天
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header_title{height: 40px;line-height: 40px;color: #394A66;font-size: 14px;}
.header_home{width:17px;height:17px;float: left; display: inline-block; margin:10px; background: url(../../assets/img/edition_1.5/houxuan_ic_weizhi.png) no-repeat;background-size: 100%;}
.content .con_title{height: 70px;line-height: 40px;padding-top: 20px; color: #394A66;font-size: 14px;font-weight: bold;padding-left: 20px;}
.firstTry{height:24px;background:#66ADFF;border-radius:4px; color: #fff;padding: 2px 5px;}
.reExamination{height:24px;background:#9C73DE;border-radius:4px; color: #fff;padding: 2px 5px;}
.finalTest{height:24px;background:#FF6767;border-radius:4px; color: #fff;padding: 2px 5px;}
.Interview{color: #F95714;background: #fff; border: 1px solid #F95714;border-radius: 4px;padding: 1px 5px;}
.NoSignIn{color: #F95714;}
</style>
