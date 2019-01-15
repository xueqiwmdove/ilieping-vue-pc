<template>
  <div >
   <div class="main" >
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
                      <span><i>招聘管理</i> /人才库</span>
                  </p>
                  <el-row>
                <!--创建职位左侧栏  -->
                    <el-col :span='5'  :lg="5" :md="5">
                      <div class="asidePosition ad_input" >
                          <h4><img class="img_shengfen" src="../../assets/img/zhiwei/rencaiku_ic_talent pool.png" alt="">
                            <span  style="margin-left:30px;cursor: pointer;">{{texts}}</span>
                          </h4>
                          <div class="search" style="margin-top:30px;">
                              <el-input v-model="searchContent"  class="input_search" placeholder="请搜索人才库" @keyup.enter.native="getTalent">
                              </el-input>
                              <i  @click="getTalent" slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                          </div>
                          <p  @click="getItems" v-if="flags"> 全部人才 <i ><img  src="../../assets/img/zhiwei/ic_chose.png" alt=""></i></p>
                          <p style="color:#748093 ;" @click="getItems" v-else>全部人才  <i  ><img src="../../assets/img/zhiwei/3.png" alt=""></i></p>
                          <div class="position_list">
                              <el-scrollbar style="height:100%" >
                                  <ul>
                                      <li :class="seen==item.id ? 'heightlight':''" @click="getCandidateList(item)" v-for="(item,index) in personList " :key="index">
                                          {{item.tagName}}
                                            <span>
                                                <i @click="edit()"><img src="../../assets/img/zhiwei/bian.png" alt=""></i>
                                                <i @click="deletes()"><img src="../../assets/img/zhiwei/zhiwei_ic_del.png" alt=""></i>
                                            </span>
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
                                <el-col :span="16">
                                <div class="listitem bordersty" >
                                    <p class="font_s">{{totalCounts}}</p>
                                    <p class="num_s">该人才库候选总数</p>
                                </div>
                                <div class="listitem today ">
                                    <p class="font_s " style="color:#FF9C6E">{{todayTotal}}</p>
                                    <p class="num_s num1-s">今日归档人数</p>
                                </div>
                                </el-col>
                                <el-col :span="6">
                                     <div class="search">
                                        <el-input v-model="searchname"  class="input_search" placeholder="输入你想搜索的内容" @keyup.enter.native="searchList" >
                                        <i @click="searchList" slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                                        </el-input>
                                        <el-button class="add_btn" @click="addVisible=true">新建人才库</el-button>
                                     </div>
                                </el-col>
                              </el-row>
                            </div>
                        <!--表格  -->
                            <div class="div_table_infor">
                                <el-table :key='signs'  :data="TalentList" style="width: 100%" >
                                    <el-table-column fixed prop="processNum" label="基本资料" header-align='center' align='left' width="520px">
                                        <template slot-scope="scope" >
                                            <span class="basic_sty " style="cursor: pointer"  @click="addCandidateShow('steps');showSteps(scope.row.id)">
                                              <span class="name_s">{{scope.row.candidateName}} <em>{{scope.row.candidateSex}}</em><em class="bom_sty"></em><em>{{scope.row.candidateExperience}}</em></span>
                                              <p><img src="../../assets/img/zhiwei/houxuan_ic_work.png" alt=""><span>{{scope.row.workExperience}}</span></p>
                                              <p><img src="../../assets/img/zhiwei/houxuan_ic_education.png" alt=""><span>{{scope.row.educationExperience}}</span></p>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="chargeId" label="最近归档时间" header-align='center' align='center'></el-table-column>
                                    <el-table-column prop="postStr" label="招聘职位" header-align='center' align='center'></el-table-column>
                                    <el-table-column prop="screeningStatus" label="归档前状态" header-align='center' align='center'>
                                        <template slot-scope="scope">
                                            <span style="cursor: pointer;">
                                            <i v-if="scope.row.screeningStatus == '1'" style="color:#66ADFF;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_no feedback.png" alt="">未反馈</i>
                                            <i v-if="scope.row.screeningStatus =='2'" style="color:#FF001F;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_disagree.png" alt="">拒绝</i>
                                            <i v-if="scope.row.screeningStatus == '3'" style="color:#5EC860;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_agree.png" alt="">同意</i>
                                            <i v-if="scope.row.screeningStatus == '0'" style="color:#FF001F;"><img style="margin-right:5px;" src="../../assets/img/zhiwei/houxuan_ic_not recommendde.png" alt="">未推荐</i>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  prop="archivingReason" label="归档原因" header-align='center' align='center'></el-table-column>
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
      <!-- 弹窗-新增人才库  -->
     <el-dialog title="新建人才库" :visible.sync="addVisible" class="add_dialog" custom-class="sty_dialogs" >
        <el-form style="margin-left:50px;" :model="form1" :rules="rules"  ref="form1" @submit.native.prevent="addSubmit">
          <el-form-item label="人才库名称"  prop="deptName">
            <el-input style="width:280px;" v-model="form1.deptName" maxlength="32"  placeholder="请输入名称"  @keyup.enter.native="addSubmit"></el-input>
          </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
         <el-button type="primary"  :class="searchBtnClass" :disabled="searchDisabled" style="height:36px;background: #F95714;" @click="addSubmit">提交</el-button>
            <el-button style="height:36px" @click="addVisible=false">取 消</el-button>
        </div>
      </el-dialog>

    <!--编辑人才库-->
    <el-dialog title="编辑人才库" :visible.sync="updateVisible" class="add_dialog" custom-class="sty_dialogs" >
      <el-form style="margin-left:50px;" :model="form1" :rules="rule"  ref="form2"  @submit.native.prevent="updateSubmit">
        <el-form-item label="人才库名称"  prop="updateDeptName">
          <el-input style="width:280px;" v-model="form2.updateDeptName" maxlength="32"  placeholder="请输入名称"  @keyup.enter.native="updateSubmit"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"   style="height:36px;background: #F95714;" :class="searchBtnClass2" :disabled="searchDisabled2" @click="updateSubmit">提交</el-button>
        <el-button style="height:36px"  @click="updateVisible=false">取 消</el-button>
      </div>
    </el-dialog>

       <!-- 弹窗-删除人才库  -->
      <el-dialog title="" :visible.sync="dialogDelete" class="del_dialog " style="border-bottom: 0px solid #E5E5E5;" custom-class="sty_dialogs del_dialog">
             <div style="text-align:center;"><i class="el-icon-warning" style="font-size:27px;color:#F5A623;"></i></div>
             <div style="text-align:center;font-size:16px;color:#394A66;margin:10px 0 ;">您是否确认删除该人才库？</div>
             <div style="text-align:center;font-size:16px;color:#394A66">（删除后您只能在全部淘汰候选人中找到该人才库中的数据）</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deleteTalent " style="height:36px">确 定</el-button>
          <el-button style="height:36px" @click="dialogDelete = false">取 消</el-button>
        </div>
      </el-dialog>
    <!--候选人信息  父组件传值-->
    <candidateSteps  :addVisible.sync="visables.steps"  @hideModel="hideChildModal" :candidateStepsData="candidateStepsData"  :standardResume="standardResume" :candidateWorkExperienceDTOList="candidateWorkExperienceDTOList" :candidateEducationExperienceDTOList="candidateEducationExperienceDTOList" :signs="signs" ></candidateSteps>
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
  import candidateSteps from '@/components/candidate/candidateSteps';
