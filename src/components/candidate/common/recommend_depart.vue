<template>
  <!--推荐给用人部门-->
    <div class="recommend_depart">
      <!--推荐给用人部门-->
      <el-dialog title="推荐给用人部门" :visible="addVisible" custom-class="recommend" :before-close="hideModel">
        <el-row>
          <el-col :span="24">
            <div>
              <label>推荐到</label>
              <input type="text" placeholder="选择负责人">
              <div class="recommendDown">

              </div>
            </div>
            <div>
              <label>推荐理由</label>
              <textarea placeholder="请输入推荐理由（例如有名校经历等）"></textarea>
            </div>
            <div class="select_resume">
              <label>使用简历</label>
              <div>
                <span>原始简历</span>
                <span>标准简历</span>
              </div>
            </div>

          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
        <el-button @click="hideModel">保存</el-button>
      </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "recommend_depart",
        props:['addVisible']
    }
</script>

<style scoped>

</style>
