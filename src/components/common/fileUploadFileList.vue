<!---->

<template>
    <div >
           <div class="certificate-content reset ">
                 <div class="form-group">
                    <div class="uploadFile" v-if="sendData.length<5">
                        <span class="title_bg">照片上传</span>
                        <input :disabled='flag' class="el-icon-upload" type="file" ref="fileTag"  @change="getFile($event)" id='file' accept="image/bmp,image/jpg,image/png,image/jpeg" action=""/>
                    </div>
                 </div>
            </div>
            <!-- 上传列表 -->

          <div v-for="(item,index) in sendData" :key="index" >
            <div class="file_text" style="padding: 0">
              <div class="load-del">
                <i class="name_sty" > {{item.fileName}}</i>
                <i class="ic_atta"></i>
                <i class="file_del" @click="showImage(item)">预览</i>
                <i class="file_del" @click="getLoad(item)">下载</i>
                <i class="file_del" @click="fileDel(index,item)">删除</i>
              </div>
            </div>
          </div>
    </div>
</template>
<script>
import store from '@/store/store';
import http from '@/http/http'
import api from '@/api/api.js';
import {headers} from '@/assets/js/common/lp.js'
export default {
    name:'fileuploadList',
		props:['fileUrled','fileName','fileId','imgName','sendData'],
    data() {
      return {
        imgList:[],
        flag:false,
				isReview:false
        }
      },
    methods:{
        getFile(event) {
        this.file = event.target.files[0];
        if (!event.target.files[0].size) return;
            console.log(this.file);
            this.getFileList(event.target.files);
        },
        getFileList(files){
        console.log(files,'<==========files')
        for (let i = 0; i < files.length; i++) {
                this.fileAdd(files[i]);
        }
        },
        fileAdd(file) {
          let that = this;
          console.log(file.size, '<======file')
          var files_size = file.size;
          var isLt5M = files_size / 1024 / 1024 < 3;
          console.log(isLt5M, '<=======isLt5M')
          if (!isLt5M) {
            this.$message.error('图片选择失败，每张图片大小不能超过 3MB,请重新选择!');
            return false;
          } else {
            let reader = new FileReader();
            reader.vue = this;
            reader.readAsDataURL(file);
            if (this.sendData.length > 4) {
              this.$message({
                message: '上传文件不能超过5张',
                type: 'error'
              })
              this.flag = true
              return
            } else {
              that.$emit('getfile', file);
            }

          }
        },
        // 删除文件
        fileDel(index,item){



          let that = this;

          var data = {
            annexId: parseInt(item.id)
          };


          this.$http({
            url:api.archivesDelFile,
            method:'post',
            headers:headers('application/json;charset=utf-8'),
            data:data
          }).then(function (res) {
            let resData = res.data;
            if(resData.code == 10000){
              that.sendData.splice(index, 1);
              that.$message(resData.msg);
            }else{
              that.$message.error(resData.msg);
            }

          }).catch(function (error) {
            that.$message.error(error);
          });
        },
      showImage(item){
        window.open(item.httpUrl);
      },
      //下载文件
      getLoad(item){

        let fileTye = item.httpUrl.match(/.+\/(.+)$/)[1];
        let that = this;

        let formData = new FormData();
        formData.append('fileUrl',item.httpUrl);

        this.$http({
          url:api.archivesLoadFile,
          method:'POST',
          headers:headers('multipart/form-data'),
          responseType: 'blob',
          data: formData,
        }).then(function (res) {

          let result=res.data;

          let url =  window.URL.createObjectURL(new Blob([result]));
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;

          link.download = fileTye;
          document.body.appendChild(link);
          link.click();


        }).catch(function (error) {
          that.$message.error(error);
        });
      }
    },
    computed:{
        resetImg(){
            return this.$store.state.resetImg;
        }
    },
    watch:{
        resetImg(newVal){
            if(newVal == 1){
                this.imgList = [];
                this.$refs.fileTag.value = '';
            }
        }
    }
}
</script>
<style scoped>
.title_bg{    position: absolute;
    left: 0;
    top: 0;
    height: 34px;
    width: 120px;
    line-height: 34px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    border: 1px solid #F95714;
    background: #F95714;
    border-radius: 4px;}
.certificate-content .form-group {
    margin-bottom: 0px;
}
.certificate-content {
padding: 7px 5px 0;
}
.certificate-content .form-group .uploadFile {
  display: block;
  width: 100%;
  height: 34px;
  margin-left: 0;
  background:none;
  position: inherit;
  cursor: pointer;
}
.reset .form-group .uploadFile input {
opacity: 0;
width: 120px;
height: 34px;
z-index: 10000;
border:1px solid #ccc;
position: absolute;
left: 0;
}
.reset .form-group .uploadFile span {
position: absolute;
font-size: 14px;
bottom: 18px;
left: -5px;
top: -6px;
height: 19px;
color: #fff;
height: 34px;
width: 120px;
text-align: center;
line-height: 34px;
}
.file_text {
position: relative;
text-align: left;
padding:0px 40px;
background-color: #FAFBFC;
}
.file_del {
cursor: pointer;
font-size: 15px;
color: #2064F5;

}
.notext .name_sty {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    width: 200px;
    cursor: pointer;
		max-width: 100px;
}
.ic_atta{vertical-align: middle;
    width: 26px;
    height: 26px;
    margin-right: 6px;display: inline-block; background: url(../../assets/img/staff/ic_atta.png); background-size:100%;}
</style>

