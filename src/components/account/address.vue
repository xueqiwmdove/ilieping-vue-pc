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

		<p class="headline">
		    <router-link to="/company">企业资料</router-link>
		    <a class="active">企业地址</a>
		</p>
		<div class="company-content" ref="content">
		    <!-- <div class="form-group">
						  <label style="color:#748093;font-size:16px;" for="address">详细地址</label>
		        <input type="text" placeholder="请输入详细地址" v-model="address" id="address" maxlength="50">
		    </div> -->
					<div class="adress_sty">
						<ul>
							<li v-for="(item,index) in addressList " :key="index" style="margin-bottom:10px">
								<span style="display:inline-block;width:27%;margin:5px;0">{{item.city?item.city:''}}{{ item.address?item.address:''}}</span>
								<span @click="update(item)" class="btn_stys">编辑</span>
								<span @click="deletes(item.id)"  class="btn_stys">删除</span>
							</li>
						</ul> 
		    	</div>
		    <div class="form-group" >
						<div v-if="flag" class="wei">
							  <div style="margin:20px 0">
									<label style="color:#748093;font-size:16px;" for="address">所在地区</label>
									<input type="text" class="input_sty" placeholder="请选择企业所在省/市/区" readonly="true" v-model="msg"  @click="getdata" maxlength="50" ><br>
							  </div>
								<el-form :inline="true" class="demo-form-inline">
								<div  class="box" v-if="flag9" v-clickoutside="handleClose">
										  <el-select  v-model="sheng"  @change="choseProvince" placeholder="请选择省">
													<el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id">
													</el-option>
												</el-select>
											  <el-select  v-model="shi"	@change="choseCity"	placeholder="请选择市">
													<el-option v-for="item in shi1"	:key="item.id"	:label="item.value"	:value="item.id">
													</el-option>
												</el-select>
												<el-select 	v-model="qu"	@change="choseBlock"	placeholder="请选择区">
													<el-option	v-for="item in qu1"	:key="item.id"	:label="item.value"	:value="item.id">
													</el-option>
												</el-select>
								</div>
								<div> 
									<label style="color:#748093;font-size:16px;" for="address">详细地址</label>
									<input type="text"  class="input_sty"  placeholder="请输入详细地址" v-model="address" id="address" maxlength="50">
								</div>
								</el-form>	
						</div>
						<span v-else class="add_sty" @click="addAdress"><i style="font-size:18px">＋</i> 添加企业地址</span>
		    </div>

				<div style="padding-bottom: 20px;margin-left:40%;margin-top:50px;" v-if="hiden">
						<input type="button" class="button submit click_acive" style="width:100px"  value="取消" @click="cancel">
						<input type="button" class="button submit click_acive" style="width:100px"  :class="click_opacity" :disabled="click_dis" value="保存" @click="updataAddress">
		    </div>
		    <div style="padding-bottom: 20px;margin-left:40%;margin-top:50px;" v-if="add">
		        <input type="button" class="button submit click_acive" :class="click_opacity" :disabled="click_dis" value="提交" @click="saveAddress">
		    </div>
		</div>
  			</div>
  		</div>
  	</div>

  </div>
</template>

<script>
	import http from '@/http/http'
	import axios from 'axios'
  import api from '@/api/api.js';
	import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader';
	import pageaside from '@/components/common/pageaside';

