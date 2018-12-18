<template>
  <div class="offer_third">
    <!-- 没有offer -->
      <div v-if="flag1">
        <div v-if="isshow">
              <!--无操作-->
            <div class="noOps">
              <img src="../../../assets/img/candidate/tanchuang_pic_offer2.png" alt="">
              <p>将候选人移动至「沟通offer」或「待入职」后（右侧），才可以发送offer或标记入职</p>
            </div>

            <!--缺省-->
            <div class="noOffer">
              <img src="../../../assets/img/candidate/tanchuang_pic_offer1.png" alt="">
              <p>尚无offer</p>
              <button @click="isshow = false">创建offer</button>
            </div>
         </div>
         <!-- 创建offer -->
        <div v-else class="addCandidate_content">
            <div class="standard_resume">
              <el-row>
                <el-col  :span="24">
                  <el-form :model="makeNormal" class="form_font">
                    <p class="headLine ">基本信息 </p>
                    <div class="person_sty ">
                      <el-row :gutter="120">
                        <el-col :offset="1" :span="10" >
                          <el-form-item label="offer职位">
                              <span>测试工程师</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                        <el-row :gutter="120">
                        <el-col :offset="1" :span="10" >
                          <el-form-item label="用人部门">
                              <span>华趣集团/棋至文化/爱猎评</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="120">
                        <el-col :offset="1" :span="18" >
                          <el-form-item label="预计入职时间">
                              <el-date-picker v-model="makeNormal.salaryLow"  value-format="yyyy-MM-dd"  type="date" placeholder="请选择入职时间"></el-date-picker> 
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                      <p class="headLine ">报道信息 </p>
                      <div class="person_sty ">
                          <el-row :gutter="120">
                              <el-col :offset="1" :span="18" >
                                <el-form-item label="报道时间">
                                    <el-date-picker v-model="makeNormal.cityShow"  value-format="yyyy-MM-dd"  type="date" placeholder="请选择报道时间"></el-date-picker> 
                                    <el-date-picker v-model="makeNormal.detpart"  value-format="yyyy-MM-dd"  type="date" placeholder="请选择面试具体时间"></el-date-picker> 
                                </el-form-item>
                              </el-col>
                        </el-row>
                          <el-row :gutter="120">
                              <el-col :offset="1" :span="18" >
                                <el-form-item label="报道地点">
                                  <el-select v-model="makeNormal.work" placeholder="请选择报道地点">
                                      <el-option label="应届毕业生" value="0"></el-option>
                                      <el-option label="一年以下" value="1"></el-option>
                                      <el-option label="1-3年" value="2"></el-option>
                                      <el-option label="3-5年" value="3"></el-option>
                                      <el-option label="5-10年" value="4"></el-option>
                                      <el-option label="10年以上" value="4"></el-option>
                                  </el-select>
                                </el-form-item>
                              </el-col>
                        </el-row>
                          <el-row :gutter="690">
                              <el-col :offset="1" :span="18" >
                                <el-form-item label="薪资">
                                  <el-select v-model="makeNormal.work" placeholder="请选择薪资形式">
                                      <el-option label="现金" value="0"></el-option>
                                      <el-option label="银行卡" value="1"></el-option>
                                  </el-select>
                                  <el-input type="text" style="width:200px;" placeholder="请填写具体数额"></el-input>
                                </el-form-item>
                              </el-col>
                        </el-row>
                          <el-row >
                              <el-col :offset="1" :span="18" >
                                <el-form-item label="试用期时长">
                                  <el-select v-model="makeNormal.work" placeholder="请选择使用期时长">
                                      <el-option label="3个月" value="0"></el-option>
                                      <el-option label="6个月" value="1"></el-option>
                                  </el-select>
                                </el-form-item>
                              </el-col>
                        </el-row>
                      </div>   
                      <p class="headLine " style="margin-right:60px;">邮件通知候选人 </p>
                        <span style="float: right;">
                            <el-select v-model="makeNormal.work" placeholder="请选择模板">
                                  <el-option label="系统模板" value="0"></el-option>
                              </el-select>
                        </span>
                      <div class="person_sty ">
                          <div class="offer_modal">
                            <p class="title">
                              <!-- <ul>
                                <li><img src="../../../assets/img/zhiwei/tanchuang_ic_exp.png" alt=""></li>
                                <li><span class="font_sty">A</span></li>
                                <li><img src="../../../assets/img/zhiwei/tanchuang_ic_exp.png" alt=""></li>
                                <li>
                                  <i style="background-color: #F5A623 ;"></i>
                                  <i style="background-color: #69E0A6 ;"></i>
                                  <i style="background-color: #058CF6 ;"></i>
                                  <i style="background-color: #9C73DE ;"></i>
                                  <i style="background-color: #F4719D ;"></i>
                                </li>
                              </ul> -->
                            </p>
                            <div class="count_offer">
                              <p> 您好！尊敬的<span>谭迎港</span></p>
                              <p>欢迎您加入<span>上海棋至文化有限公司</span>在此荣幸的要请你出任<span>前端</span>一职</p>
                              <p>入职时间：<span>2018-11-20</span></p>
                              <p>薪酬：<span>月薪</span><span>10000</span></p>
                              <p>试用期<span style="background-color:#F5A623;color:#fff;"> 未知</span></p>
                              <p>入职地点：<span>上海市北京西路1250号13楼</span></p>
                              <p>联系人：<span>李乾坤</span></p>
                              <p>电话：<span>12545454444</span></p>
                              <p>入职所需的材料和证明</p>
                              <p>1.原单位离职证明（加盖原单位公章）1份</p>
                              <p>2.身份证原件</p>
                              <p>3.学位证、毕业证原件</p>
                              <p>4.相关资格证书原件</p>
                              <p>5.入职体检证明</p>
                              <p>请您仔细阅读此录用通知书并及时保存。请您在收到录用通知书后，请您点击底部按钮进行回复确认，在规定日期内报到办理入职</p>
                              <p>如有问题请用以上联系方式及时与我们沟通，谢谢！（系统邮件，请勿直接回复）</p>
                            </div>
                          </div>
                          <el-row >
                              <el-col :offset="1" :span="18" >
                                <el-form-item label="邮件附件">
                                  <fileUpload></fileUpload>
                                </el-form-item>
                              </el-col>
                        </el-row>
                          <el-row >
                              <el-col :offset="1" :span="18" >
                                <el-form-item label="offer生成pdf">
                                  <el-switch v-model="makeNormal.salaryLow"></el-switch>
                                </el-form-item>
                              </el-col>
                        </el-row>
                      </div>   
                  </el-form>
                    <el-row >
                          <el-col :offset="10"  >
                              <el-button type="primary" @click="submit"  style="height:36px;">保存</el-button>
                              <el-button   style="height:36px;">取 消</el-button>
                          </el-col>
                    </el-row>
                </el-col>
              </el-row>
            </div>
        </div>
     </div> 
     <!-- 已经添加offer -->
      <div v-else>
          <div class="person_sty">  
          <div class="offer_modal2">
              <p class="title2">
                <span class="methods">2018/09/08(星期一) 发送offer</span>
                <span class="removes">删除offer</span>
              </p>
              <div class="content_offer">
              <img class="up_img" src="../../../assets/img/candidate/777.png" alt="">
                <h2>尊敬的谢进</h2>
                <p>您好，欢迎您加入 <span>上海华趣文化传播有限公司</span>，在此荣幸的邀请您出任我们</p>
                <p><span>产品部PM</span> 一职。</p>
                <p>请您仔细阅读此录用通知书并及时保存。请您在收到录取通知书后，在规定日期内</p>
                <p>日报道办理入职。</p>
                <p><span class="items">1.报道信息</span></p>
                <p>请您在 <span> 2018/10/27 14:40</span> 到 <span>上海市南京东路上海商城302号</span>  办理报道</p>
                <p>报道联系人：<span>李乾坤</span> 电话：<span>12567788345</span></p>
                <p>逾期录用通知书将自动失效。</p>
                <p><span class="items">2.薪酬待遇</span></p>
                <p>基本工资：<span>月薪10000</span>元</p>
                 <p><span class="items">3.工作性质和试用期</span></p>
                <p>您的工作性质是：<span>全职</span>试用期：<span>无</span></p>
              <img class="down_img" src="../../../assets/img/candidate/666.png" alt="">
              </div>
              <img class="status_img" src="../../../assets/img/candidate/tanchuang_offer_pic_refused.png" alt="">
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import fileUpload from '@/components/common/candidate_public/candidateFile'
 
    export default {
      name: "offerThird",
      	components: {
        fileUpload
      },
      data() {
        return {
           isshow:true,
           flag1:true,
           workAddress:'',
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
        }
      },
      methods:{
        submit() {
          this.flag1 = false
        } 
      }  
    }
