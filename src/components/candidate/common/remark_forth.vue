<template>
  <!--备注-->
    <div class="remark_forth">
      <div class="noOps">
        <img src="../../../assets/img/candidate/tanchuang_pic_note.png" alt="">
        <p>尚无备注</p>
        <button>添加备注</button>
      </div>

      <!--备注列表-->
      <div class="remarkList">
        <button>添加备注</button>
        <div class="remark_box">
          <div class="remark">
            <p class="ops_person">
              <span>王</span>
              <i class="hrName">王一一 · HR</i>
              <i class="time">20秒前</i>
            </p>
            <div class="ops_content">该候选人的面试情况基本符合岗位需求</div>
            <p class="ops">
              <i>删除</i>
            </p>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "remark_forth"
    }
</script>

<style scoped>

</style>
