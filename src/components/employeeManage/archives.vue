<!-- 
    Author:周双
    日期：2018/11/27
-->
<template>
  <div>
  	<div class="main">
  		<!--顶部导航-->
  	<pageheader class="pageheader"></pageheader>
  		<!--侧边栏-->
  		<div class="aside">
  			<pageaside></pageaside>
  		</div>
  		<!--右侧内容栏-->
  		<div class="right-content pull-right">
  			<div class="content">
  				  <!--主体内容-->
            <p class="headline">
                <span @click="closeCurPage" style="cursor:pointer">员工列表</span>
                <span class="sub-tit">员工档案
                    <!-- <i class="close-icon"></i> -->
                </span>
            </p>
            <div class="uploadLeaveSetp2" >
                <div>
                    <div class="head-img">
                            <fileUploadHeadImg @getfile="getHeadImg" ref="headImg" :employeeInfo="employeeInfo"></fileUploadHeadImg>
                        <p>{{employeeInfo.employeeName}}</p>
                    </div>
                    <!-- 基本信息 -->
                    <basicinfo :employeeInfo="employeeInfo" @updateEmployeeInfo="updateEmployeeInfo" @changeHeadPhoto="changeHeadPhoto"></basicinfo>
                    <!--岗位信息  -->
                    <p class="uploadTitle">岗位信息（员工类型，部门，职位，直属上级，工作地点 需通过<span @click="modalVisable('person')" style="color:#F95714 ; cursor: pointer;">人事变更</span>来修改）</p>
                    <postinfo :employeeInfo="employeeInfo" :employeeInfoDetail="employeeInfoDetail" :personnelPromotionResponse="personnelPromotionResponse" @updateEmployeeInfo="updateEmployeeInfo"></postinfo>       
                      <!--联系人  -->
                    <!-- <lianxi :employeeInfo="employeeInfo" @updateEmployeeInfo="updateEmployeeInfo"></lianxi> -->
                    <!-- 薪资福利 -->
                    <salary :employeeSalary="employeeSalary" @updateSalary="updateSalary"></salary> 
										
                    <!-- 附件 -->
                    <p class="uploadTitle">附件</p>
                    <div class="uploadLeaveInfo3" >
                        <el-form>
<!--                            <el-form-item label="一寸免冠照" :label-width="formLabelWidth">
                                <fileupload @getfile="getHeadFiles" ref="headUpload" :fileUrled='employeeInfo.crownlessPhotoUrl' :imgName="'crownlessPhotoUrl'"></fileupload>
                            </el-form-item>  -->
                            <el-form-item label="身份证反面照片" :label-width="formLabelWidth">
                                <fileupload @getfile="getCardBackFiles" ref="cardBackUpload" :fileUrled='employeeInfo.reversePhotoUrl' :imgName="'reversePhotoUrl'"></fileupload>
                            </el-form-item> 
														
                            <el-form-item label="身份证正面照片" :label-width="formLabelWidth">
                                <fileupload @getfile="getCardFaceFiles" ref="cardFaceUpload" :fileUrled='employeeInfo.protraitPhotoUrl' :imgName="'protraitPhotoUrl'"></fileupload>
                            </el-form-item> 
														 
                            <el-form-item label="学历证明" :label-width="formLabelWidth">
                                <fileupload @getfile="getEducationFiles" ref="educationUpload" :fileUrled='annexEducation.httpUrl' :fileName='annexEducation.fileName' :fileId='annexEducation.id'></fileupload>
                            </el-form-item>
														
                            <el-form-item label="简历" :label-width="formLabelWidth">
                                <fileupload @getfile="getResumeFiles" ref="resumeUpload" :fileUrled='annexResume.httpUrl' :fileName='annexResume.fileName' :fileId='annexResume.id'></fileupload>
                            </el-form-item>   

                            <el-form-item label="入职体检" :label-width="formLabelWidth">
															<fileupload @getfile="getEntryExamination" ref="EntryExaminationUpload" :fileUrled='annexEntryExamination.httpUrl' :fileName='annexEntryExamination.fileName' :fileId='annexEntryExamination.id'></fileupload>
                            </el-form-item>  
														
                            <el-form-item label="上家离职证明" :label-width="formLabelWidth">
                                <fileupload @getfile="getResignCertFiles" ref="resignCertUpload" :fileUrled='annexResignCert.httpUrl' :fileName='annexResignCert.fileName' :fileId='annexResignCert.id'></fileupload>
                            </el-form-item> 
														
														<el-form-item label="照片" :label-width="formLabelWidth">
															<fileuploadList @getfile="getPhoto" ref="PhotoUpload" :fileUrled='PhotoList.httpUrl' :fileName='PhotoList.fileName' :fileId='PhotoList.id'></fileuploadList>
														</el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>	
			<!--主体内容end-->

            <!-- 弹窗-人事变更  -->
            <personalChange :visableModal.sync="visables.person" :employeeInfo="employeeInfo" :employeeInfoDetail="employeeInfoDetail" @hideModal="hideChildModal"></personalChange>
  		</div>
  	</div>
   </div>
  </div>
