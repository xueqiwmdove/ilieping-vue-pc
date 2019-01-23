<template>
  <div>
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
  				<!--主体内容-->
    <!--撤销离职流程   :before-close="handleClose"-->
      <el-dialog title="撤销离职流程" :visible.sync="Revoke_model" class="Revoke_model" custom-class="Revoke_model">
        <div class="folder_div">
				  <el-form ref="form" :model="Revokeform" label-width="80px">
					  <el-form-item label="撤销原因">
					    <el-input type="textarea" v-model="Revokeform.desc" placeholder="请输入撤销原因" rows="3" autofocus="true" maxlength="100" resize="none" @input="descInput"></el-input>
					  </el-form-item>
				  </el-form>
				  <div class="font_count">{{wordCount}}/100字</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm_Revoke_btn" class="confirm">确 定</el-button>
          <el-button @click="Revoke_model = false" class="cancel">取 消</el-button>
        </span>
      </el-dialog>
    <!--撤销离职流程 end-->
    <!--人事流程详情   :before-close="handleClose"-->
      <el-dialog title="人事流程详情" :visible.sync="details_model" class="details_model" custom-class="details_model">
        <div class="folder_div">
				  <div class="details_div">
				  	<div class="details_title">流程号</div>
				  	<div class="detail_con">{{hrdetails.processNum}}</div>
				  </div>
				  <div class="details_div">
				  	<div class="details_title">员工</div>
				  	<div class="detail_con">{{hrdetails.employeeName}}</div>
				  </div>
				  <div class="details_div">
				  	<div class="details_title">流程</div>
				  	<div class="detail_con" v-html="hrdetails.processRecord"></div>
				  </div>
				  <div class="details_div">
				  	<div class="details_title">状态</div>
				  	<div class="detail_con">
	      			 <span v-if="hrdetails.status===0">已撤销</span>
	      			 <span v-if="hrdetails.status===1">已生效</span>
	      			 <span v-if="hrdetails.status===2">即将生效</span>
				  	</div>
				  </div>
				  <div class="details_div">
				  	<div class="details_title">备注</div>
				  	<div class="detail_con">{{hrdetails.remark}}</div>
				  </div>
				  <div class="details_div">
				  	<div class="details_title">生效日期</div>
				  	<div class="detail_con">{{hrdetails.effectiveDate}}</div>
				  </div>
				  <div class="details_div">
				  	<div class="details_title">创建时间</div>
				  	<div class="detail_con">{{hrdetails.createDate}}</div>
				  </div>
				  <div class="details_div">
				  	<div class="details_title">附件</div>
				  	<div class="detail_con">
				  		<div v-for="(item,index) of annexInfoList" :key="index" class="exp_div">
								<div class="exp_title">{{item.file_name}}</div>
								<div class="exp" @click="expDoc(hrdetails.id,item.id,item.file_name)">下载</div>
							</div>
				  	</div>
				  </div>
        </div>
      </el-dialog>
    <!--人事流程详情 end-->
        <div class="border_none">
          <!--主体内容-->
          <p class="headline">
            <span><i>员工管理</i> /人事异动</span>
          </p>
         </div>
  			 <div class="conHr">
