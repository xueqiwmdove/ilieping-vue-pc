<template>
  <div class="addCandidate_content">
      <ul class="tab_title">
        <li @click="changeTab(1)" :class="flag==1?'active':''">原始简历</li>
        <li @clcik="changeTab(2)" :class="flag==2?'active':''">标准简历</li>
        <li class="button">
          <img src="../../../assets/img/candidate/tanchuang_ic_download.png" class="upload">
          <img src="../../../assets/img/candidate/tanchuang_ic_print.png" class="print">
        </li>
      </ul>

      <div>

        <el-upload
          class="upload-demo"
          drag
          action=""
          multiple>
          <i class="el-icon-upload">
            <img src="../../../assets/img/candidate/tanchuang_pic_upload.png" alt="">
          </i>
          <p class="el-upload__text">将建立拖至此处自动上传或<em>选择文件上传</em></p>
          <p class="el-upload__text">支持PDF/TXT/WORD/WPS等简历格式</p>
        </el-upload>

      </div>
      <div></div>
  </div>
</template>

<script>
    export default {
        name: "addCandidate_content",
        data(){
          return{
            flag:1,

          }
        },
      methods:{
        changeTab(flag){
          let that=this;

        }
      }
    }
</script>

<style scoped>
  .active{
    color: #394A66;
  }
</style>
