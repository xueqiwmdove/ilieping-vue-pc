<!-- 
    Author:周双
    日期：2018/11/27
-->
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
                    <span>员工列表</span>
                    <span class="sub-tit">员工档案
                        <i class="close-icon" @click="closeCurPage"></i>
                    </span>
                </p>
                <ul class="nav-tabs nav" id="uploadTabs">
            
                </ul>

            </div>
        </div>

   </div>
</template>

<script>
    import http from '@/http/http'
    import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
    import pageheader from '@/components/common/pageheader';
    import pageaside from '@/components/common/pageaside';

    export default {
        name: '',
        components: {
            pageheader,
            pageaside
        },
        data() {
            return {

            };
        },
        methods: {
            closeCurPage(){
                this.$router.push('/indexList');
            }            
        },
        mounted() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import 'staff.css';
</style>