<!--  			 	 <div class="div_Tips">
  			 	 	 <div class="tips_title">温馨提示：</div>
  			 	 	 <div class="tips_con">
							<p>１、”即将生效“状态下的流程，只有到了预计生效日期之后才可以确认，如需提前确认请修改生效日期；</p>
							<p>２、在流程”即将生效“期间，如该员工离职，则改员工的所有即将生效流程将自动被取消。</p>
						 </div>
  			 	 </div> -->
  			 	 <div class="txt_div">
						<el-row class="searchBox">
						  <el-col :span="5">
						  	<div class="grid-content bg-purple-dark">
								  <div class="select_div">
								  	<div class="select_title">状态</div>
								    <el-select class="classSelect" v-model="select_state" placeholder="请选择员工类型" @change="changeSelectedstate">
								      <el-option label="全部" value=""></el-option>
								      <el-option label="已生效" value="1"></el-option>
								      <el-option label="即将生效" value="2"></el-option>
								      <el-option label="已撤销" value="0"></el-option>
								    </el-select>
								  </div>
						  	</div>
						  </el-col>
						  <el-col :span="5">
						  	<div class="grid-content bg-purple-dark">
								  <div class="select_div">
								  	<div class="select_title">流程</div>
								    <el-select v-model="select_process" placeholder="请选择员工类型" @change="changeSelectedprocess">
								      <el-option label="全部" value=""></el-option>
								      <el-option label="转正" value="1"></el-option>
								      <el-option label="人事变更" value="2"></el-option>
								      <el-option label="离职" value="0"></el-option>
								    </el-select>
								  </div>
						  	</div>
						  </el-col>
						  <el-col :span="6">
						  	<div class="grid-content bg-purple-dark">
								  <div class="search_div">
										<div class="search_input_div" :span="6">
											<el-input class="search_manage" placeholder="姓名/手机号" v-model="searchContent" @keyup.enter.native="gethrList"></el-input>
											<div class="icon_btn el-icon-search" @click="gethrList"></div>
										</div>
<!-- 				            <el-col :span="12"><el-input class="search_input" placeholder="姓名/手机号" v-model="searchContent" @keyup.enter.native="gethrList"></el-input></el-col>
										<el-button class="primary_btn" icon="el-icon-search" @click="gethrList">搜索</el-button> -->
								  </div>
						  	</div>
						  </el-col>
						</el-row>
  			 	 </div>
			      <div>
		          <div class="div_table_infor">
							  <el-table :data="hrList" style="width: 100%">
							    <el-table-column fixed prop="processNum" label="流程号" header-align='center' align='center' width="200px"></el-table-column>
							    <el-table-column prop="employeeName" label="员工" header-align='center' align='center'></el-table-column>
							    <el-table-column prop="processTitle" label="流程" header-align='center' align='center'></el-table-column>
							    <el-table-column label="状态" header-align='center' align='center'>
								    <template slot-scope="scope">
								    	<span v-if="scope.row.status === 0">已撤销</span>
								      <span v-if="scope.row.status === 1">已生效</span>
								      <span v-if="scope.row.status === 2">即将生效</span>
								    </template>
							    </el-table-column>
							    <el-table-column prop="effectiveDate" label="生效日期" header-align='center' align='center'></el-table-column>
							    <el-table-column prop="createDate" label="创建日期" header-align='center' align='center'></el-table-column>
							    <el-table-column label="操作" width="160" header-align='center' align='center'>
							      <template slot-scope="scope">
											<el-dropdown placement='bottom'>
											 <span class="el-dropdown-link options">
													操作选项
											 </span>
												<el-dropdown-menu slot="dropdown" class="options_div">
													<el-dropdown-item @click.native="options_see(scope.row.id)">查看</el-dropdown-item>
													<el-dropdown-item v-if="scope.row.status===2" @click.native="options_revoke(scope.row.id)">撤销</el-dropdown-item>
												</el-dropdown-menu>
											</el-dropdown>
							      </template>
							    </el-table-column>
							  </el-table>
						  </div>
								<!-- 分页  -->
								<div class="bottom-pagination" v-if="totalCount > 5">
									<el-pagination @current-change="changePage" @size-change="changeSize" :current-page="pageIndex" :page-size="pageSize" :page-sizes="[5,10, 25, 50, 100]" layout="total, prev, pager, next, sizes, jumper" :total="totalCount">
									</el-pagination>
								</div>
						  </div>
			      </div>
  			 </div>

  			</div>
  		</div>
  	</div>

  </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js'
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';

