<template>
  <div>
   <!--顶部导航-->
	<nav class="header_1">
	    <div class="pull-left logo">
	        <!-- <span @click="click_logo">
	            <img src="../../assets/images/reg/logo.png" alt="aiLiePing">
	        </span> -->
				<ul style="height:100%;"  v-clickoutside="handleClose2">
					<li><img src="../../assets/img/1.5.1/lou.png" alt=""></li>
					<li class="conpany_1">{{message_title}}</li>
					<li @click="detail_click(2)" v-if="status!=3" style="border-radius: 2px;"><span class="status_ren">请去验证</span> </li>
					<li  v-else><span class="status_ren2">已验证</span> <img src="../../assets/img/1.5.1/peizhi.png" alt=""></li>
					<li @click="checkpoint" @mouseover="topLine=true"   :class="{topLine:topLine}" class="setting" ><img src="../../assets/img/1.5.1/set.png" alt="">
            <ul v-if="topLine" class="selece_option" @mouseout="topLine=false;">
              <li @click="detail_click(1)">企业资料</li>
              <li @click="detail_click(2)">企业认证</li>
              <li v-if="loginType==0" @click="$router.push('/admin')">管理员权限设置</li>
            </ul>
          </li>
					<!--<div class="selece_option" >
							<ul v-if="topLine" class="selece_option" @mouseover="topLine=true" @mouseout="topLine=false;">
								<li @click="detail_click(1)">企业资料</li>
								<li @click="detail_click(2)">企业认证</li>
								<li v-if="loginType==0" @click="$router.push('/admin')">管理员权限设置</li>
							</ul>
					</div>-->
				</ul>
	    </div>
	    <div class="pull-right" >
				<ul style="height:100%;width:300px" v-clickoutside="handleClose">
						<li @click="click_phone(0)" :class="seen == '0'? 'topLine':''"  @mouseover="topPhone=true;seen=0" @mouseout="topPhone=false;seen=''"><img src="../../assets/img/1.5.1/ipone.png" alt="">
              <!-- 手机二维码 -->
              <div v-if="topPhone" class="phoneicon" >
                <img src="../../assets/img/1.5.1/erwei.png" alt="" >
              </div>
            </li>
					 	<li @click="click_msg(1);$router.push('/newMessage')" :class="seen == '1'? 'topLine':''" @mouseover="seen=1"  @mouseout="seen=''"  ><img src="../../assets/img/1.5.1/message.png" alt=""></li>
						<li style="	width: 160px;" @click="checkpoint1(2)"  @mouseover="topLines=true;seen=2" @mouseout="topLines=false;seen=''" :class="seen == '2'? 'topLine':''"><img style="margin-right:5px" src="../../assets/img/1.5.1/person.png" alt=""><span class="names">你好，{{loginUserName}}</span>
              <ul v-if="topLines" class="selece_option1"  @mouseover="topLines=true;seen=2" @mouseout="topLines=false;seen=''">
                <li @click="account(1)">账号安全</li>
                <li @click="account(2)" v-if="loginType==1">放弃管理员身份</li>
                <li @click="exit" >退出</li>
              </ul>
            </li>

						<!-- 消息展示 -->
							<!--<div v-if="topLines1"  class="msg_sty" >
								<ul  v-if="tableData !=''">
									<li v-for="(item,index) in tableData" :key="index">
										<span><i v-if="item.status =='0'" class="sty_icons"></i><i v-if="item.status =='1'" class="sty_icons"></i>{{item.content}}</span>
										<span class="date_stys">{{item.createTimeStr}}</span>
									</li>
								</ul>
								<ul v-else>
									<li style="text-align:center;width:100%;">暂无消息</li>
								</ul>
							</div>-->
						<!--个人信息安全  -->
							<!--<div class="selece_option1">
								<ul v-if="topLines" class="selece_option1">
									<li @click="account(1)">账号安全</li>
									<li @click="account(2)" v-if="loginType==1">放弃管理员身份</li>
									<li @click="exit" >退出</li>
								</ul>
							</div>-->
					</ul>
	       <!-- <span @mouseenter="enter()">
					  <el-badge v-if="flag" class="info-center" is-dot  @click.native="click_msg">消息中心</el-badge>
						<el-badge v-else class="info-center"   @click.native="click_msg">消息中心</el-badge>
				 </span>
	        <span class="userName" title="">
	            <img src="../../assets/images/dismission/我的.svg" alt="icon">
	            <i :title="message_title">{{message_title}}</i>
	        </span>
	        <span class="exit" @click="exit">退出</span> -->
	    </div>
	</nav>
	  <!-- 弹窗- -->
     <!-- <el-dialog title="" :visible.sync="dialogPerson" class="add_dialog " style="border-bottom: 0px solid #E5E5E5;" custom-class="sty_dialogs">
             <div style="text-align:center;"><i class="el-icon-warning" style="font-size:30px;color:#FF001F;"></i></div>
             <div style="text-align:center;font-size:16px;color:#394A66;margin:10px 0 ;">您是否要放弃管理员身份！</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="makeSure" style="height:36px">确 定</el-button>
          <el-button style="height:36px" @click="dialogPerson = false">取 消</el-button>
        </div>
      </el-dialog> -->
  </div>
