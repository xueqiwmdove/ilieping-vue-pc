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
          <!--主体内容-->
          <p class="headline">
            <a>发起签约</a>
          </p>
          <!--<breadcrumb></breadcrumb>-->

      <!--发起签约弹出框   :before-close="handleClose"-->
          <el-dialog
            title="选择签约方式"
            :visible.sync="signAlert"
            class="signAlert"
            custom-class="signAlertCotent">
            <div class="signKind" @click="changeClass(1)" :class="flag==1?'active':''">
              <img src="../../assets/img/contract/ic_shiyongmoban.svg" alt="" v-if="flag==1">
              <img src="../../assets/img/contract/ic_shiyongmoban2.svg" alt="" v-if="flag==2">
              <p>使用模板</p>
            </div>
            <div class="signKind" @click="changeClass(2)" :class="flag==2?'active':''">
              <img src="../../assets/img/contract/ic_shangchuangbendi.svg" alt="" v-if="flag==2">
              <img src="../../assets/img/contract/ic_shangchuangbendi2.svg" alt="" v-if="flag==1">
              <p>上传本地文件</p>
            </div>
            <div class="signError">
              <img src="../../assets/img/contract/ic_prompt.svg" alt="">
              行业标准模板创建合同，无
              需为合同条款发愁，简单三步直
              接完成签署。
            </div>
            <div class="signError">
              <img src="../../assets/img/contract/ic_prompt.svg" alt="">
              请上传单个文件，且文件大小
              在5M以下，仅支持doc、docx、
              pdf、jpg、jpeg、png格式的文件。
            </div>
            　
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="showModels()" class="confirm" v-show="flag==1">确 定</el-button><!--使用模板确定-->
               <!--<el-button type="primary" class="confirm"  v-show="flag==2">确 定</el-button>&lt;!&ndash;上传文件确定&ndash;&gt;-->
              <el-button @click="signAlert = false" class="cancel">取 消</el-button>
            </span>
          </el-dialog>
      <!--发起签约弹出框-->

          <!--选择模板  :before-close="handleClose"-->
          <el-dialog
            title="选择模板"
            :visible.sync="modelAlert"
            class="modelAlert"
            custom-class="modelAlertCotent">
            <div class="modelCarsouel">
              <swiper :options="swiperOption"   ref="mySwiper"  v-loading="loading">
                <swiper-slide v-for="(item,index) in templateData"  :key="index"   :class="current==index?'active':''" :title="JSON.stringify(item)"  ><!-- @clcik.native="clickSelect(index,item)"-->
                     <div class="singleTemplate">
                       <p class="title">{{item.templateName}}</p>
                       <p style="display: none" class="totalPage">{{item.totalPage}}</p>
                       <p style="display: none" class="templateNumber">{{item.templateNumber}}</p>
                       <p class="lookContract" @click="lookPdf(item.templateAddress)">
                         查看合同
                       </p>
                     </div>
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"> < </div>
                <div class="swiper-button-next" slot="button-next"> > </div>
              </swiper>
             <!-- <el-carousel trigger="click" height="226px" arrow="always"
                           indicator-position="none"  :autoplay="false">&lt;!&ndash;type="card" :autoplay="false"&ndash;&gt;
                <el-carousel-item  v-for="(item,index) in templateData"  :key="index" @click.native="clickSelect(index,item)" :class="current==index?'active':''" :style="transform(index)" >&lt;!&ndash;v-bind="transform(index)"&ndash;&gt;&lt;!&ndash; v-for="item in 4" :key="item" &ndash;&gt;
                  <div class="singleTemplate" >
                    <p class="title">{{item.templateName}}</p>
                    <p style="display: none" class="totalPage">{{item.totalPage}}</p>
                    <p style="display: none" class="templateNumber">{{item.templateNumber}}</p>
                    <p class="lookContract">
                      查看合同
                    </p>
                  </div>
                </el-carousel-item>
              </el-carousel>-->
            </div>

            <div class="modelInfo">
              <p>模板介绍：</p>
              支持重复、批量发送标准合同；<br>
              试用场景：劳动合同、经销商合同、服务协议等任何需要批量发送标准合同的场景。
            </div>
            　
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="goTO_selectTemplates" class="confirm">确 定</el-button>
              <el-button @click="modelAlert = false" class="cancel">取 消</el-button>
            </span>
          </el-dialog>
          <!--选择模板-->

          <div class="bySinging">
            <div class="statusParent">
              <div class="signedStatus firstStatus"  @click="clickHref(2)">
                <img src="../../assets/img/contract/ic_daiwoqian.svg" alt="">
                <em class="num waiteMeSign">{{waiteMeSign}}</em>
                <p>待我签</p>
              </div>
              <div class="signedStatus secondStatus" @click="clickHref(1)">
                <img src="../../assets/img/contract/ic_daitarenqian.svg" alt="">
                <em class="num waiteHeSign">{{waiteHeSign}}</em>
                <p>待他人签</p>
              </div>
              <div class="signedStatus thirdStatus" @click="clickHref(11)">
                <img src="../../assets/img/contract/ic_jijiangjiezhi.svg" alt="">
                <em class="num cutOff">{{cutOff}}</em>
                <p>即将到期</p>
              </div>
              <div class="signedStatus forthStatus" @click="clickHref(5)">
                <img src="../../assets/img/contract/ic_yiqianyue.svg" alt="">
                <em class="num signed">{{signed}}</em>
                <p>已签约</p>
              </div>
            </div>
            <div class="middleline"></div>
            <div class="signedButton">
              <div>
                <img src="../../assets/img/contract/ic_faqiqianyue.svg" alt="">
              </div>
              <input type="button" value="发起签约" @click="clickSign"><!--@click="signAlert = true"-->
            </div>
          </div>

          <!--特点-->
          <div class="advantages">
            <div class="adv_son">
              <div>
                <img src="../../assets/img/contract/ic_1.svg" alt="">
                <p>纸质合同电子化</p>
                <em>无需打印，节约环保</em>
              </div>
              <div>
                <img src="../../assets/img/contract/ic_2.svg" alt="">
                <p>线下签名电子化</p>
                <em>电子印章随身带，合同随时随地签</em>
              </div>
              <div>
                <img src="../../assets/img/contract/ic_3.svg" alt="">
                <p>合同签署流程线上化</p>
                <em>无需快递邮寄，无需等待，快速流转，成本低</em>
              </div>
            </div>
            <div class="adv_son">
              <div>
                <img src="../../assets/img/contract/ic_4.svg" alt="">
                <p>电子合同安全可靠</p>
                <em>保证签署者身份真实性，合同完整性</em>
              </div>
              <div>
                <img src="../../assets/img/contract/ic_5.svg" alt="">
                <p>电子证据全程固话</p>
                <em>从用户实名到文件签署，自动存储电子证据</em>
              </div>
              <div>
                <img src="../../assets/img/contract/ic_6.svg" alt="">
                <p>无需技术对接/业务层接入</p>
                <em>无需或动更低门槛技术对接，即可使用</em>
              </div>
            </div>

          </div>

          <!--主体内容-->
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import http from '@/http/http'
  import api from '@/api/api.js'
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader'
  import pageaside from '@/components/common/pageaside'
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import breadcrumb from '@/components/common/breadcrumb'
  import {mapState,mapActions} from 'vuex'
    let vm = null;
    export default {
      name: "bySinging",
      components: {
        pageheader,
        pageaside,
        swiper,
        swiperSlide,
        breadcrumb
      },
      data(){
         return{
            waiteMeSign:0,//待我签
           waiteHeSign:0,//待他人签
           cutOff:0,//即将截止
           signed:0,//已签约
           signAlert: false,
           flag:1,//默认显示（使用模板）
           modelAlert: false,
           loading:true,

           swiperOption: {//swiper3
             speed: 1000,
             slidesPerView:4,
             spaceBetween:20,
             notNextTick: true,//
             loop:false,//
             // autoplay: {//TODO 自动播放的功能 important
             //   disableOnInteraction: false,
             // }
             paginationClickable :true,
             navigation: {
               nextEl: '.swiper-button-next',
               prevEl: '.swiper-button-prev',
             },
             //TODO swiper 点击事件有效
             on: {
               // 这里有坑，需要注意的是：this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
               click:function(){
                 //当前点击的swiper-slide的下标值
                 const clickedIndex=this.clickedIndex;
                 //this 代表整个swiper this.slides：具体的swiper-slide;
                 vm.clickSelect(clickedIndex,this.slides[clickedIndex]);
               }
             }

           },
           templateData:[],//模板数据
           current:0,//当前页下标,
           pngtranslateX:180,
         }
      },

      computed: {
        swiper() {
          return this.$refs.mySwiper.swiper;
        },
       /* transform:function (index) {
            return function (index) {
              /!** 处理逻辑 *!/
              let that=this;
              let current=index;
              console.log(index);


              if(current==0){
                // that.style.translate=0;
                let arr = new Array();
                arr.push('transform:');
                arr.push('translateX(0px)');
                return arr.join("");
              }else{
                // that.style.translate=160*index+20;
                let arr = new Array();
                arr.push('transform:');
                for(let i=1;i<current;i++){
                  arr.push('translateX('+this.pngtranslateX+'px) ');
                }
                return arr.join("");
              }
            }




        }*/
      },
      created() {
        vm = this;
      },
      methods: {
          //4个签约状态的数据
          getCountContract(){
            let that=this;
            that.$http({
              method:"get",
              url:api.countContract,
              headers:headers(),
            }).then(function(res){
              if(res.data.code==10000 || res.data.data==null){
               let data=res.data.data;
               that.waiteMeSign=data.companySignLength;
                that.waiteHeSign=data.employeeSignLength;//待他人签
                that.cutOff=data.expiringLength;//即将截止
                that.signed=data.completeLength;//已签约
              }else{
                that.$message.error(res.data.msg);
              }
            });
          },
          //发起签约调接口
         clickSign(){
          let that=this;
          that.$http({
            url:api.clickSign,
            method:"post",
            headers:headers(),
          }).then(function (result) {
            // console.log(result);
            if(result.data.code==10000){
              // that.signAlert = true;
              that.showModels();
              that.modelAlert=true;
              // that.templateData=result.data.data;
              // console.log(that.templateData);
            }else if(result.data.code==40007){
              let isAuthentication=result.data.data.isAuthentication;
              //TODO 审核中 您的企业正在审核中，审核通过后即可使用合同签约功能

              if(isAuthentication==1||isAuthentication==0){
                // that.$confirm('您的账号暂未企业认证，认证成功后即可使用合同签约功能！', '提示', {
                //   confirmButtonText: '确定',
                //   cancelButtonText: '取消',
                //   center:'true',
                // });
                that.$confirm('需要通过企业认证才能发起签署', '提示', {
                  confirmButtonText: '去认证',
                  cancelButtonText: '稍后再说',
                  center:'true',
                }).then(() => {
                  that.$router.push("/businessCert");
                });
              }else if(isAuthentication==2){
                that.$confirm('您的企业正在审核中，审核通过后即可使用合同签约功能！', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  center:'true',
                });

              }

            }else{
              that.$message.error(result.message || result.data.msg)
            }
          })
        },

          //点击跳转到合同管理之前，先判断企业已认证
        clickHref(flag){
           console.log(flag);
          let that=this;
          that.$http({
            url:api.clickSign,
            method:"post",
            headers:headers(),
          }).then(function (result) {
            // console.log(result);
            if(result.data.code==10000){
              // that.$router.push("/contractManagement");
              that.$router.push("/contractManagement?flag="+flag);
            }else if(result.data.code==40007){
              let isAuthentication=result.data.data.isAuthentication;
              //TODO 审核中 您的企业正在审核中，审核通过后即可使用合同签约功能

              if(isAuthentication==1||isAuthentication==0){
                that.$confirm('需要通过企业认证才能发起签署', '提示', {
                  confirmButtonText: '去认证',
                  cancelButtonText: '稍后再说',
                  center:'true',
                }).then(() => {
                  that.$router.push("/businessCert");
                });
              }else if(isAuthentication==2){
                that.$confirm('您的企业正在审核中，审核通过后即可使用合同签约功能！', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  center:'true',
                }).then(() => {

                }).catch(() => {
                  that.$message({
                    type: 'info',
                    message: '已取消'
                  });
                });
              }

            }else{
              that.$message.error(result.message || result.data.msg)
            }
          })
        },
        changeClass(a){
          let  that=this;
          that.flag=a;
        },
        //点击展示模板
        showModels(){
          let that=this;
          // that.signAlert = false;//选择签约方式弹窗
          that.modelAlert = true;//选择模板弹窗
          //合同模板查询
          that.$http({
            url:api.templateKinds,
            method:"post",
            headers:headers(),
          }).then(function (result) {
            // console.log(result);
            if(result.data.code==10000){
              that.templateData=result.data.data;
              setTimeout(function () {
                that.loading=false;

              },1000)

              // console.log(that.templateData);
              //默认选中的合同模板第一个，将合同相关数据存到缓存里
              // console.log(that.templateData[0]);
              localStorage.setItem("item",(JSON.stringify(that.templateData[0])));
            }else{
              that.$message.error(result.message || result.data.msg)
            }
          })

        },
        //点击模板弹窗确定按钮跳转到选择模板页面
        goTO_selectTemplates(){
          let that=this;
          that.modelAlert = false;

          //选中的合同模板，将合同相关数据存到缓存里
          // document.getElementsByClassName("templateNumber");
          // localStorage.setItem("templateNumber",)

          // that.$router.push({name:'selectTemplates'});
          that.$router.push({name:'customContractTemplate'});
        },
        //TODO swiper 点击当前滑块执行无效 ,换成走马灯点击效果可以
          clickSelect(index,item){
            let that=this;
            // console.log( "可以",index,item,item.title);
            let items=document.getElementsByClassName("swiper-slide");
            for(let i=0;i<items.length;i++){
              items[i].classList.remove("active");
            }
            // console.log(item);
            //点击在swiper-slide 才执行添加样式
            if(item==undefined){

            }else{
              item.classList.add("active");
              //选中的合同模板，将合同相关数据存到缓存里
              localStorage.setItem("item",(item.title));
            }
            // console.log(item.parentNode.childNodes)

          },

          lookPdf(url){
            window.open(url);
          }
        },
      mounted(){
        let that=this;
        that.getCountContract();
        // console.log(1+JSON.stringify(this.$store.state.breadListState));

      }
    }