export default {
  name: 'personnelTransaction',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
       select_state:'',
       select_process:'',
       hrList:[],
	     totalCount:0,
			 pageIndex: 1,
			 pageSize: 5,
       seen:false,
       current:0,
       Revoke_model:false,//撤销离职流程弹出层
	    Revokeform: {
	      desc: ''
	    },
			wordCount:0,
			hrListId:'',
			details_model:false,//人事流程详情
			hrdetails:[],
			annexInfoList:[],
			searchContent:'',
      };
    },
    methods: {
    	expDoc(employeeId,annexId,fileName){
      let that=this;
  		if(employeeId==''){
  			that.$message.error('合同id不能为空');
  			return false;
  		}else{
	        const loading = this.$loading({
	          lock: true,
	          text: 'Loading',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.7)'
	        });
       that.$http({
	  			method:"get",
	  			url:api.hr_exp+employeeId+'/'+annexId,
	  			headers:headers('application/x-download'),
	  			responseType: 'blob',
  			}).then(function(res){
  				loading.close();
	          let url = window.URL.createObjectURL(new Blob([res.data]));  // new Blob([data])用来创建URL的file对象或者blob对象
					　　let link = document.createElement('a');
					　　link.style.display = 'none';
					　　link.href = url;
             link.download= fileName;
					　　document.body.appendChild(link);
					　　link.click();
  			});
  		}
    	},
    	changeSelectedstate(value){//状态
    		console.log(value);
    		this.select_state=value;
    		this.pageIndex=1;
    	},
    	changeSelectedprocess(value){//流程
    		console.log(value);
    		this.select_process=value;
    		this.pageIndex=1;
    	},
			descInput(){//统计textarea 输入字数
				this.wordCount=this.Revokeform.desc.length;
			},
    	confirm_Revoke_btn(){//提交撤销流程
    		let that=this;
    		if(that.Revokeform.desc==""){
    			that.$message.error("请输入撤销原因");
    			return false;
    		}else{
	        that.$http({
		  			method:"post",
		  			url:api.hr_revoke,
		  			headers:headers('application/json;charset=utf-8'),
		  			data:{
					    "id":that.hrListId,
					    "revokeCause":that.Revokeform.desc
		  			}
		  		}).then(function(res){
		  			if(res.data.code==10000){
	            that.Revoke_model=false;
	            that.$message({
			          message: '恭喜你，提交成功',
			          type: 'success'
			        });
			        that.gethrList();
		  			}else{
		  				that.$message.error(res.data.msg);
		  			}
			    });
    		}

    	},
    	options_see(id){//查看
    		let that=this;
    		that.details_model=true;
        that.$http({
	  			method:"get",
	  			url:api.hr_details+id,
	  			headers:headers('application/json;charset=utf-8'),
	  		}).then(function(res){
	  			if(res.data.code==10000 || res.data.data==null){
             that.hrdetails=res.data.data;
             that.annexInfoList=res.data.data.annexInfoList;
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
    	},
    	options_revoke(id){//撤销
    		let that=this;
    		that.Revoke_model=true;
    		that.hrListId=id;
    		that.Revokeform.desc="";
    	},
    	enter(index){
        this.seen = true;
        this.current = index;
      },
      leave(){
        this.seen = false;
        this.current = null;
      },
      changePage(newPage) {
      	let that=this;
				if(that.pageIndex === newPage) {
					return;
				}
				that.pageIndex = newPage;
				that.gethrList();
			},
			changeSize(newSize) {
				let that=this;
				that.pageSize = newSize;
				that.gethrList();
			},
			gethrList(){
				let that=this;
	      let currentPage=that.pageIndex || 1;
	      let pageSize=that.pageSize || 5;
        that.$http({
	  			method:"post",
	  			url:api.hr_list,
	  			headers:headers('application/json;charset=utf-8'),
	  			data:{
				    "currPage":currentPage,
				    "pageSize":pageSize,
				    'searchContent':that.searchContent,
				    'type':that.select_process,
				    'status':that.select_state
	  			}
	  		}).then(function(res){
	  			if(res.data.code==10000){
             that.hrList=res.data.data;
             that.totalCount=res.data.count;
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
			},
    },
    mounted(){
    	let that=this;
			if(that.$route.query.employeePhone){
				that.searchContent=that.$route.query.employeePhone;
			}else{
				that.searchContent='';
			}
    	that.gethrList();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main .right-content .content .headline_title{
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #21324E;
    letter-spacing: 0;
    border-bottom: 1px solid #E5E5E5;
}
 .headline_title .a{
	display: inline-block;
	height: 100%;
	text-align: left;
	line-height: 50px;
	color: #21324E;
	border: none;
  padding: 0 20px;
  display: inline-block;
  float: left;
  cursor: pointer;
}
.con{
 margin: 20px;
}
.div_Tips{
	height: 88px;
	border: 1px solid #F95714;
	background: rgba(255,176,0,0.02);
	padding: 10px;
	color:#F95714;
}
.div_Tips div{
	line-height: 21px;
}
.div_Tips .tips_title{

}
.div_Tips .tips_con{
	margin-left: 20px;
}
.div_table_infor{width: 100%; height: auto;margin-top: 30px;}
.operation{
	/* display: inline-block; */

}
.options{
	color: #2569F6;
	cursor: pointer;
	position: relative;
}
.options_div{
	position: absolute;
	z-index: 10;
	display: block;
	width: 80px;
	text-align: center;
	font-size: 14px;
	color: #394A66;
	background: #FFFFFF;
	box-shadow: 0 0 4px 0 rgba(0,0,0,0.20);
	margin: 0;
	padding: 0;
	border-radius:0;
	border: none;
}
.popper__arrow{display: none;}
.options_div ul li{
	width: 100%;
	height: 34px;
	line-height: 34px;
	cursor: pointer;
}
.el-dropdown-menu__item:active,.el-dropdown-menu__item:hover{
 color: #F95714;
 background: #F8FAFC;
}
.div_table_infor ul li:first-child{
	border-top:none !important;
	border-bottom: 1px solid #EDEDED;
}
.div_table_infor ul li:first-child div{
	background: #F8FAFC;color: #394A66;
}
.div_table_infor ul li div{
	color: #748093;
}
.nav_ul li{
	background: #FAFBFC;
	border: 1px solid #E5E5E5;
	border-radius: 2px;
	width:110px;
	height: 34px;
	line-height: 34px;
	text-align: left;
}
.txt_div{
	height: 40px;
  margin: 20px 0;
}
.txt_div .select_div{
	line-height: 40px;
	font-size: 14px;
	color: #394A66;
}
.txt_div .select_div .select_title{
	float: left;
	display: inline-block;
	padding: 0 10px;
}
.search_div{
	line-height: 40px;
	font-size: 14px;
	color: #394A66;
}
.search_div .search_title{
	float: left;
	display: inline-block;
	padding: 0 10px;
}
.primary_btn{
	color: #fff;
	background-color: #F95714;
	border-color: #F95714;
	margin-left: 20px;
}
.font_count{
  text-align: right;
  font-size: 14px;
  color: #97A2B3;
}
/* 人事流程详情 */
.details_div{
	width: 100%;
	display: block;
	clear: both;
}
.details_div .details_title{
	width: 100px;
	display: inline-block;
	float: left;
	text-align: right;
	color: #748093;
	line-height: 34px;
	width: 20%;
}
.details_div .detail_con{
  display: inline-block;
	float: left;
	color: #394A66;
	line-height: 34px;
	margin-left: 15px;
	width: 75%;
}
.bottom-pagination{
	text-align: right;
	margin: 20px 0;
}
.details_div .detail_con .exp_div{height: 40px; line-height: 40px;}
.details_div .detail_con .exp_div .exp_title{
	min-width: 100px;
	max-width: 200px;
	display: inline-block;
	float: left;
  white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.details_div .detail_con .exp_div .exp{
color: #1087F4;
display: inline-block;
float: left;
margin-left: 20px;
cursor: pointer;
}
</style>
