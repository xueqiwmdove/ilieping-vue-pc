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
            <a>新增合同</a>
          </p>
          <!--<breadcrumb></breadcrumb>-->
          <div class="sendOfferSteps">
            <div class="sendOffer-status">
              <div class="sendOffer_one">
                <div>
                  <img src="../../assets/img/dismission/step1_a.svg" />
                  <i class="step_a" ></i>
                </div>
                <p>
                  <span>选择</span>
                  <span>合同模板</span>
                </p>
              </div>
              <div class="sendOffer_two">
                <div>
                  <img src="../../assets/img/dismission/step2_a.svg" />
                  <i class="step_a" ></i>
                </div>
                <p>
                  <span>选择</span>
                  <span>签约员工并填写合同</span>
                </p>

              </div>
              <!--<i class="step_a" ></i>-->
              <div class="sendOffer_three">
                <img src="../../assets/img/dismission/step3.svg" />
                <p>
                  <span>发起</span>
                  <span>合同签署</span>
                </p>
              </div>
            </div>
          </div>

          <!--标准模板  -->
          <div class="content_h">
            <!--<div class="fixation">-->
              <!--<div class="left">-->
                <!--<div class="inputBox">-->
                  <!--<label>合同名称<i>*</i></label>-->
                  <!--<input type="text" class="contractName" :maxlength="100"  v-model="contractName"/>-->
                  <!--<el-tooltip class="item" effect="dark" content="合同民称请不要包含特殊字符且长度不超过100字" placement="right-start">-->
                    <!--<img src="../../assets/images/reg/info.svg" alt="提示">-->
                  <!--</el-tooltip>-->
                <!--</div>-->

                <!--<div class="inputBox">-->
                  <!--<label>合同起止时间<i>*</i></label>-->
                  <!--<el-date-picker-->
                    <!--v-model="startEndTime"-->
                    <!--type="daterange"-->
                    <!--range-separator="-"-->
                    <!--start-placeholder="请选择合同开始时间"-->
                    <!--end-placeholder="请选择合同截止时间"-->
                    <!--value-format="yyyy-MM-dd"-->
                    <!--style="height: 40px;width: 400px;border-radius: 0;"-->
                    <!--:picker-options="pickerOptions">-->
                  <!--</el-date-picker>-->
                  <!--<el-tooltip class="item" effect="dark" content="合同起止时间将作为合同的实际有效期，合同到期前，系统将提醒您" placement="right-start">-->
                    <!--<img src="../../assets/images/reg/info.svg" alt="提示">-->
                  <!--</el-tooltip>-->
                <!--</div>-->

                <!--<div class="inputBox">-->
                  <!--<label>签署截止日期<i>*</i></label>-->
                  <!--<el-date-picker-->
                    <!--v-model="endTime"-->
                    <!--type="date"-->
                    <!--placeholder="请选择签署截止时间"-->
                    <!--class="endTime"-->
                    <!--value-format="yyyy-MM-dd"-->
                    <!--style="height: 40px;width: 400px;border-radius: 0;">-->
                  <!--</el-date-picker>-->
                  <!--<el-tooltip class="item" effect="dark" content="所有签署方需要在截止日期前完成签署" placement="right-start">-->
                    <!--<img src="../../assets/images/reg/info.svg" alt="提示">-->
                  <!--</el-tooltip>-->
                <!--</div>-->

              <!--</div>-->
              <!--<div class="buttonBox" @click="addEmployee=true" v-show="buttonIsShow">-->
                <!--添加签约员工-->
              <!--</div>-->
              <!--<div class="right" v-show="!buttonIsShow">-->
                <!--<img :src="profilePhotoUrl" alt="加载失败" v-show="profilePhotoUrl != null" width="80px" height="80px" style="border-radius: 50%;">-->
                <!--<img src="../../assets/img/dismission/women_19_32.svg" alt="icon" class="female" width="80px" height="80px" v-show="employeeSex=='女' && profilePhotoUrl == null">&lt;!&ndash; 女19-32 &ndash;&gt;-->
                <!--<img src="../../assets/img/dismission/men_19_32.svg" alt="icon" class="female" width="80px" height="80px" v-show="employeeSex=='男' && profilePhotoUrl == null">-->
                <!--<div>-->
                  <!--<p class="userName">{{userName}}</p>-->
                  <!--<p class="department">{{department}}</p>-->
                  <!--<p class="post">{{post}}</p>-->
                <!--</div>-->
                <!--<img src="../../assets/img/dismission/ic_delete.svg" alt="x" class="delete_this" @click="addEmployee=true">&lt;!&ndash;buttonIsShow=true;&ndash;&gt;-->
              <!--</div>-->
            <!--</div>-->

            <div class="html_div"><!-- htmldata start -->
              <p class="uploadTitle">基本信息</p><!-- htmldata 一级标题 -->
              <div class="div_input" >
                <div  class="from" >
                  <div class="input_div">
                    <label>员工姓名<span class="class_required">*</span></label>
                    <input type="text" autocomplete="off" id="id" name="id" placeholder="title"/>
                  </div>
              <!--  <div v-for="(itemcontent,i) in item.content" class="from" :key='i'>
                  <div v-if="itemcontent.type==='text'" class="input_div">
                    <label>{{itemcontent.title}}<span v-if="itemcontent.required===true" class="class_required">*</span></label>
                    <input type="text" autocomplete="off" :id="itemcontent.id" :name="itemcontent.id" :placeholder="itemcontent.title"/>
                  </div>
                  <div v-if="itemcontent.type==='select'" class="input_div">
                    <label>{{itemcontent.title}}<span v-if="itemcontent.required===true" class="class_required">*</span></label>
                    &lt;!&ndash;              <el-select class="classSelect" :id="itemcontent.id" v-model="itemcontent.defaultSelectStr" :name="itemcontent.defaultSelectStr" @change="changeSelected(itemcontent.id,itemcontent.select)">
                                    <el-option v-for="(itemselect, index) in itemcontent.select" :key="itemselect.val" :label="itemselect.val" :value="itemselect.val">{{itemselect.val}}</el-option>
                                  </el-select> &ndash;&gt;
                    <select :id="itemcontent.id">
                      <option value="-1">{{itemcontent.defaultSelectStr}}</option>
                      <option v-for="(itemselect, index) in itemcontent.select" :value="itemselect.key">{{itemselect.val}}</option>
                    </select>
                  </div>
                  <div v-if="itemcontent.type==='radio'" class="input_div">
                    <label>{{itemcontent.title}}<span v-if="itemcontent.required===true" class="class_required">*</span></label>
                    &lt;!&ndash; <el-radio-group class="classradio" :id="itemcontent.id" v-model="itemcontent.defaultSelectStr" :name="itemcontent.defaultSelectStr">
                       <el-radio v-for="(itemradio, index) in itemcontent.radio" :label="itemradio.val" :value="itemradio.key" :key="index">{{itemradio.val}}</el-radio>
                     </el-radio-group> &ndash;&gt;
                    <div class="radio_div" :id="itemcontent.id">
                      <div class="radio-inline" v-for="(itemradio, index) in itemcontent.radio">
                        <input class="classRadio" :name="itemcontent.id" type="radio" :value="itemradio.key" />
                        <span class="b-radio"></span>
                        <span for="itemcontent.id">{{itemradio.val}}</span>
                      </div>
                    </div>
                  </div>
                  <div v-if="itemcontent.type==='date'" class="input_div">
                    <label>{{itemcontent.title}}<span v-if="itemcontent.required===true" class="class_required">*</span></label>
                    <input type="text" autocomplete="off" :id="itemcontent.id" :name="itemcontent.id" :placeholder="itemcontent.title"/>
                  </div>
                  <div v-if="itemcontent.type==='textarea'" class="input_div">
                    <label>{{itemcontent.title}}<span v-if="itemcontent.required===true" class="class_required">*</span></label>
                    <input type="textarea" class="textareaClass" autocomplete="off" :id="itemcontent.id" :name="itemcontent.id" :placeholder="itemcontent.title"/>
                  </div>
                </div>-->
              </div>
            </div><!-- htmldata end -->
            <div class="submin_div">
              <button id="step2_entry" class="uploadLeaveSetup4 active click_btn" >提交</button>
            </div>
          </div>

          <!--标准模板-->


          <!--主体内容-->
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import http from '@/http/http'
  import api from '@/api/api.js'
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader'
  import pageaside from '@/components/common/pageaside'
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import breadcrumb from '@/components/common/breadcrumb'
  import {mapState,mapActions} from 'vuex'
    let vm = null;
    export default {
      name: "standardContract",
      components: {
        pageheader,
        pageaside,
        breadcrumb
      },
      data(){
         return{

         }
      },
      methods: {

      },
      mounted(){
        let that=this;

      }
    }
