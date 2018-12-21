<template>
  <div class="addCandidate_content">

    <div :class="flag==2?'standard_status_active':''">
      <ul class="tab_title">
        <li @click="changeTab(1)" :class="flag==1?'active':''">原始简历</li>
        <li @click="changeTab(2)" :class="flag==2?'active':''">标准简历</li>
        <li class="button">
          <img src="../../../assets/img/candidate/tanchuang_ic_download.png" class="upload">
          <img src="../../../assets/img/candidate/tanchuang_ic_print.png" class="print">
        </li>
      </ul>
      <div class="headImg" v-if="flag==2">
        <!--<fileUploadHeadImg @getfile="getHeadImg" ref="headImg" ></fileUploadHeadImg>-->
        <img src="../../../assets/img/candidate/tanchuang_ic_head.png" >
        <input  type="file" accept="image/*" action="" />
        <p class="el-upload__tip">点击头像可上传照片，支持JPG/PNG等图片格式，最大不超过2M</p>
      </div>
    </div>
    <!--原始简历-->
      <div v-if="flag==1" class="original_resume">
        <label style="margin: 0 0 0 20px">请先选择简历来源 <i style="color:#f95714">*</i></label>
        <el-select v-model="resumeType" placeholder="请选择"  >
          <el-option
            v-for="item in resumeTypeData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
           >
          </el-option>
        </el-select>
        <el-upload
          class="upload-demo"
          drag
          ref="upload"
          :before-upload="beforeAvatarUpload"
          :action="uploadUrl()"
          :headers="myHeader"
          multiple>
          <i class="el-icon-upload">
            <img src="../../../assets/img/candidate/tanchuang_pic_upload.png" alt="">
          </i>
          <p class="el-upload__text">将建立拖至此处自动上传或<em>选择文件上传</em></p>
          <p class="el-upload__text">目前暂时支持WORD简历格式</p><!--支持PDF/TXT/WORD/WPS等简历格式-->
        </el-upload>
      </div>
    <!--标准简历-->
      <div v-if="flag==2" class="standard_resume">
         <el-row>
           <el-col  :span="24">
             <el-form>
               <p class="headLine">个人信息</p>
               <div class="personInfo">
                 <el-row :gutter="80">
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="工作城市">
                       <el-input v-model="workAddress" placeholder="请输入工作城市"></el-input>
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
                       <el-input v-model="industry" placeholder="请输入所在行业"></el-input>
                     </el-form-item>
                   </el-col>
                 </el-row>

                 <el-row :gutter="80">
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="期望行业">
                       <el-input v-model="expected_industry" placeholder="请输入期望行业"></el-input>
                     </el-form-item>
                   </el-col>
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="到岗时间">
                       <el-input v-model="arrival_time " placeholder="请选择到岗时间"></el-input>
                     </el-form-item>
                   </el-col>

                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="是否有亲友在本公司工作">
                         <el-select v-model="isHave" placeholder="请选择">
                           <el-option v-for="item in isHaveData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                         </el-select>
                     </el-form-item>
                   </el-col>
                 </el-row>

                 <el-row :gutter="80">
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="期望薪资">
                       <div>
                         <el-row>
                           <el-col :span="10">
                             <el-input v-model="salary_start" class="salary_start"></el-input>
                           </el-col>
                           <el-col class="line" :span="2" style="color:#E5E5E5;">-</el-col>
                           <el-col :span="10">
                             <el-input v-model="salary_end" class="salary_end"></el-input>
                           </el-col>
                         </el-row>
                       </div>


                     </el-form-item>
                   </el-col>
                   <el-col :lg="16" :md="16" :sm="16">
                     <el-form-item label="技能">
                       <el-input v-model="skill" placeholder="请输入技能（例如英语/计算机语言等）"></el-input>
                     </el-form-item>
                   </el-col>
                 </el-row>

                 <el-row>
                   <el-col :lg="24" :md="24" :sm="24">
                     <el-form-item label="兴趣爱好">
                       <el-input type="textarea" v-model="hobby" placeholder="请输入兴趣爱好"></el-input>
                     </el-form-item>
                   </el-col>
                 </el-row>
               </div>
               <p class="headLine">工作经历</p>
               <div class="addButton">
                 添加 <img src="../../../assets/img/candidate/tanchuang_ic_add.png" alt="">
               </div>
               <div class="clearfix"></div>
               <div class="work">
                 <el-row :gutter="80">
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="任职时间">
                       <el-date-picker
                         v-model="workTime"
                         type="daterange"
                         range-separator=""
                         start-placeholder="请选择任职起止时间"
                         value-format="yyyy-MM-dd"
                         end-placeholder="">
                       </el-date-picker>
                     </el-form-item>
                   </el-col>
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="公司名称">
                       <el-input v-model="companyName" placeholder="请输入就职公司名称"></el-input>
                     </el-form-item>
                   </el-col>

                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="岗位">
                       <el-input v-model="post" placeholder="请输入任职的岗位"></el-input>
                     </el-form-item>
                   </el-col>
                 </el-row>

                 <el-row :gutter="80">
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="薪资">
                       <el-input v-model="salary" placeholder="请输入薪资"></el-input>
                     </el-form-item>
                   </el-col>
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="证明人">
                       <el-input v-model="certifier " placeholder="请输入证明人姓名"></el-input>
                     </el-form-item>
                   </el-col>
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="证明人联系方式">
                       <el-input v-model="certifier_phone" placeholder="请输入证明人的联系方式"></el-input>
                     </el-form-item>
                   </el-col>
                 </el-row>

                 <el-row>
                   <el-col :lg="24" :md="24" :sm="24">
                     <el-form-item label="工作内容">
                       <el-input type="textarea" v-model="workContent" placeholder="请输入工作内容"></el-input>
                     </el-form-item>
                   </el-col>
                 </el-row>
                 <el-row>
                   <el-col :lg="24" :md="24" :sm="24">
                     <el-form-item label="离职原因">
                       <el-input type="textarea" v-model="leaveReason" placeholder="请输入离职原因"></el-input>
                     </el-form-item>
                   </el-col>
                 </el-row>
               </div>
               <p class="headLine">教育经历</p>
                <div class="addButton">
                  添加 <img src="../../../assets/img/candidate/tanchuang_ic_add.png" alt="">
                </div>
               <div class="clearfix"></div>
               <div class="education">
                 <el-row :gutter="80">
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="就读时间">
                       <el-date-picker
                         v-model="studyTime"
                         type="daterange"
                         range-separator=""
                         start-placeholder="就读时间"
                         value-format="yyyy-MM-dd"
                         end-placeholder="">
                       </el-date-picker>
                     </el-form-item>
                   </el-col>
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="学校名称">
                       <el-input v-model="schoolName" placeholder="请输入就读学校名称"></el-input>
                     </el-form-item>
                   </el-col>

                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="专业">
                       <el-input v-model="specialty" placeholder="请输入所学的专业"></el-input>
                     </el-form-item>
                   </el-col>
                 </el-row>

                 <el-row :gutter="80">
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="学历">
                       <el-select v-model="education" placeholder="请选择学历">
                         <el-option v-for="item in educationData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                       </el-select>
                     </el-form-item>
                   </el-col>
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="学位">
                       <el-input v-model="degree " placeholder="请输入您的学位"></el-input>
                     </el-form-item>
                   </el-col>
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="是否全日制">
                       <el-select v-model="isFullTime" placeholder="请选择是否全日制">
                         <el-option v-for="item in isFullTimeData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                       </el-select>
                     </el-form-item>
                   </el-col>
                 </el-row>

                 <el-row>
                   <el-col :lg="24" :md="24" :sm="24">
                     <el-form-item label="其他">
                       <el-input type="textarea" v-model="other" placeholder="其他说明"></el-input>
                     </el-form-item>
                   </el-col>
                 </el-row>
               </div>

               <p class="headLine">自我描述</p>
               <div class="self-description">
                 <el-row>
                   <el-col :lg="24" :md="24" :sm="24">
                     <el-form-item label="自我描述">
                       <el-input type="textarea" v-model="self_description" placeholder="候选简介"></el-input>
                     </el-form-item>
                   </el-col>
                 </el-row>
               </div>
             </el-form>
           </el-col>
         </el-row>

      </div>
  </div>