</script>
<style scoped>
  .main .right-content .content .headline{
    margin: 0;
  }

  .el-dialog__title {
    font-size: 18px;
    color: #21324E;
    letter-spacing: 0;
    display: block;
    text-align: center;
  }
  .el-dialog .signKind.active{/*,.el-dialog .signKind:hover*/
    cursor: pointer;
    border: 1px solid #f95714;
    background: url("../../assets/img/company/payCheck.png") no-repeat 162px 162px;
  }
  .el-dialog .signKind.active p{/*,.el-dialog .signKind:hover p*/
    color: #394A66;
  }
  .el-dialog .signKind{
    width: 200px;
    height: 200px;
    text-align: center;
    display: inline-block;
    background: #F8FAFC;
    border: 1px solid #E5E5E5;
    border-radius: 4px;
    /*transition: all 0.6s;*/
  }
  .signKind p{
    font-size: 16px;
    color: #97A2B3;
    letter-spacing: 0;
    text-align: center;
  }
  .signKind img{
    margin: 50px 0 25px;
  }
  .el-dialog .signKind:first-child{
    margin:8px 30px 23px 35px;
  }
  .signError{
    display: inline-block;
    width: 200px;
    margin: 0 0 0 35px;
    font-size: 14px;
    vertical-align: top;
    color: #7A8699;
    letter-spacing: 0;
    line-height: 20px;
  }
