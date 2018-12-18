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
              <h4 class="title"></h4>
              <div>
                <p><i>谭迎港</i>您好</p>
                <p>感谢关注上海棋至文化有限公司！我是该公司的HR。很高兴收到您的简历。面试安排如下：</p>
                <P>面试时间：<i>2018/09/09 14:30</i></P>
                <p>面试形式：<i>视频面试</i></p>
                <p>面试地点：<i>未知</i></p>
                <p>联系方式：<i>联系方式</i><i>12367889900</i></p>
              </div>

            </div>

            <div class="selectedModel">
              <el-row :gutter="40">
                <el-col :lg="12" :md="12" :sm="12">
                  <el-form-item label="选择通知模版">
                    <el-select v-model="province" placeholder="选择通知模版">
                      <el-option v-for="item in provinceData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :sm="12">
                  <el-form-item label="面试登记表模版">
                    <el-select v-model="province" placeholder="面试登记表模版">
                      <el-option v-for="item in provinceData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div class="interview_button">
              <el-button class="button">保存</el-button>
              <el-button class="button cancel">取消</el-button>
            </div>
          </el-form>


        </el-col>
      </el-row>

    </div>

    <!--面试列表以及状态-->
    <div class="interview_list_status">
      <button>继续添加面试</button>
      <div class="interview_list">
        <div class="interview">
          <img src="../../../assets/img/candidate/tanhcuang_ic_tag.png" alt="" class="img_status">
          <h4 class="title">
            <i>2018/09/08（星期一）· 现场面试</i>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                ...
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>取消面试</el-dropdown-item>
                <el-dropdown-item>修改面试</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </h4>
          <div>
            <p><label>面试地点：</label><i>未知</i></p>
            <p><label>面试负责人：</label><i>李乾坤</i><i>12345678912</i></p>
            <p><label>面试信息：</label>09:00开始 <em class="interview_status">初试</em></p>
            <p v-show="no_feedBook"><label>面试登记表：</label><img src="../../../assets/img/candidate/tanchuang_ic_bumanyi_pre.png" alt="">暂未检测到（候选人填写完提交后显示相关数据）</p>
            <p v-show="no_feedBook"><label>面试反馈：</label><img src="../../../assets/img/candidate/tanchuang_ic_bumanyi_pre.png" alt="">暂无反馈(用户签到后可填写面试反馈) <em class="interview_feedbook" @click="feedbook_form=true">填写面试反馈表</em></p>
            <div class="feedbook_form" v-show="feedbook_form">
              <div class="form-group">
                <label>反馈内容：</label>
                <textarea placeholder="请对候选人本次面试填写面试反馈，请务必填写周全、客观。"></textarea>
              </div>
             <div class="form-group">
               <label>反馈评价：</label>
               <span class="yawp active" >不满意</span>
               <span class="common">一般</span>
               <span class="satisfactory">较满意</span>
               <span class="great_satisfaction">非常满意</span>
             </div>
              <div class="form-group vertical">
                <input type="button" class="button" value="保存" @click="saveFeedbookForm">
                <input type="button" class="button cancel" value="取消">
              </div>
            </div>
            <!--已反馈-->
            <p v-show="!no_feedBook"><label>面试登记表：</label><i>已填写</i> <span class="look_Download"><i>查看</i> <i>下载</i></span></p>
            <p v-show="!no_feedBook">
              <label>面试反馈：</label>
              <span class="yawp">不满意</span>
              <em class="interview_feedbook el-icon-caret-bottom">查看面试反馈表 </em>
            </p>

            <!--查看面试反馈-->
            <div class="feedbook_form_pullDown">
              <h4>李乾坤 ·HR 2018/10/20 11:30反馈</h4>
              <p>反馈内容：<i>候选人实际工作经验与岗位不符合</i></p>
              <p>
                反馈评价：<span class="yawp active">不满意</span>
              </p>
            </div>

          </div>
        </div>
      </div>
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
            feedbook_form:false,
            no_feedBook:true,
          }
        },
      methods: {
        /*保存面试登记表
          * */
        saveFeedbookForm() {
          let that=this;
          that.feedbook_form=false;
          that.no_feedBook=false;
        }
      }
    }
</script>

<style scoped>
  .interview_second {
    margin-bottom: 20px;
  }
</style>
