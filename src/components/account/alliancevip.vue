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

        <!--积分不足开通联盟会员-->
        <el-dialog
          title="开通联盟会员"
          :visible.sync="isVip"
          class="isVip"
          custom-class="isVipContent">
          <div class="open-recruit">
            <div class="two-kinds stair">
              <p><span>2000 </span>元/1年</p>
              <p>30次／天免费查询</p>
            </div>
            <div class="payFor">
              <h4>选择充值方式</h4>
              <p class="alipay"></p>
              <p class="weChart"></p>
            </div>
            <p class="agree"><label for="radio"><input type="radio" id="radio">加入联盟即表示同意联盟章程</label></p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary"  class="confirm join-in btn" @click="isVip=false">加入联盟</el-button><!--使用模板确定-->
        </span>
        </el-dialog>

<div class="recruit">
    <h4>加入会员联盟尊享特权</h4>
    <p>
<!--        <span>免费曝光失信人员</span>-->
        <span>免费查询<i>100次</i>／天</span>
    </p>
    <input type="button" value="立即加入" @click="click_add">
</div>
<div class="allianceBox">
    <div class="headLine">
        <div class="pull-left">会员状态
            <i>VIP会员</i>
            <em>（到期时间 2019-03-23）</em>
        </div>
        <div class="pull-right">职场信用分
        <i>{{credit_score}}分</i>
		    <div class="tootip_div">
			    <el-tooltip class="item" effect="dark" content="职场信用是爱猎评网推出的积分体系，在使用爱猎评产品中会获得和消耗积分" placement="bottom-end">
			      <el-button><img src="../../assets/images/reg/info.svg" alt=""></el-button>
			    </el-tooltip>
		    </div>
            <!--<div class="info">
                <em class="triangle-up"></em>
                职场信用是爱猎评网推出的积分
                体系，在使用爱猎评产品中会获
                得和消耗积分
            </div>-->
        </div>
    </div>
    <ul class="tabs-parent">
        <li @click="union(1)" :class="flag==1?'active':''">联盟介绍</li>
        <li @click="union(2)" :class="flag==2?'active':''">联盟章程</li>
    </ul>
    <div class="tabs-contents">
        <div class="introduce tabs-content" v-if="union_introduce">
            <p  class="title">联盟介绍</p>
            <p>猎评联盟是由“爱猎评网”建立的大型职场人士评价、职场失信人信息综合查询平台。同时，企业可以自主提交失信违约员工信息，在针对失信人施加舆论压力，社交压力的同时，实现联盟企业间的跨平台查询，为招错人、用错人等风险情况提出了良好的解决方案。
            </p>
            <p>平台通过企业建立员工职场评价档案，实现约束、信任机制的工具，
                让企业为优秀员工背书站台，使失信者受到惩罚，致力于构建和谐
                职场环境，打造良性循环的健康职场环境。
            </p>
        </div>
        <div class="rules tabs-content active" v-if="union_constitution">
            <p class="title">联盟章程</p>
            <div class="rules_content">
                <h4 class="rules_title">第一章　总则</h4>
                <p>第一条 本联盟的名称为“猎评诚信联盟” （以下简称“本联盟”）。</p>
                <p>第二条 本联盟是由中国各领域企业、事业单位及行业专家组织自愿结成的全国性、非营利性社会组织。</p>
                <p>第三条 本联盟的宗旨：让企业为优秀员工背书站台，使失信者受到惩罚，致力于构建和谐职场环境，打造良性循环的健康职场环境。</p>
                <p>第四条 本联盟及各联盟成员在本联盟章程的宗旨、协作内容范围内依据自愿原则开展合作、交流、信息共享。</p>
                <h4 class="rules_title">第二章　联盟协作内容</h4>
                <p>第一条 建立联盟网站，通过联盟成员自愿分享资料、信息，实现联盟成员之间在离职员工评价等方面的信息共享，联盟成员
                    在法律法规允许的范围内可自愿提供相应协助，共同打造良性循环的健康职场环境。
                </p>
                <p>
                    第二条 建立惩戒无职业道德和诚信不良的员工的交流平台，遏制恶意消极怠工、随意任性离职、恶意仲裁、不正常交接工作，
                    窃取公司资源，侵占公司财产等职场不诚信行为，净化职场诚信环境。
                </p>
                <h4 class="rules_title">第三章　联盟的加入</h4>
                <p>第一条 联盟遵循自愿加入原则，凡是依法成立、守法诚信且具有诚信经营价值观的企业、事业单位可提交申请资料加入联盟</p>
                <p>第二条 联盟成员享有退出自由，退出联盟成员在联盟各系统、网站等的相关权限将被关闭。</p>
                <h4 class="rules_title">第四章　权利与义务     </h4>
                <h6>第一条 联盟成员的权利</h6>
                <p>（一）、可建立本单位员工档案，并对员工的工作表现以及履约等情况给予真实记录。</p>
                <p>（二）、可查阅联盟成员共享的信息。</p>
                <p>（三）、免费获得联盟颁予的“联盟诚信企业”证书。</p>
                <p>（四）、自愿加入、退出自由。</p>
                <h6>第二条 联盟成员的义务</h6>
                <p>（一）、保密义务：各联盟成员提供的相关资料、信息，应当视为该联盟成员的商业秘密，
                    仅为联盟内部成员共享，且提供者有权决定共享范围。获取该信息的其他联盟成员应当采取
                    严格的保密措施给予保护，除法定要求以外，未经相关联盟成员许可的情况下，各联盟成员
                    不应当公开相关信息，也不应当向联盟成员外任何第三方披露，更不得用于商业目的。
                </p>
                <p>（二）、费用共担义务：联盟正常运转所产生的相关费用，由参与活动的联盟单位成员共同分担。</p>
                <h4 class="rules_title">第五章　附则</h4>
                <p>第一条 本章程的解释权属于猎评诚信联盟所有。</p>
                <p>第二条 本章程生效后，猎评联盟成员单位必须认真自觉遵守执行。</p>
                <p>第三条 凡猎评联盟其它规定与本章程相抵触时，应以本章程规定为准。</p>
                <p>第四条 本章程自二零一八年一月一日起执行。</p>
            </div>
        </div>
    </div>
