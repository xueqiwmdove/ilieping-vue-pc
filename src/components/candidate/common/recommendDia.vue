<template>
  <!--候选人信息弹窗-->
        <el-dialog title="推荐给用人部门" width="540px" :visible="addVisible" class="create_dialog" custom-class="create_dialog" :before-close="hideModel" >
            <el-form :model="cerateList"  ref="cerateList" id="re_styles">
                <el-form-item label="推荐到" style="text-align:center;" >
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
                    <el-input :rows="3" type="textarea" style="width:280px;margin-left:20px;" placeholder="请输入推荐理由（如名校经历等）"></el-input>
                </el-form-item> 
                        <el-form-item label="使用简历" >
                            <el-radio-group v-model="type">
                                <el-radio-button label="0" >原始简历</el-radio-button>
                                <el-radio-button label="1">标准简历</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                    <el-button  type="primary" :class="searchBtnClass1" :disabled="searchDisabled1"   style="height:36px;" >保存</el-button>
            </div>
    </el-dialog>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import {formatDate} from '@/assets/js/common/date_year.js';
    export default {
        name: "recommendDia",
        props:['addVisible'],
        
      data(){
          return{
            // addVisible:true,
            employeeList:[],//员工集合
            isflag:false,
            ldVisabled:false,
            showList:[],
            names:'',//搜索人员名称
            type:'',
            cerateList:{
                region:'',
                name:''
            },
          }
       },
    computed:{
        // 选择负责人提交按钮样式
        searchBtnClass1:function () {
        if(this.showList.employeeName ){
            return{
                click_opacity:false
            }
        }else{
            return{
                click_opacity:true
            }
        }
        },
        // 选择负责人提交禁用 true
        searchDisabled1:function () {
            if(this.showList.employeeName ){
                return false
            }else{
                return true
            }
       }, 
     },
      methods:{
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
//搜索
    searchName() {
        this.getEmployeeList()
    },   
//  关闭弹窗
    hideModel(){
        let that=this;
        that.$emit('hideModel','cteate');//向父组件派发事件
    },

      }
    }
</script>

<style scoped>
.create_dialog .el-icon-arrow-down:before {
    content: "\E603";
    position: absolute;
    top: 15px;
    left: 240px;
    color: #AAADB5;
    cursor: pointer;
}
.create_dialog .manage_sty {
    left: 18%;
    width: 280px; 
}
.manage_sty .search {
    float: right;
    width: 400px;
    height: 40px;
    margin-top: 30px;
    position: relative;
    left: -60px;
}
.manage_sty .search .input_search {
    width: 260px;
    position: absolute;
    top:-21px;
}
.manage_sty .search .input_search .se_icon {
    position: absolute;
    right:-238px;
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
.createBut {
     background: #F95714;
     border-radius: 4px;
     height: 40px;
     width: 220px;
     color: #fff;
     margin-top: 100px;
     margin-left:35%;
}
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
</style>
<style>
.create_dialog .el-dialog__body {
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
.create_dialog .manage_sty .el-scrollbar__wrap {
     overflow-x: hidden !important;
 }
 #re_styles .el-textarea__inner  {
     margin-left:-17px;  
 }
 #re_styles .el-input__inner {
     margin-left:-29px;  
 }    
</style>

