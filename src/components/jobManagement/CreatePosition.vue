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
                             <span ><img class="img_icons" src="../../assets/img/zhiwei/tanchuang_ic_screen.png" alt=""></span>   
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
                             <span ><img class="img_icons" src="../../assets/img/zhiwei/tanchuang_ic_add.png" alt=""></span>   
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
                  <el-col :span='19' >
                    <div class="positionTable">
                       <h4>职位信息</h4> 
                          <el-form :model="makeNormal"  ref="makeNormal" id="re_style">
                            <el-row class="row_sty">
                                <span>职位名称<img src="../../assets/img/zhiwei/zhiwei_ic_bitian.png" alt="">
                                    <el-input placeholder="请输入内容"></el-input>
                                </span>
                                <span>用人部门<img src="../../assets/img/zhiwei/zhiwei_ic_bitian.png" alt="">
                                    <el-input placeholder="请输入内容"></el-input>
                                </span>  
                                <span>职位性质<img src="../../assets/img/zhiwei/zhiwei_ic_bitian.png" alt="">
                                    <el-radio-group >
                                        <el-radio-button label="全职"></el-radio-button>
                                        <el-radio-button label="兼职"></el-radio-button>
                                        <el-radio-button label="实习"></el-radio-button>
                                    </el-radio-group>
                                </span>
                            </el-row>
                            <el-row class="row_sty">
                                <span>工作城市
                                    <el-input placeholder="请输入内容"></el-input>
                                </span>
                                <span>薪资范围
                                    <el-input placeholder="请输入内容"></el-input>
                                </span>  
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
                            </el-row>
                              <el-row class="row_sty">
                                <span>职位名称
                                    <el-input placeholder="请输入内容"></el-input>
                                </span>
                                <span>用人部门
                                    <el-input placeholder="请输入内容"></el-input>
                                </span>  
                            </el-row>
                            <el-row>
                              <el-form-item label="评价备注">
                                    <el-input type="textarea" style="width:100%;" placeholder="请输入评价"></el-input>
                               </el-form-item>
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

export default {
  name: 'jobmanageindex',
	components: {
	pageheader,
    pageaside,
	},
   data() {
      return {
       signs1:false,//左侧tab切换显示隐藏
       signs2:true,//左侧tab切换显示隐藏
       isShow:true,//招聘负责人显示隐藏
       makeNormal:{
          region:'', 
       },
       radio7: '1',
      };
    },
    watch:{
       
      },
    methods: {
   //招聘
   recruitPosition(val) {
       console.log(val)
     if(val=='0') {
       this.signs1 = false
       this.signs2 = true   
     }else {
       this.signs1 = true
       this.signs2 = false     
     }  
   }     
    },
    mounted() {
    },
    created() {

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
       margin-right:124px;
       margin-top: 30px;
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
</style>



