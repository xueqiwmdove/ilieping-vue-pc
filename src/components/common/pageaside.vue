<template>
  <div :class="isCollapse?'aside_collapsed':'aside'">
   <!--侧边栏-->
<el-menu :default-active="isactive" :unique-opened="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-menu-item index="0">
    <i class="icon iconfont icon-gongzuotaisvg" @click.prevent="collapse"></i>
    <span slot="title" @click="click_admin(0)">工作台</span>
  </el-menu-item>
  <el-submenu index="1">
    <template slot="title">
      <i class="icon iconfont icon-liepingchaxun"></i>
      <span slot="title">猎评查询</span>
    </template>
      <el-menu-item index="1-1" @click="click_searchbefore1(1-1)">离职评价查询</el-menu-item>
      <el-menu-item index="1-2" @click="click_searchbefore2(1-2)">失信行为查询</el-menu-item>
  </el-submenu>
	<el-submenu index="2">
		<template slot="title">
			<i class="icon iconfont icon-liepingpuguangsvg"></i>
			<span slot="title">猎评曝光</span>
		</template>
			<el-menu-item index="2-1" @click="click_twoUpload(2-1)">离职评价上传</el-menu-item>
			<el-menu-item index="2-2" @click="click_exposure(2-2)">失信行为上传</el-menu-item>
			<el-menu-item index="2-3" @click="click_myupload(2-3)">上传记录</el-menu-item>
	</el-submenu>
	<el-submenu index="3">
		<template slot="title">
			<i class="icon iconfont icon-yuangongguanli"></i>
			<span slot="title">员工管理</span>
		</template>
			<el-menu-item index="3-1" @click="click_list(3-1)">员工列表</el-menu-item>
			<el-menu-item index="3-2" @click="click_personnelTransaction(3-2)">人事异动</el-menu-item>
			<el-menu-item index="3-3" @click="click_contractManagement(3-3)">合同管理</el-menu-item>
	</el-submenu>
	<el-submenu index="4">
		<template slot="title">
			<i class="icon iconfont icon-zhaopinguanli"></i>
			<span slot="title">招聘管理</span>
		</template>
			<el-menu-item index="4-1" @click="click_interviewMmanagement(4-1)">面试日程</el-menu-item>
			<el-menu-item index="4-2" @click="click_potion(4-2)">岗位管理</el-menu-item>
			<el-menu-item index="4-3" @click="click_candidate(4-3)">候选人管理</el-menu-item>
			<el-menu-item index="4-4" @click="click_potion25(4-4)">人才库</el-menu-item>
	</el-submenu>
	<el-submenu index="5">
		<template slot="title">
			<i class="icon iconfont icon-mobanshezhi"></i>
			<span slot="title">模版配置</span>
		</template>
			<el-menu-item index="5-1" @click="click_potion26(5-1)">面试模板</el-menu-item>
			<el-menu-item index="5-2" @click="click_contractTemplate(5-2)">合同模版</el-menu-item>
	</el-submenu>
</el-menu>
</aside>
  </div>
</template>

