<!--
    Author:周双
    日期：2018/11/27
-->
<template>
    <div>
        <el-dialog title="人事变更" width="540px" :visible="visableModal" :before-close="hideModel" custom-class="change_sty" >
            <el-form ref="form" :rules="rules" :model="formData">
                <el-form-item label="变更员工" :label-width="formLabelWidth" required>
                    <p>{{employeeInfoDetail.employeeName}}</p>
                </el-form-item>

                <el-form-item class="inline" label="部门" :label-width="formLabelWidth" required>
                    <p>{{employeeInfoDetail.deptName}}</p>
                </el-form-item>
                <el-form-item class="inline" label="变更为" :label-width="formLabelWidth">
                    <el-input @click.native="treeClick" v-model="formData.deptName" autocomplete="off" placeholder="请选择部门名称" class="el-icon-caret-bottom"></el-input>
                    <div v-if="treeVisabled" class="form_tree tree_sty" >
                        <treeSelect :tree-datas="treeDatas" v-on:getIds="getIds"></treeSelect>
                    </div>
                </el-form-item>

                <el-form-item class="inline" label="岗位" :label-width="formLabelWidth" required>
                    <p>{{employeeInfoDetail.position}}</p>
                </el-form-item>
                <el-form-item class="inline" label="变更为" :label-width="formLabelWidth">
                    <el-input type="text" v-model="formData.position" placeholder="请输入岗位"></el-input>
                </el-form-item>

                <el-form-item class="inline" label="员工类型" :label-width="formLabelWidth" required>
                    <p>{{employeeInfo.workType == 0 ? '全职' : employeeInfo.workType == 1 ? ' 兼职' : '实习'}}</p>
                </el-form-item>
                <el-form-item class="inline" label="变更为" :label-width="formLabelWidth">
                    <el-select v-model="formData.workType"  placeholder="请选择员工类型">
                        <el-option value="0" label="全职"></el-option>
                        <el-option value="1" label="兼职"></el-option>
                        <el-option value="2" label="实习"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="inline" label="直属上级" :label-width="formLabelWidth" required>
                    <p>{{employeeInfo.directlySuperior}}</p>
                </el-form-item>
                <el-form-item class="inline" label="变更为" :label-width="formLabelWidth">
                    <el-input type="text" v-model="formData.directlySuperior" placeholder="请输入直属上级"></el-input>
                </el-form-item>

                <el-form-item  label="工作地点" :label-width="formLabelWidth" required>
                    <p>{{employeeInfo.workAddress}}</p>
                </el-form-item>
                <el-form-item  label="变更为" :label-width="formLabelWidth" >
                    <el-input type="text" v-model="formData.workAddress" placeholder="请输入工作地点"></el-input>
                </el-form-item>

                <el-form-item label="生效日期" :label-width="formLabelWidth" prop="effectiveDate" >
                    <el-date-picker v-model="formData.effectiveDate" type="date" placeholder="请选择生效日期" style="width: 100%"></el-date-picker>
                </el-form-item>

                <el-form-item label="变更备注" :label-width="formLabelWidth" prop="remarks" >
                    <el-input type="textarea" v-model="formData.remarks" placeholder="请输入变更备注" style=" resize: none;"></el-input>
                </el-form-item>

                <el-form-item label="上传附件" :label-width="formLabelWidth" >
                    <fileupload v-on:getfile="getUploadFiles"></fileupload>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="savePersonChange('form')" :disabled="disableType">确 定</el-button>
                <el-button @click="hideModel('form')">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import http from '@/http/http';
    import api from '@/api/api.js';
    import {headers} from '@/assets/js/common/lp.js';

    import treeSelect from '@/components/common/treeSelect';
    import fileupload from '@/components/common/fileUpload';
    export default {
        components:{
            treeSelect,fileupload
        },
        props:['visableModal','employeeInfo','employeeInfoDetail'],
        data() {
            return {
                value:'',
                formLabelWidth: '120px',
                defaultTime:'',
                treeVisabled:false,
                treeDatas:[],
                disableType:true,
                formData:{
                    type:'0',
                    employeeId:this.$route.query.id,
                    deptName:'',
                    deptId:'',
                    position:'',
                    workType:'',
                    effectiveDate:'',
                    workAddress:'',
                    directlySuperior:'',
                    remarks:'',
                    fileList:[]
                },
                rules:{
                    deptName:[
                        { required: true, message: '请选择部门', trigger: 'change' },
                    ],
                    // position:[
                    //     { required: true, message: '请输入岗位', trigger: 'blur' },
                    // ],
                    // workType:[
                    //     { required: true, message: '请选择员工类型', trigger: 'change' },
                    // ],
                    // directlySuperior:[
                    //     { required: true, message: '请输入直属上级', trigger: 'blur' },
                    // ],
                    effectiveDate:[
                        { required: true, message: '请输入生效时间', trigger: 'change' },
                    ],
                    remarks:[
                        { required: true, message: '请输入备注', trigger: 'blur' },
                    ],
                    // workAddress:[
                    //     { required: true, message: '请输入工作地址', trigger: 'blur' },
                    // ],
                }
            };
        },
        created(){
            this.getTree();
        },
        watch:{
            formData:{
                handler(newValue, oldValue){
                    this.$refs['form'].validate((valid) => {
                        if (valid) {
                            if(newValue.deptId != "" || newValue.position != "" || newValue.workType != "" || newValue.directlySuperior != "" || newValue.workAddress != "") {
                                this.disableType = false;
                            }else{
                                this.$message.warning('部门，岗位，员工类型，直属上级,工作地点必填一项');
                            };

                        }
                    });
                },
                deep:true
            }
        },
        methods:{
            hideModel(){

                // this.formData.deptName = '';
                // this.formData.deptId = '';
                // this.formData.position = '';
                // this.formData.workType = '';
                // this.formData.effectiveDate = '';
                // this.formData.workAddress = '';
                // this.formData.directlySuperior = '';
                // this.formData.remarks = '';
                // this.formData.fileList = [];

                if(this.$refs['form']){
                    this.$refs['form'].resetFields();
                    this.formData.deptName = '';
                    this.formData.deptId = '';
                    this.formData.position = '';
                    this.formData.workType = '';
                    this.formData.workAddress = '';
                    this.formData.directlySuperior = '';
                    this.$refs['form'].clearValidate();
                }

                this.$store.commit('resetImgClear');
                this.disableType = true;

                this.$emit('hideModal','person');
            },
            getIds(data) {
                //获取当前部门id
                this.treeVisabled = false
                let ids = data.id
                this.formData.deptName = data.deptName;
                this.formData.deptId = data.id;
            },
            getTree() {
                //获取组织架构数据
                let that = this
                this.$http({
                        method:"get",
                        url:api.treeList,
                        headers:headers('application/json;charset=utf-8'),
                        cache:false
                    }).then(function(res){
                        if(res.data.code==10000 || res.data.data==null){
                            that.treeDatas = res.data.data;

                        }else{
                            that.$message.error(res.data.msg);
                        }
                });
            },
            treeClick() {
              this.treeVisabled=!this.treeVisabled
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
            savePersonChange(fromName){
                //提交表单
                let that = this;
                let formData = new FormData();

                // this.$refs[fromName].validate((valid) => {
                    // if (valid) {
                        // that.disableType = false;
                        let effectiveDate = that.formData.effectiveDate;
                        effectiveDate = this.formateTime(effectiveDate);
                        formData.append('type',that.formData.type);
                        formData.append('employeeId',that.formData.employeeId);
                        formData.append('deptId',that.formData.deptId);
                        formData.append('position',that.formData.position);
                        formData.append('workType',that.formData.workType);
                        formData.append('effectiveDate',effectiveDate);
                        formData.append('workAddress',that.formData.workAddress);
                        formData.append('directlySuperior',that.formData.directlySuperior);
                        formData.append('remarks',that.formData.remarks);

                        that.formData.fileList.forEach((file,index) => {
                            formData.append('files', file.file)
                        });

                        this.$http({
                                    url:api.staffPersonChange,
                                    method:'POST',
                                    headers:headers('multipart/form-data'),
                                    data: formData,
                                }).then(function (res) {
                                    let result=res.data;
                                    if(result.code == 10000){
                                        that.$message(result.data);
                                        that.hideModel();
                                        that.$emit('personProcessChange')
                                    }else{
                                        that.$message.error(result.code + result.data);
                                    }
                                }).catch(function (error) {
                                    that.$message.error(error);
                                })
                    // } else {
                    //     that.$message.error('请完整填写表单');
                    //     return false;
                    // }
                // })


            },
        }
    };
</script>
<style scoped>
    @import './modal.css';
    .el-form-item.inline{
        display: inline-block;
        width: 58%;
        vertical-align: top;
    }
    .el-form-item.inline:nth-child(2n){
        display: inline-block;
        width: 40%;
        vertical-align: top;
    }

    .node_icon {
        color:#7A8699;
        margin-left:60px;
    }
    .node_icon:hover{
        color:#F95714;
    }
    .node_icon:visited {
        color:#F95714;
    }
    .el-form-item__content{
        position: relative;
    }
    .form_tree.tree_sty{
        height:370px;
        border: 1px solid #E5E5E5;
        overflow-x:hidden;
        overflow-y:auto;
        text-align:center;
        position: absolute;
        z-index: 10;
        background-color: #fff;
        width: 100%;
        max-width: 200px;
        min-width: 150px;
    }
    .el-icon-caret-bottom:before {
        content: "\E60B";
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .el-select{
        width: 100%;
    }
  .el-textarea__inner{
    resize: none;
  }
</style>
