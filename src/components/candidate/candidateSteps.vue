<template>
  <!--候选人信息弹窗-->
  <el-dialog title="候选人信息" :visible.sync="addVisible"  custom-class="candidateSteps">
    <img src="../../assets/img/candidate/tanchuang_ic_save.png" class="save">
    <div class="addMain">
      <div class="personInfo">
        <p class="primary ">
          <span class="name">张三</span>
          <span class="post">测试工程师.拉钩（主动搜索）</span>
          <span class="tag">内推</span>
        </p>
        <p class="minor">
          <span class="phone">15921720256</span>
          <span class="email">78995677900@163.com</span>
          <span class="sex">男 28</span>
          <span class="workExp">五年工作经验</span>
          <span class="address">上海</span>
        </p>
        <div class="fivesteps">
          <div class="onStep">
            <span class="up">1 <em></em></span>
            <span class="down">初筛</span>
          </div>
          <div>
            <span class="up">2<em></em></span>
            <span class="down">用人部门筛选</span>
          </div>
          <div>
            <span class="up">3<em></em></span>
            <span class="down">面试</span>
          </div>
          <div>
            <span class="up">4<em></em></span>
            <span class="down">offer/录用</span>
          </div>
          <div>
            <span class="up">5</span>
            <span class="down">待入职</span>
          </div>
        </div>
        <ul class="change_tab_title">
          <li :class="step==1?'active':''" @click="changeTab(1)">基本信息</li>
          <li :class="step==2?'active':''" @click="changeTab(2)">面试</li>
          <li :class="step==3?'active':''" @click="changeTab(3)">offer/录用</li>
          <li :class="step==4?'active':''" @click="changeTab(4)">备注</li>
          <li :class="step==5?'active':''" @click="changeTab(5)">附件管理</li>
          <li :class="step==6?'active':''" @click="changeTab(6)">操作记录</li>
        </ul>
      </div>

      <div class="candidate_content">
        <basic_first  v-show="step==1"></basic_first>
        <interview_second v-show="step==2"></interview_second>
        <offer_third v-show="step==3"></offer_third>
        <remark_forth v-show="step==4"></remark_forth>
        <accessory_fifth v-show="step==5"></accessory_fifth>
        <opsRecord_seventh v-show="step==6"></opsRecord_seventh>

      </div>
      <!--<candidate_content></candidate_content>-->
      <candidate_right @listento-flag="getFlag"></candidate_right>
      <!--右边-->
    </div>
  </el-dialog>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import candidate_content from '@/components/candidate/common/candidate_content';
  import basic_first from '@/components/candidate/common/basic_first';
  import interview_second from '@/components/candidate/common/interview_second';
  import offer_third from '@/components/candidate/common/offer_third';
  import remark_forth from '@/components/candidate/common/remark_forth';
  import accessory_fifth from '@/components/candidate/common/accessory_fifth'
  import opsRecord_seventh from '@/components/candidate/common/opsRecord_seventh'
  import candidate_right from '@/components/candidate/common/candidate_right';
  // import weekOutAlert from '@/components/candidate/common/weekOutAlert'
  // import remarkAlert from '@/commponents/candidate/common/remarkAlert'
  import {checkMobile,compareDate,isNumber,isEmail} from '@/assets/js/common/verify.js'
  import {formatDate} from '@/assets/js/common/date_year.js';
    export default {
        name: "addCandidate",
        components:{
          candidate_content,
          basic_first,
          interview_second,
          offer_third,
          remark_forth,
          accessory_fifth,
          opsRecord_seventh,
          candidate_right,

          // weekOutAlert,
          // remarkAlert
        },
      data(){
          return{
            addVisible:true,
            step:1,
          }
      },
      methods:{
        changeTab(flag){
          this.step=flag;
        },
        getFlag(flag){
          this.step=flag;//子组件穿过的flag值，赋值给step；
          // console.log('接收的数据--------->'+flag)
        }

      }
    }
</script>

<style scoped>
</style>