</template>

<script>
import http from '@/http/http'
import api from '@/api/api.js';
import {headers} from '@/assets/js/common/lp.js'
// duanyanhong
// 2019.1.4
// 自定义控制员工架构下拉框点击空白处隐藏
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};
export default {
  name: 'pageheader',
   data() {
      return {
        loginType:1,//1子账号 0 主账号
        loginUserName:'',
        message_title:"",
        tableData: [],
        seen:'',
        topLine:'',
        topPhone:false,//手机二维码
        topLines:false,//账号安全
        topLines1:false,//信息展示
        status:3,
        flag:false,//消息原点显示
      };
	},
   directives: {clickoutside},
    methods: {
//       click_logo() {//跳转官网
// //      window.location.href="http://192.168.1.46:8080/ALiePing/tpl/newWitesite/index.html"
//         this.$router.push('/');
// 			},
      //  企业验证信息
        checkpoint () {
          this.topLines1=false
          this.topLine =!this.topLine
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
                that.status=res.data.data.isAuthentication;
                that.loginType=res.data.data.loginType;
                that.loginUserName=res.data.data.loginUserName;
                let companyTit = window.localStorage.setItem('title',that.message_title);
                window.localStorage.setItem('loginAccount',res.data.data.loginAccount);
                window.localStorage.setItem('loginType',that.loginType);
            }
          });
        },
        //企业资料 、 企业认证
        detail_click(val) {
          if(val == '1') {
              this.$router.push({path:'/company'})
          }
          if(val == '2') {
              this.$router.push({path:'/businessCert'})
          }
        },

        // 账号安全，放弃管理员身份
        account(val) {
          if(val == '1') {
              this.$router.push({path:'/account'})
          }
          if(val == '2') {
              let that=this;
            that.$confirm('您是否要放弃管理员身份！', '', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {

              that.$http({
                method:"post",
                url:api.abandonAuth,
                headers:headers(),
                cache:false
              }).then(function(res){
                that.$message.success(res.data.msg)
              }).catch(function (res) {
                that.$message.error(res.data.msg)
              })

            }).catch(() => {

            });
          }
        },
        // 点击显示二维码
        click_phone(val) {
          this.seen=val
          this.topPhone =!this.topPhone
          this.topLines =false
          this.topLines1=false

        },
      // 点击显示信息栏
      click_msg(val){
        this.seen = val
        this.topLines =false
        this.topPhone =false
        this.topLines1 =!this.topLines1
          // this.$router.push('/newMessage');
          // this.flag = false
        },
      // 点击显示个人信息
      checkpoint1(val) {
        this.seen =val
        this.topPhone =false
        this.topLines1 =false
        this.topLines =!this.topLines
      },
      // 关闭下拉栏
      handleClose() {
        this.topPhone =false
        this.topLines1 =false
        this.topLines =false
        this.seen=''
      },
      handleClose2() {
        this.topLine=false
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
      },
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
@import url("../employeeManage/common/indexList/index2.css");
.header_1 {
	background-color: rgba(255,255,255,1);
  line-height: 48px;
  box-shadow:0px 2px 2px 0px rgba(170,170,170,0.12);
}
.conpany_1 {
	margin-left: 20px;
	font-size:18px;
	font-family:MicrosoftYaHei;
	color:rgba(0,0,0,1);
}
.status_ren{
	margin-left: 20px;
  padding: 2px 10px;
	cursor: pointer;
	font-size: 12px;
	color: #F95714;
	width:70px;
	height:22px;
	background:rgba(255,255,255,1);
	border-radius:4px;
	border:1px solid;
	border-image:linear-gradient(136deg, rgba(255,131,80,1), rgba(249,87,20,1), rgba(249,87,20,1)) 1 1;
}
.status_ren2{
	margin-left: 20px;
	cursor: pointer;
	font-size: 12px;
	color: #F95714;
	width:70px;
	height:22px;
	background:rgba(255,255,255,1);
}
.pull-left {
	float: left !important;
}
.pull-left ul li {
	float: left;
}
.setting {
	margin-left:20px;
	cursor: pointer;
	width:45px;
  height: 48px;
	text-align: center;
  border-top: 2px solid transparent;
}
.setting:hover+.selece_option{
  display: inline-block;
}
.setting+.selece_option{
  display: none;
}
.setting.topLine:hover+.selece_option{
  display: inline-block;
}
.setting img,.pull-right ul li:nth-child(3) img,.pull-right ul li:nth-child(3) span{
  margin-top: -2px;
}
.pull-right {
	float: right !important;
	height: 48px;
	line-height: 48px;

}
.pull-right ul li {
	cursor: pointer;
	float: left;
	width: 45px;
	text-align: center;
}
.pull-right ul li img{
  vertical-align: middle;
}
.pull-right ul li:nth-child(3) {
  height: 48px;
  font-size:15px;
	text-align: center;
	font-family:PingFangSC-Regular;
	font-weight:400;
	margin-right: 0px;
  margin-top: 0;
  color: rgba(51,51,51,1);
  border-top: 2px solid transparent;
}
.pull-right ul li.topLine,.pull-left ul li.setting.topLine{
  border-top:2px solid rgba(249,87,20,1);
}
.selece_option {
	width:160px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 2px 0px rgba(170,170,170,0.12);
	text-align: center;
	position: absolute;
	left: 240px;
	top:49px;
}
.selece_option  li {
 height: 45px;
 width: 100%;
 text-indent: 30px;
 text-align: left;
 font-size:14px;
 font-family:PingFangSC-Regular;
 font-weight:400;
 color:rgba(51,51,51,1);
 cursor: pointer;
}
.selece_option  li:hover {
	background-color: rgba(249,87,20,0.05);
}
ul.selece_option1 {
	width:160px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 2px 0px rgba(170,170,170,0.12);
	text-align: center;
	position: absolute;
	right: 80px;
	top:49px;
}
ul.selece_option1  li  {
 height: 45px;
 width: 100%;
 text-align: center;
 font-size:14px;
 font-family:PingFangSC-Regular;
 font-weight:400;
 color:rgba(51,51,51,1);
 cursor: pointer;
}
ul.selece_option1  li:hover  {
	background-color: rgba(249,87,20,0.05);
}
.selece_option2 ul{
	width:160px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 2px 0px rgba(170,170,170,0.12);
	text-align: center;
	position: absolute;
	right: 177px;
	top:48px;
}
.selece_option2 ul li  {
 height: 45px;
 width: 100%;
 text-align: center;
 font-size:14px;
 font-family:PingFangSC-Regular;
 font-weight:400;
 color:rgba(51,51,51,1);
 cursor: pointer;
}
.selece_option2 ul li:hover  {
	background-color: rgba(249,87,20,0.05);
}
.names {
	width:96px;
	height:22px;
	font-size:16px;
	font-family:PingFangSC-Regular;
	font-weight:400;
	color:rgba(51,51,51,1);
	line-height:22px;
}
.msg_sty {
	position: absolute;;
	width: 270px;
	height: 258px;
	background: #FFFFFF;
	box-shadow:0px 2px 2px 0px rgba(170,170,170,0.12);
	padding:10px 10px;
	right:236px;
	top:48px;
}
.msg_sty ul li {
  line-height:33px;
	text-align: left;
	width: 100%;
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
.phoneicon {
 width:160px;
 height:180px;
 background:rgba(255,255,255,1);
 box-shadow:0px 2px 2px 0px rgba(170,170,170,0.12);
 position: absolute;
 right: 282px;
 top:49px;
 text-align: center;
 cursor: pointer;
}
</style>
<style>
@import url("../employeeManage/common/indexList/index.css");

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
 .dialog-fir .el-dialog .el-dialog__body {
  height: 280px;
	width:540px;
 }
</style>

