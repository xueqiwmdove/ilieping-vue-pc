<!-- 
    Author:周双
    日期：2018/11/27
-->
<template>
    <el-dialog :visible="visableModal" width="540px" center :before-close="hideModel">
        <img src="../../../assets/img/staff/insertsuccess.png" class="warn-img" alt="警告图片">
        <p class="notice">企业认证提交成功<br/>审核结果将在一个工作日内通知您</p>
    </el-dialog>
</template>
<script>
    export default {
        props:['visableModal'],
        data() {
            return {
                centerDialogVisible: false
            };
        },
        methods:{
            hideModel(){
                this.$emit('hideModal');
            },
        }
    };
</script>
<style scoped>
    .el-dialog__header{
        border-bottom: 0 !important;
    }
    .notice{
        font-family: MicrosoftYaHei;
        font-size: 20px;
        color: #394A66;
        letter-spacing: 0;
        text-align: center;
        line-height: 30px;
        margin-bottom: 27px;
        padding-left: 8.2%;
        padding-right: 8.2%;
    }
    .warn-img{
        display: block;
        width: 60px;
        height: 60px;
        margin: -20px auto 20px;
    }
</style>