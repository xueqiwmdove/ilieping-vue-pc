<!--
    duanyanhong
    日期：2018/11/16
-->

<template>
    <div >
           <div class="certificate-content reset ">
                 <div class="form-group">
                    <div class="uploadFile">
                        <span style="color:#66ADFF;margin-left: 60px;" >上传附件</span>
                        <input  class="el-icon-upload" type="file" ref="fileTag"  @change="getFile($event)" id='file' accept="image/bmp,image/jpg,image/png,image/jpeg" action=""/>
                    </div>
                 </div>
            </div>
            <!-- 上传列表 -->
          <div v-for="(item,index) in sendData" :key="index" >
            <div class="file_text" style="padding: 0">
              <div class="load-del">
                <i class="name_sty" >{{item.fileName}} </i>
                <!--<i class="ic_atta"></i>-->
                <!--<i class="file_del" @click="showImage(item)">预览</i>-->
                <!--<i class="file_del" @click="getLoad(item)">下载</i>-->
                <!--<i class="file_del" @click="fileDel(index,item)">删除</i>-->
              </div>
            </div>
          </div>
    </div>
</template>
<script>
import store from '@/store/store';
export default {
    name:'candidateFile',
    props:['sendData'],
    data() {
      return {
        imgList:[],
        }
      },
    methods:{
        getFile(event) {
        this.file = event.target.files[0];
        if (!event.target.files[0].size) return;
            // console.log(this.file);
            this.getFileList(event.target.files);
        },
        getFileList(files){
        for (let i = 0; i < files.length; i++) {
                this.fileAdd(files[i]);
        }
        },
        fileAdd(file){
          let that=this;
            // console.log(file.size,'<======file')
            let files_size=file.size;
            let isLt10M= files_size / 1024 / 1024 < 10;
            // console.log(isLt5M,'<=======isLt5M')
            if (!isLt10M) {
                this.$message.error('附件选择失败，大小不能超过 10MB,请重新选择!');
                return false;
            }else {
              let reader = new FileReader();
              reader.vue = this;
              reader.readAsDataURL(file);
              if (this.sendData.length > 4) {
                this.$message({
                  message: '上传文件不能超过5张',
                  type: 'error'
                });
                this.flag = true;
                return
              } else {
                that.$emit('getfile', file);
              }
            }

        },
        // 删除文件
        fileDel(index){
            this.imgList.splice(index, 1);
        },
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
.certificate-content .form-group {
    margin-bottom: 0px;
}
.certificate-content {
padding: 7px 20px 0;
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
color: #97A2B3;
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
float: right;
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
}
</style>

