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
    <!--撤销离职流程   :before-close="handleClose"-->
      <el-dialog title="添加管理员" :visible.sync="Revoke_model" class="Revoke_model" custom-class="Revoke_model">
        <div class="folder_div">
				  <el-form ref="form" :model="form" label-width="80px">
				  <el-form-item label="姓名">
          <el-input v-model="form.name" readonly placeholder="请选择员工" @click.native="ldClick" class="el-icon-arrow-down"></el-input>
          <input type="hidden" v-model="form.employeeId" />
           <div v-if="ldVisabled" class="creat-tree create-trees " >
            <el-scrollbar style="height:100%" >   
                <div style="height:100%">
                <div class="search">
                    <el-input  class="input_search" v-model="names" placeholder="输入你想搜索的内容" >
                        <i @click="searchName()" slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                    </el-input>
                </div>
                <ul>
                    <li @click="selectItem(item)" v-for="(item,index) in employeeList" :key='index'>
                        <span class="name_f">{{item.employeeName.substr(0, 1)}}</span> 
                        <span style="float:left;">
                            <p>{{item.employeeName}}</p> 
                            <p>{{item.deptName}}-{{item.position}}</p>    
                        </span>
                    </li>
                </ul>
                </div>  
            </el-scrollbar> 
            </div>
				  </el-form-item>
				  <el-form-item label="手机号码">
				    <el-input v-model="form.phone" readonly placeholder="请先选择需要添加的管理员"></el-input>
				  </el-form-item>
				  </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm_Revoke_btn" class="confirm">确 认</el-button>
        </span>
      </el-dialog>
    <!--撤销离职流程 end-->
        <div class="border_none">
          <!--主体内容-->
          <p class="headline">
            <span><i>管理权限设置</i></span>
          </p>
         </div>
  			 <div class="conHr">
  			 	 <div class="txt_div">
						<el-row class="searchdiv">
              <el-button class="primary_btn" @click="Revoke_model = true">添加管理员</el-button>
						</el-row>
  			 	 </div>
			      <div>
		          <div class="div_table_infor">
							  <el-table :data="adminList" style="width: 100%">
							    <el-table-column fixed prop="name" label="姓名" header-align='center' align='center' width="200px"></el-table-column>
							    <el-table-column prop="phone" label="手机号" header-align='center' align='center'></el-table-column>
							    <el-table-column label="管理模块" header-align='center' align='center'>
								    <template slot-scope="scope">
								    	<span class="buleSpan">全部</span>
								    </template>
							    </el-table-column>
							    <el-table-column label="管理部门" header-align='center' align='center'>
								    <template slot-scope="scope">
								    	<span class="buleSpan">全部</span>
								    </template>
							    </el-table-column>
							    <el-table-column label="操作" width="160" header-align='center' align='center'>
							      <template slot-scope="scope">
											<el-dropdown placement='bottom'>
											 <span class="el-dropdown-link options">
													操作选项
											 </span>
												<el-dropdown-menu slot="dropdown" class="options_div">
													<el-dropdown-item @click.native="click_del(scope.row.id)">删除</el-dropdown-item>
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
  name: 'admin',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
       adminList:[],
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
			form: {
          name: '',
          phone: '',
			   employeeId:''
			},
      employeeList:[],
      ldVisabled:false,//选择人员下拉框
      names:'',//搜索人员名称
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
    	confirm_Revoke_btn(){//确认添加管理员
    		let that=this;
    		if(that.form.name==""){
    			that.$message.error("请选择员工姓名");
    			return false;
    		}else if(that.form.phone==""){
    			that.$message.error("请输入手机号码");
    			return false;
    		}else{
	        that.$http({
		  			method:"post",
		  			url:api.adminadd+that.form.employeeId,
		  			headers:headers('application/json;charset=utf-8'),
		  		}).then(function(res){
		  			if(res.data.code==10000){
	            that.Revoke_model=false;
	            that.$message({
			          message: '恭喜你，提交成功',
			          type: 'success'
			        });
			        that.getadminList();
		  			}else{
		  				that.$message.error(res.data.msg);
		  			}
			    });
    		}

    	},
    	     
      searchName() {//搜索
        this.getEmployeeList()
      }, 
    	selectItem(val) {
        this.ldVisabled=false;
        this.form.name = val.employeeName;
        this.form.employeeId = val.id;
        this.form.phone = val.employeePhone;
      },
    	ldClick() {
        this.getEmployeeList();
        this.ldVisabled = !this.ldVisabled
      },     
      getEmployeeList() {//获取面试官，负责人列表  
        let that = this
        let currPage=that.pageIndex || 1;
        let pageSize=10;
        let employeeName = that.names || ''
        this.$http({
          method:"get",
          url:api.adminaddList,
          headers:headers('application/json;charset=utf-8'),
          data:{
          "currPage":currPage,
          "pageSize":pageSize,
          'employeeName':employeeName
        },
          cache:false
        }).then(function(res){
          if(res.data.code==10000 || res.data.data==null){
            that.employeeList = res.data.data
          }else{
          that.$message.error(res.data.msg);
          }
        });
      }, 
    	click_del(id){//删除
    		let that=this;
        that.$http({
	  			method:"post",
	  			url:api.admindel+id,
	  			headers:headers(),
	  		}).then(function(res){
	  			if(res.data.code==10000 || res.data.data==null){
             that.$message({
				      message: '恭喜你，操作成功',
				      type: 'success'
				    });
				    that.getadminList();
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
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
			getadminList(){
				let that=this;
	      let currentPage=that.pageIndex || 1;
	      let pageSize=that.pageSize || 5;
        that.$http({
	  			method:"post",
	  			url:api.adminList+"/"+currentPage+"/"+pageSize,
	  			headers:headers('application/json;charset=utf-8'),
	  		}).then(function(res){
	  			if(res.data.code==10000){
             that.adminList=res.data.data;
             that.totalCount=res.data.count;
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
			},
    },
    mounted(){
    	let that=this;
    	that.getadminList();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchdiv{
	text-align: right;
}
.buleSpan{
  color: #66ADFF;
	border: 1px solid #66ADFF;
	padding: 0 5px;
	border-radius: 4px;
}
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
.create-trees  ul li .name_f{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color:#66ADFF ;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    float: left;
    margin-right: 10px;
    margin-left:20px;
}
.create-trees  ul {
    padding-top:55px;
}
.create-trees  ul li  p {
    height: 30px;
    text-align: left;
    line-height: 30px;
}
.create-trees ul li {
    height: 60px;
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
    line-height: 50px;
}
.creat-tree {
    width:300px;
    height:280px;
    border: 1px solid #E5E5E5;
    text-align:center;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 44;
    position: absolute;
    background-color: #fff;
}
.manage_se  ul li .name_f{
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color:#66ADFF ;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: #fff;
    float: left;
    margin-right: 10px;
    margin-left:30px;
}
.manage_se ul li  p {
    height: 30px;
    text-align: left;
    line-height: 30px;
}
.manage_se ul li {
    height: 60px;
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
    line-height: 50px;
} 
.create_dialog .el-icon-arrow-down:before {
    content: "\E603";
    position: absolute;
    top: 15px;
    left: 253px;
    color: #AAADB5;
    cursor: pointer;
}
.create_dialog .create-trees {
    left: 22%;
    width: 280px; 
}
.create-trees .search {
  float: right;
  width: 400px;
  height: 40px;
  margin-top: 30px;
  position: relative;
  left: -70px;

}
.create-trees .search .input_search {
  width: 260px;
  position: absolute;
  top:-21px;
  /* width: 260px; */
  
}
.create-trees .search .input_search .se_icon {
  position: absolute;
  right:-244px;
  height: 30px;
  top:8px;
  font-size: 18px;
  font-weight: 700;
  border-left: 1px solid #E5E5E5;
  color: #F95714;
}
.create-trees .search .el-icon-search:before {
    content: "\E619";
    margin-left: 5px;
}
</style>
