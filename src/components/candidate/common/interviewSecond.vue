<template>
  <div class="interview_second">
    <!--无操作-未到面试状态-->
    <div class="noOps">
      <img src="../../../assets/img/candidate/tanchuang_pic_interview2.png" alt="">
      <p>将候选人移动至「面试」后（右侧），才可以添加面试</p>
    </div>
    <!--缺省-已到面试状态-->
    <div class="noInterviews">
      <img src="../../../assets/img/candidate/tanchuang_pic_interview1.png" alt="">
      <p>暂未添加面试</p>
      <button>添加面试</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "interviewSecond",
    data() {
      return {
      }
    },
    methods:{
   
    }
    }
</script>

<style scoped>
  .interview_second {
    margin-bottom: 20px;
  }
</style>
