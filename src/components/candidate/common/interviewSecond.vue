<template>
  <div class="interview_second">
    <!--无操作-未到面试状态-->
    <div class="noOps" v-if="noOps">
      <img src="../../../assets/img/candidate/tanchuang_pic_interview2.png" alt="">
      <p>将候选人移动至「面试」后（右侧），才可以添加面试</p>
    </div>
    <!--缺省-已到面试状态-->
    <div class="noInterviews" v-show="noInterviews"><!--!interview_basic && interviewList == ''-->
      <img src="../../../assets/img/candidate/tanchuang_pic_interview1.png" alt="">
      <p>暂未添加面试</p>
      <button @click="interview_basic=true;noInterviews=false">添加面试</button>
    </div>

    <!--面试基本信息-->
    <div class="interview_basic" v-show="interview_basic">

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
                    <el-select v-model=" interviewType" placeholder="初试">
                      <el-option v-for="item in  interviewTypeData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :lg="8" :md="8" :sm="8">
                  <el-form-item>
                    <el-select v-model="interviewMode" placeholder="面试形式">
                      <el-option v-for="item in interviewModeData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                  <el-col :lg="8" :md="8" :sm="8">
                    <el-form-item>
                      <el-select v-model="interviewer" placeholder="选择面试官支持搜索">
                        <el-option v-for="item in commendEmployeeIdData" :key="item.employeeName" :label="item.employeeName" :value="item.id"></el-option>
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
                      type="datetime"
                      placeholder="请选择面试时间"
                      value-format="yyyy-MM-dd HH:mm"
                      :picker-options="pickerOptions0">
                    </el-date-picker>
                  </el-form-item>
                </el-col>

              <!--  <el-col :lg="8" :md="8" :sm="8">
                  <el-form-item>
                    <el-date-picker
                      v-model="interviewTime"
                      type="date"
                      range-separator=""
                      start-placeholder="面试时间段"
                      end-placeholder="">
                    </el-date-picker>
                  </el-form-item>
                </el-col>-->

                <el-col :lg="8" :md="8" :sm="8">
                  <el-form-item>
                    <el-select v-model="interviewAddress" placeholder="面试地点">
                      <el-option v-for="item in addressList" :key="item.city" :label="item.city" :value="item.city"></el-option>
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
                  <el-checkbox v-model="emailRequired" disabled>发送邮件通知候选人</el-checkbox>
                  <!--<el-checkbox-group v-model="checkList">-->
                    <!--<el-checkbox label="发送邮件通知候选人"></el-checkbox>-->
                    <!--<el-checkbox label="发送短信通知通知候选人"></el-checkbox>-->
                    <!--<el-checkbox label="同时发送面试登记表"></el-checkbox>-->
                  <!--</el-checkbox-group>-->
                </el-col>
              </el-row>
            </div>

            <div class="interview_modal">
              <h4 class="title"></h4>
              <div v-for="item in candidateStepsData">
                <p><i>{{item.candidateName}}</i>您好</p>
                <p>感谢关注上海棋至文化有限公司！我是该公司的HR。很高兴收到您的简历。面试安排如下：</p>
                <P>面试时间：<i>{{interviewTime}}</i></P>
                <p>面试形式：<i v-if="interviewMode==3">视频面试</i><i v-if="interviewMode==2">电话面试</i><i v-if="interviewMode==1">现场面试</i></p>
                <p>面试地点：<i>{{interviewAddress}}</i></p>
                <p>联系方式：<i>{{item.chargeName}}</i><i>{{item.chargePhone}}</i></p>
              </div>

            </div>

            <div class="selectedModel">
              <el-row :gutter="40">
                <el-col :lg="12" :md="12" :sm="12">
                  <el-form-item label="选择通知模版">
                    <el-select v-model="notifyTemplate" placeholder="选择通知模版">
                      <el-option v-for="item in notifyTemplateData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :lg="12" :md="12" :sm="12">
                  <el-form-item label="面试登记表模版">
                    <el-select v-model="notifyTemplate" placeholder="面试登记表模版">
                      <el-option v-for="item in notifyTemplateData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div class="interview_button">
              <el-button class="button" @click="insertInterview">保存</el-button>
              <el-button class="button cancel">取消</el-button>
            </div>
          </el-form>


        </el-col>
      </el-row>

    </div>

    <!--面试列表以及状态-->
    <div class="interview_list_status" v-show=" interview_list_status"><!--&& interviewList != ''-->
      <button @click="interview_basic=true;interview_list_status=false;">继续添加面试</button>
      <div class="interview_list" >
        <div class="interview" v-for="item in interviewList">
          <img src="../../../assets/img/candidate/tanhcuang_ic_tag.png" alt="" class="img_status">
          <!--status 面试状态 0 面试取消 1 待确认 2 待面试 3 已签到 4 已面试  6拒绝面试 -->
          <img src="../../../assets/img/candidate/tanchuang_mianshi_pic_cancel.png" alt="" class="cancelInterview" v-if="item.status==0">
          <img src="../../../assets/img/candidate/tanchuang_offer_pic_notreceive.png" alt="" class="cancelInterview" v-if="item.status==1">
          <img src="../../../assets/img/candidate/tanchuang_offer_pic_receive.png" alt="" class="cancelInterview" v-if="item.status==2">
          <img src="../../../assets/img/candidate/tanchuang_offer_pic_refused.png" alt="" class="cancelInterview" v-if="item.status==6">
          <h4 class="title">
            <i>{{item.interviewDate}}（{{item.dateToWeek}}）· {{item.interviewModeStr}}</i>
            <el-dropdown trigger="click" v-if="item.status!=6">
              <span class="el-dropdown-link">
                ...
              </span>
              <el-dropdown-menu slot="dropdown" v-if="item.status==0">
                <el-dropdown-item>{{item.cancelRemark}}</el-dropdown-item>
                <!--<el-dropdown-item @click.native="updateInterview(item.id)">修改面试</el-dropdown-item>-->
              </el-dropdown-menu>
              <el-dropdown-menu slot="dropdown" v-if="item.status!=0">
                <el-dropdown-item @click.native="cancelInterview(item.id)">取消面试</el-dropdown-item>
                <!--<el-dropdown-item @click.native="updateInterview(item.id)">修改面试</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
          </h4>
          <div>
            <p><label>面试地点：</label><i>{{item.interviewAddress}}</i></p>
            <p><label>面试负责人：</label><i>{{item.interviewerName}}</i><i>{{item.interviewerPhone}}</i></p>
            <p><label>面试信息：</label><i v-html="formatDate(item.interviewDate)">开始</i> <em class="interview_status">{{item.interviewTypeStr}}</em></p>
            <p  v-if="item.interviewFormTemplate == null "><!--v-show="no_feedBook" -->
              <label>面试登记表：</label>
              <img src="../../../assets/img/candidate/tanchuang_ic_bumanyi_pre.png" alt="">
              暂未检测到（候选人填写完提交后显示相关数据）
            </p>

            <!--v-show="no_feedBook" -->
            <p v-if="item.interviewSatisfaction == null"><label>面试反馈：</label><img src="../../../assets/img/candidate/tanchuang_ic_bumanyi_pre.png" alt="">暂无反馈(用户签到后可填写面试反馈) <em class="interview_feedbook" @click="feedbook_form=true">填写面试反馈表</em></p>
            <div class="feedbook_form" v-show="feedbook_form" >
              <div class="form-group">
                <label>反馈内容：</label>
                <textarea placeholder="请对候选人本次面试填写面试反馈，请务必填写周全、客观。" v-model="interviewFeedback"></textarea>
              </div>
             <div class="form-group">
               <label>反馈评价：</label><!--interviewSatisfaction-->
               <span class="yawp" :class="interviewSatisfaction==1?'active':''" @click="selected(1)">不满意</span>
               <span class="common" :class="interviewSatisfaction==2?'active':''" @click="selected(2)">一般</span>
               <span class="satisfactory" :class="interviewSatisfaction==3?'active':''" @click="selected(3)">较满意</span>
               <span class="great_satisfaction" :class="interviewSatisfaction==4?'active':''" @click="selected(4)">非常满意</span>
             </div>
              <div class="form-group vertical">
                <input type="button" class="button" value="保存" @click="saveFeedbookForm(item.id)">
                <input type="button" class="button cancel" value="取消" @click="cancelFeedbookForm">
              </div>
            </div>
            <!--已反馈 v-show="feedBook"-->
            <p  v-if="item.interviewFormTemplate != null "><label>面试登记表：</label><i>已填写</i> <span class="look_Download"><i>查看</i> </span></p><!--<i>下载</i>-->
            <p v-if="item.interviewSatisfaction!=null"><!--TODO v-show="feedBook"-->
              <label>面试反馈：</label>
              <span v-show="item.interviewSatisfaction==1" :class="item.interviewSatisfaction==1?'yawp':''">不满意</span>
              <span v-show="item.interviewSatisfaction==2" :class="item.interviewSatisfaction==2?'common':''">一般</span>
              <span v-show="item.interviewSatisfaction==3" :class="item.interviewSatisfaction==3?'satisfactory':''">较满意</span>
              <span v-show="item.interviewSatisfaction==4" :class="item.interviewSatisfaction==4?'great_satisfaction':''">非常满意</span>
              <em class="interview_feedbook el-icon-caret-bottom" @click="feedbook_form_pullDown=!feedbook_form_pullDown">查看面试反馈表 </em>
            </p>

            <!--查看面试反馈-->
            <div class="feedbook_form_pullDown" v-show="feedbook_form_pullDown">
              <h4>{{item.interviewerName}} {{item.feedbackTime}}反馈</h4>
              <p>反馈内容：<i>{{item.interviewFeedback}}</i></p>
              <p>
                反馈评价： <span v-show="item.interviewSatisfaction==1" :class="interviewSatisfaction==1?'yawp':''">不满意</span>
                <span v-show="item.interviewSatisfaction==2" :class="interviewSatisfaction==2?'common':''">一般</span>
                <span v-show="item.interviewSatisfaction==3" :class="interviewSatisfaction==3?'satisfactory':''">较满意</span>
                <span v-show="item.interviewSatisfaction==4" :class="interviewSatisfaction==4?'great_satisfaction':''">非常满意</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!--取消面试弹窗-->
    <cancelInterview ref="Interview" :param="param"></cancelInterview>
  </div>
