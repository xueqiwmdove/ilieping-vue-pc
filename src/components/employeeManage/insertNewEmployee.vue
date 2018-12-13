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
                    <a>录入新员工</a>
                </p>
                <div class="sendOfferMain">
                    <div class="sendOfferSteps">
                        <div class="sendOffer-status">
                            <div class="sendOffer_one">
                                <div>
                                    <img src="../../assets/img/dismission/step1_a.svg" />
                                    <i class="step_a" ></i>
                                </div>
                                <span>基本信息</span>
                            </div>
                            <!--<i class="step_a" ></i>-->
                            <div class="sendOffer_two">
                                <div>
                                    <img src="../../assets/img/dismission/step2.svg" />
                                    <i class="step_a" ></i>
                                </div>
                                <span>薪资福利</span>
                            </div>
                            <!--<i class="step_a" ></i>-->
                            <div class="sendOffer_three">
                                <img src="../../assets/img/dismission/step3.svg" />
                                <span>添加成功</span>
                            </div>
                        </div>
                    </div>
                    <div class="personDataBox">
                        <el-dialog title="新增部门" :visible.sync="newDepartments"  class="newDepartAlert"
                         custom-class="newDepartAlert_Content">
                            <div class="inputBox">
                            <div class="input-group">
                                <label>部门名称 </label>
                                <input type="hidden" v-model="deptId">
                                <input type="text" class="department" v-model="newDepartment" placeholder="请输入部门名称" maxlength="32" >
                            </div>
                            <div class="inputBox">
                                <div class="input-group" v-clickOutSide="outterClose">
                                    <label>上级部门</label>
                                    <input type="text" placeholder="请选择部门名称" class="selectDepartment" v-model="parentDepartment" @click.stop="isShow2=true;companyStructure()" readonly="readonly">
                                  <div class="treePullDown" v-show="isShow2"   >
                                      <el-input
                                      placeholder="输入关键字进行过滤"
                                      v-model="filterText2" class="filterInput">
                                      </el-input>
                                      <el-tree
                                      class="filter-tree departmentTree"
                                      :data="data2"
                                      :props="defaultProps"
                                      :empty-text="emptyText"
                                      :filter-node-method="filterNode"
                                      :expand-on-click-node=false
                                      @node-click="getParent2"
                                      ref="tree2">
                                      </el-tree>
                                  </div>
                                </div>
                            </div>
                            </div>
                            <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="addDepartment" :disabled="disabled_newDepartment" :class="css_newDepartment">确 定</el-button> <!-- @blur="check_newDepartment" -->
                            </div>
                        </el-dialog>
              <!-- 新增部门弹窗 -->
                    <!--基本信息-->
                    <div class="personData basicInfo">
                        <p class="title">基本信息</p>
                        <div class="inputBox">
                            <div class="items">
                                <div class="input-group">
                                    <label>姓名<i>*</i></label>
                                    <input type="text" v-model.trim="employeeName" placeholder="请输入录用人姓名" maxlength="5">
                                </div>
                                <div class="input-group special">
                                    <label>手机号<i>*</i></label>
                                    <input type="text"  v-model="employeePhone"  placeholder="请输入手机号码" maxlength="11" @blur="checkPhone">
                                </div>
                                <div class="input-group departmentTreeBox">
                                <label>户口性质  </label>
                                <el-select v-model="accountNature" placeholder="请选择户口性质">
                                    <el-option
                                    v-for="item in accountNatureOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                </div>
                            </div>
                            <div class="items">
                                <div class="input-group">
                                    <label>身份证号<i>*</i></label>
                                    <input type="text"  v-model="employeeIdCard" placeholder="请输入身份证号码" maxlength="18" minlength="18" @blur="employeeIdCardPattern">
                                </div>
                                <div class="input-group special">
                                    <label class="position">个人邮箱<i></i></label>
                                    <input type="text" v-model="employeeEmail" placeholder="请输入个人邮箱" @blur="employeeEmailPattern">
                                </div>
                                <div class="input-group">
                                    <label class="position">最高学历<i></i></label>
                                    <el-select v-model="highestEducation" placeholder="请选择最高学历">
                                        <el-option
                                        v-for="item in highestEducationOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 岗位信息 -->
                    <div class="personData basicInfo">
                        <p class="title">岗位信息</p>
                        <div class="inputBox">
                            <div class="items">
                                <div class="input-group">
                                    <label>工作类型<i>*</i></label>
                                    <el-select v-model="workType" placeholder="请选择工作类型" @change="changeSelected(workType)">
                                        <el-option
                                        v-for="item in workTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="input-group departmentTreeBox" v-clickOutSide="outterClose" :class="workType==1||workType==2?'special_department':''">
                                  <label>任职部门<i>*</i></label>
                                  <input type="text"  v-model="department" readonly="readonly" class="department special" placeholder="请选择任职部门" @click.stop="isShow=true;companyStructure()" maxlength="0">
                                  <div class="treePullDown" v-show="isShow">
                                      <el-input
                                      placeholder="输入关键字进行过滤"
                                      v-model="filterText" class="filterInput el-icon-search">
                                      </el-input>
                                      <el-tree
                                      class="filter-tree departmentTree"
                                      :data="data2"
                                      node-key="id"
                                      :props="defaultProps"
                                      :empty-text="emptyText"
                                      default-expand-all
                                      :filter-node-method="filterNode"
                                      :expand-on-click-node=false
                                      ref="tree"
                                      @node-click="getParent">
                                      </el-tree>
                                    <div id="addDepartment">
                                      <img src="../../assets/img/dismission/new_add.png"  class="addDepartment" @click="newDepartments=true;parentDepartment=enterpriseName">
                                      添加新部门
                                    </div>
                                  </div>
                                </div>
                                <div class="input-group departmentTreeBox" v-show="workType==0">
                                    <label>试用期数<i>*</i> </label>
                                    <el-select v-model="probation" placeholder="请选择试用期数">
                                        <el-option
                                        v-for="item in probationOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="input-group special">
                                    <label>工作地点<i></i></label>
                                    <input type="text"  v-model="workAddress"  placeholder="请输入工作地点">
                                </div>
                                <div class="input-group departmentTreeBox">
                                    <label>企业邮箱 </label>
                                    <input type="text"  v-model="enterpriseEmail"  placeholder="请选输入企业邮箱" @blur="enterpriseEmailPattern" >
                                </div>
                            </div>
                            <div class="items">
                                <div class="input-group">
                                    <label>任职岗位<i>*</i></label>
                                    <input type="text"  v-model="position" placeholder="请输入任职岗位" maxlength="15">
                                </div>
                                <div class="input-group special">
                                    <label>入职时间<i>*</i></label>
                                        <el-date-picker
                                            v-model="entryTime"
                                            type="date"
                                            placeholder="请选择入职日期"
                                            value-format="yyyy-MM-dd"
                                            class="reportTime" >
                                        </el-date-picker>
                                <!-- required style="margin:0;" -->
                                </div>
                                <div class="input-group">
                                    <label class="position">工号<i></i></label>
                                    <input type="text" v-model="employeeNumber" placeholder="请输入工号" maxlength="15">
                                </div>
                                <div class="input-group special">
                                    <label class="position">直接上级<i></i></label>
                                    <input type="text" v-model="directlySuperior" placeholder="请输入上级名称">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nextButton">
                        <input type="button" class="sendOfferNext" :disabled="nextDisabled" :class="nextClass" value="下一步" @click="submit">
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
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
  import {checkMobile,compareDate,isNumber,isEmail} from '@/assets/js/common/verify.js'
  import {formatDate} from '@/assets/js/common/date_year.js'