<script>
  export default {
   data() {
      return {
        isCollapse: true,
        isactive:'0'
      };
    },
    methods: {
			//折叠导航栏
			collapse:function(){
				this.isCollapse=!this.isCollapse;
			},
			click_admin(a){
				this.isactive=a;
    		// this.$router.push('/admin');
        this.$router.push('/account_alliancevip');
			},
			click_searchbefore1(a){
				 this.isactive=a;
    		 this.$router.push('/searchbefore');
    	},
    	click_searchbefore2(a){
    		 this.isactive=a;
    		 this.$router.push('/searchbefore2');
    	},
    	click_twoUpload(a){
    		this.isactive=a;
    		this.$router.push('/twoUpload');
    	},
    	click_exposure(a){
    		this.isactive=a;
    		this.$router.push('/exposure/0');
    	},
    	click_myupload(a){
    		this.isactive=a;
    		this.$router.push('/myupload');
    	},
    	click_list(a){//员工列表
        this.isactive=a;
        this.$router.push('/indexList');
      },
      click_personnelTransaction(a){//人事流程
        this.isactive=a;
        this.$router.push('/personnelTransaction');
      },
      click_contractManagement(a){//合同管理
      	this.isactive=a;
        this.$router.push('/contractManagement');
      },
      click_interviewMmanagement(a){
        this.isactive=a;
        this.$router.push('/InterviewManagement');
      },
      click_potion(a){//职位管理
        this.isactive=a;
    		this.$router.push('/jobmanageindex');
      },
      click_candidate(a){//候选人管理
        this.isactive=a;
    		this.$router.push('/candidatindex');
      },
      click_potion25(a){//人才库
        this.isactive=a;
    		this.$router.push('/talentPool');
      },
      click_contractTemplate(a){//合同模板
      	this.isactive=a;
        this.$router.push('/contractTemplate');
      },
      click_potion26(a){//设置
        this.isactive=a;
    		this.$router.push('/option');
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted(){
    	let a = window.location.href;
      let b = a.indexOf("#");
      let loginUrl = a.substring(b+2);
      let that=this;
      if(loginUrl=='admin'){
				that.isactive="0";
			}else if(loginUrl=='searchbefore'){
				that.isactive="1-1";
			}else if(loginUrl=='searchbefore2'){
				that.isactive="1-2";
			}else if(loginUrl=='twoUpload'){
				that.isactive="2-1";
			}else if(loginUrl=='exposure'){
				that.isactive="2-2";
			}else if(loginUrl=='myupload'){
				that.isactive="2-3";
			}else if(loginUrl=='indexList'){
				that.isactive="3-1";
			}else if(loginUrl=='personnelTransaction'){
				that.isactive="3-2";
			}else if(loginUrl=='contractManagement'){
				that.isactive="3-3";
			}else if(loginUrl=='InterviewManagement'){
				that.isactive="4-1";
			}else if(loginUrl=='jobmanageindex'){
				that.isactive="4-2";
			}else if(loginUrl=='candidatindex'){
				that.isactive="4-3";
			}else if(loginUrl=='talentPool'){
				that.isactive="4-4";
			}else if(loginUrl=='option'){
				that.isactive="5-1";
			}else if(loginUrl=='contractTemplate'){
				that.isactive="5-2";
			}
    }
  }
</script>

<style scoped>
	@import url("../../assets/css/asideiconfont/demo.css");
	@import url("../../assets/css/asideiconfont/iconfont.css");
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
    min-height: 400px;
  }
	.icon_select{/* 猎评查询 icon */
		width: 22px;
		height: 20px;
		display: inline-block;
		background:url(../../assets/img/icon/ic_1.png) no-repeat;
		background-size: 100%;
		margin: 0 5px;
	}
	.icon_exposure{/* 猎评曝光 icon */
		width: 22px;
		height: 20px;
		display: inline-block;
		background:url(../../assets/img/icon/ic_2.png) no-repeat;
		background-size: 100%;
		margin: 0 5px;
	}
	.icon_staff{/* 员工管理 icon */
		width: 22px;
		height: 20px;
		display: inline-block;
		background:url(../../assets/img/icon/ic_3.png) no-repeat;
		background-size: 100%;
		margin: 0 5px;
	}
	.icon_recruit{/* 招聘管理 icon */
		width: 22px;
		height: 20px;
		display: inline-block;
		background:url(../../assets/img/icon/ic_4.png) no-repeat;
		background-size: 100%;
		margin: 0 5px;
	}
	.icon_template{/*  模版配置 icon */
		width: 22px;
		height: 20px;
		display: inline-block;
		background:url(../../assets/img/icon/ic_5.png) no-repeat;
		background-size: 100%;
		margin: 0 5px;
	}
	.icon_set{/*  工作台 icon */
		width: 22px;
		height: 20px;
		display: inline-block;
		background:url(../../assets/img/icon/ic_icon.png) no-repeat;
		background-size: 100%;
		margin: 0 5px;
	}
</style>
