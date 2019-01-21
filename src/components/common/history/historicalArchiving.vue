<template>  
  <div >
   <div class="mainCon el-col-24">
          <!--顶部导航-->
        <pageheader class="pageheader"></pageheader>
          <!--侧边栏-->
          <!--<div class="aside">-->
            <pageaside></pageaside>
          <!--</div>-->
          <!--右侧内容栏-->
        <div class="right-content pull-right">
            <div class="content content_sty">
                
                <!-- 搜索栏 -->
                 <div class='content_pad del_icon'>
                    <div class="search" >
                        <el-input maxlength="11" @keyup.enter.native="searchPage"  v-model="searchName1" class="input_search" placeholder="输入姓名手机号" >
                        <i @click="searchPage"  slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                       </el-input> 
                    </div> 
                     <br>
                </div>  
               <!--表格  -->
                <div class="div_table_infor">   
                    <el-table :data="tableData" style="width: 100%; min-width:756px;">
                          <el-table-column prop="employeeName" label="员工" header-align='center' align='center'>
                             <template slot-scope="scope" >
                              <span style="cursor: pointer;margin-left:-23px;" >{{scope.row.employeeName}}</span>
                             </template>
                          </el-table-column>
                          <el-table-column prop="userName" label="性别/年龄" header-align='center' align='center'>
                            <template slot-scope="scope">
                                {{scope.row.employeeSex=='1'?'男':'女' }}/{{scope.row.employeeAge}}
                            </template>
                          </el-table-column>
                          <el-table-column prop="workType" label="工作类型" header-align='center' align='center'>
                            <template slot-scope="scope">
                                {{scope.row.workType=='0'?'全职':scope.row.workType=='1'?'兼职':scope.row.workType=='2'?'实习':'' }}
                            </template>
                          </el-table-column>
                          <el-table-column prop="deptName" label="任职部门" header-align='center' align='center'></el-table-column>
                          <el-table-column prop="position" label="任职岗位" header-align='center' align='center'></el-table-column>
                          <el-table-column prop="entryTime" label="入职时间" header-align='center' align='center'>
                          </el-table-column>
                          <el-table-column prop="serviceSituation" label="在职情况" width="80" header-align='center' align='center'>
                            <template slot-scope="scope">
                              <span v-if="scope.row.status =='1'">{{'已离职'}}</span>
                               <span v-if="scope.row.status =='0'">{{scope.row.serviceSituation =='0'?'试用期':scope.row.serviceSituation =='1' ?'已转正':''}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" width="160" header-align='center' align='center'  ><!--show-overflow-tooltip="true"-->
                            <template slot-scope="scope">
															<el-dropdown placement='bottom'>
															 <span class="el-dropdown-link options">
																	操作选项
															 </span>
																<el-dropdown-menu slot="dropdown" class="options_div">
																  <el-dropdown-item  @click.native="personDetail(scope.row)">员工资料</el-dropdown-item>
																  <!--<el-dropdown-item v-if="(scope.row.isSign=='1')&&(scope.row.status =='0')" @click.native="checkSign(scope.row)">查看合同</el-dropdown-item>
																  <el-dropdown-item v-if="scope.row.isSign=='0'&&(scope.row.status =='0')"  @click.native="makeSign(scope.row)">签署合同</el-dropdown-item>
																  <el-dropdown-item v-if="(scope.row.serviceSituation =='0')&& (scope.row.status =='0') &&(scope.row.workType=='0')" @click.native="personRegular(scope.row)">提前转正</el-dropdown-item>
																  <el-dropdown-item v-if="scope.row.status=='0'" @click.native="makeQuit(scope.row)">办理离职</el-dropdown-item>
																  <el-dropdown-item v-if="scope.row.status=='0'"  @click.native="personChanges(scope.row)">人事变更</el-dropdown-item>-->
																  <el-dropdown-item @click.native="personDelete(scope.row)">删除员工</el-dropdown-item>
																  <el-dropdown-item v-if="scope.row.status=='1'" @click.native="quitDiscredit(scope.row)">离职失信曝光</el-dropdown-item>
																  <el-dropdown-item v-if="scope.row.status=='1'" @click.native="quitAssess(scope.row)">快速离职评价</el-dropdown-item>
																  <el-dropdown-item v-if="scope.row.status=='1'" @click.native="multidimensional(scope.row)">多维度离职评价</el-dropdown-item>
																</el-dropdown-menu>
															</el-dropdown>
                            </template>
                          </el-table-column>
                    </el-table>
                    </div>
                <!-- 分页  -->
                    <div class="bottom-pagination" v-if="totalCount > 5">
                        <el-pagination @current-change="changePage" @size-change="changeSize" :current-page="pageIndex" :page-size="pageSize" :page-sizes="[5,10, 25, 50, 100]" layout="total, prev, pager, next, sizes, jumper" :total="totalCount">
                        </el-pagination>
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
  import {format} from '@/assets/js/date.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';

export default {
  name: 'historicalArchiving',
	components: {
	pageheader,
    pageaside,
	},
   data() {
      return {
        tableData:[],
        totalCount:0,
        pageIndex: 1,
        pageSize: 10,
        searchName1:'',
      };
    },
    watch:{
       
      },
    methods: {
      personDetail(val) {//员工资料跳转
        this.$router.push({path:'/staffInfo',query:{id:val.id}})
      },
      checkSign(val){//查看合同
      	this.$router.push({path:'/contractManagement',query:{id:val.id}})
      },
      makeSign(val){//签署合同
      	
      },
      personRegular(val){//提前转正
      	
      },
      makeQuit(val){//办理离职
      	
      },
      personChanges(val){//人事变更
      	
      },
      personDelete(val){//删除员工
      	let that=this;
      	that.$http({
	  			method:"delete",
	  			url:api.deleteEmployee+"/"+val.id,
	  			headers:headers('application/json;charset=utf-8'),
	  		}).then(function(res){
	  			if(res.data.code==10000){
            that.$message({
				      message: '恭喜你，删除成功！',
				      type: 'success'
				    });
				    that.getList();
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
      },
      quitDiscredit(val){//离职失信曝光
      	
      },
      quitAssess(val){//快速离职评价
      	
      },
      multidimensional(val){//多维度离职评价
      	
      },
      changePage(newPage) {
          let that=this;
          if(that.pageIndex === newPage) {
            return;
          }
          that.pageIndex = newPage;
          that.getList();
        },
        changeSize(newSize) {
          let that=this;
          that.pageSize = newSize;
          that.getList();
    },
    //获取表格数据
      getList() {
        let that =this
	      let currentPage=that.pageIndex || 1;
	      let pageSize=that.pageSize || 10;
	      　      let re = /^[0-9]+.?[0-9]*/;
	      let re2 =/^1[34578]\d{9}$/;
          　      if (re.test(that.searchName1) &&  !re2.test(that.searchName1)) {
           that.$message({
             message:'请输入正确手机号！',
             type:'error'
           })
           return
        　　   } else {
          that.$http({
            method:"post",
            url:api.employeeList+'/'+currentPage+'/'+pageSize,
            headers:headers('application/json;charset=utf-8'),
            data:{
              "status": that.status || "1",
              "grouping":that.grouping,
              "deptId":that.deptId||"",
            },
            cache:false
          }).then(function(res){
            if(res.data.code==10000 || res.data.data==null){
              that.tableData=res.data.data;
              that.totalCount = res.data.count;
            }else{
            that.$message.error(res.data.msg);
            }
          });
        }
      },
   //搜索
    searchPage() {
      this.show = false
      this.getList()
    },
    },
    mounted() {
     this.getList();
    },
    created() {
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.content_sty {
  padding: 30px 0;  
}
.content_sty .div_table_infor .el-table {
  border:none;  
}
.content_pad {
  margin:20px;  
  height:80px;
  line-height:80px; 
  margin-top: -25px;;
} 
.content_pad .end_msg {
  height: 20px;
  position: absolute;
  top:91px;
  color:#394A66;
  font-size: 13px;
}
.div_table_infor .slot_sty   {
  display: inline-block;
  height: 24px;
  width: 60px;
  background: #66ADFF;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
}
.div_table_infor .slot2_sty {
  background-color: #5EC860;
  cursor: pointer;
  display: inline-block;
  height: 24px;
  width: 60px;
  border-radius: 4px;
  color: #fff;
}
.case_sty .delete_sty {
    position: absolute;
    right: -243px;
    top: 21px;
    font-size: 16px;
    cursor: pointer;
    border-left:1px solid #D8D8D8;
}
.case_sty .delete_sty:hover {
    position: absolute;
    right: -243px;
    top: 21px;
    font-size: 18px;
    color:#F95714 ;
}
.basic_sty .name_s {
   font-size: 15px;
   color:#394A66; 
}
.basic_sty .name_s em {
  font-size: 12px;
  color: #748093;  
}
.bom_sty {
  width: 2px;
  height: 2px;
  background-color: #748093;  
  border-radius: 50%;
  display: inline-block;
  margin: 0 4px;
}
.slots_sty {
  display: inline-block;
  width: 100%;
  cursor: pointer;
}
.search {
  /* float: right; */
  width: 400px;
  height: 40px;
  /* margin-top: 30px; */
  /* position: relative; */
}
 .search .input_search {
  width: 260px;
  position: absolute;
  
}
.search .input_search .se_icon {
  position: absolute;
  right:-244px;
  height: 30px;
  top: 25px;
  font-size: 18px;
  font-weight: 700;
  border-left: 1px solid #E5E5E5;
  color: #F95714;
  /* z-index: 999 */
}
.search .el-icon-search:before {
    content: "\E619";
    margin-left: 5px;
}
.div_table_infor .slot_sty   {
  display: inline-block;
  height: 24px;
  width: 60px;
  background: #66ADFF;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
}
</style>
<style>
 .content_pad .el-input--suffix .el-input__inner {
    padding-left:0px;  
 }
 .case_sty  .el-icon-close:before {
    content: "\E60F";
    margin-left: 6px;
}
 .search .el-input--prefix .el-input__inner {
    padding-left: 1px;
}
.el-icon-circle-close:before {
    display:none; 
}
</style>




