<template>

    <div class="emailInfo" v-if="emailSuccess==1">
      <img src="../../assets/img/dismission/ic_success.svg" alt="">
      <h4>您已成功接收offer,请于规定时间准时入职！</h4>
    </div>
  <div class="emailInfo" v-else-if="emailSuccess==4">
    <img src="../../assets/img/dismission/ic_warning.svg" alt="">
    <h4>您已接收，如有其他疑问请联系offer上的联系人</h4>
  </div>
  <div class="emailInfo" v-else="emailSuccess==5">
    <img src="../../assets/img/dismission/ic_error.svg" alt="">
    <h4>接口请求超时,请稍后重试</h4>
  </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js'
  import {headers} from '@/assets/js/common/lp.js'

    export default {
        name: 'emailInfo',
        components: {},
        data() {
            return {
              id:this.$route.params.id,
              msg:this.$route.params.msg,
              emailSuccess:true,
              // emailAgain:false,
            }
        },
        watch: {},
        methods: {
          getData(){
            let that=this;
            that.$http({
              url:api.confirmOffer+that.id+"/"+that.msg,
              method:'post',
              headers:headers('application/json;charset=utf-8')
            }).then(res=>{
              // console.log(res)
              if(res.data.code==10000){
                that.emailSuccess=1;
              }else if(res.data.code=40000){
                that.emailSuccess=4;
              }else{
                that.emailSuccess=5;
              }
            })
            // offer/updatePC/{id/{id}/{enterpriseId}
          }
        },
        mounted() {
          this.getData()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .emailInfo{
    height: 200px;
    text-align: center;
    color:#394A66;
    font-size: 16px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin-top: 100px;
  }
  h4{
    height: 20px;
    line-height: 20px;
    margin-top: 20px;
  }
</style>
