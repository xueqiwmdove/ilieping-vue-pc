<template>
<div>
    <nav>
      <img src="../../assets/img/contract/ic_fanhui.svg" alt="" @click="goTO_bySinging"> 填写合同内容
    </nav>
    <div class="sendOfferSteps">
      <div class="sendOffer-status">
        <div class="sendOffer_one">
          <div>
            <img src="../../assets/img/dismission/step1_a.svg" />
            <i class="step_a" ></i>
          </div>
          <p>
            <span>选择</span>
            <span>合同模板</span>
          </p>
        </div>
        <!--<i class="step_a" ></i>-->
        <div class="sendOffer_two">
          <div>
            <img src="../../assets/img/dismission/step2_a.svg" />
            <i class="step_a" ></i>
          </div>
          <p>
            <span>选择</span>
            <span>签约员工并填写合同</span>
          </p>

        </div>
        <!--<i class="step_a" ></i>-->
        <div class="sendOffer_three">
          <img src="../../assets/img/dismission/step3.svg" />
          <p>
            <span>发起</span>
            <span>合同签署</span>
          </p>
        </div>
      </div>
    </div>

  <!-- 添加签约员工-->
  <el-dialog title="添加签约员工" :visible.sync="addEmployee"
             custom-class="newDepartAlert_Content">
    <div class="inputBox">
      <div class="input-group" v-clickOutSide="handleClose">
        <label>选择员工</label>
        <input type="text" placeholder="请选择员工" readonly class="selectDepartment" v-model="employee" @click.stop="isShow2=true;" ><!--@click="isShow2=!isShow2"-->
        <div class="treePullDown" v-show="isShow2">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText2" class="filterInput">
          </el-input>
          <!-- :data="data"-->
          <el-tree
            class="filter-tree departmentTree"
            :props="defaultProps"
            :load="loadNode"
            lazy
            :filter-node-method="filterNode"
            @node-click="getParent2"
            ref="tree2">
          </el-tree>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addNewEmployee" :disabled="nextDisabled" :class="nextClass">确 定</el-button>
    </div>
  </el-dialog>

    <div class="content_h" ref="mybox">
      <div class="fixation">
        <div class="left">
          <div class="inputBox">
            <label>合同名称<i>*</i></label>
            <input type="text" class="contractName" :maxlength="100"  v-model="contractName"/>
            <el-tooltip class="item" effect="dark" content="合同民称请不要包含特殊字符且长度不超过100字" placement="right-start">
              <img src="../../assets/images/reg/info.svg" alt="提示">
            </el-tooltip>
          </div>

          <div class="inputBox">
            <label>合同起止时间<i>*</i></label>
            <el-date-picker
              v-model="startEndTime"
              type="daterange"
              range-separator="-"
              start-placeholder="请选择合同开始时间"
              end-placeholder="请选择合同截止时间"
              value-format="yyyy-MM-dd"
              style="height: 40px;width: 400px;border-radius: 0;"
              :picker-options="pickerOptions">
            </el-date-picker>
            <el-tooltip class="item" effect="dark" content="合同起止时间将作为合同的实际有效期，合同到期前，系统将提醒您" placement="right-start">
              <img src="../../assets/images/reg/info.svg" alt="提示">
            </el-tooltip>
          </div>

          <div class="inputBox">
            <label>签署截止日期<i>*</i></label>
            <el-date-picker
              v-model="endTime"
              type="date"
              placeholder="请选择签署截止时间"
              class="endTime"
              value-format="yyyy-MM-dd"
              style="height: 40px;width: 400px;border-radius: 0;">
            </el-date-picker>
            <el-tooltip class="item" effect="dark" content="所有签署方需要在截止日期前完成签署" placement="right-start">
              <img src="../../assets/images/reg/info.svg" alt="提示">
            </el-tooltip>
          </div>

        </div>
        <div class="buttonBox" @click="addEmployee=true" v-show="buttonIsShow">
          添加签约员工
        </div>
        <div class="right" v-show="!buttonIsShow">
          <img :src="profilePhotoUrl" alt="加载失败" v-show="profilePhotoUrl != null" width="80px" height="80px" style="border-radius: 50%;">
          <img src="../../assets/img/dismission/women_19_32.svg" alt="icon" class="female" width="80px" height="80px" v-show="employeeSex=='女' && profilePhotoUrl == null"><!-- 女19-32 -->
          <img src="../../assets/img/dismission/men_19_32.svg" alt="icon" class="female" width="80px" height="80px" v-show="employeeSex=='男' && profilePhotoUrl == null">
          <div>
            <p class="userName">{{userName}}</p>
            <p class="department">{{department}}</p>
            <p class="post">{{post}}</p>
          </div>
          <img src="../../assets/img/dismission/ic_delete.svg" alt="x" class="delete_this" @click="addEmployee=true"><!--buttonIsShow=true;-->
        </div>
      </div>

      <div v-for="(item, index) in htmldata" :key='index' class="html_div"><!-- htmldata start -->
        <p class="uploadTitle">{{ item.title }}</p><!-- htmldata 一级标题 -->
        <div class="div_input" v-if="item.content!=undefined">
          <div v-for="(itemcontent,i) in item.content" class="from" :key='i'>
            <div v-if="itemcontent.type==='text'" class="input_div">
              <label>{{itemcontent.title}}<span v-if="itemcontent.required===true" class="class_required">*</span></label>
              <input type="text" autocomplete="off" :id="itemcontent.id" :name="itemcontent.id" :placeholder="itemcontent.title"/>
            </div>
            <div v-if="itemcontent.type==='select'" class="input_div">
              <label>{{itemcontent.title}}<span v-if="itemcontent.required===true" class="class_required">*</span></label>
