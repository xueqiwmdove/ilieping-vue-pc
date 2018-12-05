import index from "../../router";
<template>
    <div>
      <!--离职原因弹窗-->
      <div class="alert" id="lizhi" v-show="lizhi">
        <div class="alert-dialog">
          <div class="alert-content">
            <div class="alert-header" style="border-bottom: 1px solid #e5e5e5;">
              <img src="../../assets/img/dismission/ic_close.svg" alt="" class="close pull-right" @click="closeLeaveAlert">
              <div class="modalTitle" style="text-align:center;" v-if="sendData.isActivePassivity==1">
                主动离职
              </div>
              <div class="modalTitle" style="text-align:center;" v-if="sendData.isActivePassivity==2">
                单位辞退
              </div>
            </div>
            <div class="tabbable tabs-left" >
              <ul class="nav nav-tabs">
                <li @click="changeReason($event,2,liValue)" :class="class1==2? 'active':''" :label="liValue">个人原因</li>
                <li @click="changeReason($event,1,liValue)" :class="class1==1? 'active':''" :label="liValue">公司原因</li>
                <li @click="changeReason($event,3,liValue)" :class="class1==3? 'active':''" :label="liValue" v-if="sendData.isActivePassivity==1">试用期离职</li>
              </ul>
              <div class="tab-content">
                <div  class="tab-pane active" style="box-sizing: border-box;margin-top: 8px;"><!--id="geren_{{$index+1}}"-->
                  <div  class="checkboxParent" style="width: 49%;display: inline-block;;padding-left: 20px;" v-for="(item,index) in leaveReasonData" :key="index"><!--v-for="item in leaveReasonData"-->
                    <label class="checkbox" @click="getReason(item.reasonContent)">
                      <input type="radio"  name="index"  :value="item.id" v-model="sendData.checkedId" ><i>{{item.reasonContent}}</i><!--<i></i>--><!--attr-id="{{item.id}}"-->
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div  class="alert-footer" style="width: 100%;background: #ffffff;text-align: center;">
              <button class="uploadLeaveSetup4 active leave-reason-button" @click="getData">确定</button>
            </div>
          </div>
        </div>
      </div>

      <!--行业弹窗-->

      <div class="item active" style="margin: 20px 0 20px 0;">
        <label>离职类型<span style="color:#F95714">*</span>
        </label>
        <el-select v-model="leaveType" placeholder="请选择离职类型" class="selectLeaveType" @change="changeleaveType">
          <el-option
            v-for="(item,key) in leaveTypeData"
            :key="key"
            :value="item.value">
          </el-option>
        </el-select>
        <button style="padding: 0 20px;height: 34px;line-height: 34px;background: #fff;border: 1px solid #e5e5e5;margin-left: 10px;border-radius: 4px;"
                class="uploadLeaveBtn add-leave-button" name="dimissionDescribe"  :disabled="disabled"
                @click="showLeaveJob">
          <img style="vertical-align: text-top" class="uploadLeaveImg" src="../../assets/img/dismission/add.svg" alt=""> 添加离职原因
        </button>
      </div>
      <div class="optionValue"></div>
      <p style="padding-left: 80px;margin-bottom: 20px;"  class="reasonNum" v-show="reasonNum" :id="checkedId" >{{sendData.liValue}}－{{sendData.reasonContent}}</p>
    </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js'
  import {headers} from '@/assets/js/common/lp.js'

    export default {
        name: "leaveReason",
        props:{
            sendData:'',
        },
        data(){
          return{
            leaveTypeData: [{
              value: '主动离职',
              label: '选项1'
            }, {
              value: '单位辞退',
              label: '选项2'
            }],
            leaveType: '',
            isActivePassivity:'',
            disabled:true,
            class:'disabled',
            lizhi:false,//弹窗显隐
            reason:2,//默认显示第一个内容
            leaveReasonData:'',
            class1:2,//默认给个人原因加active
            checkedId:'',//选中离职原因id
            reasonContent:'',//选中离职原因content,
            reasonNum:false,//原因条数
            liValue:'个人原因'
          }
        },
        methods:{
          //选择离职原因后，添加离职原因按钮可以点击
          changeleaveType(){
            let that = this;
            that.leaveType;
            console.log(that.leaveType);
            that.disabled=false;

            //获取离职类型
            if(that.leaveType=="主动离职"){
                that.sendData.isActivePassivity=1
            }else if(that.leaveType=="单位辞退"){
              that.sendData.isActivePassivity=2
            }
            //切换离职原因，选中展示在页面离职原因类型隐藏
            that.reasonNum=false;
          },

          //点击离职原因按钮，展示弹窗
          showLeaveJob(){
            let that = this;
            that.lizhi=true;
            that.getHttp( that.sendData.isActivePassivity,that.reason);


          },
          //获取弹窗消息
          getHttp(type,reason){
            let that = this;
            that.$http({
              method: "get",
              url:api.leaveReasonAlert +  type + "/" + reason,
              headers:headers()
            }).then(function (res) {
              let result = res.data;

              if (result.code = 10000 && result.data != null) {
                that.leaveReasonData = result.data;
                console.log( that.leaveReasonData);
              }

            });
          },


          //切换弹窗，左边离职原因
          changeReason(e,a,liValue){
            let that =this;
            let dom=e.target;

            that.class1=a;
            that.sendData.liValue=dom.innerHTML;

            // console.log(222+ that.liValue)

            if(dom.innerHTML=='个人原因'){
              that.reason=2;
            }else if(dom.innerHTML=='公司原因'){
              that.reason=1;
            }else{
              that.reason=3;
            }

            that.getHttp( that.sendData.isActivePassivity,that.reason);
          },
          //关闭弹窗
          closeLeaveAlert(){
            let that=this;
            that.lizhi=false;
          },
          //获取弹窗数据,展示在页面上，隐藏弹窗
          getData(){
            //获取选中的离职原因类型，离职原因
            let that=this;
            console.log(that.sendData.checkedId, that.sendData.reasonContent);
            that.lizhi=false;
            that.reasonNum=true;

          },
          getReason(b){
            let that=this;
            that.sendData.reasonContent=b;
            console.log(that.sendData.reasonContent);
          }
        },


    }
</script>

<style scoped>
.selectLeaveType{
  width: 300px;
  height: 34px;
}
#lizhi{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.5);
  z-index: 100;

}
#lizhi .alert-content{
  width: 800px;
  height: 374px;
  position: absolute;
  top: 50%;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 101;
  margin: -187px auto  0;
}
.alert-header{
  background: #fff;
  clear: both;
}
.alert-content{
}
.alert .alert-content .alert-footer{
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.alert .alert-content .alert-footer button{
  width: 120px;
  height: 32px;
  border-radius: 2px;
  padding: 0;
  margin: 0;
}
.pull-right{
  float: right;
}
.tabs-left{
  height: 258px;
  clear: both;
}
.tabs-left .nav-tabs{
  background:#FAFBFC;
  height:258px;
}
.tabs-left .nav-tabs li{
  width: 120px;
}
.tabs-left .tab-content{
  padding: 0;
  width: 680px;
  float: right;
}
input[type=radio]{
  border: none;
  cursor: pointer;
}
.close,.alert .alert-content .alert-footer button,.tabs-left .nav-tabs li{
  cursor: pointer;
}
.checkboxParent{
  height: 20px;
  line-height: 20px;
  margin-bottom: 15px;
}

</style>
