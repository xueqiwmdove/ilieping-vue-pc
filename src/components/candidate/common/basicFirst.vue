<template>
  <!--基本信息-->
  <div class="basic_first" >
    <ul class="tab_title">
      <li @click="changeTab(1)" :class="flag==1?'active':''">原始简历</li>
      <li @click="changeTab(2)" :class="flag==2?'active':''">标准简历</li>
      <li class="button" style="width: 50px;" v-show="flag==1">
        <img src="../../../assets/img/candidate/tanchuang_ic_download.png" class="upload" style="margin: 0" @click="upload(candidateStepsData.originalResumeAddress)">
        <!--<img src="../../../assets/img/candidate/tanchuang_ic_print.png" class="print">-->
      </li>
    </ul>
    <div v-if="flag==1" class="original_resume">
      <div>

      </div>
    </div>
    <div v-if="flag==2" class="standard_resume" >
      <div class="personal">
        <div v-for="item  in standardResume">
          <img  :src="item.head" class="head-photo" >
        </div>
        <div  v-for="item in  candidateStepsData">
          <p class="username">{{item.candidateName}}</p>
          <p>
            <span class="sex">{{item.candidateAge}}岁.</span>
            <span class="workExp" v-if="item.candidateExperience!=0">{{item.candidateExperience}}工作经验.</span>
            <span class="workExp" v-if="item.candidateExperience==0">无工作经验.</span>
            <span class="educationBg">{{item.candidateEducation}}.</span>
            {{item.candidateLocation}}
          </p>
          <p>
            <span class="phone">{{item.candidatePhone}}</span>
            <span class="email">{{item.candidateEmail}}</span>
          </p>
        </div>

      </div>
      <div class="resume_content">
        <p class="headLine">个人信息</p>
        <div class="personInfos" v-for="item  in standardResume">
          <div class="line">
            <el-row>
              <el-col :span="8">
                <p class="label">工作城市</p>
                <p>{{item.workCity}}</p>
              </el-col>
              <el-col :span="8">
                <p class="label">籍贯</p>
                <p>{{item.nativePlace}}</p>
              </el-col>
              <el-col :span="8">
                <p class="label">所在行业</p>
                <p>{{item.inIndustry}}</p>
              </el-col>
            </el-row>
          </div>

          <div class="line">
            <el-row>
              <el-col :span="8">
                <p class="label">期望行业</p>
                <p>{{item.expectIndustry}}</p>
              </el-col>
              <el-col :span="8">
                <p class="label">到岗时间</p>
                <p>{{item.arrivalTime}}</p>
              </el-col>
              <el-col :span="8">
                <p class="label">是否有亲友在本公司工作</p>
                <p>{{item.isFriendInCompany}}</p>
              </el-col>
            </el-row>
          </div>

          <div class="line">
            <el-row>
              <el-col :span="8">
                <p class="label">期望薪资</p>
                <p>{{item.salaryMin}}-{{item.salaryMax}}</p>
              </el-col>
              <el-col :span="16">
                <p class="label">技能</p>
                <p>{{item.skill}}</p>
              </el-col>
            </el-row>
          </div>

          <div class="line">
            <el-row>
              <el-col :span="24">
                <p class="label">兴趣爱好</p>
                <p>{{item.hobby}}</p>
              </el-col>
            </el-row>
          </div>
        </div>

        <div v-for="item in candidateWorkExperienceDTOList">
          <p class="headLine">工作经历</p>
          <div class="work">
            <div class="line">
              <el-row>
                <el-col :span="8">
                  <p class="label">任职时间</p>
                  <p>{{item.startTime}} - {{item.endTime}}</p>
                </el-col>
                <el-col :span="8">
                  <p class="label">公司名称</p>
                  <p>{{item.companyName}}</p>
                </el-col>

                <el-col :span="8">
                  <p class="label">岗位</p>
                  <p>{{item.post}}</p>
                </el-col>
              </el-row>
            </div>

            <div class="line">
              <el-row>
                <el-col :span="8">
                  <p class="label">薪资</p>
                  <p>{{item.salary}}</p>
                </el-col>
                <el-col :span="8">
                  <p class="label">证明人</p>
                  <p>{{item.reterence}}</p>
                </el-col>

                <el-col :span="8">
                  <p class="label">证明人联系方式</p>
                  <p>{{item.reterenceContact}}</p>
                </el-col>
              </el-row>
            </div>

            <div class="line">
              <el-row>
                <el-col :span="24">
                  <p class="label">工作内容</p>
                  <div>
                    <p>{{item.workContent}}</p>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="line">
              <el-row>
                <el-col :span="24">
                  <p class="label">离职原因</p>
                  <p>{{item.dimissionReason}}</p>
                </el-col>
              </el-row>
            </div>

          </div>
        </div>

        <div v-for=" item in candidateEducationExperienceDTOList">
          <p class="headLine">教育经历</p>

          <div class="education">
            <div class="line">
              <el-row>
                <el-col :span="8">
                  <p class="label">就读时间</p>
                  <p>{{item.startTime}} - {{item.endTime}}</p>
                </el-col>
                <el-col :span="8">
                  <p class="label">学校名称</p>
                  <p>{{item.schoolName}}</p>
                </el-col>

                <el-col :span="8">
                  <p class="label">专业</p>
                  <p>{{item.major}}</p>
                </el-col>
              </el-row>
            </div>

            <div class="line">
              <el-row>
                <el-col :span="8">
                  <p class="label">学历</p>
                  <p>{{item.qualification}}</p>
                </el-col>
                <el-col :span="8">
                  <p class="label">学位</p>
                  <p>{{item.degree}}</p>
                </el-col>

                <el-col :span="8">
                  <p class="label">是否全日制</p>
                  <p>{{item.isFullTime}}</p>
                </el-col>
              </el-row>
            </div>

            <div class="line">
              <el-row>
                <el-col :span="24">
                  <p>其他</p>
                  <p>{{item.other}}</p>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>

        <p class="headLine">自我描述</p>
        <div class="self_description" v-for="item  in standardResume">
          <div class="line">
            <el-row>
              <el-col :span="24">
                <p>自我描述</p>
                <div>
                  {{item.self_description}}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "basicFirst",
        props:['candidateStepsData','standardResume','candidateWorkExperienceDTOList','candidateEducationExperienceDTOList'],
        components:{

        },
        data(){
          return{
            flag:1,//默认标准简历

          }
        },
      methods:{
        changeTab(flag){
          this.flag=flag;
          //通过getFormChild，向父组件candidateSteps 传值
          this.$emit('getFormChild',flag)
        },
      //  原始简历下载
        upload(url){
          let that=this;
          if(url !="" || url != undefined){
         /*   let url = url.httpUrl;
            let fileTye = url.match(/.+\/(.+)$/)[1];
            let formData = new FormData();
            formData.append('fileUrl',url);
            this.$http({
              url:api.archivesLoadFile,
              method:'POST',
              headers:headers('multipart/form-data'),
              responseType: 'blob',
              data: formData,
            }).then(function (res) {
              let result=res.data;
              let url =  window.URL.createObjectURL(new Blob([result]));
              let link = document.createElement('a');
              link.style.display = 'none';
              link.href = url;
              link.download = fileTye;
              document.body.appendChild(link);
              link.click();


            }).catch(function (error) {
              that.$message.error(error);
            });*/
            window.location.href = url;
            // console.log(url);
            // window.open(url, '_blank'); // 新开窗口下载
          }else{
            this.$message.error("原始简历地址不存在！")


          }
        }
      },
    }
</script>

<style scoped>

</style>