<!--              <el-select class="classSelect" :id="itemcontent.id" v-model="itemcontent.defaultSelectStr" :name="itemcontent.defaultSelectStr" @change="changeSelected(itemcontent.id,itemcontent.select)">
                <el-option v-for="(itemselect, index) in itemcontent.select" :key="itemselect.val" :label="itemselect.val" :value="itemselect.val">{{itemselect.val}}</el-option>
              </el-select> -->
				<select :id="itemcontent.id">
					<option value="-1">{{itemcontent.defaultSelectStr}}</option>
					<option v-for="(itemselect, index) in itemcontent.select" :value="itemselect.key">{{itemselect.val}}</option>
				</select>
            </div>
           <div v-if="itemcontent.type==='radio'" class="input_div">
              <label>{{itemcontent.title}}<span v-if="itemcontent.required===true" class="class_required">*</span></label>
             <!-- <el-radio-group class="classradio" :id="itemcontent.id" v-model="itemcontent.defaultSelectStr" :name="itemcontent.defaultSelectStr">
                <el-radio v-for="(itemradio, index) in itemcontent.radio" :label="itemradio.val" :value="itemradio.key" :key="index">{{itemradio.val}}</el-radio>
              </el-radio-group> -->
				<div class="radio_div" :id="itemcontent.id">
					<div class="radio-inline" v-for="(itemradio, index) in itemcontent.radio">
					<input class="classRadio" :name="itemcontent.id" type="radio" :value="itemradio.key" />
					<span class="b-radio"></span>
					<span for="itemcontent.id">{{itemradio.val}}</span>
					</div>
				</div>
            </div>
            <div v-if="itemcontent.type==='date'" class="input_div">
              <label>{{itemcontent.title}}<span v-if="itemcontent.required===true" class="class_required">*</span></label>
              <input type="text" autocomplete="off" :id="itemcontent.id" :name="itemcontent.id" :placeholder="itemcontent.title"/>
            </div>
			<div v-if="itemcontent.type==='textarea'" class="input_div">
              <label>{{itemcontent.title}}<span v-if="itemcontent.required===true" class="class_required">*</span></label>
              <input type="textarea" class="textareaClass" autocomplete="off" :id="itemcontent.id" :name="itemcontent.id" :placeholder="itemcontent.title"/>
			</div>
          </div>
        </div>
      </div><!-- htmldata end -->
		<div class="submin_div">
			<button id="step2_entry" class="uploadLeaveSetup4 active click_btn" @click="btn_submin">提交</button>
		</div>
    </div>
  </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader_reg';

