<template>
  <div class="addCandidate_content">
      <ul class="tab_title">
        <li @click="changeTab(1)">原始简历</li>
        <li @clcik="changeTab(2)">标准简历</li>
        <li class="button">
          <img src="../../../assets/img/candidate/tanchuang_ic_download.png" class="upload">
          <img src="../../../assets/img/candidate/tanchuang_ic_print.png" class="print">
        </li>
      </ul>
      <div>
        <img src="../../../assets/img/candidate/tanchuang_pic_upload.png" alt="">
      </div>
      <div></div>
  </div>
</template>

<script>
    export default {
        name: "addCandidate_content"
    }
</script>

<style scoped>

</style>
