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
  <span>消息中心</span>
</p>
<div class="messageContent">
    <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="系统消息" name="1">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="title" label="主题" header-align='center'  width="280" align='center'></el-table-column>
                        <el-table-column prop="createTimeStr" label="接收日期" header-align='center' align='center'></el-table-column>
                        <el-table-column label="操作" width="160" header-align='center' align='center'>
                        <template slot-scope="scope">
                            <div class="options"  @click="deletMessage(scope.row.id)">删除</div>
                        </template>
                        </el-table-column>
                    </el-table>
                        <!-- 分页  -->
                            <div class="bottom-pagination" v-if="totalCount > 10">
                                <el-pagination @current-change="changePage" @size-change="changeSize" :current-page="pageIndex" :page-size="pageSize" :page-sizes="[10, 25, 50, 100]" layout="total, prev, pager, next, sizes, jumper" :total="totalCount">
                                </el-pagination>
                            </div>
                        <!-- 分页 end -->	
            </el-tab-pane>
            <el-tab-pane label="面试相关" name="4">
                  <!-- <ul class="nav-tabs nav" id="uploadTabs">
                    <li @click="uploadTabs(0)" :class="flag==0?'active':''"><span>面试反馈</span></li>
                    <li @click="uploadTabs(1)" :class="flag==1?'active':''"><span>安排面试</span></li>
                    <li @click="uploadTabs(2)" :class="flag==2?'active':''"><span>候选人拒绝面试</span></li>
                    <li @click="uploadTabs(3)" :class="flag==3?'active':''"><span>候选人接收面试</span></li>
                  </ul> -->
                  <div class="content_msg" >
                      <ul class="list_sty" v-if="tableData !=''">
                           <li v-for="(item,index) in tableData" :key="index">
                            <span><i v-if="item.status =='0'" class="sty_icon"></i><i v-if="item.status =='1'" class="sty_icons"></i>{{item.content}}</span>
                            <span class="date_sty">{{item.createTimeStr}}</span>
                          </li>
                      </ul>
                      <span style="margin:0 45%;" v-else> 
                          <img  class="img_sty" src="../../assets/111.png" alt="">
                          <i class="tit">很抱歉！暂无消息</i>
                      </span>
                  </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="offer相关" name="5"> -->
                  <!-- <ul class="nav-tabs nav" id="uploadTabs">
                    <li @click="uploadTabs(4)" :class="flag==4?'active':''"><span>候选人接收</span></li>
                    <li @click="uploadTabs(5)" :class="flag==5?'active':''"><span>候选人拒绝</span></li>
                    <li @click="uploadTabs(6)" :class="flag==6?'active':''"><span>审批通过</span></li>
                    <li @click="uploadTabs(7)" :class="flag==7?'active':''"><span>审批驳回</span></li>
                  </ul> -->
