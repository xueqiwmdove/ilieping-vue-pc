<template>
  <div>
   <!--侧边栏-->
<el-row class="tac">
  <el-col :span="24">
    <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
					<img src="../../assets/img/dismission/index_dimission.svg" alt="" class="click-before">
          <span>离职查询</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">离职评价查询</el-menu-item>
          <el-menu-item index="1-2">失信曝光查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
					<img src="../../assets/img/dismission/ic_upload.svg" alt="" class="click-before">
          <span>上传离职</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">上传离职评价</el-menu-item>
          <el-menu-item index="2-2">曝光失信人员</el-menu-item>
					<el-menu-item index="2-3">上传记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
					<img src="../../assets/img/dismission/ic_account_number.svg" alt="" class="click-before">
          <span>账号管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">账号安全</el-menu-item>
          <el-menu-item index="3-2">企业认证</el-menu-item>
					<el-menu-item index="3-3">企业资料</el-menu-item>
          <el-menu-item index="3-4">联盟会员</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
					<img src="../../assets/img/dismission/ic_personnel_process.svg" alt="" class="click-before">
          <span>人事异动</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">人事异动</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
					<img src="../../assets/img/staff/ic_yuangongguanli.svg" alt="" class="click-before">
          <span>员工管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">员工列表</el-menu-item>
          <el-menu-item index="5-2">录入新员工</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
					<img src="../../assets/img/entryManagement/ic_ruzhiguanli.svg" alt="" class="click-before">
          <span>入职管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="6-1">发起offer</el-menu-item>
          <el-menu-item index="6-2">offer管理</el-menu-item>
					<el-menu-item index="6-3">offer模板设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
					<img src="../../assets/img/contract/ic_hetong.svg" alt="" class="click-before">
          <span>劳务合同管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="7-1">发起签约</el-menu-item>
          <el-menu-item index="7-2">员工合同管理</el-menu-item>
					<el-menu-item index="7-3">合同模板</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</el-row>
  </div>
</template>

<script>
  export default {
    methods: {
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

</style>
