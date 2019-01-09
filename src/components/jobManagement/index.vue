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
                 <div class='contentsty'>
                   <el-row>
                     <el-col>
                        <div class="but_stys"  :class="signs1=='1'? 'btn_s':''"   @click="tagTable('1')">
                          <p class="font_s">招聘中职位</p>
                          <i class="num_s">{{counts.recruitStatus1}}</i>
                            <em class=" icon_s">
                              <img v-if="signs1 == '1'" src="../../assets/img/zhiwei/zhiwei_ic_recruitment_pre.png" alt="">
                              <img v-else src="../../assets/img/zhiwei/zhiwei_ic_recruitment.png" alt="">
                            </em>
                        </div>
                        <div class="but_stys "  :class="signs1=='0'? 'btn_s':''" @click="tagTable('0')">
                          <p class="font_s">停止招聘</p>
                          <i class="num_s">{{counts.recruitStatus0}}</i>
                          <em class=" icon_s">
                              <img v-if="signs1 == '0'" src="../../assets/img/zhiwei/zhiwei_ic_notrecruitment_pre.png" alt="">
                              <img v-else src="../../assets/img/zhiwei/zhiwei_ic_notrecruitment.png" alt="">
                          </em>
                        </div>
                        <div class="search">
                          <el-input  v-model="searchName" maxlength="20" class="input_search" placeholder="输入你想搜索的内容" >
                            <i @click="searchPage" slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                          </el-input>
                          <el-button class="add_btn" @click="createPosition">添加招聘职位</el-button>
                        </div>
                       </el-col> 
                    </el-row>
                </div>  
               <!--表格  -->
                <div class="div_table_infor">
                    <el-table  :key='signs1' :data="hrList" style="width: 100%">
                      <el-table-column fixed prop="processNum" label="基本资料" header-align='center' align='left' max-width="280px">
                          <template  slot-scope="scope">
                              <span @click="updateData(scope.row)" class="basic_sty slots_sty">
                                <span class="name_s">{{scope.row.name}} </span> 
                                <p>{{scope.row.cityName}}{{scope.row.address}}<em class="bom_sty"></em><span>{{scope.row.deptName}}</span></p> 
                              </span>
                          </template> 
                      </el-table-column>
                      <el-table-column  prop="chargeName" label="招聘负责人" header-align='center' align='center'>
                        <template slot-scope="scope">
                         <span class="slots_sty"   @click="updateData(scope.row)" >{{scope.row.chargeName}}</span> 
                        </template>
                      </el-table-column>
                      <el-table-column  prop="deptName" label="招聘部门" header-align='center' align='center'>
                          <template slot-scope="scope">
                            <span  class="slots_sty"  @click="updateData(scope.row)" >{{scope.row.deptName}}</span> 
                         </template>
                      </el-table-column>
                      <el-table-column  prop="candidateCount" label="候选人总数" header-align='center' align='center'>
                         <template  slot-scope="scope">
                           <span @click="updateData(scope.row)" class="slot_sty slots_sty">
                              {{scope.row.candidateCount}}
                           </span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="cntryCount" label="入职人数" header-align='center' align='center'>
                         <template  slot-scope="scope">
                             <span @click="updateData(scope.row)" class="slot2_sty slots_sty">
                              {{scope.row.cntryCount}}
                             </span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="number" label="招聘人数" header-align='center' align='center'>
                         <template slot-scope="scope">
                           <span  class="slots_sty"  @click="updateData(scope.row)" >{{scope.row.number}}</span> 
                        </template>
                      </el-table-column>
                      <el-table-column prop="createTime" label="创建时间" header-align='center' align='center'>
                          <template slot-scope="scope">
                             <span  class="slots_sty" @click="updateData(scope.row)" >{{scope.row.createTime}}</span> 
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
        counts:{},
        signs1:'1',
        totalCount:0,
        pageIndex: 1,
        pageSize: 5,
        searchName:'',//搜索值
        status1:'1'//控制列表状态
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
      tagTable(val) {
        this.signs1 = val
        this.status1 =val
        this.getList()
      },
      getList(){
				let that=this;
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
				    'recruitStatus':that.status1
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
   //统计各状态人数   
      getCount() {
        let that = this
        that.$http({
          method:'get',
          url:api.positionCount ,
          	headers:headers('application/json;charset=utf-8'),
	  		}).then(function(res){
	  			if(res.data.code==10000){
             that.counts = res.data.data;
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
        })
      },
      updateData(val) {
        this.$router.push({path:'/positionupdate',query:{id:val.id}})
      },
    //搜索
    searchPage() {
      this.$router.push({path:'/searchPage',query:{code:this.searchName,status:this.status1}})
    }, 
    //创建职位
    createPosition() {
      this.$router.push({path:'/createposition'}) 
    },
    },
    mounted() {
      this.getList();
      this.getCount()
    },
    created() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.content_stys {
  min-width: 754px;
}
/* 搜索栏样式开始 */
.contentsty {
  margin:11px;  
  height:80px;
  line-height:80px; 
  margin-top: 0px;
  width: 100%;
  min-width: 695px;;
  position: relative;
}
.but_stys {
  width:120px;
  height:80px;
   border-radius: 4px;  
  display:inline-block;
  position: relative;
  cursor: pointer;
  background: #FFFFFF;
  color: #748093;
  box-shadow: 0 2px 4px 0 rgba(216,216,216,0.50);
}
.btn_s {
  background-image: linear-gradient(-136deg, #FF8350 0%, #F95714 100%, #F95714 100%);
  color:#fff;
  border-radius: 4px;
  margin-left: 10px;
}
.contentsty .but_stys .font_s {
  width: 100%;
  height: 30px;
  display: inline-block;
  position: absolute;
  top:-20px;
  left:11px;
}
.contentsty .but_stys .num_s {
  position: absolute;
  top:18px;
  left:13px;
}
.contentsty .but_stys .icon_s {
  position: absolute;
  top:20px;
  right:13px;
  font-size: 18px;
}
.contentsty .search {
  display: inline-block;
  width: 400px;
  height: 40px;
  margin-top: 30px;
  position: absolute;
  right: 20px;;
}
.contentsty .search .input_search {
  width: 260px;
  position: absolute;
  top:-21px;
  
}
.contentsty .search .input_search .se_icon {
  position: absolute;
  right:-244px;
  height: 30px;
  top: 25px;
  font-size: 18px;
  font-weight: 700;
  border-left: 1px solid #E5E5E5;
  color: #F95714;
}
.contentsty .search .el-icon-search:before {
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
.contentsty .add_btn  {
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
/* 搜索栏样式结束 */

/* 表格样式开始 */
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

/* 表格样式结束 */
</style>
<style>
 .contentsty .search .el-input--prefix .el-input__inner {
    padding-left: 1px;
}
</style>



