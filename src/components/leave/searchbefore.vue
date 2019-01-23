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
   <!-- <p class="headline">
      <a class="leaveSearchTitle">离职评价查询</a>
    </p>-->
    <div class="searchBeforePage">
      <div class="search">
        <h4 class="text-center">爱猎评已累计 <i>39426</i> 份离职评价报告</h4>
        <div class="leaveSearchBefore ">
          <p class="text-center">
            <span>今日新增报告：<i>155</i> 份</span>
            <span class="middleLine"></span>
            <span>今日成功匹配：<i>5074 </i>人</span>
          </p>
         <searchBox></searchBox>
        </div>
      </div>
      <!--离职查询-->
      <div class="foot">
        <!--轮播-->
        <div class="carouselBox">
          <swiper :options="swiperOption"  ref="mySwiper">
            <!-- 这部分放你要渲染的那些内容 -->
            <swiper-slide>
              <img src="../../assets/img/dismission/lianmeng.png" alt="">
            </swiper-slide>
            <swiper-slide>
              <img src="../../assets/img/dismission/zhuce.png" alt="">
            </swiper-slide>
            <!-- 这是轮播的小圆点 -->
            <!--<div class="swiper-pagination" slot="pagination"></div>-->
          </swiper>
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
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import searchBox from '@/components/common/searchBox';

  export default {
  name: 'searchbefore',
  components: {
	  pageheader,
	  pageaside,
    swiper,
    swiperSlide,
    searchBox
  },
  data () {
    return{
      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        direction : 'horizontal',
        autoplay: true,
        loop:true,
        onSlideChangeEnd: swiper => {
          //这个位置放swiper的回调方法
          this.page = swiper.realIndex+1;
          this.index = swiper.realIndex;
        }
      }
    }

  },
  //定义这个sweiper对象
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted () {
    //这边就可以使用swiper这个对象去使用swiper官网中的那些方法
    this.swiper.slideTo(0, 0, false);

  },

  method:{

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-center{ text-align: center;}
.carouselBox img{
  width: 100%;
}
.right-content .content{
  box-shadow:none;
  background:none;
}
.pulldown{
  display: block;
}
</style>
