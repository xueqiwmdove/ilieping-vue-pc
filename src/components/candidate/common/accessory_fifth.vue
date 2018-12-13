<template>
  <!---->
    <div class="accessory_fifth">
      <div class="noOps">
        <img src="../../../assets/img/candidate/tanchuang_pic_attachment.png" alt="">
        <p>尚无附件信息</p>
        <div class="uploadFile">
          <span>上传附件</span>
          <input class="el-icon-upload" type="file" ref="fileTag"  id='file'  action=""/>
        </div>
      </div>

      <!--上传-->
      <div class="fileList">
        <p class="headLine">附件列表</p>
        <div class="file_text_box"><!--v-for="(item,index) of imgList" :key="index" -->
          <div class="file_text">
            <div class="file">
              <i class="filename">面试登记附件</i>
              <div>
                <i class="detail">查看</i>
                <i class="downLoad">下载</i>
                <i class="delete">删除</i>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>

</template>

<script>
    export default {
        name: "accessory_fifth",
        components:{

        },
      data(){
          return{
            imgList:[

            ]
          }
      }
    }
</script>

<style scoped>

</style>
