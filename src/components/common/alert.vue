<template>
  <div class="g-dialog-contianer" ng-show="isAlert">
    <div class="dialog-window" style=" height: 272px;">
      <div class="g-dialog-off" @click="closeAlert"></div>
      <div class="dialog-header warning"></div>
      <div class="dialog-container">
        <div class="dialog-msgContent">暂未搜索到相关员工数据，建议您换个条件重试</div>
      </div>
      <div class="dialog-footer">
        <button class="confirm">继续</button>
        <button class="cancel" @click="closeAlert">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "alert",
        data(){
          return{
            isAlert:false
          }
        },
      methods:{
        closeAlert(){
          let that=this;
          that.isAlert=false;
        }
      }
    }
</script>

<style scoped>

</style>
