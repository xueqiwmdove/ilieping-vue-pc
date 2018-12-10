<template>  
  <div >
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
                          <li @click="recruitPosition('0')" :class="{asideLi:signs1}">招聘职位</li>
                          <li @click="recruitPosition('1')" :class="{asideLi:signs2}">暂不招聘</li>  
                        </ul>
                        <div class="manage_position">
                           <span class="ly_s">
                             <span>招聘负责人<img src="../../assets/img/zhiwei/zhiwei_ic_bitian.png" alt=""></span>
                             <span  @click="addInterview(0)"><img class="img_icons" src="../../assets/img/zhiwei/tanchuang_ic_screen.png" alt=""></span>   
                           </span> 
                           <ul v-if="isShow">
                               <li>
                                 <span class="name_f">李</span> 
                                  <span style="float:left;">
                                    <p>段小妹</p> 
                                    <p>爱猎评事业部-HR</p>    
                                  </span>
                                  <i class="icon_close_sty"><img src="../../assets/img/zhiwei/zhiwei_ic_del.png" alt=""></i>
                               </li>
                           </ul>
                        </div>
                        <div class="manage_position">
                           <span class="ly_s">
                             <span>面试官 </span>
                             <span  @click="addInterview(1)"><img class="img_icons" src="../../assets/img/zhiwei/tanchuang_ic_add.png" alt=""></span>   
                           </span> 
                           <ul v-if="isShow">
                               <li>
                                 <span class="name_f">李</span> 
                                  <span style="float:left;">
                                    <p>段小妹</p> 
                                    <p>爱猎评事业部-HR</p>    
                                  </span>
                                  <i class="icon_close_sty"><img src="../../assets/img/zhiwei/zhiwei_ic_del.png" alt=""></i>
                               </li>
                           </ul>
                        </div>
                         <div class="manage_position">
                           <span class="ly_s">
                             <span>选择开始招聘时间 </span>
                             <el-row class="date_sty">
                                <el-date-picker style="width: 280px;" type="date" placeholder="选择日期"></el-date-picker> 
                             </el-row>
                           </span> 
                        </div>
                         <div class="manage_position">
                           <span class="ly_s">
                             <span>选择目标完成时间 </span>
                             <el-row class="date_sty">
                                <el-date-picker style="width: 280px;" type="date" placeholder="选择日期"></el-date-picker> 
                             </el-row>
                           </span> 
                        </div>
                    </div>  
                  </el-col> 
              <!--创建职位右边部分  -->
                  <el-col :span='19' >
                    <div class="positionTable">
                       <h4>职位信息</h4> 
                        <el-form :model="makeNormal"  ref="makeNormal" id="re_style">
                              <el-row class="row_sty">
                                  <el-col :span='6' >
                                      <el-form-item label="">
                                        <span>职位名称<img src="../../assets/img/zhiwei/zhiwei_ic_bitian.png" alt="">
                                            <el-input placeholder="请输入职位名称"></el-input>
                                        </span>
                                    </el-form-item>
                                  </el-col>
                                  <el-col :span='6'  :offset="2">
                                    <el-form-item label="" v-clickoutside="handleClose2">
                                        <span>用人部门<img src="../../assets/img/zhiwei/zhiwei_ic_bitian.png" alt="">
                                            <el-input v-model="makeNormal.detpart"  @click.native="treeClick"   class="el-icon-arrow-down"  placeholder="请输入内容"></el-input>
                                             <div v-if="treeVisabled" class="form_tree" >
                                                    <treeSearch  :tree-datas="treeDatas" v-on:treeHiden='getstatus' v-on:getId="getLabel" ></treeSearch>
                                              </div>
                                        </span>  
                                    </el-form-item>
                                  </el-col> 
                                  <el-col :span='6'  :offset="2"> 
                                      <el-form-item label="">
                                          <span>职位性质<img src="../../assets/img/zhiwei/zhiwei_ic_bitian.png" alt="">
                                            <el-radio-group v-model="radio" >
                                                <el-radio-button label="0" >全职</el-radio-button>
                                                <el-radio-button label="1">兼职</el-radio-button>
                                                <el-radio-button label="2">实习</el-radio-button>
                                            </el-radio-group>
                                          </span>
                                      </el-form-item>
                                  </el-col>    
                              </el-row>
                              <el-row class="row_sty">
                                 <el-col :span='6'>  
                                    <el-form-item label="">
                                        <span>工作城市
                                              <el-select v-model="makeNormal.region1" placeholder="请选择活动区域">
                                                <el-option label="上海陆家嘴" value="0"></el-option>
                                                <el-option label="上海静安寺" value="1"></el-option>
                                                <el-option label="上海松江" value="2"></el-option>
                                            </el-select>
                                        </span>
                                        <i class="tixin"><img src="../../assets/img/zhiwei/cuowu.png" alt="">如果同个职位在多个城市招聘，请分开添加招聘职位</i>
                                    </el-form-item>
                                  </el-col> 
                                  <el-col :span='6'  :offset="2">  
                                      <el-form-item label="">   
                                        <span>薪资范围 <br>
                                            <el-input class="qian" style="width:130px" ></el-input><i style="color:#D8D8D8;"> — </i>
                                            <el-input class="qian" style="width:130px" ></el-input>
                                        </span>
                                      </el-form-item>
                                  </el-col>
                                  <el-col :span='6'  :offset="2">  
                                      <el-form-item label="">     
                                        <span>工作经验
                                            <el-select v-model="makeNormal.region" placeholder="请选择活动区域">
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
                              <el-row class="row_sty">
                                 <el-col :span='6'>  
                                    <el-form-item label="">
                                      <span>学历要求
                                            <el-select v-model="makeNormal.type" placeholder="请选择活动区域">
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
                                            <el-input placeholder="请输入招聘人数"></el-input>
                                        </span>
                                      </el-form-item>
                                  </el-col>  
                              </el-row>
                              <el-row class="area_sty">
                                  <el-form-item label="职位描述"><br>
                                        <el-input type="textarea" :rows='7' style="width:1050px;" placeholder="请输入职位描述"></el-input>
                                  </el-form-item>
                             </el-row>
                             <el-row>
                               <el-col>
                                  <el-button class="createBut">创建职位</el-button>
                               </el-col>
                             </el-row>  
                        </el-form>
                    </div>  
                  </el-col> 
                </el-row>
              <!-- 弹窗-添加招聘负责人 -->
                  <el-dialog title="添加招聘负责人" width="540px" :visible.sync="cerateLd" class="create_dialog" custom-class="create_dialog" :before-close="closeCreate" >
                          <el-form :model="cerateList"  ref="cerateList" >
                              <el-form-item  style="text-align:center;" >
                                 <div v-if="isflag" class="manage_se">
                                    <ul>
                                        <li>
                                          <span style="float:left;margin-left:50px;">招聘负责人</span>
                                          <span class="name_f">李</span> 
                                            <span style="float:left;">
                                              <p>段小妹</p> 
                                              <p>爱猎评事业部-HR</p>    
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <el-input v-else style="width:280px;height:40px;"  @click.native="ldClick"  v-model="cerateList.region"  placeholder="选择招聘负责人"  class="el-icon-arrow-down"></el-input>
                                      <div v-if="ldVisabled" class="form_tree tree_sty manage_sty " >
                                        <el-scrollbar style="height:100%" >   
                                         <div style="height:100%">
                                           <div class="search">
                                              <el-input  class="input_search" placeholder="输入你想搜索的内容" >
                                                <i  slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                                              </el-input>
                                           </div>
                                            <ul>
                                                <li @click="selectItem">
                                                  <span class="name_f">李</span> 
                                                    <span style="float:left;">
                                                      <p>段小妹</p> 
                                                      <p>爱猎评事业部-HR</p>    
                                                    </span>
                                                </li>
                                            </ul>
                                         </div>  
                                        </el-scrollbar> 
                                      </div>
                              </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                  <el-button type="primary"   style="height:36px;">提交</el-button>
                                  <el-button  @click="closeCreate" style="height:36px;">取 消</el-button>
                            </div>
                  </el-dialog>
                <!-- end-->
                  <!-- 弹窗-添加面试官 -->
                  <el-dialog title="添加面试官" width="540px" :visible.sync="inteview" class="create_dialog" custom-class="create_dialog" :before-close="closeInterview" >
                          <el-form :model="cerateList"  ref="cerateList" >
                              <el-form-item  style="text-align:center;" >
                                 <div v-if="isflag" class="manage_se">
                                    <ul>
                                        <li>
                                          <span style="float:left;margin-left:50px;">面试官</span>
                                          <span class="name_f">李</span> 
                                            <span style="float:left;">
                                              <p>段小妹</p> 
                                              <p>爱猎评事业部-HR</p>    
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <el-input v-else style="width:280px;height:40px;"  @click.native="ldClick"  v-model="cerateList.region"  placeholder="选择面试官"  class="el-icon-arrow-down"></el-input>
                                      <div v-if="ldVisabled" class="form_tree tree_sty manage_sty " >
                                        <el-scrollbar style="height:100%" >   
                                         <div style="height:100%">
                                           <div class="search">
                                              <el-input  class="input_search" placeholder="输入你想搜索的内容" >
                                                <i  slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
                                              </el-input>
                                           </div>
                                            <ul>
                                                <li @click="selectItem">
                                                  <span class="name_f">李</span> 
                                                    <span style="float:left;">
                                                      <p>段小妹</p> 
                                                      <p>爱猎评事业部-HR</p>    
                                                    </span>
                                                </li>
                                            </ul>
                                         </div>  
                                        </el-scrollbar> 
                                      </div>
                              </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                  <el-button type="primary"   style="height:36px;">提交</el-button>
                                  <el-button  @click="closeInterview" style="height:36px;">取 消</el-button>
                            </div>
                  </el-dialog>
                <!-- end-->
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
	},
   data() {
      return {
       signs1:false,//左侧tab切换显示隐藏
       signs2:true,//左侧tab切换显示隐藏
       isShow:true,//招聘负责人显示隐藏
       treeVisabled:false,//人事部门
       cerateLd:false,//添加负责人弹窗
       ldVisabled:false,
       inteview:false,//添加面试官弹窗
       treeDatas:[],
       isflag:false,
       cerateList:{
         region:''
       },
       makeNormal:{
          region:'',
          region:'',
          type:'' ,
          detpart:''
       },
       radio7: '1',
       radio:'0'
      };
    },
    watch:{
       
      },
   directives: {clickoutside},
    methods: {
  // 获取员工架构
      getTree() {
          // that.$emit('updataTree')
          let that = this
          this.$http({
            method:"get",
            url:api.treeList,
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
      handleClose2() {
        this.treeVisabled=false
      },
     //选择招聘负责人 
      selectItem() {
        this.ldVisabled=false
        this.isflag = true
      },  
   //招聘状态
      recruitPosition(val) {
          console.log(val)
        if(val=='0') {
          this.signs1 = false
          this.signs2 = true   
        }else {
          this.signs1 = true
          this.signs2 = false     
        }  
      }, 
      positionS(val) {
        console.log(val)
      },
   //人事架构  
      treeClick() {
       this.treeVisabled=!this.treeVisabled
      },
    //添加面试官  
      addInterview(val) {
        if(val =='0') {
           this.cerateLd = true
        }
        if(val == '1') {
          this.inteview = true
        }
      }, 
    //关闭创建岗位弹窗
    closeCreate() {
      this.isflag = false
      this.ldVisabled=false
      this.cerateLd = false
    }, 
    //关闭面试官弹窗
    closeInterview() {
      this.isflag = false
      this.ldVisabled=false
      this.inteview = false
    } ,
  //招聘负责人  
    ldClick() {
      this.ldVisabled = !this.ldVisabled
    },
    // 获取label
      getLabel(val){
        this.makeNormal.detpart=val.label
      },
      getstatus() {
        this.treeVisabled = false
      }   
    },
    mounted() {

    },
    created() {
      this.getTree()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
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
    .manage_sty  ul li .name_f{
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
    .manage_sty  ul {
      padding-top:55px;
    }
   .manage_sty  ul li  p {
     height: 30px;
     text-align: left;
     line-height: 30px;
   }
   .manage_sty ul li {
       height: 60px;
       width: 100%;
       margin-top: 10px;
       cursor: pointer;
       line-height: 50px;
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
    /* .manage_se ul {
      padding-top:0px;
    } */
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
   .positionTable {
     background-color: #fff;
      padding: 0px 25px;   
      margin-left: 30px;
      min-width: 800px;;
   }
  .positionTable h4 {
    font-family: MicrosoftYaHei-Bold;
    font-size: 16px;
    color: #394A66;
    letter-spacing: 0;  
   }
   .positionTable .row_sty span {
       display: inline-block;
       width: 300px;
       height: 40px;
       color: #394A66;
       font-size: 14px;
       line-height: 40px;
       /* margin-right:124px; */
       margin-top: 15px;
   }
   .positionTable .row_sty span:nth-child(3) {
       margin-right: 0px;
   }
   .positionTable .row_sty span img {
      margin-left: 5px; 
   }
   #re_style .el-radio-button, .el-radio-button__inner {
     margin-right: 8px; 
     height: 40px;
     width: 90px;
     border-color: #E5E5E5;
   }
   #re_style .el-radio-button, .el-radio-button__inner:nth-child(2) {
       border-left: 1px solid #E5E5E5;
   }
   .content {
     min-width: 1366px;;  
   }
   .row_sty .qian::before {
     content: 'K';
     position: absolute;
     right:10px;
   }
   .row_sty .tixin {
     font-size: 12px;
     display: inline-block;
     color:#F95714;
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
    .create_dialog .el-icon-arrow-down:before {
      content: "\E603";
      position: absolute;
      top: 15px;
      left: 253px;
      color: #AAADB5;
      cursor: pointer;
}
.create_dialog .manage_sty {
    left: 22%;
    width: 280px; 
}
.manage_sty .search {
  float: right;
  width: 400px;
  height: 40px;
  margin-top: 30px;
  position: relative;
  left: -70px;

}
.manage_sty .search .input_search {
  width: 260px;
  position: absolute;
  top:-21px;
  /* width: 260px; */
  
}
.manage_sty .search .input_search .se_icon {
  position: absolute;
  right:-244px;
  height: 30px;
  top:8px;
  font-size: 18px;
  font-weight: 700;
  border-left: 1px solid #E5E5E5;
  color: #F95714;
}
.manage_sty .search .el-icon-search:before {
    content: "\E619";
    margin-left: 5px;
}

</style>
<style>
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
 .row_sty .el-input--suffix .el-input__inner {
    padding-right: 0px !important;
    padding-left:0px !important;
    width: 300px !important;
}
 .positionTable input[type=text], input[type=email], input[type=password], textarea {
    text-indent: 12px;
    padding-left: 0px;
} 
.row_sty .el-radio-button__orig-radio:checked+.el-radio-button__inner {
  background-image: url('../../assets/img/zhiwei/zhiwei_ic_choose.png');
  background-repeat:no-repeat;
  background-position:100% 100%;
  border-color:#F95714;
  background-color: #fff;
  color:#F95714;
}
#re_style .el-icon-arrow-down:before {
    content: "\E603";
    position: absolute;
    top: 15px;
    left: 265px;
    color: #AAADB5;
    cursor: pointer;
}
 .create_dialog .manage_sty .el-scrollbar__wrap {
  overflow-x: hidden !important;
 }
 .create_dialog .el-input--prefix .el-input__inner {
   padding-left:0px;
 }
  .create_dialog .el-input--prefix .el-input__inner {
   padding-left:0px;
 }
</style>



