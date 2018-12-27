<template>  
  <div >
   <div class="main">
          <!--顶部导航-->
        <pageheader class="pageheader"></pageheader>
          <!--侧边栏-->
          <div class="aside">
            <pageaside></pageaside>
          </div>
          <!-- 弹窗-添加招聘负责人 -->
            <createLd   @dataList ="getPageList" :createVisible.sync="dialog.cteate" @hideModel="hideChildModal"></createLd>
          <!-- 弹窗-添加面试官 -->
            <inteview  @dataList ="getPageList2" :createVisible.sync="dialog.interview" @hideModel="hideChildModal"></inteview>
          <!--右侧内容栏-->
        <div class="right-content pull-right">
            <div class="content">
                <p class="headline">
                    <span>添加招聘职位</span>
                </p>
                <el-row>
              <!--创建职位左侧栏  -->
                  <el-col :span='5' >
                    <div class="asidePosition">
                        <h4>职位设置</h4>
                        <p>招聘状态</p>
                        <ul class="asideUl">
                          <li @click="recruitPosition('1')" :class="{asideLi:signs1}">招聘职位</li>
                          <li @click="recruitPosition('0')" :class="{asideLi:signs2}">暂不招聘</li>  
                        </ul>
                        <div class="manage_position">
                           <span class="ly_s">
                             <span>招聘负责人<img class="cus_img"  src="../../assets/img/zhiwei/zhiwei_ic_bitian.png" alt=""></span>
                             <span v-if="!isShow"  @click="addInterview('cteate')"><img class="img_icons cus_img" src="../../assets/img/zhiwei/tanchuang_ic_screen.png" alt=""></span>   
                           </span> 
                           <ul v-if="isShow">
                               <li>
                                 <span class="name_f">{{pagelist.employeeName?pagelist.employeeName.substr(0, 1):''}}</span> 
                                  <span style="float:left;">
                                    <p>{{pagelist.employeeName}}</p> 
                                    <p>{{pagelist.deptName}}-{{pagelist.position}}</p>    
                                  </span>
                                  <i @click="delList(0)" class="icon_close_sty"><img class="cus_img" src="../../assets/img/zhiwei/zhiwei_ic_del.png" alt=""></i>
                               </li>
                           </ul>
                        </div>
                        <div class="manage_position">
                           <span class="ly_s">
                             <span>面试官 </span>
                             <span  @click="addInterview('interview')">
                               <img  v-if="!isShow2" class="img_icons cus_img" src="../../assets/img/zhiwei/tanchuang_ic_add.png" alt=""></span>   
                           </span> 
                           <ul v-if="isShow2">
                               <li>
                                 <span class="name_f">{{pagelist2.employeeName?pagelist2.employeeName.substr(0, 1):''}}</span> 
                                  <span style="float:left;">
                                    <p>{{pagelist2.employeeName}}</p> 
                                    <p>{{pagelist2.deptName}}-{{pagelist2.position}}</p>    
                                  </span>
                                  <i @click="delList(1)" class="icon_close_sty"><img class="cus_img" src="../../assets/img/zhiwei/zhiwei_ic_del.png" alt=""></i>
                               </li>
                           </ul>
                        </div>
                        <el-row class="date_sty" style="margin-top:40px;">    
                              <p >选择开始招聘时间 </p>
                              <el-date-picker v-model="startTime"  value-format="yyyy-MM-dd" style="width: 280px;margin-top:15px" type="date" placeholder="选择日期"></el-date-picker> 
                        </el-row>
                         <el-row class="date_sty" style="margin-top:40px;">    
                              <p >选择目标完成时间 </p>
                               <el-date-picker v-model="endTime"  value-format="yyyy-MM-dd" style="width: 280px;margin-top:15px" type="date" placeholder="选择日期"></el-date-picker>                               
                        </el-row>
                    </div>  
                  </el-col> 
              <!--创建职位右边部分  -->
                  <el-col :span='19' >
                    <div class="positionTable">
                       <h4>职位信息</h4> 
                        <el-form :model="makeNormal" :rules="rules"  ref="makeNormal" id="re_style2">
                              <el-row class="rowspan_sty">
                                  <el-col :span='6' >
                                      <el-form-item label="" prop="name">
                                        <span>职位名称<img src="../../assets/img/zhiwei/zhiwei_ic_bitian.png" alt="">
                                            <el-input maxlength="18" v-model="makeNormal.name" placeholder="请输入职位名称"></el-input>
                                        </span>
                                    </el-form-item>
                                  </el-col>
                                  <el-col :span='6'  :offset="2">
                                    <el-form-item label="" v-clickoutside="handleClose2"  prop="detpart">
                                        <span>用人部门<img src="../../assets/img/zhiwei/zhiwei_ic_bitian.png" alt="">
                                            <el-input  readonly  v-model="makeNormal.detpart"  @click.native="treeClick"   class="el-icon-arrow-down"  placeholder="请选择用人部门"></el-input>
                                             <div v-if="treeVisabled" class="form_tree" >
                                                    <treeSearch  :tree-datas="treeDatas" v-on:treeHiden='getstatus' v-on:getId="getLabel" ></treeSearch>
                                              </div>
                                        </span>  
                                    </el-form-item>
                                  </el-col> 
                                  <el-col :span='6'  :offset="2"> 
                                      <el-form-item label=""  prop="type">
                                          <span>职位性质<img src="../../assets/img/zhiwei/zhiwei_ic_bitian.png" alt="">
                                            <el-radio-group v-model="makeNormal.type" >
                                                <el-radio-button label="0" >全职</el-radio-button>
                                                <el-radio-button label="1">兼职</el-radio-button>
                                                <el-radio-button label="2">实习</el-radio-button>
                                            </el-radio-group>
                                          </span>
                                      </el-form-item>
                                  </el-col>    
                              </el-row>
                              <el-row class="rowspan_sty">
                                 <el-col :span='6'>  
                                    <el-form-item label="">
                                        <span>工作城市
                                            <el-select v-model="makeNormal.city" placeholder="请选择工作城市" @change="checkInput">
                                                <el-option v-for="item in addressList" :key='item.id' :value="item.cityAddress">{{item.city}}{{item.address}}</el-option>
                                            </el-select>
                                        </span>
                                        <i class="tixin">如果同个职位在多个城市招聘，请分开添加招聘职位</i>
                                    </el-form-item>
                                  </el-col> 
                                  <el-col :span='6'  :offset="2">  
                                      <el-form-item label="">   
                                        <span>薪资范围 <br>
                                            <el-input type="number"  v-model="makeNormal.salaryLow" class="qian" style="width:130px" ></el-input><i style="color:#D8D8D8;"> — </i>
                                            <el-input type="number"  v-model="makeNormal.salaryHigh" class="qian" style="width:130px" ></el-input>
                                        </span>
                                      </el-form-item>
                                  </el-col>
                                  <el-col :span='6'  :offset="2">  
                                      <el-form-item label="">     
                                        <span>工作经验
                                            <el-select v-model="makeNormal.work" placeholder="请选择工作经验">
                                                <el-option label="应届毕业生" value="0"></el-option>
                                                <el-option label="一年以下" value="1"></el-option>
                                                <el-option label="1-3年" value="2"></el-option>
                                                <el-option label="3-5年" value="3"></el-option>
                                                <el-option label="5-10年" value="4"></el-option>
                                                <el-option label="10年以上" value="4"></el-option>
                                            </el-select>
                                        </span>
                                      </el-form-item>
                                  </el-col>
                              </el-row>
                              <el-row class="rowspan_sty">
                                 <el-col :span='6'>  
                                    <el-form-item label="">
                                      <span>学历要求
                                            <el-select v-model="makeNormal.education" placeholder="请选择学历要求">
                                              <el-option label="研究生（博士及以上）" value="0"></el-option>
                                              <el-option label="研究生（MBA）" value="1"></el-option>
                                              <el-option label="研究生（硕士）" value="2"></el-option>
                                              <el-option label="本科" value="3"></el-option>
                                              <el-option label="大专" value="4"></el-option>
                                              <el-option label="高中（中专）及以学历" value="5"></el-option>
                                          </el-select>
                                      </span>
                                    </el-form-item>
                                  </el-col> 
                                  <el-col :span='6'  :offset="2">  
                                      <el-form-item label="">
                                        <span>招聘人数
                                            <el-input  @keyup.native="handleInput()" v-model="makeNormal.number" placeholder="请输入招聘人数"></el-input>
                                        </span>
                                      </el-form-item>
                                  </el-col>  
                              </el-row>
                              <el-row class="area_sty">
                                  <el-form-item label="职位描述"><br>
                                        <textarea  @input="checkMsg" v-model="makeNormal.positionDescribe" maxlength="1000" class="postion_affter" style="width:1100px;min-width:900px;height:220px" placeholder="请输入职位描述"></textarea>
                                  </el-form-item>
                                  <i><em>{{son}}</em>/1000</i>
                             </el-row>
                             <el-row>
                               <el-col>
                                  <el-button :class="searchBtnClass" :disabled="searchDisabled" @click="createSubmit()" class="createBut">创建职位</el-button>
                               </el-col>
                             </el-row>  
                        </el-form>
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
  import treeSearch from '@/components/common/treeSearch'
  import createLd from './common/createLd'
  import inteview from './common/inteview'

