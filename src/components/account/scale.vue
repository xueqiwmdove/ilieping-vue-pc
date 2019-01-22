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
		    <span ><i>企业资料</i> /公司规模</span>
		</p>
		<div class="company-content">
		    <div class="form-group">
		        <label>企业规模</label>
	          <el-select v-model="value" placeholder="请选择企业规模" size="small">
					    <el-option v-for="(item,key) in options" :label="item.label" :value="item.value" :key="key"></el-option>
					  </el-select>
		    </div>
		    <div class="form-group">
		        <input type="button" class="button submit click_acive" :class="click_opacity" :disabled="click_dis" value="提交" @click="updataAddress">
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

export default {
  name: 'account',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
				 options: [{
          value: '少于50人',
          label: '少于50人'
        }, {
          value: '50-100人',
          label: '50-100人'
        }, {
          value: '150-500人',
          label: '150-500人'
        }, {
          value: '500-1000人',
          label: '500-1000人'
        }, {
          value: '1000-5000人',
          label: '1000-5000人'
        }, {
          value: '5000-10000人',
          label: '5000-10000人'
        },{
          value: '10000人以上',
          label: '10000人以上'
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
	  			url:api.scale,
	  			headers:headers('application/json;charset=utf-8'),
	  			data:{
            phone:window.localStorage.getItem("phone"),
            scale:that.value
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
	  				that.$message.error(res.message || res.data.msg);
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
	margin: 20px 0 0
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
