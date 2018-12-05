<template>
    <div>
             <!-- 弹窗-转正 -->
                  <el-dialog title="转正" :visible="visableModal" class="add_dialog ly_change " >
                          <el-form :model="formalData" :rules="rules" ref="formalData">
                            <el-row>
                                  <el-form-item label="转正员工" :label-width="formLabelWidth" >
                                    <span class="span_dialog" >{{formalData.employeeName}}</span>
                                  </el-form-item>
                              <el-row>
                                  <el-form-item label="入职日期" :label-width="formLabelWidth">
                                    <span  class="span_dialog">{{formalData.entryTime}}</span>
                                  </el-form-item>
                              </el-row>
                            </el-row>  
                            <el-row>
                                  <el-form-item label="试用期月数" :label-width="formLabelWidth">
                                    <span class="span_dialog">{{formalData.probation}}</span>
                                  </el-form-item>
                              <el-row>
                                  <el-form-item label="预计转正日期" :label-width="formLabelWidth">
                                    <span  class="span_dialog">{{formalData.expectedTurnTomep}}</span>
                                  </el-form-item>
                              </el-row>
                            </el-row>  
                            <el-row>
                              <el-form-item label="实际转正日期" :label-width="formLabelWidth" prop="newDate">
                                    <el-date-picker v-model="formalData.newDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择实际转正日期"></el-date-picker>
                                  </el-form-item>
                            </el-row>  
                            <el-row>
                              <el-form-item label="评价备注" :label-width="formLabelWidth" prop="mark">
                                        <el-input type="textarea" v-model="formalData.mark" style="width:100%;" placeholder="请输入评价"></el-input>
                                  </el-form-item>
                            </el-row>  
                              <el-row style="margin-left:30px;">
                                    <el-form-item label="上传附件" style="margin-bottom:-25px;">
                                        <div class="certificate-content reset ">
                                          <div class="form-group">
                                        	<div class="uploadFile">
                                             <span style="color:#F95714 ;border-radius: 4px;background: #FAFBFC;border: 1px solid #E5E5E5;" class="el-icon-upload">上传附件</span>
                                            <input class="el-icon-upload" type="file"  @change="getFile($event)" id='file' accept="image/bmp,image/jpg,image/png,image/jpeg" action=""/>
                                           </div>
                                           </div>
                                         </div>
                                      </el-form-item>
                                      <el-form-item>
                                          <div v-show="imgList.length!=0"  style="border: 1px solid white;" >
                                              <div v-for="(item,index) of imgList" :key="index" >
                                                <div class="file_text">
                                                    <div >
                                                      <div  >
                                                          {{item.file.name}}
                                                      </div>
                                                      <i  class=" el-icon-close file_del" @click="fileDel(index)"></i>
                                                    </div>
                                                </div>
                                               </div>
                                          </div>
                                      </el-form-item>
                                  <div class="dialog-footer"  style="margin-left:35%;">
                                  <el-button type="primary"  @click="submitNormol"  style="height:36px;">确 定</el-button>
                                  <el-button @click="dialogFormal = false"  style="height:36px;">取 消</el-button>
                               </div>         
                            </el-row>  
                            </el-form>
                    </el-dialog>
                <!-- end-->
    </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import {format} from '@/assets/js/date.js'
  export default {
  name: 'dialogFormal',
  props :['visableModal','formalData'],
     data() {
       return {
        treeVisabled:false,
        dialogFormal:false,  
        fileList:[],//上传文件集合数组
        formLabelWidth: '120px',//输入框长度
        imgList:[],
        fileList:[],
        // formalData:{//转正表单
        // employeeName:'',
        // entryTime:'',
        // probation:'',
        // expectedTurnTomep:'',
        // newDate:'',
        // mark:'',
        // },
        rules: {//表单校验规则
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min:1, max: 32, message: '长度在32个', trigger: 'blur' }
          ],
          mark:[
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          newDate:[
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          lastDate:[
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          marks:[
            { required: true, message: '备注不为空', trigger: 'blur' },
          ],
          raldate:[
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          fontMark:[
            { required: true, message: '备注不为空', trigger: 'blur' },
           ],
          region:[
            { required: true, message: '部门不为空', trigger: 'change' },
          ],
          Newposition:[
            { required: true, message: '职位不能为空', trigger: 'blur' },
          ],
          type:[
            { required: true, message: '请选择员工类型', trigger: 'change' }
          ],
          newSuperior:[
            { required: true, message: '上级部门不为空', trigger: 'blur' },
          ]
         
        },
       }  
     },
     methods:{
      //上传图片
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
       console.log(file,'<======file')
        var files_size=this.file.size;
      var isLt5M= files_size / 1024 / 1024 < 3;
      console.log(isLt5M,'<=======isLt5M')
       if (!isLt5M) {
	     this.$message.error('图片选择失败，每张图片大小不能超过 3MB,请重新选择!');
	     return false;
	    }else {
         this.size = this.size + file.size;//总大小
        let reader = new FileReader();
        reader.vue = this;
        reader.readAsDataURL(file);
        reader.onload = function () {
            file.src = this.result;
            this.vue.imgList.push({
                file
            });
        }
        console.log(this.imgList,'<=======imgList')
      }
       
     },
    // 删除文件
     fileDel(index){
          this.size = this.size - this.imgList[index].file.size;//总大小
          this.imgList.splice(index, 1);
      },    
  //转正提交    
      submitNormol() {
        var timel =new Date().format("yyyy-MM-dd");
        if(this.formalData.expectedTurnTomep <timel ) {
           this.$message({
              message: '预计转正日期不能小于当前日期！',
              type: 'error'
           });
           this.formalData.newDate=''
           return
        }else {
         this.$refs.formalData.validate(valid => {
            if (valid) {
              let that=this;
            if(that.imgList[0]==''){
              that.$message({
                  message: '请上传文件！',
                  type: 'error'
              });
                return false;
            }
              let params = new FormData() ; 
              that.imgList.forEach((file,index) => {
                 params.append('files', file.file)
                })
              params.append('files',that.imgList)
              params.append('type','1');
              params.append('employeeId',that.formalData.id);
              params.append('remarks',that.formalData.mark);
              params.append('effectiveDate',that.formalData.newDate);
              //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
                that.$http({
              		method:"post",
              		url:api.turnPositive,
              		headers:headers("multipart/form-data"),
              		data:params,
              		cache:false
              	}).then(function(res){
                  console.log(res);
                  if(res.data.code==10000){
                	 that.$message({
                      message: '保存成功！',
                      type: 'success'
                    });
                    that.dialogFormal=false
                  }else{
                    that.$message.error(res.data.msg);
                    that.dialogFormal=false
                  }
              })
            }
          });
        }

      },
     },
     created() {
       let d =  this.formalData.flag  
       console.log(d)
     }
  }
  
</script>
