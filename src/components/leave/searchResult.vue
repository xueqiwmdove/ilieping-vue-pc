<template>
  <div>
    <div class="main">
  		<!--顶部导航-->
  	<pageheader class="pageheader"></pageheader>
      <!--侧边栏-->
      <div class="aside">
        <pageaside></pageaside>
      </div>
      <!--右侧内容栏-->
      <div class="right-content pull-right">
        <div class="content">
          <!--start-->
          <p class="headline">

            <router-link class="leaveSearchTitle"  v-show="type=='searchbefore'" to="/searchBefore">离职评价查询</router-link>
            <router-link class="exposureSearchTitle" v-show="type=='searchbefore2'" to="/searchBefore2">失信曝光查询</router-link>
            <span class="active">查询结果</span>
          </p>
          <div class="searchResult" >
            <p class="search-num">共找到<i>{{searchData.length}}</i>条符合条件的数据</p>
            <!--有结果-->
            <div class="single-data" v-for="item in searchData">
              <img src="../../assets/img/dismission/women_19_32.svg" width="120" height="120" alt="icon" class="female" v-if="item.userSex==0 &&  item.userAge >=19 &&item.userAge <= 32"><!-- 女19-32  sex_img==0-->
              <img src="../../assets/img/dismission/men_19_32.svg" width="120" height="120" alt="icon" class="female" v-if="item.userSex==1 && item.userAge >= 19 && item.userAge <= 32"><!-- 男19-32 -->
              <img src="../../assets/img/dismission/men_0_18.svg" width="120" height="120" alt="icon" class="female" v-if="item.userSex==1 && item.userAge <= 18"><!-- 男18岁以下 -->
              <img src="../../assets/img/dismission/men_33_45.svg" width="120" height="120" alt="icon" class="female" v-if="item.userSex==1 && item.userAge >= 33 && item.userAge <= 45"><!-- 男33-45 -->
              <img src="../../assets/img/dismission/men_46_60.svg" width="120" height="120" alt="icon" class="female" v-if="item.userSex==1 && item.userAge >= 46 && item.userAge <= 60"><!-- 男46-60 -->
              <img src="../../assets/img/dismission/men_60+.svg" width="120" height="120" alt="icon" class="female" v-if="item.userSex==1 && item.userAge >= 60"><!-- 男60+ -->
              <img src="../../assets/img/dismission/women_0_18.svg" width="120" height="120" alt="icon" class="female" v-if="item.userSex==0 && item.userAge <= 18"><!-- 女18岁以下 -->
              <img src="../../assets/img/dismission/women_33_45.svg" width="120" height="120" alt="icon" class="female" v-if="item.userSex==0 && item.userAge >= 33 && item.userAge <= 45"><!-- 女33-45 -->
              <img src="../../assets/img/dismission/women_46_60.svg" width="120" height="120" alt="icon" class="female" v-if="item.userSex==0 && item.userAge >= 46 && item.userAge <= 60"><!-- 女46-60 -->
              <img src="../../assets/img/dismission/women_60＋.svg" width="120" height="120" alt="icon" class="female" v-if="item.userSex==0 && item.userAge >= 60"><!-- 女60+ -->
              <!--<img src="../../assets/img/dismission/ic_female.svg" class="head-portrait" v-if="item.userSex==0">-->
              <!--<img src="../../assets/img/dismission/ic_man.svg" class="head-portrait" v-if="item.userSex==1">-->
              <div class="single-left">
                <h2 class="single-name">{{item.userName}}</h2>
                <p v-if="item.userSex==1">
                  <label>性别</label>
                  男
                </p>
                <p v-if="item.userSex==0">
                  <label>性别</label>
                  女
                </p>
                <p>
                  <label>年龄</label>
                  {{item.userAge}}<!--（{{item.birthDate}}年）-->
                </p>
                <p>
                  <label>手机</label>
                  {{item.phoneUser}}
                </p>
              </div>
              <div class="single-right pull-right">
                <h2 class="company">上传企业</h2>
                <p class="company-name">
                  <img src="../../assets/img/dismission/ic_alliance_cb.svg" v-if="item.isVip==1">
                  <img src="../../assets/img/dismission/ic_alliance.svg" v-if="item.isVip==0">
                  {{item.corporateName}}
                </p>
                <div class="hover-info" v-if="item.isVip==1">
                  <i class="triangle-up"></i>
                  该信息由联盟企业发布
                </div>
                <div class="hover-info" v-if="item.isVip==0">
                  <i class="triangle-up"></i>
                  该企业尚未加入联盟
                </div>
           <!--     <span class="leaveReport "  v-if="type=='searchbefore'" @click="gotoLeaveReport(item.reportId)"> 查看离职评价</span>
                <span class="leaveReport 2" v-if="type=='searchbefore2'" @click="gotoExposureReport(item.reportId)"> 查看离职评价</span>-->
                <span class="leaveReport "  v-if="item.reportType==1" @click="gotoLeaveReport(item.reportId)"> 查看离职评价</span>
                <span class="leaveReport 2" v-if="item.reportType==2" @click="gotoExposureReport(item.reportId)"> 查看失信曝光</span>
                <span class="leaveReport" v-if="item.reportType==3" @click="gotoQuickReport(item.reportId)"> 查看离职评价</span>
              </div>
            </div>

            <!--分页-->
            <el-pagination v-if="totalCount>4"
              @size-change="changeSize"
              @current-change="changePage"
              :current-page="pageIndex"
              :page-sizes="[5,10,20,30,50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>
          </div>
          <!--end-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
  import http from '@/http/http';
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'

    export default {
        name: "searchResult",
        components:{
          pageheader,
          pageaside
        },
      data(){
          return{
            searchData:[],
            timeDate:new Date(),
            reportType:'',
            type:this.$route.params.type,
            oldURL:'',
            length:0,
            pageSize:5,//每页显示多少条，
            pageIndex:1,//当前页面
            totalCount:0,//总共多少条
            sex_img:'',
            userAge:'',
            userSex:'',

          }
      },
      methods:{
          //点击跳转到查询页面
        goToSearch(){
         /* console.log(this.reportType);

          if(this.reportType==1){
            this.$router.push({name: 'searchbefore'})
          }else{
            this.$router.push({name: 'searchbefore2'})
          }*/
          console.log(this.type);
          if(this.type=='searchbefore'){
            this.$router.push({name: 'searchbefore'})
          }else{
            this.$router.push({name: 'searchbefore2'})
          }
        },
        //查询数据
        getSearchData(){
          let that=this;
          let currentPage=that.pageIndex || 1;
          let itemsPerPage=that.pageSize || 5;

          that.$http({
            method: "post",
            url:api.search2+localStorage.getItem('resCode')+'/'+currentPage+'/'+itemsPerPage,  //TODO  需要传入参数 reportType 报告类型  searchContent 搜索内容  provinceList 地区  industry 行业
            // data:JSON.parse(localStorage.getItem('obj')),
            headers:headers()
          }).then(function (res) {
            let result = res.data;
           if(result.code==10000&&result.count!=0){
             that.searchData=result.data;
             that.totalCount = res.data.count;
           }
          })
        },

        //切换页数
        changePage(newPage){
          let that=this;
          //切换页==当前页
          if(that.pageIndex===newPage){
            return;
          }
          that.pageIndex=newPage;
          that.getSearchData();
        },
        changeSize(newSize){
          let that=this;
          that.pageSize=newSize;
          that.getSearchData();
        },
      //  跳转页面
        gotoLeaveReport(reportId){
          this.$router.push('/leaveReport/'+reportId);
        },
        //失信曝光报告页面
        gotoExposureReport(reportId){
          this.$router.push('/exposureReport/'+reportId);
        },
        //快速上传页面
        gotoQuickReport(reportId){
          this.$router.push('/quickReport/'+reportId);
        },
      },
      //TODO
   /*   beforeRouteEnter (to, from, next){
        next(vm => {
          // 通过 `vm` 访问组件实例,将值传入oldUrl
          vm.oldUrl = from.path
        })
      },*/
      mounted(){
        // let searchDataRes=JSON.parse(localStorage.getItem("searchData"));
        // this.searchData=searchDataRes.data.data;

        // console.log(this.searchData);
       /* this.reportType=1;

        //TODO 获取一页的url,存在刷新后无法获取到上一页的url;
        this.$nextTick(()=>{
          // 验证是否获取到了上页的url
          /!* eslint-disable no-console *!/
          console.log(this.oldUrl);
          if(this.oldUrl=="/searchbefore"){
            this.reportType=1
          }else{
            this.reportType=2
          }
        });*/

        this.getSearchData();

        let prevBtn=document.getElementsByClassName("btn-prev");
        prevBtn.innerHTML="上一页"
      },
      //TODO 日历过滤器
      filters:{
        // formatDate(time){
        //   let date = new Date(time);
        //   return formatDate(date, 'yyyy-MM-dd')
        // }
      },
      created() {
        // let id = this.$route.params.type;
        // alert(id);
        // console.log(this.type)
      }

      }
</script>

<style scoped>

  .searchResult{
    padding: 30px 0 20px 0;
  }
  .leaveReport{
    cursor: pointer;
  }
</style>
