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
                    <el-input  v-if="show" class="case_sty" v-model="name" style="width:260px;height:40px;" @change="check" placeholder="请输入内容"  clearable>
                          <i @click="del_click" slot="prefix" class="el-input__icon delete_sty el-icon-close"></i>
                    </el-input>
                    <div class="search"  v-else>
                        <el-input v-model="name1" class="input_search" placeholder="输入你想搜索的内容" >
                        <i @click="searchPage" slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                       </el-input> 
                    </div> 
                     <br>
                    <p class="end_msg">已为您筛选到<i style="color:#F95714;">{{totalCount}}</i>条结果</p>
                </div>  
               <!--表格  -->
                <div class="div_table_infor ">
                    <el-table  :data="candidateList" style="width: 100%">
                                <el-table-column fixed prop="processNum" label="基本资料" header-align='center' align='left' width="350px">
                                    <template slot-scope="scope">
                                        <span class="basic_sty "  style="cursor: pointer">
                                          <span class="name_s">{{scope.row.candidateName}} <em>{{scope.row.candidateSex}}</em><em class="bom_sty"></em><em>{{scope.row.candidateExperience}}</em></span>
                                          <p><img src="../../assets/img/zhiwei/houxuan_ic_work.png" alt=""><span>{{scope.row.workExperience}}</span></p>
                                          <p><img src="../../assets/img/zhiwei/houxuan_ic_education.png" alt=""><span>{{scope.row.educationExperience}}</span></p>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="departmentHeads" label="候选人负责人" header-align='center' align='center'></el-table-column>
                                <el-table-column prop="postStr" label="招聘职位" header-align='center' align='center'></el-table-column>
                                <el-table-column prop="resumeChannel" label="招聘渠道" header-align='center' align='center'></el-table-column>
                                <el-table-column  v-if="status =='2'" prop="createTime" label="添加日期" header-align='center' align='center'></el-table-column>
                                <el-table-column  v-if="status =='3'" prop="screeningStatus" label="状态" header-align='center' align='center'>
                                    <template slot-scope="scope">
                                        <span style="cursor: pointer;">
                                         <i v-if="scope.row.screeningStatus == '1'" style="color:#66ADFF;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_no feedback.png" alt="">未反馈</i>
                                         <i v-if="scope.row.screeningStatus =='3'" style="color:#FF001F;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_disagree.png" alt="">拒绝</i>
                                         <i v-if="scope.row.screeningStatus == '2'" style="color:#5EC860;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_agree.png" alt="">同意</i>
                                         <i v-if="scope.row.screeningStatus == '0'" style="color:#FF001F;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_not recommendde.png" alt="">未推荐</i>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column  v-if="status =='4'" prop="interviewStatus" label="面试状态" header-align='center' align='center'>
                                     <template slot-scope="scope">
                                        <span v-if="scope.row.interviewStatus =='0'" style="cursor: pointer;">
                                          <p>未安排面试</p>
                                          <el-button size="small" style="color:#fff ;background-color:#F95714;">去安排</el-button>
                                        </span>
                                         <span v-if="scope.row.interviewStatus == '1'" style="cursor: pointer;">
                                          <p>已安排面试</p>
                                          <el-button size="small" style="color:#fff ;background-color:#66ADFF;">去查看</el-button>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column  v-if="status =='5'" prop="offerStatus" label="Offer状态" header-align='center' align='center'>
                                     <template slot-scope="scope">
                                        <span style="cursor: pointer;">
                                         <i v-if="scope.row.offerStatus == '0'" ><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_notcreate.png" alt="">未创建</i>
                                         <!-- <i v-if="scope.row.offerStatus == '1'"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_not receive.png" alt="">未接收</i> -->
                                         <i v-if="scope.row.offerStatus == '2'"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_receive.png" alt="">同意</i>
                                         <i v-if="scope.row.offerStatus == '3'" ><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_refused.png" alt="">已拒绝</i>
                                         <i v-if="scope.row.offerStatus == '1'"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_not receive.png" alt="">待接收</i>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column  v-if="status =='6'" prop="createDate" label="预计入职时间" header-align='center' align='center'></el-table-column>
                                <el-table-column  v-if="status =='0'" prop="archivingReason" label="淘汰原因" header-align='center' align='center'></el-table-column>
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
        candidateList:[],
        show:true,
        totalCount:0,
        pageIndex: 1,
        pageSize: 5,
        name1:'',
        name:this.$route.query.code ,
        status:this.$route.query.candidatestatus || '2',
        postId:this.$route.query.postId,
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
        let currPage=that.pageIndex || 1;
        let pageSize=that.pageSize || 5;
          that.$http({
            method:"post",
            url:api.candidateList,
            headers:headers('application/json;charset=utf-8'),
            data:{
              "postId":that.postId || '',
              "candidateName":that.name || '',
              "candidateStatus":that.status ||'',
              "pageCurrent":currPage,
              "pageSize":pageSize,
            }
          }).then(function(res){
            if(res.data.code==10000){
              that.candidateList=res.data.data;
              that.totalCount=res.data.count;
            }else{
              that.$message.error(res.data.msg);
            }
          });
     },
    //搜索
      searchPage() {
        this.show = false
        this.name = this.name1
        this.gethrList()
      },
        //清除搜索关键字   
      del_click() {
        this.name1 =''
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
    top: 26px;
    font-size: 16px;
    cursor: pointer;
    border-left:1px solid #D8D8D8;
}
.case_sty .delete_sty:hover {
    position: absolute;
    right: -243px;
    top: 26px;
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
.content_pad .el-input__icon {
  height: 82%;
}
.el-icon-circle-close:before {
    display:none; 
}
</style>