<!--                  <div class="content_msg" >
                      <ul class="list_sty" v-if="tableData !=''">
                           <li v-for="(item,index) in tableData" :key="index">
                            <span><i v-if="item.status =='0'" class="sty_icon"></i><i v-if="item.status =='1'" class="sty_icons"></i>{{item.content}}</span>
                            <span class="date_sty">{{item.createTimeStr}}</span>
                          </li>
                      </ul>
                      <span style="margin:0 45%;" v-else> 
                          <img  class="img_sty" src="../../assets/111.png" alt="">
                          <i class="tit">很抱歉！暂无消息</i>
                      </span>
                  </div>
            </el-tab-pane> -->
            <el-tab-pane label="合同相关" name="6">
                 <!-- <ul class="nav-tabs nav" id="uploadTabs">
                    <li @click="uploadTabs(8)" :class="flag==8?'active':''"><span>即将截止</span></li>
                    <li @click="uploadTabs(9)" :class="flag==9?'active':''"><span>待我签</span></li>
                  </ul> -->
                  <div class="content_msg" >
                     <ul class="list_sty" v-if="tableData !=''">
                           <li v-for="(item,index) in tableData" :key="index">
                            <span><i v-if="item.status =='0'" class="sty_icon"></i><i v-if="item.status =='1'" class="sty_icons"></i>{{item.content}}</span>
                            <span class="date_sty">{{item.createTimeStr}}</span>
                          </li>
                      </ul>
                      <span style="margin:0 45%;" v-else> 
                          <img class="img_sty" src="../../assets/111.png" alt="">
                          <i class="tit">很抱歉！暂无消息</i>
                      </span>
                  </div>
            </el-tab-pane>
  </el-tabs>	
	
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
  name: 'Newmessage',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
        activeName: '1',
        tab_all:true,
        tab_system:false,
        tab_rechange:false,
        tab_consumer:false,
        flag:100,
        tableData: [],
        table_data:{},
        type:'',
        totalCount:0,
        pageIndex: 1,
        pageSize: 10,
       seen:false,
       current:0,
      };
    },
    methods: {
     handleClick(tab, event) {
        this.getpagetableData(tab.name)
     },
    //  enter(index){
    //     this.seen = true;
    //     this.current = index;
    //   },
    //   leave(){
    //     this.seen = false;
    //     this.current = null;
    //   },
     getpagetableData(val){
      let that=this;
      that.type= val ||'1';
      let currPage=that.pageIndex || 1;
      let pageSize=that.pageSize || 10;
			that.$http({
  			method:"get",
  			url:api.messageLists+'/'+that.type+'/'+currPage+'/'+pageSize,
  			headers:headers('application/json;charset=utf-8'),
  		}).then(function(res){
  			if(res.data.code==10000 && res.data!=""){
          that.tableData=res.data.data;
          that.totalCount = res.data.count;
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
	            that.getpagetableData('1');
		  			}else{
		  				that.$message.error(res.message || res.data.msg);
		  			}
	  		  });
      	}).catch(() => {});
      	
      },
      uploadTabs(a) {//切换样式
      	let that=this;
        that.flag=a;
      },
    // 表格标签页切换  
      changePage(newPage) {
        if(this.pageIndex === newPage) {
            return;
        }
        this.pageIndex = newPage;
      },
      changeSize(newSize) {
            this.pageSize = newSize;
      }
    },
    mounted() {
			this.getpagetableData();
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
<style>

/* 重置tab页样式 */
 .el-tabs__item {
    font-size: 16px;
    color: #394A66 ;
}
.el-tabs__item.is-active {
    color: #F95714 ;
}
#uploadTabs li[data-v-2d55860a] {
    width: 88px;
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    letter-spacing: 0;
    text-align: center;
    margin: 0 30px 0 0;
    cursor: pointer;
}
#uploadTabs li[data-v-2d55860a] {
    width: 111px;
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    letter-spacing: 0;
    text-align: center;
    margin: 0 20px 0 0;
    cursor: pointer;
    color:#394A66;
}
/* 无序列表样式 */
.content_msg {
    border:1px solid #D8D8D8;
    width:100%;
    min-height:300px;   
    background-color: #fff;
    
}

.list_sty {
  padding:20px 15px;
}
.list_sty li {
  /* list-style: */
  height: 70px;
  background: #FFFFFF;
  border-bottom: 1px solid #D8D8D8;  
  line-height:70px;
  font-family: MicrosoftYaHei;
 font-size: 16px; 
 color: #97A2B3;
 letter-spacing: 0;
}
.sty_icon {
  display: inline-block;  
  width: 8px;
  height: 8px;
  border-radius:50%;
  background-color: #FF7F7F;  
  margin-right:10px;
}
.sty_icons {
  display: inline-block;  
  width: 8px;
  height: 8px;
  border-radius:50%;
  background-color:#7BFF42;  
  margin-right:10px;
}
.sty_icon span {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #1B002A;
  letter-spacing: 0;  
}
.date_sty {
  float: right;  
}
.tit {
    position: absolute;
    top: 200px;
    right: 46%;
    color:#97A2B3;
    font-size:15px;
}
.img_sty {
  display:inline-block;
  width:150px;
  height:150px;
  margin-top:40px;
}
 .el-scrollbar__wrap {
  overflow-x: hidden;
 }
</style>

