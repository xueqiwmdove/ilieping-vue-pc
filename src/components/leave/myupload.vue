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

<!-- 删除-模态框（Modal） -->
    <div class="modal fade delete-alert alert" id="deleteModal">
        <div class="modal-dialog">
            <div class="modal-content alert-content">
                <div class="modal-header alert-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                </div>
                <div class="modal-body alert-body">
                    <!--<img src="../assets/img/dismission/弹窗上提醒.png" alt="" class="alert-img">-->
                    <p>
                        你是否确定要删除该条离职报告么？
                    </p>
                </div>
                <div class="modal-footer alert-footer">
                    <button type="button" class="btn btn-danger conform button pull-left" id="del_id" @click="deleteModal()">
                        确定
                    </button>
                    <button type="button" class="btn btn-default cancel pull-right button">
                        取消
                    </button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal -->
    </div>

				<!--上传离职记录-->
				<p class="headline">
				    <span>上传记录</span>
				</p>
		    <ul class="nav-tabs nav" id="uploadTabs">
	        <li @click="uploadTabs(1)" :class="flag==1?'active':''"><span>多维度评价</span></li>
	        <li @click="uploadTabs(2)" :class="flag==2?'active':''"><span>失信曝光</span></li>
	        <li @click="uploadTabs(3)" :class="flag==3?'active':''"><span>快速评价</span></li>
		    </ul>
<div class="table-parent_e">
  	<el-table :data="tableData">
    <el-table-column fixed type="index" width="50" label="序号" header-align='center' align='center'></el-table-column>
    <el-table-column prop="userName" label="姓名" header-align='center' align='center'></el-table-column>
    <el-table-column prop="phoneUser" label="手机号" header-align='center' align='center'></el-table-column>
    <el-table-column prop="cardNumber" label="身份证" header-align='center' align='center'></el-table-column>
	  <el-table-column prop="userSex" label="性别" width="80" align="center">
	    <template slot-scope="scope">
	      <span v-if="scope.row.userSex === 0">女</span>
	      <span v-if="scope.row.userSex === 1">男</span>
	    </template>
	  </el-table-column>
    <el-table-column prop="userAge" label="年龄" width="80" header-align='center' align='center'></el-table-column>
    <el-table-column prop="createTime" label="上传日期" header-align='center' align='center'></el-table-column>
    <el-table-column label="操作" width="160" header-align='center' align='center'>
      <template slot-scope="scope">
				<el-dropdown placement='bottom'>
				 <span class="el-dropdown-link options">
						操作选项
				 </span>
					<el-dropdown-menu slot="dropdown" class="options_div">
						<el-dropdown-item @click.native="click_See(scope.row)">查看报告</el-dropdown-item>
						<el-dropdown-item @click.native="deletadvertise(scope.row)">删除报告</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			 <!-- <div class="operation" @mouseenter="enter(scope.row.reportId)" @mouseleave="leave()">
  				<div class="options">操作选项</div>
  				<div class="options_div" v-show="seen && scope.row.reportId==current">
  					<ul>
  						<li @click="click_See(scope.row)">查看报告</li>
  						<li @click="deletadvertise(scope.row)">删除报告</li>
  					</ul>
  				</div>
  			</div> -->
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页  -->
	<div class="bottom-pagination" v-if="totalCount > 5">
		<el-pagination @current-change="changePage" @size-change="changeSize" :current-page="pageIndex" :page-size="pageSize" :page-sizes="[5,10, 25, 50, 100]" layout="total, prev, pager, next, sizes, jumper" :total="totalCount">
		</el-pagination>
	</div>
  <!-- 分页 end -->
</div>
<!--
<div class="table-parent">
    <table class="table " >
        <tr>
            <td>序号</td>
            <td>姓名</td>
            <td>性别</td>
            <td>年龄</td>
            <td>手机号</td>
            <td>上传日期</td>
            <td>报告类型</td>
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
            <td>新增上传</td>
            <td>
                <span class="detail">
                    查看
                </span>
                <span class="detail">
                    修改
                </span>
                <span class="delete">
                    删除
                </span>
            </td>
        </tr>
    </table>

