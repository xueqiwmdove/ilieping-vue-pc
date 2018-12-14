<!-- 
    Author:周双
    日期：2018/11/27
-->
<template>
    <div >
        <div class="uploadFile" v-show="uploadBtnShow">
            <span>上传</span>
            <input :disabled='flag' class="el-icon-upload" type="file"  @change="getFile($event)" id='file' accept="image/*,application/*" action=""/>
        </div>

        <div class="file_text" v-show="imgList != '' || fileUrled != '' ">
            <div class="load-del" v-show="!uploadBtnShow">
                {{fileName ? fileName : imgList.name ? imgList.name :'' }}
                <img src="../../assets/img/staff/ic_atta.png" alt="" class="upload-icon">
                <span class="upload-txt">已上传</span>
                <a :href="fileUrled" v-if="isReview" target="_blank">预览</a>
                <a :href="fileUrled" ref="loadTag" @click.prevent="getLoad(fileUrled,imgName)">下载</a>
                <a href="javascript:void(0)" @click="fileDel()">删除</a>
            </div>
        </div>

    </div>
</template>
<script>
    import http from '@/http/http'
    import api from '@/api/api.js';
    import {headers} from '@/assets/js/common/lp.js'
    export default {
        name:'fileupload',
        props:['fileUrled','fileName','fileId','imgName'],
        data(){
            return {
                imgList:"",
                flag:false,
                uploadBtnShow:true,
                isReview:false
            };
        },
        watch:{
            fileUrled(newVal, oldVal){

                if(newVal){
                    let fileTye = newVal.match(/.+\/(.+)$/)[1];
                        fileTye = fileTye.split('.')[1];
                    if( fileTye == 'png' || fileTye == 'jpg' || fileTye == 'jpeg' || fileTye == 'webp' || fileTye == 'svg' || fileTye == 'pdf'){
                        this.isReview = true;
                    }
                    this.uploadBtnShow = false;
                    return newVal;
                }  
            }
        },
        methods:{
            getFile(event) {
            this.file = event.target.files[0];
            if (!event.target.files[0].size) return;

                this.getFileList(event.target.files);
                this.uploadBtnShow = false;
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
                var isLt3M= files_size / 1024 / 1024 < 3;
                console.log(isLt3M,'<=======isLt3M')
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
            //下载文件
            getLoad(url,imgName){

                let fileTye = url.match(/.+\/(.+)$/)[1];
                let that = this;

                let formData = new FormData();
                formData.append('fileUrl',url);

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
            },
            // 删除文件
            fileDel(){
                let that = this;
                if(this.fileId){
                    var data = {
                        annexId: parseInt(this.fileId)
                    };
                }else if(this.imgName){
                    var data = {
                        employeeId: parseInt(this.$route.query.id),
                        imageName: this.imgName
                    };
                }else{
                    this.$message.error('删除参数出错');
                }
                           
                this.$http({
                            url:api.archivesDelFile,
                            method:'post',
                            headers:headers('application/json;charset=utf-8'),
                            data:data
                        }).then(function (res) {

                            let resData = res.data;
                            if(resData.code == 10000){

                                that.imgList = "";
                                that.uploadBtnShow = true;
                                that.$message(resData.msg);
                            }else{
                                that.$message.error(resData.msg);
                            }

                        }).catch(function (error) {
                            that.$message.error(error);
                        });            

            },  
            getFileUrl(url){
                this.fileUrled = url;
            }
        }
    }
</script>
<style scoped>
    .uploadFile {
        display: block;
        width: 100%;
        height: 34px;
        margin-left: 0;
        background:none;
        position: inherit;
        cursor: pointer;
    }
    .uploadFile input {
        opacity: 0;
        width: 120px;
        height: 34px;
        z-index: 10000;
        border:1px solid #ccc;
        position: absolute;
        left: 0;
    }
    .uploadFile span {
        position: absolute;
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
        border-radius: 4px;
    }
    .file_text {
        position: relative;
        text-align: left;
        background-color: #FAFBFC;
    }
    .file_text a{
        display: inline-block;
        font-size: 14px;
        color: #2569F6;
        
    }
    .file_del {
        position:absolute;
        right:30px;
        top:13px;
        cursor: pointer;
        font-size:15px;
    }
    .load-del{
        display: inline-block;
        padding-left: 20px;
    }
    .upload-icon{
        vertical-align: middle;
        width: 26px;
        height: 26px;
        margin-right: 6px;
    }
    .upload-txt{
        margin-right: 10px;
    }
</style>

