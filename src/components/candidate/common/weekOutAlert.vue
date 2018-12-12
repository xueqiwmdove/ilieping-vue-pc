<template>
    <div>
      <el-dialog title="淘汰" :visible.sync="visableModal"  custom-class="weekOutAlert">
        <el-row>
          <el-col :span="24">
            <span>备注</span>
            <textarea placeholder="备注"></textarea>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'weekOutAlert',
        props:['visableModal'],
        components: {},
        data() {
            return {}
        },
        watch: {},
        methods: {},
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
