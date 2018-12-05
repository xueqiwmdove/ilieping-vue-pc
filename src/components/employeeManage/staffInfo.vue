<!-- 
    Author:周双
    日期：2018/11/27
-->
<template>
  	<div class="main">

  		<!--顶部导航-->
  	    <pageheader class="pageheader"></pageheader>
  		<!--侧边栏-->
  		<div class="aside">
  			<pageaside></pageaside>
  		</div>
  		<!--右侧内容栏-->
        <div class="right-content pull-right">
            <div class="content"><!--主体内容-->
            
                <p class="headline">
                    <span @click="closeCurPage" style="cursor:pointer">员工列表</span>
                    <span class="sub-tit">员工资料
                        <!-- <i class="el-icon-close" ></i> -->
                    </span>
                </p>

                <div class="base-info-box">
                    <img :src="employeeInfo.profilePhotoUrl" class="head-photo" alt="头像图片">
               
                    <div class="base-info">
                        <h3 class="staff-name">{{employeeInfoDetail.employeeName}}</h3>
                        <dl class="job-info">
                            <dt>部门：</dt>
                            <dd>{{employeeInfoDetail.deptName}}</dd>
                            <dt>岗位：</dt>
                            <dd>{{employeeInfoDetail.position}}</dd>
                        </dl>
                        <dl class="contact-info">
                            <dt><i class="phone-icon"></i></dt>
                            <dd>{{employeeInfoDetail.employeePhone}}</dd>
                            <dt><i class="email-icon"></i></dt>
                            <dd>{{employeeInfoDetail.employeeEmail}}</dd>
                        </dl>                        
                    </div>
                </div>

                <div class="btn-group">
                    <a href="javascript:void(0)" @click="modalVisable('person')">人事变更</a>
                    <!-- <a href="javascript:void(0)" @click="routeToArchive">编辑资料</a> -->
                    <router-link :to="{path:'/archives',query: { id:id}}">编辑资料</router-link>
                    <a href="javascript:void(0)" v-if="employeeInfo.workType == 0" @click="modalVisable('positive')">提前转正</a>
                    <a href="javascript:void(0)" @click="modalVisable('resignation')">办理离职</a>
                    <a href="javascript:void(0)" @click="modalVisable('del')">删除员工</a>

                    <router-link :to="{path:'/contractManagement',query: { id: id }}" v-if='employeeInfo.isSign == 1'>查看合同</router-link>
                    <router-link :to="{path:'/bySinging',query: { id: id }}" v-else>签署合同</router-link>
                </div>

                <div class="staff-box">
                    <div class="staff-peofile">
                        <p class="staff-tit">
                            <span>员工档案</span>
                            <router-link :to="{path:'/archives',query: { id: id}}">查看详情</router-link>
                        </p>
                        <div class="info-content" ref="info1" :style="{height:infoH}">
                            <dl>
                                <dt>工　　号</dt>
                                <dd>{{employeeInfo.employeeNumber}}</dd>
                                <dt>工作类型</dt>
                                <dd>{{employeeInfo.workType == 0 ? '全职' : employeeInfo.workType == 1 ? ' 兼职' : '实习'}}</dd>
                                <dt v-if="!personnelPromotionResponse.flag && employeeInfo.workType == 0">预计转正日期</dt>
                                <dd v-if="!personnelPromotionResponse.flag && employeeInfo.workType == 0">{{personnelPromotionResponse.expectedTurnTome}}</dd>
                                <dt v-if="personnelPromotionResponse.flag && employeeInfo.workType == 0">实际转正日期</dt>
                                <dd v-if="personnelPromotionResponse.flag && employeeInfo.workType == 0">{{employeeInfo.turnPositiveTime}}</dd>
                                <dt>直属上级</dt>
                                <dd>{{employeeInfo.directlySuperior}}</dd>
                                <dt>入职日期</dt>
                                <dd>{{employeeInfo.entryTime}}</dd>
                                <dt>个人邮箱</dt>
                                <dd>{{employeeInfo.employeeEmail}}</dd>
                            </dl>
                        </div>
                    </div>
                    <div class="staff-process">
                        <p class="staff-tit">
                            <span>人事流程</span>
                            <router-link :to="{path:'/hr',query: { employeePhone: employeeInfoDetail.employeePhone }}">查看详情</router-link>
                        </p>

                        <div class="info-content" ref="info2" :style="{height:infoH}">
                            <dl>
                                <dt>{{ personProcess ? (personProcess.processTitle ? personProcess.processTitle : '') : ''}} </dt>
                                <dd>{{personProcess ? (personProcess.status == 0 ? '已撤销': personProcess.status == 1 ? '已生效' : '即将生效') : ''}}</dd>
                            </dl>
                        </div>                      
                    </div>
                </div>

                <process-box :process="process" ref="processtag"></process-box>

            </div>
        </div>
        <personalChange :visableModal.sync="visables.person" :employeeInfo="employeeInfo" :employeeInfoDetail="employeeInfoDetail" @hideModal="hideChildModal" @personProcessChange="personProcessChange"></personalChange>
        <resignation :visableModal.sync="visables.resignation" :employeeInfo="employeeInfo" @hideModal="hideChildModal"></resignation>
        <turnPositive :visableModal.sync="visables.positive" :employeeInfo="employeeInfo" @hideModal="hideChildModal"></turnPositive>
        <notice :visableModal.sync="visables.del" @hideModal="hideChildModal"></notice>
   </div>
