<template>
  <div class="searchBox">
    <div class="masking" v-show="loading"></div>
    <!--搜索无结果-->
    <div class="g-dialog-contianer" v-show="isAlert">
      <div class="dialog-window" style=" height: 272px;">
        <div class="g-dialog-off" @click="closeFun"></div>
        <div class="dialog-header warning"></div>
        <div class="dialog-container">
          <div class="dialog-msgContent">暂未搜索到相关员工数据，建议您换个条件重试</div>
        </div>
        <div class="dialog-footer">
          <button class="confirm" @click="closeFun">继续</button>
          <button class="cancel" @click="closeFun">取消</button>
        </div>
      </div>
    </div>
    <!--loading-->
    <div class="searchLoading" v-show="loadingShow">
      <img src="../../assets/img/dismission/loading.gif" width="120" height="120">
      <p>正在搜索联盟数据库...</p>
    </div>
    <!--积分不足-->
    <div class="blance_alert less_integral" v-show="less_show">
      <div class="alert_header text-right">
        <img src="../../assets/img/dismission/ic_close.svg" alt="X" @click="closeAlertFun1()">
      </div>
      <div class="alert_body text-center">
        <img src="../../assets/img/dismission/ic_warning.svg">
        <h6>本次查询需要<i>10</i>职场信用分，您的职场信用分不足
          开通联盟VIP会员尊享免费查询特权</h6>
        <p>当前职场信用分：<i>{{num1}}</i>分</p>
      </div>
      <div  class="alert_footer button_group">
        <input type="button" class="open_at_one"  value="立即开通" @click="goToAlliance()">
        <input type="button" class="cancel" value="取消" @click="closeAlertFun1()">
      </div>
    </div>

    <!--积分不足开通联盟会员-->
    <el-dialog
      title="开通联盟会员"
      :visible.sync="isVip"
      class="isVip"
      custom-class="isVipContent">
      <div class="open-recruit">
        <div class="two-kinds stair">
          <p><span>2000 </span>元/1年</p>
          <p>30次／天免费查询</p>
        </div>
        <div class="payFor">
          <h4>选择充值方式</h4>
          <p class="alipay"></p>
          <p class="weChart"></p>
        </div>
        <p class="agree"><label for="radio"><input type="radio" id="radio">加入联盟即表示同意联盟章程</label></p>
      </div>
      <span slot="footer" class="dialog-footer">
              <el-button type="primary"  class="confirm join-in btn" @click="isVip=false">加入联盟</el-button><!--使用模板确定-->
      </span>
    </el-dialog>

    <!--积分充足-->
    <div class="blance_alert full_integral" v-show="full_show">
      <div class="alert_header text-right">
        <img src="../../assets/img/dismission/ic_close.svg" alt="X" @click="closeAlertFun2()">
      </div>
      <div class="alert_body text-center">
        <img src="../../assets/img/dismission/ic_warning.svg">
        <h6>本次查询将消耗 <i>10</i>职场信用分，是否继续？</h6>
        <p>当前职场信用分：<i>{{num2}}</i>分</p>
      </div>
      <div  class="alert_footer button_group">
        <input type="button" class="open_at_one" @click="goSearchResult()" value="继续">
        <input type="button" class="cancel" value="取消" @click="closeAlertFun2()">
      </div>
    </div>
    <div class="searchInput">
      <div class="areaBox" v-clickOutSide="handleClose">
        <span class="area" @click="areaToggle($event)" :class="area" ><i id="area">{{area}}</i> <em class="triangleBottom"></em></span>
        <!--下拉-->
        <div class="areaDetail"  v-show="isAreaShow">
          <span v-for="(item,index) in allArea" :key="index" @click="getArea(item,index)" :class="{chosen:index==current}">{{item}}</span>
        </div>
      </div>

      <input type="text" class="search-value"  name="value"  v-model.trim="searchValue" @input="searchMaxLength()" ref="count"  placeholder="请输入姓名或手机号后四位查询"  @keyup.enter="searchFun"/><!--@keyup="searchValue=searchValue.replace(/\s+/g,'')"-->
      <em class="line"></em>
      <!--<input type="text" class="industry" id="industry"  placeholder="行业" @click="showOrHide"/>-->
      <!--<em class="triangleBottom" style="top: 18px; right: 10px;"  @click="showOrHide"></em>-->
      <!--下拉-->
      <selectIndustry @child-msg="get"></selectIndustry>

      <!--<div class="pulldown">
          <ul>
              <li>计算机/互联网/通信/电子</li>
              <li>贸易消费/制造/营运</li>
              <li>制药/医疗制药/医疗</li>
              <li>广告/媒体</li>
              <li>房地产/建筑</li>
              <li>专业服务/教育/培训</li>
              <li>能源/原材料能源/原材料</li>
              <li>政府/非盈利机构/其他</li>
              <li>金融业/证劵</li>
          </ul>
      </div>-->
    </div>
    <input type="button" class="search searchLeave" :class="searchBtnClass" :disabled="searchDisabled"  @click="searchFun" value="搜索" />
    <p class="hotIndustry">热门行业： 金融业 / 证劵， 贸易 / 消费 / 制造 /运营 ， 计算机 / 互联网 / 通信 /电子 ， 房地产 / 建筑,业服务/教育/培训 </p>
  </div>
