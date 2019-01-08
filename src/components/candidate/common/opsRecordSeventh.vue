<template>
  <!--操作记录-->
    <div class="opsRecord_seventh">
      <!--缺省页-->
      <div v-if="dataList.length==0" class="noOps">
        <img src="../../../assets/img/candidate/tanchuang_pic_record.png" alt="">
        <p>暂无操作记录</p>
      </div>

      <div v-else class="records">
        <div class="record" v-for="(item,index) in dataList" :key="index">
          <img src="../../../assets/img/candidate/records_left.png" alt="">
          <p class="time">{{item.createTime}}</p>
          <p class="ops">{{item.operationDescription}}</p>
          <p class="remark">备注：{{item.remark}}</p>
          <p class="ops_person">{{item.operatorName}}</p>
        </div>

      </div>
    </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import store from '@/store/store';
    export default {
        name: "opsRecordSeventh",
            data(){
        return{
          dataList:[],
          candidateID:'',
          };
      },
      methods:{
       getList() {
          let that = this;
          that.candidateID=localStorage.getItem('candidateID');
          that.$http({
            method:'get',
            url:api.candidateOperation+'/'+that.candidateID ,
              headers:headers('application/json;charset=utf-8'),
          }).then(function(res){
            if(res.data.code==10000){
              that.dataList = res.data.data;
            }else{
              that.$message.error(res.data.msg);
            }
          })
       }
      },
      created(){
        // this.getList()
      },
    }
</script>

<style scoped>

</style>