</template>

<script>
  import http from '@/http/http';
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js';
  import fileUploadHeadImg from '@/components/common/fileUploadHeadImg';


  export default {
        name: "addCandidate_content",
        components:{
          fileUploadHeadImg,
        },
        data(){
          return{
            flag:1,
            name:'',
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
                value:'1',
                label:'有',
              },
              {
                value:'0',
                label:'无',
              }
            ],
            skill:'',
            hobby:'',
            workTime:'',
            companyName:'',
            post:'',
            salary:'',
            certifier:'',
            certifier_phone:'',
            workContent:'',
            leaveReason:'',
            studyTime:'',
            schoolName:'',
            specialty:'',
            education:'',
            educationData: [{
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
              },
            ]
          }
        },

      methods:{
        changeTab(num){
          let that=this;
          that.flag=num;
          that.$emit('my-event', that.flag)
          //通过按钮的点击事件触发方法，然后用$emit触发一个my-event的自定义方法，传递that.flag数据。
        },
        //上传头像
        getHeadImg(){

        },
        //原始简历上传文件前的校验
        beforeAvatarUpload (file) {
          let that=this;
          let fileName=new Array();
          fileName =file.name.split('.');
          // const extension = fileName[fileName.length-1] === 'txt';
          const extension2 =  fileName[fileName.length-1]=== 'word';
          // const isLt2M = file.size / 1024 / 1024 < 10;
          if (that.resumeType=="") {
            that.$message({
              message: '请先选择简历来源!',
              type: 'warning'
            });
            return;
          }
          if (!extension2) {
            that.$message({
              message: '上传模板只能是word格式!',
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
          if (extension2 && that.resumeType!="") {/*&& isLt2M == true*/
            // console.log(file);
            let fd = new FormData();
            fd.append('resumeType', that.resumeType);//随文件上传的其他参数
            fd.append('file', file);
            // console.log(fd)
            this.newImport(fd).then(function (res) {//校验完成后提交
              console.log(res)
            }, function () {
              console.log('failed');
            });
            return true
          }
          return extension2 && that.resumeType
        },
        newImport (data) {
          this.$http({
            method:'post',
            url:"url",
            data:data,
            headers:headers()
          }).then(function (res) {//成功后回调
            // let code = res.data.returncode;//返回json结果
            // let msg = res.data.msg;
            // this.open(msg, code);
            // console.log('success');
          }, function () {
            // console.log('failed');
          });
        },
        uploadUrl:function(){
          return api.uploadResume;
        },

      //标准简历
        insertResume(){
          let that=this;
          that.$http({
            method:"post",
            headers:headers(),
            data:{
              candidateName:"张明", //候选人姓名
              postId:'', //岗位
              resumeChannel:1,//渠道
              resumeSource:1, //选择来源
              candidateSex:1,//候选人性别
              candidateAge:18, //候选人年龄
              candidatePhone:"13915138049",//候选人手机号
              candidateEmail:"admin@qq.com",//候选人邮箱
              candidateExperience:1,//工作经验
              candidateEducation:"小学",//候选人学历
              candidateLocation:"上海",//所在地
              originalResumeAddress:"http://baidu.com", //原简历地址
              standardResume: {
                standardResumeDTO: {
                  head:"图片base64",
                  workCity:that.workAddress,
                  nativePlace:that,province,//"籍贯",
                  inIndustry:that.industry,//"所在行业",
                  expectIndustry:that.expected_industry,//"期望行业",
                  arrivalTime:that.arrival_time,//"到岗时间",
                  isFriendInCompany:that.isHave,//"是否亲友在本公司工作",
                  skill:that.skill,//"技能",
                  hobby:that.hobby,//"兴趣爱好",
                  workExperienceDTOList:[
                      {
                        startTime:that.workTime[0],//"任职时间",
                        endTime:that.workTime[1],
                        companyName:that.companyName,//"公司名称",
                        post:that.post,//"岗位",
                        salary:that.salary,//"薪资",
                        reterence:that.certifier,//"证明人",
                        reterenceContact:that.certifier_phone,//"证明人联系方式",
                        workContent:that.workContent,//"工作内容",
                        dimissionReason:that.leaveReason,//"离职原因"
                      }
                    ],
                  educationExperienceDTOList:[
                      {
                        startTime:that.studyTime[0],//"就读时间",
                        endTime:that.studyTime[1],
                        schoolName:that.schoolName,//"学校名称",
                        major:that.specialty,//"专业",
                        qualification:that.education,//"学历",
                        degree:that.degree,//"学位",
                        isFullTime:that.isFullTime,//"是否全日制",
                        other:that.other,//"其他"
                      }
                    ],
                  description:that.self_description,//"自我描述"
                }
              },
            }
          })

        }
      }
    }
</script>

<style scoped>
  .active{
    color: #394A66;
  }
  .standard_status_active{
   background: #F8FAFC;
    height: 180px;
  }
  .standard_status_active .headImg{
    text-align: center;
  }
</style>