//  blance
export default {
  name: 'jobmanageindex',
	components: {
   	pageheader,
    pageaside,
    candidateSteps,
  },
   data() {
      return {
        candidateStepsData:[],//候选人基本信息
        standardResume:[],//候选人个人信息之外的内容,
        candidateWorkExperienceDTOList:'',//工作经历
        candidateEducationExperienceDTOList:'',//教育经历
        visables:{
          steps:false,
        },
        searchType:'all',
        totalCounts:0,//人才库总数
        todayTotal:0,//今日归档总数
        updateVisible:false,
        seen:'',
        signs:0 ,
        TalentList:[],//列表
        personList:[],//人才库数据
        counts:{},
        searchContent:'',//搜素关键字
        searchname:'',
        id:'',//人才库id
        totalCount:0,
        texts:'人才库',
        candidatestatus:0,
        flags:true,
        pageIndex: 1,
        pageSize: 5,
        addVisible:false,//新建人才库
        dialogDelete:false,//删除人才库
        form1:{
          deptName:''
        },
        rules: {
          deptName:[
            { required: true, message: '请输入人才库名称', trigger: 'blur' },
            { min:1, max: 32, message: '长度在32个字符内', trigger: 'blur' }
           ],
        },
        form2:{
          updateDeptName:''
        },
        rule: {
          updateDeptName:[
            { required: true, message: '请输入人才库名称', trigger: 'blur' },
            { min:1, max: 32, message: '长度在32个字符内', trigger: 'blur' }
          ],
        },
      };
    },
    computed:{
        //搜索按钮样式
        searchBtnClass:function () {
          if(this.form1.deptName!="" ){
              return{
                click_opacity:false
              }
          }else{
              return{
                click_opacity:true
              }
          }
        },
        //按钮禁用 true
        searchDisabled:function () {
          if(this.form1.deptName!=""  ){
            return false
          }else{
            return true
          }
        },
        //搜索按钮样式
        searchBtnClass2:function () {
          if(this.form2.updateDeptName!="" ){
            return{
              click_opacity:false
            }
          }else{
            return{
              click_opacity:true
            }
          }
        },
        //按钮禁用 true
        searchDisabled2:function () {
          if(this.form2.updateDeptName!=""  ){
            return false
          }else{
            return true
          }
        },
   },
    methods: {
     //编辑
       edit() {
         this.updateVisible = true
       },
    // 删除
      deletes() {
       this.dialogDelete = true
      },
      //新建人才库提交
      addSubmit() {
       let that=this;
        that.$http({
          method:'post',
          url:api.addTalent,
          data:{
            tagName:that.form1.deptName
          },
          headers:headers(),
        }).then(function (res) {
          that.addVisible=false;
          that.form1.deptName='';
          if(res.data.code==10000){
            that.$message.success(res.data.msg);
            that.getTalent();
          }else{
            that.$message.error(res.data.msg)
          }
        })
      },
      //编辑人才库提交
      updateSubmit() {
         let that=this;
        that.$http({
          method:'post',
          url:api.updateTalent,
          data:{
            tagId:that.id,
            tagName:that.form2.updateDeptName
          },
          headers:headers(),
        }).then(function (res) {
          that.updateVisible=false;
          that.form2.updateDeptName='';
          if(res.data.code==10000){
            that.$message.success(res.data.msg);
            that.getTalent();
          }else{
            that.$message.error(res.data.msg)
          }
        })
      },
      //删除人才库
      deleteTalent() {
        let that=this;
        that.$http({
          method:'post',
          url:api.removeTalent,
          data:{
            tagId:that.id,
          },
          headers:headers(),
        }).then(function (res) {
          that.dialogDelete=false;
          if(res.data.code==10000){
            that.$message.success(res.data.msg);
            that.getTalent();
          }else{
            that.$message.error(res.data.msg)
          }
        })
      },
      //统计人才库中人才数量
      talentCounts(){
        let that=this;
        that.$http({
          method:'get',
          url:api.talentCounts,
          headers:headers(),
        }).then(function (res) {
          if(res.data.code==10000){
            let data=res.data.data;
            that.totalCounts=data.aLLCount;//人才库总数
            that.todayTotal=data.todayCount;
          }
        })
      },
      //获取左侧人才库列表
      getTalent(){
        let that=this;
        that.$http({
          method:"post",
          url:api.talentTag+'all',
          headers:headers(),
          data:{
            searchContent:that.searchContent,
          }
        }).then(function(res){
          if(res.data.code==10000){
            that.personList=res.data.data;
          }else{
            that.$message.error(res.data.msg);
          }
        });
      },
      //获取人才库数据列表
      getTalentList() {
        let that=this;
        let currPage=that.pageIndex || 1;
        let pageSize=that.pageSize || 5;
          that.$http({
            method:"post",
            url:api.talentList,
            headers:headers(),
            data:{
              tagId:that.id || null,
              enterpriseId:that.enterpriseId || '',
              searchType:that.searchType,//'all'||'tag',
              candidateName:that.searchname,
              pageCurrent:currPage,
              pageSize:pageSize,
            }
          }).then(function(res){
            if(res.data.code==10000){
               that.TalentList=res.data.data;
              that.totalCount=res.data.count;
            }else{
              that.$message.error(res.data.msg);
            }
          });
      },
      //选择人才库类型查询所有人才
      getCandidateList(item) {
        this.id = item.id;
        this.searchType='tag';
        this.seen = item.id;//选中样式
        this.getTalentList();
        this.flags =false;
      },
      changePage(newPage) {
        let that=this;
        if(that.pageIndex === newPage) {
          return;
        }
        that.pageIndex = newPage;
        that.getTalentList();
      },
      changeSize(newSize) {
        let that=this;
        that.pageSize = newSize;
        that.getTalentList();
      },

      searchList() {
       this.getTalentList()
       //  this.$router.push({path:'/searchCandidata',query:{code:this.searchname,postId:this.postId,candidatestatus:this.candidatestatus}})
      },
      getItems() {
        this.flags = !this.flags;
        this.seen= '';
        this.id = '';
        this.searchType='tag';
        this.getTalentList()
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
            // console.log( that.candidateStepsData[0].status)
          }
        })
      },
    },
    mounted() {
     this.getTalentList();
     this.getTalent();
     this.talentCounts();
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
  top: 5px;
  height: 25px;
  font-size: 18px;
  font-weight: 700;
  border-left: 1px solid #E5E5E5;
  color: #F95714;
  cursor: pointer;
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
   width: 100%;
}
.position_list ul {
  width: 100%;
  height: 100%;
  margin-top: 5px;
}
.position_list ul li {
  height: 30px;
  color:rgba(57,74,102,1);
  font-size: 15px;
  line-height: 30px;
  margin-bottom:10px;
  padding-left: 10px;
  cursor: pointer;
  position: relative;
}
.position_list ul li span {
   position: absolute;
   top: 0px;
   right: 20px;
    display: none;
}
 .position_list ul li:hover span{
   display: inline-block;
 }
