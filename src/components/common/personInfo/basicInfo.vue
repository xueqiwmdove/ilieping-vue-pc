<!-- 
    Author:周双
    日期：2018/11/27
-->
<template>
    <div>
        <p class="uploadTitle">基本信息</p>
        <div class="uploadLeaveInfo3" >
            <button class="el-icon-edit icon_reset" @click="tag_revise(1)"></button>
            <div class="form">
                <div class="item">
                    <label>姓名<span class="notice-red">*</span></label>
                    <!-- <input v-if="flag"  type="text" placeholder="请输入姓名" v-model="employeeInfo.employeeName" ref="name" required> -->
                    <span class="font_sty">{{employeeInfo.employeeName}}</span>
                </div>

                <div class="item">
                    <label>性别</label>
                    <!-- <select v-if="flag" name="" id="" v-model="employeeInfo.employeeSex" ref="sex" @change="changeHImg()">
                        <option value="0">女</option>
                        <option value="1">男</option>
                    </select> -->
                    <span class="font_sty">{{employeeInfo.employeeSex == 0 ? '女' : employeeInfo.employeeSex == 1 ? '男' : ''}}</span>
                </div>

                <div class="item">
                    <label>生日</label>
                    <!-- <el-date-picker v-if="flag" v-model="employeeInfo.employeeBrithday" type="date" placeholder="请选择日期" ref="brithday" @change="changeHImg()"></el-date-picker> -->
                    <span class="font_sty">{{employeeInfo.employeeBrithday}}</span>
                </div> 

                <div class="item">
                    <label>手机号<span class="notice-red">*</span></label>
                    <!-- <input v-if="flag"  type="text" placeholder="请输入手机号" v-model="employeeInfo.employeePhone"  maxlength="11" ref="phone" required> -->
                    <span class="font_sty">{{employeeInfo.employeePhone}}</span>
                </div>

                <div class="item">
                    <label>身份证<span class="notice-red">*</span></label>
                    <!-- <input v-if="flag"  type="text" placeholder="请输入身份证" v-model="employeeInfo.employeeIdCard" maxlength="18" ref="idCard" required> -->
                    <span class="font_sty">{{employeeInfo.employeeIdCard}}</span>
                </div>

                <div class="item">
                    <label>个人邮箱</label>
                    <input v-if="flag" type="text" placeholder="请输入邮箱" v-model="employeeInfo.employeeEmail" ref="email">
                    <span v-else class="font_sty">{{employeeInfo.employeeEmail}}</span>
                </div>

                <div class="item">
                    <label>户口性质</label>
                    <!-- <select v-if="flag" v-model="employeeInfo.accountNature" ref="accountNature">
                        <option value="0">城市</option>
                        <option value="1">农村</option>
                    </select> -->
                    <el-select v-if="flag" v-model="accountNature" placeholder="请选择户口性质" ref="accountNature">
                        <el-option v-for="(nature, index) in natures" :label="nature.label" :value="nature.value" :key="index"></el-option>
                        <!-- <el-option label="农村" value="1"></el-option> -->
                    </el-select>
                    <span v-else class="font_sty">{{employeeInfo.accountNature == 1 ? '城市' : employeeInfo.accountNature == 0 ? '农村' : ''}}</span>
                </div>

                <div class="item">
                    <label>最高学历</label>
                    <input v-if="flag"  type="text" placeholder="请输入职位" v-model="employeeInfo.highestEducation" ref="education">
                    <span v-else class="font_sty">{{employeeInfo.highestEducation}}</span>
                </div>

                <div v-if="flag" style="text-align:center;">
                    <el-button  class="btn_resite" :plain="true"  @click="updateBaseInfo()">保存</el-button>
                    <el-button class="btn-default"  @click="tag_revise(1)">取消</el-button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'basicinfo'  ,
        props:['employeeInfo'],
        data() {
            return {
                flag:false,//判断是否为编辑状态
                natures:[
                        {
                           label: '城市',
                           value: '1'
                        },
                        {
                           label: '农村',
                           value: '2'
                        }
                    ],
                // brithday:'',
                // name:'',
                // sex:'',
                email:'',
                // phone:'',
                accountNature:'',
                education:'',
                // idCard:'',
            }  
        },
        methods: {
        //修改切换 
            tag_revise(val) {
                if(val=='1') {
                    
                    if(this.flag == false){//获取表单原始值
                        // this.brithday = this.employeeInfo.employeeBrithday;
                        // this.name = this.employeeInfo.employeeName;
                        // this.sex = this.employeeInfo.employeeSex;
                        this.email = this.employeeInfo.employeeEmail;
                        // this.phone = this.employeeInfo.employeePhone;
                        // this.idCard = this.employeeInfo.employeeIdCard;
                        this.accountNature = this.employeeInfo.accountNature == 0 ? '城市' : this.employeeInfo.accountNature == 1 ? '农村' : '';
                        this.education = this.employeeInfo.highestEducation;
                        
                    }else{//重置表单
                        // this.employeeInfo.employeeBrithday = this.brithday;
                        // this.employeeInfo.employeeName = this.name;
                        // this.employeeInfo.employeeSex = this.sex;
                        this.employeeInfo.employeeEmail = this.email;
                        // this.employeeInfo.employeePhonem = this.phone;
                        // this.employeeInfo.employeeIdCard = this.idCard;
                        this.employeeInfo.accountNature = this.accountNature;
                        this.employeeInfo.highestEducation = this.education;

                        this.changeHImg();
                    }
                    this.flag = !this.flag;
                }
            },
            changeHImg(){
                //线上图片地址正则
                let urlReg = /^((https|http|ftp|rtsp|mms){1}(:\/\/){1})/;
                if(!urlReg.test(this.employeeInfo.profilePhotoUrl)){
                    this.$emit('changeHeadPhoto');
                }
            },
            updateBaseInfo(){

                let employeeName= this.employeeInfo.employeeName;
                let employeePhone= this.employeeInfo.employeePhone;
                let employeeIdCard= this.employeeInfo.employeeIdCard;
                
                if(employeeName == ""){
                    this.$message.error('必填项不能为空');
                    return;
                }
                const phoneReg = /^1[3|4|5|6|7|8]\d{9}$/;
                if(!phoneReg.test(employeePhone)){
                    this.$message.error('请正确填写手机号');
                    return;
                }
                const cardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if(!cardReg.test(employeeIdCard)){
                    this.$message.error('请正确填写身份证号');
                    return;
                }
                
                this.employeeInfo.accountNature = this.accountNature;
                let isSuccess = this.$emit('updateEmployeeInfo','baseInfo');
                if(isSuccess){
                    this.flag = false;
                }
            }
        }

    }
</script>
<style scoped>
    /* @import url("../../employeeManage/common/archives/index.css"); */
    @import './base.css';
</style>
