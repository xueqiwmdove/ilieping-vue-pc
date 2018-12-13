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
                 <div class='content_pad'>
                    <el-input class="case_sty" style="width:260px;height:40px;" placeholder="请输入内容"  clearable>
                          <i slot="prefix" class="el-input__icon delete_sty el-icon-close"></i>
                    </el-input> <br>
                    <p class="end_msg">已为您筛选到<i style="color:#F95714;">4</i>条结果</p>
                </div>  
               <!--表格  -->
                <div class="div_table_infor ">
                    <el-table  :data="hrList" style="width: 100%">
                      <el-table-column fixed prop="processNum" label="基本资料" header-align='center' align='left' width="350px">
                            <template slot-scope="scope">
                                <span class="basic_sty ">
                                    <span class="name_s">张三 <em>男</em><em class="bom_sty"></em><em>六年工作经验</em></span> 
                                    <p><img src="../../assets/img/zhiwei/houxuan_ic_work.png" alt="">上海滴滴科技有限公司<em class="bom_sty"></em><span>HR</span><span>2018~2019</span></p> 
                                    <p><img src="../../assets/img/zhiwei/houxuan_ic_education.png" alt="">北京师范大学<em class="bom_sty"></em><span>人力资源管理中心</span><em class="bom_sty"></em><span>2012~至今</span></p> 
                                </span>
                            </template>
                      </el-table-column>
                      <el-table-column prop="employeeName" label="候选人负责人" header-align='center' align='center'></el-table-column>
                      <el-table-column prop="processTitle" label="招聘岗位" header-align='center' align='center'></el-table-column>
                      <el-table-column prop="employeeName" label="招聘渠道" header-align='center' align='center'>
                      </el-table-column>
                      <el-table-column prop="createDate" label="添加日期" header-align='center' align='center'></el-table-column>
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
        totalCount:0,
        pageIndex: 1,
        pageSize: 5,
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
            that.gethrList();
          },
          changeSize(newSize) {
            let that=this;
            that.pageSize = newSize;
            that.gethrList();
      },
      gethrList(){
				let that=this;
	      let currentPage=that.pageIndex || 1;
	      let pageSize=that.pageSize || 5;
        that.$http({
	  			method:"post",
	  			url:api.hr_list,
	  			headers:headers('application/json;charset=utf-8'),
	  			data:{
				    "currPage":currentPage,
				    "pageSize":pageSize,
				    'searchContent':that.searchContent,
				    'type':that.select_process,
				    'status':that.select_state
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
    },
    mounted() {
      this.gethrList();
    },
    created() {

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
</style>
<style>
 .content_pad .el-input--suffix .el-input__inner {
    padding-left:0px;  
 }
 .case_sty  .el-icon-close:before {
    content: "\E60F";
    margin-left: 6px;
}
</style>




