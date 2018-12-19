<template>
    <div class="dis"> 
      <el-dialog title="淘汰" :visible="visableModal"  custom-class="weekOutAlert  quitdia" class="quitdia">
             <el-form :model="cerateList"  ref="cerateList" id="re_styles">
                  <el-form-item label="淘汰原因">
                        <el-select v-model="cerateList.type" placeholder="请选择淘汰经验">
                              <el-option label="胜任力" value="0"></el-option>
                              <el-option label="没有回应" value="1"></el-option>
                        </el-select>
                  </el-form-item> 
                          <el-form-item label="具体淘汰原因（选填）" >
                               <textarea placeholder="请输入原因"></textarea>
                          </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                      <el-button  type="primary"  style="height:36px;" >保存</el-button>
              </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'weekOutAlert',
        props:['visableModal'],
        components: {},
        data() {
            return {
             cerateList:{
              type:'',
             },
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
<style>

</style>