</template>

<script>
    import http from '@/http/http'
    import api from '@/api/api.js';
    import {headers} from '@/assets/js/common/lp.js'
    import store from '@/store/store';

    import pageheader from '@/components/common/pageheader';
    import pageaside from '@/components/common/pageaside';
    import personalChange from '@/components/employeeManage/modal/personalChange';
    import resignation from '@/components/employeeManage/modal/resignation';
    import turnPositive from '@/components/employeeManage/modal/turnPositive';
    import notice from '@/components/employeeManage/modal/notice';
    import processBox from '@/components/employeeManage/modal/processBox';

    export default {
        name: 'staffInfo',
        components: {
            pageheader,
            pageaside,
            personalChange,resignation,turnPositive,notice,
            processBox
        },
        data() {
            return {
                infoH:'',
                id:this.$route.query.id,
                employeeInfoDetail:{},
                employeeInfo:{},
                personProcess:{},
                personnelPromotionResponse:{},
                isTurn:false,
                visables:{
                    person:false,
                    positive:false,
                    resignation:false,
                    del:false,
                },
                process:[],
                processLen:0
            }
        },
        created(){
            let that = this;
            var employeeId = this.$route.query.id;
            this.getStaffData(that, employeeId);
            this.getProcessData(that, employeeId);
            this.getPersonProcessData(that, employeeId);
        },
        methods: {
            setIsTurn(){
                let nowTime = new Date().getTime();
                let turnTime = new Date(this.employeeInfo.turnPositiveTime).getTime();
                if(nowTime >= turnTime){
                    this.isTurn = true;
                }else{
                    this.isTurn = false;
                }
            },
            closeCurPage(){
                this.$router.push('/indexList');
            },
            modalVisable(param){
                this.$store.commit('resetImgInit');
                this.visables[param] = true;
            },
            hideChildModal(param){
                this.visables[param]= false;
            },
            routeToArchive(){
                this.router.push('/archive');
            },
            getStaffData(that, employeeId){
                //员工档案相关数据
                this.$http({
                            url:`${api.employeeArchives}/${employeeId}`,
                            method:'GET',
                            headers:headers('application/json;charset=utf-8'),
                        }).then(function (res) {

                            let resData = res.data;
                            if(resData.code == 10000){
                                that.employeeInfoDetail = resData.data.employeeInfoDetailResponse;
                                that.employeeInfo = resData.data.employeeInfo;
                                that.personnelPromotionResponse = resData.data.personnelPromotionResponse;

                                let profilePhotoUrl = resData.data.employeeInfo.profilePhotoUrl;
                                if(!profilePhotoUrl){
                                    that.changeHeadImg(that,resData.data.employeeInfo);
                                }else{
                                    that.employeeInfo.profilePhotoUrl = profilePhotoUrl;
                                }
        
                                //当前时间
                                that.setIsTurn();

                            }else{
                                that.$message.error(resData.msg);                                
                            }

                        }).catch(function (error) {
                            that.$message.error(error);
                        });
            },
            personProcessChange(){
                this.getProcessData(this,this.$route.query.id);
            },
            getProcessData(that, employeeId){
                //员工历程相关数据
                this.$http({
                            url:`${api.employeeProcess}/${employeeId}`,
                            method:'GET',
                            headers:headers('application/json;charset=utf-8'),
                        }).then(function (res) {

                            let resData = res.data;
                            if(resData.code == 10000){
                                that.process = resData.data;
                                that.$refs.processtag.getTransWidth(that.process);
                            }else{
                                that.$message.error(resData.msg);
                            }

                        }).catch(function (error) {
                            that.$message.error(error);
                        });
            },
            getPersonProcessData(that, employeeId){
                //人事流程相关数据
                this.$http({
                            url:api.staffList,
                            method:'POST',
                            headers:headers('application/json;charset=utf-8'),
                            data:{
                                employeeId:employeeId
                            }
                        }).then(function (res) {
                            let resData = res.data;
                            if(resData.code == 10000){
                                that.personProcess = resData.data[0];
                                // that.$message(resData.msg);
                            }else{
                                that.$message.error(resData.msg);
                            }

                        }).catch(function (error) {
                            that.$message.error(error);
                        });
            },
            getAge(birthday){   
                //根据生日计算年龄
                let age;
                let birthTime = new Date(birthday);
                let birthYear = birthTime.getFullYear();
                let birthMonth = birthTime.getMonth() + 1;
                let birthDay = birthTime.getDate();
                
                let d = new Date();
                var nowYear = d.getFullYear();
                var nowMonth = d.getMonth() + 1;
                var nowDay = d.getDate();
                
                if(nowYear == birthYear){//如果当前年份等于出生年份
                    age = 0;
                }else{
                    var yearDiff = nowYear - birthYear ; //年之差
                    if(yearDiff > 0){
                        if(nowMonth == birthMonth) {//如果当前月份份等于出生月份
                            var dayDiff = nowDay - birthDay;//日之差
                            if(dayDiff < 0){
                                age = yearDiff - 1;
                            }
                            else{
                                age = yearDiff ;
                            }
                        }else{
                            var monthDiff = nowMonth - birthMonth;//月之差
                            if(monthDiff < 0){
                                age = yearDiff - 1;
                            }
                            else{
                                age = yearDiff ;
                            }
                        }
                    }else{
                        age = -1;//返回-1 表示出生日期输入错误 晚于今天
                    }
                }
                return age;//返回周岁年龄
            },
            changeHeadImg(that,employeeInfo){
                //根据性别，年龄切花头像
                let employeeAge = this.getAge(employeeInfo.employeeBrithday);

                    if(employeeInfo.employeeSex == 0){ //女

                        if(employeeAge <= 18){//女年龄段
                            that.employeeInfo.profilePhotoUrl = require('../../assets/img/dismission/women_0_18.svg');

                        }else if(employeeAge >= 33 && employeeAge <= 45){
                            that.employeeInfo.profilePhotoUrl = require('../../assets/img/dismission/women_33_45.svg');

                        }else if(employeeAge >= 46 && employeeAge <= 60){
                            that.employeeInfo.profilePhotoUrl = require('../../assets/img/dismission/women_46_60.svg');

                        }else if(employeeAge >= 60){
                            that.employeeInfo.profilePhotoUrl = require('../../assets/img/dismission/women_60＋.svg');

                        }else{
                            that.employeeInfo.profilePhotoUrl = require('../../assets/img/dismission/women_19_32.svg');
                        }

                    }else{ //男
                        if(employeeAge >= 19 && employeeAge <= 32){
                            that.employeeInfo.profilePhotoUrl = require('../../assets/img/dismission/men_19_32.svg');

                        }else if(employeeAge >= 33 && employeeAge <= 45){
                            that.employeeInfo.profilePhotoUrl = require('../../assets/img/dismission/men_33_45.svg');

                        }else if(employeeAge >= 46 && employeeAge <= 60){
                            that.employeeInfo.profilePhotoUrl = require('../../assets/img/dismission/men_46_60.svg');

                        }else if(employeeAge >= 60){
                            that.employeeInfo.profilePhotoUrl = require('../../assets/img/dismission/men_60+.svg');

                        }else{
                            that.employeeInfo.profilePhotoUrl = require('../../assets/img/dismission/men_0_18.svg');

                        }
                    };
            },
        },
        mounted(){
            //设置等高
            const info1H = this.$refs.info1.offsetHeight;
            const info2H = this.$refs.info2.offsetHeight;
            info1H > info2H?this.infoH = `${info1H}px`:this.infoH = `${info2H}px`;  

            //当窗口大小改变时重新设置组件宽度
            let that = this;
            window.onresize = () => {
                that.$refs.processtag.getTransWidth(that.process);
            }
            
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import 'staff.css';
    .main{
        min-width: 1000px;
    }
    .right-content{
        min-width: 800px;
    }
    .base-info-box{
        padding-top: 10px;
        background: #FAFBFC;
        border-bottom: 1px solid #E5E5E5; 
    }
    .base-info{
        display: inline-block;
    }
    .staff-name{
        text-align: left;
        font-size: 28px;
        color: #394A66;
        margin-bottom: 30px;
    }
    .job-info{
        font-size: 18px;
        color: #394A66;
        padding-bottom: 16px;
    }
    .job-info dt,.job-info dd{
        display: inline-block;
    }
    .job-info dd{
        margin-right: 48px;
    }
    .contact-info{
        font-size: 0;
        color: #394A66;
        margin-bottom: 30px;
    }
    .contact-info dt,.contact-info dd{
        font-size: 14px;
        display: inline-block;
        vertical-align: middle;
    }
    .contact-info dd{
        margin-right: 24px;
        margin-left: 8px;
    }
    .btn-group{
        padding-left: 20px;
        margin-top: 30px;
        margin-bottom: 30px;
        font-size: 0;
    }
    .btn-group a{
        display: inline-block;
        width: 100px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #394A66;
        text-align: center;
        margin-right: 20px;
        margin-bottom: 10px;
        border: 1px solid #E5E5E5;
        border-radius: 2px;
    }

    .staff-box>div{
        display: inline-block;
        width: calc(50% - 13px);
        vertical-align: top;
        margin-top: 30px;
        margin-right:20px; 
        margin-bottom: 30px;
        min-width: 300px;
        /* box-sizing: border-box; */
    }
    .staff-box>div:last-child{
        margin-right:0; 
    }
    .staff-tit{
        display: flex;
        justify-content: space-between;
        padding:15px 20px;
        font-size: 16px;
        color: #394A66;
        background: #FAFBFC;
        border: 1px solid #E5E5E5;
        border-left-color: #F95714;
        border-left-width: 2px;
    }
    .staff-tit>a{
        display: inline;
        font-size: 14px;
        color: #2569F6;
    }
    .info-content{
        min-height: 158px;
        font-size: 0;
        padding:24px 20px 30px 20px;
        border: 1px solid #E5E5E5;
        border-top:0;
    }
    .info-content>dl{
        display: inline-block;
        width: 100%;
    }
    .info-content>dl>dt,.info-content>dl>dd{
        display: inline-block;
        font-size: 14px;
        padding-bottom: 20px;
        vertical-align: top;
    }
    .info-content>dl>dt{
        text-align: right;
        color: #97A2B3;
        width: 84px;
        margin-right: 15px;
    }
    .info-content>dl>dd{
        color: #394A66;
        width: calc(100% - 100px);
    }
</style>
