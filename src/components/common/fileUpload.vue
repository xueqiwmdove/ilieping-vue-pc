<!-- 
    duanyanhong
    日期：2018/11/16
-->

<template>
    <div >
           <div class="certificate-content reset ">
                 <div class="form-group">
                    <div class="uploadFile">
                        <span style="color:#F95714 ;border-radius: 4px;background: #FAFBFC;border: 1px solid #E5E5E5;" class="el-icon-upload">上传附件</span>
                        <input :disabled='flagDia' class="el-icon-upload" type="file" ref="fileTag"  @change="getFile($event)" id='file' accept="image/bmp,image/jpg,image/png,image/jpeg" action=""/>
                    </div>
                 </div>
            </div>
            <!-- 上传列表 -->
            <div v-show="imgList.length!=0"   >
                <div v-for="(item,index) of imgList" :key="index" >
                <div class="file_text">
                    <div class="notext">
                            <i class="name_sty" :title="item.file.name"> {{item.file.name}}</i>
                            <i  class=" file_del" @click="fileDel(index)">删除</i>
                    </div>
                </div>
                </div>
            </div>
    </div>
</template>
<script>
import store from '@/store/store';
export default {
    name:'fileupload',
    props:['flagDia'],
    data() {
      return {
        imgList:[],
        flag:false
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
        fileAdd(file){
            console.log(file.size,'<======file')
            var files_size=file.size;
            var isLt5M= files_size / 1024 / 1024 < 3;
            console.log(isLt5M,'<=======isLt5M')
            if (!isLt5M) {
                this.$message.error('图片选择失败，每张图片大小不能超过 3MB,请重新选择!');
                return false;
            }else {
                let reader = new FileReader();
                reader.vue = this;
                reader.readAsDataURL(file);
                if(this.imgList.length>4) {
                    this.$message({
                        message:'上传文件不能超过5张',
                        type:'error'  
                    }) 
                  if(this.imgList !=[]) {
                      this.flagDia =true
                  }
                return
            }else {
                reader.onload = function () {
                file.src = this.result;
                this.vue.imgList.push({
                    file
                });
            } 
            }
            this.$emit('getfile',this.imgList)
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

