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
          <!--行业地区弹窗-->
          <div class="masking" v-show="isShowMasking" @click="closeAlertFun()"></div>
          <div class="industryArea blance_alert" v-show="isShowIndustry">
            <div class="alert_header">
              地区/行业
              <img src="../../assets/img/dismission/ic_close.svg" alt="" class="pull-right" @click="closeAlertFun()">
            </div>
            <div class="alert_body">
              <div class="industryBox">
                <label>行业</label>
                <el-select v-model="industry" placeholder="请选择行业" id="industry" @change="getIndustryId">
                  <el-option
                    v-for="(item,key) in industryData"
                    :key="key"
                    :label="item.enumValue"
                    :value="item.enumCode">
                  </el-option>
                </el-select>
              </div>
              <div class="areaBox">
                <label >地区</label>
                <el-select v-model="area" filterable placeholder="请选择地区" id="area">
                  <el-option
                    v-for="(item,key) in areaData"
                    :key="key"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
              <div class="phone-error-info">
                <img src="../../assets/img/reg/info.svg" alt="提示">
                <span>请选择该离职人员所处的行业与地区</span>
              </div>
            </div>
            <div class="alert_footer">
              <input type="button" value="提交" class="submit" :disabled="disabled" :class="click_opacity2" @click="submit_four">
            </div>

          </div>

          <!--主体内容-->
          <p class="headline">
            <span><i>猎评曝光</i> /多维度评价</span>
          </p>

          <div class="uploadleave">
            <div class="uploadleave-status">
              <div class="status_success">
                <img src="../../assets/img/dismission/success.svg"  class="success two" />
              </div>
              <i class="step_a" ></i>
              <div class="status_success">
                <img src="../../assets/img/dismission/success.svg"  class="success three" />
              </div>
              <i class="step_a" ></i>
              <div class="status_success">
                <img src="../../assets/img/dismission/success.svg"  class="success four" />
              </div>
              <i class="step_a" ></i>
              <div class="status_success">
                <img src="../../assets/img/dismission/step4_a.svg" />
              </div>
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
          <!--第4步-->
          <div class="uploadLeaveSetp5 " style="padding: 20px;" v-show="!last">
            <div class="report-basic">
              <img src="../../assets/img/dismission/women_19_32.svg" width="120" height="120" alt="icon" class="female" v-if="binfoData.userSex==0 &&  binfoData.userAge >=19 &&binfoData.userAge <= 32"><!-- 女19-32  sex_img==0-->
              <img src="../../assets/img/dismission/men_19_32.svg" width="120" height="120" alt="icon" class="female" v-if="binfoData.userSex==1 && binfoData.userAge >= 19 && binfoData.userAge <= 32"><!-- 男19-32 -->
              <img src="../../assets/img/dismission/men_0_18.svg" width="120" height="120" alt="icon" class="female" v-if="binfoData.userSex==1 && binfoData.userAge <= 18"><!-- 男18岁以下 -->
              <img src="../../assets/img/dismission/men_33_45.svg" width="120" height="120" alt="icon" class="female" v-if="binfoData.userSex==1 && binfoData.userAge >= 33 && binfoData.userAge <= 45"><!-- 男33-45 -->
              <img src="../../assets/img/dismission/men_46_60.svg" width="120" height="120" alt="icon" class="female" v-if="binfoData.userSex==1 && binfoData.userAge >= 46 && binfoData.userAge <= 60"><!-- 男46-60 -->
              <img src="../../assets/img/dismission/men_60+.svg" width="120" height="120" alt="icon" class="female" v-if="binfoData.userSex==1 && binfoData.userAge >= 60"><!-- 男60+ -->
              <img src="../../assets/img/dismission/women_0_18.svg" width="120" height="120" alt="icon" class="female" v-if="binfoData.userSex==0 && binfoData.userAge <= 18"><!-- 女18岁以下 -->
              <img src="../../assets/img/dismission/women_33_45.svg" width="120" height="120" alt="icon" class="female" v-if="binfoData.userSex==0 && binfoData.userAge >= 33 && binfoData.userAge <= 45"><!-- 女33-45 -->
              <img src="../../assets/img/dismission/women_46_60.svg" width="120" height="120" alt="icon" class="female" v-if="binfoData.userSex==0 && binfoData.userAge >= 46 && binfoData.userAge <= 60"><!-- 女46-60 -->
              <img src="../../assets/img/dismission/women_60＋.svg" width="120" height="120" alt="icon" class="female" v-if="binfoData.userSex==0 && binfoData.userAge >= 60"><!-- 女60+ -->
              <!--<img src="../../assets/img/dismission/ic_female.svg"  class="report-head-img" v-if="binfoData.userSex==0" >-->
              <!--<img src="../../assets/img/dismission/ic_man.svg"  class="report-head-img" v-if="binfoData.userSex==1" >-->
              <p class="report-head-name">{{binfoData.userName}}</p>
              <p class="report-head-basic">
                <span>年龄</span>{{binfoData.userAge}}({{binfoData.birthDate}})
                <span class="mobile">手机</span>{{binfoData.phoneUser}}
              </p>
            </div>
            <div style="width: 100%;background: #ffffff;text-align: center;margin-top: 50px;">
              <button  class="uploadLeaveSetup4 active viewReport" @click="viewReport()"
                       style="width: 160px;margin: 10px 10px;background: transparent;color:#F95714;border: 1px solid #F95714;">
                预览报告
              </button>
              <button id="step5_entry" class="uploadLeaveSetup4 active" @click="confirmUpload()"
                      style="width: 160px;margin: 10px 10px">
                确认上传
              </button>
            </div>
          </div>
          <div class="uploadLeaveSetp6 " style="padding: 20px;" v-show="last">
            <div class="uploadLeaveConfirm" style="padding: 80px 0 100px;">
              <img src="../../assets/img/dismission/ic_success.svg" alt="" style="width:60px;height: 60px;">
              <div class="uploadLeaveContent">
                <p>该员工离职报告已成功上传至联盟数据库</p>
                <span class="text-center" v-if="integral==5">职场诚信积分<i style="color: #f95714;">+{{integral}}</i>，已发送至您的账户</span>
              </div>
            </div>
            <div style="width: 100%;background: #ffffff;text-align: center;">
              <button class="uploadLeaveSetup4 active" style="width: 160px;margin: 10px 10px;background: transparent;color:#F95714;border: 1px solid #F95714;" @click="gotoUpload">
                查看我的上传
              </button>
              <button class="uploadLeaveSetup4 active" style="width: 160px;margin: 10px 10px" @click="continueUpload()">
                继续上传
              </button>
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

    export default {
        name: "uploadFour",
        components:{
          pageheader,
          pageaside
        },
      data(){
          return{
            binfoData:'',
            isShowMasking:false,
            isShowIndustry:false,
            industry:'',
            industryData:[],
            area:'',
            areaData:[
              '全国','北京市','上海市','天津市','重庆市','河北省','山西省','内蒙古','辽宁省','吉林省','黑龙江省','江苏省','浙江省','广西','安徽省',
              '福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','海南省','四川省','贵州省','云南省','西藏','陕西省','甘肃省','青海省',
              '宁夏','新疆','台湾','香港','澳门'
            ],
            last:false,
            integral:5,
          }
      },
      computed:{
        disabled(){
          let that=this;
          if(that.industry!=""&&that.area!=""){
            return false
          }else{
            return true
          }
        },
        click_opacity2(){
          let that=this;
          if(that.industry!=""&&that.area!=""){
            return{
              click_opacity:false
            }
          }else{
            return{
              click_opacity:true
            }
          }
        },
      },
      methods:{
          getUser(){
            let that=this;
           //TODO  回显测评用户基本信息 reportId  少了一个useAge 字段
            that.$http({
              method: "get",
              url:api.userInfo+localStorage.getItem("reportId"),
              headers:headers()
            }).then(function (res) {
              let result = res.data;
              if (result.code = 10000 ) {
                that.binfoData=result.data;
              }else{
                that.$message.error(res.data.msg)
              }
            });
          },
        //预览报告
        viewReport(){
            let that=this;
            that.reportId=localStorage.getItem('reportId');
            this.$router.push('/leaveReport/'+that.reportId)
        },
        //确认上传，添加展示地区和行业的弹框
        confirmUpload(){
          let that=this;
          that.isShowIndustry=true;
          that.isShowMasking=true;
        },
        //获取下拉行业的数据
        getIndustryData(){
          let that=this;
          that.$http({
            url:api.industry,
            method:'get',
            headers:headers()
          }).then(function (res) {
            console.log(res);
            let result=res.data;
            console.log(result);
            if(result.code==10000){
              that.industryData=result.data.valueList;
              console.log(that.industryData)
            }else{
              that.$message.error(result.data.msg)
            }
          })
        },
        //获取行业的id
        getIndustryId(value){//这个vId也就是value值
          let that=this;
          that.obj = {};
          that.obj = that.industryData.find((item)=>{//这里的userList就是上面遍历的数据源
            // console.log(item.enumCode)
            return item.enumCode == value;//筛选出匹配数据
          });
          console.log(that.obj.enumCode);//我这边的name就是对应label的
        },
        //关闭行业弹窗
        closeAlertFun(){
          let that=this;
          that.isShowIndustry=false;
          that.isShowMasking=false;
        },
        //点击弹窗提交按钮，提交第四步
        submit_four(){
            let that=this;
            that.$http({
              method: "post",
              url:api.uploadFour,
              headers:headers(),
              data: {
                reportId:localStorage.getItem("reportId"),
                industry:that.obj.enumCode,
                ownArea:that.area
              }
            }).then(function (res) {
              let result = res.data;
              if (result.code = 10000 ) {
                //TODO 隐藏展示地区和行业的弹框
                that.isShowIndustry=false;
                that.isShowMasking=false;

                if(result.integral==5){
                  that.integral=5;
                  that.last=true;

                }else{
                  that.integral=0;
                  that.last=true;
                }

                // $(".uploadleave-status img:last-child").attr('src', '../img/dismission/success.png').addClass('success');

              }else if(result.code==50000){
                //TODO 弹窗
                that.$message.error("业务处理失败，请稍后再试")
              }
            });
        },
        //继续上传
        continueUpload(){
            this.$router.push('/twoUpload')
        },
        //跳转到上传记录
        gotoUpload(){
          this.$router.push('/myupload')
        },
      },
      mounted(){
          let that=this;
          that.getUser();
          that.getIndustryData();

      },

    }
</script>

<style scoped>
.uploadLeaveSetup4{
  cursor: pointer;
}
  span.text-center{
    display: inline-block;
    margin: 15px 0 0;
    height: 20px;
    font-size: 14px;
    color: #748093;
    line-height: 20px;
  }
</style>
