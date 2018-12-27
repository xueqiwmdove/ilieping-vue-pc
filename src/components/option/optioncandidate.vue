<template>
  <div >
   <div class="main">
	   <!--登记表弹窗-->
		<!-- <addCandidate :addVisible.sync="visables.add" @hideModel="hideChildModal"></addCandidate> -->
          <!--顶部导航-->
        <pageheader class="pageheader"></pageheader>
          <!--侧边栏-->
          <div class="aside">
            <pageaside></pageaside>
          </div>
          <!--右侧内容栏-->
        <div class="right-content pull-right">
            <div class="content">
                <p class="headline">
                    <span>面试邀约模板</span>
                </p>
                <el-row>
              <!--left-side-->
                    <div class="asidePosition ad_input">
                        <h4><img class="img_shengfen" src="../../assets/img/zhiwei/miasnhi_ic_pannei.png" alt="">
                          <span  style="margin-left:30px;">模板</span>
                        </h4>
                        <p @click="click_option()" class="ad_change">面试登记表 <i><img src="../../assets/img/zhiwei/ic_chose.png" alt=""></i></p>
                        <p @click="click_optioninterview()">面试邀约模板 <i></i></p>
                        <p @click="click_optionoffer()">offer模板<i></i></p>
                        <p @click="click_optionjudge()">简历评估邀请模版<i></i></p>
                        <p @click="click_optionmaster()">面试官面试通知模版<i></i></p>
                        <p @click="click_optioncandidate()">候选人签到通知模版<i></i></p>
						<p @click="click_optioncancel()">面试取消通知模版<i></i></p>
						<p @click="click_optionrefuse()">拒信模版<i></i></p>
					</div>
					<div class="option-left">
						<div class="optioninterviewTop">
							<ul>
                <li>候选人签到通知邮件模板</li>
                <li>+自定义（升级企业用户）</li>
							</ul>
						</div>
						<div class="optioninterviewBottom">
                <div class="bottomConclude">
                  <div class="topBorder"></div>
                  <div class="content">
                    <span><i>上海棋至文化有限公司</i>的<i class="iSpecial">面试官姓名</i>，您好！</span>
                    <span>我是公司的HR，有一名投递<i class="iSpecial">岗位名称</i>岗位的候选人已到现场签到,安排如下:</span>
                    <span><i>阶段地址：</i><i class="iSpecial">上海市南京东路1288号上海商3楼</i></span>
                    <span>联系方式：<i class="iSpecial">李乾坤</i><i class="iSpecial">18809098897</i></span>
                    <span>您可以直接通过下方链接对其进行面试评价</span>
                    <span><i>www.lphr.com</i></span>
                  </div>
                  <div class="bottomBorder"></div>
                </div>
						</div>
            <div class="optioninterviewTop">
							<ul>
                <li>候选人签到通知短信模板</li>
                <li>+自定义（升级企业用户）</li>
							</ul>
						</div>
						<div class="optioninterviewBottom">
                <div class="bottomConclude">
                  <div class="topBorder"></div>
                  <div class="content">
                    <span><i>上海棋至文化有限公司</i>的<i class="iSpecial">面试官姓名</i>，您好！</span>
                    <span>我是公司的HR，有一名投递<i class="iSpecial">岗位名称</i>岗位的候选人已到现场签到,安排如下:</span>
                    <span><i>阶段地址：</i><i class="iSpecial">上海市南京东路1288号上海商3楼</i></span>
                    <span>联系方式：<i class="iSpecial">李乾坤</i><i class="iSpecial">18809098897</i></span>
                    <span>您可以直接通过下方链接对其进行面试评价</span>
                    <span><i>www.lphr.com</i></span>
                  </div>
                  <div class="bottomBorder"></div>
                </div>
						</div>
					</div>
                </el-row>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import store from '@/store/store';
  import {format} from '@/assets/js/date.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
  
  export default {
  name: 'jobmanageindex',
	components: {
   	pageheader,
    pageaside,
	},
    methods: {
    click_optioninterview(){
        this.$router.push('/optioninterview');
      },
      click_optionoffer(){
        this.$router.push('/optionoffer');
      },
      click_option(){
        this.$router.push('/option');
      },
      click_optionjudge(){
        this.$router.push('/optionjudge');
      },
      click_optionmaster(){
        this.$router.push('/optionmaster');
			},
			click_optioncandidate(){
        this.$router.push('/optioncandidate');
			},
			click_optioncancel(){
        this.$router.push('/optioncancel');
			},
			click_optionrefuse(){
        this.$router.push('/optionrefuse');
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
 .content {
	 min-width: 1520px;
 }
 /* .topBorder{
   background: url("../../assets/img/muban/topborder.jpg") no-repeat;
 } */
 .topBorder{
        background: url("../../assets/img/muban/topborder.jpg") no-repeat;
        background-size: contain;
        width: 77.5%;
        min-width: 500px;
        height: 30px !important;
        margin-bottom: 30px !important;
    }
    .bottomBorder{
        background: url("../../assets/img/muban/bottomborder.jpg") no-repeat;
        background-size: contain;
        width: 77.5%;
        min-width: 500px;
        height: 30px !important; 
        margin-top: 30px !important;
    }
 .optioninterviewBottom{
	 min-width: 500px;
	 height: auto;
	 float: left;
   overflow: hidden;
	 width: 77.5%;
	 border-bottom:1px solid #E5E5E5;
 }
 .bottomConclude{
   min-width: 500px;
	 height: auto;
   margin: 60px auto 99px auto  !important;
	 float: left;
   overflow: hidden;
	 width: 77.5%;
 }
 .optioninterviewBottom .content{
   min-width: 500px;
	 height: auto;
   overflow: hidden;
	 width: 77.5%;
   /* margin: 38px 0 30px 0; */
   box-shadow: none;
   -webkit-box-shadow:none;
   padding-bottom: 0;
 }
 .optioninterviewBottom .content i{
    background:rgba(242,243,245,1); 
    font-size: 14px;
    color: #394a66;
    font-weight: bold;
    padding: 0 11px;
    line-height: 19px;
    height: 19px;
 }
 .iSpecial{
   margin: 0 10px;
 }
 .optioninterviewBottom h1{
	 line-height: 35px;
	 margin-top: 40px;
	 font-size: 26px;
	 text-align: center;
	 display: inline-block;
	 width: 100%;
 }
.optioninterviewBottom ul{
	width: 100%;
	margin-top: 20px;
	display: inline-block;
	margin-bottom: 29px;
	line-height: 18px;
	height: 18px;
}
.optioninterviewBottom div{
  overflow: hidden;
  height: auto;
  display: table;
  margin: 0 auto;
}
.optioninterviewBottom h2{
	width: 86px;
	height: 14px;
	border-left: 4px solid #F95714;
	position: absolute;
	top: -7px;
	padding-left: 10px;
	background-color: #FFFFFF;
	z-index: 55;
	left: 0;
}
.optioninterviewBottom span{
	width: 100%;
	margin-bottom: 19px;
	font-size: 14px;
  line-height: 19px;
	padding:0 30px 0 60px;
  display: block;
}
.optioninterviewBottom ul li{
	float: left;
	width: 50%;
}
.optioninterviewBottom strong{
	line-height: 18px;
}
 .optioninterviewTop{
	 min-width: 500px;
	 height: 60px;
	 float: left;
	 width: 77.5%;
	 border-bottom:1px solid #E5E5E5;

 }
 .optioninterviewTop ul{
	 height: 21px;
	 display: block;
 }
 .optioninterviewTop ul li{
	 position: relative;
	 float: left;
	 width: 300px;
	 display: block;
	 height: 21px;
 }
 .optioninterviewTop ul li:first-child{
   color: #394A66;
   font-size: 16px;
   font-weight: bold;
   line-height: 60px;
 }
 .optioninterviewTop ul li:last-child{
   display: block;
   width: 185px;
   margin-top: 10px;
   height: 40px;
   background-color: #E5E5E5;
   font-size: 14px;
   float: right;
   color:#97A2B3;
   cursor: pointer;
   text-align: center;
   line-height: 40px;
 }
 .optioninterviewTop ul li h1{
	 font-size: 16px;
	 float:left;
	 margin-top: 55px;
	 margin-left:  70px;
 }
  .optioninterviewTop ul li h2{
	  color: #748093;
	  font-size: 14px;
	  float:left;
	  margin-left: 70px;
  }
 .optioninterviewTop ul li img{
	 position: absolute;
	 top: 50%;
	 transform: translateY(-50%)
 }
.asidePosition {
    width: 340px;
    min-width: 340px;;
    height:948px;
	background: #fff;
	float: left;
    /* margin-right: 15px; */
    padding: 0px 25px;
    /* border-right: 1px solid #eee; */
}
.asidePosition h4 {
font-family: MicrosoftYaHei-Bold;
font-size: 16px;
color: #394A66;
letter-spacing: 0;
text-align: left;
color: #F95714;
position: relative;
}
.asidePosition h4 .img_shengfen {
    position: absolute;
}
.ad_input .search {
float: right;
width: 260px;
height: 40px;
/* margin-top: 30px; */
position: relative;
left: -30px;
top:10px;
}
.ad_input .search .input_search {
width: 260px;
position: absolute;
top:-21px;
}
.ad_input  .search .input_search .se_icon {
position: absolute;
right:-244px;
height: 30px;
top: 3px;
font-size: 18px;
font-weight: 700;
border-left: 1px solid #E5E5E5;
color: #F95714;
}
.ad_input .search .el-icon-search:before {
    content: "\E619";
    margin-left: 5px;
}
.ad_change{
color: #F95714;	
}
.ad_input p {
  width: 320px;
  cursor: pointer;
  height: 30px;
  /* color: #F95714; */
  margin-top:30px;
  /* background-color: #FAFBFC; */
}
.ad_input p i {
margin-left: 180px;
}
.position_list {
   height: 600px;
   width: 300px;
}
.position_list ul {
  width: 100%;
  height: 100%;
}
.position_list ul li {
  height: 30px;
  color:rgba(57,74,102,1);
  line-height: 30px;
  margin-bottom:10px;
}

.positionTable {
    background-color: #fff;
    padding: 0px 25px;
    margin-left: 36px;
    min-width: 1248px;
    padding-left: 0px;
}
.content_pad {
  margin:11px;
  height:80px;
  line-height:80px;
  margin-top: 0px;
}
.but_stys {
  width:120px;
  height:80px;
  margin-right: 10px;
  border-radius: 4px;
  display:inline-block;
  position: relative;
  cursor: pointer;
  background: #FFFFFF;
  color: #748093;
  box-shadow: 0 2px 4px 0 rgba(216,216,216,0.50);

}
.btn_s {
  background-image: linear-gradient(-136deg, #FF8350 0%, #F95714 100%, #F95714 100%);
  color:#fff;
  border-radius: 4px;
  margin-left: 10px;
}
.content_pad .but_stys .font_s {
  width: 100%;
  height: 30px;
  display: inline-block;
  position: absolute;
  top:-20px;
  left:11px;
}
.content_pad .but_stys .num_s {
  position: absolute;
  top:18px;
  left:13px;
}
.content_pad .but_stys .icon_s {
  position: absolute;
  top:20px;
  right:13px;
  font-size: 18px;
}
.content_pad .search {
  float: right;
  width: 400px;
  height: 40px;
  margin-top: 10px;
  position: relative;
}
.content_pad .search .input_search {
  width: 260px;
  position: absolute;
  top:-21px;

}
.content_pad .search .input_search .se_icon {
  position: absolute;
  right:-244px;
  height: 30px;
  top: 25px;
  font-size: 18px;
  font-weight: 700;
  border-left: 1px solid #E5E5E5;
  color: #F95714;
}
.content_pad .search .el-icon-search:before {
    content: "\E619";
    margin-left: 5px;
}
.content_pad .add_btn  {
  background: #F95714;
  border-radius: 4px;
  width: 120px;
  height: 100%;
  color: #fff;
  float: right;
}
.basic_sty .name_s {
   font-size: 15px;
   color:#394A66;
}
.basic_sty .name_s em {
  font-size: 12px;
  color: #748093;
}
.bom_sty {
  width: 2px;
  height: 2px;
  background-color: #748093;
  border-radius: 50%;
  display: inline-block;
  margin: 0 4px;
}
.div_table_infor {
   margin-top: 10px;
}
.positionTable   .div_table_infor .el-table {
  border:none;
}
</style>
<style>
.position_list .el-scrollbar__wrap {
  overflow-x: hidden !important;
 }
</style>

