<template>
    <div>
<!-- 弹出框  start -->
<div class="modal fade delete-alert alert" id="beidong" v-show="isDismissal">
	<div class="model_bg"></div>
    <div class="modal-dialog"  style="min-width: 800px;">
        <div class="modal-content">
            <div class="modal-header alert-header">
                <button type="button" class="close" @click="model_close">
                    <img src="../../assets/img/dismission/ic_close.svg" alt="">
                </button>
                <div class="modalTitle" style="text-align:center;">
                    单位辞退
                </div>
            </div>
            <div class="tabbable tabs-left">
                <ul class="nav nav-tabs dimission-nav-tabs">
                    <li v-for="(items,index) in dimissionList" :key="index" @click="clickMenu(index)" :class="flag==index?'active':''" :id="index+1">
                        {{items.optionTitle}}
                    </li>
                </ul>
               <div class="tab-content">
                    <div class="tab-pane active" v-for="(items,index) in dimissionList" :class="flag==index?'selectMenu':''">
                        <!--<div v-for="(items,index) in dimissionList_list" :key="index" class="subject-list" style="margin-top: 10px;">-->
                            <!--<label class="checkbox">
                                <input type="radio" name="shixing" class="dimissClass" dimiss-id ="items.id" dimiss-value="items.optionValue" dimiss-title="items.optionTitle" checked="checked">
                                {{items.optionValue}}
                            </label>-->
                            <!--<label class="checkbox" v-if="dishonestyDimission.optionId != list.id">
                                <input type="radio"  name="shixing" class="dimissClass" dimiss-id ="{{list.id}}" dimiss-value=" {{list.optionValue}}" dimiss-title="{{list.optionTitle}}" style="margin: -5px 10px 0 0;" >
                                {{list.optionValue}}
                            </label>-->
                            <!--<label><span class="line"></span></label>
                        </div>-->
                    </div>
                    <div v-for="(items,index) in dimissionList_list" :key="index" class="subject-list">
                     <!--<label class="checkbox">
                        <input type="radio" name="shixing" class="dimissClass" dimiss-id ="items.id" dimiss-value="items.optionValue" dimiss-title="items.optionTitle">
                        {{items.optionValue}}
                     </label>-->
					  <el-radio-group v-model="radio2">
					    <el-radio :label="items.id" name="items.optionValue">{{items.optionValue}}</el-radio>
					  </el-radio-group>
                    </div>

                    <div class="countShu">
                        <label class="checkbox"><i class="checkbox_txt">事件描述<i class="i_red">*</i></i>
                            <textarea placeholder="请输入不少于50字的事件描述" class="textarea_txt" minlength="50" id="dismiss_describe" v-model="uploadLeaveSetup4_textarea"></textarea>
                        </label>
                    </div>
                </div>
            </div>
            <div class="footer_btn">
                <button v-if="edit_btn" class="uploadLeaveSetup4 active" :class="uploadLeaveSetup4_button" :disabled="uploadLeaveSetup4_Disabled" @click="editDimission()">提交</button>
                <button v-if="add_btn" class="uploadLeaveSetup4 active" :class="uploadLeaveSetup4_button" :disabled="uploadLeaveSetup4_Disabled" @click="addDimission()">提交</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal -->
