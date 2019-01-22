<template>
  <div>
    <div class="mainCon el-col-24">
  		<!--顶部导航-->
  	<pageheader class="pageheader"></pageheader>
      <!--侧边栏-->
      <!--<div class="aside">-->
        <pageaside></pageaside>
      <!--</div>-->
      <!--右侧内容栏-->
      <div class="right-content pull-right">
        <div class="content">
          <!--主体内容-->

          <!--领导alert-->
          <el-dialog
            title=""
            :visible.sync="leaderAlert"
            class="leaderAlert"
            custom-class="leaderAlertContent">
            <div class="uploadLeaveConfirm">
              <img src="../../assets/img/dismission/ic_warning.svg" style="width:60px;height: 60px;">
              <div class="uploadLeaveContent" style="margin-top: 11px;">
                <p>建议您上级与HR都进行评测</p>
                <p>确定不邀请上级领导进行评价吗？</p>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="insertMsg" class="confirm" >确 定</el-button>
                <el-button @click="leaderAlert = false" class="cancel">取 消</el-button>
              </span>
          </el-dialog>
          <!--<div class="delete-alert alert" id="luru-confirm">
            <div class="modal-dialog">
              <div class="modal-content alert-content" style="width: auto;">
                <div class="modal-header alert-header pull-right">
                    <img src="../../assets/img/dismission/ic_close.svg" alt="">
                </div>
                <div class="uploadLeaveConfirm">
                  <img src="../../assets/img/dismission/ic_warning.svg" alt="" style="width:60px;height: 60px;">
                  <div class="uploadLeaveContent" style="margin-top: 11px;">
                    <p>建议您上级与HR都进行评测</p>
                    <p>确定不邀请上级领导进行评价吗？</p>
                  </div>
                  <div class="uploadLeaveConfirmBtn" style="margin-top:33px; ">
                    <div style="flex: 1"></div>
                    <button id="step3_entry" class="close search" ng-click="step3Submit()">确定</button>
                    <button class="close search" data-dismiss="modal" aria-hidden="false">取消</button>
                    <div style="flex: 1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>-->


          <p class="headline">
            <span><i>猎评曝光</i> /多维度评价</span>
          </p>
          <div class="uploadleave">
            <div class="uploadleave-status">
              <div class="status_success">
                <img src="../../assets/img/dismission/success.svg"  class="success two" ng-click="goToStep($event)"/>
                <!--hover 热区-->
                <div class="hover-info">
                  <i class="triangle-left"></i>
                  点击图标返回当前步骤修改
                </div>
              </div>
              <i class="step_a" ></i>

              <img src="../../assets/img/dismission/step2_a.svg" />
              <i class="step_a" ></i>
              <img src="../../assets/img/dismission/step3.svg" />
              <i class="step_a" ></i>
              <img src="../../assets/img/dismission/step4.svg" />
            </div>
            <div class="uploadleave-step">
              <dl>
                <dd>录入</dd>
                <dd>员工基础信息</dd>
              </dl>
              <dl>
                <dd>录入</dd>
                <dd>员工离职信息</dd>
              </dl>
              <dl>
                <dd>（选填）</dd>
                <dd>曝光失信行为</dd>
              </dl>
              <dl>
                <dd>上传</dd>
                <dd>联盟数据库</dd>
              </dl>
            </div>
          </div>
          <!--第2步-->
          <div class="uploadLeaveSetp3 ">
            <p class="uploadTitle">
              离职原因（必填）
            </p>
            <div class="uploadLeaveInfo3" id="leaveReason">
              <!--layui-form-->
              <div class="step_blance text-left">
                <!--<leaveReason ref="leaveChild"></leaveReason>-->
                <leaveReason :sendData="sendData"></leaveReason>
                <div class="item">
                  <label style="width:60px;vertical-align: top;">具体描述</label>
                  <textarea class="dimissionDescribe" id="dimissionDescribe" v-model="dimissionDescribe"  @input="descInput" name="dimissionDescribe"  maxlength="1000" style="width: 95%;height: 107px;" placeholder="请输入工作职责、任务及取得的成绩等" ></textarea>
                  <div class="decribe">
                    {{wordCount}}/1000字
                  </div>
                </div>
              </div>
            </div>
            <p class="uploadTitle">
              离职HR测评（必填）
            </p>
            <div class="uploadLeaveInfo3">
              <h1 style="margin-top:38px;">胜任力模型评测（HR）</h1>
              <div style="width: 100%;background: #ffffff;text-align: center;background-color:rgba(250,251,252,1) ">
                <button class="active hrTest" @click="hrTest(reportId)" >开始/修改评价</button><!--TODO reportId 暂时固定uploadLeaveSetup4-->
              </div>
            </div>
            <p class="uploadTitle">
              离职上级测评（选填）
            </p>
            <div class="uploadLeaveInfo3">
              <h1 style="margin: 33px 0 15px 0;">胜任力模型评测（上级）</h1>
              <h3>离职评价发布后邀请上级通过手机进行评测</h3>
              <div class="form">
                <div class="inline" style="position: relative;">
                  <div class="item">
                    <label>领导姓名<!--<span style="color:#F95714">*</span>-->
                    </label>
                    <input type="text" placeholder="请输入直属上级姓名" name="leaderName" v-model="leaderName">
                  </div>
                  <div class="item">
                    <label>手机号码<!--<span style="color:#F95714">*</span>-->
                    </label>
                    <input type="text" placeholder="请输入上级手机号"  name="leaderPhone" maxlength="11" v-model="leaderPhone">
                  </div>
                  <img src="../../assets/img/reg/info.svg" class="danger-hint">
                  <div class="hover-info">
                    <i class="triangle-left"></i>
                    手机号只用于发送评价试题，不会作用于其他用途
                  </div>
                </div>
                <div class="inline" style="vertical-align: top;margin-left: 90px;">
                  <div class="item">
                    <label>职级
                      <!--<span style="color:#F95714">*</span>-->
                    </label>
                    <input type="text" placeholder="请输入职级"  name="leaderPosition" v-model="leaderPosition">
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 100%;background: #ffffff;text-align: center;">
              <button id="jump_step_entry"  class="uploadLeaveSetup4 active " @click="insertTwo" >下一步</button>
            </div>
          </div>

          <!--主体内容-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import http from '@/http/http';
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
  import leaveReason from '@/components/common/leaveReason';

    export default {
        name: "uploadTwo",
        components:{
          pageheader,
          pageaside,
          leaveReason
        },
      data(){
          return{
            leaveChild:'',
            leaderName:'',
            leaderPhone:'',
            leaderPosition:'',
            dimissionDescribe:'',
            reportId:localStorage.getItem('reportId'),
            flag:this.$route.name=='uploadTwo'?'true':'false',
            wordCount:0,
            leaderAlert: false,//领导弹窗

            sendData:{
              isActivePassivity:'',
              checkedId:'',//选中离职原因id
              reasonContent:'',//选中离职原因content,
              liValue:'个人原因'
            }
          }
      },
      methods:{
        descInput(){//统计textarea 输入字数
          this.wordCount=this.dimissionDescribe.length;
        },

        hrTest(reportId){
          //TODO 获取reportId 跳转至测评
          // this.$router.push('/competency/'+reportId)
          let routeData = this.$router.resolve( '/competency/'+reportId+'/'+this.flag);
          window.open(routeData.href, '_blank');

        },
        //上传第二步
        insertTwo(){
          let that=this;

          //TODO 如果leader 没测的话，提示弹窗，确定按钮
          // if(that.$refs.leaveChild.isActivePassivity!="" && that.$refs.leaveChild.checkedId!="" && that.leaderName==""&&that.leaderPhone==""&&that.leaderPosition==""){
          //   that.leaderAlert=true;
          // }
          // if(that.$refs.leaveChild.isActivePassivity!="" && that.$refs.leaveChild.checkedId!="" && that.leaderName!=""&&that.leaderPhone!=""&&that.leaderPosition!=""){
          //   //直接插入信息
          //   that.getHttp();
          // }
          if(that.sendData.isActivePassivity!="" && that.sendData.checkedId!="" && that.leaderName==""&&that.leaderPhone==""&&that.leaderPosition==""){
            that.leaderAlert=true;
          }
          if(that.sendData.isActivePassivity!="" && that.sendData.checkedId!="" && that.leaderName!=""&&that.leaderPhone!=""&&that.leaderPosition!=""){
            //直接插入信息
            that.getHttp();
          }
        },
        //点击领导弹窗，确定按钮，插入信息
        insertMsg(){
          let that=this;
          that.leaderAlert = false;

          //直接插入信息
          that.getHttp();
        },
        getHttp(){
          let that=this;
          that.$http({
            method: "post",
            url:api.uploadTwo,
            headers:headers(),
            data: {
              reportId: localStorage.getItem('reportId'),
              dimissionType:that.sendData.isActivePassivity,
              dimissionReasonType:that.sendData.checkedId,//leaveReasonType,
              dimissionDescribe:that.dimissionDescribe,
              leaderName: that.leaderName,
              leaderPhone: that.leaderPhone,
              leaderPosition: that.leaderPosition

            }
          }).then(function (res) {
            console.log(res);
            let result = res.data;
            if (result.code == 10000) {
              // $("#luru-confirm").modal("hide");
              // $(".modal-backdrop").remove();
              // $state.go("uploadFour");
              // $scope.initDimission(dimissionId);
              //TODO 隐藏弹窗

              that.$router.push("uploadThree");
            }else{
              that.$message.error(res.data.msg);
            }
          });
        }
      }
    }
</script>

<style scoped>
  .text-left{
    text-align: left;
  }

  .selectLeaveType{
    width: 300px;
    height: 34px;
    border-radius: 0;
  }
  #luru-confirm{
    width: 540px;
    height: 272px;
  }
  #leaveReason{
    position: relative;
  }
  .decribe{
    color:rgba(151,162,179,1);
    text-align: right;
    margin-top: 12px;
    position: absolute;
    right: 30px;
    bottom: 5px;
  }

</style>
