<!--
    Author:周双
    日期：2018/11/27
-->
<template>
    <!-- 岗位信息 -->
    <div>
    <div class="uploadLeaveInfo3" >
        <button class="el-icon-edit icon_reset" @click="tag_revise(2)"></button>
        <div class="form">
            <div class="item">
                <label>工号</label>
                <input v-if="flag1"  type="number" placeholder="请输入工号"  v-model="employeeInfo.employeeNumber">
                <span v-else class="font_sty">{{employeeInfo.employeeNumber}}</span>
            </div>

            <div class="item">
                <label>企业邮箱</label>
                <input v-if="flag1"  type="text" placeholder="请输入企业邮箱" v-model="employeeInfo.enterpriseEmail">
                <span v-else class="font_sty">{{employeeInfo.enterpriseEmail}}</span>
            </div>

            <div class="item">
                <label>员工状态</label>
                <!-- <select v-if="flag1" name="" id="" v-model="employeeInfo.status">
                    <option value="0"> 在职 </option>
                    <option value="1"> 离职</option>
                </select> -->
                <span class="font_sty">{{employeeInfo.status == 0 ? "在职" : employeeInfo.status == 1 ? '离职' : ''}}</span>
            </div>

            <div class="item">
                <label>工作类型<span class="notice-red">*</span></label>
                <span class="font_sty">{{employeeInfo.workType == 0 ? '全职' : employeeInfo.workType == 1 ? '兼职' : employeeInfo.workType == 2 ? '实习' : ''}}</span>
            </div>

            <div class="item">
                <label>职位<span class="notice-red">*</span></label>
                <span class="font_sty">{{employeeInfoDetail.position}}</span>
            </div>

            <div class="item">
                <label>部门<span class="notice-red">*</span></label>
                <span class="font_sty">{{employeeInfoDetail.deptName}}</span>
            </div>

            <div class="item">
                <label>直接上级</label>
                <span class="font_sty">{{employeeInfo.directlySuperior}}</span>
            </div>

            <div class="item">
                <label>入职时间<span class="notice-red">*</span></label>
                <!-- <el-date-picker v-if="flag1" v-model="employeeInfo.entryTime" type="date" placeholder="请选择日期"></el-date-picker> -->
                <span class="font_sty">{{employeeInfo.entryTime}}</span>
            </div>

            <div class="item">
                <label>工作地点</label>
                <span class="font_sty">{{employeeInfo.workAddress}}</span>
            </div>

            <div class="item">
                <label>在职状态</label>
                <!-- <select name="" id="" v-if="flag1" v-model="employeeInfo.serviceSituation">
                    <option value="0">试用期</option>
                    <option value="1">已转正</option>
                </select>                 -->
                <span class="font_sty">{{employeeInfo.serviceSituation == 0 ? '试用期' : employeeInfo.serviceSituation == 1 ? '已转正' : ''}}</span>
            </div>

            <div class="item" v-if="employeeInfo.serviceSituation == 1">
                <label>实际转正日期</label>
                <!-- <el-date-picker v-if="flag1" v-model="employeeInfo.turnPositiveTime" type="date" placeholder="请选择日期"></el-date-picker> -->
                <span class="font_sty">{{employeeInfo.turnPositiveTime}}</span>
            </div>

            <div class="item" v-if="employeeInfo.workType == 0">
                <label>试用期月数</label>
                <!-- <select v-if="flag1" v-model="employeeInfo.probation" placeholder="请选择试用期月数">
                    <option value="1">1个月</option>
                    <option value="2">2个月</option>
                    <option value="3">3个月</option>
                    <option value="4">4个月</option>
                    <option value="5">5个月</option>
                    <option value="6">6个月</option>
                </select>  -->
                <span class="font_sty">{{employeeInfo.probation}} <i v-if="employeeInfo.serviceSituation == 0">（预计转正日期：{{personnelPromotionResponse.expectedTurnTome ? personnelPromotionResponse.expectedTurnTome : ''}}）</i></span>
            </div>

            <div v-if="flag1" style="text-align:center;">
                <el-button :plain="true"  class="btn_resite" @click="updataPostInfo()" >保存</el-button>
                <el-button class="btn-default" @click="tag_revise(2)">取消</el-button>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    export default {
        name:'postinfo',
        props:['employeeInfo','employeeInfoDetail','personnelPromotionResponse'],
        data() {
            return {
                flag1:false,//判断是否为编辑状态
                employeeNumber:'',
                enterpriseEmail:'',
                // status:'',
                // entryTime:'',
                // serviceSituation:'',
                // turnPositiveTime:'',
                // probation:''
            }
        },
        methods: {

        //修改切换
            tag_revise(val) {
                if(val=='2') {
                    if(this.flag1 == false){//获取表单原始值
                        this.employeeNumber = this.employeeInfo.employeeNumber;
                        this.enterpriseEmail = this.employeeInfo.enterpriseEmail;
                        // this.status = this.employeeInfo.status;
                        // this.entryTime = this.employeeInfo.entryTime;
                        // this.serviceSituation = this.employeeInfo.serviceSituation;
                        // this.turnPositiveTime = this.employeeInfo.turnPositiveTime;
                        // this.probation = this.employeeInfo.probation;

                    }else{//重置表单
                        this.employeeInfo.employeeNumber = this.employeeNumber;
                        this.employeeInfo.enterpriseEmail = this.enterpriseEmail;
                        // this.employeeInfo.status = this.status;
                        // this.employeeInfo.entryTime = this.entryTime;
                        // this.employeeInfo.serviceSituation = this.serviceSituation;
                        // this.employeeInfo.turnPositiveTime = this.turnPositiveTime;
                        // this.employeeInfo.probation = this.probation;
                    }

                    this.flag1 = !this.flag1;
                }
            },
            updataPostInfo(){

                let entryTime = this.employeeInfo.entryTime;
                if(!entryTime){
                    this.$message.error('请选择入职时间');
                    return;
                }

                let isSuccess = this.$emit('updateEmployeeInfo','postInfo');
                if(isSuccess){
                    this.flag1 = false;
                }
            }
        }

    }
</script>
<style scoped>
    @import './base.css';
</style>