.position_list ul li:hover {
  color: #F95714;
}
/* 右侧样式开始 */
.positionTable {
  background-color: #fff;
  padding: 12px 25px;
  padding-top: 24px;
  min-width: 729px;
  padding-left: 0px;
  height:800px;
  overflow: hidden;
}
/* 右侧顶部样式开始 */
.content_pad {
  margin:11px;
  margin-left:45px;
  height:80px;
  line-height:80px;
  margin-top: 0px;
}
.listitem {
  width:160px;
  height:80px;
  text-align: center;
  margin-right: 10px;
  border-radius: 4px;
  display:inline-block;
  cursor: pointer;
  background: #FFFFFF;
  color: #748093;
}
.listitem p {
  width: 100%;
  line-height: 30px;
  text-align: center;
  height: 30px;
}
.bordersty {
 border: 1px solid #80CBC4;
}
.today {
 border: 1px solid #FF9C6E;
}
.content_pad .listitem .font_s {
  font-size: 18px;
  color: #80CBC4;
  line-height: 48px;
}
.content_pad .listitem .num_s {
  color: #fff;
  font-size: 14px;
  background-color: #80CBC4;
  margin-top:18px;
}
.content_pad .listitem  .num1-s {
  background-color: #FF9C6E;
}
/* 右侧顶部样式结束 */
/* 右侧搜索框样式开始 */
.content_pad .search {
  display: inline-block ;
  width: 400px;
  height: 40px;
  margin-top: 10px;
}
.content_pad .search .input_search {
  width: 260px;

}
.content_pad .search .input_search .se_icon {
  position: absolute;
  right:-244px;
  top: 30px;
  height: 25px;
  font-size: 18px;
  font-weight: 700;
  border-left: 1px solid #E5E5E5;
  color: #F95714;
  cursor: pointer;
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
  margin-left: 10px;
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
.del_dialog .el-dialog__header {
   border-bottom:none;
   height: 40px;;
}
</style>