</script>

<style scoped>
  .active{
    color: #394A66;
  }
  .standard_status_active{
   background: #F8FAFC;
    height: 180px;
  }
  .standard_status_active .headImg{
    text-align: center;
  }
  .headLine {
      display: inline-block;
      height:24px;
      font-size:18px;
      font-family:MicrosoftYaHei-Bold;
      font-weight:bold;
      color:rgba(57,74,102,1);
      line-height:24px;
      border-left: 4px solid #f95714;
      text-indent: 10px;
      margin-bottom: 20px; 
  }
  .standard_resume {
    padding: 10px 15px;
  }
  .person_sty {
    border:none;
  }
  .person_sty .offer_modal2 {
      height: 600px;
      width: 80%;
      background: #FFFFFF;
      border: 1px solid #E5E5E5;  
      border-radius: 4px;
      margin-top: 40px;
      margin-left: 10%;

  }
  .person_sty .offer_modal2 .title2{
      height: 40px;
     background: #F2F3F5;
     padding: 10px 20px;
  }
  .person_sty .offer_modal2 .methods {
    font-size: 18px;
    font-weight: 700;
    color: #394A66; 
  }
  .person_sty .offer_modal2 .removes {
    font-size: 16px;
    font-weight: 700;
    color: #FF001F;
    float: right;
  }
  .person_sty .offer_modal2  .up_img {
    display: inline-block;
    width: 592px;
    position: absolute;
    top: 0px;
    left: 0px;
  }
  .person_sty .offer_modal2  .down_img {
    display: inline-block;
    width: 592px;
    position: absolute;
    bottom:0px;
    left: 0px;
  }
  .person_sty .offer_modal2 .status_img {
     position: absolute;
    bottom:139px;
    right: 134px;
  }
  .person_sty .offer_modal {
      height: 600px;
      width: 100%;
      background: #FFFFFF;
      border: 1px solid #E5E5E5;  
      border-radius: 4px;
  }
   .person_sty .offer_modal .title  {
     height: 40px;
     background: #F2F3F5;
     padding: 10px 20px;
   }
   .person_sty .offer_modal .title ul li {
     float: left;
     text-align: center;
     width: 60px;
   }
    .person_sty .offer_modal .title ul li:nth-child(4) {
     width: 100px;
   }
   .offer_modal .title ul .font_sty {
     font-size:20px;
   }
   .person_sty .offer_modal .title ul li i {
     display: inline-block;
     width: 10px;
     height: 10px;
     border-radius: 50%;
   }
   .offer_modal .count_offer {
     width: 100%;
     padding: 30px;
     color: #748093;
     font-size: 15px;
   }
   .offer_modal .count_offer p {
     margin-top:10px;
   }
   .offer_modal .count_offer span {
     background: #F2F3F5;
     color: #394A66 ;
     display: inline-block;
     padding: 3px 5px;
     margin-left: 10px;
   }
   .person_sty .content_offer {
     height: 500px;
     width:86%;
     background: #F9F9F9;
     margin: 30px auto;
     padding: 40px 30px;
     clear: #748093;
     font-size: 15px;
     position: relative;
     background-image: url('../../../assets/img/candidate/777.png') no-repeat;
   }
   .person_sty .content_offer h2 {
     font-size: 18px;
     color:#394A66;
     font-weight: 700;
   }
   .person_sty .content_offer p {
      margin-top:10px;
      margin-left: 10px;
      height: 26px;
   }
    .person_sty .content_offer p span {
      font-size: 16px;
      color:#394A66;
      font-weight: 600;
    }
    .person_sty .content_offer .items {
      font-family: MicrosoftYaHei-Bold;
      font-size: 16px;
      color: #748093;
    }
</style>
