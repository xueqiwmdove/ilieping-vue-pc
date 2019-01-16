<template>
  <div :class="isCollapse?'aside_collapsed':'aside'">
   <!--侧边栏-->
<!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group> -->
	<div class="tools" @click.prevent="collapse">
		<i class="el-icon-menu"></i>
	</div>
<el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="icon_select"></i>
      <span slot="title">猎评查询</span>
    </template>
      <el-menu-item index="1-1">离职评价查询</el-menu-item>
      <el-menu-item index="1-2">失信行为查询</el-menu-item>
  </el-submenu>
	<el-submenu index="2">
		<template slot="title">
			<i class="icon_exposure"></i>
			<span slot="title">猎评曝光</span>
		</template>
			<el-menu-item index="2-1">离职评价上传</el-menu-item>
			<el-menu-item index="2-2">失信行为上传</el-menu-item>
			<el-menu-item index="2-3">上传记录</el-menu-item>
	</el-submenu>
	<el-submenu index="3">
		<template slot="title">
			<i class="icon_staff"></i>
			<span slot="title">员工管理</span>
		</template>
			<el-menu-item index="3-1">员工列表</el-menu-item>
			<el-menu-item index="3-2">人事异动</el-menu-item>
			<el-menu-item index="3-3">合同管理</el-menu-item>
	</el-submenu>
	<el-submenu index="4">
		<template slot="title">
			<i class="icon_recruit"></i>
			<span slot="title">招聘管理</span>
		</template>
			<el-menu-item index="4-1">面试日程</el-menu-item>
			<el-menu-item index="4-2">岗位管理</el-menu-item>
			<el-menu-item index="4-3">候选人管理</el-menu-item>
			<el-menu-item index="4-4">人才库</el-menu-item>
	</el-submenu>
	<el-submenu index="5">
		<template slot="title">
			<i class="icon_template"></i>
			<span slot="title">模版配置</span>
		</template>
			<el-menu-item index="5-1">面试模板</el-menu-item>
			<el-menu-item index="5-2">合同模版</el-menu-item>
	</el-submenu>
</el-menu>
</aside>
  </div>
</template>

<script>
  export default {
   data() {
      return {
        isCollapse: false
      };
    },
    methods: {
			//折叠导航栏
			collapse:function(){
				this.isCollapse=!this.isCollapse;
			},
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
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
</style>
