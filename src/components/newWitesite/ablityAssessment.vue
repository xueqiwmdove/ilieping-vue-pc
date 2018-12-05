<template>
  <div>
	<newWitesiteHeader></newWitesiteHeader>
		<!--主体-->
		<div class="main">
		    <div class="banner ablityContent">
		    </div>
		    <div class="waiting">
		        <img src="../../components/newWitesite/img/ic_default_page.png" alt="waiting">
		        <p>功能正在开发中，敬请期待～</p>
		    </div>
		</div>
    <newWitesiteFooter></newWitesiteFooter>
  </div>
</template>

<script>
  import newWitesiteHeader from '@/components/newWitesite/common/newWitesite_header';
  import newWitesiteFooter from '@/components/newWitesite/common/newWitesite_footer';
  export default {
  name: 'ablityAssessment',
  components: {
	  newWitesiteHeader,
	  newWitesiteFooter
	},
  data () {
    return{
    }
    }
  }
</script>

<style scoped>
  @import url("../../assets/css/static/init.css");
  @import url("../../components/newWitesite/css/index.css");
</style>
