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
          <!--搜索前页面-->
          <!--<p class="headline">-->
            <!--<a class="exposureSearchTitle">失信曝光查询</a>-->
          <!--</p>-->
          <div class="searchBeforePage">
            <div class="search">
              <h4 class="text-center danger">爱猎评已累计 <i>39426</i> 位存在职场风险人员</h4>
              <div class="leaveSearchBefore ">
                <p class="text-center">
                  <span>今日新增报告：<i>155</i> 份</span>
                  <span class="middleLine"></span>
                  <span>今日成功匹配：<i>5074 </i>人</span>
                </p>
                <searchBox></searchBox>
              </div>
            </div>
            <!--失信查询-->
            <div class="foot" >
              <!--查询动态-->
              <div class="dynamicQuery">
                <p class="headLine"><img src="../../assets/img/dismission/ic_broadcast.svg" ><span>查询动态</span></p>
                <div class="dynamicQueryContent">
                  <div class="scrollingBox" >
                    <div class="scrolling" id="moocBox">
                      <vue-seamless-scroll :data="listData" :class-option="classOption" class="warp">
                        <ul class="item">
                          <li v-for="item in scrollList">
                            <div>
                              <p class="pull-left"><span class="title" v-text="item.company"></span><i >查询了</i>手机尾号为<em  v-text="item.phone"></em>的报告</p>
                              <p ><span class="title" v-text="item.company"></span><i>查询了</i>姓名为<em  v-text="item.name" ></em>的报告</p>
                            </div>
                          </li>
                        </ul>
                      </vue-seamless-scroll>
                      <!--<slide-follow></slide-follow>-->

                    </div>
                    <div id ="moocBot"> </div>
                  </div>

                </div>
              </div>
              <!--最新曝光-->
              <div class="theNewestExposure">
                <p class="headLine"><img src="../../assets/img/dismission/ic_exposure.svg" ><span>最新曝光</span></p>
                <div class="exposureContentParent" style="padding: 30px;">
                  <div class="exposureContent">
                    <swiper :options="swiperOption">
                      <swiper-slide v-for="(item,index) in swiperList" :key="index">
                        <div class="singleExposure">
                          <img src="../../assets/img/dismission/women_19_32.svg" width="120" height="120" alt="icon" class="female" v-if="item.sex==0 &&  item.age >=19 && item.age <= 32"><!-- 女19-32  sex_img==0-->
                          <img src="../../assets/img/dismission/men_19_32.svg" width="120" height="120" alt="icon" class="female" v-if="item.sex==1 &&  item.age >= 19 &&  item.age <= 32"><!-- 男19-32 -->
                          <img src="../../assets/img/dismission/men_0_18.svg" width="120" height="120" alt="icon" class="female" v-if="item.sex==1 &&  item.age <= 18"><!-- 男18岁以下 -->
                          <img src="../../assets/img/dismission/men_33_45.svg" width="120" height="120" alt="icon" class="female" v-if="item.sex==1 &&  item.age >= 33 &&  item.age <= 45"><!-- 男33-45 -->
                          <img src="../../assets/img/dismission/men_46_60.svg" width="120" height="120" alt="icon" class="female" v-if="item.sex==1 &&  item.age >= 46 &&  item.age <= 60"><!-- 男46-60 -->
                          <img src="../../assets/img/dismission/men_60+.svg" width="120" height="120" alt="icon" class="female" v-if="item.sex==1 &&  item.age>= 60"><!-- 男60+ -->
                          <img src="../../assets/img/dismission/women_0_18.svg" width="120" height="120" alt="icon" class="female" v-if="item.sex==0 &&  item.age <= 18"><!-- 女18岁以下 -->
                          <img src="../../assets/img/dismission/women_33_45.svg" width="120" height="120" alt="icon" class="female" v-if="item.sex==0 &&  item.age >= 33 &&  item.age <= 45"><!-- 女33-45 -->
                          <img src="../../assets/img/dismission/women_46_60.svg" width="120" height="120" alt="icon" class="female" v-if="item.sex==0 &&  item.age >= 46 &&  item.age <= 60"><!-- 女46-60 -->
                          <img src="../../assets/img/dismission/women_60＋.svg" width="120" height="120" alt="icon" class="female" v-if="item.sex==0 &&  item.age >= 60"><!-- 女60+ -->
                          <p>{{item.company}}</p>
                          <p><i>上传了</i>{{item.name}}{{item.phone}}</p>
                          <div class="describe clamp-this-module" title="">
                            失信行为：{{item.remark}}
                          </div>
                          <p class="address"><img src="../../assets/img/dismission/ic_location.svg" alt="">{{item.city}}</p>
                        </div>
                      </swiper-slide>
                     <!-- <swiper-slide>
                        <div class="singleExposure">
                          <img src="../../assets/img/dismission/men_0_18.svg" class="people" alt="sex" width="80px" height="80px">
                          <p>上海**文化传播有限公司</p>
                          <p><i>上传了</i>高**（138****3137）</p>
                          <div class="describe clamp-this-module" title="">
                            失信行为：外部交往－未经批准，像竞争对手或提供商
                            提供有关公司的任何商业秘密，对公司造成了重大经济
                            损失。
                          </div>
                          <p class="address"><img src="../../assets/img/dismission/ic_location.svg" alt="">广东省／佛山市</p>
                        </div>
                      </swiper-slide>
                      <swiper-slide>
                        <div class="singleExposure">
                          <img src="../../assets/img/dismission/men_0_18.svg" class="people" alt="sex" width="80px" height="80px">
                          <p>上海**文化传播有限公司</p>
                          <p><i>上传了</i>高**（138****3137）</p>
                          <div class="describe clamp-this-module" title="">
                            失信行为：外部交往－未经批准，像竞争对手或提供商
                            提供有关公司的任何商业秘密，对公司造成了重大经济
                            损失。
                          </div>
                          <p class="address"><img src="../../assets/img/dismission/ic_location.svg" alt="">广东省／佛山市</p>
                        </div>
                      </swiper-slide>
                      <swiper-slide>
                        <div class="singleExposure">
                          <img src="../../assets/img/dismission/men_0_18.svg" class="people" alt="sex" width="80px" height="80px">
                          <p>上海**文化传播有限公司</p>
                          <p><i>上传了</i>高**（138****3137）</p>
                          <div class="describe clamp-this-module" title="">
                            失信行为：外部交往－未经批准，像竞争对手或提供商
                            提供有关公司的任何商业秘密，对公司造成了重大经济
                            损失。
                          </div>
                          <p class="address"><img src="../../assets/img/dismission/ic_location.svg" alt="">广东省／佛山市</p>
                        </div>
                      </swiper-slide>-->

                    </swiper>

                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
  		</div>
  	</div>

  </div>
