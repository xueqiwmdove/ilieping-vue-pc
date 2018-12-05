<!-- 
    Author:周双
    日期：2018/11/27
-->
<template>
    <div>
        <div class="main">
            <!--顶部导航-->
            <pageheader class="pageheader"></pageheader>
            <!--侧边栏-->
            <div class="aside"><pageaside></pageaside></div>
            <!--右侧内容栏-->
            <div class="right-content pull-right">
                <div class="content">
                <!--主体内容-->
                    <p class="headline"><a class="company">企业认证</a></p>
                    <!--错误提示-->
                    <div class="phone-error-info" v-if="err_div">
                        <img src="../../assets/images/reg/info.svg" alt="提示">
                        <span>{{err_info}}</span>
                    </div>

                    <form class="certificate-content" enctype="multipart/form-data" id="form">
                        
                        <div class="form-group inline">
                            <label>企业名称</label>
                            <input v-if="flag" type="text" placeholder="请填写与营业执照一致的合法公司全称" v-model="enterpriseName">
                            <p class="result-txt" v-else>{{enterpriseName}}</p>
                        </div>

                        <div class="form-group inline">
                            <label>经办人姓名</label>
                            <input v-if="flag" type="text" placeholder="请输入经办人的真实姓名" v-model="managerName">
                            <p class="result-txt" v-else>{{managerName}}</p>
                        </div>

                        <div class="form-group inline">
                            <label>统一社会信用代码</label>
                            <input v-if="flag" type="text" placeholder="18位数字或字母组成" v-model="registerNum" minlength="18" maxlength="18">
                            <p class="result-txt" v-else>{{registerNum}}</p>
                        </div>

                        <div class="form-group inline">
                            <label>身份证号码</label>
                            <input v-if="flag" type="text" placeholder="请输入经办人的身份证号码" maxlength="18" v-model="managerIdCard">
                            <p class="result-txt" v-else>{{managerIdCard}}</p>
                        </div>

                        <div class="form-group inline">
                            <label>法人代表</label>
                            <input v-if="flag" type="text" placeholder="请输入企业法人姓名" v-model="legalPerson" >
                            <p class="result-txt" v-else>{{legalPerson}}</p>
                        </div>

                        <div class="form-group inline">
                            <label>手机号码</label>
                            <input v-if="flag" type="text" placeholder="请输入经办人的手机号码" v-model="managerPhone" maxlength="11">
                            <p class="result-txt" v-else>{{managerPhone}}</p>
                        </div>

                        <div class="form-group">
                            <label>营业执照</label>
                            <div class="upfile-box" v-if="flag">
                                <div class="uploadFile">
                                    <img :src="iconUrl" id="img-preview"/>
                                    <input type="file" id='file' accept="image/bmp,image/jpg,image/png,image/jpeg" @change="fileChange"/>
                                    <span id="upload_txt">点击上传</span>
                                </div>
                                <p slot="tip">(请上传加盖公章的营业执照复印件，上传文件大小不超过5MB，格式为：bmp,jpg,png)</p>
                            </div>
                            <img :src="imageUrl" class="img-url" alt="" v-else>
                        </div>

                        <p class="error-info" v-if="authNotice">
                            <img src="../../assets/img/reg/info.svg" >{{authNoticeMsg}}
                        </p>

                        <div class="form-group" v-if="flag">
                            <input type="button" value="提交" class="submit click_acive" :class="{click_opacity:opacity}" :disabled="click_dis" @click="submit">
                        </div>
                    </form>
                    
                </div>
            </div>

        </div>
        <noticeModel :visableModal='visableModal' @hideModal='hideModal'></noticeModel>
    </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
  import upLoad from '@/components/common/upLoad';
  import noticeModel from '@/components/common/account/noticeModel';
  
