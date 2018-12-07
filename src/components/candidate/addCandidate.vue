<template>
  <!--添加候选人弹窗-->
  <el-dialog title="添加候选人" :visible.sync="addVisible" custom-class="addCandidateAlert">
    <img src="../../assets/img/candidate/tanchuang_ic_save.png" alt="">
    <div class="addMain">
      <addCandidate_content></addCandidate_content>
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
  import breadcrumb from '@/components/common/breadcrumb'
  import {mapState,mapActions} from 'vuex'


    export default {
        name: "addCandidate",
        components:{
          addCandidate_content,
          addCandidate_right
        },
      data(){
          return{
            addVisible:true
          }
      }
    }
</script>

<style scoped>
</style>