// duanyanhong
// 2018.12.2
// 自定义控制员工架构下拉框点击空白处隐藏
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};
export default {
  name: 'jobmanageindex',
	components: {
   	pageheader,
    pageaside,
    treeSearch,
    createLd,
    inteview,
	},
   data() {
      return {
       signs1:false,//左侧tab切换显示隐藏
       signs2:true,//左侧tab切换显示隐藏
       isShow:false,//招聘负责人显示隐藏
       isShow2:false,//招聘负责人显示隐藏
       treeVisabled:false,//人事部门
       recruitStatus:'1',//招聘岗位状态
       positionId:'',//职位id
       dptId:'',//部门id
       treeDatas:[],//人员部门架构
       addressList:[],//企业地址集合
       pagelist:[],//负责人
       pagelist2:[],//面试官
       positionDetail:{},
       citys:'',//地址详情
       cityId:'',
       son:'1',
       pageIndex: 1,
       pageSize: 10,
       createVisible:false,
       dialog:{//弹窗
        cteate:false,
        interview:false
       },
       startTime:'',
       endTime:'',
       makeNormal:{
          name:'',
          cityShow:'',
          type:'',
          city:'',
          salaryLow:'',
          salaryHigh:'',
          work:'',
          education:'',
          number:'',
          detpart:'',
          positionDescribe:''
       },
        rules: {
          name: [
            { required: true, message: '请输入职位名称', trigger: 'blur' },
          ],
          detpart: [
            { required: true, message: '请选择用人部门', trigger: 'change' },
          ],
          type: [
            { required: true, message: '请选择职位性质', trigger: 'change' },
          ],
        },
       radio7: '1',
       radio:'0'
      };
    },
     computed:{
        //创建岗位提交按钮样式
          searchBtnClass:function () {
            if(this.makeNormal.name!="" && this.makeNormal.detpart !="" && this.makeNormal.type !="" ){
                return{
                  click_opacity:false
                }
            }else{
                return{
                  click_opacity:true
                }
            }
          },
        //创建岗位提交禁用 true
          searchDisabled:function () {
            if(this.makeNormal.name!="" && this.makeNormal.detpart !="" && this.makeNormal.type !="" ){
              return false
            }else{
              return true
            }
          },
     },
   directives: {clickoutside},
    methods: {
      handleInput() {
        this.makeNormal.number =this.makeNormal.number.replace(/[^\.\d]/g,'');
        this.makeNormal.number = this.makeNormal.number.replace('.','')
      },
      checkMsg(val) {
        var textVal = this.makeNormal.positionDescribe.length;
        this.son = 1000 - textVal;
      },
  // 获取员工架构
      getTree() {
          // that.$emit('updataTree')
          let that = this
          this.$http({
            method:"get",
            url:api.structurePerson,
            headers:headers('application/json;charset=utf-8'),
            cache:false
          }).then(function(res){
            if(res.data.code==10000 || res.data.data==null){
              that.treeDatas = res.data.data
            }else{
            that.$message.error(res.data.msg);
            }
          });
      },
      handleClose2() {//点击空白处收起弹窗
        this.treeVisabled=false
      },
    //获取企业地址
      getaddress() {
          let that = this
            this.$http({
              method:"get",
              url:api.getAddress,
              headers:headers('application/json;charset=utf-8'),
              cache:false
            }).then(function(res){
              if(res.data.code==10000 || res.data.data==null){
                that.addressList = res.data.data
                 that.addressList.forEach((ele,index) => {
                   if((ele.city+ele.address) ==that.citys) {
                     that.cityId = ele.id
                   }
                   ele['cityAddress'] = ele.city+ele.address
                 })
              }else{
              that.$message.error(res.data.msg);
              }
            });
      },  
   //招聘状态
      recruitPosition(val) {
        this.recruitStatus = val
        if(val=='1') {
          this.signs1 = false
          this.signs2 = true   
        }else {
          this.signs1 = true
          this.signs2 = false     
        }  
      }, 
   //人事架构  
      treeClick() {
       this.treeVisabled=!this.treeVisabled
      },
    //添加负责人或面试官  
      addInterview(params) {
        let this_ = this
       this_.dialog[params] = true
       console.log(params)
      },
    //监听城市选择
    checkInput(val) {
      this.citys = val
      this.getaddress()
    },  
    //创建岗位提交  
      createSubmit() {
        if(this.startTime !=='' || this.endTime !=='')  {
            // var timel =new Date().format("yyyy-MM-dd");//当前时间
                // if(this.startTime <timel ) {
                //   this.$message({
                //       message: '开始招聘时间不能小于当前日期！',
                //       type: 'error'
                //   });
                //   this.startTime=''
                //   return
                // }else 
                if(this.startTime > this.endTime) {
                this.$message({
                  message:'开始招聘时间应小于目标完成时间！',
                  type:'error'
                })
                return
            }
         }
          if(this.pagelist.id == '' ) {
             this.$message({
                message:'招聘负责人不能为空！',
                type:'error'
                })
                return
          } 
          this.$refs.makeNormal.validate((valid) => {
              if (valid) {
              let that = this
                  this.$http({
                    method:"post",
                    url:api.insertOrUpdate,
                    headers:headers('application/json;charset=utf-8'),
                    data:{
                    "id":that.positionId || '',
                    "recruitStatus":that.recruitStatus,
                    "chargeId":that.pagelist.id,
                    'interviewerId':that.pagelist2.id,
                    'startTime':that.startTime,
                    'endTime':that.endTime,
                    'name':that.makeNormal.name,
                    'deptId':that.dptId,
                    'type':that.makeNormal.type,
                    'cityId':that.cityId,
                    'salaryLow':that.makeNormal.salaryLow,
                    'salaryHigh':that.makeNormal.salaryHigh,
                    'workExperience':that.makeNormal.work,
                    'education':that.makeNormal.education,
                    'number':that.makeNormal.number,
                    'positionDescribe':that.makeNormal.positionDescribe
                  },
                    cache:false
                  }).then(function(res){
                    if(res.data.code==10000 ){
                      that.$message.success(res.data.msg)
                      that.$router.push({path:'/jobmanageindex'})
                    }else{
                    that.$message.error(res.data.msg);
                    }
                  });
              } else {
                console.log('数据不完整!');
                return false;
              }
          }); 
      },
    getPageList(val) {
      this.pagelist = val
      this.isShow = true
    },
    getPageList2(val) {
      this.pagelist2 = val
      this.isShow2 = true
    },
    //删除左侧负责人和面试官展示
    delList(val) {
      if(val =='0') {
        this.pagelist =[]
        this.isShow =false
      }
      if(val == '1') {
        this.pagelist2 =[]
        this.isShow2 =false
      }
    },
     //关闭候选人弹窗
      hideChildModal(param){
        console.log('接收的子组件数据--------->'+param);
        this.dialog[param]= false;
      },
    // 获取用人部门id
      getLabel(val){
        this.dptId = val.id
        this.makeNormal.detpart=val.label
      },
      getstatus() {
        this.treeVisabled = false
      }   
    },
    created() {
      //页面一加载就调用
      let this_ = this
      this_.getaddress()
      this_.getTree()
      this_.positionId = this_.$route.query.id
      if(this_.positionId) {
        this_.getdetail()
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >

/* 左侧样式开始 */
   .asidePosition {
      width: 340px;
      min-width: 340px;;
      height:948px;
      background: #fff;
      margin-right: 15px; 
      padding: 0px 25px; 
   } 
   .asidePosition h4 {
     font-family: MicrosoftYaHei-Bold;
    font-size: 16px;
    color: #394A66;
    letter-spacing: 0;  
    text-align: center;
   }
   .asidePosition p {
     margin:10px 0;
     font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #394A66;
    letter-spacing: 0;
   }
    .asidePosition .asideUl li  {
       float: left;   
       background: #F95714;
       width: 140px;
       height: 40px; 
       color: #fff;
       text-align: center;
       line-height: 40px;
       cursor: pointer;
    }
   .asidePosition .asideUl .asideLi {
      background-color: #fff;  
      color:#394A66;
      font-size: 15px;
      border: 1px solid #F95714;
    }
    .asidePosition .manage_position {
      
    }
    .asidePosition .manage_position .ly_s {
       display: inline-block;
       height: 19px;
       width: 100%;
       margin-top: 45px;
       padding-right: 20px;
       font-size: 14px;
    }
   .asidePosition .manage_position .img_icons {
       float: right;
   }
   .asidePosition .manage_position ul li {
       height: 50px;
       width: 100%;
       margin-top: 10px;
   }
    .asidePosition .manage_position ul li .name_f{
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
   }
    .asidePosition .manage_position .icon_close_sty {
        float: right;
        margin-right: 20px;
        margin-top: 16px;
    }
    .asidePosition .manage_position .ly_s .date_sty {
        margin-top: 15px; 
    }
    /* 左侧样式结束 */


  /* 右侧样式开始 */
    .form_tree {
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
   .positionTable {
     background-color: #fff;
      padding: 0px 25px;   
      margin-left: 30px;
      min-width: 1130px;;
   }
  .positionTable h4 {
    font-family: MicrosoftYaHei-Bold;
    font-size: 16px;
    color: #394A66;
    letter-spacing: 0;  
   }
   .positionTable .rowspan_sty span {
       display: inline-block;
       width: 300px;
       height: 40px;
       color: #394A66;
       font-size: 14px;
       line-height: 40px;
       /* margin-right:124px; */
       margin-top: 15px;
   }
   .positionTable .rowspan_sty span:nth-child(3) {
       margin-right: 0px;
   }
   .positionTable .rowspan_sty span img {
      margin-left: 5px; 
   }
   #re_style2 .el-radio-button, .el-radio-button__inner {
     margin-right: 8px; 
     height: 40px;
     width: 90px;
     border-color: #E5E5E5;
   }
   #re_style2 .el-radio-button, .el-radio-button__inner:nth-child(2) {
       border-left: 1px solid #E5E5E5;
   }
   .content {
     min-width: 1424px;;  
   }
   .rowspan_sty .qian::before {
     content: 'K';
     position: absolute;
     right:10px;
   }
   .rowspan_sty .tixin {
     font-size: 12px;
     display: inline-block;
     color:#F95714;
     position: relative;
     margin-left: 12px;
   }
   .rowspan_sty .tixin::after {
     content: '';
     background-image: url(../../assets/img/zhiwei/cuowu.png) ;
     position: absolute;
     height: 14px;
     width: 13px;
     top:13px;
     left:-15px;
   } 
   .createBut {
     background: #F95714;
     border-radius: 4px;
     height: 40px;
     width: 220px;
     color: #fff;
     margin-top: 100px;
     margin-left:35%;
   }
   .cus_img {
     cursor: pointer;
   }
  .area_sty {
    position: relative;
  }
  .area_sty i {
    position: absolute;
    bottom:46px;
    right:110px;
    color: #999;
  }
  /* 右侧样式结束 */
</style>
<style>

/* 重置默认样式 */
.date_sty .el-icon-date:before {
    content: "\E608";
    /* float: right; */
    position: absolute;
    right: -228px;
    top: 12px;
    font-size: 18px;
 } 
 .date_sty .el-input--prefix .el-input__inner   {
    padding-left:0px;
 }
 .rowspan_sty .el-input--suffix .el-input__inner {
    padding-right: 0px !important;
    padding-left:0px !important;
    width: 300px !important;
}
 .positionTable input[type=text], input[type=email], input[type=password], textarea {
    text-indent: 12px;
    padding-left: 0px;
} 
.rowspan_sty .el-radio-button__orig-radio:checked+.el-radio-button__inner {
  background-image: url('../../assets/img/zhiwei/zhiwei_ic_choose.png');
  background-repeat:no-repeat;
  background-position:100% 100%;
  transition-delay: 0s;
  transition-duration: 0s; 
  border-color:#F95714;
  background-color: #fff;
  color:#F95714;
}
#re_style2 .el-icon-arrow-down:before {
    content: "\E603";
    position: absolute;
    top: 15px;
    left: 265px;
    color: #AAADB5;
    cursor: pointer;
}

</style>



