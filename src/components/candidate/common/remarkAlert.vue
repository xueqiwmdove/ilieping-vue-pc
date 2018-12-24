<template>
    <div>
       <div v-if="beizhu" style="width:100%;" @click="handleClose2">
            <div  class = "cov" >
                <div class = "con candidate_sty" style="height:340px;">
                    <p class = "ptitle">备注 <i  class="el-icon-close closes_s"></i></p>
                    <div class="rescs beires"  @click="clickHide2" style="height:220px;">
                        <el-form >
                            <el-form   ref="cerateList" id="re_styles">
                                <span class="title_bei">输入对该候选人的备注</span>
                                <el-input :rows="4" type="textarea" v-model="remack" style="width:460px;margin-left:60px;" placeholder="请输入内容"></el-input>
                            </el-form>
                        </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                            <el-button  type="primary" :class="searchBtnClass2" :disabled="searchDisabled2" @click="submitBei()"  style="height:36px;width:120px" >保存</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import store from '@/store/store';
  import remarkAlert from './remarkAlert';
    export default {
        name: 'remarkAlert',
        components: {},
        data() {
            return {
               remack:'',//备注  
               beizhu:false
            }
        },
        watch: {},
        computed:{
         // 备注提交按钮样式
            searchBtnClass2:function () {
            if(this.remack !='' ){
                return{
                    click_opacity:false
                }
            }else{
                return{
                    click_opacity:true
                }
            }
            },
            // 备注提交禁用 true
            searchDisabled2:function () {
                if(this.remack !='' ){
                    return false
                }else{
                    return true
                }
          },
        },
        methods: {
          open(){
            this.remack = ''
            this.beizhu = true
          },
          clickHide2(e)  {
              this.beizhu=true
              e.stopPropagation();//阻止冒泡
          },
          submitBei() {
              let that = this
              let candidateId = '6'
              that.$http({
              method:'post',
              url:api.candidateinsert,
              headers:headers('application/json;charset=utf-8'),
              data:{
                "candidateId" :candidateId ,
                "remark":that.remack
              }
              }).then(function(res){
              if(res.data.code==10000){
                  that.$message.success(res.data.msg);
                  that.beizhu = false
                  that.remack = ''
                  that.$emit("getList")
              }else{
                  that.$message.error(res.data.msg);
              }
              })    
          },
          //点击空白处收起弹窗
          handleClose2() {
            this.beizhu=false
            this.remack = ''
          },  
        },
        mounted() {
         
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cov{
	width:1900px;
	height:1200px;
	background-color:rgba(0, 0, 0, 0.2);
	z-index:100000;
    /* display:none; */
    left: 0px;
    top: 0;
	position: fixed;;
	text-align:center;
	font-size: 16px;
	box-shadow:0px 0px 5px black;
}
.con{
	z-index:110000;
	width:540px;
	height:400px;
	background-color:white;
	position:fixed;
	right:36%;
    top:30%;
	box-shadow:0px 0px 5px #ddd;

}
.ptitle{
	width:100%;
  height:60px;
  line-height:60px;
  background-color:#fff;
  border-bottom: 1px solid #E5E5E5;
	font-size: 16px;
  color: #21324E;
}
.ptitle .closes_s {
  float: right;
  margin-top: 20px;
  margin-right: 20px;
  color: #A8ABB3 ;
  font-size: 18px;
  cursor: pointer;
}

.dbt{
	border-radius: 5px;
    width: 70px;
	height:30px;
	background-color:#3daae9;
	right:20px;
	bottom:20px;
	position:absolute;
	line-height:30px;
	color:white;
}
/* 弹窗 开始 */
.candidate_sty .el-icon-arrow-down:before {
    content: "\E603";
    position: absolute;
    top: 15px;
    left: 210px;
    color: #AAADB5;
    cursor: pointer;
}
.candidate_sty .manage_sty {
    left: 16%;
    width: 280px;
}
.manage_sty .search {
    float: right;
    width: 400px;
    height: 40px;
    margin-top: 30px;
    position: relative;
    left: -25px;
}
#re_styles .el-radio-button, .el-radio-button__inner {
    margin-right: 20px;
    height: 40px;
    width: 90px;
    border-color: #E5E5E5;
    border-radius: 5px;
}
#re_styles .el-radio-button, .el-radio-button__inner:nth-child(2) {
    border-left: 1px solid #E5E5E5;
}
.rescs {
  width: 100%;
  height: 280px;
  padding: 20px 40px;
  padding-left:80px;
}
.beires {
  width: 100%;
  height: 280px;
  padding: 20px 40px;
  padding-left:40px;
}
.title_bei,.title_quit {
  width: 100%;
  display: inline-block;
  text-align: left;
  font-size: 14px;
  margin-bottom: 15px;
  color: #394A66;
}
.title_quit {
color: #F95714 ;
}
.dialog-footer {
    height: 60px;
    position: absolute;
    width: 100%;
    bottom: 0;
    border-top: 1px solid #E5E5E5;
    background: #FAFBFC;
    line-height: 60px;
}
/* 弹窗 */
</style>
<style>
 .candidate_content .el-scrollbar__wrap {
  overflow-x: hidden !important;
 }
 .candidate_sty .el-dialog__body {
    padding: 30px 70px;
    color: #606266;
    font-size: 14px;
}

#re_styles .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background-image: url('../../../assets/img/zhiwei/zhiwei_ic_choose.png');
    background-repeat:no-repeat;
    background-position:100% 100%;
    border-color:#F95714;
    background-color: #fff;
    color:#F95714;
}
.candidate_sty .manage_sty .el-scrollbar__wrap {
     overflow-x: hidden !important;
 }
 #re_styles .el-textarea__inner  {
     margin-left:-55px;
 }
 #re_styles .el-input__inner {
     margin-left:-80px;
 }
 #reset_styless .el-input__inner  {
     margin-left:-55px;
 }
 #re_styles .el-form-item__label  {
     margin-right:20px;
 }
#re_styles .el-radio-group {
    margin-right: 111px;
}
.beires #re_styles .title_quit .el-input__suffix {
  right: 50px !important  ;
}
.rescs #reset_styless .el-form-item .el-form-item__content .el-select {
    display: inline-block;
    position: relative;
    left: -22px;
}
</style>
