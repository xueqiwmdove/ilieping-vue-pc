<template>
  <div >
   <div class="main">
     <!--候选人弹窗-->
     <addCandidate :addVisible.sync="visables.add" @hideModel="hideChildModal"></addCandidate>
     <!--候选人信息-->
     <candidateSteps :addVisible.sync="visables.steps" @hideModel="hideChildModal"></candidateSteps>
     <!-- 推荐人弹窗  -->
     <recommendDia :addVisible.sync="visables.recommend" @hideModel="hideChildModal"></recommendDia>

     <!--推荐给用人部门-->
     <!-- <recommend_depart :addVisible.sync="visables.recommend" @hideModel="hideChildModal"></recommend_depart> -->

          <!--顶部导航-->
        <pageheader class="pageheader"></pageheader>
          <!--侧边栏-->
          <div class="aside">
            <pageaside></pageaside>
          </div>
          <!--右侧内容栏-->
        <div class="right-content pull-right">
            <div class="content">
                <p class="headline">
                    <span>候选人管理</span>
                </p>
                <el-row>
              <!--创建职位左侧栏  -->
                  <el-col :span='4' >
                    <div class="asidePosition ad_input">
                        <h4><img class="img_shengfen" src="../../assets/img/zhiwei/shengfen.png" alt="">
                          <span  style="margin-left:30px;">招聘中的职位</span>
                          <i style="color:#AAADB5;" class="el-icon-caret-bottom"></i>
                        </h4>
                         <div class="search" style="margin-top:30px;">
                            <el-input  class="input_search" placeholder="输入你想搜索的内容" >
                                <i slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                            </el-input>
                         </div>
                         <p>全部职位 <i><img src="../../assets/img/zhiwei/ic_chose.png" alt=""></i></p>
                         <div class="position_list">
                             <el-scrollbar style="height:100%" >
                                <ul>
                                    <li>
                                    产品经理
                                    </li>
                                    <li>
                                    产品经理
                                    </li>
                                    <li>
                                    产品经理
                                    </li>
                                    <li>
                                    产品经理
                                    </li>
                                </ul>
                             </el-scrollbar>
                         </div>
                    </div>
                  </el-col>
              <!--创建职位右边部分  -->
                  <el-col :span='20' >
                    <div class="positionTable">
                          <div class='content_pad'>
                            <div class="but_stys" :class="signs=='0'? 'btn_s':''" @click="tagStyChange(0)">
                                <p class="font_s">初筛</p>
                                <i class="num_s">12k</i>
                                <em class=" icon_s">
                                  <img v-if="signs == '0'" src="../../assets/img/zhiwei/houxuan_ic_filter_pre.png" alt="">
                                  <img v-else src="../../assets/img/zhiwei/houxuan_ic_filter.png" alt="">
                                </em>
                            </div>
                            <div class="but_stys "  :class="signs=='1'? 'btn_s':''" @click="tagStyChange(1)">
                                <p class="font_s">用人部门筛选</p>
                                <i class="num_s">24</i>
                                <em class=" icon_s">
                                    <img v-if="signs == '1'" src="../../assets/img/zhiwei/houxuan_ic_department_pre.png" alt="">
                                    <img v-else src="../../assets/img/zhiwei/houxuan_ic_department.png" alt="">
                                </em>
                            </div>
                               <div class="but_stys"  :class="signs=='2'? 'btn_s':''" @click="tagStyChange(2)">
                                <p class="font_s">面试</p>
                                <i class="num_s">124</i>
                                <em class=" icon_s">
                                    <img v-if="signs == '2'" src="../../assets/img/zhiwei/houxuan_ic_interview_pre.png" alt="">
                                    <img v-else src="../../assets/img/zhiwei/houxuan_ic_department.png" alt="">
                                </em>
                            </div>
                            <div class="but_stys "  :class="signs=='3'? 'btn_s':''" @click="tagStyChange(3)">
                                <p class="font_s">沟通Offer</p>
                                <i class="num_s">24</i>
                                <em class=" icon_s">
                                    <img v-if="signs == '3'" src="../../assets/img/zhiwei/houxuan_ic_contact_pre.png" alt="">
                                    <img v-else src="../../assets/img/zhiwei/houxuan_ic_contact.png" alt="">
                                </em>
                            </div>
                               <div class="but_stys"  :class="signs=='4'? 'btn_s':''" @click="tagStyChange(4)">
                                <p class="font_s">待入职</p>
                                <i class="num_s">5</i>
                                <em class=" icon_s">
                                    <img v-if="signs == '4'" src="../../assets/img/zhiwei/houxuan_ic_wait_pre.png" alt="">
                                    <img v-else src="../../assets/img/zhiwei/houxuan_ic_wait.png" alt="">
                                </em>
                            </div>
                            <div class="but_stys "  :class="signs=='5'? 'btn_s':''"  @click="tagStyChange(5)">
                                <p class="font_s">已淘汰</p>
                                <i class="num_s">800</i>
                                <em class=" icon_s">
                                    <img v-if="signs == '5'" src="../../assets/img/zhiwei/houxuan_ic_pass_pre.png" alt="">
                                    <img v-else src="../../assets/img/zhiwei/houxuan_ic_pass.png" alt="">
                                </em>
                            </div>
                            <div class="search">
                                <el-input  class="input_search" placeholder="输入你想搜索的内容" >
                                    <i @click="searchList" slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                                </el-input>
                                <el-button class="add_btn" @click="addCandidateShow('add')">添加候选人</el-button>
                            </div>
                          </div>
                <!--表格  -->
                        <div class="div_table_infor">
                            <el-table :key='signs'  :data="hrList" style="width: 100%">
                                <el-table-column fixed prop="processNum" label="基本资料" header-align='center' align='left' width="350px">
                                    <template slot-scope="scope">
                                        <span class="basic_sty " @click="addCandidateShow('steps')" style="cursor: pointer">
                                          <span class="name_s">张三 <em>男</em><em class="bom_sty"></em><em>六年工作经验</em></span>
                                          <p><img src="../../assets/img/zhiwei/houxuan_ic_work.png" alt="">上海滴滴科技有限公司<em class="bom_sty"></em><span>HR</span><span>2018~2019</span></p>
                                          <p><img src="../../assets/img/zhiwei/houxuan_ic_education.png" alt="">北京师范大学<em class="bom_sty"></em><span>人力资源管理中心</span><em class="bom_sty"></em><span>2012~至今</span></p>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="employeeName" label="候选人负责人" header-align='center' align='center'></el-table-column>
                                <el-table-column prop="processTitle" label="招聘职位" header-align='center' align='center'></el-table-column>
                                <el-table-column prop="effectiveDate" label="招聘渠道" header-align='center' align='center'></el-table-column>
                                <el-table-column  v-if="signs =='0'" prop="createDate" label="添加日期" header-align='center' align='center'></el-table-column>
                                <el-table-column  v-if="signs =='1'" prop="status" label="状态" header-align='center' align='center'>
                                    <template slot-scope="scope">
                                        <span style="cursor: pointer;">
                                         <i v-if="scope.row.status == '0'" style="color:#66ADFF;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_no feedback.png" alt="">未反馈</i>
                                         <i v-if="scope.row.status =='1'" style="color:#FF001F;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_disagree.png" alt="">不同意</i>
                                         <i v-if="scope.row.status == '2'" style="color:#5EC860;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_agree.png" alt="">同意</i>
                                         <i v-if="scope.row.status == '3'" style="color:#FF001F;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_not recommendde.png" alt="">未推荐</i>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column  v-if="signs =='2'" prop="status" label="面试状态" header-align='center' align='center'>
                                     <template slot-scope="scope">
                                        <span v-if="scope.row.status =='0'" style="cursor: pointer;">
                                          <p>未安排面试</p>
                                          <el-button size="small" style="color:#fff ;background-color:#F95714;">去安排</el-button>
                                        </span>
                                         <span v-if="scope.row.status == '1'" style="cursor: pointer;">
                                          <p>已安排面试</p>
                                          <el-button size="small" style="color:#fff ;background-color:#66ADFF;">去查看</el-button>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column  v-if="signs =='3'" prop="status" label="Offer状态" header-align='center' align='center'>
                                     <template slot-scope="scope">
                                        <span style="cursor: pointer;">
                                         <i v-if="scope.row.status == '0'" ><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_notcreate.png" alt="">未创建</i>
                                         <i v-if="scope.row.status == '1'"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_not receive.png" alt="">未接收</i>
                                         <i v-if="scope.row.status == '2'"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_receive.png" alt="">已接收</i>
                                         <i v-if="scope.row.status == '3'" ><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_refused.png" alt="">已拒绝</i>
                                         <i v-if="scope.row.status == '4'"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_not recommendde.png" alt="">未推荐</i>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column  v-if="signs =='4'" prop="createDate" label="预计入职时间" header-align='center' align='center'></el-table-column>
                                <el-table-column  v-if="signs =='5'" prop="createDate" label="淘汰原因" header-align='center' align='center'></el-table-column>
                            </el-table>
                        </div>
               			<!-- 分页  -->
                            <div class="bottom-pagination" v-if="totalCount > 5">
                                <el-pagination @current-change="changePage" @size-change="changeSize" :current-page="pageIndex" :page-size="pageSize" :page-sizes="[5,10, 25, 50, 100]" layout="total, prev, pager, next, sizes, jumper" :total="totalCount">
                                </el-pagination>
                            </div>
                    </div>
                  </el-col>
                </el-row>
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
  import treeSearch from '@/components/common/treeSearch'
  import recommendDia from '@/components/candidate/common/recommendDia'
