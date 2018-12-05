<template>
  <div>
    <p class="uploadTitle">
      工作经历（必填）
    </p>
    <div class="uploadLeaveInfo3" >
      <div>
        <div style="position: relative">公司&nbsp;&nbsp; &nbsp;
        	{{sendData.enterpriseName}}
          <img style="position: absolute;" src="../../assets/img/account/authentication.png" v-if="isAuthentication=='0'"><i v-if="isAuthentication=='0'" style="color:#97A2B3;font-size: 12px;font-style: normal;margin-left: 15px;" >未认证</i>
          <img style="position: absolute;" src="../../assets/img/account/authentication.png" v-if="isAuthentication=='1'"><i v-if="isAuthentication=='1'" style="color:#97A2B3;font-size: 12px;font-style: normal;margin-left: 15px;" >未认证</i>
          <img style="position: absolute;" src="../../assets/img/account/authentication.png" v-if="isAuthentication=='2'"><i v-if="isAuthentication=='2'" style="color:#97A2B3;font-size: 12px;font-style: normal;margin-left: 15px;" >未认证</i>
          <img style="position: absolute;" src="../../assets/img/account/af_authentication.png" v-if="isAuthentication=='3'"><i v-if="isAuthentication=='3'" style="color: #FC8E00;font-size: 12px;font-style: normal;margin-left: 15px;" >已认证</i>
        </div>
      </div>
      <div class="form">
        <div class="inline">
          <div class="item">
            <label>任职时间<span style="color:#F95714">*</span>
            </label>
            <el-date-picker align="left"
              v-model="sendData.workTime"
              type="daterange"
              start-placeholder="请选择在职时间"
              end-placeholder=""
              value-format="yyyy-MM-dd"
              :default-time="['00:00:00', '23:59:59']" style="height: 34px;line-height: 20px;">
            </el-date-picker>
          </div>
          <div class="item">
            <label>任职岗位<span style="color:#F95714">*</span>
            </label>
            <input id="post" type="text" placeholder="请输入职位" v-model="sendData.post" maxlength="10"  required>
          </div>
        </div>
        <!--layui-form-->
        <div class="inline" style="padding-right: 0;margin-left:107px;">
          <!--layui-input-inline-->
          <div class="item" style="width:103%">
            <label>工作类型<span style="color:#F95714">*</span>
            </label>
            <el-select v-model="sendData.workType" placeholder="请选择工作类型">
              <el-option
                v-for="item in workTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </div>
          <div class="item" style="width:103% ">
            <label>任职部门<span style="color:#F95714">*</span>
            </label>
            <input id="department" type="text" placeholder="请输入您所在的部门" v-model="sendData.department" maxlength="10" required>
          </div>
        </div>
        <div class="item">
          <label style="margin-right: 15px;">工作描述</label>
          <textarea placeholder="请输入工作描述" autocomplete="off" v-model="sendData.workDescribe" @input="descInput"></textarea>

          <div style="color:rgba(151,162,179,1);text-align: right;margin-top: 5px;position: absolute;left: 812px;bottom: 0;">
            {{wordCount}}/1000字
            <!--{{wordCount}}-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '@/http/http';
  import api from '@/api/api.js';
  import {headers} from "../../assets/js/common/lp";

    export default {
        name: "workExperience",
        props:{
          sendData:''
        },
        data(){
          return{
            workTime: [],
            startJobTime:'',
            endJobTime:'',
            workTypeData: [{
              value: '1',
              label: '全职'
            }, {
              value: '0',
              label: '兼职'
            }, {
              value: '2',
              label: '实习'
            }],
            workType: '',
            post:'',
            department:'',
            workDescribe:'',
            wordCount:0,
            enterpriseName:'',//公司名
            isAuthentication:''

          }

        },
        methods:{
        	descInput(){//统计textarea 输入字数
        		this.wordCount=this.sendData.workDescribe.length;
        	},
          getCompany(){
            let that=this;
            that.$http({
              url:api.detail,
              method:'get',
              headers:headers(),
            }).then(function (res) {
              let result=res.data;
              if(result.code==10000){
                // console.log(result);
                that.sendData.enterpriseName=result.data.enterpriseName;
                that.isAuthentication=result.data.isAuthentication
                // if (result.data.isAuthentication == 1) {
                //   that.isAuthentication = 1;//"未认证";
                // } else if (result.data.isAuthentication == 2) {
                //   that.isAuthentication = 2;//"认证中";
                // } else {
                //   that.isAuthentication =3;// "已认证";
                // }
              }
            })
          }
        },
        computed:{

        },
        mounted(){
            let that=this;
            that.getCompany();
        }
    }
</script>

<style scoped>
.icon_time{
	background: url(../../assets/img/dismission/ic_calendar.svg) left no-repeat;
}

</style>