</div>
   -->
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
  name: 'exposureUpload',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
        userSex:0,
        no_data:false,
        tableData: [],
        totalCount:0,
        pageIndex: 1,
        pageSize:10,
        activeName:'1',
        flag:1,
       seen:false,
       current:0,
      };
    },
    methods: {
    	enter(index){
        this.seen = true;
        this.current = index;
      },
      leave(){
        this.seen = false;
        this.current = null;
      },
    	click_See(row){//查看
    		let that=this;
    		if(that.flag==2){
    			that.$router.push('exposureReport/'+row.reportId);
    		}else if(that.flag==3){
          that.$router.push('quickReport/'+row.reportId);
        }else{
    			that.$router.push('leaveReport/'+row.reportId);
    		}

    	},
    	click_modify(row){//修改

    	},
    	deletadvertise(row) {//删除
    		let that=this;
				that.$confirm('你是否确定要删除<span style="color: #2064F5;">'+row.userName+'</span>的离职报告么?', '提示', {
					confirmButtonText: '删除',
					cancelButtonText: '取消',
					type: 'warning',
					title:'',
          center: true,
          dangerouslyUseHTMLString: true,
					customClass: 'member-confirm-class danger',
				}).then(() => {
					that.$http({
					method:"delete",
					url:api.myupload_delete+row.reportId,
					headers:headers('application/json;charset=utf-8'),
				 }).then(function(res){
						if(res.data.code==10000) {
							that.$notify.success({
								title: "提示",
								message: "删除成功"
							});
							that.getpagetableData(that.flag);
						} else {
							that.$message.error(message);
						}
					}).catch(error => {
						console.error(error);
					});
				}).catch(() => {});
    	},
      uploadTabs(a) {//切换样式
      	let that=this;
        that.flag=a;
        that.getpagetableData(that.flag);
      },
      changePage(newPage) {
      	let that=this;
				if(that.pageIndex === newPage) {
					return;
				}
				that.pageIndex = newPage;
				that.getpagetableData(that.flag);
			},
			changeSize(newSize) {
				let that=this;
				that.pageSize = newSize;
				that.getpagetableData(that.flag);
			},
			getpagetableData(flag){
				let that=this;
				let reportType=flag;
	      let currentPage=that.pageIndex || 1;
	      let itemsPerPage=that.pageSize || 10;
				that.$http({
	  			method:"get",
	  			url:api.myupload_table+reportType+'/'+currentPage+'/'+itemsPerPage,
	  			headers:headers('application/json;charset=utf-8'),
	  		}).then(function(res){
	  			if(res.data.code==10000 || res.data.data==null){
	          that.tableData=res.data.data;
	          that.totalCount = res.data.count;
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
			}

    },
		mounted() {
			let that=this;
			that.getpagetableData(that.flag);
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-parent_e{
	padding: 20px;
	position: relative;
	color: #748093;
	display: block;
	margin-top: -20px;
}
.table-parent_e table{
	border: 1px solid #E5E5E5;
	margin-bottom: 0;
}
#uploadTabs{
	padding: 0 0 20px 20px;
	border-bottom: none;
	margin-bottom: 0;
	list-style: none;
	height: 54px;
  margin-top: 20px;
}
#uploadTabs .active span{
    color: #FFFFFF;
    background: #F95714;
    border: none;
    border-radius: 2px;
}
#uploadTabs li {
    width: 88px;
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    letter-spacing: 0;
    text-align: center;
    margin: 0 20px 0 0;
    cursor: pointer;
}
.nav-tabs > li {
    float: left;
    margin-bottom: -1px;
}
.nav > li {
    position: relative;
    display: block;
}
#uploadTabs li span {
    height: 34px;
    line-height: 34px;
    color: #394A66;
    background: #FAFBFC;
    cursor: pointer;
    padding: 0;
    margin: 0;
    border: 1px solid #E5E5E5;
    border-radius: 2px;
}
.nav > li > span {
    position: relative;
    display: block;
}
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
.page_txt{
text-align: right;
margin: 20px 0;
}
.bottom-pagination{
	margin-top: 30px;
	text-align: right;
}
.modal{
	display: none;
}
.span_bule{
	color: #2064F5;
	font-size: 14px;
	cursor: pointer;
}
/* 操作选项 */
.options{
	color: #2569F6;
	cursor: pointer;
	position: relative;
}
.options_div{
	position: absolute;
	z-index: 10;
	display: block;
	width: 80px;
	text-align: center;
	font-size: 14px;
	color: #394A66;
	background: #FFFFFF;
	box-shadow: 0 0 4px 0 rgba(0,0,0,0.20);
	margin: 0;
	padding: 0;
	border-radius:0;
	border: none;
}
.el-dropdown-menu__item{padding: 0;}
.options_div ul li{
	width: 100%;
	height: 34px;
	line-height: 34px;
	cursor: pointer;
}
.el-dropdown-menu__item:active,.el-dropdown-menu__item:hover{
 color: #F95714;
 background: #F8FAFC;
}
</style>
