<template>
  <div>
    <div class="mainCon el-col-24">
      <!--顶部导航-->
      <pageheader class="pageheader"></pageheader>
      <!--侧边栏-->
      <!--<div class="aside">-->
        <pageaside></pageaside>
      <!--</div>-->
      <!--右侧内容栏-->
      <div class="right-content pull-right">
        <div class="content">
          <p class="headline">offer管理</p>
          <!--<breadcrumb></breadcrumb>-->
          <div class="offerManageMain">
            <!--offer状态弹窗-->
            <el-dialog
              title="修改offer状态"
              :visible.sync="updateStatusAlert"
              class="updateStatusAlert"
              custom-class="updateStatusContent">
              <div class="inputBox">
                <label>将offer状态修改为</label>
                <el-select v-model="entryStatus" placeholder="请选择offer状态">
                  <el-option
                    v-for="item in entryStatusOption2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>

              <span slot="footer" class="dialog-footer">
                  <el-button type="primary" class="confirm" @click="updateStatusConfirm">确 定</el-button>
                  <el-button  class="cancel" @click="updateStatusAlert=false">取 消</el-button>
                </span>
            </el-dialog>
            <!--offer状态弹窗-->

            <!--offer详情-->
            <el-dialog
              :visible.sync="offerDetailAlert"
              class="offerDetailAlert"
              custom-class="offerDetailAlert">
              <div class="offerDetail">
                <div v-html="offerDetail"></div>
              </div>
            </el-dialog>
            <!--offer详情-->

            <div class="searchBox">
              <div class="input-group">
                <label class="vertical">员工类型</label>
                <el-select v-model="workType" placeholder="请选择员工类型">
                  <el-option
                    v-for="item in workTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="input-group">
                <label class="vertical">入职状态</label>
                <el-select v-model="entryStatus" placeholder="请选择入职状态 ">
                  <el-option
                    v-for="item in entryStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="input-group">
                <label class="vertical">报到时间</label>
                <el-select v-model="entryTime" placeholder="请选择报到时间 ">
                  <el-option
                    v-for="item in entryTimeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="inputBox">
                <input type="text" placeholder="姓名/身份证号/手机号" class="oninput" v-model="searchType">
                <input type="button" class="searchButton" value="搜索" @click="searchOfferList">
              </div>

            </div>

            <!--表格-->
            <div class="offerManageTable">
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="offer发送日" >
                  <template  slot-scope="scope">
                    <span v-html="formatDate2(scope.row.createTime)"></span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="mobile"
                  label="手机号">
                </el-table-column>
                <el-table-column
                  prop="position"
                  label="应聘职位"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="employeeType"
                  label="员工类型"
                  width="80">
                  <template  slot-scope="scope">
                     <span v-if="scope.row.employeeType==0">全职</span>
                    <span v-if="scope.row.employeeType==1">兼职</span>
                    <span v-if="scope.row.employeeType==2">实习</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="reportTime"
                  label="报到时间">
                  <template  slot-scope="scope">
                    <span v-html="formatDate(scope.row.reportTime)"></span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="offer状态">
                  <template  slot-scope="scope">
                    <!--1-等待员工确认offer/ 2-失效 /3-已确认offer待入职/ 4-已完成入职-->
                    <span v-if="scope.row.status==1">等待员工确认offer</span>
                    <span v-if="scope.row.status==2">offer已失效</span>
                    <span v-if="scope.row.status==3">已确认offer待入职</span>
                    <span v-if="scope.row.status==4">已完成入职</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="120px">
                  <template slot-scope="scope">
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        下拉菜单
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="updateSendAgain(scope.row)">修改重发offer</el-dropdown-item>
                        <el-dropdown-item @click.native="checkOffer(scope.row)">查看offer</el-dropdown-item>
                        <el-dropdown-item @click.native="updateStatus(scope.row)">修改offer状态</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页  -->
              <div class="bottom-pagination" v-if="totalCount > 5">
                <el-pagination @current-change="changePage" @size-change="changeSize" :current-page="pageIndex"
                               :page-size="pageSize" :page-sizes="[5,10, 25, 50, 100]"
                               layout="total, prev, pager, next, sizes, jumper" :total="totalCount">
                </el-pagination>
              </div>
              <!-- 分页 end -->
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
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
  import {formatDate} from '@/assets/js/common/date_year.js';
  import breadcrumb from '@/components/common/breadcrumb'
  import {mapState,mapActions} from 'vuex'
  export default {
    name: 'offerManage',
    components: {
      pageheader,
      pageaside,
      breadcrumb
    },
    data() {
      return {
        workType:'',//员工类型
        workTypeOptions:[
          {
            value: '',
            label: '不限'
          },
          {
            value: '0',
            label: '全职'
          }, {
            value: '1',
            label: '兼职'
          },{
            value: '2',
            label: '实习'
          }
        ],
        entryStatus:'',//入职状态
        entryStatusOption2:[
          {
            value: '3',
            label: '已确认offer待入职'
          },{
            value: '1',
            label: '等待员工确认offer'
          },{
            value:'2',
            label:'offer已失效'
          },
          {
            value:'4',
            label:'已完成入职'
          }
        ],
        entryStatusOptions:[
          {
            value:'',
            label:'不限'
          },
          {
            value: '3',
            label: '已确认offer待入职'
          },{
            value: '1',
            label: '等待员工确认offer'
          },{
            value:'2',
            label:'offer已失效'
          },
          {
            value:'4',
            label:'已完成入职'
          }
        ],
        entryTime:'',//入职时间
        entryTimeOptions:[
          {
            value:'',
            label:'不限'
          },{
            value:'1',
            label:'今天'
          },{
            value:'2',
            label:'本周内'
          },{
            value:'3',
            label:'本月内'
          },{
            value:'4',
            label:'已逾期'
          }
        ],
        //表格数据
        tableData:[],
        // tableData: [{
        //   date: '2016/05/02',
        //   name: '王小虎',
        //   mobile: '13852500662',
        //   position:'行政管理',
        //   employeeType:'全职',
        //   reportTime:'2016/05/02 9:00',
        //   offerStatus:'等待员工确认',
        //   /*  operation:'操作选项'*/
        // }],
        totalCount:0,
        pageIndex: 1,
        pageSize:10,
        searchType:'',
        updateStatusAlert:false,//修改offer状态
        id:'',//修改状态需要的offer id
        offerDetail:'',
        offerDetailAlert:false,
        data:{}
      }
    },
    watch: {},
    computed:{
      /*searchType:function () {

      }*/
    },
    methods: {
      // 验证字符串是否是数字
      checkNumber(theObj) {
        let reg = /^[0-9]+.?[0-9]*$/;
        if (reg.test(theObj)) {
          return true;
        }
        return false;
      },
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
        //此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
      },
      formatDate2(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      },
      //修改重发offer
      updateSendAgain(row){
        let that=this;
        that.$router.push('/sendOffer/'+row.id);
      },
      //点击修改offer状态,展示
      updateStatus(row){
        let that=this;
        that.updateStatusAlert=true;
        that.id=row.id;
      },
      //修改状态
      updateStatusConfirm(){
        let that=this;
        that.$http({
          url:api.updateOfferStatus+that.id+"/"+that.entryStatus,
          method:'post',
          headers:headers()
        }).then((res)=>{
          if(res.data.code=10000){

            that.updateStatusAlert=false;
            that.$message.success("修改状态成功！");
            window.location.reload()
          }
        }).catch((res)=>{
          that.$message.error("修改状态失败！")
        })

      },
      //查看offer详情
      checkOffer(row){
        let that=this;
         that.$http({
           url:api.offerDetailButton+row.id,
           method:'get',
           headers:headers()
         }).then((res)=>{
           // console.log(res)
           if(res.data.code=10000){
             that.offerDetail=res.data.data;
             that.offerDetailAlert=true;
            /* this.$alert( ' <div>'+that.offerDetail+'</div>','HTML 片段', {
               dangerouslyUseHTMLString: true
             });*/
           }

         }).catch((res)=>{
           // console.log(res);
         })
      },
      //搜索,默认当前页1;
      searchOfferList(){
        let that=this;
        //搜索
        that.pageIndex=1;
        that.offerlist();
      },
      //offer管理列表
      offerlist(){
        let that=this;
        if(!that.checkNumber(that.searchType) && that.searchType!=""){
          that.data={
            pageCurrent:that.pageIndex,
            pageSize:that.pageSize,
            employeeType:that.workType,
            status:that.entryStatus,//邮件状态
            actualReportTime:that.entryTime,
            name:that.searchType,
          }

        }else{
          that.data={
            pageCurrent:that.pageIndex,
            pageSize:that.pageSize,
            employeeType:that.workType,
            status:that.entryStatus,//邮件状态
            actualReportTime:that.entryTime,
            mobile:that.searchType,
          }
        }
        that.$http({
          url:api.offerManageList,
          method:'post',
          headers:headers(),
          data:that.data
        }).then((res)=>{
          // console.log(res)
          that.tableData=res.data.data;
          that.totalCount = res.data.count;
        }).catch((error)=>{
          console.log(error)
        })

      },
      changePage(newPage) {
        let that=this;
        if(that.pageIndex === newPage) {
          return;
        }
        that.pageIndex = newPage;
        that.offerlist();
      },
      changeSize(newSize) {
        let that=this;
        that.pageSize = newSize;
        that.offerlist();
      },
    },
    mounted() {
      let that=this;
      that.offerlist();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
