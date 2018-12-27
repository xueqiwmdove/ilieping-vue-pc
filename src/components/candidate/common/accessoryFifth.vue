<template>
  <!---->
    <div class="accessory_fifth">
      <div v-if="dataList.length==0" class="noOps">
        <img src="../../../assets/img/candidate/tanchuang_pic_attachment.png" alt="">
        <p>尚无附件信息</p>
         <el-upload
          class="upload-demo"
          :action="doupload()"
          :before-upload="before_Upload"
          ref="newupload"
          :data="data"
          :show-file-list="false"
           multiple
          :file-list="fileList"
          >
          <el-button style="background-color:#F95714;border-radius:4px;width:220px;height:40px;color:#fff" >上传附件</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </div>
      <!--上传-->
      <div v-else class="fileList sty ">
         <!-- <div class="uploadFile">
          <span>上传附件</span>
          <input  @change="getFile($event)" class="el-icon-upload" type="file" ref="fileTag"  id='file'  action=""/>
        </div> -->
        <el-upload
          class="upload-demo"
          :action="doupload()"
          :before-upload="before_Upload"
          ref="newupload"
          :data="data"
           multiple
          :show-file-list="false"
          :file-list="fileList"
          >
          <el-button style="background-color:#F95714;border-radius:4px;width:220px;height:40px;color:#fff" >上传附件</el-button>
        </el-upload>
        <p  class="headLine">附件列表</p>
        <div class="file_text_box"><!--v-for="(item,index) of imgList" :key="index" -->
          <div class="file_text">
            <div class="file" v-for="(item,index) in dataList" :key="index">
              <i class="filename">
                {{item.fileName}}
                <!-- {{item.type=='0'?"人事流程附件"
                :item.type=='1'?'转正附件'
                :item.type=='2'?'离职附件'
                :item.type=='3'?'简历附件'
                :item.type=='4'?'学历证明附件'
                :item.type=='5'?'上家离职证明附件'
                :item.type=='6'?'员工照片'
                :item.type=='7'?'体验报告':''}} -->
                </i>
              <div>
                <i @click="checkfile(item)" class="detail" >查看</i>
                <i @click="downLoad(item)" class="downLoad">下载</i>
                <i @click="deletefile(item)" class="delete">删除</i>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>

</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import store from '@/store/store';
    export default {
        name: "accessoryFifth",
        components:{

        },
      data(){
        return{
          dataList:[],
          fileList:[],
          data:{},
          candidateID:'',
          };
      },
      methods:{
      doupload() {
        return api.uploadAnnexInfo
      },
    //上传
      before_Upload(file) {
        //TODO 候选人id
        let that = this;
        that.candidateID=localStorage.getItem('candidateID');
        let FormDatas = new FormData();
        FormDatas.append('file',file);
        FormDatas.append('bizTable','candidate');
        FormDatas.append('bizId',that.candidateID);//候选人id<===========!
        console.log(FormDatas);
          that.$http({
            method:'post',
            url:api.uploadAnnexInfo,
            headers:headers('multipart/form-data'),
            data:FormDatas
          }).then(function(res){
           if(res.data.code==10000){
              that.$message.success(res.data.msg);
              that.getList()
            }else{
              that.$message.error(res.data.msg);
            }
          })
      },
  //删除附件
      deletefile(val) {
          let that = this;
          let annexId = val.id;
          that.$http({
            method:'delete',
            url:api.deleteFile+'/'+annexId ,
           headers:headers('application/json;charset=utf-8'),
          }).then(function(res){
            if(res.data.code==10000){
              that.$message.success(res.data.msg);
              that.getList()
            }else{
              that.$message.error(res.data.msg);
            }
          })
      },
     //获取附件列表
       getList() {
          let that = this;
          // that.candidateID=localStorage.getItem('candidateID');
          let candidateId =localStorage.getItem('candidateID');
          that.$http({
            method:'get',
            url:api.annexList+'/'+candidateId ,
              headers:headers('application/json;charset=utf-8'),
          }).then(function(res){
            if(res.data.code==10000){
              that.dataList = res.data.data;
            }else{
              that.$message.error(res.data.msg);
            }
          })
       },
     //查看
       checkfile(val) {
         let url = val.httpUrl;
        //  window.location.href = url;
        window.open(url, '_blank ')
       },
     //下载
       downLoad(val) {
          let url = val.httpUrl;
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
      },
      created(){
        // this.getList()
      },

    }
</script>

<style scoped>
 .headLine {
   text-align: left;
 }
 .filename {
   float: left;
 }
 .btn_rsset.el-button--primary {
   background: #F95714;
   border-radius: 4px;
   width: 220px;
   height: 40px;
 }
</style>
