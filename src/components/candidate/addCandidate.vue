<template>
  <!--添加候选人弹窗-->
  <div>
    <el-dialog title="添加候选人" :visible="addVisible"  :custom-class='customclass' :before-close="hideModel"><!---->
      <!--<img src="../../assets/img/candidate/tanchuang_ic_save.png" class="save">-->
      <div class="addMain">
        <!--标准简历才有-->
        <!--<standardBasic v-if="flag==2"></standardBasic>-->

        <!--<addCandidate_content @my-event="getMyEvent"></addCandidate_content>-->
        <!--父组件中通过监测my-event事件执行一个方法，然后取到子组件中传递过来的值-->
        <!--<addCandidate_right></addCandidate_right>-->

        <!--标准简历才有-->
        <!--<div class="standard_required" v-if="flag==2">
          <div class="basic">
            <div class="inputBox">
              <img src="../../assets/img/candidate/tanchuang_ic_name.png" alt="">
              <el-input v-model="name" placeholder="请输入候选人姓名"></el-input>
            </div>
            <div class="inputBox">
              <img src="../../assets/img/candidate/tanchuang_ic_jobs.png" alt="">
              <el-select v-model="post1" placeholder="选择岗位">
                <el-option v-for="item in post1Data" :key="item.name" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
            <div class="inputBox">
              <img src="../../assets/img/candidate/tanchuang_ic_channel.png" alt="">
              <el-select v-model="channels" placeholder="面试渠道">
                <el-option v-for="item in channelsData" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="inputBox">
              <img src="../../assets/img/candidate/tanchuang_ic_source.png" alt="">
              <el-select v-model="resoure" placeholder="选择来源">
                <el-option v-for="item in resoureData" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>

            <div class="inputBox">
              <img src="../../assets/img/candidate/tanchuang_ic_gender.png" alt="">
              <el-select v-model="sex" placeholder="请选择候选人性别">
                <el-option v-for="item in sexData" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="inputBox">
              <img src="../../assets/img/candidate/tanchuang_ic_age.png" alt="">
              <el-input v-model="age" placeholder="请输入年龄"></el-input>
            </div>
            <div class="inputBox">
              <img src="../../assets/img/candidate/tanchuang_ic_phnnenumber.png" alt="">
              <el-input v-model="phone" placeholder="请输入手机号"></el-input>
            </div>
            <div class="inputBox">
              <img src="../../assets/img/candidate/tanchuang_ic_email.png" alt="">
              <el-input v-model="email" placeholder="请输入邮箱号码"></el-input>
            </div>
            <div class="inputBox">
              <img src="../../assets/img/candidate/tanchuang_ic_exp.png" alt="">
              <el-select v-model="experience" placeholder="请选择工作经验"  @change="selectExperience">
                <el-option v-for="item in experienceData" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="inputBox">
              <img src="../../assets/img/candidate/tanchuang_ic_exp.png" alt="">
              <el-select v-model="education1" placeholder="请选择学历">
                <el-option v-for="item in educationData" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="inputBox">
              <img src="../../assets/img/candidate/tanchuang_ic_place.png" alt="">
              <el-input v-model="address" placeholder="所在地"></el-input>
            </div>
          </div>
        </div>-->

        <div class="addCandidate_content">

          <div :class="flag==2?'standard_status_active':''">
            <ul class="tab_title">
              <li @click="changeTab(1)" :class="flag==1?'active':''">原始简历</li>
              <li @click="changeTab(2)" :class="flag==2?'active':''">标准简历</li>
             <!-- <li class="button" v-if="flag==2">
                <img src="../../assets/img/candidate/tanchuang_ic_download.png" class="upload">
                <img src="../../assets/img/candidate/tanchuang_ic_print.png" class="print">
              </li>-->
            </ul>
            <div class="headImg" v-if="flag==2">
              <!--<fileUploadHeadImg @getfile="getHeadImg" ref="headImg" ></fileUploadHeadImg>-->
              <img v-if="imgcode ==''"src="../../assets/img/candidate/tanchuang_ic_head.png" >
              <img v-if="imgcode !=''" :src="imgcode"  style="width: 80px;height: 80px;border-radius: 50%;">
              <input  type="file" accept="image/*"  @change="uploadPhoto($event)"/>
              <p class="el-upload__tip">点击头像可上传照片，支持JPG/PNG等图片格式，最大不超过2M</p>
            </div>
          </div>
          <!--原始简历-->
          <div v-if="flag==1" class="original_resume">
          <!--  <label style="margin: 0 0 0 20px">请先选择简历来源 <i style="color:#f95714">*</i></label>
            <el-select v-model="resumeType" placeholder="请选择"  >
              <el-option
                v-for="item in resumeTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>-->
            <el-upload
              class="upload-demo"
              drag
              :before-upload="beforeAvatarUpload"
              :action="uploadUrl()"
              :headers="myHeader"
              :data="data"
              multiple>
              <i class="el-icon-upload">
                <img src="../../assets/img/candidate/tanchuang_pic_upload.png" alt="">
              </i>
              <p class="el-upload__text">将建立拖至此处自动上传或<em>选择文件上传</em></p>
              <p class="el-upload__text">目前暂时支持WORD简历格式</p><!--支持PDF/TXT/WORD/WPS等简历格式-->
            </el-upload>
          </div>
          <!--标准简历-->
          <div v-if="flag==2" class="standard_resume">
            <el-row>
              <el-col  :span="24">
                <el-form :rules="rules" :model="form" ref="form">
                  <p class="headLine">基本信息</p>
                  <div class="personInfo">
                    <el-row :gutter="80">
                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="姓名"  prop="name">
                          <el-input v-model.trim="form.name" placeholder="请输入候选人姓名"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="岗位"  prop="post1">
                          <el-select v-model="form.post1" placeholder="选择岗位">
                            <el-option v-for="item in post1Data" :key="item.name" :label="item.name" :value="item.id"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="手机号码"   prop="phone">
                          <el-input v-model.trim="form.phone" placeholder="请输入手机号" maxlength="11"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="80">
                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="邮箱号码"  prop="email">
                          <el-input v-model.trim="form.email" placeholder="请输入邮箱号码"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="面试渠道">
                          <el-select v-model="channels" placeholder="面试渠道">
                            <el-option v-for="item in channelsData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="来源">
                          <el-select v-model="resoure" placeholder="选择来源">
                            <el-option v-for="item in resoureData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="80">
                      <el-col :lg="8" :md="8" :sm="8">
                          <el-form-item label="性别">
                            <el-select v-model="sex" placeholder="请选择候选人性别">
                              <el-option v-for="item in sexData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                          </el-form-item>
                      </el-col>
                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="年龄"  prop="age">
                          <el-input v-model.trim="form.age"  placeholder="请输入年龄"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="工作经验">
                          <el-select v-model="experience" placeholder="请选择工作经验"  @change="selectExperience">
                            <el-option v-for="item in experienceData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="所在地">
                          <el-input v-model.trim="address" placeholder="所在地"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :lg="24" :md="24" :sm="24">
                        <el-form-item label="兴趣爱好">
                          <el-input type="textarea" v-model.trim="hobby" placeholder="请输入兴趣爱好"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>

                  <p class="headLine">个人信息</p>
                  <div class="personInfo">
                    <el-row :gutter="80">
                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="工作城市">
                          <el-input v-model.trim="workAddress" placeholder="请输入工作城市"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="籍贯">
                          <el-select v-model="province" placeholder="请选择省市">
                            <el-option v-for="item in provinceData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="所在行业">
                          <el-input v-model.trim="industry" placeholder="请输入所在行业"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="80">
                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="期望行业">
                          <el-input v-model.trim="expected_industry" placeholder="请输入期望行业"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="到岗时间">
                          <el-date-picker v-model.trim="arrival_time"  value-format="yyyy-MM-dd" style="width: 280px;" type="date" placeholder="请选择到岗时间"></el-date-picker>
                        </el-form-item>
                      </el-col>

                      <el-col :lg="8" :md="8" :sm="8">
                        <el-form-item label="是否有亲友在本公司工作">
                          <el-select v-model.trim="isHave" placeholder="请选择">
                            <el-option v-for="item in isHaveData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="80">
                      <el-col :lg="8" :md="8" :sm="8">
                        <!--<label style="display: block;margin-bottom: 10px;">期望薪资</label>-->
                        <!--<div>-->
                        <!--<input v-model="salary_start" class="salary_start" />  -  <input v-model="salary_end" class="salary_end" />-->
                        <div id="salary">
                          <el-form-item label="期望薪资">
                            <el-row>
                              <el-col :span="11">
                                <el-input v-model.trim="salary_start" class="salary_start" ></el-input>
                              </el-col>
                              <el-col class="line" :span="2" style="color:#E5E5E5;">-</el-col>
                              <el-col :span="11">
                                <el-input v-model.trim="salary_end" class="salary_end" ></el-input>
                              </el-col>
                            </el-row>
                          </el-form-item>
                        </div>

                      </el-col>
                      <el-col :lg="16" :md="16" :sm="16">
                        <el-form-item label="技能">
                          <el-input v-model.trim="skill" placeholder="请输入技能（例如英语/计算机语言等）" class="skillInput"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :lg="24" :md="24" :sm="24">
                        <el-form-item label="兴趣爱好">
                          <el-input type="textarea" v-model.trim="hobby" placeholder="请输入兴趣爱好"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>

                  <div v-if="workExperienceIsShow" v-for="(item,index) in candidateWorkExperienceDTOList" :key="item.index">
                    <p class="headLine" v-show="candidateWorkExperienceDTOList.length<2">工作经历</p>
                    <p class="headLine" v-show="candidateWorkExperienceDTOList.length>1">工作经历{{index+1}}</p>
                    <div class="addButton" @click="addWorkDomain" v-show="index==0">
                      添加 <img src="../../assets/img/candidate/tanchuang_ic_add.png" alt="">
                    </div>
                    <div class="addButton" @click="removeWorkDomain" v-show="candidateWorkExperienceDTOList.length>1 && index>0">
                      刪除 <img src="../../assets/img/candidate/tanchuang_ic_remove.png" alt="">
                    </div>
                    <div class="clearfix"></div>

                    <div class="work" >
                      <el-row :gutter="80">
                        <el-col :lg="8" :md="8" :sm="8">
                          <el-form-item label="任职时间" >
                            <el-date-picker
                              v-model="item.startTime"
                              type="daterange"
                              range-separator=""
                              start-placeholder="请选择任职起止时间"
                              value-format="yyyy-MM-dd"
                              :picker-options="pickerOptions0"
                              end-placeholder="">
                            </el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :lg="8" :md="8" :sm="8">
                          <el-form-item label="公司名称" >
                            <el-input v-model="item.companyName" placeholder="请输入就职公司名称"></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :lg="8" :md="8" :sm="8">
                          <el-form-item label="岗位" >
                            <el-input v-model="item.post" placeholder="请输入任职的岗位"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="80">
                        <el-col :lg="8" :md="8" :sm="8">
                          <el-form-item label="薪资" >
                            <el-input v-model="item.salary" placeholder="请输入薪资"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :lg="8" :md="8" :sm="8">
                          <el-form-item label="证明人">
                            <el-input v-model="item.reterence " placeholder="请输入证明人姓名"></el-input><!--certifier-->
                          </el-form-item>
                        </el-col>
                        <el-col :lg="8" :md="8" :sm="8">
                          <el-form-item label="证明人联系方式">
                            <el-input v-model="item.reterenceContact" placeholder="请输入证明人的联系方式"></el-input><!--certifier_phone-->
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :lg="24" :md="24" :sm="24">
                          <el-form-item label="工作内容">
                            <el-input type="textarea" v-model="item.workContent" placeholder="请输入工作内容"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :lg="24" :md="24" :sm="24">
                          <el-form-item label="离职原因">
                            <el-input type="textarea" v-model="item.dimissionReason" placeholder="请输入离职原因"></el-input><!--leaveReason-->
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>

                  <div v-for="(item,index) in candidateEducationExperienceDTOList" :key="item.index">
                    <p class="headLine" v-show="candidateEducationExperienceDTOList.length<2">教育经历</i></p>
                    <p class="headLine" v-show="candidateEducationExperienceDTOList.length>1">教育经历{{index+1}}</p>
                    <div class="addButton" @click="addEducationDomain" v-show="index==0">
                      添加 <img src="../../assets/img/candidate/tanchuang_ic_add.png" alt="">
                    </div>
                    <div class="addButton" @click="removeEducationDomain" v-show="candidateEducationExperienceDTOList.length>1 && index>0">
                      删除 <img src="../../assets/img/candidate/tanchuang_ic_remove.png" alt="">
                    </div>
                    <div class="clearfix"></div>
                    <div class="education">
                      <el-row :gutter="80">
                        <el-col :lg="8" :md="8" :sm="8">
                          <el-form-item label="就读时间" ><!--studyTime-->
                            <el-date-picker
                              v-model="item.startTime"
                              type="daterange"
                              range-separator=""
                              start-placeholder="就读时间"
                              value-format="yyyy-MM-dd"
                              end-placeholder="">
                            </el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :lg="8" :md="8" :sm="8">
                          <el-form-item label="学校名称" >
                            <el-input v-model.trim="item.schoolName" placeholder="请输入就读学校名称"></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :lg="8" :md="8" :sm="8">
                          <el-form-item label="专业" >
                            <el-input v-model.trim="item.major" placeholder="请输入所学的专业"></el-input><!--specialty-->
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="80">
                        <el-col :lg="8" :md="8" :sm="8">
                          <el-form-item label="学历">
                            <el-select v-model="item.qualification" placeholder="请选择学历"><!--education-->
                              <el-option v-for="item in educationData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :lg="8" :md="8" :sm="8">
                          <el-form-item label="学位">
                            <el-input v-model.trim="item.degree " placeholder="请输入您的学位"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :lg="8" :md="8" :sm="8">
                          <el-form-item label="是否全日制">
                            <el-select v-model="item.isFullTime" placeholder="请选择是否全日制">
                              <el-option v-for="item in isFullTimeData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :lg="24" :md="24" :sm="24">
                          <el-form-item label="其他">
                            <el-input type="textarea" v-model.trim="item.other" placeholder="其他说明"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>

                    <p class="headLine">自我描述</p>
                    <div class="self-description">
                      <el-row>
                        <el-col :lg="24" :md="24" :sm="24">
                          <el-form-item label="自我描述">
                            <el-input type="textarea" v-model.trim="self_description" placeholder="候选简介"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>

                </el-form>
              </el-col>
            </el-row>

          </div>
        </div>
        <div class="addCandidate_right" v-if="flag==2">
          <!--<el-button class="uploadButton" v-if="flag==1">上传简历</el-button>-->
          <el-button class="uploadButton" v-if="flag==2" @click="insertResume('form')" :disabled="resumeDisbaled">保存简历</el-button>
          <div class="selectedBox" v-if="flag==2">
            <!--选择内推人-->
            <p>选择内推人</p>
            <div class="selectDiv" >
              <!--<input type="text" class="selected">-->
              <!--<img src="../../assets/img/candidate/tanchuang_ic_screen.png" alt="">-->

              <el-select v-model="commendEmployeeId" placeholder="请选择" class="selected">
                <el-option
                  v-for="item in commendEmployeeIdData"
                  :key="item.employeeName"
                  :label="item.employeeName"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <!--<div class="selectedBox" v-if="flag==1">
            <p style="margin-top: 20px;">请先选择简历来源</p>
            <div class="selectDiv" >
              <el-select v-model="resumeType" placeholder="请选择" class="selected">
                <el-option
                  v-for="item in resumeTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>-->

        </div>


      </div>
    </el-dialog>

    <!--确定覆盖简历弹窗-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body>
      <span>候选人信息已存在，是否要覆盖</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateResume">确 定</el-button>
        </span>
    </el-dialog>

    <!--选择简历-->
    <el-dialog title="选择简历" :visible.sync="addCandidateStatus"  custom-class='selectResume' :before-close="closeSelectResume">
      <div class="selectedBox" >
        <p><img src="../../assets/images/reg/info.svg" alt="">请选择简历来源，其他来源的简历请在标准简历中手动填写</p>
        <div class="selectDiv" >
          <label>简历来源</label>
          <el-select v-model="resumeType" placeholder="请选择" class="selected">
            <el-option
              v-for="item in resumeTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="confirm" @click="closeSelectResume">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  // import addCandidate_content from '@/components/common/candidate_public/addCandidate_content';
  // import addCandidate_right from '@/components/common/candidate_public/addCandidate_right';
  import {checkMobile,compareDate,isNumber,isEmail} from '@/assets/js/common/verify.js'
  import {formatDate} from '@/assets/js/common/date_year.js';
  // import standardBasic from '@/components/candidate/common/standardBasic';

    export default {
        name: "addCandidate",
        props:['addVisible','addCandidateStatus'],
        components:{
          // addCandidate_content,
          // addCandidate_right,
          // standardBasic
        },
      data(){
        let checkPhone = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('手机号不能为空'));
          } else {
            const reg = /^1\d{10}$/;
            console.log(reg.test(value));
            if (reg.test(value)) {
              callback();
            } else {
              return callback(new Error('请输入正确的手机号'));
            }
          }
        };
          return{
            selectResume:true,//选择简历弹窗
            // addVisible:false,
            annexId:'',//附件id
            workExperienceIsShow:true,
            dialogVisible:false,
            flag:1,
            add:'add',
            data:{

            },
            customclass:'addCandidateAlert',
            currPage:1,
            pageSize:10,
            commendEmployeeId:'',
            commendEmployeeIdData:[],
             pickerOptions0: {

             },
            resumeUrl:'',//原始简历
            resumeType:'',
            resumeTypeData:[
              {
                value: '1',
                label: '51job'
              }, {
                value: '2',
                label: '智联招聘'
              },{
                value: '3',
                label: 'boss直聘'
              },{
                value: '4',
                label: '猎聘'
              },{
                value: '5',
                label: '拉勾'
              }
            ],
            myHeader:headers(),//文件上传请求头

            workAddress:'',
            province:'',
            provinceData:[
            {value:'北京市',label:'北京市'},{value:'上海市',label:'上海市'},{value:'天津市',label:'天津市'},
            {value:'重庆市',label:'重庆市'},{value:'河北省',label:'河北省'},{value:'山西省',label:'山西省'},
            {value:'内蒙古',label:'内蒙古'},{value:'辽宁省',label:'辽宁省'},{value:'吉林省',label:'吉林省'},
            {value:'黑龙江省',label:'黑龙江省'},{value:'江苏省',label:'江苏省'},{value:'浙江省',label:'浙江省'},
            {value:'广西',label:'广西'},{value:'安徽省',label:'安徽省'},{value:'福建省',label:'福建省'},
            {value:'江西省',label:'江西省'},{value:'山东省',label:'山东省'},{value:'河南省',label:'河南省'},
            {value:'湖北省',label:'湖北省'},{value:'湖南省',label:'湖南省'},{value:'广东省',label:'广东省'},
            {value:'海南省',label:'海南省'},{value:'四川省',label:'四川省'},{value:'贵州省',label:'贵州省'},
            {value:'云南省',label:'云南省'},{value:'西藏',label:'西藏'},{value:'陕西省',label:'陕西省'},
            {value:'甘肃省',label:'甘肃省'},{value:'青海省',label:'青海省'},{value: '宁夏',label: '宁夏'},
            {value:'新疆',label:'新疆'},{value:'台湾',label:'台湾'},{value:'香港',label:'香港'},{value:'澳门',label:'澳门'}
          ],
            industry:'',
            salary_start:'',
            salary_end:'',
            expected_industry:'',
            arrival_time:'',
            isHave:'',
            isHaveData:[
            {
              value:'有',
              label:'有',
            },
            {
              value:'无',
              label:'无',
            }
          ],
            skill:'',
            hobby:'',
            workTime:'',
            companyName:'',
            post:'',//工作经历-岗位
            salary:'',
            certifier:'',
            certifier_phone:'',
            workContent:'',
            leaveReason:'',
            studyTime:'',
            schoolName:'',
            specialty:'',
            education:'',
            educationData: [
              {
            value: '初中及以下',
            label: '初中及以下'
          }, {
            value: '高中',
            label: '高中'
          }, {
            value: '中专',
            label: '中专'
          },{
            value:'大专',
            label:'大专'
          },{
            value:'本科',
            label:'本科'
          },{
            value:'硕士',
            label:'硕士'
          },{
            value:'博士',
            label:'博士'
          },{
            value:'MBA',
            label:'MBA'
          }
          ],
            degree:'',
            isFullTime:'',
            isFullTimeData:[
            {
              value: '是',
              label: '是'
            }, {
              value: '否',
              label: '否'
            },
          ],
            other:'',
            self_description:'',

            form:{
              name:'',
              post1:'',//选择岗位
              email:'',
              phone:'',
              age:'',
            },

            post1Data:[],
            channels:'',
            channelsData:[
              {value:'0',label:'手动添加'},
              {value:'1',label:'内部推荐'},
              {value:'2',label:'社招官网'},
              {value:'3',label:'拉钩'},
              {value:'4',label:'猎聘'},
              {value:'5',label:'BOSS直聘'},
            ],
            resoure:'',
            resoureData:[
              {
                value:'0',
                label:'主动搜索',
              },
              {
                value:'1',
                label:'候选人投递',

              }
            ],
            sex:'',
            sexData:[
              {value:'1',label:'男'},
              {value:'0',label:'女'}
            ],
            experience:'',
            experienceData:[
              {
                value:'0',
                label:'应届毕业生'
              },
              {
                value:'1',
                label:'1年',
              },
              {
                value:'2',
                label:'2年',
              },
              {
                value:'3',
                label:'3年',
              },
              {
                value:'4',
                label:'4年',
              },
              {
                value:'5',
                label:'5年',
              },
              {
                value:'6',
                label:'5年以上',
              }
            ],
            education1:'',
            address:'',
            addressData:[],
            imgcode:'',//头像
            insertResumeData:'',
            standardResume:'',
            candidateWorkExperienceDTOList:[//工作经历
              {
                startTime:'',//"任职时间",
                companyName:'',//"公司名称",
                post:'',//"岗位",
                salary:'',//"薪资",
                reterence:'',//"证明人",
                reterenceContact:'',//"证明人联系方式",
                workContent:'',//"工作内容",
                dimissionReason:'',//"离职原因"
              }
            ],
            candidateEducationExperienceDTOList:[
              {
                startTime:'',//"就读时间",['2018-1-1','2018-1-1']
                schoolName:'',//"学校名称",
                major:'',//"专业",
                qualification:'',//"学历",
                degree:'',//"学位",
                isFullTime:'',//"是否全日制",
                other:'',//"其他"
              }
            ],
            rules: {
              name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
              ],
              post1: [
                { required: true, message: '请选择岗位', trigger: 'change' }
              ],
              phone: [
                {  required: true,  message: '请输入手机号', trigger: 'blur' },
                { validator: checkPhone, message: '请输入正确手机号', trigger: 'blur'}
              ],
              email: [
                { type: 'email', required: true, message: '请输入邮箱号码', trigger: 'blur' }
              ],
              age: [
                { type: 'number', required: true, message: '请输入数字，如：18', trigger: 'blur' },
                { min:'2',max:'3',trigger:'blur'}
              ]

            }
          }
      },
      computed:{
        resumeDisbaled:function() {
          if(this.form.name!="" && this.form.post1 !="" && this.form.phone !="" && this.form.email !="" && this.form.age !="" ){
            return false
          }else{
            return true
          }
        }
      },
      methods:{
        //  关掉简历,调用父组件里面的方法

        closeSelectResume(){
          let that=this;
          that.$parent.closeResume();
        },
        // getMyEvent(flag){
        //   //接收的数据--------->我是子组件中的数据
        //   this.flag=flag;
        //   // console.log('接收的数据--------->'+flag)
        // },
        //选择工作经验 无工作经验，工作经验隐藏
        selectExperience(param){
          let that=this;
          if(param==0){
            that.workExperienceIsShow=false;
          }else{
            that.workExperienceIsShow=true;
          }
        },
        //  解析标准简历
        changeTab(num){
          let that=this;
          that.flag=num;

          //切换简历类型，切换样式
          if(num==1){
            that.customclass='addCandidateAlert';
            //展示简历,调用父组件里面的方法
            that.$parent.openResume();
          }else{
            that.customclass="addCandidateAlert   addCandidateAlert_add";
          }

          // console.log(num,that.resumeUrl);
          // that.resumeUrl="D:/z-简历/Boss直聘简历/王晨宇简历.doc";
          // that.resumeUrl="http://192.168.2.166:81/imageTmp/8db6bc8c-ee80-4372-bd01-a44a5471c34a.doc";
          // that.resumeType=3;
          if(num==2 && that.resumeUrl!=""){

            //  解析标准简历
            that.$http({
              method:'post',
              url:api.parseResume,
              headers:headers(),
              data:{
                // resumeFileName:that.resumeUrl,
                id:that.annexId,
                type:that.resumeType
              }
            }).then(function (res) {
              // console.log(res)
              if(res.data.code==10000){
                let data=res.data.data;
                that.candidateEducationExperienceDTOList=data.educationalExperienceList;
                that.candidateWorkExperienceDTOList= data.workExpericeList;
                that.form.name=data.name;
                that.sex=data.gender;
                that.description=data.selfEvaluation;
                that.workAddress=data.workingCity;
                that.arrival_time=data.dutyTime;
                that.form.age=data.age;
                that.form.phone=data.phone;
                that.form.email=data.email;
                that.hobby=data.hobby;
                that.province=data.birthPlace;
                that.skill=data.skill;
                that.education1=data.education;
                that.address=data.location;
                console.log(data.workExperience);
               /* if(data.workExperience>5){
                  that.experience=6;
                }else{
                  that.experience=data.workExperience>5;
                }*/
                that.industry=data.whereIndustry;
                that.expected_industry=data.expectIndustry;
                //   postId:1, //岗位
                //   resumeChannel:that.channels,//渠道
                //   resumeSource:that.resoure, //选择来源
                //   originalResumeAddress:"", //原简历地址
                // head:that.imgcode,//"图片base64",
                //   isFriendInCompany:that.isHave,//"是否亲友在本公司工作",
                //   salaryMin:that.salary_start,//"最低薪资",
                //   salaryMax:that.salary_end,//"最高薪资",
              }else{
                that.$message.error(res.data.msg);
                setTimeout(function () {
                  that.$emit('hideModel',that.add);//向父组件派发事件
                  that.resumeType='';
                  that.resumeUrl="";
                  that.changeTab(1);
                  that.$parent.closeResume();

                },2000);
              }
            })
          }

        },
        //  关闭弹窗
        hideModel(){
          let that=this;
          // that.addVisible=false;
          // console.log(that.add)
          //清空数据
          that.candidateEducationExperienceDTOList=[
            {
              startTime:'',//"就读时间",['2018-1-1','2018-1-1']
              schoolName:'',//"学校名称",
              major:'',//"专业",
              qualification:'',//"学历",
              degree:'',//"学位",
              isFullTime:'',//"是否全日制",
              other:'',//"其他"
            }
          ];
          that.candidateWorkExperienceDTOList=[//工作经历
            {
              startTime:'',//"任职时间",
              companyName:'',//"公司名称",
              post:'',//"岗位",
              salary:'',//"薪资",
              reterence:'',//"证明人",
              reterenceContact:'',//"证明人联系方式",
              workContent:'',//"工作内容",
              dimissionReason:'',//"离职原因"
            }
          ];

          that.form.name="";
          that.sex="";
          that.description="";
          that.workAddress="";
          that.arrival_time="";
          that.form.age="";
          that.form.phone="";
          that.form.email="";
          that.hobby="";
          that.province="";
          that.skill="";
          that.education1="";
          that.address="";
          that.industry="";
          that.expected_industry="";

          that.$emit('hideModel',that.add);//向父组件派发事件
        },


        //原始简历上传文件前的校验
        beforeAvatarUpload (file) {
          let that=this;
          let fileName=new Array();
          fileName =file.name.split('.');
          const extension = fileName[fileName.length-1] === 'docx';
          const extension2 =  fileName[fileName.length-1]=== 'doc';
          // const isLt2M = file.size / 1024 / 1024 < 10;
          if (that.resumeType=="") {
            that.$message({
              message: '请先选择简历来源!',
              type: 'warning'
            });
            return;
          }
          if (!extension2 && !extension) {
            that.$message({
              message: '上传模板只能是word格式!',
              type: 'warning'
            });
            return;
          }
          if (extension && that.resumeType==1) {
            that.$message({
              message: '暂不支持51job的docx格式的简历，请选择其他格式的简历!',
              type: 'warning'
            });
            return;
          }
          // if (!isLt2M) {
          //   this.$message({
          //     message: '上传模板大小不能超过 10MB!',
          //     type: 'warning'
          //   });
          // }
          console.log(that.resumeType);
          if (extension2 || extension && that.resumeType!="") {
            // console.log(file);
            let fd = new FormData();
            fd.append('type', that.resumeType);//随文件上传的其他参数
            fd.append('files', file);
            // let fd={
            //   resumeFileName:file,
            //   type: that.resumeType
            // };
            // console.log(file)
            // console.log(fd)
            this.newImport(fd);//校验完成后提交


            // return true
          }
          return extension2|| extension && that.resumeType
        },
        //上传简历
        newImport (data) {
          let that=this;
          this.$http({
            method:'post',
            url:api.uploadResume,
            data:data,
            headers:headers()
          }).then(function (res) {//成功后回调
            if(res.data.code==10000){
              that.resumeUrl=res.data.data[0].httpUrl;
              that.annexId=res.data.data[0].id;
              console.log( that.resumeUrl,that.annexId);

              //成功之后自动跳转到标准简历页面
              that.flag=2;
              that.changeTab(2)
            }else{
              this.$message.error(res.data.data.msg);
            }
          })
        },
        uploadUrl:function(){
          return api.uploadResume;
        },
        //获取岗位列表
        getList(){
          let that=this;
          that.$http({
            method:"post",
            url:api.getPosition,
            headers:headers(),
            data:{
              name:'',
              recruitStatus:1,
            }
          }).then(function(res){
            if(res.data.code==10000){
              that.post1Data=res.data.data;
            }else{
              that.$message.error(res.data.msg);
            }
          });
        },
        //获取员工列表
        getEmployeeList() {
          let that = this;
          let currPage=that.currPage || 1;
          let pageSize=that.pageSize || 10;
          let employeeName = that.names || '';
          this.$http({
            method:"post",
            url:api.getEmployeeList,
            headers:headers(),
            data:{
              currPage:currPage,
              pageSize:pageSize,
              employeeName:"",
            },
          }).then(function(res){
            if(res.data.code==10000 || res.data.data==null){
              that.commendEmployeeIdData = res.data.data
            }else{
              that.$message.error(res.data.msg);
            }
          });
        },
        //上传头像,获取base64
        uploadPhoto(e) {
          let that=this;
          // 利用fileReader对象获取file
          let file = e.target.files[0];
          let filesize = file.size;
          let filename = file.name;
          // 2,621,440   2M
          if (filesize > 2101440) {
            // 图片大于2MB

          }
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
            that.imgcode = e.target.result;
            console.log(that.imgcode);
          }
        },
        //删除工作经历
        removeWorkDomain(item) {
          let index = this.candidateWorkExperienceDTOList.indexOf(item);
          this.candidateWorkExperienceDTOList.splice(index, 1)
        },
        //添加工作经历
        addWorkDomain() {
          this.candidateWorkExperienceDTOList.push({
            startTime:'',//"任职时间",
            companyName:'',//"公司名称",
            post:'',//"岗位",
            salary:'',//"薪资",
            reterence:'',//"证明人",
            reterenceContact:'',//"证明人联系方式",
            workContent:'',//"工作内容",
            dimissionReason:'',//"离职原因"
            key: Date.now()
          });
        },
        //删除教育经历
        removeEducationDomain(item) {
          let index = this.candidateEducationExperienceDTOList.indexOf(item);
          this.candidateEducationExperienceDTOList.splice(index, 1)
        },
        //添加教育经历
        addEducationDomain() {
          this.candidateEducationExperienceDTOList.push({
            startTime:'',//"就读时间",
            schoolName:'',//"学校名称",
            major:'',//"专业",
            qualification:'',//"学历",
            degree:'',//"学位",
            isFullTime:'',//"是否全日制",
            other:'',//"其他"
            key: Date.now()
          });
        },
        //标准简历
        insertResume(formName){
          let that=this;
          let sex,experience;
          if(that.sex=='男'){
            sex=1;
          }else if(that.sex='女'){
            sex=0;
          }else{
            sex=that.sex;
          }

          if(that.experience>5){
            that.experience='5年以上';

            experience=6;
          }else if(that.experience==0){
            that.experience='应届毕业生';
            experience=0;
          }else if(0<that.experience<=5){
            experience=that.experience;

            that.experience=that.experience;
          }else if(that.experience=='5年以上'){
            experience=6;
          }

          console.log(experience)
          that.standardResume={standardResumeDTO: {
                head:that.imgcode,//"图片base64",
                workCity:that.workAddress,
                nativePlace:that.province,//"籍贯",
                inIndustry:that.industry,//"所在行业",
                expectIndustry:that.expected_industry,//"期望行业",
                arrivalTime:that.arrival_time,//"到岗时间",
                isFriendInCompany:that.isHave,//"是否亲友在本公司工作",
                salaryMin:that.salary_start,//"最低薪资",
                salaryMax:that.salary_end,//"最高薪资",
                skill:that.skill,//"技能",
                hobby:that.hobby,//"兴趣爱好",
                candidateWorkExperienceDTOList:that.candidateWorkExperienceDTOList,
                candidateEducationExperienceDTOList:that.candidateEducationExperienceDTOList,
                description:that.self_description,
              }};
          that.insertResumeData={
                candidateName:that.form.name,// //候选人姓名
                postId:that.form.post1, //岗位
                resumeChannel:that.channels,//渠道
                resumeSource:that.resoure, //选择来源
                candidateSex:sex,//候选人性别
                candidateAge:that.form.age, //候选人年龄
                candidatePhone:that.form.phone,//候选人手机号
                candidateEmail:that.form.email,//候选人邮箱
                candidateExperience:experience,//工作经验
                candidateEducation:that.education1,//候选人学历
                candidateLocation:that.address,//所在地
                originalResumeAddress:that.resumeUrl, //原简历地址
                standardResume:JSON.stringify(that.standardResume),
                annexId:that.annexId
              };

          this.$refs[formName].validate((valid) => {
            if (valid) {
              that.$http({
                method:"post",
                headers:headers(),
                url:api.handAddCandidate,
                data:{
                  candidateName:that.form.name,// //候选人姓名
                  postId:that.form.post1, //岗位
                  resumeChannel:that.channels,//渠道
                  resumeSource:that.resoure, //选择来源
                  candidateSex:sex,//候选人性别
                  candidateAge:that.form.age, //候选人年龄
                  candidatePhone:that.form.phone,//候选人手机号
                  candidateEmail:that.form.email,//候选人邮箱
                  candidateExperience:experience,//工作经验
                  candidateEducation:that.education1,//候选人学历
                  candidateLocation:that.address,//所在地
                  originalResumeAddress:that.resumeUrl, //原简历地址
                  commendEmployeeId:that.commendEmployeeId,//TODO 推荐人id
                  standardResume:JSON.stringify(that.standardResume),
                  annexId:that.annexId,
                }
              }).then(function (res) {
                if(res.data.code==10000){
                  that.$message.success("候选人信息插入成功！");
                  that.hideModel();
                  setTimeout(function () {
                    window.location.reload();
                  },3000)
                }else if(res.data.code==40001 && res.data.data==true){
                  that.dialogVisible = true;
                }else{
                  that.$message.error(res.data.msg);
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });


        },
        // 更新候选人简历 updateResume
        updateResume(){
          let that=this;
          that.$http({
            method: "put",
            headers: headers(),
            url: api.updateResume,
            data: that.insertResumeData,
          }).then(function (res) {
            if(res.data.code==10000){
              that.$message.success(res.data.msg);
              that.dialogVisible = false;
              that.hideModel();
              setTimeout(function () {
                window.location.reload();
              },3000)
            }else{
              that.$message.error(res.data.msg);
              that.dialogVisible = false;
            }
          })
        }
      },
      mounted(){
        let that=this;
        that.getList();
        that.getEmployeeList();
      }
    }
</script>

<style scoped>
</style>
