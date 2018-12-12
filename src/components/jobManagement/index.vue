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
            <div class="content content_stys">
                <p class="headline">
                    <span>职位管理</span>
                </p>
              <div style="padding:5px 20px;">  
                <!-- 搜索栏 -->
                 <div class='content_pad'>
                    <div class="but_stys">
                      <p class="font_s">招聘中职位</p>
                      <i class="num_s">24</i><em class=" icon_s"><img src="../../assets/img/zhiwei/zhiwei_ic_recruitment_pre.png" alt=""></em>
                    </div>
                    <div class="but_stys btn_s">
                      <p class="font_s">停止招聘</p>
                      <i class="num_s">24</i><em class=" icon_s"><img src="../../assets/img/zhiwei/zhiwei_ic_notrecruitment.png" alt=""></em>
                    </div>
                    <div class="search">
                      <el-input  class="input_search" placeholder="输入你想搜索的内容" >
                        <i @click="searchPage" slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                      </el-input>
                      <el-button class="add_btn" @click="createPosition">添加招聘职位</el-button>
                    </div>
                </div>  
               <!--表格  -->
                <div class="div_table_infor">
                    <el-table :data="hrList" style="width: 100%">
                      <el-table-column fixed prop="processNum" label="基本资料" header-align='center' align='center' width="200px"></el-table-column>
                      <el-table-column prop="employeeName" label="招聘负责人" header-align='center' align='center'></el-table-column>
                      <el-table-column prop="processTitle" label="招聘部门" header-align='center' align='center'></el-table-column>
                      <el-table-column prop="employeeName" label="候选人总数" header-align='center' align='center'>
                         <template slot-scope="scope">
                           <span class="slot_sty">
                              34
                           </span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="processTitle" label="入职人数" header-align='center' align='center'>
                         <template slot-scope="scope">
                             <span class="slot2_sty">
                              34
                             </span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="effectiveDate" label="招聘人数" header-align='center' align='center'></el-table-column>
                      <el-table-column prop="createDate" label="创建时间" header-align='center' align='center'></el-table-column>
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
        pageSize: 10,
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
    //搜索
    searchPage() {
      this.$router.push({path:'/searchPage'})
    }, 
    //创建职位
    createPosition() {
      this.$router.push({path:'/createposition'}) 
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
.content_pad {
  margin:11px;  
  height:80px;
  line-height:80px; 
  margin-top: 0px;
}
.but_stys {
  width:120px;
  height:80px;
  background-image: linear-gradient(-136deg, #FF8350 0%, #F95714 100%, #F95714 100%);
  border-radius: 4px;  
  display:inline-block;
  color:#fff;
  position: relative;
  cursor: pointer;
}
.btn_s {
  background: #FFFFFF;
  box-shadow: 0 2px 4px 0 rgba(216,216,216,0.50);
  border-radius: 4px;
  color: #748093;
  margin-left: 10px;
}
.content_pad .but_stys .font_s {
  width: 100%;
  height: 30px;
  display: inline-block;
  position: absolute;
  top:-20px;
  left:11px;
}
.content_pad .but_stys .num_s {
  position: absolute;
  top:18px;
  left:13px;
}
.content_pad .but_stys .icon_s {
  position: absolute;
  top:20px;
  right:13px;
  font-size: 18px;
}
.content_pad .search {
  float: right;
  width: 400px;
  height: 40px;
  margin-top: 30px;
  position: relative;
}
.content_pad .search .input_search {
  width: 260px;
  position: absolute;
  top:-21px;
  
}
.content_pad .search .input_search .se_icon {
  position: absolute;
  right:-244px;
  height: 30px;
  top: 25px;
  font-size: 18px;
  font-weight: 700;
  border-left: 1px solid #E5E5E5;
  color: #F95714;
}
.content_pad .search .el-icon-search:before {
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
.div_table_infor .slot2_sty {
  background-color: #5EC860;
  cursor: pointer;
  display: inline-block;
  height: 24px;
  width: 60px;
  border-radius: 4px;
  color: #fff;
}
.content_pad .add_btn  {
  background: #F95714;
  border-radius: 4px;
  width: 120px;
  height: 100%;
  color: #fff;
  float: right;
}
.content_stys .div_table_infor .el-table {
  border:none;  
}
</style>



