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
                    <a>录入新员工</a>
                </p>
                <div class="sendOfferMain">
                    <div class="sendOfferSteps">
                        <div class="sendOffer-status">
                            <div class="sendOffer_one">
                                <div>
                                    <img src="../../assets/img/dismission/step1_a.svg" />
                                    <i class="step_a" ></i>
                                </div>
                                <span>基本信息</span>
                            </div>
                            <!--<i class="step_a" ></i>-->
                            <div class="sendOffer_two">
                                <div>
                                    <img src="../../assets/img/dismission/step2_a.svg" />
                                    <i class="step_a" ></i>
                                </div>
                                <span>薪资福利</span>
                            </div>
                            <!--<i class="step_a" ></i>-->
                            <div class="sendOffer_three">
                                <img src="../../assets/img/dismission/step3_a.svg" />
                                <span>添加成功</span>
                            </div>
                        </div>
                    </div>
                    <div class="personDataBox">
                        <div>
                            <img src="../../assets/img/staff/insertsuccess.png" />
                            <span>
                                恭喜，员工已经录入成功
                                <br/>
                                您可以到合同页面发起电子版劳动合同的签署
                            </span>
                            <!-- <strong class="certtify">该员工暂未实名认证，请提醒员工进行认证</strong> -->
                            <div class="otherPage">
                                <div @click="bySinging">签署合同</div>
                                <div @click="insertEmployee">继续添加员工</div>
                                <div @click="indexList">查看员工详情</div>
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
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';

export default {
  name: 'account',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
      };
    },
    methods: {
      bySinging(){
        this.$router.push('/bySinging');
      },
      insertEmployee(){
        this.$router.push('/insertEmployee');
      },
      indexList(){
         this.$router.push('/indexList'); 
      }
    }

    //   nextDisabled:function () {
    //     if(this.name!="" && this.phone!="" && !checkMobile(that.phone) && this.email!="" && this.post!="" &&
    //       this.reportTime!="" && this.reportAddress!="" && this.basicSalary!="" && this.workType!=""){
    //       return false
    //     }else{
    //       return true
    //     }
    //   },
    //   nextClass:function () {
    //     if(this.name!="" && this.phone!="" && !checkMobile(that.phone) && this.email!="" && this.post!="" &&
    //       this.reportTime!="" && this.reportAddress!="" && this.basicSalary!="" && this.workType!=""){
    //       return { 58
    //         click_opacity:false
    //       }
    //     }else{
    //       return {
    //         click_opacity:true
    //       }
    //     }
    //   }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.personDataBox img{
    display: table;
    margin: 66px auto 28px auto;
}
.personDataBox strong{
    font-size: 14px;
    color: #F95714;
    margin:0 auto 30px auto;
    display: table;
}
.personDataBox span{
    display: table;
    margin: 0 auto 21px auto;
    text-align: center;
    font-family: MicrosoftYaHei;
    font-size: 20px;
    color: #394A66;
    letter-spacing: 0;
    text-align: center;
    line-height: 30px;
}
.personDataBox .otherPage{
    display: table;
    margin: 0 auto;
}
.sendOfferMain{
    min-height: 720px;
}
.personDataBox a{
    cursor: pointer;
    float: left;
    margin-right: 20px;
    width: 140px;
    height: 44px;
    background: #FAFBFC;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    text-align: center;
    line-height: 44px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #394A66;
    letter-spacing: 0;
}
 .main .right-content .content{
 	border: none;
 }
 .allianceBox .rules{
	display: block;
}
.span_right{
	float: right;
  color: #2064F5;
  cursor: pointer;
}
.error_div_img{
    float: left;
    display: inline-block;
    margin: -1.3px 0px;
}
.twoMethod .multipleMethod{
  border: 0;
}
.method .insertemployee{
  float: right;
  width: 180px;
  height: 40px;
  border: 1px solid #e5e5e5;
  margin: 24px 15px 0 0;
  line-height: 40px;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #394A66;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 0;
}
.insertemployee img{
  padding: 11px 0 11px 26px;
  float: left;
}
.sendOfferMain .personDataBox .personData .inputBox .items .input-group label{
    min-width: 77px;
    display: inline-block;
}
.otherPage div{
    width: 140px;
    float: left;
    display: inline-block;
    height: 44px;
    border-radius: 4px;
    margin-right: 20px;
    background: #FAFBFC;
    line-height: 44px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    color: #394A66;
    border: 1px solid #E5E5E5;
}
</style>
