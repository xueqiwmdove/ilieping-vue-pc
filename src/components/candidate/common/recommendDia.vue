<template>
    <div>
         <div v-if="conShow" style="width:100%;" @click="handleClose2">
            <div  class = "cov">
                <div class = "con candidate_sty" >
                    <p class = "ptitle">推荐给用人部门 <i  class="el-icon-close closes_s"></i></p>
                    <div class="rescs" @click="clickHide">
                        <el-form :model="cerateList"  ref="cerateList" id="re_styles">
                                <el-form-item label="推荐到" style="text-align:center;margin-left:12px;" >
                                <!-- <span style="margin-right:23px;"></span> -->
                                    <div v-if="isflag" class="manage_se">
                                        <ul>
                                            <li>
                                                <span class="name_f">{{showList.employeeName?showList.employeeName.substr(0, 1):''}}</span>
                                                <span style="float:left;">
                                                    <p>{{showList.employeeName}}</p>
                                                    <p>{{showList.deptName}}-{{showList.position}}</p>
                                                </span>
                                            </li>
                                        </ul>
                                </div>
                                <el-input v-else style="width:280px;height:40px;"  @click.native="ldClick"  v-model="cerateList.name"  placeholder="选择招聘负责人"  class="el-icon-arrow-down"></el-input>
                                        <div v-if="ldVisabled" class="form_tree tree_sty manage_sty " >
                                            <el-scrollbar style="height:100%" >
                                                <div style="height:100%">
                                                <div class="search">
                                                    <el-input  class="input_search" v-model="names" placeholder="输入你想搜索的内容" >
                                                        <i @click="searchName()" slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                                                    </el-input>
                                                </div>
                                                <ul>
                                                    <li @click="selectItem(item)" v-for="(item,index) in employeeList" :key='index'>
                                                        <span class="name_f">{{item.employeeName.substr(0, 1)}}</span>
                                                        <span style="float:left;">
                                                            <p>{{item.employeeName}}</p>
                                                            <p>{{item.deptName}}-{{item.position}}</p>
                                                        </span>
                                                    </li>
                                                </ul>
                                                </div>
                                            </el-scrollbar>
                                        </div>
                                </el-form-item>
                                <el-form-item label="推荐理由">
                                    <textarea v-model="cerateList.type"  style="width:280px;height:100px;margin-left:-82px;" placeholder="请输入推荐理由（如名校经历等）"></textarea>
                                </el-form-item>
                                <el-form-item label="使用简历" >
                                <!-- <span style="margin-right:23px;">使用简历</span> -->
                                    <el-radio-group v-model="cerateList.region">
                                        <el-radio-button label="0" >原始简历</el-radio-button>
                                        <el-radio-button label="1">标准简历</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                    </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                            <el-button  @click="submitRecommen" type="primary" :class="searchBtnClass1" :disabled="searchDisabled1"   style="height:36px;" >保存</el-button>
                    </div>
                </div>
            </div>
        </div >
    </div>
</template>
<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import store from '@/store/store';
    export default {
        name: 'recommendDia',
        components: {},
        data() {
            return {
               remack:'',//备注  
               showList:[],
               conShow:false,//推荐人
               isflag:false,
               ldVisabled:false,
               employeeList:[],
               pageIndex:'',
               pageSize:'',
               names:'',
               cerateList:{
                 region:'',
                 name:'',
                 type:''
                },
            }
        },
        watch: {},
        computed:{
         // 备注提交按钮样式
            searchBtnClass1:function () {
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
            searchDisabled1:function () {
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
            this.conShow = true
          },
          clickHide(e)  {
            this.conShow=true
            e.stopPropagation();//阻止冒泡
          },
          submitRecommen() {
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
                  that.conShow = false
                  that.remack = ''
                  that.$emit("getList")
              }else{
                  that.$message.error(res.data.msg);
              }
              })    
          },
        searchName() {
            this.getEmployeeList()
        },
        //选择招聘负责人
          selectItem(val) {
                this.ldVisabled=false
                this.isflag = true
                this.showList = val
            },
       //招聘负责人
          ldClick() {
                this.getEmployeeList()
                this.ldVisabled = !this.ldVisabled
            },
       //获取面试官，负责人列表
          getEmployeeList() {
            let that = this
            let currPage=that.pageIndex || 1;
            let pageSize=that.pageSize || 10;
            let employeeName = that.names || ''
            this.$http({
            method:"post",
            url:api.getEmployeeList,
            headers:headers('application/json;charset=utf-8'),
            data:{
            "currPage":currPage,
            "pageSize":pageSize,
            'employeeName':employeeName
            },
            cache:false
            }).then(function(res){
            if(res.data.code==10000 || res.data.data==null){
                that.employeeList = res.data.data
            }else{
            that.$message.error(res.data.msg);
            }
            });
          },
          //点击空白处收起弹窗
          handleClose2() {
            this.conShow=false
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
    left: 15%;
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
.manage_sty .search .input_search {
    width: 260px;
    position: absolute;
    top:-21px;
}
.manage_sty .search .input_search .se_icon {
    position: absolute;
    right:-208px;
    height: 30px;
    top:8px;
    font-size: 18px;
    font-weight: 700;
    border-left: 1px solid #E5E5E5;
    color: #F95714;
}
.manage_sty .search .el-icon-search:before {
    content: "\E619";
    margin-left: 2px;
}
/* .createBut {
     background: #F95714;
     border-radius: 4px;
     height: 40px;
     width: 220px;
     color: #fff;
     margin-top: 100px;
     margin-left:35%;
} */
.form_tree {
    width:300px;
    height:280px;
    border: 1px solid #E5E5E5;
    text-align:center;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 44;
    position: absolute;
    background-color: #fff;
}
.manage_sty  ul li .name_f{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color:#66ADFF ;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    float: left;
    margin-right: 10px;
    margin-left:20px;
}
.manage_sty  ul {
    padding-top:55px;
}
.manage_sty  ul li  p {
    height: 30px;
    text-align: left;
    line-height: 30px;
}
.manage_sty ul li {
    height: 60px;
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
    line-height: 50px;
}
.manage_se  ul li .name_f{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color:#66ADFF ;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    float: left;
    margin-right: 10px;
    margin-left:30px;
}
.manage_se ul li  p {
    height: 30px;
    text-align: left;
    line-height: 30px;
}
.manage_se ul li {
    height: 60px;
    width: 100%;
    margin-top: 5px;
    cursor: pointer;
    line-height: 50px;
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

