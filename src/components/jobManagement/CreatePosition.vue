<template>  
  <div >
   <div class="main">
          <!--顶部导航-->
        <pageheader class="pageheader"></pageheader>
          <!--侧边栏-->
          <div class="aside">
            <pageaside></pageaside>
          </div>
          <!--右侧内容栏-->
        <div class="right-content pull-right">
            <div class="content">
                <p class="headline">
                    <span>添加招聘职位</span>
                </p>
                <el-row>
                  <el-col :span='5' >
                    <div class="asidePosition">
                    </div>  
                  </el-col> 
                </el-row>
            </div>
        </div>      
    </div>        
  </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import store from '@/store/store';
  import {format} from '@/assets/js/date.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';

export default {
  name: 'jobmanageindex',
	components: {
	pageheader,
    pageaside,
	},
   data() {
      return {
       
      };
    },
    watch:{
       
      },
    methods: {

    },
    mounted() {
      this.gethrList();
    },
    created() {

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
   .asidePosition {
      min-width: 340px;
      max-height:948px;  
   } 
</style>



