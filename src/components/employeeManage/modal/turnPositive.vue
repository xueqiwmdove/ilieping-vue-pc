<!-- 
    Author:周双
    日期：2018/11/27
-->
<template>
    <div>

        <el-dialog title="转正" width="540px" :visible="visableModal" :before-close="hideModel">

            <el-form ref="form" :model="formData" :rules="rules">
                <el-form-item label="转正员工" :label-width="formLabelWidth" >
                    <p>{{employeeInfo.employeeName}}</p>
                </el-form-item>    

                <el-form-item label="入职日期" :label-width="formLabelWidth" >
                    <p>{{employeeInfo.entryTime}}</p>
                </el-form-item>  

                <el-form-item label="试用期月数" :label-width="formLabelWidth" >
                    <p>{{employeeInfo.probation}}</p>
                </el-form-item>  

                <el-form-item label="预计转正时间" :label-width="formLabelWidth" >
                    <p>{{employeeInfo.turnPositiveTime}}</p>
                </el-form-item>  

                <el-form-item label="实际转正日期" :label-width="formLabelWidth" prop="effectiveDate">
                    <el-date-picker v-model="formData.effectiveDate" type="date" placeholder="请输入实际转正日期"></el-date-picker>
                </el-form-item>

                <el-form-item label="评价备注" :label-width="formLabelWidth" prop="remarks">
                    <el-input type="textarea" v-model="formData.remarks" placeholder="请输入评价"></el-input>
                </el-form-item>

                <el-form-item label="上传附件" :label-width="formLabelWidth">        
                    <fileupload v-on:getfile="getUploadFiles"></fileupload>
                </el-form-item>          

            </el-form>
            
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :disabled="disableType" @click="confirmPositive()">确 定</el-button>
                <el-button @click="hideModel">取 消</el-button>
            </div>
            
        </el-dialog>

    </div>
</template>


<script>
    import http from '@/http/http';
    import api from '@/api/api.js';
    import {headers} from '@/assets/js/common/lp.js';
    // import store from '@/store/store';
    import fileupload from '@/components/common/fileUpload';
    export default {
        props:['visableModal','employeeInfo'],
        components:{
            fileupload
        },
        data() {
            return {
                value:'',
                formLabelWidth: '120px',
                disableType:true,
                // resetImg: 0,
                formData:{
                    effectiveDate:'',
                    remarks:'',
                    fileList: []
                },
                rules:{
                    effectiveDate:[
                        { required: true, message: '请选择时间', trigger: 'change' },
                    ],
                    remarks:[
                        { required: true, message: '请输入备注', trigger: 'blur' },
                    ],
                }
            };
        },
        watch:{
            formData:{
                handler(newValue, oldValue){
                    this.$refs['form'].validate((valid) => {
                        if (valid) {
                            this.disableType = false;
                        }
                    });
                },
                deep:true
            }            
        },
        methods:{
            hideModel(){
                // this.formData.effectiveDate = '';
                // this.formData.remarks = '';
                // this.formData.fileList = [];

                if(this.$refs['form']){
                    this.$refs['form'].resetFields();
                    this.$refs['form'].clearValidate();
                }

                this.$store.commit('resetImgClear');
                this.disableType = true;

                this.$emit('hideModal','positive');
            },
            getUploadFiles(fileList){
                //获取上传文件列表
                this.formData.fileList = fileList;
            },
            formateTime(argTime){
                //格式化ele-date时间
                if(argTime.getFullYear){
                    let year = argTime.getFullYear();
                    let month = argTime.getMonth() + 1;
                    if(month < 10){
                        month = `0${month}`;
                    }
                    let day = argTime.getDate();
                    if(day < 10){
                        day = `0${day}`;
                    }
                    return `${year}-${month}-${day}`;
                }
            },            
            confirmPositive(){
                //提交表单
                let that = this;
                // this.$refs[fromName].validate((valid) => {
                //     if (valid) {
                        // debugger;
                        let effectiveDate = this.formData.effectiveDate;
                        effectiveDate = this.formateTime(effectiveDate);

                        var formData = new FormData();
                        formData.append('type',1);
                        formData.append('employeeId',this.$route.query.id);
                        formData.append('effectiveDate',effectiveDate);
                        formData.append('remarks',this.formData.remarks);
                        that.formData.fileList.forEach((file,index) => {
                            formData.append('files', file.file)
                        });       
                        
                        this.$http({
                                    url:`${api.staffTurnPositive}`,
                                    method:'POST',
                                    headers:headers('multipart/form-data'),
                                    data:formData
                                }).then(function (res) {
                                    let resData = res.data;
                                    if(resData.code == 10000){
                                        that.$message(resData.msg);
                                        that.hideModel();
                                    }else{
                                        that.$message.error(resData.msg);
                                    }

                                }).catch(function (error) {
                                    that.$message.error(error);
                                });    

                    // } else {
                    //     that.$message.error('请完整填写表单');
                    //     return false;
                    // }

                // })                 
            },
        }
  };
</script>
<style>
    @import './modal.css';
</style>