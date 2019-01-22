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
  				<!--主体内容-->
          <p class="headline">
              <a>录入新员工</a>
          </p>
          <div class="twoMethod">
             <!--多维度评价-->
            <div class="multipleMethod method">
                <img src="../../assets/img/staff/newfloder.png" class="head-photo" alt="头像图片">
                <span>新建员工档案</span>
                <div class="insertemployee" @click="insertNewEmployee">
                  <img src="../../assets/img/staff/insert.png"  alt="头像图片">
                  在线添加员工
                </div>
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

export default {
  name: 'account',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
      };
    },
    methods: {
      insertNewEmployee(){
        this.$router.push('/insertNewEmployee/0');
      },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .main .right-content .content{
 	border: none;
 }
 .allianceBox .rules{
	display: block;
}
.span_right{
	float: right;
  color: #2064F5;
  cursor: pointer;
}
.error_div_img{
    float: left;
    display: inline-block;
    margin: -1.3px 0px;
}
.twoMethod .multipleMethod{
  border: 0;
}
.method .insertemployee{
  float: right;
  width: 180px;
  height: 40px;
  border: 1px solid #e5e5e5;
  margin: 24px 15px 0 0;
  line-height: 40px;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #394A66;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 0;
}
.insertemployee img{
  padding: 11px 0 11px 26px !important;
  float: left;
}
</style>
