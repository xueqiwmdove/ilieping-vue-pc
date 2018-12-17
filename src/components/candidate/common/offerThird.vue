<template>
  <div class="offer_third">
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
          <button @click="isshow = flase">创建offer</button>
        </div>
      </div>
     <div v-else class="addCandidate_content">
      <div class="standard_resume">
         <el-row>
           <el-col  :span="24">
             <el-form>
               <p class="headLine ">基本信息 <i style="margin-left:5px;"> <img src="../../../assets/img/zhiwei/cuowu.png" alt=""></i></p>
               <div class="person_sty ">
                 <el-row :gutter="80">
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="">
                         <el-select v-model="workAddress" placeholder="初试">
                              <el-option label="初试" value="0"></el-option>
                              <el-option label="复试" value="1"></el-option>
                              <el-option label="终试" value="0"></el-option>
                              <el-option label="HR面试" value="1"></el-option>
                          </el-select>
                     </el-form-item>
                   </el-col>
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="">
                         <el-select v-model="workAddress" placeholder="面试形式">
                              <el-option label="现场面试" value="0"></el-option>
                              <el-option label="电话面试" value="1"></el-option>
                              <el-option label="视频面试" value="0"></el-option>
                          </el-select>
                     </el-form-item>
                   </el-col>
                   <el-col :lg="8" :md="8" :sm="8">
                     <el-form-item label="">
                       <el-input v-model="workAddress" placeholder="选择面试官，支持搜索"></el-input>
                     </el-form-item>
                   </el-col>
                 </el-row>
               </div>
             </el-form>
           </el-col>
         </el-row>
      </div>
  </div>
  </div>
</template>

<script>
    export default {
      name: "offerThird",
      data() {
        return {
           isshow:true,
           workAddress:'',
        }
      },
      methods:{
         
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
</style>