</div>
<!-- 弹出框  end -->

      <div>
        <label class="checkbox"><i class="checkbox_txt">失信行为<i class="i_red">*</i></i></label>
        <div class="div_dismissal uploadLeaveBtn" @click="breakPromiseFun" id="expressionSuccess" v-on:blur="expression"><!--  data-dismiss="modal" aria-hidden="false"-->
          <img style="vertical-align: text-top" class="uploadLeaveImg" src="../../assets/img/dismission/add.svg" alt=""> 添加失信行为
        </div>
        <span v-if="isDimissionAll_count">
        <img src="../../assets/img/reg/info.svg" alt="" class="img_dismissal">
        <span style="color: #97A2B3;">最多可添加五条失信行为</span>
        </span>
      </div>
      <div class="break-promise">
        <div class="break-promise-behavior dimissionCount" v-for="(items,index) in insertData" :key="index" v-if="isDimissionAll"><!-- ng-repeat="items in dimissionAll" id="dimission{{items.id}}"-->
          <p class="behavior-title">
              {{index+1}}、<i class="optionId">{{items.optionId}}</i>{{items.optionTitle}} - {{items.optionValue}}
            <span class="pull-right">
                <img src="../../assets/img/dismission/ic_edit.svg" class="edit" @click="updateDimissiom(index+1,items.optionTitle,items.optionValue,items.dishonestyDescribe)"  id="updateDimissiom">
                <img src="../../assets/img/dismission/ic_delete.svg" class="delete" @click="deleteDimissiom(index+1)">
            </span>
          </p>
          <div class="behavior-describe">
            <em>事件描述</em>
            <p>
              {{items.dishonestyDescribe}}
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
    export default {
        name: "dishonest",
        data(){
        	return{
        		isDismissal:false,//单位辞退弹框
        		dimissionList:[],//
        		flag:0,
        		dimissionList_list:[],
        		uploadLeaveSetup4_textarea:'',
        		radio2:'',
        		breakPromiseData:[],
        		isDimissionAll:false,
        		isDimissionAll_count:false,
        		insertData:[],
        		add_btn:true,
        		edit_btn:false,
        		edit_index:'',
            listDis:{},
            listDisData:[],
        	};
        },
       computed: {
	     uploadLeaveSetup4_button: function(){ // 使用按钮样式密码登录
	      if ((this.radio2 != "" && this.uploadLeaveSetup4_textarea != "" && this.uploadLeaveSetup4_textarea.length  >= 50) && !this.isLoading) {
	          return {
	            click_btn: false
	          }
	        }
	        else {
	          return {
	            click_btn: true
	          }
	        }
	      },
	      uploadLeaveSetup4_Disabled: function(){ // 使用按钮样式验证码
	      if ((this.radio2 != "" && this.uploadLeaveSetup4_textarea != "" && this.uploadLeaveSetup4_textarea.length >= 50) && !this.isLoading) {
	          return false
	        }
	        else {
	          return true
	        }
	      },
        },
        methods:{
        	breakPromiseFun(){//获取失信行为alert选题
        	 let that=this;
        	 that.flag=0;
        	 that.add_btn=true;
        	 that.edit_btn=false;
        	 that.radio2='';
        	 that.uploadLeaveSetup4_textarea='';
        	 if(that.insertData.length==5){
        	 	that.isDimissionAll_count=true;
        	 	that.isDismissal=false;
        	 	return false;
        	 }else{
        	 	that.isDismissal=true;
	            that.$http({
	      			method:"get",
	      			url:api.api_dimissionList,
	      			headers:headers("application/json;charset=utf-8"),
	      			cache:false
	      		}).then(function(res){
	      			if(res.data.code===10000){
	                 that.dimissionList=res.data.data;
	                 that.dimissionList_list=res.data.data[0].list;
	      			}else{
	      				that.$message.error(res.message || res.data.msg);
	      			}

	      		});
        	 }

        	},
        	clickMenu(index){//单击切换菜单
        		let that=this;
        		that.flag=index;
        		that.dimissionList_list=that.dimissionList[index].list;
        		//blance

        		that.radio2='';
        	},
        	addDimission(){//提交
        	  let that=this;
        	  that.isDismissal=false;
			  for(let i=0; i<that.dimissionList_list.length;i++){
			  	let index=i;
			  	that.dimissionAll=that.dimissionList_list[i];
                 if(that.radio2==that.dimissionList_list[index].id){
					that.dimissionAll.optionValue=that.dimissionList_list[index].optionValue;
					that.dimissionAll.optionTitle=that.dimissionList_list[index].optionTitle;
					that.dimissionAll.dishonestyDescribe=that.uploadLeaveSetup4_textarea;
					//TODO blance  添加添加失信行为，获取需要传的部分参数
          that.listDis.id=that.flag+1;
          that.listDis.optionId=that.dimissionList_list[index].id;
          that.listDis.dishonestyDescribe=that.uploadLeaveSetup4_textarea;

           that.listDisData.id=that.listDis.dishonestyId;
           that.listDisData.optionId=that.listDis.optionId;
           that.listDisData.dishonestyDescribe=that.listDis.dishonestyDescribe;
           localStorage.setItem("listDis", JSON.stringify(that.listDis));

					break;
				 }
			  }

			  that.insertData.id=that.dimissionAll.length+1;
			  that.insertData.dishonestyDescribe=that.dimissionAll.dishonestyDescribe;
			  that.insertData.optionId=that.dimissionAll.optionId;
			  that.insertData.optionValue=that.dimissionAll.optionValue;
			  that.insertData.optionTitle=that.dimissionAll.optionTitle;
			  that.insertData.push(that.dimissionAll);

			  that.isDimissionAll=true;
			  that.radio2='';
 			  // that.$emit('child_component',that.insertData);
        that.$emit('child_component',that.listDisData);
	         //添加失信行为，触发childComponent事件
        that.listDisData.push(JSON.parse(localStorage.getItem('listDis')));
        that.$emit('childComponent',that.listDisData);

        console.log(that.insertData)
          // console.log("+++++++++"+JSON.stringify(localStorage.getItem('listDis')));

        	},
        	expression(){

        	},
        	updateDimissiom(index,optionValue,optionTitle,dishonestyDescribe){//编辑失信行为回显数据
        	  let that=this;
        	 that.isDismissal=true;
        	 that.add_btn=false;
        	 that.edit_btn=true;
        	 that.edit_index=index;//编辑Index
        	  if(optionValue=='简历虚假'){
        	  	that.flag=0;
        	  	that.dimissionList_list=that.dimissionList[0].list;
        	  }else if(optionValue=='造假'){
        	  	that.flag=1;
        	  	that.dimissionList_list=that.dimissionList[1].list;
        	  }else if(optionValue=='私活私单'){
        	  	that.flag=2;
        	  	that.dimissionList_list=that.dimissionList[2].list;
        	  }else if(optionValue=='泄露商业机密'){
        	  	that.flag=3;
        	  	that.dimissionList_list=that.dimissionList[3].list;
        	  }else if(optionValue=='贪污偷盗'){
        	  	that.flag=4;
        	  	that.dimissionList_list=that.dimissionList[4].list;
        	  }else if(optionValue=='其他'){
        	  	that.flag=5;
        	  	that.dimissionList_list=that.dimissionList[5].list;
        	  }
        	  for(let i=0;i<that.dimissionList_list.length;i++){
        	  	if(that.dimissionList_list[i].optionValue==optionTitle){
        	  	  that.radio2=that.dimissionList_list[i].id;
        	  	  break;
        	  	}

        	  }
        	  that.uploadLeaveSetup4_textarea=dishonestyDescribe;
        	},
        	editDimission(){//编辑
        	  let that=this;
              that.isDismissal=false;
			  for(let i=0; i<that.dimissionList_list.length;i++){
			  	let index=i;
			  	that.dimissionAll=that.dimissionList_list[i];
                 if(that.radio2==that.dimissionList_list[index].id){
					that.dimissionAll.optionValue=that.dimissionList_list[index].optionValue;
					that.dimissionAll.optionTitle=that.dimissionList_list[index].optionTitle;
					that.dimissionAll.dishonestyDescribe=that.uploadLeaveSetup4_textarea;

           //blance
           // that.listDis.is=that.flag+1;
           // that.listDis.optionId=that.dimissionList_list[index].id;
           // that.listDis.dishonestyDescribe=that.uploadLeaveSetup4_textarea;
           //
           // that.listDisData.id=that.listDis.dishonestyId;
           // that.listDisData.optionId=that.listDis.optionId;
           // that.listDisData.dishonestyDescribe=that.listDis.dishonestyDescribe;
           // that.listDisData.push( that.listDis);
					break;
				 }
			  }
              that.insertData.splice(--that.edit_index,1,that.dimissionAll);
            //编辑失信行为，触发childComponent事件
            // that.$emit('child_component',that.insertData);
            that.$emit('child_component',that.that.listDisData);
            // that.listDisData.splice(--that.edit_index,1,that.listDis);
            //编辑失信行为，触发childComponent事件
            that.$emit('childComponent',that.listDisData);
              // console.log(that.listDisData)
        	},
        	breakPromiseFun2(){

        	},
        	deleteDimissiom(index){//删除失信行为
        		let that=this;
                that.insertData.splice(--index,1);

            //删除失信行为，触发child_component事件
            //that.$emit('child_component',that.insertData);
            that.$emit('child_component',that.listDisData);

            // that.listDisData.splice(--index,1);
            that.$emit('childComponent',that.listDisData);
        	},
        	model_close(){
        		this.isDismissal=false;
        	}
        },
    }
