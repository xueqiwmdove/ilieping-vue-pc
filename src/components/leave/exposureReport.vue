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
          <!---->
          <p class="headline">
            <!--<a  class="leaveSearchDismiss-title">失信曝光查询</a>-->
            <span>{{userData.userName}}失信报告</span>
          </p>

          <div class="leaveReport">
            <p class="report-info">
              为了降低企业招聘人才的风险，就{{userData.userName}}的工作经历做细致的调查，本次调查结果获取途径合法，内容真实有效。本报告不得用于法律诉
              讼依据，仅供招聘决策参考之用。在任何情况下，对由于使用本报告所造成的损失，本公司不承担任何责任。 且未经本公司许可，本报告内
              容不得向任何第三方透露。
            </p>
            <p class="report-title">{{userData.userName}}的失信报告</p>
            <div class="report-basic">
              <!--<img src="../img/dismission/{{userData.userSex==1?'ic_man':'ic_female'}}.svg" class="report-head-img">-->
              <!--<img src="../img/dismission/{{userData.userSex==1?'ic_man':'ic_female'}}.svg" class="report-head-img">-->
              <img src="../../assets/img/dismission/women_19_32.svg" alt="icon" class="female" v-if="sex_img==0"><!-- 女19-32 -->
              <img src="../../assets/img/dismission/men_19_32.svg" alt="icon" class="female" v-if="sex_img==1"><!-- 男19-32 -->
              <img src="../../assets/img/dismission/men_0_18.svg" alt="icon" class="female" v-if="sex_img==2"><!-- 男18岁以下 -->
              <img src="../../assets/img/dismission/men_33_45.svg" alt="icon" class="female" v-if="sex_img==3"><!-- 男33-45 -->
              <img src="../../assets/img/dismission/men_46_60.svg" alt="icon" class="female" v-if="sex_img==4"><!-- 男46-60 -->
              <img src="../../assets/img/dismission/men_60+.svg" alt="icon" class="female" v-if="sex_img==5"><!-- 男60+ -->
              <img src="../../assets/img/dismission/women_0_18.svg" alt="icon" class="female" v-if="sex_img==6"><!-- 女18岁以下 -->
              <img src="../../assets/img/dismission/women_33_45.svg" alt="icon" class="female" v-if="sex_img==7"><!-- 女33-45 -->
              <img src="../../assets/img/dismission/women_46_60.svg" alt="icon" class="female" v-if="sex_img==8"><!-- 女46-60 -->
              <img src="../../assets/img/dismission/women_60＋.svg" alt="icon" class="female" v-if="sex_img==9"><!-- 女60+ -->
             <!-- <img src="../../assets/img/dismission/ic_man.svg" alt="" class="report-head-img" v-if="userData.userSex==1">
              <img src="../../assets/img/dismission/ic_female.svg" alt="" class="report-head-img" v-if="userData.userSex==0">-->
              <p class="report-head-name">{{userData.userName}}
                <img src="../../assets/img/dismission/ic_women2.svg" v-if="userData.userSex == '0'">
                <img src="../../assets/img/dismission/ic_man2.svg" v-if="userData.userSex== '1'">
              </p>
              <p class="report-head-basic">
                <span>年龄</span>{{userData.userAge}} <!--（{{userData.birthDate}}年）-->
                <span class="mobile">手机</span>{{userData.phoneUser}}
              </p>
            </div>
            <!--基本信息-->
            <div class="personal-info">

              <p class="personal-title">
                <img src="../../assets/img/dismission/ic_jibenxinxi2.svg">
                基本信息</p>
              <div class="personal-content">
                <p class="content-title">{{userData.userName}}</p>
                <p><em>性　　别</em>{{userData.userSex==1?'男':'女'}}</p>
                <p><em>出生日期</em>{{userData.birthDate}}({{userData.userAge}}岁)</p>
                <p><em>身份证号</em>{{userData.cardNumber}}</p>
                <p><em>手机号码</em>{{userData.phoneUser}}</p>
                <!--<p><em>邮箱号码</em>{{userData.userEmail}}</p>-->
                <!--<p><em>所在地区</em>{{userData.userAddress}}</p>-->
              </div>
            </div>

            <div class="work-experience">
              <p class="personal-title">
                <img src="../../assets/img/dismission/ic_educational_experience2.svg">
                工作经历</p>
              <div class="personal-content" v-for="item in workData">
                <p class="content-title">{{item.corporateName}}</p>
                <p><em>任职日期</em>{{item.startJobTime}}  —  {{item.endJobTime}}</p>
                <p><em>在职状态</em><i v-if="item.workType==1">全职</i><i v-if="item.workType==0">兼职</i><i v-if="item.workType==2">试用期</i></p>
                <p><em>任职部门</em>{{item.deptName}}</p>
                <p><em>任职岗位</em>{{item.postName}}</p>
                <div class="work-describe">
                  <em>工作描述</em>
                  <div class="describe-data">
                    <p>
                      {{item.workDescribe}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!--风险选项-->
            <div class="danger-option">
              <p class="personal-title">
                <img src="../../assets/img/dismission/ic_dangerous.svg" alt="danger">
                风险选项
              </p>
              <div class="personal-content">
                <p class="content-title">工作经历核实</p>
                <p><em>是否与公司有劳务纠纷</em><i v-if="dangerData.laborDispute==1">是</i><i v-if="dangerData.laborDispute==0">否</i></p>
                <p><em>是否与公司签署培训协议</em><i v-if="dangerData.trainingAgreement==1">是</i><i v-if="dangerData.trainingAgreement==0">否</i></p>
                <p><em>是否与公司签署竞业协议</em><i v-if="dangerData.competitionAgreement==1">是</i><i v-if="dangerData.competitionAgreement==0">否</i></p>
              </div>
            </div>

            <!--失信行为-->
            <div class="break-promise" >
              <p class="personal-title">
                <img src="../../assets/img/dismission/ic_unpromising2.svg">
                失信行为</p>
              <div v-for="(item,index) in breakPromiseData">
                <div class="break-promise-behavior" >
                  <p class="behavior-title">{{index + 1 }}、{{item.optionTitle}}－{{item.optionValue}}</p>
                  <div class="behavior-describe">
                    <em>事件描述</em>
                    <p>
                      {{item.dishonestyDescribe}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!---->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import http from '@/http/http';
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';


    export default {
        name: "exposureReport",
        components:{
          pageheader,
          pageaside
        },
        data(){
          return{
            // reportId:1,//先定死
            reportData:'',
            userData:'',
            workData:'',
            dangerData:'',
            breakPromiseData:'',
            sex_img:'',
            userAge:'',
            userSex:''
          }
        },
      methods:{
          getExposure(){
            let that=this;
            that.$http({
                    method: "get",
                    url:api.exposureReport + that.$route.params.reportId,
                    headers:headers()
                   }).then(function (res) {
                  console.log(res);
                  let result = res.data;

                  if (result.code == 10000 && result.data != "") {
                  that.reportData = result.data;
                  //基本信息
                  that.userData =  result.data.userInfoResponse;
                  that.userAge = result.data.userInfoResponse.userAge;
                  that.userSex = result.data.userInfoResponse.userSex;
                  //工作经历
                  that.workData =  result.data.workResponse;
                  //风险选项
                  if( result.data.workVerifyTopicResponse!=null){
                    that.dangerData= result.data.workVerifyTopicResponse;
                  }
                  //失信行为
                  that.breakPromiseData =  result.data.dimissionDishonestyList;
                  //console.log($scope.userData, $scope.workData,$scope.dangerData, $scope.breakPromiseData)



                    // 判断头像与年龄不符
                    if(that.userSex==0){ //女
                      if(that.userAge <= 18){//女年龄段
                        that.sex_img=6;
                      }else if(that.userAge >= 19 && that.userAge <= 32){
                        that.sex_img=0;
                      }else if(that.userAge >= 33 && that.userAge <= 45){
                        that.sex_img=7;
                      }else if(that.userAge >= 46 && that.userAge <= 60){
                        that.sex_img=8;
                      }else if(that.userAge >= 60){
                        that.sex_img=9;
                      }else{
                        that.sex_img=0;
                      }

                    }else{ //男
                      if(that.userAge <= 18){//男年龄段
                        that.sex_img=2;
                      }else if(that.userAge >= 19 && that.userAge <= 32){
                        that.sex_img=1;
                      }else if(that.userAge >= 33 && that.userAge <= 45){
                        that.sex_img=3;
                      }else if(that.userAge >= 46 && that.userAge <= 60){
                        that.sex_img=4;
                      }else if(that.userAge >= 60){
                        that.sex_img=5;
                      }else{
                        that.sex_img=1;
                      }
                    }
                    console.log( that.userAge, that.userSex, that.sex_img)

                }
            })
          },
          //判断头像与年龄不符
          sex_age(){//判断性别和年龄段
            let that=this;
            if(that.userSex==0){ //女
              if(that.userAge <= 18){//女年龄段
                that.sex_img=6;
              }else if(that.userAge >= 19 && that.userAge <= 32){
                that.sex_img=0;
              }else if(that.userAge >= 33 && that.userAge <= 45){
                that.sex_img=7;
              }else if(that.userAge >= 46 && that.userAge <= 60){
                that.sex_img=8;
              }else if(that.userAge >= 60){
                that.sex_img=9;
              }else{
                that.sex_img=0;
              }

            }else{ //男
              if(that.userAge <= 18){//男年龄段
                that.sex_img=2;
              }else if(that.userAge >= 19 && that.userAge <= 32){
                that.sex_img=1;
              }else if(that.userAge >= 33 && that.userAge <= 45){
                that.sex_img=3;
              }else if(that.userAge >= 46 && that.userAge <= 60){
                that.sex_img=4;
              }else if(that.userAge >= 60){
                that.sex_img=5;
              }else{
                that.sex_img=1;
              }
            }
          },

      },
      computed:{

      },
      mounted(){
          let that=this;
          that.getExposure()
      }
    }
</script>

<style scoped>
.main .right-content .content .headline .active{
	width: auto;
}


</style>