</template>

<script>
  import http from '@/http/http';
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import selectIndustry from '@/components/common/selectIndustry';

  export default {
    name:'searchBox',
    components:{
      headers,
      selectIndustry
    },
    data(){
      return{
        isAreaShow:false,
        allArea:['全国',
          '北京市','上海市','天津市','重庆市','河北省','山西省','内蒙古','辽宁省','吉林省','黑龙江省','江苏省','浙江省','广西','安徽省',
          '福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','海南省','四川省','贵州省','云南省','西藏','陕西省','甘肃省','青海省',
          '宁夏','新疆','台湾','香港','澳门'
        ],
        area:'全国',
        fillArea:[],
        current:0,//当前下标值
        searchValue:'',
        isLoading:false,//进度条
        less_show:false,//积分不足弹窗
        full_show:false,
        loadingShow:false,//搜索加载中,
        loading:false,//蒙版
        num1:"",//当前积分
        num2:"",
        provinceList:[],
        reportType:'',
        industry:'',
        msg:'',//行业id
        isAlert:false,
        timer:null,//将定时器保存到变量中，退出是清除变量
        isVip:false
    }
    },
    directives : {
      clickOutSide:{
        bind:function(el,binding,vnode){
          function documentHandler(e){
            if(el.contains(e.target)){
              return false;
            }
            if(binding.expression){
              binding.value(e)
            }
          }
          el._vueClickOutside_ = documentHandler;
          document.addEventListener('click',documentHandler);
        },
        unbind:function(el,binding){
          document.removeEventListener('click',el._vueClickOutside_);
          delete el._vueClickOutside_;
        }
      }
    },
    methods:{
      //监听搜索的时候，数字只能是4位，其他5位。
      searchMaxLength(){
        let that=this;
        let _sum=5;
        let _reg=/[^\u4E00-\u9FA5]/g;
        let sum=4;
        let reg=/\d/;let reg1=/\s+/g;

        if(reg.test(that.searchValue)==true && that.searchValue!="" ){
          that.$refs.count.setAttribute("maxlength",sum);
        }else{
          that.$refs.count.setAttribute("maxlength",_sum);
        }
      },
      handleClose(){
        this.isAreaShow=false;
      },
      get(val){
        let that=this;
        that.msg=val;
       // alert(that.msg)
      },
      areaToggle(e){
        let that=this;
        if(e.target.className!='area'){
          that.isAreaShow=false;
        }
        that.isAreaShow=!that.isAreaShow;

      },
      getArea(value,index){
        let that=this;
        that.area=value;
        that.current=index;

        that.isAreaShow=false;
      },
      searchFun(){
        let that=this;
        //TODO 查询积分 ，调积分接口
        let reg=/\s+/g;
        if(this.searchValue!="" && this.area!="" ){
          this.$http({
            method:"get",
            url:api.integral,
            headers:headers(),
          }).then(function (res) {
            // console.log(res);
            let result=res.data;
            if(result.code==10000&&result.data>9){
              //1.积分充足，显示
              that.full_show=true;
              that.loading=true;
              that.num2=result.data;

              //
              localStorage.removeItem('searchValue');
              // $(".full_integral,.masking").show().find("p i").html(result.data);

            }else if(result.code==10000&&result.data<10){
              // $(".less_integral,.masking").show().find("p i").html(result.data);
              //2、积分不足，显示，==》开通会员
              that.less_show=true;
              that.loading=true;
              that.num1=result.data;
            }
          })
        }
      },
      //TODO 积分充足调查询，有数据去结果页，没数据显示弹框(更换条件)
      goSearchResult(){
        let that=this;
        that.full_show=false;
        that.loadingShow=true;
        that.loading=true;


        //TODO 地区
        if(that.area=="全国"){
          that.provinceList=[];
          // console.log(that.provinceList)

        }else{
          //TODO take care
          that.provinceList.push(that.area);
          // console.log(that.provinceList)

        }
        //获取路由名
        if(that.$route.name=='searchbefore2'){
            that.reportType=2;
            that.IntegralAjax(that.msg,that.reportType)
        }else{
            that.reportType="";//1;
            that.IntegralAjax(that.msg,that.reportType)
        }





      },
      //扣除积分接口
      IntegralAjax(industry,reportType){
        let that=this;
        that.$http({
          method:"post",
          url:api.Integral,
          headers:headers(),
          data:{
            searchContent:that.searchValue,
            reportType:reportType,
            provinceList:that.provinceList,
            industry:industry
          }

        }).then(function (res) {
          // console.log(res.data.data);
          if(res.data.code==10000){
            let resCode=res.data.data;
            localStorage.setItem("resCode",resCode);
            let url=api.search2+resCode+"/1/5";
            that.searchAjax(url)
          }else{
            that.loadingShow=false;
            that.loading=false;
            that.$message.error(res.data.msg)
          }
        })
      },
      //查询数据接口
      searchAjax(url){
        let that=this;
        that.$http({
          method: "post",
          url:url,
          headers:headers()
        }).then(function (res) {
          let result = res.data;
          if (result.code == 10000&&result.count==0) {
            // console.log(res)
            setTimeout(function () {
              that.loadingShow=false;
              that.loading=true;
              //TODO 提示弹窗
              that.isAlert=true;

            },2000);

          }else if(result.code==10000&&result.count!=0){

            that.$router.push('/searchResult/'+that.$route.name);

          }else{
            that.$message.error(res.data.msg)
          }
        })
      },
      //异常积分弹窗，展示加入会员弹窗，//跳转到联盟会员,
      goToAlliance(){
        let that=this;
        that.less_show=false;
        that.loading=false;
        that.isVip=true;
        //that.$router.push({name: 'account_alliancevip'});
      },
      //关闭弹窗
      closeAlertFun1(){
        let that=this;
        that.less_show=false;
        that.loading=false;
      },
      closeAlertFun2(){
        let that=this;
        that.full_show=false;
        that.loading=false;
      },
      //关闭弹窗
      closeFun(){
        let that=this;
        that.isAlert=false;
        that.loading=false;
      },



    },
    computed:{
      //搜索按钮样式
      searchBtnClass:function () {
        let reg=/\s+/g;
        let reg2=/[\u4e00-\u9fa5]{2,5}/;
        let reg3=/\d{4}/;
        // console.log("中文"+reg2.test(this.searchValue))
        // console.log("数字"+reg3.test(this.searchValue))
        if((reg2.test(this.searchValue)==true || reg3.test(this.searchValue)==true)&& this.searchValue!="" && this.area!="" && !this.isLoading){
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
        let reg=/\s+/g;
        let reg2=/[\u4e00-\u9fa5]{2,5}/;
        let reg3=/\d{4}/;
        if((reg2.test(this.searchValue)==true || reg3.test(this.searchValue)==true ) && this.searchValue!="" && this.area!="" && !this.isLoading){
          return false
        }else{
          return true
        }
      },

    },
    mounted(){
      // console.log(localStorage.getItem('searchValue'))
      if(localStorage.getItem('searchValue')!=null && this.$route.name=='searchbefore2'){
        this.searchValue=localStorage.getItem('searchValue');
      }
    }

  }
</script>

<style scoped>
  .triangleBottom{
    cursor: pointer;
    position: absolute;
    width:0;
    height:0;
    border-top: 6px solid #AAADB5;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
  .text-center{
    text-align: center;
  }
  .text-right{
    text-align: right;
  }
  .blance_alert .alert_footer input,.blance_alert .alert_footer .cancel{
    font-size: 14px;
  }
  .areaBox{
    display: inline-block;
  }

  .el-button{
    padding: 0 5px;
    border: none;
  }

  .open-recruit .payFor h4{
    background: #fff;
    height: 24px;
    line-height: 24px;
    color: #394A66;
  }
  .open-recruit .payFor p{
    margin: 0 20px 0 0;
  }
  .el-dialog.isVipContent{
    width: 450px!important;
  }
  .searchBeforePage .leaveSearchBefore .agree{
    font-size: 14px;
    color: #748093;
    letter-spacing: 0;
    margin: 40px 0 0 20px;
    cursor:pointer;
  }
  .agree input{
    margin: 0 8px 0 0;
  }
</style>
