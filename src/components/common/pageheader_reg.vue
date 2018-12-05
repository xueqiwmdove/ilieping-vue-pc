<template>
  <div>
   <!--顶部导航-->
	<nav>
	    <div class="pull-left logo">
	        <span @click="click_logo">
	            <img src="../../assets/images/reg/logo.png" alt="aiLiePing">
	        </span>
	    </div>
	    
	</nav>
  </div>
</template>

<script>
export default {
  name: 'pageheader_reg',
   data() {
      return {
        
      };
    },
    methods: {
      click_logo() {//跳转官网
//      window.location.href="http://192.168.1.46:8080/ALiePing/tpl/newWitesite/index.html"
        this.$router.push('/');
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pull-left {
	float: left !important;
}
.pull-right {
	float: right !important;
	height: 48px;
	line-height: 48px;
}

</style>
