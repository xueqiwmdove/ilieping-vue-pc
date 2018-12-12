<!-- 
    Author:周双
    日期：2018/11/27
-->
<template>
	<div class="notice_div">
    <el-dialog :visible.sync="visableModal" width="540px" center :before-close="hideModel">
        <img src="../../../assets/img/staff/warning.png" class="warn-img" alt="警告图片">
        <p class="del-notice">删除后将清空该员工所有数据，您将无法查看该员工的所有历史信息。您确定要删除吗？</p>
        <span slot="footer" class="dialog-footer">
					<el-button type="default" @click="hideModel">取消</el-button>
          <el-button type="primary" @click="delEmployee()" style="background: #F95714;">确 定</el-button>
        </span>
    </el-dialog>
	</div>
</template>
<script>
    import http from '@/http/http'
    import api from '@/api/api.js';
    import {headers} from '@/assets/js/common/lp.js'
    export default {
        props:['visableModal'],
        data() {
            return {
                centerDialogVisible: false
            };
        },
        methods:{
            hideModel(){
                this.$emit('hideModal','del');
            },
            delEmployee(){
              let that = this;
                var employeeId = this.$route.query.id;
                this.$http({
                            url:`${api.employeeDel}/${employeeId}`,
                            method:'DELETE',
                            headers:headers('application/json;charset=utf-8'),
                        }).then(function (res) {

                            let resData = res.data;
                            if(resData.code == 10000){
                                that.$message(resData.msg);
                                that.hideModel();
                                this.$router.push('/indexList');
                            }

                        }).catch(function (error) {
                            that.$message.error(error);
                        });                
            }
        }
    };
</script>
<style scoped>

		
</style>
