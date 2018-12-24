<template>  
  <div >
   <div class="main">
          <!--顶部导航-->
        <pageheader class="pageheader"></pageheader>
          <!--侧边栏-->
          <div class="aside">
            <pageaside></pageaside>
          </div>
          <!--右侧内容栏-->
        <div class="right-content pull-right">
            <div class="content content_sty">
                <p class="headline">
                    <span>职位管理</span>
                </p>
                <!-- 搜索栏 -->
                 <div class='content_pad  del_icon'>
                    <el-input maxlength="20"  v-if="show" class="case_sty" v-model="searchName" style="width:260px;height:40px;" @change="check" placeholder="请输入内容"  clearable>
                          <i @click="del_click" slot="prefix" class="el-input__icon delete_sty el-icon-close"></i>
                    </el-input>
                    <div class="search"  v-else>
                        <el-input maxlength="20"  v-model="searchName1" class="input_search" placeholder="输入你想搜索的内容" >
                        <i @click="searchPage" slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                       </el-input> 
                    </div> 
                     <br>
                    <p class="end_msg">已为您筛选到<i style="color:#F95714;">{{totalCount}}</i>条结果</p>
                </div>  
               <!--表格  -->
                <div class="div_table_infor ">
                    <el-table  :data="hrList" style="width: 100%">
                      <el-table-column fixed prop="processNum" label="基本资料" header-align='center' align='left' width="380px">
                         <template  slot-scope="scope">
                              <span @click="updateData(scope.row)" class="basic_sty slots_sty">
                                <span class="name_s">{{scope.row.name}} </span> 
                                <p>{{scope.row.cityName}}{{scope.row.address}}<em class="bom_sty"></em><span>{{scope.row.deptName}}</span></p> 
                              </span>
                          </template> 
                      </el-table-column>
                      <el-table-column prop="chargeName" label="招聘负责人" header-align='center' align='center'></el-table-column>
                      <el-table-column prop="deptName" label="招聘部门" header-align='center' align='center'></el-table-column>
                      <el-table-column prop="candidateCount" label="候选人总数" header-align='center' align='center'>
                         <template slot-scope="scope">
                           <span class="slot_sty">
                              34
                           </span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="cntryCount" label="入职人数" header-align='center' align='center'>
                         <template slot-scope="scope">
                             <span class="slot2_sty">
                              34
                             </span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="number" label="招聘人数" header-align='center' align='center'></el-table-column>
                      <el-table-column prop="createTime" label="创建时间" header-align='center' align='center'></el-table-column>
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
  name: 'jobmanageindex',
	components: {
	pageheader,
    pageaside,
	},
   data() {
      return {
        hrList:[],
        show:true,
        totalCount:0,
        pageIndex: 1,
        pageSize: 10,
        searchName:'',
        searchName1:'',
      };
    },
    watch:{
       
      },
    methods: {
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
      getList(){
        let that=this;
        console.log(this.$route.query.code,4444)
	      let currPage=that.pageIndex || 1;
        let pageSize=that.pageSize || 5;
        that.$http({
	  			method:"post",
	  			url:api.getPosition+'/'+currPage+'/'+pageSize,
	  			headers:headers('application/json;charset=utf-8'),
	  			data:{
				    "currPage":currPage,
				    "pageSize":pageSize,
				    'name':that.searchName,
				    'recruitStatus':that.$route.query.status
	  			}
	  		}).then(function(res){
	  			if(res.data.code==10000){
             that.hrList=res.data.data;
             that.totalCount=res.data.count;
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
      },
   //搜索
    searchPage() {
      this.show = false
      this.searchName = this.searchName1
      this.getList()
    },
  //清除搜索关键字   
    del_click() {
      // this.show = false
      this.searchName1 =''
    },
    check(val) {
      if(val == '') {
        this.show = false
      }else {
        this.show = true
      }
    }
    },
    mounted() {
     
    },
    created() {
       this.searchName = this.$route.query.code
       this.getList();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.content_sty {
  padding: 5px 20px;  
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




