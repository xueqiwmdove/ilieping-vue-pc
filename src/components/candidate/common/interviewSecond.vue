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
              <el-row :gutter="40">
                <el-col :lg="8" :md="8" :sm="8">
                  <el-form-item>
                    <el-select v-model="province" placeholder="初试">
                      <el-option v-for="item in provinceData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8">
                  <el-form-item>
                    <el-select v-model="province" placeholder="面试形式">
                      <el-option v-for="item in provinceData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                  <el-col :lg="8" :md="8" :sm="8">
                    <el-form-item>
                      <el-select v-model="province" placeholder="选择面试官支持搜索">
                        <el-option v-for="item in provinceData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
              </el-row>
            </div>

            <div class="interview_time">
              <p class="headLine">面试时间</p>
              <el-row :gutter="40">
                <el-col :lg="8" :md="8" :sm="8">
                  <el-form-item>
                    <el-date-picker
                      v-model="interviewTime"
                      type="date"
                      range-separator=""
                      start-placeholder="请选择面试时间"
                      end-placeholder="">
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :lg="8" :md="8" :sm="8">
                  <el-form-item>
                    <el-date-picker
                      v-model="interviewTime"
                      type="date"
                      range-separator=""
                      start-placeholder="面试时间段"
                      end-placeholder="">
                    </el-date-picker>
                  </el-form-item>
                </el-col>

                <el-col :lg="8" :md="8" :sm="8">
                  <el-form-item>
                    <el-select v-model="province" placeholder="面试地点">
                      <el-option v-for="item in provinceData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div class="interview_invitation">
              <p class="headLine">
                面试邀约
                <el-tooltip class="item" effect="dark" content="创建面试成功后将通过短信(如勾选）或者邮箱（如勾选）的方式向候选人发送面试邀约。" placement="bottom-start">
                  <img src="../../../assets/img/reg/info.svg" alt="">
                </el-tooltip>
              </p>
              <el-row :gutter="100">
                <el-col :lg="24" :md="24" :sm="24">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox label="发送邮件通知候选人"></el-checkbox>
                    <el-checkbox label="发送短信通知通知候选人"></el-checkbox>
                    <el-checkbox label="同时发送面试登记表"></el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </div>

            <div class="interview_modal">
              <p class="title"></p>
              <p></p>
            </div>
          </el-form>


        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
    export default {
        name: "interview_second",
        components:{

        },
        data(){
          return{
            province:'',
            provinceData:[],
            interviewTime:'',
            checkList:[],

          }
        }
    }
</script>

<style scoped>
  .interview_second {
    margin-bottom: 20px;
  }
</style>
