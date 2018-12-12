<template>
  <!--添加候选人弹窗-->
  <el-dialog title="添加候选人" :visible.sync="addVisible"  :custom-class="flag==2?['addCandidateAlert_add','addCandidateAlert']:'addCandidateAlert'">
    <img src="../../assets/img/candidate/tanchuang_ic_save.png" class="save">
    <div class="addMain">
      <!--标准简历才有-->
      <standardBasic v-if="flag==2"></standardBasic>

      <addCandidate_content @my-event="getMyEvent"></addCandidate_content>
      <!--父组件中通过监测my-event事件执行一个方法，然后取到子组件中传递过来的值-->
      <addCandidate_right></addCandidate_right>
    </div>
  </el-dialog>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import addCandidate_content from '@/components/common/candidate_public/addCandidate_content';
  import addCandidate_right from '@/components/common/candidate_public/addCandidate_right';
  import {checkMobile,compareDate,isNumber,isEmail} from '@/assets/js/common/verify.js'
  import {formatDate} from '@/assets/js/common/date_year.js';
  import standardBasic from '@/components/candidate/common/standardBasic';

    export default {
        name: "addCandidate",
        components:{
          addCandidate_content,
          addCandidate_right,
          standardBasic
        },
      data(){
          return{
            addVisible:true,
            flag:1
          }
      },
      methods:{
        getMyEvent(flag){
          //接收的数据--------->我是子组件中的数据
          this.flag=flag;
          console.log(this.flag)
          console.log('接收的数据--------->'+flag)
        }
      }
    }
</script>

<style scoped>
</style>
