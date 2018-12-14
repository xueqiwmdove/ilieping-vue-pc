<template>
  <div class="interview_second">
    <!--无操作-未到面试状态-->
    <div class="noOps">
      <img src="../../../assets/img/candidate/tanchuang_pic_interview2.png" alt="">
      <p>将候选人移动至「面试」后（右侧），才可以添加面试</p>
    </div>
    <!--缺省-已到面试状态-->
    <div class="noInterviews">
      <img src="../../../assets/img/candidate/tanchuang_pic_interview1.png" alt="">
      <p>暂未添加面试</p>
      <button>添加面试</button>
    </div>

    <!--面试基本信息-->
    <div class="interview_basic">

      <el-row>
        <el-col :span="24">
          <el-form>
            <p class="headLine">基本信息
              <el-tooltip class="item" effect="dark" content="候选人到场签到后系统将会发送面试反馈给面试官，面试官可直接在线填写面试反馈。" placement="bottom-start">
                <img src="../../../assets/img/reg/info.svg" alt="">
              </el-tooltip>
            </p>
            <div class="basicInfo">
              <el-row :gutter="80">
                <el-col :lg="8" :md="8" :sm="8">
                  <el-form-item>
                    <el-select v-model="province" placeholder="初试">
                      <el-option v-for="item in provinceData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>


              </el-row>
            </div>
          </el-form>


        </el-col>
      </el-row>
      <p class="headLine">面试时间</p>
      <p class="headLine">
        面试邀约
        <el-tooltip class="item" effect="dark" content="创建面试成功后将通过短信(如勾选）或者邮箱（如勾选）的方式向候选人发送面试邀约。" placement="bottom-start">
          <img src="../../../assets/img/reg/info.svg" alt="">
        </el-tooltip>
      </p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "interview_second"
    }
</script>

<style scoped>

</style>
