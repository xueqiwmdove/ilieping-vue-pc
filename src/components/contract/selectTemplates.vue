<template>
  <div>
    <div class="main">
      <!--顶部导航-->
      <nav @click="goTOBySinging">
        <img src="../../assets/img/contract/ic_fanhui.svg" alt=""> 选择文件和签约方
      </nav>
      <!--右侧内容栏-->
      <div class="right-content" >
        <div class="content">
          <!--主体内容-->
          <p class="headline">
            <a>发起签约</a>
          </p>
          <!--选择模板  :before-close="handleClose"-->
          <el-dialog
            title="选择模板"
            :visible.sync="modelAlert"
            class="modelAlert"
            custom-class="modelAlertCotent">
            <div class="modelCarsouel">
              <swiper :options="swiperOption"   ref="mySwiper">
                <swiper-slide v-for="(item,index) in templateData"  :key="index"   :class="current==index?'active':''" :title="JSON.stringify(item)" ><!-- @clcik.native="clickSelect(index,item)"-->
                  <div class="singleTemplate">
                    <p class="title">{{item.templateName}}</p>
                    <p style="display: none" class="totalPage">{{item.totalPage}}</p>
                    <p style="display: none" class="templateNumber">{{item.templateNumber}}</p>
                    <p class="lookContract" @click="lookPdf(item.templateAddress)">
                      查看合同
                    </p>
                  </div>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"> < </div>
                <div class="swiper-button-next" slot="button-next"> > </div>
              </swiper>
            </div>
            <div class="modelInfo">
              <p>模板介绍：</p>
              支持重复、批量发送标准合同；<br>
              试用场景：劳动合同、经销商合同、服务协议等任何需要批量发送标准合同的场景。
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="goTO_selectTemplates" class="confirm">确 定</el-button>
              <el-button @click="modelAlert = false" class="cancel">取 消</el-button>
            </span>
          </el-dialog>
          <!--选择模板-->

          <!--添加签约员工弹窗-->
          <el-dialog
            title="签约员工信息"
            :visible.sync="signEmployeesDetail"
            class="signEmployeesDetail"
            custom-class="signEmployeesDetailContent">
            <div class="inputParent nameParent">
              <label for="name">姓名</label>
              <input type="text" placeholder="请输入姓名" id="name" v-model="employeeName1" @keyup.enter="addEmployee">
              <span :class="{'name_error':nameStyle}">姓名格式错误</span>
            </div>
            <div class="inputParent phoneParent">
              <label for="phone">手机号</label>
              <input type="text" placeholder="请输入手机号" id="phone" v-model="employeePhone1" maxlength="11" @keyup.enter="addEmployee">
              <span :class="{'phone_error':phoneStyle}">手机号格式错误</span>
            </div>
            <div class="signError">
              <img src="../../assets/img/contract/ic_prompt.svg" alt="">签署人需要实名认证，成为实名认证用户后，您发起的合同法律有效
              性更强有效减少抵赖。
            </div>

            　
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" class="confirm" @click="addEmployee" :class="name_phone_class" :disabled="name_phone_dis"  v-show="!updateStatus">添加员工</el-button><!--:class="name_phone_class"-->
               <el-button type="primary" class="confirm" @click="addEmployee" :class="name_phone_class" :disabled="name_phone_dis" v-show="updateStatus">修改员工</el-button>
             </span>
          </el-dialog>
          <!--添加签约员工弹窗-->

          <div class="signStepContent">
            <!--第一步选择模板-->
            <div class="signFirst">
              <p class="stepTitle">第一步：选择模板</p>
              <div class="stepContent">
                <div class="contractBox" @click="modelAlert=true;showModels()">
                  <div class="imgBox">
                    <p class="title">{{itemData.templateName}}</p>
                  </div>
                  <div class="contractDetail">
                    <p class="name">{{itemData.templateName}}</p>
                    <em>{{itemData.totalPage}}页</em>
                  </div>
                </div>
                <div class="contractInputs">
                  <div class="inputBox">
                    <label>合同名称<i>*</i></label>
                    <input type="text" placeholder="请输入合同名称" v-model="agreementName">
                    <img src="../../assets/img/reg/info.svg" class="danger-hint">
                    <div class="hover-info">
                      <i class="triangle-left"></i>
                      合同民称请不要包含特殊字符且长度不超过100字
                    </div>
                  </div>
                  <div class="inputBox">
                    <label>合同截止时间<i>*</i></label>
                    <el-date-picker type="date" placeholder="请选择合同截止时间" v-model="endTime"    value-format="yyyy-MM-dd" style="display: inline-block;width:300px"
                                    :picker-options="pickerOptions"></el-date-picker>
                    <img src="../../assets/img/reg/info.svg" class="danger-hint">
                    <div class="hover-info" style="right:-411px">
                      <i class="triangle-left"></i>
                      合同有效期将作为合同的实际有效期，合同到期前，系统将提醒您
                    </div>
                  </div>
                  <div class="inputBox">
                    <label>合同有效期<i>*</i></label>
                    <el-date-picker
                      v-model="startEndTime"
                      type="daterange"
                      range-separator="-"
                      start-placeholder="请选择合同起止时间"
                      end-placeholder=""
                      value-format="yyyy-MM-dd"
                      style="height: 34px;width: 300px"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                    <img src="../../assets/img/reg/info.svg" class="danger-hint">
                    <div class="hover-info" style="right: -268px;">
                      <i class="triangle-left"></i>
                      所有签署方需要在截止日期前完成签署
                    </div>
                  </div>


                </div>
              </div>

            </div>
            <!--第一步选择模板结束-->

            <!--添加签约方-->
            <div class="signSecond">
              <p class="stepTitle">第二步：添加签约方</p>
              <div class="stepContent">
                  <button class="addSignedEmployees" @click="signEmployeesDetail=true;updateStatus=false" v-show="addEmployeeButton_show">添加签约员工</button>
                  <!--添加员工成功信息展示在页面上-->
                  <div class="addEmployeesDetail" v-show="employeeDetail_show" @mouseover="hover_show=true" @mouseout="hover_show=false">
                    <img src="../../assets/img/dismission/women_19_32.svg" alt="女" class="imgPhoto">
                    <!--<img src="../../assets/img/dismission/men_19_32.svg" alt="男" class="imgPhoto">-->
                    <label>姓名</label>
                    <span>{{employeeName}}</span>
                    <label>手机号</label>
                    <span>{{employeePhone}}</span>
                    <img src="../../assets/img/contract/ic_shimingrenzheng.svg" alt="" class="certificationStatus">
                    <span class="certification">已实名认证</span>
                    <div class="hover_show pull-right" v-show="hover_show">
                      <img src="../../assets/img/contract/ic_replace.svg" alt="" @click="updateSingleData"><!-- @click=""-->
                      <img src="../../assets/img/contract/faqi_ic_shanchu.svg" alt="" @click="removeSingleData">
                    </div>

                  </div>
                  <input type="button" value="下一步" class="addNext" :class="nextStyle" :disabled="nextDis" @click="goTOContractDetail">
              </div>

            </div>

            <!--添加签约方-->
          </div>

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
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import {compareDate,isChinaName} from '@/assets/js/common/verify.js'
    let vm=null;
    export default {
      name: "selectTemplates",
      components: {
        swiper,
        swiperSlide
      },
      data(){
         return{
           signEmployeesDetail:false,
           startEndTime:[],
           endTime:'',
           employeeName:'',
           employeePhone:'',
           employeeName1:'',
           employeePhone1:'',
           addEmployeeButton_show:true,//默认添加员工按钮显示
           employeeDetail_show:false,//默认员工信息是隐藏的
           agreementName:'',//合同名称
           templateNumber:"",//合同模板编号
           itemData:JSON.parse(localStorage.getItem("item")),//取出选中模板的的数据集
           modelAlert:false,//选择模板弹窗
           swiperOption: {//swiper3
             speed: 1000,
             slidesPerView:4,
             spaceBetween:20,
             notNextTick: true,//
             loop:false,//
             // autoplay: {//TODO 自动播放的功能 important
             //   disableOnInteraction: false,
             // }
             paginationClickable :true,
             navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
             },
             //TODO swiper 点击事件有效
             on: {
               // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
               click:function(){
                 //当前点击的swiper-slide的下标值
                 const clickedIndex=this.clickedIndex;
                 //this 代表整个swiper this.slides：具体的swiper-slide;
                 vm.clickSelect(clickedIndex,this.slides[clickedIndex]);
               }
             }

           },
           templateData:[],//模板数据
           current:0,//当前页下标,
           hover_show:false,
           updateStatus:false,
           //验证时间范围 小于当前时间不可选中
           pickerOptions:{
             disabledDate:(time)=>{
               return time.getTime() < Date.now() - 8.64e7;
             },
           }

         }
      },
      computed:{
        swiper() {
          return this.$refs.mySwiper.swiper;
        },
        /*手机验证*/
        phoneStyle:function () {
          if(!this.employeePhone1.match(/^1\d{10}/) && this.employeePhone1!="" ){
            return true
          }else{
            return false
          }
        },
        /*用户名验证*/
        nameStyle:function () {
          if(!this.employeeName1.match(/^[a-zA-Z\u4e00-\u9fa5]+$/) && this.employeeName1!="" ){
            return true
          }else{
            return false
          }
        },
        /*弹窗按钮不可点击状态*/
        name_phone_dis:function () {
          if((this.employeePhone1!="" && this.employeePhone1.match(/^1\d{10}/))&& (this.employeeName1!= "" && this.employeeName1.match(/^[a-zA-Z\u4e00-\u9fa5]+$/)) ) {
            return false
          }else {
            return true
          }
        },
        //弹窗按钮样式
        name_phone_class:function () {
          if((this.employeePhone1!="" && this.employeePhone1.match(/^1\d{10}/) )&& (this.employeeName1!= "" && this.employeeName1.match(/^[a-zA-Z\u4e00-\u9fa5]+$/))  ) {
            return {
              disabled:false
            }
          }else {
            return {
              disabled:true
            }
          }
        },
        //下一步按钮样式
        nextStyle:function () {
          let that=this;
          if(that.agreementName!="" && that.endTime!="" && that.startEndTime!="" && that.employeeDetail_show==true && that.employeeName!="" && that.employeePhone!=""){
            return {
              click_btn:false
            }
          }else{
            return {
              click_btn:true
            }
          }
        },
        //下一步按钮禁用
        nextDis:function () {
          let that=this;
          if(that.agreementName!="" && that.endTime!="" && that.startEndTime!="" && that.employeeDetail_show==true && that.employeeName!="" && that.employeePhone!=""){
            return false
          }else{
            return true
          }
        },


      },
      watch:{
        //TODO 合同名称不能输入特殊字符
      /*  agreementName(val){
          let that=this;
          let reg=/[^\u4E00-\u9FA5]/g;
          if (!reg.test(val)) {
            return "";
          }
        }*/
      },
      methods: {
       //合同特殊字符不能输入
      /*  agreementPattern(){
          let that=this;
          if(!isChinaName(that.agreementName) && that.agreementName!=""){

          }else{
            this.$message.error("请输入正常的合同名称!")
          }
        },*/
        //跳转到发起签约页面
        goTOBySinging(){
          let that=this;
          that.$router.push("/bySinging/");
        },
        //点击确定添加员工按钮
        addEmployee(){
          let that=this;
          if((that.employeeName1!="" && this.employeeName1.match(/^[a-zA-Z\u4e00-\u9fa5]+$/))&& (that.employeePhone1!="" && that.employeePhone1.match(/^1\d{10}/) )){
            that.signEmployeesDetail=false;//隐藏员工信息弹窗
            that.addEmployeeButton_show=false;//隐藏添加按钮
            that.employeeDetail_show=true;//显示员工信息
            that.employeeName= that.employeeName1;
            that.employeePhone=that.employeePhone1;
          }
        },
        //删除展示在页面上的员工信息
        removeSingleData(){
          let that=this;
          that.employeeDetail_show=false;
          that.employeeName='';
          that.employeePhone='';
          that.employeeName1='';
          that.employeePhone1='';
          that.addEmployeeButton_show=true;

        },
        //修改展示在页面上的数据
        updateSingleData(){
          let that=this;
          that.signEmployeesDetail=true;
          that.updateStatus=true;
        /*  that.employeeName='';
          that.employeePhone='';*/
        },
        //点击下一步跳转到合同签约
        goTOContractDetail(){
          let that=this;

          //获取当前时间
          //获取当前时间
          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          if (month < 10) {
            month = "0" + month;
          }
          if (day < 10) {
            day = "0" + day;
          }
          let nowDate = year + "-" + month + "-" + day;

          if(that.agreementName!="" && that.endTime!="" && that.startEndTime!="" && that.employeeDetail_show==true && that.employeeName!="" && that.employeePhone!=""){
            //将相关数据存到 localStorage


            if(compareDate(that.endTime)>=compareDate(nowDate) && compareDate(that.startEndTime[1])>=compareDate(nowDate) && compareDate(that.startEndTime[1])>compareDate(that.endTime)){

            }else{
              //请选择自今天起之后的日期
              that.$message.error("请选择合同有效期大于合同截止日期！");
              return
            }

           let contractMsg={
             agreementName:that.agreementName,//合同名称
             templateNumber:that.itemData.templateNumber,//TODO 合同模板编号
             startTime:that.startEndTime[0],
             endTime:that.startEndTime[1],
             deadlineForSignature:that.endTime,//截止签字时间
              hrEmployeeAlias:that.employeeName,
                employeePhone:that.employeePhone,
           };
           localStorage.setItem("contract",JSON.stringify(contractMsg));
            that.$router.push("/contractDetail/");
          }

        },

        //点击展示模板
        showModels(){
          let that=this;
          that.signAlert = false;//选择签约方式弹窗
          that.modelAlert = true;//选择模板弹窗
          //合同模板查询
          that.$http({
            url:api.templateKinds,
            method:"post",
            headers:headers(),
          }).then(function (result) {
            // console.log(result);
            if(result.data.code==10000){
              that.templateData=result.data.data;
              // console.log(that.templateData);

            }else{
              that.$message.error(result.message || result.data.msg)
            }
          })

        },
        //点击模板弹窗确定按钮跳转到选择模板页面
        goTO_selectTemplates(){
          let that=this;
          that.modelAlert = false;

          //选中的合同模板，将合同相关数据存到缓存里
          // document.getElementsByClassName("templateNumber");
          // localStorage.setItem("templateNumber",)

          that.$router.push({name:'selectTemplates'});
        },
        //TODO swiper 点击当前滑块执行无效 ,换成走马灯点击效果可以
        clickSelect(index,item){
          let that=this;
          // console.log( "可以",index,item,item.title);
          let items=document.getElementsByClassName("swiper-slide");
          for(let i=0;i<items.length;i++){
            items[i].classList.remove("active");
          }
          // console.log(item);
          //点击在swiper-slide 才执行添加样式
          if(item==undefined){

          }else{
            item.classList.add("active");
            //选中的合同模板，将合同相关数据存到缓存里
            localStorage.setItem("item",(item.title));
          }
          // console.log(item.parentNode.childNodes)

        },
        lookPdf(url){
          window.open(url);
        },


      },
      created() {
        vm = this;
      },
    }