</template>

<script>
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
  import searchBox from '@/components/common/searchBox';
  import vueSeamlessScroll from 'vue-seamless-scroll';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import diyShow from '@/assets/js/common/diy.show.js'

  export default {
  name: 'searchbefore2',
  components: {
	  pageheader,
	  pageaside,
    searchBox,
    vueSeamlessScroll,//无缝滚动
    swiper,
    swiperSlide
	},
  data () {
    return{
      //无缝滚动
      listData: [{
        'title': '上海**文化传播有限公司',
        'name':'张三',
        'tel': '0231'
      }, {
        'title': '上海**文化传播有限公司',
        'name':'张三',
        'tel': '2222'
      }, {
        'title': '上海**文化传播有限公司',
        'name':'张三',
        'tel': '3333'
      }, {
        'title': '上海**文化传播有限公司',
        'name':'张三',
        'tel': '5555'
      }, {
        'title': '上海**文化传播有限公司',
        'name':'张三',
        'tel': '6666'
      }],
      //失信曝光轮播
      swiperOption: {//swiper3
      // autoplay: 3000,
      speed: 1000,
      slidesPerView:4,
        spaceBetween:20,
        loop:true,
      autoplay: {//TODO 自动播放的功能 important
        disableOnInteraction: false,
      }
    },
    swiperList:diyShow.randomList(),
    scrollList:diyShow.randomMassage(20),
    }

  },
  computed: {
    classOption: function () {
      return {
        step: 0.2,
        limitMoveNum:5
      }
    }



  },
  mounted(){
   // this.swiperOption.startAutoplay();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media screen and (max-width:1240px){
    .swiper-slide .singleExposure{
      width:100% !important;
      /*209*/
    }
  }
  @media screen and (min-width:1440px){
    .swiper-slide .singleExposure{
      width: 100% !important;
      /*360*/
    }
  }


.text-center{ text-align: center;}
.right-content .content{
  box-shadow:none;
  background:none;
}
#moocBox{
  margin-top: 0;
}
.warp {
  height: 260px;
  width: 100%;
  overflow: hidden;
  text-align: center;
}
.warp ul {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0 auto;
}
.warp li {
  width: 100%;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  /*display: flex;*/
  /*justify-content: space-between;*/
  font-size: 15px;
}
.wrap li div{
}
.wrap li div p{
  display: inline-block;
  font-size: 14px;
  color: #394A66;
}
.wrap li div p span{
  margin: 0;
}
.pull-left{
 margin:0 87px 0 22px;
}

</style>
