<template>
    <div>
      <el-dialog title="备注" :visible.sync="remarkAlert"  custom-class="remarkAlert">
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
        name: '',
        components: {},
        data() {
            return {

            }
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
