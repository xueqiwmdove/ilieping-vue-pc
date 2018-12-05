<template>
  <div>
   <!--顶部导航-->
	<nav>
	    <div class="pull-left logo">
	        <span @click="click_logo">
	            <img src="../../assets/images/reg/logo.png" alt="aiLiePing">
	        </span>
	    </div>
	    <div class="pull-right" >
	       <span @mouseenter="enter()">
					  <el-badge v-if="flag" class="info-center" is-dot  @click.native="click_msg">消息中心</el-badge>
						<el-badge v-else class="info-center"   @click.native="click_msg">消息中心</el-badge>
				 </span>
	        <span class="userName" title="">
	            <img src="../../assets/images/dismission/我的.svg" alt="icon">
	            <i :title="message_title">{{message_title}}</i>
	        </span>
	        <span class="exit" @click="exit">退出</span>
	    </div>
			<!-- 消息展示 -->
			<!-- <div class="msg_sty" v-if="messageShow"  @mouseleave="leave()">
				  <div style="height:300px; padding-bottom:10px">
						<el-scrollbar style="height:100%">
							<ul class="list_stys" v-if="tableData !=''">
										<li v-for="(item,index) in tableData" :key="index">
										<span><i v-if="item.status =='0'" class="sty_icons"></i><i v-if="item.status =='1'" class="sty_icons"></i>{{item.content}}</span>
										<span class="date_stys">{{item.createTimeStr}}</span>
									</li>
							</ul>
				  </el-scrollbar>	
					</div>
			</div> -->
	</nav>
  </div>
</template>

<script>
	import http from '@/http/http'
  import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
export default {
  name: 'pageheader',
   data() {
      return {
				message_title:"",
        tableData: [],
				messageShow:false,//消息展示
				flag:false,//消息原点显示
      };
    },
    methods: {
			enter() {
				let that =this
				that.messageShow=true
			},
			leave() {
				let that =this
				that.messageShow = false
			},
      click_logo() {//跳转官网
//      window.location.href="http://192.168.1.46:8080/ALiePing/tpl/newWitesite/index.html"
        this.$router.push('/');
			},
			getpagetableData(){
					let that=this;
					that.type= '0';
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
    	company_detail(){
      	let token=window.localStorage.getItem('jingjing_login_token');
    		let that=this;
	      that.$http({
	  			method:"get",
	  			url:api.detail,
	  			headers:headers("application/json;charset=utf-8",token),
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code==10000 && res.data!=""){
						that.message_title=res.data.data.enterpriseName;
						let companyTit = window.localStorage.setItem('title',that.message_title)
	  			}
		    });
    	},
      click_msg(){
				this.flag = false
      	this.$router.push('/newMessage');
      },
      exit(){
      	let that=this;
      	that.$confirm('确定退出当前账户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
       }).then(() => {
	      that.$http({
	  			method:"post",
	  			url:api.logout,
	  			headers:headers(),
	  			cache:false
	  		}).then(function(res){
        	localStorage.clear();
          that.$router.push('/login');
        });  
          
        }).catch(() => {

        });
			},
			getdot() {
					let that=this;
					that.$http({
						method:"get",
						url:api.dot,
						headers:headers('application/json;charset=utf-8'),
					}).then(function(res){
						if(res.data.code==10000 && res.data!=""){
							that.flag = res.data.data
						}else{
							that.$message.error(res.message || res.data.msg);
						}
					});
			}

    },
	 mounted(){
	 	let that=this;
		 that.company_detail();
		 that.getpagetableData();
		 that.getdot()
	 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pull-left {
	float: left !important;
}
.pull-right {
	float: right !important;
	height: 48px;
	line-height: 48px;
}
.msg_sty {
	position: absolute;;
	width: 300px;
 /* overflow-x: hidden;
 overflow-y: auto; */
	background: #FFFFFF;
	box-shadow: 0 0 4px 0 rgba(0,0,0,0.20);
	right:187px;
	top:48px;
}
.list_stys {
  padding:10px 10px;
}
.list_stys li {
  /* list-style: */
  /* height: 36px; */
  background: #FFFFFF;
  border-bottom: 1px solid #D8D8D8;  
  line-height:33px;
  font-family: MicrosoftYaHei;
 font-size: 14px; 
 color: #97A2B3;
 letter-spacing: 0;
}
.sty_icons {
  display: inline-block;  
  width: 8px;
  height: 8px;
  border-radius:50%;
  background-color: #FF7F7F;  
  margin-right:10px;
}
.sty_icons span {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #1B002A;
  letter-spacing: 0;  
}
.date_sty {
  /* float: right;   */
}

</style>
<style>
 .el-badge__content.is-fixed {
    position: absolute;
    top: 19px;
    left: 8px;
    right: 10px;
    -webkit-transform: translateY(-50%) translateX(100%);
    transform: translateY(-50%) translateX(100%);
}
 .msg_sty .el-scrollbar__wrap {
  overflow-x: hidden !important;
 }
</style>