//  blance
  import addCandidate from '@/components/candidate/addCandidate';
  import candidateSteps from '@/components/candidate/candidateSteps';
  // import recommend_depart from '@/components/candidate/common/recommend_depart';



// duanyanhong
// 2018.12.2
// 自定义控制员工架构下拉框点击空白处隐藏
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};
export default {
  name: 'jobmanageindex',
	components: {
   	pageheader,
    pageaside,
    treeSearch,
    addCandidate,
    candidateSteps,
    recommendDia,
    // recommend_depart
	},
   data() {
      return {
        signs:'0' ,
        hrList:[],
        totalCount:0,
        pageIndex: 1,
        pageSize: 5,
        addVisible:false,
        visables:{
          add:false,
          steps:false,
          recommend:false,
        }
      };
    },
    watch:{

      },
   directives: {clickoutside},
    methods: {
    //展示候选人弹窗
      addCandidateShow(param){
        let that=this;
        console.log()
        that.visables[param] = true;
      },
    //关闭候选人弹窗
      hideChildModal(param){
        console.log('接收的子组件数据--------->'+param);
        this.visables[param]= false;
      },
    //状态切换
    tagStyChange(val) {
      this.signs =val
      this.gethrList()
    },
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
      searchList() {
        this.$router.push({path:'/searchCandidata'})
      },
    },
    mounted() {
     this.gethrList()
    },
    created() {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
 .content {
   min-width: 1520px;;
 }
.asidePosition {
    width: 340px;
    min-width: 340px;;
    height:948px;
    background: #fff;
    margin-right: 15px;
    padding: 0px 25px;
    /* border-right: 1px solid #eee; */
}
.asidePosition h4 {
font-family: MicrosoftYaHei-Bold;
font-size: 16px;
color: #394A66;
letter-spacing: 0;
text-align: left;
color: #F95714;
position: relative;
}
.asidePosition h4 .img_shengfen {
    position: absolute;
}
.ad_input .search {
float: right;
width: 260px;
height: 40px;
/* margin-top: 30px; */
position: relative;
left: -30px;
top:10px;
}
.ad_input .search .input_search {
width: 260px;
position: absolute;
top:-21px;
}
.ad_input  .search .input_search .se_icon {
position: absolute;
right:-244px;
height: 30px;
top: 3px;
font-size: 18px;
font-weight: 700;
border-left: 1px solid #E5E5E5;
color: #F95714;
}
.ad_input .search .el-icon-search:before {
    content: "\E619";
    margin-left: 5px;
}
.ad_input p {
  width: 300px;
  height: 30px;
  color: #F95714;
  margin-top:80px;
  /* background-color: #FAFBFC; */
}
.ad_input p i {
margin-left: 180px;
}
.position_list {
   height: 600px;
   width: 300px;
}
.position_list ul {
  width: 100%;
  height: 100%;
}
.position_list ul li {
  height: 30px;
  color:rgba(57,74,102,1);
  line-height: 30px;
  margin-bottom:10px;
}

.positionTable {
    background-color: #fff;
    padding: 0px 25px;
    margin-left: 36px;
    min-width: 1248px;
    padding-left: 0px;
}
.content_pad {
  margin:11px;
  height:80px;
  line-height:80px;
  margin-top: 0px;
}
.but_stys {
  width:120px;
  height:80px;
  margin-right: 10px;
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
  margin-top: 10px;
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
.content_pad .add_btn  {
  background: #F95714;
  border-radius: 4px;
  width: 120px;
  height: 100%;
  color: #fff;
  float: right;
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
.div_table_infor {
   margin-top: 10px;
}
.positionTable   .div_table_infor .el-table {
  border:none;
}
</style>
<style>
.position_list .el-scrollbar__wrap {
  overflow-x: hidden !important;
 }
</style>