export default {
    name: 'account',
	components: {
        pageheader,
        pageaside,
        upLoad,
        noticeModel
	},
    data() {
        return {
            flag:true,
            visableModal:false,
            authNotice:true,
            enterpriseName:"",
            registerNum:'',
            legalPerson:'',
            managerName:'',
            managerIdCard:'',
            managerPhone:'',
            iconUrl:'',
            authNoticeMsg:'审核过程中认证信息不可修改，请在点击提交审核前确保所填信息正确有效',
            imageUrl: '',
            err_div:false,
            err_info:'',
            str18:/^[0-9A-Za-z]{18}$/,
            regIdCard:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            regPhone:/^1[3|4|5|6|7|8][0-9]\d{8}$/,
            click_dis: true,
            opacity:true,
            file:""
        };
    },
    created(){
        this.authCertData();
    },
    watch:{
        getEnterpriseName(newVal){
            this.errorNotice(newVal,'请填写企业名称','null');
            this.click_dis = this.getClickDis();
            this.opacity = this.getClickOpacity();
        },
        getRegisterNum(newVal){
            this.errorNotice(newVal,'请正确填写注册号','str18');
            this.click_dis = this.getClickDis();
            this.opacity = this.getClickOpacity();
        },
        getLegalPerson(newVal){
            this.errorNotice(newVal,'请填写法人代表','null');
            this.click_dis = this.getClickDis();
            this.opacity = this.getClickOpacity();
        },   
        getManagerName(newVal){
            this.errorNotice(newVal,'请填写企业经办人姓名','null');
            this.click_dis = this.getClickDis();
            this.opacity = this.getClickOpacity();
        },  
        getManagerIdCard(newVal){
            this.errorNotice(newVal,'请正确填写身份证号','idCard');
            this.click_dis = this.getClickDis();
            this.opacity = this.getClickOpacity();
        },  
        getManagerPhone(newVal){
            this.errorNotice(newVal,'请正确填写手机号','phone');
            this.click_dis = this.getClickDis();
            this.opacity = this.getClickOpacity();
        },  
        getFile(newVal){
            if(newVal =='' || newVal == undefined){
                this.file = newVal;
                this.err_div = true;
                this.err_info = '请选择要上传的营业执照';
                return false;
            }
            this.click_dis = this.getClickDis();
            this.opacity = this.getClickOpacity();
        }
    },
    computed:{
        getEnterpriseName(){
           return this.enterpriseName; 
        },
        getRegisterNum(){
           return this.registerNum; 
        },
        getLegalPerson(){
           return this.legalPerson; 
        },
        getManagerName(){
           return this.managerName; 
        },
        getManagerIdCard(){
           return this.managerIdCard; 
        },
        getManagerPhone(){
           return this.managerPhone; 
        },
        getFile(){
            return this.file;
        },
        getImgUrl(){
            return this.imageUrl;
        }
    },
    methods: {
    	authCertData(){
            let that = this;
	        that.$http({
	  			method:"get",
	  			url:api.getAuthCertData,
	  			headers:headers("application/json;charset=utf-8"),
	  			cache:false
	  		}).then(function(res){
                var resData = res.data;
                if(resData.code==10000 && resData.data != ''){
                    let data = resData.data;
                    that.enterpriseName = data.enterpriseName;
                    that.registerNum = data.enterpriseRegisterNum;
                    that.legalPerson = data.enterpriseLegalPerson;

                    that.managerName = data.username;
                    that.managerIdCard = data.idCard;
                    that.managerPhone = data.mobile;

                    that.imageUrl = data.businessLicenseUrl;

                    let isAuth = data.isAuthentication;
                    if(isAuth == 0){//驳回
                        that.authNoticeMsg = '企业认证已驳回';
                        that.flag = true;
                    }else if(isAuth == 2){//认证中
                        that.authNoticeMsg = '审核过程中认证信息不可修改，请稍后查看认证结果';
                        that.flag = false;
                    }else if(isAuth == 3){//已认证
                        that.authNotice = false;
                        that.flag = false;
                    }
                }   
		    });
    	},
        errorNotice(curState,noticeTxt,type){
            
            if(type == 'null') {
                if(curState ==''){
                    this.err_div = true;
                    this.err_info = noticeTxt;
                    return false;
                }else{
                    this.err_div = false;
                };
            }else if(type == 'phone'){
                if(!this.regPhone.test(curState)){
                    this.err_div = true;
                    this.err_info = noticeTxt;
                    return false;                
                }else{
                    this.err_div = false;
                };
            }else if(type == 'idCard'){
                if(!this.regIdCard.test(curState) ){
                    this.err_div = true;
                    this.err_info = noticeTxt;
                    return false;                
                }else{
                    this.err_div = false;
                };
            }else if(type == 'str18'){
                if(!this.str18.test(curState)){
                    this.err_div =true;
                    this.err_info = noticeTxt;
                    return false;
                }else{
                    this.err_div = false;
                }
            }

        },
    	getClickDis:function(){
            if ((this.enterpriseName != "" 
                && this.str18.test(this.registerNum)
                && this.legalPerson!="" 
                && this.managerName != "" 
                && this.regIdCard.test(this.managerIdCard) 
                && this.regPhone.test(this.managerPhone)
                && (this.file != "" && this.file != undefined)) 
                || this.isLoading){
                return false;
            }else {
                return true;
            }
        },
        getClickOpacity: function(){ // 使用按钮样式
            if ((this.enterpriseName != ""
                && this.str18.test(this.registerNum)
                && this.legalPerson!=""
                && this.managerName != "" 
                && this.regIdCard.test(this.managerIdCard) 
                && this.regPhone.test(this.managerPhone)
                && (this.file != "" && this.file != undefined)) 
                && !this.isLoading ) {
                return false;
            }else {
                return true;
            }
        },
        fileChange(){
            this.file = document.getElementById('file').files[0];
        },
        hideModal(){
            this.visableModal = false;
        },
        submit(){
            //企业认证
            this.click_dis = true;
            let that=this;
            let params = new FormData() ;
            params.append('file',this.file,this.file.name); 
            params.append('enterpriseName',this.enterpriseName);
            params.append('registerNum',this.registerNum);
            params.append('legalPerson',this.legalPerson);
            params.append('transactorUsername',this.managerName);
            params.append('transactorIdCard',this.managerIdCard);
            params.append('transactorMobile',this.managerPhone);

            //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
            that.$http({
                    method:"post",
                    url:api.certification,
                    headers:headers("multipart/form-data"),
                    data:params,
                    cache:false
                }).then(function(res){
                    if(res.data.code==10000){
                        that.visableModal = true;
                        that.flag = false;
                        that.click_dis = false;
                        that.authCertData();
                    }else{
                        that.$message.error(res.data.msg);
                    }
                })
            
        },
		//实时显示该图片在页面
		great(){
            document.getElementById('file').onchange = function () {
                var files_size=this.files[0].size;
                var isLt5M= files_size / 1024 / 1024 < 5;
                if(!isLt5M) {
                    this.$message.error('图片选择失败，每张图片大小不能超过 5MB,请重新选择!');
                    return false;
                }else {
                    var imgFile = this.files[0];
                    var fr = new FileReader();
                    this.imageUrl = fr.result;
                    fr.onload = function () {
                        document.getElementById('img-preview').style.display='block';
                        document.getElementById('img-preview').src = fr.result;
                        document.getElementById('upload_txt').style.display='none';
                    };
                    fr.readAsDataURL(imgFile);
                }
            }
        },
    },
    mounted(){
        this.great();
        document.getElementById('img-preview').style.display='none';
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .result-txt{
        display: inline-block;
        width: calc(100% - 140px); 
        margin-bottom: 0 !important;
    }
    .upfile-box{
        display: inline-block;
        width: calc(100% - 140px);
    }
    .avatar-uploader{display: inline-block;
        width: 124px;
        height: 124px;
        margin-left: 15px;
        position: relative;
        cursor: pointer;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #FC8E00;
        width: 124px;
        height: 124px;
        line-height: 124px;
        text-align: center;
        border: 1px solid #ddd;
    }
    .avatar {
        width: 124px;
        height: 124px;
        display: block;
    }
    .certificate-content{
        min-width:880px;
    }
    .certificate-content .form-group label{
        width: 125px;
        display: inline-block;
    }
    .phone-error-info{
        height: 19px;
        margin: 0 10px;
    }
    .phone-error-info img{
        vertical-align: middle;
    }
    .phone-error-info span{
        font-size: 14px;
        margin-left: 2px;
        color: #F95714;
        height: 19px;
        line-height: 19px;
        margin-top: 47px;
    }

    .form-group.inline{
        display: inline-block;
        width: 49%;
    }
    .img-url{
        width: 120px;
        height: 120px;
        vertical-align: middle;
        margin-left: 15px;
    }
</style>