</script>

<style scoped>
.div_dismissal{
	padding: 0 20px;cursor:pointer;height: 34px;line-height: 34px;background: #fff;border: 1px solid #e5e5e5;margin-left: 10px;border-radius: 4px;display: inline-block;
}
.img_dismissal{
	padding: 0 5px 0 10px;margin: 0 0 -2px;
}
.tabs-left .nav-tabs li{
	cursor: pointer;
}
/* 弹出框样式 */
.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    outline: 0;
}
.modal .model_bg{
	background: #000;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    z-index: 1051;
}
.modal .modal-dialog{
	width: 800px;
	height: 568px;
    position: relative;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid #999;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 6px;
    outline: 0;
    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
    box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
    background: #fff;
    z-index: 1052;
    left: 50%;
    margin-left: -400px;
    top: 20%;
}
.modal .modal-header{
	padding: 15px;
    border-bottom: 1px solid #e5e5e5;
}
.modal .modal-header .close{
    float: right;
    font-size: 21px;
    font-weight: bold;
    line-height: 1;
    color: #000;
    -webkit-appearance: none;
    padding: 0;
    cursor: pointer;
    background: transparent;
    border: 0;
    margin-top: -2px;
    }
.tab-content{
	height: 450px !important;
	margin-left:89px;
}
.countShu{
  padding-left: 20px;
}
.countShu .checkbox{
    margin-top: 15px;
    position: relative;
    display: block;
    margin-bottom: 10px;
}
.countShu .checkbox .checkbox_txt{
	position: absolute;top: 13px;
}
.i_red{
	color: #f95714
}
.tab-content .tab-pane{box-sizing: border-box}
.subject-list{
	padding-left: 20px;height: 20px;line-height: 20px;margin:0 0 15px 0;margin-top: 10px;
}
.dimissClass{
	margin: -5px 10px 0 0;border: none;
}
.footer_btn{width: 100%;background: #ffffff;text-align: center;border-top:1px solid #e5e5e5;}
.footer_btn .uploadLeaveSetup4{margin: 10px auto;width: 150px;}
.textarea_txt{width: 493px;height: 107px;margin-left:85px; }
.click_btn{opacity: 0.6;}

</style>