</script>
<style scoped>
  .main .right-content .content .headline{
    margin: 0;
  }

  .sendOfferSteps{
    border-bottom: 1px solid #E5E5E5;
  }
  .sendOfferSteps .sendOffer-status .sendOffer_one p,
  .sendOfferSteps .sendOffer-status .sendOffer_three p,
  .sendOfferSteps .sendOffer-status .sendOffer_two p{
    text-align: center;
  }
  .sendOfferSteps .sendOffer-status .sendOffer_one span,
  .sendOfferSteps .sendOffer-status .sendOffer_three span,
  .sendOfferSteps .sendOffer-status .sendOffer_two span{
    display: inline-block;
    width: 100%;
    margin: 10px 0 0 0;
  }
  .sendOfferSteps .sendOffer-status .sendOffer_one span,
  .sendOfferSteps .sendOffer-status .sendOffer_two span{
    text-indent: -201px;
  }
  .sendOfferSteps .sendOffer-status .sendOffer_three span{
    text-indent: -20px;
    color: #97A2B3;
  }
  .sendOfferSteps .sendOffer-status .sendOffer_one .step_a{
    background: #C9EACC;
  }
.text-center{text-align: center;}
.confirm{
  width:400px;
  height:44px;
  background:rgba(249,87,20,1);
  border-radius:4px;
  opacity:0.6;
  margin: 120px auto 0
;
}

</style>


