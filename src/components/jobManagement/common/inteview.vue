<template>
    <div>
    <!-- 弹窗-添加面试官 -->
    <el-dialog title="添加面试官" width="540px" :visible.sync="createVisible" class="create_dialog" custom-class="create_dialog" :before-close="hideModel" >
            <el-form :model="cerateList"  ref="cerateList" >
                <el-form-item  style="text-align:center;" >
                    <div v-if="isflag" class="manage_se">
                    <ul>
                        <li>
                            <span style="float:left;margin-left:50px;">面试官</span>
                            <span class="name_f">{{showList.employeeName?showList.employeeName.substr(0, 1):''}}</span> 
                            <span style="float:left;">
                                <p>{{showList.employeeName}}</p> 
                                <p>{{showList.deptName}}-{{showList.position}}</p>    
                            </span>
                        </li>
                    </ul>
                </div>
                <el-input v-else style="width:280px;height:40px;"  @click.native="ldClick"  v-model="cerateList.region"  placeholder="选择面试官"  class="el-icon-arrow-down"></el-input>
                        <div v-if="ldVisabled" class="form_tree tree_sty manage_sty " >
                        <el-scrollbar style="height:100%" >   
                            <div style="height:100%">
                            <div class="search">
                                <el-input  class="input_search" v-model="names" placeholder="输入你想搜索的内容" >
                                <i @click="searchName()"  slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                    <el-button :class="searchBtnClass1" :disabled="searchDisabled1" @click="submit" type="primary"   style="height:36px;">提交</el-button>
            </div>
    </el-dialog>
    </div>
</template>
<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  export default {
      name:'inteview',
      props:['createVisible'],
      data() {
        return {
         names:'',//搜索人员名称
         showList:[],//负责人
         ldVisabled:false,//选择人员下拉框
         employeeList:[],
         isflag:false,
         cerateList:{
         region:'',
         name:''
       },

        }  
      },
     computed:{
        //选择负责人提交按钮样式
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
        //选择负责人提交禁用 true
          searchDisabled1:function () {
            if(this.showList.employeeName ){
              return false
            }else{
              return true
            }
          },  
     },
     methods:{
     //搜索
      searchName() {
        this.getEmployeeList()
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
     //选择招聘负责人 
      selectItem(val) {
        this.ldVisabled=false
        this.isflag = true
        this.showList = val
      },
      //  关闭弹窗
      hideModel(){
        this.$emit('hideModel','interview');//向父组件派发事件
        this.isflag = false
        this.ldVisabled=false
        this.names =''
      },
      //提交  
      submit() {
        this.isflag = false
        this.names =''
        if(this.showList ==[] ) {
          return
        }else {
          this.isShow =true
        }
        this.$emit('dataList',this.showList)
        this.hideModel()
      }, 
     }
  }
</script>
<style scoped>
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
/* .manage_se ul {
    padding-top:0px;
} */
.manage_se ul li  p {
    height: 30px;
    text-align: left;
    line-height: 30px;
}
.manage_se ul li {
    height: 60px;
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
    line-height: 50px;
} 
.create_dialog .el-icon-arrow-down:before {
    content: "\E603";
    position: absolute;
    top: 15px;
    left: 253px;
    color: #AAADB5;
    cursor: pointer;
}
.create_dialog .manage_sty {
    left: 22%;
    width: 280px; 
}
.manage_sty .search {
  float: right;
  width: 400px;
  height: 40px;
  margin-top: 30px;
  position: relative;
  left: -70px;

}
.manage_sty .search .input_search {
  width: 260px;
  position: absolute;
  top:-21px;
  /* width: 260px; */
  
}
.manage_sty .search .input_search .se_icon {
  position: absolute;
  right:-244px;
  height: 30px;
  top:8px;
  font-size: 18px;
  font-weight: 700;
  border-left: 1px solid #E5E5E5;
  color: #F95714;
}
.manage_sty .search .el-icon-search:before {
    content: "\E619";
    margin-left: 5px;
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
</style>
<style>
 .create_dialog .manage_sty .el-scrollbar__wrap {
  overflow-x: hidden !important;
 }
 .create_dialog .el-input--prefix .el-input__inner {
   padding-left:0px;
 }
  .create_dialog .el-input--prefix .el-input__inner {
   padding-left:0px;
 }
</style>


