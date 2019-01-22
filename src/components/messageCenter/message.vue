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
<p class="headline">
  <span>消息中心</span>
</p>
<div class="messageContent">
		    <ul class="nav-tabs nav" id="uploadTabs">
	        <li @click="uploadTabs(0)" :class="flag==0?'active':''"><span>全部消息</span></li>
	        <li @click="uploadTabs(1)" :class="flag==1?'active':''"><span>系统消息</span></li>
	        <li @click="uploadTabs(2)" :class="flag==2?'active':''"><span>充值消息</span></li>
	        <!--<li @click="uploadTabs(3)" :class="flag==3?'active':''"><span>消息消息</span></li>-->
		    </ul>
  	<el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="status" label="状态" header-align='center' align='center' width="100px">
	    <template slot-scope="scope">
	      <span v-if="scope.row.status === 1"><i class="iconMessage_no"></i>未读</span>
	      <span v-if="scope.row.status === 2"><i class="iconMessage_yes"></i>已读</span>
	    </template>
    </el-table-column>
    <el-table-column prop="type" label="消息类型" header-align='center' align='center'>
	    <template slot-scope="scope">
	      <span v-if="scope.row.type === 1">系统消息</span>
	      <span v-if="scope.row.type === 2">充值消息</span>
	      <span v-if="scope.row.type === 3">消费消息</span>
	    </template>
    </el-table-column>
    <el-table-column prop="title" label="主题" header-align='center' align='center'></el-table-column>
    <el-table-column prop="createTimeStr" label="接收日期" header-align='center' align='center'></el-table-column>
    <el-table-column label="操作" width="160" header-align='center' align='center'>
      <template slot-scope="scope">
        <!--<el-button type="text" class="span_bule" @click="checkMessage(scope.row.id,scope.row.type,scope.row.title)">查看</el-button>
        <el-button type="text" class="span_bule" @click="deletMessage(scope.row.id)">删除</el-button>-->
		    <div class="operation" @mouseenter="enter(scope.row.id)" @mouseleave="leave()">
  				<div class="options">操作选项</div>
  				<div class="options_div" v-show="seen && scope.row.id==current">
  					<ul>
  						<li @click="checkMessage(scope.row.id,scope.row.type,scope.row.title)">查看</li>
  						<li @click="deletMessage(scope.row.id)">删除</li>
  					</ul>
  				</div>
  			</div>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页  -->
	<div class="bottom-pagination" v-if="totalCount > 10">
		<el-pagination @current-change="changePage" @size-change="changeSize" :current-page="pageIndex" :page-size="pageSize" :page-sizes="[10, 25, 50, 100]" layout="total, prev, pager, next, sizes, jumper" :total="totalCount">
		</el-pagination>
	</div>
  <!-- 分页 end -->	
	
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
  name: 'message',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
        tab_all:true,
        tab_system:false,
        tab_rechange:false,
        tab_consumer:false,
        flag:0,
        tableData: [],
        totalCount:0,
				pageIndex: 1,
				pageSize: 10,
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
      uploadTabs(a) {//切换样式
      	let that=this;
        that.flag=a;
        that.getpagetableData(that.flag);
      },
      checkMessage(row,type,title){//查看
      	let that=this;
      	if(type==1){
      		type='系统消息';
      	}else if(type==2){
      		type='充值消息';
      	}else{
      		type='消费消息';
      	}
        that.$http({
  			method:"POST",
  			url:api.seeMessage+row,
  			headers:headers('application/json;charset=utf-8'),
  		  }).then(function(res){
	       if(res.data.code==10000){
	      	that.$alert(title, type, {
						center: true,
						customClass: 'member-confirm-class danger',
					}).then(() => {  
					}).catch(() => {});
	  		 }else{
	  			that.$message.error(res.message || res.data.msg);
	  		 }
  		  });
      },
      deletMessage(row) {//删除
      	let that=this;
      	that.$confirm('该信息删除后，将无法恢复，确定删除吗?', '提示', {
					confirmButtonText: '删除',
					cancelButtonText: '取消',
					center: true,
					customClass: 'member-confirm-class danger',
				}).then(() => {
	        that.$http({
	  			method:"POST",
	  			url:api.deletemessage+row,
	  			headers:headers('application/json;charset=utf-8'),
	  		  }).then(function(res){
		       if(res.data.code==10000 && res.data!=""){
			        that.$message({
			          showClose: true,
			          message: '恭喜你，删除成功',
			          type: 'success'
			        });
	            that.getpagetableData(that.flag);
		  			}else{
		  				that.$message.error(res.message || res.data.msg);
		  			}
	  		  });
      	}).catch(() => {});
      	
      },
      changePage(newPage) {
				if(this.pageIndex === newPage) {
					return;
				}
				this.pageIndex = newPage;
				this.getpagetableData(this.flag);
			},
			changeSize(newSize) {
				this.pageSize = newSize;
				this.getpagetableData(this.flag);
			},
      getpagetableData(flag){
      let that=this;
      let reportType=flag;
      let currentPage=that.pageIndex || 1;
      let itemsPerPage=that.pageSize || 10;
			that.$http({
  			method:"get",
  			url:api.messageList+reportType+'/'+currentPage+'/'+itemsPerPage,
  			headers:headers('application/json;charset=utf-8'),
  		}).then(function(res){
  			if(res.data.code==10000 && res.data!=""){
          that.tableData=res.data.data;
          that.totalCount = res.data.count;
  			}else{
  				that.$message.error(res.message || res.data.msg);
  			}
	    });
      }
    },
    mounted() {
			this.getpagetableData(this.flag);
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
#uploadTabs{
	padding: 0 0 20px 20px;
	border-bottom: none;
	margin-bottom: 0;
	list-style: none;	
	height: 54px;
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
.iconMessage_yes {
    display: inline-block;
    width: 14px;
    height: 10px;
    margin: 0 8px 0 0;
    background: url(../../assets/img/account/ic_read.svg) no-repeat center;
}
.iconMessage_no {
    display: inline-block;
    width: 14px;
    height: 10px;
    margin: 0 8px 0 0;
    background: url(../../assets/img/account/ic_unread.svg) no-repeat center;
}
.hover-row{
	color: #2064F5;
}
.el-table__row .span_bule{
	color: #2064F5;
}
.span_bule,.span_bule:hover,.span_bule:active{
	color: #2064F5;
	font-size: 14px;
	cursor: pointer;
}
/* 操作选项 */
.options{
  color: #2569F6;
  cursor: pointer;
}
.options_div{
	position: fixed;
	z-index: 10;
	display: block;
	width: 80px;
	text-align: center;
	font-size: 14px;
	color: #394A66;
	background: #FFFFFF;
	box-shadow: 0 0 4px 0 rgba(0,0,0,0.20);
	margin-left: 30px;
}
.options_div ul li{
	width: 100%;
	height: 34px;
	line-height: 34px;
	cursor: pointer;
}
.options_div ul li:active,.options_div ul li:hover{
 color: #F95714;
 background: #F8FAFC;
}
</style>
