<template>
  <!--备注-->
    <div class="remark_forth">
      <div v-if="beizhu" class="noOps">
        <img src="../../../assets/img/candidate/tanchuang_pic_note.png" alt="">
        <p>尚无备注</p>
        <button @click="addMack">添加备注</button>
      </div>

      <!--备注列表-->
      <div v-else class="remarkList" >
        <button @click="addMack">添加备注</button>
        <!-- 用来让父组件触发 -->
        <div class="remark_box" >
          <div class="remark" v-for="(item,index ) in dataList" :key="index" >
            <p class="ops_person">
              <span>{{item.operatorName?item.operatorName.substr(0, 1):''}}</span>
              <i class="hrName">{{item.operatorName}}· {{item.operatorPostStr}}</i>
              <i class="time">{{item.createTime}}</i>
            </p>
            <div class="ops_content">{{item.remark}}</div>
            <p class="ops">
              <!-- <i>删除</i> -->
            </p>
          </div>
        </div>
      </div>
        <remarkAlert ref="mack" @getList="getList" ></remarkAlert>
    </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import store from '@/store/store';
  import remarkAlert from './remarkAlert';

 export default {
      name: "remarkForth",
      components:{
        remarkAlert,
      },
        data(){
        return{
          dataList:[],
          beizhu:false,
          candidateID:localStorage.getItem('candidateID')

        };
    },
    methods:{
      getList() {
        let that = this;
        that.$http({
          method:'get',
          url:api.candidateRemark+'/'+that.candidateID ,
            headers:headers('application/json;charset=utf-8'),
        }).then(function(res){
          if(res.data.code==10000){
            that.dataList = res.data.data;
            if(that.dataList.length==0){
              that.beizhu=true;
            }else{
              that.beizhu=false;
            }

          }else{
            that.beizhu=true;
            that.$message.error(res.data.msg);
          }
        })
      },
      addMack() {
        this.$refs.mack.open()
        // this.$emit("addMack")
      }
    },
    created(){
      // this.getList()
    },
}
</script>

<style scoped>

</style>
