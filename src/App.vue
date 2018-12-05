<template>
  <div id="app">
		<router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>
<style lang="less">

.pull-right{
	float:right;
}
.pull-left{
	float: left;
}
.click_acive{
    vertical-align: middle;
    margin-left: 13px;
    font-size: 14px;
    background: #F95714;
    border-radius: 4px;
    border: none;
    color: #fff;
    padding: 10px 20px;
}
.click_opacity{
    opacity: 0.6;
}
.pageheader{
width: 100%;
position: fixed;
z-index: 100;
top: 0;
}
.main .right-content{
	z-index:0;
  /*height: 100vh;*/
	/*padding:60px 30px 30px 30px !important;*/
}
.main .right-content .content{
  /*height: auto;*/
 padding-bottom: 20px;
}
</style>
