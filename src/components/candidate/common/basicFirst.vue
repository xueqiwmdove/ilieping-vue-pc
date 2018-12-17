<template>
  <!--基本信息-->
  <div class="basic_first" >
    <ul class="tab_title">
      <li @click="changeTab(1)" :class="flag==1?'active':''">原始简历</li>
      <li @click="changeTab(2)" :class="flag==2?'active':''">标准简历</li>
      <li class="button">
        <img src="../../../assets/img/candidate/tanchuang_ic_download.png" class="upload">
        <img src="../../../assets/img/candidate/tanchuang_ic_print.png" class="print">
      </li>
    </ul>
    <div v-if="flag==1" class="original_resume">
      <div>

      </div>
    </div>
    <div v-if="flag==2" class="standard_resume">
      <div class="personal">
        <img src="../../../assets/img/candidate/tanchuang_ic_head.png" class="head-photo">
        <p class="username">王思</p>
        <p>
          <span class="sex">31岁.</span>
          <span class="workExp">无工作经验.</span>
          <span class="educationBg">硕士.</span>
          上海静安
        </p>
        <p>
          <span class="phone">179-9282-2922</span>
          <span class="email">4222112442@qq.com</span>
        </p>
      </div>
      <div class="resume_content">
        <p class="headLine">个人信息</p>
        <div class="personInfos">
          <div class="line">
            <el-row>
              <el-col :span="8">
                <p class="label">工作城市</p>
                <p>上海</p>
              </el-col>
              <el-col :span="8">
                <p class="label">籍贯</p>
                <p></p>
              </el-col>
              <el-col :span="8">
                <p class="label">所在行业</p>
                <p></p>
              </el-col>
            </el-row>
          </div>

          <div class="line">
            <el-row>
              <el-col :span="8">
                <p class="label">期望行业</p>
                <p></p>
              </el-col>
              <el-col :span="8">
                <p class="label">到岗时间</p>
                <p></p>
              </el-col>
              <el-col :span="8">
                <p class="label">是否有亲友在本公司工作</p>
                <p></p>
              </el-col>
            </el-row>
          </div>

          <div class="line">
            <el-row>
              <el-col :span="8">
                <p class="label">期望薪资</p>
                <p></p>
              </el-col>
              <el-col :span="16">
                <p class="label">技能</p>
                <p>CET · 4，Java，.net，php，Python等</p>
              </el-col>
            </el-row>
          </div>

          <div class="line">
            <el-row>
              <el-col :span="24">
                <p class="label">兴趣爱好</p>
                <p></p>
              </el-col>
            </el-row>
          </div>
        </div>


        <p class="headLine">工作经历</p>
        <div class="work">
          <div class="line">
            <el-row>
              <el-col :span="8">
                <p class="label">任职时间</p>
                <p></p>
              </el-col>
              <el-col :span="8">
                <p class="label">公司名称</p>
                <p></p>
              </el-col>

              <el-col :span="8">
                <p class="label">岗位</p>
                <p></p>
              </el-col>
            </el-row>
          </div>

          <div class="line">
            <el-row>
              <el-col :span="8">
                <p class="label">薪资</p>
                <p></p>
              </el-col>
              <el-col :span="8">
                <p class="label">证明人</p>
                <p></p>
              </el-col>

              <el-col :span="8">
                <p class="label">证明人联系方式</p>
                <p></p>
              </el-col>
            </el-row>
          </div>

         <div class="line">
           <el-row>
             <el-col :span="24">
               <p class="label">工作内容</p>
               <div>
                 <p></p>
               </div>
             </el-col>
           </el-row>
         </div>

          <div class="line">
            <el-row>
              <el-col :span="24">
                <p class="label">离职原因</p>
                <p></p>
              </el-col>
            </el-row>
          </div>

        </div>
        <p class="headLine">教育经历</p>

        <div class="education">
          <div class="line">
            <el-row>
              <el-col :span="8">
                <p class="label">就读时间</p>
                <p></p>
              </el-col>
              <el-col :span="8">
                <p class="label">学校名称</p>
                <p></p>
              </el-col>

              <el-col :span="8">
                <p class="label">专业</p>
                <p></p>
              </el-col>
            </el-row>
          </div>

          <div class="line">
            <el-row>
              <el-col :span="8">
                <p class="label">学历</p>
                <p></p>
              </el-col>
              <el-col :span="8">
                <p class="label">学位</p>
                <p></p>
              </el-col>

              <el-col :span="8">
                <p class="label">是否全日制</p>
                <p></p>
              </el-col>
            </el-row>
          </div>

          <div class="line">
            <el-row>
              <el-col :span="24">
                <p>其他</p>
                <p>无</p>
              </el-col>
            </el-row>
          </div>
        </div>
        <p class="headLine">自我描述</p>
        <div class="self_description">
          <div class="line">
            <el-row>
              <el-col :span="24">
                <p>自我描述</p>
                <div>

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
        }
      }
    }
</script>

<style scoped>

</style>