</script>
<style scoped>
  .main .right-content{
    width: 100%;
    /*padding: 30px;*/
    /*position:fixed;*/
    /*top:48px;*/
  }
  .main .right-content .content .headline{
    margin: 0;
  }
  nav{
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #FFFFFF;
    background: #394A66;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.08);
    cursor: pointer;
    width: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    padding: 0;
  }
  nav img{
    cursor: pointer;
    margin: 0 2px 0 33px;
    vertical-align: middle;
  }
  .el-dialog__title {
    font-size: 18px;
    color: #21324E;
    letter-spacing: 0;
    display: block;
    text-align: center;
  }
  .el-dialog__footer{
    text-align: center;
  }

  .signError{
    display: inline-block;
    margin: 10px 0 -10px 34px;
    font-size: 14px;
    vertical-align: top;
    color: #7A8699;
    letter-spacing: 0;
    line-height: 20px;
  }
  .signError img{
    vertical-align: middle;
    margin: 0 6px 0 0;
  }
  .el-dialog__body{
    text-align: center;
  }
  .el-dialog__body .inputParent{
    text-align: center;
    font-size: 0;
  }
  .el-dialog__body .inputParent label{
    display: inline-block;
    width: 42px;
    margin: 0 10px 0 0;
    text-align: right;
    font-size: 14px;
    color: #748093;
    letter-spacing: 0;
    vertical-align: middle;
  }
  .el-dialog__body .inputParent input{
    width:280px;
    height:34px;
    font-size: 14px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
  }
  .el-dialog__body .inputParent span{
    display: block;
    color: #f95714;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    margin: 2px 0;
    text-align: left;
    text-indent: 136px;
    opacity: 0;
  }
  .phone_error{
    opacity: 1!important;
  }
  .name_error{
    opacity: 1!important;
  }
  .disabled{
    opacity: 0.6;
  }
  .click_btn{opacity: 0.6;}


  /*TODO swiper 选择模板弹窗*/

  .swiper-slide{
    width: 160px!important;
    height: 226px;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.08);
    overflow: hidden;
    cursor: pointer;

  }
  .singleTemplate{
    width: 100%;
    height: 100%;
    padding: 14px 0 0;
    position: relative;
    border: 0.5px solid transparent;
    background:url("../../assets/img/contract/ic_weixuanzhong.svg") #F9F9F9 no-repeat bottom;
    /*transition: all 0.6s;*/
  }
  .swiper-slide.active .singleTemplate{
    border: 0.5px solid #f95714;
    background:url("../../assets/img/contract/ic_xuanzhong.svg") #F9F9F9 no-repeat bottom;
  }
  .singleTemplate:hover{
    border: 0.5px solid #f95714;
    background:url("../../assets/img/contract/ic_xuanzhong.svg") #F9F9F9 no-repeat bottom;
    /*transform: scale(1.1);*/
  }
  .singleTemplate:hover .lookContract,.swiper-slide.active .singleTemplate .lookContract{
    opacity:1;
  }
  .singleTemplate:hover .title   .swiper-slide.active .singleTemplate .title{
    color: #f95714;
  }
  .singleTemplate .title{
    font-size: 14px;
    color: #394A66;
    letter-spacing: 0;
    text-align: center;
    margin: 0 38px;
  }
  .lookContract:hover{
    cursor: pointer;
    background: url(../../assets/img/contract/ic_chakanhetong.svg)  #E5E5E5 no-repeat 7px 7px;
    color: #f95714;

  }
  .lookContract{
    position: absolute;
    bottom: 0;
    left:0.5px;
    width: 158px;
    height: 25px;
    line-height: 25px;
    text-indent: 25px;
    font-size: 12px;
    color: #748093;
    letter-spacing: -0.33px;
    opacity: 0;
    background: url(../../assets/img/contract/ic_chakanhetong2.svg) #E5E5E5 no-repeat 7px 7px;
  }
  .lookContract img{
    vertical-align: middle;
    margin-left: 7px;
  }
  .modelInfo{
    font-size: 14px;
    color: #7A8699;
    letter-spacing: 0;
    line-height: 24px;
  }
  .modelInfo p{
    font-size: 16px;
    color: #394A66;
    letter-spacing: 0;
    margin:30px 0 8px;
  }
  .swiper-button-prev, .swiper-container-rtl .swiper-button-next,.swiper-button-next, .swiper-container-rtl .swiper-button-prev{
    width:18px;
    height: 18px;
    background: #F95714;
    border-radius:50%;
    text-align: center;
    line-height: 18px;
    color: white;

  }
  .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled{
    background: #97A2B3;
    opacity: 1;
  }
  .signError img{
    vertical-align: middle;
    margin: 0 2px 0 0;
  }

</style>