// duanyanhong
// 2018.12.2
// 自定义控制省市区下拉框点击空白处隐藏
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};
export default {
  name: 'account',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
				address:'',//详细地址
				hiden:false,//编辑地址时提交按钮
				add:false,//添加企业地址按钮
				flag:false,//添加地址输入框
				flag9:false,//省市区三级联动选择框
				addressId:'',//企业地址id
				addressList:[],//企业地址集合
				mapJson:'static/json/map.json',//省市区三级联动数据库
				province:'',
				sheng: '',
				sheng1:'',
				shi: '',
				shi1: [],
				shi2:'',
				qu: '',
				qu1: [],
				city:'',
				block:'',
				msg:''
      };
    },
    computed:{
    	click_dis:function(){
        if (this.address != "" || this.isLoading){
          return false
        }
        else {
          return true
        }
      },
      click_opacity: function(){ // 使用按钮样式
				if (this.address != "" && !this.isLoading ) {
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
		directives: {clickoutside},
   methods: {
		 handleClose(e) {
        this.flag9 = false;
    },
	 //点击获取省市区框		
			getdata() {
        this.flag9 =!this.flag9
			},
			leave() {
				this.flag9=false
			},		
	//添加地址显示输入框		
			addAdress() {
				this.flag = true
				this.hiden =false
				this.add =true
				this.msg =''
				this.address=''
			},
  //取消按钮			
			cancel() {
				this.flag=false
				this.flag9=false
				this.sheng=''
				this.shi=''
				this.qu=''
				this.add = false
				this.hiden = false
			},
	//获取地址集合		
			getaddress() {
			  let that = this
          this.$http({
            method:"get",
            url:api.getAddress,
            headers:headers('application/json;charset=utf-8'),
            cache:false
          }).then(function(res){
            if(res.data.code==10000 || res.data.data==null){
                that.addressList=res.data.data
              console.log(res.data.data,'<=======counts')
            }else{
            that.$message.error(res.data.msg);
            }
          });		
			},
			//编辑地址
			update(val) {
				this.flag = true
				this.add =false
				this.hiden =true
				this.addressId =val.id
				let that=this;
				this.sheng= ''
				this.shi=''
				this.qu=''
				// this.province =''
				this.shi1=''
				this.qu1=''
	      that.$http({
	  			method:"get",
	  			url:api.getUpdatesAddress+'/'+that.addressId,
	  			headers:headers('application/json;charset=utf-8'),
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code==10000 && res.data!=""){
							let itemAddress = res.data.data
							that.msg = itemAddress.city
							that.address =itemAddress.address
	  			}else{
	  				that.$message.error(res.message || res.data.message);
	  			}
		    });
			},
		//删除地址
			deletes(id) {
			  let that = this
			   	that.$confirm('该信息删除后，将无法恢复，确定删除吗?', '提示', {
					confirmButtonText: '删除',
					cancelButtonText: '取消',
					center: true,
					customClass: 'member-confirm-class danger',
				}).then(() => {
          that.$http({
            method:"DELETE",
            url:api.deleteAddress+'/'+id,
            headers:headers('application/json;charset=utf-8'),
            cache:false
          }).then(function(res){
            if(res.data.code==10000 || res.data.data==null){
							 that.$message.success(res.data.msg)
								that.getaddress()
								that.flag9=false
            }else{
            that.$message.error(res.data.msg);
            }
					});		
				}).catch(() => {});
			},
   //添加企业地址
    	saveAddress(){
    		let that=this;
	      that.$http({
	  			method:"post",
	  			url:api.saveAddress,
	  			headers:headers('application/json;charset=utf-8'),
	  			data:{
						address:that.address,
						city:that.msg.replace(/[&\|\/\*^%$#@\-]/g,"")
	  			},
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code==10000 && res.data!=""){
						that.$message({
						  message: '恭喜你，添加成功',
						  type: 'success'
						});
							that.flag =false
							that.flag9= false
							that.add = false
							that.sheng=''
							that.shi=''
							that.qu=''
						  that.getaddress()
	  			}else{
	  				that.$message.error(res.message || res.data.message);
	  			}
		    });
			},
	//编辑保存地址
	    updataAddress() {
				let that=this;
	      that.$http({
	  			method:"put",
	  			url:api.updatesAddress,
	  			headers:headers('application/json;charset=utf-8'),
	  			data:{
					  address:that.address,
						city:that.msg.replace(/[&\|\/\*^%$#@\-]/g,""),
						id:that.addressId
	  			},
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code==10000 && res.data!=""){
						that.$message({
						  message: '恭喜你，修改成功',
						  type: 'success'
						});
						that.flag =false
						that.flag9= false
						that.hiden=false
						that.add=false
						that.address = ""
						that.sheng=''
						that.shi=''
						that.qu=''
						that.getaddress()
	  			}else{
	  				that.$message.error(res.message || res.data.message);
	  			}
		    });
			}, 
			// 加载china地点数据，三级
      getCityData:function(){
        var that = this
        axios.get(this.mapJson).then(function(response){
          if (response.status==200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选省
      choseProvince:function(e) {
				this.sheng1 =''
				this.shi2=''
				console.log(e,'province')
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children
            this.shi = this.province[index2].children[0].value
            this.qu1 =this.province[index2].children[0].children
            this.qu = this.province[index2].children[0].children[0].value
						this.E = this.qu1[0].id
					  this.sheng1 =this.province[index2].value
				    this.msg = this.sheng1+'/'+ this.shi+'/'+this.qu
          }
				}
		
      },
      // 选市
      choseCity:function(e) {
				console.log(e,'City')
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
						console.log(this.city[index3].value)
            this.qu1 = this.city[index3].children
            this.qu = this.city[index3].children[0].value
						this.E = this.qu1[0].id
					 this.shi2 = 	 this.city[index3].value
				   this.msg = this.sheng1+'/'+ this.shi2+'/'+this.qu
          }
        }
      },
      // 选区
      choseBlock:function(e) {
				console.log(this.shi,'shi')
				this.E=e;
				for (var index4 in this.block) {
          if (e === this.block[index4].id) {
						console.log(this.block[index4].value)
						this.E = this.block[0].id
						if(this.shi2=='') {
							console.log(11111)
							 this.msg = this.sheng1+'/'+ this.shi+'/'+this.block[index4].value
						}else {
								console.log(222222222)
				      this.msg = this.sheng1+'/'+ this.shi2+'/'+this.block[index4].value
						}
          }
				}
				this.flag9 =false
      },

    },
	 mounted(){
		 this.getCityData()
		 this.getaddress()
	 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
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
	margin: 20px 0 0;
	padding-bottom: 30px;
}
.adress_sty {
	width: 100%;
	/* height: 100px; */
	border-bottom: 1px solid #EEEEEE;
	margin-bottom: 30px;
}
.adress_sty ul li {
	font-family: MicrosoftYaHei;
font-size: 15px;
color: #394A66;
letter-spacing: 0;
}
.btn_stys {
	margin-left: 30px;
	font-family: MicrosoftYaHei;
	font-size: 15px;
	color: #2064F5;
	letter-spacing: 0;
	cursor: pointer;
}
.add_sty {
display: inline-block;	
background: #FAFBFC;
border: 1px solid #E5E5E5;
border-radius: 2px;
height: 36px;
width: 160px;
line-height: 34px;
text-align: center;
cursor: pointer;
font-size: 16px;
}
.wei {
	position: relative;
}
.box {
		position: absolute;
    min-height:304px;
    border: 1px solid #E5E5E5;
		position: absolute;
			background: #FAFBFC;
    z-index: 2;
    background-color: #fff;
		top: 34px;
		left: 83px;
		overflow: hidden;
}
.input_sty {
	width: 360px !important;
	background: #FAFBFC;
  border: 1px solid #E5E5E5 !important;  
}

</style>
<style >
  .company-content .form-group .box input[type=text] {
    width: 117px !important;
    height: 34px;
    text-indent: 12px;
		color: #394A66;
		border:none;
		padding:0;
		color:#394A66;
		font-family: MicrosoftYaHei;
}
.el-select-dropdown {
    position: relative;
    z-index: 1001;
    border: none;
    border-radius: 4px;
    background-color: #fff;
    -webkit-box-shadow: 0 0px 0px 0 rgba(0,0,0,.1);
    box-shadow: 0 0px 0px 0 rgba(0,0,0,.1);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
		margin: 5px 0;
		border-bottom:1px solid #eee;
}
.el-select .el-input.is-focus .el-input__inner {
    color: #F95714;
}

</style>

