<template>
    <div class="mainCon el-col-24">
  		<!--顶部导航-->
  	    <pageheader class="pageheader"></pageheader>
  		<!--侧边栏-->
  		<!--<div class="aside">-->
  			<pageaside></pageaside>
  		<!--</div>-->
  		<!--右侧内容栏-->
        <div class="right-content pull-right">
            <div class="content"><!--主体内容-->
            
                <p class="headline">
                    <span>企业经办人</span>
                </p>

                <p class="warn-info">
                    <img src="../../assets/img/reg/info.svg" >
                    <span class="notice-txt">{{warnMsg}}</span>
                </p>
                <form class="certificate-content" enctype="multipart/form-data" id="form">
                    <div class="form-group">
                        <label>真实姓名</label>
                        <input type="text" autocomplete="off" placeholder="请输入经办人的真实姓名">
                    </div>
                    <div class="form-group">
                        <label>身份证号</label>
                        <input type="text" autocomplete="off" placeholder="请输入经办人的身份证号码" maxlength="18">
                    </div>
                    <div class="form-group">
                        <label>手机号码</label>
                        <input type="text" autocomplete="off"  placeholder="请输入经办人的手机号码" maxlength="11">
                    </div>


                    <div class="form-group">
                        <input type="button" value="提交" class="submit click_acive" @click="submit" :disabled="disableType">
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>
<script>
    import pageheader from '@/components/common/pageheader';
    import pageaside from '@/components/common/pageaside';

    import http from '@/http/http'
    import api from '@/api/api.js';
    import {headers} from '@/assets/js/common/lp.js'

    export default {
        components: {
            pageheader,
            pageaside,
        },
        data(){
            return {
                disableType:false,
                warnMsg:'添加经办人后才能发起签约，经办人资料审通通过后不可修改',
            };
        },
        methods:{
            submit(){

            }
        }
    }
</script>

<style scoped>
    .warn-info{
        padding-left: 20px;
        margin-bottom: 20px;
        margin-top: 30px;
    }
    .notice-txt{
        font-size: 14px;
        color: #97A2B3;
        vertical-align: text-top;
        padding-left: 2px;
    }
    .submit{
        margin-top: 20% !important;
    }
</style>