</template>

<script>
    import http from '@/http/http'
    import api from '@/api/api.js';
    import {headers} from '@/assets/js/common/lp.js'
    import {formatDate} from '@/assets/js/common/date_year.js';
    import cancelInterview from '@/components/candidate/common/cancelInterviewAlert'

    export default {
        name: "interview_second",
        props:['candidateStepsData','addressList','commendEmployeeIdData'],
        components:{
          cancelInterview
        },
        data(){
          return{
            noOps:false,
            noInterviews:true,
            interview_basic:false,
            interview_list_status:false,
            province:'',
            provinceData:[],
            interviewTime:'',
            checkList:[],
            feedbook_form:false,
            no_feedBook:true,
            feedbook_form_pullDown:false,
            feedBook:false,
            interviewList:[],//面试列表
            interviewAddress:'',
            interviewType:'',
            interviewTypeData:[
              {
                value:'1',
                label:'初试'
              },{
                value:'2',
                label:'复试'
              },{
                value:'3',
                label:'终试'
              }
            ],
            interviewMode:'',//面试形式
            interviewModeData:[
              {
                value:'1',
                label:'现场面试'
              },{
                value:'2',
                label:'电话面试'
              },{
                value:'3',
                label:'视频面试'
              }
            ],
            interviewer:'',
            interviewerData:[],
            notifyTemplate:'',
            notifyTemplateData:[
              {
                value:'1',
                label:'系统默认'
              }
            ],
            //大于等于当天
            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now()-8.64e7;
              }
            },
            emailRequired:true,
            interviewFeedback:'',//面试反馈内容
            interviewSatisfaction:'',//面试反馈登级
            candidateID:'',
            param:'',//取消面试的id
          }
        },
      methods: {
        // formatDate(time) {
        //   let date = new Date(time);
        //   return formatDate(date, 'yyyy/MM/dd hh:mm');
        //   //此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
        // },
        //  点击选中反馈
        selected(param){
          let that=this;
          if(param==1){
            that.interviewSatisfaction=1;
          }else if(param==2){
            that.interviewSatisfaction=2;
          }else if(param==3){
            that.interviewSatisfaction=3;
          }else if(param==4){
            that.interviewSatisfaction=4;
          }else{
            that.interviewSatisfaction="";
          }
        },
        formatDate(time) {
          let date = new Date(time);
          return formatDate(date, 'hh:mm');
          //此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
        },
        //  查看面试列表
        getInterview(){
          let that=this;
          that.candidateID= localStorage.getItem('candidateID');
          that.$http({
            method:'get',
            url:api.interviewList+that.candidateID,
            headers:headers(),
          }).then(function (res) {
            if(res.data.code==10000){
              console.log(res.data.data);
              that.interviewList=res.data.data;
              if(that.interviewList.length==0){

                that.noInterviews=true;
                that.interview_basic=false;
                that.interview_list_status=false;
              }else{
                that.noInterviews=false;
                that.interview_list_status=true;
                that.interview_basic=false;
              }
              console.log(that.interview_basic,that.interviewList.length)
            }
          })
        },
        //插入面试
        insertInterview(){
          let that=this;
          that.candidateID= localStorage.getItem('candidateID');
          that.$http({
            method:'post',
            url:api.insertInterview,
            data:{
              candidateId:that.candidateID,
              interviewer:that.interviewer,
              interviewType:that.interviewType,//interview_type：1 初试  2复试  3终试
              interviewMode:that.interviewMode,//interview_mode：1 现场面试 2 电话面试 3 视频面试
              interviewDate:that.interviewTime,
              interviewAddress:that.interviewAddress,
              notifyTemplate:1,//选择通知模板
            },
            headers:headers(),
          }).then(function (res) {
            if(res.data.code==10000){
              console.log(res.data.data);
              that.getInterview();
            //TODO 刷新
            }else {
              that.$message.error(res.data.msg)
            }
          })
        },
        //  取消面试 TODO 弹窗要做 blance
        cancelInterview(param){
          let that=this;
          that.param=param;
          that.$refs.Interview.open();

          /* that.$http({
             method:'post',
             url:api.cancelInterview,
             data:{
               id:param,
               cancelRemark:'',//that.cancelRemark,
             },
             headers:headers(),
           }).then(function (res) {
             if(res.data.code==10000){
               console.log(res.data.data);
               that. getInterview();

             }else {
               that.$message.error(res.data.msg)
             }
           })*/
          // that.$emit('listentochild',true)
        },
        /*保存面试反馈表
          * */
        saveFeedbookForm(param) {
          let that=this;
          that.feedbook_form=false;
          that.no_feedBook=false;
          that.feedBook=true;
          that.$http({
            method:'post',
            url:api.feedbackInterview,
            data:{
              id:param,
              interviewFeedback:that.interviewFeedback,//面试反馈
              interviewSatisfaction:that.interviewSatisfaction,
            },
            headers:headers(),
          }).then(function (res) {
            if(res.data.code==10000){
              console.log(res.data.data);
              that.getInterview();
              // that.feedbook_form_pullDown=!that.feedbook_form_pullDown
            }else {
              that.$message.error(res.data.msg)
            }
          })
        },
        /*取消面试登记表
        * */
        cancelFeedbookForm() {
          let that=this;
          that.feedbook_form=false;

        }



      },
      mounted(){
          let that=this;
          // that.getInterview();

      }
    }
</script>

<style scoped>
  .interview_second {
    margin-bottom: 20px;
  }
</style>