/*选择模板弹窗 TODO elementUi 走马灯*/


  .modelCarsouel{
    /*width: 700px;*/
    /*padding: 0 30px 20px;*/
    padding: 0 0 20px;
    border-bottom:1px solid #E5E5E5 ;
  }
  .modelAlert .el-carousel__item{
    width: 160px;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.08);
    background:url("../../assets/img/contract/ic_weixuanzhong.svg") #F9F9F9 no-repeat bottom;
  }
  .modelAlert .el-carousel__item.active{
   /* background:url("../../assets/img/contract/ic_xuanzhong.svg") #F9F9F9 no-repeat bottom;
    border:1px solid #f95714;*/
  }
  .modelAlert .el-carousel__item.active .singleTemplate{
    border:0.5px solid #f95714;
    background:url("../../assets/img/contract/ic_xuanzhong.svg") #F9F9F9 no-repeat bottom;
  }
  .modelAlert .el-carousel__item.active .singleTemplate .lookContract{
    opacity:1;
  }
  .modelAlert .el-carousel__item.active .singleTemplate .title{
    color: #f95714;
  }
  .el-carousel__arrow{
    width:18px;
    height: 18px;
    background: #97A2B3;
  }
  /*选择模板弹窗 end*/

  /*TODO swiper 选择模板弹窗*/

  .swiper-slide{
    width: 160px!important;
    height: 226px;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.08);
    overflow: hidden;
    cursor: pointer;

  }
  .singleTemplate{
    width: 100%;
    height: 100%;
    padding: 14px 0 0;
    position: relative;
    border: 0.5px solid transparent;
    background:url("../../assets/img/contract/ic_weixuanzhong.svg") #F9F9F9 no-repeat bottom;
    /*transition: all 0.6s;*/
  }
  .swiper-slide.active .singleTemplate{
    border: 0.5px solid #f95714;
    background:url("../../assets/img/contract/ic_xuanzhong.svg") #F9F9F9 no-repeat bottom;
  }
  .singleTemplate:hover{
    border: 0.5px solid #f95714;
    background:url("../../assets/img/contract/ic_xuanzhong.svg") #F9F9F9 no-repeat bottom;
    /*transform: scale(1.1);*/
  }
  .singleTemplate:hover .lookContract,.swiper-slide.active .singleTemplate .lookContract{
    opacity:1;
  }
  .singleTemplate:hover .title   .swiper-slide.active .singleTemplate .title{
    color: #f95714;
  }
  .singleTemplate .title{
    font-size: 14px;
    color: #394A66;
    letter-spacing: 0;
    text-align: center;
    margin: 0 38px;
  }
  .lookContract:hover{
    cursor: pointer;
    background: url(../../assets/img/contract/ic_chakanhetong.svg)  #E5E5E5 no-repeat 7px 7px;
    color: #f95714;

  }
  .lookContract{
    position: absolute;
    bottom: 0;
    left:0.5px;
    width: 158px;
    height: 25px;
    line-height: 25px;
    text-indent: 25px;
    font-size: 12px;
    color: #748093;
    letter-spacing: -0.33px;
    opacity: 0;
    background: url(../../assets/img/contract/ic_chakanhetong2.svg) #E5E5E5 no-repeat 7px 7px;
  }
  .lookContract img{
    vertical-align: middle;
    margin-left: 7px;
  }
  .modelInfo{
    font-size: 14px;
    color: #7A8699;
    letter-spacing: 0;
    line-height: 24px;
  }
  .modelInfo p{
    font-size: 16px;
    color: #394A66;
    letter-spacing: 0;
    margin:30px 0 8px;
  }
  .swiper-button-prev, .swiper-container-rtl .swiper-button-next,.swiper-button-next, .swiper-container-rtl .swiper-button-prev{
    width:18px;
    height: 18px;
    background: #F95714;
    border-radius:50%;
    text-align: center;
    line-height: 18px;
    color: white;

  }
  .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled{
    background: #97A2B3;
    opacity: 1;
  }
  .signError img{
    vertical-align: middle;
    margin: -3px 2px 0 0;
  }
  /*.swiper-button-prev{
    position: absolute;
    content: "\E600";
  }
  .swiper-button-next{
    position: absolute;
    content: "\E604"";
  }*/
 /* .el-carousel__item{
    transform: translateX(0px) !important;
  }*/

</style>


