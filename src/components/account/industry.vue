<template>
  <div>
  	<div class="mainCon el-col-24">
  		<!--顶部导航-->
  	<pageheader class="pageheader"></pageheader>
  		<!--侧边栏-->
  		<!--<div class="aside">-->
  			<pageaside></pageaside>
  		<!--</div>-->
  		<!--右侧内容栏-->
  		<div class="right-content pull-right">
  			<div class="content">
  				<!--主体内容-->

		<p class="headline">
		    <!--<router-link to="/company">企业资料</router-link>-->
		    <span><i>企业资料</i> /所属行业</span>
		</p>
		<div class="company-content">
		    <div class="form-group">
		        <label>行业</label>
	          <el-select v-model="value" placeholder="请选择所属行业" size="small">
					    <el-option v-for="(item,key) in options" :label="item.label" :value="item.value" :key="key"></el-option>
					  </el-select>
		    </div>
		    <div class="form-group">
		    	 <el-button class="button submit click_acive" :class="click_opacity" :disabled="click_dis" @click="updataAddress">提交</el-button>
		    </div>
		</div>


  			</div>
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
  import breadcrumb from '@/components/common/breadcrumb'
  import {mapState,mapActions} from 'vuex'
export default {
  name: 'account',
	components: {
	  pageheader,
	  pageaside,
    breadcrumb
	},
   data() {
      return {
				 options: [{
          value: '计算机/互联网/通信/电子',
          label: '计算机/互联网/通信/电子'
        }, {
          value: '贸易消费/制造/营运',
          label: '贸易消费/制造/营运'
        }, {
          value: '制药/医疗制药/医疗',
          label: '制药/医疗制药/医疗'
        }, {
          value: '广告/媒体',
          label: '广告/媒体'
        }, {
          value: '房地产/建筑',
          label: '房地产/建筑'
        }, {
          value: '专业服务/教育/培训',
          label: '专业服务/教育/培训'
        },{
          value: '能源/原材料能源/原材料',
          label: '能源/原材料能源/原材料'
        },{
          value: '政府/非盈利机构/其他',
          label: '政府/非盈利机构/其他'
        },{
          value: '金融业/证劵',
          label: '金融业/证劵'
        }
        ],
        value: ''
      }
    },
    computed:{
    	click_dis:function(){
        if (this.value != "" || this.isLoading){
          return false
        }
        else {
          return true
        }
      },
      click_opacity: function(){ // 使用按钮样式
      if (this.value != "" && !this.isLoading ) {
          return {
            click_opacity: false
          }
        }
        else {
          return {
            click_opacity: true
          }
        }
      },
    },
    methods: {

    	updataAddress(){
    		let that=this;
	      that.$http({
	  			method:"post",
	  			url:api.company_industry,
	  			headers:headers('application/json;charset=utf-8'),
	  			data:{
            phone:window.localStorage.getItem("phone"),
            industry:that.value
	  			},
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code==10000 && res.data!=""){
						that.$message({
						  message: '恭喜你，修改成功',
						  type: 'success'
						});
						setTimeout(function(){ that.$router.push('company'); }, 2000);
	  			}else{
	  				that.$message.error(res.message || res.data.message);
	  			}
		    });
    	}

    },
	 mounted(){

	 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .main .right-content .content{
 	border: none;
 }
 .allianceBox .rules{
	display: block;
}
.span_right{
	float: right;
  color: #2064F5;
  cursor: pointer;
}
.company-content{
	margin: 20px 0 20px 0
}
.el-select-dropdown__item.selected {
    color: #f95714;
    font-weight: 400;
}
.el-select .el-input.is-focus .el-input__inner {
    border-color: #FC8E00 !important;
}
.el-select .el-input__inner:focus {
    border-color: #FC8E00 !important;
}
</style>