export default {
  name: 'customContractTemplate',
	components: {
       pageheader
	},
   data() {
      return {
        htmldata:[],
				dataContent:[],
				datahtmlpuch:[],
        formData:[],
        idArr:[],
        valueArr:[],
        arr:[],
				datahtmlRequiredPuch:[],//是否必填
        id:JSON.parse(localStorage.getItem("item")).templateNumber,
        endTime:'',
        userName:'',
        post:'',
        department:'',
        employee:'',
        isShow2:false,
        filterText2:'',
        data:[],//员工数据
        childrendata:[],
        defaultProps: {
          children: 'children',
          label: 'label',
          isLeaf: 'leaf'
        },
        addEmployee:false,
        buttonIsShow:true,
        employeeId:'',//
        returnEmployeeData:[],
        employeeSex:'',
        startEndTime:[],
        //验证时间范围 小于当前时间不可选中
        pickerOptions:{
          disabledDate:(time)=>{
            return time.getTime() < Date.now() - 8.64e7;
          },
        },
        contractName:'',
        profilePhotoUrl:''//头像
    }
  },
  directives : {
    //树形下拉点击其他地方收起
    clickOutSide:{
      bind:function(el,binding,vnode){
        function documentHandler(e){
          // console.log(e.target,el.contains(e.target))
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
    filterText2(val) {
      this.$refs.tree2.filter(val);
    }
  },
  computed:{
    //下一步按钮是否禁止 disabled true
    nextDisabled:function () {
      if(this.employee!=""){
        return false
      }else{
        return true
      }
    },
    nextClass:function () {
      if(this.employee!=""){
        return {
          click_opacity:false
        }
      }else{
        return {
          click_opacity:true
        }
      }
    }
  },
	methods:{
		changeSelected(id,select){
		  console.log(id);
			console.log(JSON.stringify(select));
		},
    goTO_bySinging(){
      let that=this;
      that.$router.push("/bySinging")
    },
    /*
    * @param node:当前点击节点信息
      @param resolve:传递参数方法
    * */
    loadNode(node, resolve) {
      //  debugger
      if (node.level === 0) {
        let that=this;
        that.$http({
          url:api.employeList+"0",
          method:'get',
          headers:headers()
        }).then((res)=>{
          // console.log(res);
          if(res.data.code==10000){
            that.data=res.data.data;
            resolve(that.data);
          }
        }).catch((res)=>{
          resolve([]);
          that.$message.error("获取员工列表失败！")
        })
      }else{
        let that=this;
        that.$http({
          url:api.employeList+node.data.id,
          method:'get',
          headers:headers()
        }).then((res)=>{
          // console.log(res);
          if(res.data.code==10000){
            that.data=res.data.data;
            resolve(that.data);
          }
        }).catch((res)=>{
          resolve([]);
          that.$message.error("获取员工列表失败！")
        })
      }
    },
    /*
    * 选中员工
    * type=1 没有子节点
    * */
    getParent2(data) {
      let that=this;
      console.log(data);
      if(data.type==1){
        that.employee=data.label;
        that.isShow2=false;
        that.employeeId=data.id;
      }

    },
    //合同管理回显员工信息
    returnEmployeeDetail(){
      let that=this;
      that.$http({
        method:"get",
        url:api.returnEmployeeDetail+that.employeeId,
        headers:headers(),
      }).then(function(res){
        if(res.data.code==10000){
          that.returnEmployeeData=res.data.data;
          console.log(that.returnEmployeeData);
          that.userName=res.data.data.employeeName;
          that.post=res.data.data.position;
          that.department=res.data.data.deptName;
          that.employeeSex=res.data.data.employeeSex;
          that.profilePhotoUrl=res.data.data.profilePhotoUrl;

          for(let i in that.returnEmployeeData) {
            if(document.getElementById(i) !=null){
              document.getElementById(i).value = that.returnEmployeeData[i];
            }

            /* try {
               document.getElementById(i).value = that.returnEmployeeData[i];
             }catch (e) {
               console.log("err :" + i);
               console.log()
             }*/
            //}
          }
        }
        // else if(res.data.code==40001){
        //   that.buttonIsShow=true;
        //   that.$confirm('员工未实名，请前往员工档案实名', '提示', {
        //     confirmButtonText: ' 去认证',
        //     cancelButtonText: '稍后再说',
        //     center:'true',
        //   }).then(() => {
        //     that.$router.push("/archives?id="+that.employeeId);
        //   });
        // }
        else{
          that.$message.error(res.data.msg);
        }
      });
    },
    //添加新员工按钮
    addNewEmployee(){
      let that=this;
      that.returnEmployeeDetail();

      that.buttonIsShow=false;
      that.addEmployee=false;
    },
    //树形下拉点击其他地方收起
    handleClose(){
      this.isShow2=false;
    },
    //树形下拉
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
		btn_submin(){
			let that=this;
			let tmpId;//集合id
			let tmprequired;//集合必填项
			let tmptype;//集合返回文本框类型
			let param = new Object();
			for(let i=0;i<that.htmldata.length;i++){
				for(let j=0;j<that.htmldata[i].content.length;j++){
				tmprequired=that.htmldata[i].content[j].required;
				tmpId = that.htmldata[i].content[j].id;
				tmptype=that.htmldata[i].content[j].type;
				try{
         var str = document.getElementById(tmpId).value;
					if(tmprequired==true && str == ""){
						that.$message.error('请输入'+that.htmldata[i].content[j].title);
						return false;
					}
					if(tmptype==="radio"){
            let radio=document.getElementsByName(tmpId);
						let radioParam =null;
             for(let a=0;a<radio.length;a++){
							if(radio[a].checked==true) {
							 radioParam = radio[a].value;
							 break;
							 }
						 }
						 if(tmprequired==true && radioParam == null){
						 	that.$message.error('请选择'+that.htmldata[i].content[j].title);
						 	return false;
						 }
						 param[tmpId] = radioParam;
						 continue;
					}

					if(tmptype==="select"){
						let select=document.getElementById(tmpId);
						if(tmprequired==true && select.value == "-1"){
							that.$message.error('请选择'+that.htmldata[i].content[j].title);
							return false;
						}
						if(select.value != -1){
							param[tmpId] = select.value;
						}
						continue;
					}

					param[tmpId] = document.getElementById(tmpId).value;

				}catch(err){
					console.log(i);
					console.log(tmpId);
					console.log(err);
				}
			 }

			}

			console.log(param)
			console.log(JSON.stringify(param));
      that.$http({
        method:"post",
        url:api.createContract,
        data:{
          // contractNumber:that.contractNumber,//证书编号
          agreementName:that.contractName,//合同名称
          templateNumber:that.id,//合同模板编号
          pageDate:param,//pageDate
          startTime:that.startEndTime[0],
          endTime:that.startEndTime[1],
          deadlineForSignature:that.endTime,//截止签字时间
          employeeId:that.employeeId,
        },
        headers:headers()
      }).then(function(res){
        console.log(res);
        if(res.data.code==10000){
          let  contractId=res.data.data;
          // that.$message.success("合同发送成功");
          that.$router.push('/contractDetail/'+contractId);
        }else{
          that.$message.error(res.message || res.data.msg);
        }
      })
		},
		getjsonData(){
           let that=this;
			let id='9b3e1162f2c311e880cd000c299f96b6';//模板编号
             that.$http({
	  			method:"post",
	  			url:api.jsonData+that.id,
	  			headers:headers('application/json;charset=utf-8'),
	  		}).then(function(res){
            if(res.data.code==10000){
            // console.log(res.data.data+"*****");
			that.htmldata=res.data.data;
            //blance todo
            for(let i=0;i<that.htmldata.length;i++){
              for(let j=0;j<that.htmldata[i].content.length;j++){
								that.datahtmlpuch.push(that.htmldata[i].content[j].id);
                that.datahtmlRequiredPuch.push(that.htmldata[i].content[j].required);//是否是必填
              }
            }
	  			}else{
	  				that.$message.error(res.data.msg);
	  			}
		    });
		}
	},
	mounted(){
		this.getjsonData();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content_h{
  background: #fff; padding: 20px;
}
  nav{
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  nav img{
    margin: 0 10px -1px 0;
  }
.div_input{
	background: #fafbfc;
	border: 1px solid #e5e5e5;
	color: #748093;
	margin: 0 21px;
	min-height: 200px;
	overflow: hidden;
	padding-bottom: 20px;
}
.classSelect{
	min-width: 300px;
	width: 300px;
	height: 34px;
}
.div_input .from{
  width: 50%;
	float: left;
	display: inline-block;
	height: 40px;
	line-height: 40px;
	margin-top: 20px;
}
.div_input .from .input_div{
	width:  100%;
	float:  left;
	display:  inline-block;
}
.div_input .from .input_div label{
	margin-right: 10px;
	height: 34px;
	line-height: 34px;
	text-align: right;
	display: inline-block;
	width: 30%;
}
.div_input .from .input_div input{
	    min-width: 300px;
    width: 300px;
    height: 34px;
}

  .sendOfferSteps .sendOffer-status .sendOffer_one p,
  .sendOfferSteps .sendOffer-status .sendOffer_three p,
  .sendOfferSteps .sendOffer-status .sendOffer_two p{
    text-align: center;
  }
  .sendOfferSteps .sendOffer-status .sendOffer_one span,
  .sendOfferSteps .sendOffer-status .sendOffer_three span,
  .sendOfferSteps .sendOffer-status .sendOffer_two span{
    display: inline-block;
    width: 100%;
    margin: 10px 0 0 0;
  }
  .sendOfferSteps .sendOffer-status .sendOffer_one span,
  .sendOfferSteps .sendOffer-status .sendOffer_two span{
    text-indent: -201px;
  }
  .sendOfferSteps .sendOffer-status .sendOffer_three span{
    text-indent: -20px;
    color: #97A2B3;
  }
  .sendOfferSteps .sendOffer-status .sendOffer_one .step_a{
    background: #C9EACC;
  }
.submin_div{
	text-align: center;
}

.classSelect input[type=text]{
	text-indent: 12px;
}
.class_required{
	font-family: MicrosoftYaHei;
	font-size: 14px;
	letter-spacing: 0;
	line-height: 19px;
	color: #F95714;
}
.textareaClass{
	background: #FFFFFF;
  border: 1px solid #E5E5E5;
	padding-left: 10px;
}
/* 单选框 */
.radio_div{
	display: inline-block;
	min-width: 300px;
	width: 300px;
	height: 34px;
}
.radio-inline{
	  width: 60px;
    color: #606266;
    font-weight: 500;
    line-height: 1;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
.radio-inline .classRadio{
	width: 14px !important;
    min-width: 14px !important;
    line-height: 16px !important;
	white-space: nowrap;
    cursor: pointer;
    outline: none;
    display: inline-block;
    line-height: 1;
    position: relative;
    vertical-align: middle;
}
.b-radio{
	display: inline-block;
	border:1px solid #507BE6;
	width:14px;
	height: 14px;
	border-radius:6px;
	vertical-align: middle;
	margin-right: 5px;
	position: relative;
}
.b-radio:before{
	content: '';
	font-size: 0;
	width: 8px;
	height: 8px;
	background: #507BE6;
	position: absolute;
	left:50%;
	top:50%;
	margin-left: -4px;
	margin-top: -4px;
	border-radius: 4px;
	display: none;
}
.classRadio:checked~.b-radio:before{
	display: block;
}
/*
.radio-inline label{
position: relative; // 设置为相对定位，以便让子元素能绝对定位
    height: 40px !important;
    line-height: 40px !important;
    margin: 0px !important;
}

.radio-inline input[type="radio"] + label::before {
    content: "\a0"; //不换行空格
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    width:12px;
    height: 12px;
    margin-right:20px;
    border-radius:50%;
    border: 1px solid #507BE6;
    text-indent: 10px;
    line-height: 1;
}
.radio-inline input[type="radio"]:checked + label::before {
	width:6px;
	height: 6px;
    background-color: #507BE6;
    background-clip: content-box;
    padding: 6px;
}
*/

nav{
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 0;
}
nav img{
  margin: 0 10px -1px 0;
  cursor: pointer;
}
.content_h{background: #fff; padding: 20px;}
.content_h .fixation{
  margin: 13px 0 0;
  text-align: center;
}
.content_h .left{
  display: inline-block;
  /*margin-left: 26px;*/
}
.content_h .right{
  text-align: left;
  display: inline-block;
  width: 477px;
  height: 100px;
  margin-left: 62px;
  vertical-align: top;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  position: relative;
}
.content_h .right .delete_this{
  cursor: pointer;
  position: absolute;
  top:42px;
  right: 13px;
}
.content_h .right div{
  display: inline-block;
  vertical-align: top;
  margin-top: 25px;
}
.content_h .right img{
  margin: 6px 20px 0 22px
}
.content_h .right p{
  display: inline-block;
  font-size: 14px;
  color: #394A66;
}
.content_h .right .userName{
  font-size: 16px;
  margin-bottom: 15px;
  display: block;
}
.content_h .right .post{
  background: url("../../assets/img/contract/post.png") no-repeat center left;
  text-indent: 28px;
}
.content_h .right .department{
  background: url("../../assets/img/contract/department.png") no-repeat center left;
  text-indent: 28px;
}
.content_h .right p{

}
.content_h .buttonBox{
  display: inline-block;
  width: 200px;
  height: 44px;
  line-height: 44px;
  vertical-align: top;
  margin:27px 0 0 200px;
  background: url("../../assets/img/contract/addEmployee.png") 33px 13px no-repeat #f95714;
  color: #fff;
  cursor: pointer;
  text-indent: 70px;
  text-align: left;
  border-radius: 4px;
}
.content_h .inputBox{
  margin-bottom: 20px;
  font-size: 0;
}
.content_h .inputBox .el-input__icon.el-range__icon.el-icon-date{
  position: absolute;
  right: 0;
}
.content_h .inputBox img{
  margin-left: 9px;
  vertical-align: middle;
}
.content_h .inputBox .el-date-editor.endTime.el-input.el-input--prefix.el-input--suffix.el-date-editor--date .el-input__inner{
  width: 400px;
  height: 44px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius:0;
}
.content_h .inputBox input{
  width: 400px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  border-radius:0;
  font-size: 16px;
}
.content_h .inputBox label{
  width: 104px;
  display: inline-block;
  font-size: 16px;
  color: #394A66;
  letter-spacing: 0;
  margin-right: 10px;
  text-align: right;
}
.content_h .inputBox label i{
  color: #f95714;
}
.div_input{
  background: #fafbfc;
  border: 1px solid #e5e5e5;
  color: #748093;
  margin: 0 21px;
  min-height: 200px;
  overflow: hidden;
  padding-bottom: 20px;
}
.div_input .from{
  width: 50%;
  float: left;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
}
.div_input .from .input_div{
  width:  100%;
  float:  left;
  display:  inline-block;
}
.div_input .from .input_div label{
  margin-right: 10px;
  height: 34px;
  line-height: 34px;
  text-align: right;
  display: inline-block;
  width: 30%;
}
.div_input .from .input_div input{
  min-width: 300px;
  width: 300px;
  height: 34px;
  left: 18px;
}
.div_input .from .input_div  input[type=radio]{
  opacity: 0;
  z-index: 2;
}
.sendOfferSteps .sendOffer-status .sendOffer_one p,
.sendOfferSteps .sendOffer-status .sendOffer_three p,
.sendOfferSteps .sendOffer-status .sendOffer_two p{
  text-align: center;
}
.sendOfferSteps .sendOffer-status .sendOffer_one span,
.sendOfferSteps .sendOffer-status .sendOffer_three span,
.sendOfferSteps .sendOffer-status .sendOffer_two span{
  display: inline-block;
  width: 100%;
  margin: 10px 0 0 0;
}
.sendOfferSteps .sendOffer-status .sendOffer_one span,
.sendOfferSteps .sendOffer-status .sendOffer_two span{
  text-indent: -201px;
}
.sendOfferSteps .sendOffer-status .sendOffer_three span{
  text-indent: -20px;
  color: #97A2B3;
}
.sendOfferSteps .sendOffer-status .sendOffer_one .step_a{
  background: #C9EACC;
}
.submin_div{
  text-align: center;
}
.classSelect{
  min-width: 300px;
  width: 300px;
  height: 34px;
}
.el-dialog.newDepartAlert_Content .input-group{
  margin-bottom: 72px;
}
.input_div select{
   min-width: 300px;
    width: 300px;
    height: 34px;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none; /* 火狐、谷歌清除 */
    background-size:10%;
	background: url(../../assets/images/dismission/sprite_up.png) no-repeat 276px center;
	font-size: 14px;
	color: #394A66;
    outline:none;
    border: 1px solid #E5E5E5;
    text-indent: 12px;
	background-color: #fff;
}
.input_div select::-ms-expand{ display: none; } /* ie清除 */

</style>
