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
                    <span>设置</span>
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
						<div class="optionTop">
							<ul>
								<li>
									<img src="../../assets/img/zhiwei/shezhi_ic_diyibu.png"/>
									<h1>第一步：打印二维码</h1>
									<h2>打印二维码放到前台，供员工扫码</h2>
								</li>
								<li>
									<img src="../../assets/img/zhiwei/shezhi_ic_diyibu.png"/>
									<h1>第二步：候选人扫码</h1>
									<h2>候选人扫码自助填写面试登记表</h2>
								</li>
								<li>
									<img src="../../assets/img/zhiwei/shezhi_ic_diyibu.png"/>
									<h1>第三步：HR面试提醒</h1>
									<h2>候选人提交登记表后HR收到提醒</h2>
								</li>
								<li>
									<div class="Qrcode" id="Qrcode"></div>
									<el-button class="optionTop printqrcode" type="text" @click="open4">打印二维码</el-button>
								</li>
							</ul>
							<div class="printButton" id="printButton"></div>
						</div>
						<div class="optionBottom">
							<h1>面试登录表<i></i></h1>
							<ul>
								<li>应聘岗位:</li>
								<li>面试时间:</li>
							</ul>
							<div class="option_baseinfo" style="height:548px;">
								<h2>基本信息</h2>
								<span>姓名</span>
								<span>性别</span>
								<span>出生年月</span>
								<span>年龄</span>
								<span>邮箱</span>
								<span>手机</span>
								<span>政治面貌</span>
								<span>籍贯</span>
								<span>婚姻状况</span>
								<span>身份证号码</span>
								<span>生育状况</span>
								<span>现住地址</span>
								<span>所在行业</span>
								<span>期望行业</span>
								<span>目前工作状态</span>
								<span>当前薪酬</span>
								<span>最快到岗时间</span>
								<span>期望薪酬</span>
								<span>工作城市</span>
								<span>技能标签</span>
							</div>
							<div class="workExp" style="height:264px;">
								<h2>工作经历</h2>
								<span>任职时间</span>
								<span>公司名称</span>
								<span>岗位</span>
								<span>薪资</span>
								<span>离职原因</span>
								<span>证明人</span>
								<span>联系方式</span>
							</div>	
							<div class="eduExp"  style="height:264px;">
								<h2>教育经历</h2>
								<span>就读时间</span>
								<span>学校名称</span>
								<span>专业</span>
								<span>学历</span>
								<span>学位</span>
								<span>是否全日制</span>
								<span>其他</span>
							</div>
							<div class="personSpacial"  style="height:264px;">
								<h2>个人特质</h2>
								<span>特长爱好</span>
								<span>英语水平</span>
								<span>计算机水平</span>
								<span>证书</span>
								<span style="width:100%;">公司内部是否有您的亲戚朋友</span>
								<span>应聘途径</span>
							</div>
							<div class="getNotice"  style="height:165px;">
								<h2>入职声明</h2>
								<strong>入职声明： 本人已准确理解、并接受上述各项目内容及要求，保证所填内容属实，并同意公司进行核实，如有不实之处，本人无条件接受公司辞退处分，并承担相应责任。</strong>
								<ul>
									<li>申请人:</li>
									<li>日期:</li>
								</ul>
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
	import QRCode from 'qrcodejs2'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
//  blance

export default {
	components: {
   	pageheader,
    pageaside,
	},
    methods: {
					open4() {
						const h = this.$createElement;
						this.$msgbox({
							title: '面试登记表',
							message: h('p', null, [
								h('span', null, '请扫描下方二维码填写面试登记表，请尽可能完整的填写，并确保填写的信息准确，真实，有效。'),
								h('div', {id:'Qrcode_a'})
							]),
							// showCancelButton: true,
							confirmButtonText: '打印',
							callback: action => {
								this.$message({
									type: 'info',
									message: `action: ${ action }`
								});
							}
						})
					},
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
			getQrcode(){
				let that=this;
            that.newDepartments = false;
            that.$http({
            url:api.Qrcode,
            method:'get',
  					headers:headers("application/json;charset=utf-8"),
  					data:{},
  					cache:false,		
          }).then(function(res){
            // console.log(res);
          if(res.data.code=10000){
						console.log(res.data.data)
						var qrcode = new QRCode('Qrcode', {
							text: res.data.data,
							width: 120,
							height: 120,
							colorDark : '#000000',
							colorLight : '#ffffff',
						});
					}
				})
			},
			getQrcode_a(){
				let that=this;
            that.newDepartments = false;
            that.$http({
            url:api.Qrcode,
            method:'get',
  					headers:headers("application/json;charset=utf-8"),
  					data:{},
  					cache:false,		
          }).then(function(res){
            // console.log(res);
          if(res.data.code=10000){
						console.log(res.data.data)
						var qrcode = new QRCode('Qrcode_a', {
							text: res.data.data,
							width: 120,
							height: 120,
							colorDark : '#000000',
							colorLight : '#ffffff',
						});
					}
				})
			},
		},
		created(){
			this.getQrcode();
			this.getQrcode_a();
		}
	}
