<template>
  <div >
   <div class="mainCon el-col-24">
     <!--候选人弹窗 addCandidateStatus(候选人页面显示与否） -->
     <addCandidate :addVisible.sync="visables.add" @hideModel="hideChildModal"  :addCandidateStatus="addCandidateStatus"></addCandidate>
     <!--候选人信息  父组件传值-->
     <candidateSteps  :addVisible.sync="visables.steps"  @hideModel="hideChildModal" :candidateStepsData="candidateStepsData"  :standardResume="standardResume" :candidateWorkExperienceDTOList="candidateWorkExperienceDTOList" :candidateEducationExperienceDTOList="candidateEducationExperienceDTOList" :signs="signs" ></candidateSteps>

     <!--顶部导航-->
        <pageheader class="pageheader"></pageheader>
          <!--侧边栏-->
          <!--<div class="aside">-->
            <pageaside></pageaside>
          <!--</div>-->
          <!--右侧内容栏-->
          <div class="right-content pull-right">
              <div class="content">
                  <p class="headline">
                      <span><i>招聘管理</i> /候选人管理</span>
                  </p>
                  <el-row>
                <!--创建职位左侧栏  -->
                    <el-col :span='5'  :lg="5" :md="5">
                      <div class="asidePosition ad_input" >
                          <h4><img class="img_shengfen" src="../../assets/img/zhiwei/shengfen.png" alt="">
                            <span @click="check"  style="margin-left:30px;cursor: pointer;">{{texts}}</span>
                            <i  @click="check"  v-if="showList" style="color:#AAADB5;" class="el-icon-caret-bottom"></i>
                            <i  @click="check"  v-else style="color:#AAADB5;" class="el-icon-caret-right"></i>
                          </h4>
                            <transition  name="fade" enter-class="fade-in-enter" enter-active-class="fade-in-active" leave-class="fade-out-enter" leave-active-class="fade-out-active">
                                <div v-if="showList"  v-clickoutside="handleClose">
                                    <div  class="select_position_sty">
                                      <ul>
                                        <li  @click="checkItem('1')">招聘中的职位</li>
                                        <li @click="checkItem('0')">停止招聘</li>
                                      </ul>
                                  </div>
                                </div>
                            </transition>
                          <div class="search" style="margin-top:30px;">
                              <el-input v-model="names"  class="input_search" placeholder="输入职位" >
                              </el-input>
                              <i @click="getPosition" slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                          </div>
                          <p style="z-index:1000"  @click="getItems" v-if="flags"> 全部职位 <i ><img  src="../../assets/img/zhiwei/ic_chose.png" alt=""></i></p>
                          <p style="color:#748093 ;" @click="getItems" v-else>全部职位  <i  ><img src="../../assets/img/zhiwei/3.png" alt=""></i></p>
                          <div class="position_list">
                              <el-scrollbar style="height:100%" >
                                  <ul>
                                      <li :class="seen==item.id ? 'heightlight':''" @click="getCandidateList(item)" v-for="(item,index) in personList " :key="index">
                                          {{item.name}}
                                      </li>
                                  </ul>
                              </el-scrollbar>
                          </div>
                      </div>
                    </el-col>
                <!--创建职位右边部分  -->
                    <el-col  :span='19' :lg="19" :md="19">
                      <div class="positionTable">
                            <div class='content_pad'>
                              <el-row>
                                <el-col>
                                <div class="but_stys" :class="signs=='2'? 'btn_s':''" @click="tagStyChange(2)">
                                    <p class="font_s">初筛</p>
                                    <i class="num_s">{{count2}}</i>
                                    <em class=" icon_s">
                                      <img v-if="signs == '2'" src="../../assets/img/zhiwei/houxuan_ic_filter_pre.png" alt="">
                                      <img v-else src="../../assets/img/zhiwei/houxuan_ic_filter.png" alt="">
                                    </em>
                                </div>
                                <div class="but_stys "  :class="signs=='3'? 'btn_s':''" @click="tagStyChange(3)">
                                    <p class="font_s">用人部门筛选</p>
                                    <i class="num_s">{{count3}}</i>
                                    <em class=" icon_s">
                                        <img v-if="signs == '3'" src="../../assets/img/zhiwei/houxuan_ic_department_pre.png" alt="">
                                        <img v-else src="../../assets/img/zhiwei/houxuan_ic_department.png" alt="">
                                    </em>
                                </div>
                                  <div class="but_stys"  :class="signs=='4'? 'btn_s':''" @click="tagStyChange(4)">
                                    <p class="font_s">面试</p>
                                    <i class="num_s">{{count4}}</i>
                                    <em class=" icon_s">
                                        <img v-if="signs == '4'" src="../../assets/img/zhiwei/houxuan_ic_interview_pre.png" alt="">
                                        <img v-else src="../../assets/img/zhiwei/houxuan_ic_interview.png" alt="">
                                    </em>
                                </div>
                                <div class="but_stys "  :class="signs=='5'? 'btn_s':''" @click="tagStyChange(5)">
                                    <p class="font_s">沟通Offer</p>
                                    <i class="num_s">{{count5}}</i>
                                    <em class=" icon_s">
                                        <img v-if="signs == '5'" src="../../assets/img/zhiwei/houxuan_ic_contact_pre.png" alt="">
                                        <img v-else src="../../assets/img/zhiwei/houxuan_ic_contact.png" alt="">
                                    </em>
                                </div>
                                  <div class="but_stys"  :class="signs=='6'? 'btn_s':''" @click="tagStyChange(6)">
                                    <p class="font_s">待入职</p>
                                    <i class="num_s">{{count6}}</i>
                                    <em class=" icon_s">
                                        <img v-if="signs == '6'" src="../../assets/img/zhiwei/houxuan_ic_wait_pre.png" alt="">
                                        <img v-else src="../../assets/img/zhiwei/houxuan_ic_wait.png" alt="">
                                    </em>
                                </div>
                               <!-- <div class="but_stys "  :class="signs=='0'? 'btn_s':''"  @click="tagStyChange(0)">
                                    <p class="font_s">已淘汰</p>
                                    <i class="num_s">{{count0}}</i>
                                    <em class=" icon_s">
                                        <img v-if="signs == '0'" src="../../assets/img/zhiwei/houxuan_ic_pass_pre.png" alt="">
                                        <img v-else src="../../assets/img/zhiwei/houxuan_ic_pass.png" alt="">
                                    </em>
                                </div>-->
                                  <div  style="float: right">
                                    <div  class="history_s">
                                      <i @click="$router.push('/talentPool');fileshow=false"  @mouseenter="fileshow=false"  v-if="fileshow"><img src="../../assets/img/1.5.1/file.png" alt="">历史归档</i>
                                      <i @click="$router.push('/talentPool');fileshow=true;"  @mouseleave="fileshow=true;" v-else style="color:#F95714;"><img src="../../assets/img/1.5.1/file2.png" alt="">历史归档</i>
                                    </div>
                                    <div class="search">
                                      <el-input v-model="searchname"  class="input_search" placeholder="输入你想搜索的内容" >
                                        <i @click="searchList" slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                                      </el-input>
                                      <el-button class="add_btn" @click="addCandidateShow('add');">添加候选人</el-button>
                                    </div>
                                  </div>

                                </el-col>
                              </el-row>
                            </div>
                        <!--表格  -->
                            <div class="div_table_infor">
                                <el-table :key='signs'  :data="candidateList" style="width: 100%" >
                                    <el-table-column fixed prop="processNum" label="基本资料" header-align='center' align='left' min-width="520px">
                                        <template slot-scope="scope" >
                                            <span class="basic_sty " style="cursor: pointer"  @click="addCandidateShow('steps');showSteps(scope.row.id)">
                                              <span class="name_s">{{scope.row.candidateName}} <em>{{scope.row.candidateSex}}</em><em class="bom_sty"></em><em>{{scope.row.candidateExperience}}</em></span>
                                              <p><img src="../../assets/img/zhiwei/houxuan_ic_work.png" alt=""><span>{{scope.row.workExperience}}</span></p>
                                              <p><img src="../../assets/img/zhiwei/houxuan_ic_education.png" alt=""><span>{{scope.row.educationExperience}}</span></p>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="chargeId" label="候选人负责人" header-align='center' align='center'></el-table-column>
                                    <el-table-column prop="postStr" label="招聘职位" header-align='center' align='center'></el-table-column>
                                    <el-table-column prop="resumeChannel" label="招聘渠道" header-align='center' align='center'></el-table-column>
                                    <el-table-column  v-if="signs =='2'" prop="createTime" label="添加日期" header-align='center' align='center'></el-table-column>
                                    <el-table-column  v-if="signs =='3'" prop="screeningStatus" label="状态" header-align='center' align='center'>
                                        <template slot-scope="scope">
                                            <span style="cursor: pointer;">
                                            <i v-if="scope.row.screeningStatus == '1'" style="color:#66ADFF;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_no feedback.png" alt="">未反馈</i>
                                            <i v-if="scope.row.screeningStatus =='2'" style="color:#FF001F;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_disagree.png" alt="">拒绝</i>
                                            <i v-if="scope.row.screeningStatus == '3'" style="color:#5EC860;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_agree.png" alt="">同意</i>
                                            <i v-if="scope.row.screeningStatus == '0'" style="color:#FF001F;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_not recommendde.png" alt="">未推荐</i>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  v-if="signs =='4'" prop="interviewStatus" label="面试状态" header-align='center' align='center'>
                                        <template slot-scope="scope">
                                            <span v-if="scope.row.interviewStatus =='0'" style="cursor: pointer;">
                                              <p>未安排面试</p>
                                              <el-button size="small" style="color:#fff ;background-color:#F95714;" @click="addCandidateShow('steps');showSteps(scope.row.id);">去安排</el-button>
                                            </span>
                                            <span v-if="scope.row.interviewStatus == '1'" style="cursor: pointer;">
                                              <p>已安排面试</p>
                                              <el-button size="small" style="color:#fff ;background-color:#66ADFF;" @click="addCandidateShow('steps');showSteps(scope.row.id);">去查看</el-button>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  v-if="signs =='5'" prop="offerStatus" label="Offer状态" header-align='center' align='center'>
                                        <template slot-scope="scope">
                                            <span style="cursor: pointer;">
                                            <i v-if="scope.row.offerStatus == '0'" ><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_notcreate.png" alt="">未创建</i>
                                            <!-- <i v-if="scope.row.offerStatus == '1'"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_not receive.png" alt="">未接收</i> -->
                                            <i v-if="scope.row.offerStatus == '3'"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_receive.png" alt="">同意</i>
                                            <i v-if="scope.row.offerStatus == '2'" ><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_refused.png" alt="">已拒绝</i>
                                            <i v-if="scope.row.offerStatus == '1'"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_not receive.png" alt="">待接收</i>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  v-if="signs =='6'" prop="createDate" label="预计入职时间" header-align='center' align='center'></el-table-column>
                                    <el-table-column  v-if="signs =='0'" prop="archivingReason" label="淘汰原因" header-align='center' align='center'></el-table-column>
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
//  blance
  import addCandidate from '@/components/candidate/addCandidate';
  import candidateSteps from '@/components/candidate/candidateSteps';

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
    // recommend_depart
  },
   data() {
      return {
        fileshow:true,
        addCandidateStatus:false,//添加候选人页面整体
        signs:'2' ,
        candidateList:[],//列表
        personList:[],//人员数据
        counts:{},
        names:'',//搜素关键字
        searchname:'',
        postId:'',//职位id
        totalCount:0,
        seen:'',
        texts:'招聘中的职位',
        candidatestatus:'2',
        recruitStatus:'1',
        isflag:false,
        count0:'',
        count2:'',
        count3:'',
        count4:'',
        count5:'',
        count6:'',
        showList:false,
        flags:true,
        pageIndex: 1,
        pageSize: 5,
        addVisible:false,
        visables:{
          add:false,
          steps:false,
          recommend:false,
        },
        // candidateID:'',//候选人ID
        candidateStepsData:[],//候选人基本信息
        standardResume:[],//候选人个人信息之外的内容,
        candidateWorkExperienceDTOList:'',//工作经历
        candidateEducationExperienceDTOList:''//教育经历
      };
    },
   directives: {clickoutside},
    methods: {
      handleResize (event) {
        this.screenWidth = document.documentElement.clientWidth
        console.log(this.screenWidth,55)
        },
    /*  //列表处于面试阶段， 传给子组件选中的状态
      interviewStatus(param){
        this.interviewStatus=param;
      },*/
    //获取职位列表
    getCandidate() {
      let that=this;
      let currPage=that.pageIndex || 1;
      let pageSize=that.pageSize || 5;
        that.$http({
	  			method:"post",
	  			url:api.candidateList,
	  			headers:headers('application/json;charset=utf-8'),
	  			data:{
				    postId:that.postId || '',
				    candidateName:that.searchname || '',
				    candidateStatus:that.candidatestatus ,
				    pageCurrent:currPage,
				    pageSize:pageSize,
	  			}
	  		}).then(function(res){
	  			if(res.data.code==10000){
             that.candidateList=res.data.data;
            that.totalCount=res.data.count;
            // console.log(that.totalCount)
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
    },
      getCandidateList(val) {
        this.postId = val.id
        this.seen = val.id
        this.getCandidate()
        this.flags =false
      },
    //展示候选人弹窗
      addCandidateShow(param){
        let that=this;
        that.visables[param] = true;

        if(param=='steps'){//添加候选人信息弹窗s


        }else{
          that.addCandidateStatus=true;
        }
      },
    //关闭候选人弹窗
      hideChildModal(param){
        console.log('接收的子组件数据--------->'+param);
        this.visables[param]= false;
      },
    //状态切换
    tagStyChange(val) {
      this.signs =val
      this.candidatestatus = val
      this.getCandidate()

    },
    //选择招聘状态
    checkItem(val) {
      this.recruitStatus=val
      this.showList =false
      if(val == '0') {
        this.texts = '停止招聘'
      }else {
        this.texts = '招聘中的职位'
      }
      this.getPosition()
    },
    check() {
      this.showList = !this.showList
    },
    handleClose() {
      this.showList = false
    },
    changePage(newPage) {
          let that=this;
          if(that.pageIndex === newPage) {
            return;
          }
          that.pageIndex = newPage;
          that.getCandidate();
        },
        changeSize(newSize) {
          let that=this;
          that.pageSize = newSize;
          that.getCandidate();
    },
  //获取左侧职位列表
    getPosition(){
      let that=this;
      that.$http({
        method:"post",
        url:api.getPosition,
        headers:headers('application/json;charset=utf-8'),
        data:{
          'name':that.names,
          'recruitStatus':that.recruitStatus,
        }
      }).then(function(res){
        if(res.data.code==10000){
            that.personList=res.data.data;
        }else{
          that.$message.error(res.data.msg);
        }
      });
    },
    searchList() {
      this.$router.push({path:'/searchCandidata',query:{code:this.searchname,postId:this.postId,candidatestatus:this.candidatestatus}})
    },
    getItems() {
      this.flags = !this.flags
      this.seen= ''
      this.postId = ''
      this.getCandidate()
    },
  //获取状态数据
    getCount() {
      let that=this;
        that.$http({
	  			method:"post",
	  			url:api.getGrouping,
          headers:headers('application/json;charset=utf-8'),
          data:{
            "postId":that.postId || ''
          }
	  		}).then(function(res){
	  			if(res.data.code==10000){
             that.counts=res.data.data;
           for(var i in  that.counts) {
             if(that.counts[i].status =='0') {
               that.count0 = that.counts[i].count
             }else if(that.counts[i].status =='2') {
               that.count2 = that.counts[i].count
             }else if(that.counts[i].status =='3') {
               that.count3 = that.counts[i].count
             }else if(that.counts[i].status =='4') {
                that.count4 = that.counts[i].count
             }else if(that.counts[i].status =='5') {
                that.count5 = that.counts[i].count
             }else if(that.counts[i].status =='6') {
                that.count6 = that.counts[i].count
             }
           }

	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
    },

    //blance showSteps  查询候选人信息
      showSteps(id){
       let that=this;
        that.$http({
          url:api.getCandidate+id,
          headers:headers(),
          method:'get',
        }).then(function (res) {
          that.candidateStepsData=[];
          that.standardResume=[];
          if(res.data.code==10000 && res.data.data !=null ){
            localStorage.setItem("candidateID",id);
            that.candidateStepsData.push(res.data.data);
            that.standardResume.push(JSON.parse(res.data.data.standardResume));
            that.candidateWorkExperienceDTOList=JSON.parse(res.data.data.standardResume).candidateWorkExperienceDTOList;
            that.candidateEducationExperienceDTOList=JSON.parse(res.data.data.standardResume).candidateEducationExperienceDTOList;
            console.log( that.candidateStepsData[0].status)
          }
        })
      },
    //  关掉原始简历上的选择简历来源
      closeResume(){
        let that=this;
        that.addCandidateStatus=false;
      },
      openResume(){
        let that=this;
        that.addCandidateStatus=true;
      }
    },
    mounted() {
     this.getCandidate()
     this.getPosition()
     this.getCount()
    },
    created() {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
 .content {
   min-width: 820px;
   background-color: #FAFAFA;
 }
 .main .right-content .content .headline {
   margin-bottom: 0px;
   border-bottom: none;
   background-color: #FAFAFA;
 }
.main .right-content .content {
  background-color: #FAFAFA;
  box-shadow: none;
}
.asidePosition {
  /* width: 310px; */
  min-width: 190px;;
  height:800px;
  background: #fff;
  margin-right: 15px;
  padding: 12px 20px;
  margin-right: 20px
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
  left: 4px;;
}
.asidePosition h4 .img_shengfen {
    position: absolute;
}
.select_position_sty {
  position: absolute;
  top: 35px;
  left:114px;
  width:100px;
  height: 112px;
  background-color: #FAFBFC;
  border: 1px solid #FAFBFC;
  z-index: 10;
  box-shadow: 0 2px 4px 0 rgba(216,216,216,0.50);
}
.select_position_sty::after {
  content: '';
  width :0;
  height:0 ;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #FAFBFC transparent;
  left: 39px;
  top: -10px;
  position: absolute;
  z-index: 10;
}
.select_position_sty ul li  {
  padding: 20px 5px;
  text-align: center;
  border-bottom: 1px solid #FAFBFC;
  cursor: pointer;
}
.select_position_sty ul li .activeP {
   color: #F95714;
}
.select_position_sty ul li:hover {
  color: #F95714;
}
/* 左侧搜索框样式开始 */
.ad_input .search {
  max-width: 260px;
  text-align: center;
  height: 40px;
  position: relative;
  top:10px;
}
.ad_input .search .input_search {
  max-width: 260px;
}
.ad_input  .search .se_icon {
  position: absolute;
  right:8px;
  top: 6px;
  height: 25px;
  /*top: 3px;*/
  /*height: 30px;*/
  font-size: 18px;
  font-weight: 700;
  border-left: 1px solid #E5E5E5;
  color: #F95714;
}
.ad_input .search .el-icon-search:before {
  content: "\E619";
  margin-left: 5px;
}
/* 左侧搜索框样式结束 */
.ad_input p {
  height: 30px;
  line-height: 30px;
  color: #F95714;
  margin-top:20px;
  width: 100%;
  position: relative;
}
.ad_input p i {
  position: absolute;
  top: 0px;
  right: 25px;
}
.position_list {
   height:500px;
   width: 260px;
}
.position_list ul {
  width: 100%;
  height: 100%;
}
.position_list ul li {
  height: 30px;
  color:rgba(57,74,102,1);
  font-size: 15px;
  line-height: 30px;
  margin-bottom:10px;
  padding-left: 10px;
  cursor: pointer;
}
.position_list ul li:hover {
  color: #F95714;
}
/* 右侧样式开始 */
.positionTable {
  background-color: #fff;
  padding: 20px 25px;
  min-width: 729px;
  padding-left: 0px;
  /*height:800px;*/
  /*overflow: hidden;*/
}
/* 右侧顶部样式开始 */
.content_pad {
  margin:11px;
  margin-left: 0px;
  height:80px;
  line-height:80px;
  margin-top: 0px;
  clear: both;
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
.history_s {
  display: inline-block;
  /*margin-left:40px;*/
  /*position: absolute;*/
  cursor: pointer;
  margin-right: 10px;
}
.history_s i img {
  display: inline-block;
  position: absolute;
  top: 32px;
  left: -19px;
}
/* 右侧顶部样式结束 */
/* 右侧搜索框样式开始 */
.content_pad .search {
  display: inline-block ;
  right: 0px;
  width: 400px;
  height: 40px;
  margin-top: 21px;
  position: relative;
  float: right;
}
.content_pad .search .input_search {
  width: 260px;
  position: absolute;
  top:-21px;
}
.content_pad .search .input_search .se_icon {
  position: absolute;
  right:-244px;
  top: 30px;
  height: 25px;
  /*top: 25px;*/
  /*height: 30px;*/
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
  border: none;
}
/* 搜索框样式结束 */
.basic_sty .name_s {
  font-size: 15px;
  color:#394A66;
}
.basic_sty .name_s em {
  font-size: 12px;
  color: #748093;
}
/*  */
.div_table_infor {
   margin-top: 10px;
}
.positionTable   .div_table_infor .el-table {
  border:none;
}
.fade-in-active, .fade-out-active {
  transition: all 0.2s ease ;
}
.fade-in-enter, .fade-out-active {
  opacity: 0 ;
}
.heightlight {
  color:#F95714 !important;
}
 .history_s i {
   display: inline-block;
   height: 30px;
   line-height: 30px;
   margin-left: 80px;
   position: relative;
   left: -5px;
 }
 .history_s i img {
   display: inline-block;
   position: absolute;
   top: 8px;
   left: -16px;
 }

</style>
<style>
.position_list .el-scrollbar__wrap {
  overflow-x: hidden !important;
 }
 .ad_input .el-input--prefix .el-input__inner {
   padding-left:0px;
 }
 .content_pad .el-input--prefix .el-input__inner {
   padding-left:0px;
 }
.bottom-pagination{
  margin: 20px 0;
}
</style>
