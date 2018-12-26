<template>
    <div class="dis">
       <!-- 弹窗-淘汰候选人 -->
        <div v-if="quitdia" style="width:100%;" @click="handleClose2">
            <div  class = "cov" >
                <div class = "con candidate_sty"  style="height:408px;">
                    <p class = "ptitle">淘汰候选人 <i class="el-icon-close closes_s"></i></p>
                    <div class="rescs beires" @click="clickHide3" style="height:220px;">
                        <el-form :model="cerateList"  ref="cerateList" id="re_styles reset_styless">
                            <span class="title_quit"><i><img src="../../../assets/img/zhiwei/cuowu.png" alt=""></i> 此候选人将被归档到人才库，请选择归档原因</span>
                            <el-form-item label="淘汰原因" style="margin-left:31px;" >
                                <el-select style="width:280px;height:40px;" v-model="cerateList.type" placeholder="请选择工作经验">
                                    <el-option value="胜任力不足" ></el-option>
                                    <el-option value="没有回应" ></el-option>
                                    <el-option value="淘汰" ></el-option>
                                    <el-option value="与公司文化不符合" ></el-option>
                                    <el-option value="福利待遇不匹配" ></el-option>
                                    <el-option value="待定"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="具体原因(选填)" >
                                <textarea  v-model="cerateList.text" style="width:280px;height:100px;margin-left:-4px;" placeholder="请输入内容"></textarea>
                            </el-form-item>
                          <el-checkbox v-model="cerateList.radio">放入人才库</el-checkbox>
                          <el-checkbox v-model="cerateList.sendSms" >发送拒信</el-checkbox>

                    </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button  type="primary" @click="submirQuit" :class="searchBtnClass3" :disabled="searchDisabled3"   style="height:36px;" >保存</el-button>
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
export default {
    name: 'weekOutAlert',
    components: {},
    data() {
      return {
        quitdia:false,
        cerateList:{
        type:'',
        text:'',
        radio:true,
        sendSms:''
        },
        candidateId:'',

      }
    },
    computed:{
        // 备注提交按钮样式
        searchBtnClass3:function () {
        if(this.cerateList.text !='' ){
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
        searchDisabled3:function () {
            if(this.cerateList.text !='' ){
                return false
            }else{
                return true
            }
        },
    },
    methods: {
        open(){
        this.quitdia = true
        },
        clickHide3(e)  {
        this.quitdia=true;
        e.stopPropagation();//阻止冒泡
        },
        submirQuit() {
            let that = this;
            that.candidateId=localStorage.getItem('candidateID');
            that.$http({
            method:'put',
            url:api.updateEliminate,
            headers:headers(),
            data:{
              id:that.candidateId,
              archivingReason:that.cerateList.type,
              detailedReasons:that.cerateList.text,
              sendSms:that.cerateList.sendSms,
              }
            }).then(function(res){
            if(res.data.code==10000){
                that.$message.success(res.data.msg);
                that.conShow = false;
                that.cerateList.text = '';
                that.$emit("getList")
            }else{
                that.$message.error(res.data.msg);
            }
            })
        },
        //点击空白处收起弹窗
        handleClose2() {
        this.quitdia=false
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