</script>
<style scoped >
 .content {
	 min-width: 1600px;
 }
 .el-message-box__errormsg{
	 visibility: visible;
 }
 .optionBottom{
	 height: auto;
	 overflow: hidden;
	 float: left;
	 width: 1000px;
	 margin: 20px 115px;
	 position: relative;
	 padding:0 40px;
	 border:1px solid #E5E5E5;
	 display: table;
 }
 .optionBottom h1{
	 line-height: 35px;
	 margin-top: 40px;
	 font-size: 26px;
	 text-align: center;
	 display: inline-block;
	 width: 100%;
 }
.optionBottom ul{
	width: 100%;
	margin-top: 20px;
	display: inline-block;
	margin-bottom: 29px;
	line-height: 18px;
	height: 18px;
}
.optionBottom div{
	position: relative;
	border-top:1px solid #E5E5E5;
	z-index: 2;
	padding-top: 48px;
	height: auto;
}
.optionBottom h2{
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
/* .optioninterviewBottom .content */
.optionBottom span{
	width: 50%;
	margin-bottom: 30px;
	font-size: 14px;
	padding-right: 278px;
	float: right;
	text-align: right;
}
.optionTop .printButton{
	position:absolute;
	width:100px;
	height: 40px;
	right: 150px;
	top:200px;
	box-shadow:0px 2px 4px 0px rgba(0,0,0,0.2);
	border-radius:4px;
}
.optionBottom ul li{
	float: right;
	width: 210px;
	text-align:left;
}
.optionBottom strong{
	line-height: 18px;
}
 .optionTop{
	 /* min-width: 500px; */
	 height: 160px;
	 float: left;
	 width: 77.5%;
	 border-bottom:1px solid #E5E5E5;

 }
 .optionTop ul{
	 height: 160px;
	 display: block;
 }
 .optionTop ul li{
	 position: relative;
	 float: left;
	 width: 300px;
	 display: block;
	 height: 160px;
 }
.optionTop .printqrcode{
	 display: inline-block;
	 width: 100px;
	 height: 40px;
	 background-color:#F95714;
	 color:#fff;
	 font-size: 14px;
	 line-height: 40px;
	 text-align: center; 
	 position: absolute;
	 top:50%;
	 transform: translateY(-50%);
	 right: 0;
	 cursor: pointer;
}
.optionTop ul li .Qrcode{
	width: 120px;
	height: 120px;
	position: absolute;
	top:50%;
	left: 60px;
	transform: translateY(-50%);
}
 .optionTop ul li h1{
	 font-size: 16px;
	 float:left;
	 margin-top: 55px;
	 margin-left:  70px;
 }
  .optionTop ul li h2{
	  color: #748093;
	  font-size: 14px;
	  float:left;
	  margin-left: 70px;
  }
.printqrcode {
	padding: 0;
}
 .optionTop ul li img{
	 position: absolute;
	 top: 50%;
	 transform: translateY(-50%)
 }
/* .Qrcode .el-button{
	padding:0 !important;
}
.el-message-box{
	width: 1240px !important;
	height: 1110px !important;
}
.el-button--primary{
	background-color: #F95714;
	border-color: #F95714;
	width: 100px;
	height: 40px;
} */
.asidePosition {
    width: 340px;
    min-width: 340px;;
    height:948px;
	background: #fff;
	float: left;
    margin-right: 15px;
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

