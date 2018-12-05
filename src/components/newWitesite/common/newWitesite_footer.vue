<template>
  <div>
    <!--底部-->
    <footer>
        <div class="footer-content">
            <img src="../../newWitesite/img/shouye_dibulan.svg"  alt="alieping" class="logo-bottom" />
            <div>
              <p class="special">产品功能</p>
              <p><router-link to="/leaveAssessment">离职评价</router-link></p>
              <p class="cursor"><router-link to="/brokenQuery">失信查询</router-link></p>
              <p class="cursor"><router-link to="/wasAsked">背调征询</router-link></p>
              <p class="cursor"><router-link to="/ablityAssessment">职场能力评估</router-link></p>
            </div>
            <div class="footer-middle">
                <p class="special">联系我们</p>
                <p>联系电话：021-62713358</p>
                <p>服务邮箱：ailieping@lphr.com</p>
                <p>公司地址：上海市静安区西康路166号11楼</p>
            </div>
            <div>
                <p class="special special2">关于爱猎评</p>
                <p @click="click_index" class="cursor">关于我们</p>
                <p @click="click_reg" class="cursor">立即注册</p>
                <p @click="click_login" class="cursor">立即登录</p>
            </div>
        </div>
        <div class="copyRight">
            <p>未经爱猎评同意，不得转载本网站之所有企业及个人信息| 爱猎评版权所有© 2018-2028 lieping</p>
            <p class="cursor" @click="goto">沪ICP备18036895号</p>
        </div>
    </footer>
  </div>
</template>

<script>
 export default {
    name: "newWitesite_footer",

    data () {
      return{

      }
    },
    methods:{
      click_index(){
        let that=this;
        that.$router.push('/contact');
      },
      click_reg(){
        let that=this;
        that.$router.push('/reg');
      },
      click_login(){
        let that=this;
        that.$router.push('/login');
      },
      goto(){
        window.open("http://www.miitbeian.gov.cn");

      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("../../../assets/css/static/init.css");
	@import url("../css/index.css");
.footer-content{
  height: 189px;
}
footer{
  background: #394A66 !important;
}
.cursor{
  cursor: pointer;
}
  footer .footer-content div .special2{
    width: 71px;
  }
a{
	display: inline-block !important;
}
</style>