</div>


  			</div>
  		</div>
  	</div>

  </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js'
	import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader'
  import pageaside from '@/components/common/pageaside'

export default {
  name: 'account_alliancevip',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
        union_introduce:true,
        union_constitution:false,
        flag:1,
        credit_score:'',
        isVip:false,
      };
    },
    methods: {
    	click_add(){
        this.isVip=true;
    	},
      union(a){
      	if(a==1){
      		this.union_introduce=true;
      		this.union_constitution=false;
      		this.flag=1;
      	}else{
      		this.union_introduce=false;
      		this.union_constitution=true;
      		this.flag=2;
      	}
      },
      fun_alliancevip(){
      	let token=window.localStorage.getItem('jingjing_login_token');
      	let that=this;
        that.$http({
	  			method:"get",
	  			url:api.integral,
	  			headers:headers("application/json;charset=utf-8",token),
	  			cache:false
	  		}).then(function(res){
//	  			console.log(res);
//	  			console.log(res.data.code);
	  			if(res.data.code===10000){
	  				that.credit_score=res.data.data;
	  			}else{
	  				that.$message.error(res.message || res.data.msg);
	  			}

	  		});
      }
    },
   mounted(){
	 	let that=this;
	 	that.fun_alliancevip();
	 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 .main .right-content .content{
 	  border: none;
   background: none;
   box-shadow:none;
 }
 .allianceBox .rules{
	display: block;
}
.allianceBox .headLine {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    padding: 0 20px;
    text-align: left;
    color: #21324E;
    letter-spacing: 0;
    border-bottom: 1px solid #e5e5e5;
}
.allianceBox .headLine i {
    color: #f95714;
}
.allianceBox .headLine em {
    color: #748093;
    font-size: 14px;
}
.el-button{
	padding: 0 5px;
    border: none;
}
.tootip_div{
	display: inline-block;
	margin-top: -2px;
	float: right;
}
.agree{
   font-size: 14px;
   color: #748093;
   letter-spacing: 0;
   margin: 40px 0 0 20px;
  cursor:pointer;
 }
 .agree input{
   margin: 0 8px 0 0;
   background: url(../../assets/img/dismission/ic_round.svg);

 }
</style>
