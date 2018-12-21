<template>
  <div>
  <newWitesiteHeader></newWitesiteHeader>
  <!--主体-->
    <div class="main">
      <div class="content contactUs">
      </div>
      <div class="content contactContent">
        <p class="headLine">联系我们</p>
        <p class="headLine_next">联系我们让我们为您匹配最合适的人才背景验证方案，提交信息后，我们将有专业顾问在一小时内给您致电。</p>
        <p class="consult">
          咨询时间<span>周一至周五　９:00-18:00</span>
          <!--如急需帮助可致电<span>400-0075-800</span>-->
        </p>
        <div class="form-group-box">
          <div>
            <div class="form-group dif">
              <label>姓名<i>*</i></label>
              <input type="text" placeholder="请输入您的姓名" class="userName" maxlength="5" v-model="userName">
            </div>
            <div class="form-group">
              <label>工作邮箱<i>*</i></label>
              <input type="text" placeholder="请输入您的邮箱" class="userEmail" v-model="userEmail">
            </div>
          </div>
          <div>
            <div class="form-group dif">
              <label>公司名称<i>*</i></label>
              <input type="text" placeholder="请输入您的公司名称" class="companyName" maxlength="20" v-model="companyName">
            </div>
            <div class="form-group">
              <label>联系电话<i>*</i></label>
              <input type="text" placeholder="请输入联系方式" class="telephone" maxlength="11" minlength='11' v-model="telephone">
            </div>
          </div>
          <div class="form-group special">
            <label>备注留言<i></i></label>
            <textarea placeholder="请在此输入您想要咨询的问题" class="msg" maxlength="200" v-model="msg"></textarea>
          </div>
          <input type="button" value="提交" class="submit" @click="submitFun()">
        </div>
      </div>
    </div>
    <newWitesiteFooter></newWitesiteFooter>
  </div>

</template>

<script>
  import newWitesiteHeader from '@/components/newWitesite/common/newWitesite_header';
  import newWitesiteFooter from '@/components/newWitesite/common/newWitesite_footer';
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'

    export default {
        name: "contact",
        components: {
          newWitesiteHeader,
          newWitesiteFooter
        },
      data () {
        return{
            userName: '',
	          userEmail:'',
	          companyName:'',
	          telephone:'',
	          msg:'',
        }
      },
	    watch:{
	      telephone:function(){
	      	this.telephone=this.telephone.replace(/[^\d]/g,'');
	      }
	    },
      methods:{
     submitFun(){
       let that=this;
       if(that.userName==""){
       	that.$message.error("请填写性名！");
         return false;
       }else if(that.companyName==""){
       	that.$message.error("请填写公司名称！");
         return false;
       }else if(that.userEmail==""){
       	that.$message.error("请填写邮箱地址！");
         return false;
       }else if(!that.userEmail.match(/^[a-z0-9]([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z0-9]{2,3}([\.][a-z0-9]{2})?$/i)){
       	that.$message.error("请填写正确邮箱地址！");
         return false;
       }else if(!that.telephone.match(/^1[345678]\d{9}/)){
       	that.$message.error("请填写正确手机号码！");
         return false;
       }else{
         that.$message.error("提交失败！还有必填项为完成");
         that.$http({
           url: api.contactUs,
           method: "post",
           data: {
             name: that.userName,
             email: that.userEmail,
             enterpriseName: that.companyName,
             phone: that.telephone,
             levelMessage: that.msg
           },
           headers: headers(),
         }).then(function(data){
           if(data.code=10000){
             that.$message.success("提交成功！客服人员会尽快与您联系！")
           }else{
             that.$message.error("提交失败！请尽快联系客服人员");
           }
         })
       }
     }
      }
    }
</script>

<style scoped>
  @import url("../../assets/css/static/init.css");
  @import url("../../components/newWitesite/css/index.css");
  .demo-dynamic{
  	text-align: center;
  }
  .demo-dynamic .special{
  	margin-left: -100px !important;
  }
  .main .contactContent .form-group-box .right{
  	margin-left: 125px;
  }
  .form-group{
  	margin: 0 20px 20px 0;
  }
  .main .contactContent .form-group-box .form-group .input_txt{
  	width: 320px;
  	background: #fff;
  }
.class_btn{
    display: block;
    width: 180px;
    height: 54px;
    margin: 28px auto 29px;
    background: #F95714;
    border: 1px solid #F95714;
    border-radius: 67px;
    font-size: 24px;
    color: #FFFFFF;
    letter-spacing: 0.28px;
    outline: none;
  }
.msg{
	width: 886px;
	height: 140px;
	padding: 7px 0 0;
	outline: none;
	resize: none;
}
</style>