</template>

<script>
    import pageheader from '@/components/common/pageheader';
    import pageaside from '@/components/common/pageaside';
    import basicinfo from '@/components/common/personInfo/basicInfo';
    import postinfo from '@/components/common/personInfo/postInfo';
    // import lianxi from '@/components/common/personInfo/lianxi';
    import salary from '@/components/common/personInfo/salary';
    import personalChange from '@/components/employeeManage/modal/personalChange';
    import fileupload from '@/components/common/fileUploadFile';
		import fileuploadList from '@/components/common/fileUploadFileList';

    import fileUploadHeadImg from '@/components/common/fileUploadHeadImg';

    import http from '@/http/http';
    import api from '@/api/api.js';
    import {headers} from '@/assets/js/common/lp.js';

    export default {
        name: 'exposure',
        components: {
            pageheader,
            pageaside,
            basicinfo,
            postinfo,
            // lianxi,
            salary,
            personalChange,
            fileupload,fileUploadHeadImg,
						fileuploadList,
        },
        data(){
            return {
                formLabelWidth: '130px',
                dialogChange:false,
                employeeInfo:{},
                employeeInfoDetail:{},
                employeeSalary:{},
                personnelPromotionResponse:{},
                annexResume:{},
								annexEntryExamination:{},
                annexEducation:{},
                annexResignCert:{},
								PhotoList:{},//照片
                visables:{
                    person:false
                },
                form:{
                    name:'',
                    region:'',
                },
								imgList:[],
								employeeInfoSalary:{},//薪资福利
            };
        },
        created(){
            let that = this;
            var employeeId = this.$route.query.id;
            this.getStaffData(that, employeeId);    
        },
        methods: {
            //修改切换 
            tag_revise(val) {
                if(val=='1') {
                    this.flag = !this.flag
                }
            },
            closeCurPage(){
                this.$router.push('/indexList');
            },    
            modalVisable(param){
                this.visables[param] = true;
            },
            hideChildModal(param){
                this.visables[param]= false;
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
            changeHeadPhoto(){
                this.changeHeadImg(this,this.employeeInfo);
            },
            getStaffData(that, employeeId){
                //员工档案相关数据
                this.$http({
                            url:`${api.employeeArchives}/${employeeId}`,
                            method:'GET',
                            headers:headers('application/json;charset=utf-8'),
                        }).then(function (res) {

                            let resData = res.data;
                            // console.log(resData);
                            if(resData.code == 10000){

                                let data = resData.data;
                                that.employeeInfoDetail = data.employeeInfoDetailResponse;
                                that.employeeInfo = data.employeeInfo;
																
																that.employeeInfoSalary = data.employeeSalaryResponse;
																
																console.log(JSON.stringify(data.employeeSalaryResponse.employeeSalaryCardList)+"***");
																
                                if(!data.employeeSalaryResponse){
                                    that.employeeSalary = {
																			  id:id,
                                        employeeId:employeeId,
                                        basicWage:'',
                                        salaryCardNumber:'',
                                        socialSecurityAccount:'',
                                        performancePay:'',
                                        salaryBank:'',
                                        providentFundAccount:'',
																				employeeSalaryCardList:{}
                                    }
                                }else{
                                    that.employeeSalary = data.employeeSalaryResponse;
																		
                                }
                                
                                that.personnelPromotionResponse = data.personnelPromotionResponse;
                                let annexInfoArr = data.annexInfoResponseList;
                                annexInfoArr.forEach(element => {
                                    if(element.type == 3){//简历
                                        that.annexResume = element;
                                    }else if(element.type == 4){//学历
                                        that.annexEducation = element;
                                    }else if(element.type == 5){//离职
                                        that.annexResignCert = element;
                                    }else if(element.type == 7){//入职体检
																			that.annexEntryExamination = element;
																		}
                                });

                                //根据性别，年龄切花头像
                                if(!data.employeeInfo.profilePhotoUrl){
                                    that.changeHeadImg(that,data.employeeInfo);
                                }else{
                                    that.employeeInfo.profilePhotoUrl = data.employeeInfo.profilePhotoUrl;
                                }
      
                            }else{
                                that.$message.error(resData.msg);
                            }

                        }).catch(function (error) {
                            that.$message.error(error);
                        });
            },
            updateEmployeeInfo(){
                //更新员工相关信息
                let that = this;
                let entryTime = this.employeeInfo.entryTime;
                if(entryTime){
                    this.employeeInfo.entryTime = this.formateTime(entryTime);
                }

                let turnPositiveTime = this.employeeInfo.turnPositiveTime;
                if(turnPositiveTime){
                    this.employeeInfo.turnPositiveTime = this.formateTime(turnPositiveTime);
                }

                let employeeBrithday = this.employeeInfo.employeeBrithday;
                if(employeeBrithday){
                    this.employeeInfo.employeeBrithday = this.formateTime(employeeBrithday);
                }

                let baseInfo = {
                    accountNature:this.employeeInfo.accountNature,
                    deptId:this.employeeInfo.deptId,
                    directlySuperior:this.employeeInfo.directlySuperior,
                    employeeEmail:this.employeeInfo.employeeEmail,
                    employeeIdCard:this.employeeInfo.employeeIdCard,
                    employeeName:this.employeeInfo.employeeName,
                    employeeNumber:this.employeeInfo.employeeNumber,
                    employeePhone:this.employeeInfo.employeePhone,
                    entryTime:this.employeeInfo.entryTime,
                    highestEducation:this.employeeInfo.highestEducation,
                    position:this.employeeInfo.position,
                    probation:this.employeeInfo.probation,
                    workAddress:this.employeeInfo.workAddress,
                    workType:this.employeeInfo.workType,
                    id:this.employeeInfo.id,
                    enterpriseId:this.employeeInfo.enterpriseId,
                    employeeBrithday:this.employeeInfo.employeeBrithday,
                    employeeSex:this.employeeInfo.employeeSex,
                    status:this.employeeInfo.status,
                    position:this.employeeInfo.position,
                    turnPositiveTime:turnPositiveTime,
                    enterpriseEmail:this.employeeInfo.enterpriseEmail,
                    deptName:this.employeeInfo.deptName,
                    serviceSituation:this.employeeInfo.serviceSituation,
                    familyName:this.employeeInfo.familyName
                };

                this.$http({
										url:`${api.updataEmployee}`,
										method:'PUT',
										headers:headers('application/json;charset=utf-8'),
										data:JSON.stringify(baseInfo),
								}).then(function (res) {

										let resData = res.data;
										if(resData.code == 10000){
												 that.$message(resData.msg);
												 return true;
										}else{
												that.$message.error(resData.msg);
										}

								}).catch(function (error) {
										that.$message.error(error);
								});

            },
            updateSalary(){
                //更新员工薪资信息
                let that = this;
                let salaryInfo = {
									employeeSalary:{
										id:this.employeeSalary.id,
										basicWage:this.employeeSalary.basicWage,
										performancePay:this.employeeSalary.performancePay,
										employeeId:this.employeeSalary.employeeId || this.$route.query.id,
										socialSecurityAccount:this.employeeSalary.socialSecurityAccount,
										providentFundAccount:this.employeeSalary.providentFundAccount,
									},
									employeeSalaryCardList:this.employeeSalary.employeeSalaryCardList,	
                };
                this.$http({
										url:`${api.updateSalary}`,
										method:'PUT',
										headers:headers('application/json;charset=utf-8'),
										data:salaryInfo
								}).then(function (res) {

										let resData = res.data;
										if(resData.code == 10000){
												 that.$message(resData.msg);
												 return true;
										}else{
												that.$message.error(resData.msg);
										}

								}).catch(function (error) {
										that.$message.error(error);
								});

            },
            getHeadImg(fileList){
                //上传头像
                let that = this; 
                let formData = new FormData();
                formData.append('employeeId',this.$route.query.id);
                // formData.append('enterpriseId',this.employeeInfo.enterpriseId);
                formData.append('profilePhotoUrl',fileList);
                this.$http({
                            url:api.archivesUploadPhoto,
                            method:'POST',
                            headers:headers('multipart/form-data'),
                            data: formData,
                            processData: false,
                            contentType: false
                        }).then(function (res) {

                            let result=res.data;
                            if(result.code == 10000){
                                that.$refs.headImg.getFileUrl(result.data.profilePhotoUrl);
                                that.$message(result.msg);
                            }else{
                                that.$message.error(result.code + result.msg);
                            }
                        }).catch(function (error) {
                            that.$message.error(error);
                        });    
            },
            getHeadFiles(fileList){
                //获取上传证件照
                // console.log(fileList,'<================head');
                let that = this; 
                let formData = new FormData();
                formData.append('employeeId',this.$route.query.id);
                // formData.append('enterpriseId',this.employeeInfo.enterpriseId);
                formData.append('crownlessPhotoUrl',fileList);
                this.$http({
                            url:api.archivesUploadPhoto,
                            method:'POST',
                            headers:headers('multipart/form-data'),
                            data: formData,
                            processData: false,
                            contentType: false
                        }).then(function (res) {

                            let result=res.data;
                            if(result.code == 10000){
                                that.$refs.headUpload.getFileUrl(result.data.crownlessPhotoUrl);
                                that.$message(result.msg);
                            }else{
                                that.$message.error(result.code + result.msg);
                            }
                        }).catch(function (error) {
                            that.$message.error(error);
                        });             
            }, 
            getCardFaceFiles(fileList){
                //获取上传身份证正面照
                // console.log(fileList,'<================cardFace');
                let that = this;
                let formData = new FormData();
                formData.append('employeeId',this.$route.query.id);
                // formData.append('enterpriseId',this.employeeInfo.enterpriseId);
                formData.append('protraitPhotoUrl',fileList);
                
                this.$http({
                            url:api.archivesUploadPhoto,
                            method:'POST',
                            headers:headers('multipart/form-data'),
                            data: formData,
                        }).then(function (res) {

                            let result=res.data;
                            if(result.code == 10000){

                                that.$refs.cardFaceUpload.getFileUrl(result.data.protraitPhotoUrl);
                                that.$message(result.msg);
                            }else{
                                that.$message.error(result.code + result.msg);
                            }
                        }).catch(function (error) {
                            that.$message.error(error);
                        });  
            }, 
            getCardBackFiles(fileList){
                //获取上传身份证反面照
                // console.log(fileList,'<================cardBack');
                let that = this;
                let formData = new FormData();
                formData.append('employeeId',this.$route.query.id);
                // formData.append('enterpriseId',this.employeeInfo.enterpriseId);
                formData.append('reversePhotoUrl',fileList);

                this.$http({
                            url:api.archivesUploadPhoto,
                            method:'POST',
                            headers:headers('multipart/form-data'),
                            data: formData,
                        }).then(function (res) {

                            let result=res.data;
                            if(result.code == 10000){
                                that.$refs.cardBackUpload.getFileUrl(result.data.reversePhotoUrl);
                                that.$message(result.msg);
                            }else{
                                that.$message.error(result.code + result.msg);
                            }
                        }).catch(function (error) {
                            that.$message.error(error);
                        });  
            },  
						getEntryExamination(fileList){//入职体检
                let that = this;
                let formData = new FormData();
                formData.append('type','7');
                formData.append('employeeId',this.$route.query.id);
                // formData.append('enterpriseId',this.employeeInfo.enterpriseId);
                formData.append('file',fileList);

                this.$http({
										url:api.archivesUploadFile,
										method:'POST',
										headers:headers('multipart/form-data'),
										data: formData,
								}).then(function (res) {
										let result=res.data;
										if(result.code == 10000){
												// console.log(result);
												that.$refs.EntryExaminationUpload.getFileUrl(result.data);
												that.$message(result.msg);
										}else{
												that.$message.error(result.code + result.msg);
										}
								}).catch(function (error) {
										that.$message.error(error);
								});  
						},
            getResumeFiles(fileList){
                //获取上传简历
                // console.log(fileList,'<================resume');
                let that = this;
                let formData = new FormData();
                formData.append('type','3');
                formData.append('employeeId',this.$route.query.id);
                // formData.append('enterpriseId',this.employeeInfo.enterpriseId);
                formData.append('file',fileList);

                this.$http({
                            url:api.archivesUploadFile,
                            method:'POST',
                            headers:headers('multipart/form-data'),
                            data: formData,
                        }).then(function (res) {

                            let result=res.data;
                            if(result.code == 10000){
                                // console.log(result);
                                that.$refs.resumeUpload.getFileUrl(result.data);
                                that.$message(result.msg);
                            }else{
                                that.$message.error(result.code + result.msg);
                            }
                        }).catch(function (error) {
                            that.$message.error(error);
                        });  
            },    
            getEducationFiles(fileList){
                //获取上传学历
                // console.log(fileList,'<================education');
                let that = this;
                let formData = new FormData();
                formData.append('type','4');
                formData.append('employeeId',this.$route.query.id);
                // formData.append('enterpriseId',this.employeeInfo.enterpriseId);
                formData.append('file',fileList);

                this.$http({
                            url:api.archivesUploadFile,
                            method:'POST',
                            headers:headers('multipart/form-data'),
                            data: formData,
                        }).then(function (res) {

                            let result=res.data;
                            if(result.code == 10000){
                                that.$refs.educationUpload.getFileUrl(result.data);
                                that.$message(result.msg);
                            }else{
                                that.$message.error(result.code + result.msg);
                            }
                        }).catch(function (error) {
                            that.$message.error(error);
                        }); 
            },   
						getPhoto(fileList){//照片
                let that = this;
                let formData = new FormData();
                formData.append('type','6');
                formData.append('employeeId',this.$route.query.id);
                // formData.append('enterpriseId',this.employeeInfo.enterpriseId);
                formData.append('files',fileList);

                this.$http({
										url:api.archivesUploadFileList,
										method:'POST',
										headers:headers('multipart/form-data'),
										data: formData,
								}).then(function (res) {

										let result=res.data;
										if(result.code == 10000){
												that.$refs.PhotoUpload.getFileUrl(result.data);
												that.$message(result.msg);
										}else{
												that.$message.error(result.code + result.msg);
										}
								}).catch(function (error) {
										that.$message.error(error);
								}); 
						},
            getResignCertFiles(fileList){
                //获取上传离职证明
                // console.log(fileList,'<================resignCert');
                let that = this;
                let formData = new FormData();
                formData.append('type','5');
                formData.append('employeeId',this.$route.query.id);
                // formData.append('enterpriseId',this.employeeInfo.enterpriseId);
                formData.append('file',fileList);

                this.$http({
										url:api.archivesUploadFile,
										method:'POST',
										headers:headers('multipart/form-data'),
										data: formData,
								}).then(function (res) {

										let result=res.data;
										if(result.code == 10000){
												that.$refs.resignCertUpload.getFileUrl(result.data);
												that.$message(result.msg);
										}else{
												that.$message.error(result.code + result.msg);
										}
								}).catch(function (error) {
										that.$message.error(error);
								}); 
            },        
        },
      mounted(){

      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* @import url("./common/archives/index.css"); */
    @import './staff.css';
    .form .item label{
        width: 113px;
        font-size: 14px;
        color: #394A66 ;
    }
    .head-img>img{
        padding-top:24px;
        display: block;
        width: 120px;
        height:120px;
        margin:0 auto 12px;
    }
    .head-img>p{
        text-align:center;
        font-size: 24px;
        color: #394A66;
        /* margin-bottom:54px; */
    }
    .el-form{
        margin-top:30px;
        margin-bottom:30px;
    }
    .upload-demo{
        text-align:left;
    }
    .el-form-item{
        box-sizing:border-box;
        display:inline-block;
        width:48%;
        vertical-align: top;
    }
    @media (max-width: 1200px) {
        .el-form-item{
            width: 100%;
        }
    }
</style>