export default {
  name: 'account',
	components: {
	  pageheader,
	  pageaside
	},
   data() {
      return {
          employeeName:'',
          employeePhone:'',
          employeeIdCard:'',
          employeeNumber:'',
          employeeEmail:'',
          enterpriseEmail:'',
          accountNature:'',
          workAddress:'',
          position:'',
          entryTime:'',
          directlySuperior:'',
          accountNatureOptions:[
          {
            value: '0',
            label: '农村'
          },{
            value: '1',
            label: '城市'
          }
        ],
        probation:'',
        probationOptions:[
            {
                value: '1',
                label: '１个月'
            },{
                value: '2',
                label: '２个月'
            },{
                value: '3',
                label: '３个月'
            },{
                value: '4',
                label: '４个月'
            },{
                value: '5',
                label: '５个月'
            },{
                value: '6',
                label: '６个月'
            },{
                value: '0',
                label: '无试用期'
            },
        ],
        highestEducation:'',//员工类型
        highestEducationOptions:[
          {
            value: '研究生（博士及以上）',
            label: '研究生（博士及以上）'
          }, {
            value: '研究生（MBA）',
            label: '研究生（MBA）'
          },{
            value: '研究生（硕士）',
            label: '研究生（硕士）'
          },{
            value: '本科',
            label: '本科'
          },{
            value: '大专',
            label: '大专'
          },{
            value: '高中（中专）及以下学历',
            label: '高中（中专）及以下学历'
          }
        ],
        workType:'',//员工类型
        workTypeOptions:[
          {
            value: '0',
            label: '全职'
          },{
            value: '1',
            label: '兼职'
          },{
            value: '2',
            label: '实习'
          }
        ],
        isShow:false,//默认隐藏
        newDepartments:false,//新增部门
        bonusNums:[
          {
            value:'',
          }
        ],
        newDepartment:'',//新增部门
        parentDepartment:'',//上级部门
        deptId:0,//部门ID
        isShow2:false,//默认隐藏
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        data2:[],
        filterText: '',
        filterText2:'',
        department:'',
        enterpriseName:localStorage.getItem("title"),
        emptyText:'暂无数据'
      };
    },
    directives : {
      //树形下拉点击其他地方收起
      clickOutSide:{
        bind:function(el,binding,vnode){
          function documentHandler(e){
            if(el.contains(e.target)){
              return false;
            }
            if(binding.expression){
              binding.value(e)
            }
          }
          el._vueClickOutside_ = documentHandler;
          document.addEventListener('click',documentHandler);
        },
        unbind:function(el,binding){
          document.removeEventListener('click',el._vueClickOutside_);
          delete el._vueClickOutside_;
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      filterText2(val) {
        this.$refs.tree2.filter(val);
      },
      employeePhone:function(){
          this.employeePhone=this.employeePhone.replace(/[^\d]/g,'');
      },
      employeeIdCard:function(){
      	this.employeeIdCard=this.employeeIdCard.replace(/[\W]/g,'');
      },
      employeeNumber:function(){
      	this.employeeNumber=this.employeeNumber.replace(/[^\d]/g,'');
      },
      enterpriseEmail:function(){
      	this.enterpriseEmail=this.enterpriseEmail.replace(/[\u4E00-\u9FA5]/g,'');
      },
      employeeEmail:function(){
      	this.employeeEmail=this.employeeEmail.replace(/[\u4E00-\u9FA5]/g,'');
      },
    //   check_newDepartment(){
    //     if(this.newDepartment == ''){
    //       this.$message.error("新增部门不能为空!");
    //     }
    //   },
    },
    methods: {
      changeSelected(workType){
        let that=this;
       // console.log(workType)
      },
      outterClose(){
        this.isShow=false;
        this.isShow2=false;
      },
      getParent(data) {
        let that=this;
        that.department=data.label;
        that.deptId=data.id;
        this.isShow=false;
      },
      employeeEmailPattern(){
        if(!this.employeeEmail.match(/^[a-z0-9]([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z0-9]{2,3}([\.][a-z0-9]{2})?$/i)){
          this.$message.error("请填写正确邮箱地址！");
        }
      },
      employeeIdCardPattern(){
        if(!this.employeeIdCard.match(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/)){
          this.$message.error("请填写正确身份证号！");
        }
      },
      enterpriseEmailPattern(){
        if(!this.enterpriseEmail.match(/^[a-z0-9]([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z0-9]{2,3}([\.][a-z0-9]{2})?$/i)){
          this.$message.error("请填写正确邮箱地址！");
        }
      },
       companyStructure(){
        let that=this;
        that.$http({
          url:api.searchCompanyStructure,
          method:'get',
          headers:headers()
        }).then((res)=>{

          console.log(res);
          if(res.data.code==10000){
            that.data2=res.data.data;

          }
        }).catch((res)=>{
          // that.$message.error("新增部门添加失败！")
        })
      },
      //新增部门点击赋值，选中
      getParent2(data) {
        let that=this;
        that.parentDepartment=data.label;
        that.parentDepartmentId=data.id;
        this.isShow2=false;
      },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        addDepartment(){
            let that=this;
            that.newDepartments = false;
            that.$http({
            url:api.addDepartment,
            method:'post',
            headers:headers(),
            data:{
                deptName:that.newDepartment,
                parentId:that.deptId
            }
            }).then((res)=>{
            // console.log(res);
            if(res.data.code=10000){
                that.$message.success("新增部门添加成功！")
              that.parentDepartment="";
                that.newDepartment="";
                that.deptId="";
            }
            }).catch((res)=>{
            // console.log(res)
            that.$message.error("新增部门添加失败！")
            })
        },

        //手机号校验
        checkPhone(){
            let that=this;
            if(that.employeePhone!="" && !checkMobile(that.employeePhone)){
            }else{
            that.$message.error("请输入正确的手机号！")

            }
        },
        submit(){
        let that=this;
        if(that.employeePhone==""){
      		that.$message.error('请填写手机号码');
      		return false;
      	}else if(!that.employeePhone.match(/^1[345678]\d{9}/)){
      		that.$message.error('请填写正确手机号码');
      		return false;
      	}else if(that.employeeIdCard==""){
              that.$message.error('请填写身份证号');
      		return false;
          }
        else{
          that.$http({
  			method:"post",
  			url:api.employInsert,
  			headers:headers("application/json;charset=utf-8"),
  			data:{
                    accountNature:that.accountNature,//户口性质
                    deptId:that.deptId,//部门ID
                    directlySuperior:that.directlySuperior,//直属上级
                    enterpriseEmail:that.enterpriseEmail,//企业分配员工的邮箱
                    employeeIdCard:that.employeeIdCard,//员工身份证号
                    employeeName:that.employeeName,//员工姓名
                    employeeNumber:that.employeeNumber,//员工工号
                    employeePhone:that.employeePhone,//员工手机号
                    entryTime:that.entryTime, //入职时间
                    highestEducation:that.highestEducation,//最高学历
                    position:that.position,//职位
                    probation:that.probation,//试用期
                    workAddress:that.workAddress,//工作地点
                    workType:that.workType, // 工作类型
                    employeeEmail:that.employeeEmail//个人邮箱
  			},
  			cache:false
  		}).then(function(res){
  			if(res.data.code===10000){
                console.log(res.data.data);
                that.$router.push({name:'employeeSalary',params:{employeeId:res.data.data}});
  			}else{
  			  that.$message.error(res.msg||res.data.msg)
                // alert("返回失败");
                //   return res.data.data;
  			}
  		});
     }

      },
    },
    mounted() {
        let that=this;
        that.companyStructure();
    },
    computed:{
        disabled_newDepartment(){
            if(this.newDepartment!=""&&this.parentDepartment!==""){
                return false
            }else{
                return true
            }
        },
        css_newDepartment(){
            if(this.newDepartment!=""&&this.parentDepartment!==""){
                return {
                    click_opacity:false
                }
            }else{
                return {
                    click_opacity:true
                }
            }
        },
        nextDisabled:function () {
            if(this.employeeName!="" && this.employeePhone!=""&&this.employeePhone.length==11 && this.employeeIdCard!=""&&this.employeeIdCard.length==18 && this.workType!="" &&
            this.deptId!="" && this.position!="" && this.entryTime!="" ){/*&& this.probation!=""*/
                return false
            }else{
                return true
            }
        },
        nextClass:function () {
            if(this.employeeName!="" && this.employeePhone!="" && this.employeePhone.length==11&&this.employeeIdCard!="" &&this.employeeIdCard.length==18&& this.workType!="" &&
            this.deptId!="" && this.position!="" && this.entryTime!="" ){/*&& this.probation!=""*/
                return {
                    click_opacity:false
                }
            }else{
                return {
                    click_opacity:true
                }
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main .right-content .content .headline{
    margin-bottom: 0;
  }
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
.error_div_img{
    float: left;
    display: inline-block;
    margin: -1.3px 0px;
}
.twoMethod .multipleMethod{
  border: 0;
}
.method .insertemployee{
  float: right;
  width: 180px;
  height: 40px;
  border: 1px solid #e5e5e5;
  margin: 24px 15px 0 0;
  line-height: 40px;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #394A66;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 0;
}
.insertemployee img{
  padding: 11px 0 11px 26px;
  float: left;
}
.sendOfferMain .personDataBox .personData .inputBox .items .input-group label{
    min-width: 72px;
    display: inline-block;
}
.sendOfferMain .personDataBox .personData .inputBox .departmentTreeBox .treePullDown{
    top:55px;
    left:83px;
    width: 297px;
}
.el-input__icon{
    display: none;
}
.el-input__icon::before{
    display: none;
}
.el-input__prefix{
    right: -75px !important;
}
.departmentTree{
    /*height: 279px;*/
    height: 244px;
    overflow: auto;
  }
.filterInput.el-icon-search:before{
  content: "\E619";
  position: absolute;
  right: 26px;
  top: 18px;
  color: #f95714;
  font-weight: 600;
}
#addDepartment{
  height: 34px;
  background: #F9F9F9;
  color: #394A66;
  font-size: 14px;
  text-align: center;
  line-height: 34px;
 }
  /*.sendOfferMain .el-dialog.newDepartAlert_Content .input-group .treePullDown{*/
      /*width: 275px !important;*/
      /*left: 170px !important;*/
  /*}*/
.special_department{
  height: 54px;
}
</style>
