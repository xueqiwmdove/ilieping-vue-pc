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
          <p class="headline">发offer</p>
          <!--<breadcrumb></breadcrumb>-->
          <div class="sendOfferMain">
            <div class="sendOfferSteps">
              <div class="sendOffer-status">
                <div class="sendOffer_one">
                  <div>
                    <img src="../../assets/img/dismission/step1_a.svg" />
                    <i class="step_a" ></i>
                  </div>
                  <span>填写信息</span>
                </div>
                <!--<i class="step_a" ></i>-->
                <div class="sendOffer_two">
                  <div>
                    <img src="../../assets/img/dismission/step2.svg" />
                    <i class="step_a" ></i>
                  </div>
                  <span>预览offer</span>
                </div>
                <!--<i class="step_a" ></i>-->
                <div class="sendOffer_three">
                  <img src="../../assets/img/dismission/step3.svg" />
                  <span>完成发送</span>
                </div>
              </div>
            </div>
            <div class="personDataBox">
              <!--基本信息-->
              <!--新增部门弹窗-->
              <el-dialog title="新增部门" :visible.sync="newDepartments"  class="newDepartAlert"
                         custom-class="newDepartAlert_Content">
                <div class="inputBox">
                  <div class="input-group">
                    <label>部门名称 </label>
                    <input type="hidden" v-model="parentDepartmentId">
                    <input type="text" class="department" v-model="newDepartment" placeholder="请输入部门名称" maxlength="32" >
                  </div>
                  <div class="inputBox">
                    <div class="input-group" v-clickOutSide="handleClose"><!---->
                      <label>上级部门</label>
                      <input type="text" placeholder="请选择部门名称" readonly class="selectDepartment" v-model="parentDepartment" @click.stop="isShow2=true;companyStructure();" ><!--@click="isShow2=!isShow2"-->
                      <div class="treePullDown" v-show="isShow2">
                        <el-input
                          placeholder="输入关键字进行过滤"
                          v-model="filterText2" class="filterInput">
                        </el-input>
                        <el-tree
                          class="filter-tree departmentTree"
                          :data="data2"
                          :props="defaultProps"
                          :filter-node-method="filterNode"
                          @node-click="getParent2"
                          ref="tree2">
                        </el-tree>
                      </div>
                    </div>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="addDepartment">确 定</el-button>
                </div>
              </el-dialog>

              <!--新增部门弹窗-->

              <!--查看offer弹窗-->

              <!--查看offer弹窗-->

              <div class="personData basicInfo">
                <p class="title">基本信息</p>
                <div class="inputBox">
                  <div class="items">
                    <div class="input-group">
                      <label>姓名<i>*</i></label>
                      <input type="text" v-model="name" placeholder="请输入录用人姓名" maxlength="10">
                    </div>
                    <div class="input-group special">
                      <label>邮箱<i>*</i></label>
                      <input type="email"  v-model="email"  @change="emailPattern" placeholder="请输入录用人邮箱号码">
                    </div>
                    <div class="input-group departmentTreeBox"  v-clickOutSide="handleClose"><!---->
                      <label>部门<i>*</i></label>
                      <input type="hidden" v-model="departmentId">
                      <input type="text"  v-model="department"  readonly class="department" placeholder="请选择录用人任职部门" @click.stop="isShow=true;companyStructure()"><!-- @click="isShow=!isShow"-->
                      <img src="../../assets/img/dismission/add.svg"  class="addDepartment" @click="parentDepartment=enterpriseName;newDepartments=true">
                      <div class="treePullDown" v-show="isShow">
                        <el-input
                          placeholder="输入关键字进行过滤"
                          v-model="filterText" class="filterInput">
                        </el-input>
                        <el-tree
                          class="filter-tree departmentTree"
                          :data="data2"
                          node-key="id"
                          :props="defaultProps"
                          :filter-node-method="filterNode"
                          ref="tree2"
                          @node-click="getParent">
                        </el-tree>
                      </div>
                    </div>
                  </div>
                  <div class="items">
                    <div class="input-group">
                      <label>手机号<i>*</i></label>
                      <input type="text"  v-model="phone" placeholder="请输入录用人手机号码" maxlength="11" @change="phonePattern"><!-- @change="checkPhone"-->
                    </div>

                    <div class="input-group special">
                      <label class="position">职位<i>*</i></label>
                      <input type="text" v-model="post" placeholder="请输入录用人职位">
                    </div>
                  </div>


                </div>
              </div>
              <div class="personData">
                <p class="title">报到信息</p>
                <div class="inputBox">
                  <div class="items">
                    <div class="input-group">
                      <label>报到时间<i>*</i></label>
                      <el-date-picker
                        v-model="reportTime"
                        type="datetime"
                        placeholder="请选择报到时间"
                        default-time="09:00:00"
                        value-format="yyyy-MM-dd HH:mm:ss"
                         class="reportTime"><!--@change="moreTime"  picker-options="pickerOptions"-->
                      </el-date-picker>
                     <!-- <el-date-picker
                        v-model="reportTime"
                        type="date"
                        placeholder="请选择报到时间" @change="moreTime" class="reportTime" >
                      </el-date-picker>-->
                    </div>
                    <div class="input-group special">
                      <label>报到地址<i>*</i></label>
                      <input type="text" class="" v-model="reportAddress" placeholder="请输入报到地址">
                    </div>
                  </div>
                  <div class="items">
                    <div class="input-group">
                      <label>报到联系人<i>*</i></label>
                      <input type="text" class="" v-model="reportContact" placeholder="请输入报到联系人">
                    </div>
                    <div class="input-group special">
                      <label>联系人电话<i>*</i></label>
                      <input type="text" class="" v-model="reportContactPhone" placeholder="请输入联系人电话" maxlength="12">
                    </div>
                  </div>
                </div>
              </div>
              <div class="personData ">
                <p class="title">薪酬待遇</p>
                <div class="inputBox salaryPackage">
                  <div class="items">
                    <div class="input-group">
                      <label>基本薪资<i>*</i></label>
                      <input type="text" class="salary" v-model="basicSalary" placeholder="请输入基本薪资" >
                      <el-select v-model="salary" placeholder="请选择" class="salarySelect">
                        <el-option
                          v-for="item in salaryOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>

                  </div>
                  <!--<div class="items">
                    <img src="../../assets/img/dismission/add.svg" class="addBonus" @click="addBonusInput">
                    <div class="input-group special"  v-for="(item,index) in bonusNums" :key="index">
                      <label>奖金</label>
                      <input type="text" class="bonus" v-model="basicBonus" placeholder="请输入金额">
                      <el-select v-model="bonus" placeholder="" class="bonusSelect">
                        <el-option
                          v-for="item in bonusOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <img src="../../assets/img/contract/ic_shanchu.svg" class="deleteBonus" v-show="index!=0" @click="removeBonusInput(item)">
                      &lt;!&ndash;&ndash;&gt;
                    </div>
                  </div>-->
                  <div class="special_textarea">
                    <div class="input-group ">
                      <label>薪资备注</label>
                      <textarea v-model="salaryNote" placeholder="请输入薪资备注" ></textarea>
                    </div>
                  </div>

                </div>
              </div>
              <div class="personData">
                <p class="title">员工性质及试用期</p>
                <div class="inputBox">
                  <div class="items">
                    <div class="input-group">
                      <label class="vertical">员工类型<i>*</i></label>
                      <el-select v-model="workType" placeholder="请选择员工类型">
                        <el-option
                          v-for="item in workTypeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="items">
                    <div class="input-group">
                      <label class="vertical">试用期</label>
                      <el-select v-model="probatio" placeholder="请选择试用期">
                        <el-option
                          v-for="item in probatioOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="nextButton">
                <input type="button" class="sendOfferNext" :disabled="nextDisabled" :class="nextClass" value="下一步" @click="saveMsg">
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
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
  import {checkMobile,compareDate,isNumber,isEmail} from '@/assets/js/common/verify.js'
  import {formatDate} from '@/assets/js/common/date_year.js';
  import breadcrumb from '@/components/common/breadcrumb'
  import {mapState,mapActions} from 'vuex'

  export default {
    name: 'sendOffer',
    components: {
      pageaside,
      pageheader,
      breadcrumb
    },
    data() {
      return {
        salaryOptions: [
          {
          value: '1',
          label: '日薪'
        },{
          value: '2',
          label: '月薪'
        }, {
          value: '3',
          label: '年薪'
        }],
        bonusOptions: [
          {
          value: '1',
          label: '月度'
        }, {
          value: '2',
          label: '季度'
        }, {
          value: '3',
          label: '年度'
        }
        ],
        salary:'2',//月薪年薪
        bonus:'季度',//奖金 月度季度年度
        workType:'',//员工类型
        workTypeOptions:[
          {
            value: '0',
            label: '全职'
          }, {
            value: '1',
            label: '兼职'
          },{
            value: '2',
            label: '实习'
          }
        ],
        probatio:'0',//试用期
        probatioOptions:[
          {
            value: '1',
            label: '一个月'
          },
          {
            value: '2',
            label: '二个月'
          },
          {
            value: '3',
            label: '三个月'
          },
          {
            value: '4',
            label: '四个月'
          },{
            value: '5',
            label: '五个月'
          },{
            value: '6',
            label: '六个月'
          },{
            value: '0',
            label: '免试用期'
          }

        ],
        name:'',
        email:'',
        phone:'',
        post:'',
        department:'',
        departmentId:'',
        reportTime:'',
        reportAddress:'',
        reportContact:'',
        reportContactPhone:'',
        basicSalary:'',//基本薪资
        basicBonus:'',//奖金
        salaryNote:'',//薪资备注

        filterText: '',
        filterText2:'',
        data2:[],
       /* data2: [
          {
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        },
          {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        },
          {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],*/
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        isShow:false,//默认隐藏
        isShow2:false,//默认隐藏
        newDepartments:false,//新增部门
        bonusNums:[
          {
            value:'',
          }
        ],
        newDepartment:'',//新增部门
        parentDepartment:'',//上级部门
        parentDepartmentId:0,//上级部门id 不选择默认传0
        pickerOptions:{
          disabledDate:(time)=>{
            return time.getTime() < Date.now() - 8.64e7;
          },
        },
        enterpriseName:localStorage.getItem("title")
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
      filterText(val) {
        this.$refs.tree2.filter(val);
      },
      phone:function () {//手机号只能输入数字
        this.phone=this.phone.replace(/[^1\d]/g,'');
      },
     /* basicSalary:function () {
        this.basicSalary=this.basicSalary.replace(/[^\d]/g,'');
      },*/
      reportContactPhone:function () {
        this.reportContactPhone=this.reportContactPhone.replace(/[^\d]/g,'');
      }
    },
    computed:{
      //下一步按钮是否禁止 disabled true
      nextDisabled:function () {
        if(this.name!="" && this.phone!="" && !checkMobile(this.phone) && this.email!="" &&
          // !isEmail(this.email) &&
          this.email.match(/^[a-z0-9]([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z0-9]{2,3}([\.][a-z0-9]{2})?$/i) &&
          this.post!="" && this.reportTime!="" && this.reportAddress!="" && this.basicSalary!="" && this.workType!=""){
          return false
        }else{
          return true
        }
      },
      nextClass:function () {
        if(this.name!="" && this.phone!="" && !checkMobile(this.phone) && this.email!="" &&
          // !isEmail(this.email) &&
          this.email.match(/^[a-z0-9]([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z0-9]{2,3}([\.][a-z0-9]{2})?$/i) &&
          this.post!="" && this.reportTime!="" && this.reportAddress!="" && this.basicSalary!="" && this.workType!=""){
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
    methods: {
      //邮箱校验
      emailPattern(){
        if(!this.email.match(/^[a-z0-9]([a-z0-9]*[-_\.]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z0-9]{2,3}([\.][a-z0-9]{2})?$/i)){
          this.$message.error("请填写正确邮箱地址！");
        }
      },
      //手机验证
      phonePattern(){
        if(!this.phone.match(/^1[0-9]\d{9}/)){
          this.$message.error("请填写正确的手机号！");
        }
      },
      //时间转化
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      },
      //新增奖金
      addBonusInput(){
        let that=this;
        that.bonusNums.push({
          value: '',
        })
      },
      //删除奖金
      removeBonusInput(item) {
        let index = this.bonusNums.indexOf(item);
        if (index !== -1) {
          this.bonusNums.splice(index, 1)
        }
      },
      //树形下拉
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      //树形下拉点击其他地方收起
      handleClose(){
        this.isShow=false;
        this.isShow2=false;
      },
      //公司组织架构tree
      companyStructure(){
        let that=this;
        that.$http({
          url:api.searchCompanyStructure,
          method:'get',
          headers:headers()
        }).then((res)=>{
          // console.log(res);
          if(res.data.code==10000){
            that.data2=res.data.data;
          }
        }).catch((res)=>{
          // that.$message.error("新增部门添加失败！")
        })
      },
      //新增部门
      addDepartment(){
        let that=this;
        that.newDepartments = false;
        that.$http({
          url:api.addDepartment,
          method:'post',
          headers:headers(),
          data:{
            deptName:that.newDepartment,
            parentId:that.parentDepartmentId
          }
        }).then((res)=>{
          // console.log(res);
          if(res.data.code=10000){
            that.$message.success("新增部门添加成功！");
            that.newDepartment="";
            that.parentDepartmentId="";
            that.parentDepartment="";
          }
        }).catch((res)=>{
          // console.log(res)
          that.$message.error("新增部门添加失败！")
        })
      },
      //选中tree节点
      getParent(data) {
        let that=this;
        // that.filterText=data.label;
        that.department=data.label;
        that.departmentId=data.id;

      },
      //新增部门点击赋值，选中
      getParent2(data) {
        // console.log(data);
        let that=this;
        that.parentDepartment=data.label;
        that.parentDepartmentId=data.id;

      },
      //报到时间不能小于当前时间
      moreTime(){
        let that=this;
        //获取当前时间
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        let nowDate = year + "-" + month + "-" + day;
        if(compareDate(nowDate)>that.reportTime){
          that.$message.error("报到时间不能小于当前时间,请选择正确的时间！")
        }
      },
      //点击下一步，保存数据
      saveMsg(){
        //必填项
        let that=this;

        let obj={
          name:that.name,
          mobile:that.phone,
          email:that.email,
          position:that.post,
          department:that.departmentId,
          reportTime:that.reportTime,
          reportAddr:that.reportAddress,
          reportContacts:that.reportContact,
          contactsMobile:that.reportContactPhone,
          salary:that.basicSalary,
          salaryType:that.salary,
          // bonus:that.basicBonus,//奖金
          // bonusType:that.bonus,
          bonusRemark:that.salaryNote,//薪资备注
          employeeType:that.workType,//员工类型
          probation:that.probatio//试用期
        };

        if(that.$route.params.offerId==null){
          // console.log(that.$route.params.offerId)

        }else{
          obj.id=that.$route.params.offerId;
        }

        that.$http({
          url:api.sendOffer,
          method:'post',
          data:obj,
          headers:headers(),
        }).then((res)=>{
          console.log(res);
          if(res.data.code==10000){
              let data=res.data.data;
              let html=data.html;
              let id=data.id;
              localStorage.setItem("html",html);
              localStorage.setItem("offerName",that.name);
              that.$router.push("/previewOffer/"+id)
          }else{

          }
        }).catch((res)=>{
          that.message.error(res.msg||res.data.msg)
        });


      },

      //展示填写过的数据
      offerDetail(){
        let that=this;
        that.$http({
          url:api.offerDetail+that.$route.params.offerId,
          method:'get',
          headers:headers(),
        }).then((res)=>{
          console.log(res);
          if(res.data.code==10000){
            let data=res.data.data;
            that.name=data.name;
            that.phone=data.mobile;
            that.email=data.email;
            that.post=data.position;
            that.departmentId=data.department;//部门id
            that.department=data.departmentName;//部门名称

            that.reportTime=that.formatDate(data.reportTime);
            that.reportAddress=data.reportAddr;
            that.reportContact=data.reportContacts;
            that.reportContactPhone=data.contactsMobile;
            that.basicSalary=data.salary;
            that.salary=data.salaryType;//
            if(data.salaryType==1){
              that.salary='1';//'日薪';
            }else if(data.salaryType==2){
              that.salary='2';//'月薪';
            }else if(data.salaryType==3){
              that.salary='3';//'年薪';
            }else{
              that.salary='';
            }
              // bonus:that.basicBonus,//奖金
              // bonusType:that.bonus,
            that.salaryNote=data.bonusRemark;//薪资备注
            that.workType=data.employeeType;//员工类型
            if(data.employeeType==0){
              that.workType='0';//'全职';
            }else if(data.employeeType==1){
              that.workType='1'//'兼职';
            }else if(data.employeeType==2){
              that.workType='2';//'实习';
            }else{
              that.workType='';
            }
            that.probatio=data.probation;//试用期
            if(data.probation==0){
              that.probatio='0';//'免试用期';
            }else if(data.probation==1){
              that.probatio='1';//'1个月';
            }else if(data.probation==2){
              that.probatio='2';//'2个月';
            }else if(data.probation==3){
              that.probatio='3'//'3个月';
            }else if(data.probation==4){
              that.probatio='4'//'4个月';
            }else if(data.probation==5){
              that.probatio='5'//'5个月';
            }else if(data.probation==6){
              that.probatio='6';//'6个月';
            }else{
              that.probatio='';
            }
          }
        }).catch((res)=>{
          that.message.error(res.msg||res.data.msg)
        });
      }

    },
    mounted() {
      let that=this;
      // that.companyStructure();

      //回显数据
      if(that.$route.params.offerId!=null){
        that.offerDetail();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
  .main .right-content .content .headline{
    margin: 0;
  }
  .sendOfferMain .sendOfferSteps .sendOffer-status .sendOffer_two span,
  .sendOfferMain .sendOfferSteps .sendOffer-status .sendOffer_three span{
    color: #97A2B3;
  }
  .sendOfferMain .personDataBox .personData .inputBox .input-group .vertical{
    vertical-align: unset;
  }
  .position{
    width: 49px;
    display: inline-block;
  }
  .sendOfferMain .personDataBox .personData .inputBox.salaryPackage .items{
    width: 100%;
  }
  .sendOfferMain .personDataBox .personData .inputBox.salaryPackage .items .input-group label{
    min-width:62px;
    display: inline-block;
    text-align: right;
  }
  .sendOfferMain .personDataBox .personData .inputBox.salaryPackage .items .special{
  }
  .special_textarea{
    margin: 20px 0 0;
  }
  .special_textarea textarea{
    font-size: 14px;
  }
  .departmentTree{
    height: 279px;
    overflow: auto;
  }

</style>
