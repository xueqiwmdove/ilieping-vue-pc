<template>
  <div>
    <div class="mainCon el-col-24">
  		<!--顶部导航-->
  	<pageheader class="pageheader"></pageheader>
      <!--侧边栏-->
      <!--<div class="aside">-->
        <pageaside></pageaside>
      <!--</div>-->
      <!--右侧内容栏-->
      <div class="right-content pull-right">
        <div class="content">
          <!--主体内容-->

          <p class="headline">
            <span>能力评价详情</span>
          </p>

          <!--胜任力模型评测（能力评价）-->
          <div class="competency-report">
            <p class="title"><i v-show="flag=='false'">{{userName}}的</i>胜任能力模型评价报告</p>
            <p class="notice-info">
              <img src="../../assets/img/reg/info.svg">
              胜任力模型(competence model)就是针对特定职位表现优异要求组合起来的胜任力结构，
              是一系列人力资源管理与开发实践(如工作分析、招聘、选拔、培训与开发、绩效管理等)的重要基础。
            </p>
            <div class="required">
              <p class="required-title">必填能力项 <i>*</i></p>
              <div class="subject" v-for="(item,index) in needData" :index="index"><!-- ng-init="$outerIndex = $index"-->
                <div class="subject-title" >{{index+1}}、{{item.questionTitle}}({{item.questionTitleDesc}})</div>
                <div class="subject-answer" v-for="x in item.answer">
                  <label class="subject-radio" @click="getRadioId">
                    <input type="radio" class="radio requiredRadio" :id="x.id" :value="x.id"  :name="'required'+index"  :disabled="isAbled"> <!-- @change="getRadioId"--><!--v-model="radioChecked" name="required-{{$outerIndex}}" id="{{x.id}}"-->
                    <em></em>
                    <span class="subject-content">{{x.optionValue}}</span>
                    <span class="line"></span>
                    <span class="subject-score">{{x.score}}分</span>
                  </label>

                </div>
              </div>
            </div>
            <div class="optional">
              <el-collapse >
                <el-collapse-item >
                  <template slot="title">
                    <p class="optional-title">
                      选填能力项
                      <a class="pull-right" style=" color:#f95724;" data-toggle="collapse" data-target="#content1">展开</a>
                    </p>
                  </template>
                  <div  id="content1" class="collapse">
                    <div class="subject" v-for="(item,index) in optionalData"><!-- ng-init="$outerIndex=$index-->
                      <p class="subject-title">{{index+1}}、{{item.questionTitle}}({{item.questionTitleDesc}})</p>
                      <div class="subject-answer" v-for ="x in item.answer">
                        <label class="subject-radio">
                          <input type="radio" class="radio" :id="x.id" :value="x.id" :name="'optional'+index"  :disabled="isAbled"  >
                          <em></em>
                          <span class="subject-content">{{x.optionValue}}</span>
                          <span class="line"></span>
                          <span class="subject-score">{{x.score}}分</span>
                        </label>

                      </div>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>

            </div>
            <div class="competency-submit  text-center" >
              <input type="button" class="submit" value="保存" @click="submitTest" :class="btn_abled" :disabled="btn_disabled" v-show="btnIsShow">
            </div>
          </div>

          <!--主体内容-->
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
      name: "competency",
      components:{
        pageheader,
        pageaside
      },
      data(){
        return{
          reportId:'',
          needData:'',
          optionalData:'',
          dismissionArr:[],//选中题id
          btn_abled:'',//样式
         btn_disabled:true,//禁用
          Arr:[],
          flag:this.$route.params.flag,
          isAbled:true,
          userName: localStorage.getItem("userName"),//从离职报告获取的用户名
          btnIsShow:true,
        }
      },
      watch:{

      },
      methods:{
      //  获取试题
        getTest(){
          let that = this;
          that.$http({
            method: "get",
            url: api.tests+ that.$route.params.reportId,
            headers:headers(),
          }).then(function (res) {
            console.log(res);
            let result = res.data;
            if (result.code == 10000 && result.data != "") {
              that.needData = result.data.mandatoryQuestionList;
              that.optionalData = result.data.nonCompulsoryList;

              //TODO 填完展示数据

              let timer=setInterval(function () {
                let newList=result.data.selectResult;
                // TODO 获取选中值大于9可点击
                if(newList.length>=9){
                  that.btn_abled='abled';
                  that.btn_disabled=false;
                  // that.btnIsShow=false;
                }else{
                  that.btn_abled='';
                  that.btn_disabled=true;
                }
                for(let k=0;k<newList.length;k++){
                  if(newList!=null ||newList!="" ||newList!=undefined ){
                    document.getElementById(newList[k]).setAttribute("checked",true)
                  }
                }
                clearInterval(timer);
              },10);

              if(that.flag=='false'){
                that.isAbled=true;//radio 禁用
                that.btnIsShow=false;
              }else{
                that.isAbled=false;
                that.btnIsShow=true;
              }

              // $(".competency-submit .submit").addClass("abled");

            }else{
              that.$message.error(res.data.msg);
            }
          })
        },
        //选中radio事件
        getRadioId(){
          //TODO 获取checked input 的个数做比较
          let that=this;

          let requiredRadios=document.getElementsByClassName("requiredRadio");
          // console.log(requiredRadios);
          for(let i=0;i<requiredRadios.length;i++){
            if(requiredRadios[i].checked==true){
              that.Arr.push(requiredRadios[i].id)
            }
          }
        /*  for(let i=0;i<requiredRadios.length;i++){
            for( let j=0;j<i;j++){
              if(requiredRadios[i].name==requiredRadios[j].name){
                console.log(requiredRadios[i])
                if(requiredRadios[j].checked==true){
                  that.Arr.push(requiredRadios[j].id);
                }
              }
            }
          }*/


          //TODO 数组去重
          that.Arr=Array.from(new Set(that.Arr));
          // console.log(that.Arr)
          if( that.Arr.length>=9){
            that.btn_abled='abled';
            that.btn_disabled=false;
          }else{
            that.btn_abled='';
            that.btn_disabled=true;//禁用
          }



        },
        //提交选项
        submitTest(){
          let that=this;
          let inputs=document.getElementsByClassName("radio");

          for(let i=0;i<inputs.length;i++){
            if(inputs[i].checked==true){
              that.dismissionArr.push(inputs[i].id)
            }
          }
        /*  for(let i=0;i<inputs.length;i++){
              for( let j=0;j<i;j++){
                if(inputs[i].name==inputs[j].name){
                  if(inputs[j].checked==true){
                    console.log(inputs[j].id)
                    that.dismissionArr.push(inputs[j].id);
                }
              }
            }
          }*/
          //数组去重
          that.dismissionArr=Array.from(new Set(that.dismissionArr));

           // console.log(that.dismissionArr);

          if(that.dismissionArr.length>=9){
            that.$http({
              method: "post",
              url:api.submitTest,
              data: {
                reportId: that.$route.params.reportId,
                evaluationType: 1,//hr,
                questionsPoolAnswer:that. dismissionArr.join(",")
              },
              headers:headers()
            }).then(function (res) {
              let result = res.data;
              if(result.code==10000){
                that.$message({
                  type:'success',
                  message: '保存成功',//res.data.msg
                });
                window.close();
              }else{
                that.$message.error(res.data.msg);
              }
            })
          }

        },

      },
      computed: {


      },
      mounted(){
        let that = this;
        that.getTest();
        that.$route.params.reportId
        localStorage.getItem("userName")
        // console.log(localStorage.setItem("userName"))

      }
    }
</script>

<style scoped>
  .text-center{
    text-align: center;
  }
  .el-collapse, .el-collapse .el-collapse-item .el-collapse-item__header{
    border: none!important;
  }
  .competency-report .required .subject .subject-answer .subject-radio, .competency-report .optional .subject .subject-answer .subject-radio{
    display: flex;
    display: -ms-flexbox;
    -ms-flex-align: center;
    align-items: center;
    width: 100%;
  }
  .subject-content{
    text-indent:22px;
  }

</style>
