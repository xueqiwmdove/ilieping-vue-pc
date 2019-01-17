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
            <span><i>员工管理</i> /新增合同</span>
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

            <div class="html_div">
              <p class="uploadTitle">基本信息</p><!-- 一级标题 -->
              <div class="div_input basic" >
                <div  class="from" >
                  <div class="input_div">
                      <label>员工姓名<span class="class_required">*</span></label>
                      <!--<input type="text" autocomplete="off" v-model="employee" placeholder="请选择员工姓名"/>-->
                    <div class="input_group" v-clickOutSide="handleClose">
                      <input type="text" placeholder="请选择员工姓名" class="selectDepartment" v-model="employee" @click.stop="isShow2=true;" ><!--@click="isShow2=!isShow2"-->
                      <div class="treePullDown" v-show="isShow2">
                        <!--<el-input
                          placeholder="输入关键字进行过滤"
                          v-model="filterText2" class="filterInput">
                        </el-input>-->
                        <el-tree
                          class="filter-tree departmentTree"
                          :props="defaultProps"
                          :load="loadNode"
                          lazy
                          :filter-node-method="filterNode"
                          @node-click="getParent2"
                          ref="tree2">
                        </el-tree>
                      </div>
                    </div>

                  </div>
                  <div class="input_div">
                    <label>合同名称<span class="class_required">*</span></label>
                    <input type="text" autocomplete="off" class="contractName"  v-model="contractName" placeholder="请输入合同名称"/>
                  </div>
                  <div class="input_div">
                    <label>合同起止时间<span class="class_required">*</span></label>
                    <el-date-picker
                      v-model="startEndTime"
                      type="daterange"
                      range-separator="-"
                      start-placeholder="请选择合同开始时间"
                      end-placeholder="请选择合同截止时间"
                      value-format="yyyy-MM-dd"
                      style="height: 40px;width: 400px;border-radius: 0;"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                  </div>
                  <div class="input_div">
                    <label>签署截止时间<span class="class_required">*</span></label>
                    <el-date-picker
                      v-model="endTime"
                      type="date"
                      placeholder="请选择签署截止时间"
                      class="endTime"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions0"
                      style="height: 40px;width: 400px;border-radius: 0;">
                    </el-date-picker>
                  </div>
                </div>
              </div>

              <p class="uploadTitle">合同填充项目</p>
              <div class="div_input" >
                <div  class="from" >
                  <div class="input_div">
                    <label>岗位<span class="class_required">*</span></label>
                    <input type="text" autocomplete="off" v-model="station" placeholder="请输入岗位"/>
                  </div>
                  <div class="input_div">
                    <label>合同期限<span class="class_required">*</span></label>
                    <el-select v-model="selectTimeLimit" placeholder="请选择合同期限" style="width: 400px;">
                      <el-option
                        v-for="item in selectTimeLimitData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="input_div">
                    <label>试用期<span class="class_required">*</span></label>
                    <el-radio-group v-model="selectProbation" @change="selectRadio">
                      <el-radio  label="1" class="classRadio" >无</el-radio>
                      <el-radio  label="2" class="classRadio" >有</el-radio>
                    </el-radio-group>

                     <!-- <div class="radio_div" >
                        <div class="radio-inline" >
                          <input class="classRadio"  />
                          <span class="b-radio"></span>
                          <span for="itemcontent.id">{{itemradio.val}}</span>
                        </div>
                      </div>-->
                    </div>
                  <div class="input_div" v-if="selectRadios==2">
                    <label>试用期起止时间</label>
                    <el-date-picker
                      v-model="probationStartEndDate"
                      type="daterange"
                      range-separator="-"
                      start-placeholder="请选择试用期起止时间"
                      end-placeholder=""
                      value-format="yyyy-MM-dd"
                      style="height: 40px;width: 400px;border-radius: 0;">
                    </el-date-picker>
                  </div>
                  <div class="input_div" v-if="selectRadios==2">
                    <label>试用期工资<span class="class_required">*</span></label>
                    <input type="text" autocomplete="off" v-model="promotionWages" placeholder="试用期工资"/>
                  </div>
                  <div class="input_div">
                    <label>工时制度<span class="class_required">*</span></label>
                    <el-select v-model="manHourSystem" placeholder="请选择工时制度" style="width: 400px;">
                      <el-option
                        v-for="item in manHourSystemData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="input_div">
                    <label>转正工资方案<span class="class_required">*</span></label>
                    <el-select v-model="selectBasicWagesProgramme" placeholder="请选择转正工资方案" style="width: 400px;">
                      <el-option
                        v-for="item in selectBasicWagesProgrammeData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="input_div">
                    <label>转正工资<span class="class_required">*</span></label>
                    <input type="text" autocomplete="off" v-model="basicWages" placeholder="转正工资"/>
                  </div>
                  <div class="input_div" style="vertical-align: top;">
                    <label>工资发放日(例: 25)<span class="class_required">*</span></label>
                    <input type="text" autocomplete="off" v-model="payrollTime" placeholder="请输入日期"/>
                  </div>
                  <!--enterpriseAddress-->
                  <div class="input_div textarea_div">
                    <label>工作地址<span class="class_required">*</span></label>
                    <textarea class="textareaClass" autocomplete="off" v-model="enterpriseAddress" placeholder="请输入工作地址"></textarea>
                  </div>
                  <div class="input_div textarea_div">
                    <label>转正条件<span class="class_required">*</span></label>
                    <textarea class="textareaClass" autocomplete="off" v-model="promotionCondition" placeholder="请输入转正条件"></textarea>
                  </div>
                  <div class="input_div textarea_div">
                    <label>福利待遇</label>
                    <textarea class="textareaClass" autocomplete="off" v-model="welfareTreatment" placeholder="请输入福利待遇"></textarea>
                  </div>

                  </div>
              </div>

              <div class="submin_div text-center">
                <button id="step2_entry" class="uploadLeaveSetup4 active click_btn" :class="nextClass" :disabled="nextDisabled" @click="submitContract">提交</button>
              </div>
            </div>

          <!--标准模板-->


          <!--主体内容-->
        </div>
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
      directives : {
        //树形下拉点击其他地方收起
        clickOutSide:{
          bind:function(el,binding,vnode){
            function documentHandler(e){
              // console.log(e.target,el.contains(e.target))
              if(el.contains(e.target)){
                return false;
              }
              if(binding.expression){
                binding.value(e)
              }
            }
            el._vueClickOutside_ = documentHandler;
            document.addEventListener('click',documentHandler);
          },
          unbind:function(el,binding){
            document.removeEventListener('click',el._vueClickOutside_);
            delete el._vueClickOutside_;
          }
        }
      },
      data(){
         return{
           selectRadios:2,
           employee:localStorage.getItem('employeeName')||'',
           employeeId:localStorage.getItem('employeeId')||'',
           isShow2:false,
           filterText2:'',
           data:[],//员工数据
           childrendata:[],
           defaultProps: {
             children: 'children',
             label: 'label',
             isLeaf: 'leaf'
           },

           contractName:'',
           startEndTime:[],
           pickerOptions:{},
           endTime:'',
           pickerOptions0: {
             disabledDate(time) {
               return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
             }
           },
           station:'',//岗位
           selectTimeLimit:'',//合同期限
           selectTimeLimitData:[{
               value: '1',
               label: '固定期限(合同 开始/结束 日期)'
             }, {
               value: '2',
               label: '不固定期限 (合同开始日期)'
             }, {
               value: '3',
               label: '已完成一定工作为期限(合同开始日期)'
             }],
           selectProbation:'',//有无试用期
           probationStartEndDate:[],//试用期起止时间
           promotionWages:'',//试用期工资
           manHourSystem:'',//工时制度
           manHourSystemData:[
             {
               value:"1",
               label:"标准工时制度"
             },
             {
               value:"2",
               label:"综合计算工时制度"
             },
             {
               value:"3",
               label:"不定时工时制度"
             }
           ],
           basicWages:'',//转正工资
           selectBasicWagesProgramme:'', //转正公司方案
           selectBasicWagesProgrammeData:[
             {
               value:"1",
               label:"基本工资制"
             },
             {
               value:"2",
               label:"基本工资和绩效工资相结合制度"
             },
             {
               value:"3",
               label:"记件工资制"
             }
           ],
           payrollTime:'',// 工资发放日(例: 25)：
           enterpriseAddress:'',
           promotionCondition:'',// 转正条件
           welfareTreatment:'',// 福利待遇
           id:JSON.parse(localStorage.getItem("item")).templateNumber,
         }
      },
      watch: {
        filterText2(val) {
          this.$refs.tree2.filter(val);
        }
      },
      computed:{
        //下一步按钮是否禁止 disabled true
        nextDisabled:function () {
         /* employee:localStorage.getItem('employeeName')||'',
            employeeId:localStorage.getItem('employeeId')||'',
          contractName:'',
            startEndTime:[],
          endTime:'',
            station:'',//岗位
            selectTimeLimit:'',//合同期限
            selectProbation:'',//有无试用期
            probationStartEndDate:[],//试用期起止时间
            promotionWages:'',//试用期工资
            manHourSystem:'',//工时制度
            selectBasicWagesProgramme:'', //转正公司方案
            payrollTime:'',// 工资发放日(例: 25)：
            enterpriseAddress:'',
            promotionCondition:'',// 转正条件
            welfareTreatment:'',// 福利待遇
            id:JSON.parse(localStorage.getItem("item")).templateNumber,*/

          if( this.employee!="" && this.employeeId!="" && this.contractName!="" && this.startEndTime!="" &&
            this.endTime!="" && this.station!="" && this.selectTimeLimit!="" && this.selectProbation!="" && this.selectProbation== 2 &&
             this.promotionWages!="" && this.manHourSystem!="" && this.basicWages!="" &&
            this.selectBasicWagesProgramme!="" && this.payrollTime!="" && this.enterpriseAddress!="" &&
            this.promotionCondition!="" &&  this.id!=""
          ){
            return false
          } else if( this.employee!="" && this.employeeId!="" && this.contractName!="" && this.startEndTime!="" &&
            this.endTime!="" && this.station!="" && this.selectTimeLimit!="" && this.selectProbation!="" && this.selectProbation== 1
             && this.manHourSystem!="" && this.basicWages!="" &&
            this.selectBasicWagesProgramme!="" && this.payrollTime!="" && this.enterpriseAddress!="" &&
            this.promotionCondition!="" &&  this.id!=""
          ){
            return false
          }
          else{
            return true
          }
        },
        nextClass:function () {
          if(
            this.employee!="" && this.employeeId!="" && this.contractName!="" && this.startEndTime!="" &&
            this.endTime!="" && this.station!="" && this.selectTimeLimit!="" && this.selectProbation!="" &&
             this.promotionWages!="" && this.manHourSystem!="" && this.basicWages!="" &&
            this.selectBasicWagesProgramme!="" && this.payrollTime!="" && this.enterpriseAddress!="" &&
            this.promotionCondition!="" && this.id!=""
          ){
            return {
              click_opacity:false
            }
          } else if( this.employee!="" && this.employeeId!="" && this.contractName!="" && this.startEndTime!="" &&
            this.endTime!="" && this.station!="" && this.selectTimeLimit!="" && this.selectProbation!="" && this.selectProbation== 1
            && this.manHourSystem!="" && this.basicWages!="" &&
            this.selectBasicWagesProgramme!="" && this.payrollTime!="" && this.enterpriseAddress!="" &&
            this.promotionCondition!="" &&  this.id!=""
          ){
            return false
          }
          else{
            return {
              click_opacity:true
            }
          }
        }
      },
      methods: {
        selectRadio(param){
          let that=this;
          that.selectRadios=param;
        },
        //树形下拉点击其他地方收起
        handleClose(){
          this.isShow2=false;
        },
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        },
        /*
* @param node:当前点击节点信息
  @param resolve:传递参数方法
* */
        loadNode(node, resolve) {
          //  debugger
          if (node.level === 0) {
            let that=this;
            that.$http({
              url:api.employeList+"0",
              method:'get',
              headers:headers()
            }).then((res)=>{
              // console.log(res);
              if(res.data.code==10000){
                that.data=res.data.data;
                resolve(that.data);
              }
            }).catch((res)=>{
              resolve([]);
              that.$message.error("获取员工列表失败！")
            })
          }else{
            let that=this;
            that.$http({
              url:api.employeList+node.data.id,
              method:'get',
              headers:headers()
            }).then((res)=>{
              // console.log(res);
              if(res.data.code==10000){
                that.data=res.data.data;
                resolve(that.data);
              }
            }).catch((res)=>{
              resolve([]);
              that.$message.error("获取员工列表失败！")
            })
          }
        },
        /*
        * 选中员工
        * type=1 没有子节点
        * */
        getParent2(data) {
          let that=this;
          console.log(data);
          if(data.type==1){
            that.employee=data.label;
            that.isShow2=false;
            that.employeeId=data.id;
            that.returnEmployeeDetail();
          }

        },

        //合同管理回显员工信息
        returnEmployeeDetail(){
          let that=this;
          that.$http({
            method:"get",
            url:api.returnEmployeeDetail+that.employeeId,
            headers:headers(),
          }).then(function(res){
            if(res.data.code==10000){
              that.returnEmployeeData=res.data.data;
              console.log(that.returnEmployeeData);
              that.station=res.data.data.position;
              that.enterpriseAddress=res.data.data.enterpriseAddress;
            }
            else{
              that.$message.error(res.data.msg);
            }
          });
        },
        //创建待定合同
        submitContract() {
          let that = this;
          that.$http({
            method: "post",
            url: api.createContract,
            data: {
              agreementName: that.contractName,//合同名称
              templateNumber: that.id,//合同模板编号
              startTime: that.startEndTime[0],
              endTime: that.startEndTime[1],
              deadlineForSignature: that.endTime,//截止签字时间
              employeeId: that.employeeId,
              pageDate: {
                station:that.station,//岗位
                selectTimeLimit:that.selectTimeLimit,//合同期限
                contractStartDate:that.startEndTime[0],//合同开始日期
                contractEndDate:that.startEndTime[1],//结束
                selectProbation:that.selectProbation,//有无试用期
                probationEndDate:that.probationStartEndDate[1],//试用期起止时间
                probationStartDate:that.probationStartEndDate[0],
                promotionWages:that.promotionWages,//试用期工资
                manHourSystem:that.manHourSystem,//工时制度
                selectBasicWagesProgramme:that.selectBasicWagesProgramme, //转正公司方案
                basicWages:that.basicWages,//转正工资
                payrollTime:that.payrollTime,// 工资发放日(例: 25)：
                enterpriseAddress:that.enterpriseAddress,
                promotionCondition:that.promotionCondition,// 转正条件
                welfareTreatment:that.welfareTreatment,// 福利待遇
              }

            },
            headers: headers()
          }).then(function (res) {
            console.log(res);
            if (res.data.code == 10000) {
              let contractId = res.data.data;
              // that.$message.success("合同发送成功");
              that.$router.push('/contractDetail/' + contractId);
            } else {
              that.$message.error(res.message || res.data.msg);
            }
          })
        }
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
  textarea{
    width: 400px;
    height: 80px;
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




  .classSelect input[type=text]{
    text-indent: 12px;
  }
  .class_required{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 19px;
    color: #F95714;
  }
  .textareaClass{
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    padding-left: 10px;
  }



  .content_h{background: #fff; padding: 20px;}

  .content_h .inputBox .el-input__icon.el-range__icon.el-icon-date{
    position: absolute;
    right: 0;
  }
  .content_h .inputBox img{
    margin-left: 9px;
    vertical-align: middle;
  }
  .content_h .inputBox .el-date-editor.endTime.el-input.el-input--prefix.el-input--suffix.el-date-editor--date .el-input__inner{
    width: 400px;
    height: 44px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius:0;
  }
  .content_h .inputBox input{
    width: 400px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius:0;
    font-size: 16px;
  }
  .content_h .inputBox label{
    width: 104px;
    display: inline-block;
    font-size: 16px;
    color: #394A66;
    letter-spacing: 0;
    margin-right: 10px;
    text-align: right;
  }
  .content_h .inputBox label i{
    color: #f95714;
  }

  .div_input{
    background: #fafbfc;
    border: 1px solid #e5e5e5;
    color: #748093;
    margin: 0 21px;
    min-height: 200px;
    /*overflow: hidden;*/
    padding-bottom: 20px;
  }
  .div_input.basic{
    background:none;
    border: none;
    min-height: auto;
  }
  .div_input .from{
    width:  100%;
    /*float:  left;*/
    display:  inline-block;

  }
  .div_input .from .input_div{
    width: 49%;
    /*float: left;*/
    display: inline-block;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
  }
  .div_input .from .input_div.textarea_div{
    height: 80px;
    margin-top: 20px;
  }
  .div_input .from .input_div.textarea_div label{
   vertical-align: top;
  }
  .div_input .from .input_div label{
    margin-right: 10px;
    height: 34px;
    line-height: 34px;
    text-align: right;
    display: inline-block;
    width: 30%;
  }
  .div_input .from .input_div .classRadio{
    width: 30px;
  }
  .div_input .from .input_div input{
    min-width: 400px;
    width: 400px;
    height: 40px;
    /*left: 18px;*/
  }
  .div_input .from .input_div  input[type=radio]{
    opacity: 0;
    z-index: 2;
  }

  .input_div select::-ms-expand{ display: none; } /* ie清除 */
  .input_group{
    position: relative;
    min-width: 400px;
    width: 400px;
    display: inline-block;
  }
  .treePullDown{
    position: absolute;
    top: 43px;
    left: 0px;
    width: 400px;
    height: 300px;
    padding: 0 0 4px 0;
    background: #FFFFFF;
    -webkit-box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
    z-index: 2;
  }

</style>
<style>
  .basic .input-group .treePullDown .departmentTree .el-tree-node__content {
    height: 34px;
  }
</style>


