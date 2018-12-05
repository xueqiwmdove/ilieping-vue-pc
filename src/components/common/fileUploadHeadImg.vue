<!-- 
    Author:周双
    日期：2018/11/27
-->
<template>
    <div class="uploadFile">
        <img :src="employeeInfo.profilePhotoUrl" class="head-img"> 
        <input :disabled='flag' class="el-icon-upload" type="file" @change="getFile($event)" id='file' accept="image/*" action=""/>
    </div>
</template>
<script>
export default {
    name:'fileupload',
    props:['employeeInfo'],
    data() {
        return {
                imgList:"",
                flag:false,
                uploadBtnShow:true,
            }
      },
    methods:{
        getFile(event) {
          this.file = event.target.files[0];
          if (!event.target.files[0].size) return;
            this.getFileList(event.target.files);
        },
        getFileList(files){
          for (let i = 0; i < files.length; i++) {
                this.fileAdd(files[i]);
          }
        },
        fileAdd(file){
            var files_size=file.size;
            var isLt3M= files_size / 1024 / 1024 < 3;
            if (!isLt3M) {
                this.$message.error('图片选择失败，每张图片大小不能超过 3MB,请重新选择!');
                return false;
            }else {
                let reader = new FileReader();
                let that = this;
                reader.readAsDataURL(file);

                reader.onload = function () {
                    file.src = this.result;

                    that.imgList = file;
                    that.$emit('getfile',that.imgList)
                }                
            }
        
        },
        getFileUrl(url){
            this.employeeInfo.profilePhotoUrl = url;
        }
    }
}
</script>
<style scoped>
    .uploadFile {
        display: block;
        width: 120px;
        height: 120px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 15px;
        background:none;
        position: relative;
        cursor: pointer;
    }
    .uploadFile img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .uploadFile input {
        opacity: 0;
        width: 120px;
        height: 120px;
        z-index: 10000;
        border:1px solid #ccc;
        position: absolute;
        left: 0;
        top: 0;
    }
</style>

