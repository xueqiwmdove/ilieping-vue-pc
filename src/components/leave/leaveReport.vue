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
            <!--<el-breadcrumb separator="/">-->
              <!--<el-breadcrumb-item v-for="item in realList" :to="item.path">{{item.name}}</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
            <span  v-show="breadNav==''?false:true">
              <router-link :to="breadNav">{{breadNav}}</router-link>
            </span>
            <a :class="breadNav==''?'':'active'">{{userData.userName}}离职报告</a>
          </p>
          <!--start-->
          <div class="leaveReport">
            <p class="report-info">
              为了降低企业招聘人才的风险，就{{userData.userName}}的工作经历做细致的调查，本次调查结果获取途径合法，内容真实有效。本报告不得用于法律诉
              讼依据，仅供招聘决策参考之用。在任何情况下，对由于使用本报告所造成的损失，本公司不承担任何责任。 且未经本公司许可，本报告内
              容不得向任何第三方透露。
            </p>
            <p class="report-title"><em class="userName">{{userData.userName}}</em>的离职报告</p>
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
                <span>年龄</span>{{userData.userAge}}<!-- （{{userData.birthDate}}年）-->
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
                  <div class="single-info hrTests">
                    <img src="../../assets/img/dismission/ic_evaluate.svg" alt="能力评价(HR)">
                    <span class="single-title">能力评价(HR)</span>
                    <span class="upload-status none" v-if="hrEvaluateData==null"></span>
                    <span class="upload-status full" v-if="hrEvaluateData!=null"></span>
                    <div class="hover-info"  v-if="hrEvaluateData!=null">
                      <i class="triangle-up"></i>
                      代表该类目信息上传完整
                    </div>
                    <div class="hover-info" v-if="hrEvaluateData==null">
                      <i class="triangle-up"></i>
                      代表该类目结果尚未反馈
                    </div>
                  </div>
                  <div class="single-info credit ">
                    <img src="../../assets/img/dismission/ic_unpromising.svg" alt="失信行为">
                    <span class="single-title">失信行为</span>
                    <span class="upload-status dangerous" v-if="breakPromiseData.length!=0"></span>
                    <span class="upload-status none" v-if="breakPromiseData.length==0"></span>
                    <div class="hover-info"  v-if="breakPromiseData.length!=0">
                      <i class="triangle-up"></i>
                      表示该类目结果可能存在风险
                    </div>
                    <div class="hover-info" v-if="breakPromiseData.length==0">
                      <i class="triangle-up"></i>
                      代表该类目结果尚未反馈
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="single-info education">
                    <img src="../../assets/img/dismission/ic_educational_experience.svg" alt="教育经历">
                    <span class="single-title">教育经历</span>
                    <span class="upload-status full" v-if="educationShow!=null"></span>
                    <span class="upload-status none" v-if="educationShow==null"></span>
                    <div class="hover-info" v-if="educationShow!=null">
                      <i class="triangle-up"></i>
                      代表该类目信息上传完整
                    </div>
                    <div class="hover-info" v-if="educationShow==null">
                      <i class="triangle-up"></i>
                      代表该类目结果尚未反馈
                    </div>
                  </div>

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

                  <div class="single-info leaderTest">
                    <img src="../../assets/img/dismission/ic_evaluate.svg" alt="能力评价(领导)">
                    <span class="single-title">能力评价(领导)</span>
                    <span class="upload-status none" v-if="superiorData==null"></span>
                    <span class="upload-status full" v-if="superiorData!=null"></span>
                    <div class="hover-info" v-if="superiorData!=null">
                      <i class="triangle-up"></i>
                      代表该类目信息上传完整
                    </div>
                    <div class="hover-info" v-if="superiorData==null">
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
                <!--<p><em>邮箱号码</em>{{userData.userEmail}}</p>-->
                <!--<p><em>所在地区</em>{{userData.userAddress}}</p>-->
              </div>
            </div>
            <!--教育经历-->
            <div class="personal-info education">
              <p class="personal-title">
                <img src="../../assets/img/dismission/ic_education2.svg">
                教育经历</p>
              <div class="personal-content" v-for="item in educationData" v-show="educationShow">
                <p class="content-title">{{item.graduateSchool}}</p>
                <p><em>日期</em>{{item.startTime}}<i v-if="item.startTime!=null"> — </i>{{item.endTime}}</p>
                <p><em>学历</em>{{item.educationInfo}} <i v-if="item.isFullTime==0"></i><i v-if="item.isFullTime==1">(全日制)</i></p>
                <p><em>专业</em>{{item.professionalSkills}}</p>
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
            <!--能力测评-->
            <div class="ablity-tabs">
              <p class="personal-title">
                <img src="../../assets/img/dismission/ic_evaluate2.svg">
                能力测评</p>
              <!--两种测评-->
              <ul class="nav nav-tabs" id="myTab">
                <li @click="changeTabs(1,$event)"  :class="flag==1?'active':''"><a class="hr">HR测评</a></li>
                <li  @click="changeTabs(2,$event)" :class="flag==2?'active':''"><a class="leader" >上级测评</a></li>
              </ul>
              <div class="tab-content" id="tabContent">
                <!--hr-->
                <div class="tab-pane active" id="hr" v-show="hrShow">
                  <p>
                    <span>{{userData.userName}}得分：</span>
                    <a data-toggle="tooltip" data-placement="bottom" title="本次被评价人能力项的平均得分">{{hrSumScore}}</a><!---->
                    <span class="score"></span>
                    <span>平均得分：</span>
                    <a data-toggle="tooltip" data-placement="bottom" title="分析爱猎评所有离职报告计算职场离职人员测评的平均得分">{{hrSumScore}}</a><!--{{hrSumScore}}-->
                  </p>

                  <div class="echarts-conts hrImg"  v-for="(item,index) in hrData" >
                    <!-- 为 ECharts 准备一个具备大小（宽高）的 容器 -->
                    <!-- <el-tabs :tab-position="tabPosition" style="height: 798px; " >
                      <el-tab-pane label="用户管理" v-for="(item,index) in hrData">
                        <div :id ='"chart"+(index + 1)' style="width: 798px; height: 500px;display:block"></div>
                      </el-tab-pane>
                    </el-tabs>-->
                    <div :id ='"chart"+(index + 1) ' class="chart" style="width: 798px; height: 500px;" v-show="index==0"></div>
                      <!--<div id = "chart1" style="width: 798px; height: 500px;display:block"></div>-->

                  </div>
                  <a target="_blank" class="evaluateDetail" @click="gotoAblity()">查看评价详情</a>
                  <ul class="echarts_ctrls hrCtrl" ><!-- v-html="ctrlStr"-->
                    <li v-for="(item,index) in hrData" :index="index" :class="{active:index==classActive}"  @click="tabsSwitch(index)" ></li>
                  </ul>

                  <!--领导-->
                </div>
                <div class="tab-pane" id="leader" v-show="leaderShow">
                  <!--  <p>
                        <span>{{userData.userName}}得分：</span>{{leadSumScore}}
                        <span class="score"></span>
                        <span>平均得分：</span>6
                    </p>-->
                  <div class="echarts_conts leaImg">
                    <div class="noResult text-center">
                      <img src="../../assets/img/dismission/competencyNoResult.png" alt="no_result" style="margin: 50px 300px 0">
                      <p style="margin: 30px 0 0;font-size: 14px;color: #97A2B3;">很抱歉，暂无符合条件的数据！</p>
                    </div>
                  </div>
                  <!--<a  ui-sref="ablity">查看评价详情</a>
                  <ul class="echarts_ctrls leaCtrl">

                  </ul>-->
                </div>
              </div>
            </div>
            <!--失信行为-->
            <div class="break-promise" >
              <p class="personal-title">
                <img src="../../assets/img/dismission/ic_unpromising2.svg">
                失信行为</p>
              <div v-for="(item,index) in breakPromiseData">
                <div class="break-promise-behavior" >
                  <p class="behavior-title">{{index+1}}、{{item.optionTitle}}－{{item.optionValue}}</p>
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
    // import echarts from 'echarts'
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/legend');
    require('echarts/lib/component/markLine');

    export default {
        name: "leaveReport",
        components:{
          pageheader,
          pageaside
        },
        data(){
            return{
             // reportId:this.$route.params.reportId,//获取url 参数
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
              hrShow:true,
              leaderShow:false,
              hrSumScore:'',
              option:'',
              ctrlStr:'',
              chartStr:'',
              educationShow:'',
              // educationHide:'false',
              sex_img:'',
              userAge:'',
              userSex:'',
              reportId:this.$route.params.reportId,
              flag:1,
              classActive:0,
              flag2:this.$route.name=='leaveReport'?'false':'true',
              userName:'',
              realList: [],
              breadNav:'我的上传',
            }
        },
        created(){
          // this.getRoutePath();

        },
        methods:{
          gotoAblity(){
            localStorage.setItem("userName",this.userName)
            let routeData = this.$router.resolve( '/competency/'+this.reportId+'/'+this.flag2);
            window.open(routeData.href, '_blank');
          },
          //雷达图tab切换
          tabsSwitch: function(tabIndex) {
            //下标样式
            this.classActive=tabIndex;

            let tabCardCollection = document.querySelectorAll(".chart"),
              len = tabCardCollection.length;
            for (let i = 0; i < len; i++) {
              tabCardCollection[i].style.display = "none";
            }
            tabCardCollection[tabIndex].style.display = "block";
          },
          //获取报告数据
          getReport(){
            let that = this;
           that.$http({
              method: "get",
              url:api.leaveReport+that.$route.params.reportId,
              headers:headers()
            }).then(function (res) {
              // console.log(res);
              let result = res.data;

              if (result.code == 10000) {
                that.reportData = result.data;
                //失信行为
                that.breakPromiseData = result.data.dimissionDishonestyList;
                // console.log(that.breakPromiseData)
                //hr测评
                that.hrEvaluateData =  result.data.hrEvaluationResponse;
                //上级测评
                that.superiorData = result.data.superiorEvaluationResponse;
                //离职原因
                that.leaveReasonData = result.data.reasonResponse;
                that.reasonContentList = result.data.reasonResponse.reasonContentList;

                // console.log( "**************"+that.reasonContentList);
                if(result.data.reasonResponse.reasonList!=null){
                  that.reasonList = result.data.reasonResponse.reasonList[0];

                }
                //console.log($scope.reasonList);

                //工作经历
                that.workData = result.data.workResponse;
                //教育经历
                that.educationData =  result.data.educationResponse;
                that.startTime = result.data.educationResponse.startTime;

                //教育经历状态显示隐藏
                for(let b=0; b<that.educationData.length;b++){
                  that.educationShow= that.educationData[b].startTime
                }



                //基本信息
                that.userData =  result.data.userInfoResponse;
                that.userAge = result.data.userInfoResponse.userAge;
                that.userSex = result.data.userInfoResponse.userSex;
                that.userName=result.data.userInfoResponse.userName;
                // console.log(that.userName);

                ////$//console.log($scope.educationData);
                that.hrData =  result.data.hrEvaluationResponse;
                that.LederData =  result.data.superiorEvaluationResponse;
                // console.log( that.hrData, that.LederData);
                //Hr评测图
                // console.log(that.hrData);
               // that.hrSumScore=that.createStarImage(that.hrData, "chart", "hrImg", "hrCtrl");


                //上级评测图
                 //$scope.leadSumScore = createStarImage($scope.LederData, "echart", "leaImg", "leaCtrl");


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

                //echart start
                that.chartStr = ""; that.ctrlStr = "";
                 for (let i = 0; i < that.hrData.length; i++) {
                   that.chartStr += "<div id = 'chart" + (i + 1) + "' class='chart' style='width: 798px; height: 500px;'></div>";
                   if (i == 0) {
                     that.ctrlStr += "<li class='active'></li>";
                   } else {
                     that.ctrlStr += "<li></li>";
                   }
                 }
                // document.getElementsByClassName("hrCtrl").innerHTML=that.ctrlStr
                for (let i = 0; i < that.hrData.length; i++) {
                  let scoreArray = [];
                  let scoreFlag = 0;
                  let count = 0;
                  //TODO 延迟加载，获取循环的元素，后期可以优化
                 setTimeout(function () {
                    let chart=document.getElementById('chart'+(i+1));
                    // console.log(chart)
                    let chart1 =that.$echarts.init(chart);
                   for (let j = 0; j < that.hrData[i].length; j++) {
                     let score = that.hrData[i][j].optionScore;
                     // console.log("分数"+score);
                     scoreFlag = scoreFlag+score;
                     count++;
                     scoreArray.push(score);
                     that.hrSumScore=(scoreFlag/count).toFixed(1);
                   }
                   that.option = {
                     tooltip: {},
                     legend: {
                       bottom: 0,
                       data: ['实际得分', '平均得分'],
                       textStyle: {
                         color: '#748093',
                         fontSize: 14
                       }
                     },

                     radar: {
                       // shape: 'circle',
                       name: {
                         textStyle: {
                           color: '#748093',
                           borderRadius: 3,
                           padding: [3, 5]
                         }
                       },
                       indicator:  that.hrData[i],
                     },
                     series: [{
                       name: '实际得分 vs 平均得分',
                       type: 'radar',
                       data: [{
                         value: scoreArray,
                         name: '实际得分',
                         label: {
                           normal: {
                             show: true,
                             formatter: function (params) {
                               return params.value;
                             }
                           }
                         }
                       },
                         {
                           value: [7, 10, 7, 5, 5, 7, 10, 7],
                           name: '平均得分',
                           label: {
                             normal: {
                               show: true,
                               formatter: function (params) {
                                 return params.value;
                               }
                             }
                           }
                         }
                       ]
                     }]
                   };
                   chart1.setOption( that.option);
                   chart1.resize();

                  },1000);
                }
                //echart end
              }
            });
          },

          //切换hr 和leader 内容和样式
          changeTabs(flag,e){
            let that=this;
            if(flag==1){
              that.flag=flag;//切换样式
              that.hrShow=true;
              that.leaderShow=false;
            }else{
              that.flag=flag;
              that.hrShow=false;
              that.leaderShow=true;
            }
          },
          //实例
          echarts(){
            let that=this;
            let chart=document.getElementById("chart1");
            let chart1 =this.$echarts.init(chart);//
            that.option = {
              title: {
                text: '基础雷达图'
              },
              tooltip: {},
              legend: {
                data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
              },
              radar: {
                // shape: 'circle',
                name: {
                  textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                  }
                },
                indicator: [
                  { name: '销售（sales）', max: 6500},
                  { name: '管理（Administration）', max: 16000},
                  { name: '信息技术（Information Techology）', max: 30000},
                  { name: '客服（Customer Support）', max: 38000},
                  { name: '研发（Development）', max: 52000},
                  { name: '市场（Marketing）', max: 25000}
                ]
              },
              series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                  {
                    value : [4300, 10000, 28000, 35000, 50000, 19000],
                    name : '预算分配（Allocated Budget）'
                  },
                  {
                    value : [5000, 14000, 28000, 31000, 42000, 21000],
                    name : '实际开销（Actual Spending）'
                  }
                ]
              }]
            };
            chart1.setOption( that.option);
            chart1.resize();
          },

          // getRoutePath() {
          //   let that=this;
          //   this.realList = this.$route.meta.routeList;
          //   console.log(this.realList,typeof (this.realList))
          //   let  arr = [];
          //   for (let i in this.realList) {
          //     arr.push(this.realList[i])
          //   }
          //   console.log(arr);
          //   arr.forEach(item=>{
          //     if(item.name=='myUpload'){
          //       that.breadNav="我的上传"
          //
          //       console.log(that.breadNav)
          //     }else if(item.name=='searchBefore2'){
          //       that.breadNav="失信曝光查询"
          //       alert("no")
          //     }
          //   })
          //
          // }

        /* createStarImage:function(data, flag, img, ctrl) {
            let that=this;
             that.chartStr = ""; that.ctrlStr = "";
              for (let i = 0; i < data.length; i++) {
                that.chartStr += "<div id = '" + flag + (i + 1) + "' class='chart' style='width: 798px; height: 500px;'></div>";
                if (i == 0) {
                  that.ctrlStr += "<li class='active'></li>";
                } else {
                  that.ctrlStr += "<li></li>";
                }
              }

             $("." + img).html(chartStr);
             $("." + ctrl).html(ctrlStr);


            let scoreFlag = 0;
            let count = 0;
            for (let i = 0; i < data.length; i++) {
              let scoreArray = [];
              let chart=document.getElementById(flag+(i+1));
              let chart1 =that.$echarts.init(chart);//
              for (let j = 0; j < data[i].length; j++) {
                let score = data[i][j].optionScore;
                console.log("分数"+score);
                scoreFlag = scoreFlag+score;
                count++;
                scoreArray.push(score)
              }

              that.option = {
                tooltip: {},
                legend: {
                  bottom: 0,
                  data: ['实际得分', '平均得分'],
                  textStyle: {
                    color: '#748093',
                    fontSize: 14
                  }
                },

                radar: {
                  // shape: 'circle',
                  name: {
                    textStyle: {
                      color: '#748093',
                      borderRadius: 3,
                      padding: [3, 5]
                    }
                  },
                  // indicator: data[i],
                  indicator: [
                    { name: '销售（sales）', max: 6500},
                    { name: '管理（Administration）', max: 16000},
                    { name: '信息技术（Information Techology）', max: 30000},
                    { name: '客服（Customer Support）', max: 38000},
                    { name: '研发（Development）', max: 52000},
                    { name: '市场（Marketing）', max: 25000}
                  ]
                },
                series: [{
                  name: '实际得分 vs 平均得分',
                  type: 'radar',
                  data: [{
                    // value: scoreArray,
                    value :[7, 10, 7, 5, 5, 7, 10, 7],
                    name: '实际得分',
                    label: {
                      normal: {
                        show: true,
                        formatter: function (params) {
                          return params.value;
                        }
                      }
                    }
                  },
                    {
                      value: [7, 10, 7, 5, 5, 7, 10, 7],
                      name: '平均得分',
                      label: {
                        normal: {
                          show: true,
                          formatter: function (params) {
                            return params.value;
                          }
                        }
                      }
                    }
                  ]
                }]
              };
              chart1.setOption( that.option);
              chart1.resize();
            }

            return (scoreFlag/count).toFixed(1);
          }*/
        },
      beforeRouteEnter(to,from, next) {
        next((vm) => {
          //vm.realList = to.meta.routeList;
          vm.oldUrl=from.path;
        });
      },
        mounted(){
          let that=this;
          that.getReport();
          // that.echarts();
          this.$nextTick(()=>{
            // 验证是否获取到了上页的url
            // console.log(this.oldUrl);
            localStorage.setItem("oldUrl",this.oldUrl);
            let oldUrl=localStorage.getItem("oldUrl");
            if(oldUrl=="/myupload"){
              that.breadNav="我的上传";
              console.log(that.breadNav)
            }else if(oldUrl=="/searchResult/searchbefore"){
              that.breadNav="失信曝光查询"
            }else{
              that.breadNav="";
            }
          });

        }

    }
</script>

<style scoped>

  #myTab li,#myTab li a{
    display: inline-block;
    height: 42px;
    text-align: center;
  }
  #myTab .active a{
    border: none!important;
    line-height: 1.42857143;
    background: #fff;
  }
  #myTab li a{
    padding: 10px 15px;

  }
  .nav-tabs {
    border-bottom: 1px solid #ddd;
  }
  .headline a{
    width: auto;
  }
  .evaluateDetail{
    cursor: pointer;
  }


</style>
