<!-- 
    Author:周双
    日期：2018/11/27
-->
<template>
    <div>
       <p class="uploadTitle">联系人</p>
        <div class="uploadLeaveInfo3" >
            <button class="el-icon-edit icon_reset" @click="tag_revise(3)"></button>
            <div class="form">
                <div class="item">
                    <label>联系人</label>
                    <input v-if="flag2"  type="text" placeholder="请输入联系人" v-model="employeeInfo.familyName">
                    <span v-else class="font_sty">{{employeeInfo.familyName}}</span>
                </div>

                <div class="item">
                    <label>入职时间</label>
                    <el-date-picker v-if="flag2" v-model="employeeInfo.entryTime" type="date" placeholder="请选择日期" @change="formatEleTime"></el-date-picker>
                    <span v-else class="font_sty">{{employeeInfo.entryTime}}</span>
                </div>

                <div class="item">
                    <label>试用期月数</label>
                    <select v-if="flag2" v-model="employeeInfo.probation" placeholder="请选择试用期月数">
                        <option value="1">1个月</option>
                        <option value="2">2个月</option>
                        <option value="3">3个月</option>
                        <option value="4">4个月</option>
                        <option value="5">5个月</option>
                        <option value="6">6个月</option>
                    </select> 
                    <span v-else class="font_sty">{{employeeInfo.probation}}</span>
                </div>  

                <div v-if="flag2" style="text-align:center;">
                    <el-button :plain="true" class="btn_resite" @click="updatalanxiInfo()">保存</el-button>
                    <el-button class="btn-default" @click="tag_revise(3)">取消</el-button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'lianxi'  ,
        props:['employeeInfo'],
        data() {
            return {
                flag2:false,//判断是否为编辑状态
                formLabelWidth: '120px',
                familyName:'',
                entryTime:'',
                probation:''
                
            }  
        },
        methods: {
            //修改切换 
            tag_revise(val) {
                if(val=='3') {
                    if(this.flag2 == false){//获取表单原始值
                        this.familyName = this.employeeInfo.familyName;
                        this.entryTime = this.formateTime(this.employeeInfo.entryTime);
                        this.probation = this.employeeInfo.probation;
                        
                    }else{//重置表单
                        this.employeeInfo.familyName = this.familyName;
                        this.employeeInfo.entryTime = this.entryTime;
                        this.employeeInfo.probation = this.probation;
                    }
                    this.flag2 = !this.flag2;
                }
            },
            updatalanxiInfo(){
                let isSuccess = this.$emit('updateEmployeeInfo','lanxiInfo');
                if(isSuccess){
                    this.flag2 = false;
                }
            },
            formatEleTime(){
                this.employeeInfo.entryTime = this.formateTime(this.employeeInfo.entryTime);
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
                }else{
                    return argTime;
                }
            },
        }

    }
</script>
<style scoped>
    @import './base.css';
    .form .item{
        width: 100%;
    }
</style>
