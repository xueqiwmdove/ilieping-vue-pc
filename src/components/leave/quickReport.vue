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
          <p class="headline">
            <span>{{userData.userName}}的离职报告</span>
          </p>
          <!--start-->
          <div class="leaveReport">
            <p class="report-info">
              为了降低企业招聘人才的风险，就{{userData.userName}}的工作经历做细致的调查，本次调查结果获取途径合法，内容真实有效。本报告不得用于法律诉
              讼依据，仅供招聘决策参考之用。在任何情况下，对由于使用本报告所造成的损失，本公司不承担任何责任。 且未经本公司许可，本报告内
              容不得向任何第三方透露。
            </p>
            <p class="report-title">{{userData.userName}}的离职报告</p>
            <div class="report-basic">
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

              <!--<img src="../../assets/img/dismission/ic_man.svg" alt="" class="report-head-img" v-if="userData.userSex==1">
              <img src="../../assets/img/dismission/ic_female.svg" alt="" class="report-head-img" v-if="userData.userSex==0">-->
              <p class="report-head-name">{{userData.userName}}
                <img src="../../assets/img/dismission/ic_women2.svg" v-if="userData.userSex == '0'">
                <img src="../../assets/img/dismission/ic_man2.svg" v-if="userData.userSex== '1'">
              </p>
              <p class="report-head-basic">
                <span>年龄</span>{{userData.userAge}} <!--（{{userData.birthDate}}年）-->
                <span class="mobile">手机</span>{{userData.phoneUser}}
              </p>
              <!--信息完善-->
              <div class="basic-info">
                <div class="left">
                  <div class="single-info">
                    <img src="../../assets/img/dismission/ic_jibenxinxi.svg" alt="基本信息">
                    <span class="single-title">基本信息</span>
                    <!--上传完整1（full），没有反馈2(none)，存在风险3(dangerous)-->
                    <span class="upload-status full" v-if="userData!=null"></span>
                    <span class="upload-status none" v-if="userData==null"></span>
                    <div class="hover-info" v-if="workData==null">
                      <i class="triangle-up"></i>
                      代表该类目结果尚未反馈
                    </div>
                    <div class="hover-info" v-if="workData!=null">
                      <i class="triangle-up"></i>
                      代表该类目信息上传完整
                    </div>
                  </div>
                  <div class="single-info">
                    <img src="../../assets/img/dismission/ic_work.svg" alt="工作经历">
                    <span class="single-title">工作经历</span>
                    <span class="upload-status none" v-if="workData==null"></span>
                    <span class="upload-status full" v-if="workData!=null"></span>
                    <div class="hover-info"  v-if="workData!=null">
                      <i class="triangle-up"></i>
                      代表该类目信息上传完整
                    </div>
                    <div class="hover-info" v-if="workData==null">
                      <i class="triangle-up"></i>
                      代表该类目结果尚未反馈
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="single-info">
                    <img src="../../assets/img/dismission/ic_dimission.svg" alt="离职原因">
                    <span class="single-title">离职原因</span>
                    <span class="upload-status full" v-if="leaveReasonData!=null"></span>
                    <span class="upload-status none" v-if="leaveReasonData==null"></span>
                    <div class="hover-info" v-if="leaveReasonData!=null">
                      <i class="triangle-up"></i>
                      代表该类目信息上传完整
                    </div>
                    <div class="hover-info" v-if="leaveReasonData==null">
                      <i class="triangle-up"></i>
                      代表该类目结果尚未反馈
                    </div>
                  </div>

                </div>
              </div>
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
              </div>
            </div>
            <!--工作经验-->
            <div class="work-experience">
              <p class="personal-title">
                <img src="../../assets/img/dismission/ic_educational_experience2.svg">
                工作经历</p>
              <div class="personal-content" v-for="item in workData">
                <p class="content-title">{{item.corporateName}}</p>
                <p><em>任职日期</em>{{item.startJobTime}}  —  {{item.endJobTime}}</p>
                <p><em>在职状态</em><i v-if="item.workType==1">全职</i><i v-if="item.workType==0">兼职</i><i v-if="item.workType==2">实习</i></p>
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
            <!--离职原因-->
            <div class="leave-reason">
              <p class="personal-title">
                <img src="../../assets/img/dismission/ic_dimission2.svg">
                离职原因</p>
              <div class="personal-content">
                <p class="content-title" v-for="x in reasonContentList">
                  <i v-if="leaveReasonData.dimissionType==2" >单位辞退</i>
                  <i v-if="leaveReasonData.dimissionType==1" >主动离职</i>
                  －{{reasonList}}<i>（{{x}}）</i></p>
                <div class="work-describe">
                  <em>具体描述</em>
                  <div class="describe-data">
                    <p>
                      {{leaveReasonData.dimissionDescribe}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end-->

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
        name: "leaveReport",
        components:{
          pageheader,
          pageaside
        },
        data(){
            return{
              reportData:'',
              breakPromiseData:'',
              hrEvaluateData:'',
              superiorData:'',
              leaveReasonData:'',
              reasonContentList:'',
              reasonList:'',
              workData:'',
              educationData:'',
              userData:'',
              hrData:'',
              LederData:'',
              sex_img:'',
              userAge:'',
              userSex:''
            }
        },
      created(){
         this.sex_age();
       },
      watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'sex_age'
      },
        methods:{
          getReport(){
            let that = this;
           that.$http({
              method: "get",
              url:api.quickReport+that.$route.params.reportId,//获取url 参数
              headers:headers()
            }).then(function (res) {
              console.log(res);
              let result = res.data;

              if (result.code == 10000) {
                that.reportData = result.data;
                //离职原因
                that.leaveReasonData = result.data.reasonResponse;
                that.reasonContentList = result.data.reasonResponse.reasonContentList;

                console.log( "**************"+that.reasonContentList);
                if(result.data.reasonResponse.reasonList!=null){
                  that.reasonList = result.data.reasonResponse.reasonList[0];

                }
                //console.log($scope.reasonList);

                //工作经历
                that.workData = result.data.workResponse;
                //基本信息
                that.userData =  result.data.userInfoResponse;
                that.userAge = result.data.userInfoResponse.userAge;
                that.userSex = result.data.userInfoResponse.userSex;
                //
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
            });
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
        mounted(){
          let that=this;
          that.getReport();
          // that.sex_age();

          // that.$nextTick(function () {
          //   console.log(that.userAge);
          //   that.sex_age();
          // })
        }
    }
</script>

<style scoped>
  .headline a{
    width: auto;
  }

</style>
