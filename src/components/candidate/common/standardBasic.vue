<template>
  <div class="standard_required" ><!--v-if="flag==2" :class="flag==2?'standard_required':''"-->
    <div class="basic">
      <div class="inputBox">
          <img src="../../../assets/img/candidate/tanchuang_ic_name.png" alt="">
          <el-input v-model="name" placeholder="请输入候选人姓名"></el-input>
      </div>
      <div class="inputBox">
          <img src="../../../assets/img/candidate/tanchuang_ic_jobs.png" alt="">
          <el-select v-model="post" placeholder="选择岗位">
            <el-option v-for="item in postData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
      </div>
      <div class="inputBox">
          <img src="../../../assets/img/candidate/tanchuang_ic_channel.png" alt="">
          <el-select v-model="channels" placeholder="面试渠道">
            <el-option v-for="item in channelsData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
      </div>
      <div class="inputBox">
          <img src="../../../assets/img/candidate/tanchuang_ic_source.png" alt="">
          <el-select v-model="resoure" placeholder="选择来源">
            <el-option v-for="item in resoureData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
      </div>

      <div class="inputBox">
          <img src="../../../assets/img/candidate/tanchuang_ic_gender.png" alt="">
          <el-select v-model="sex" placeholder="请选择候选人性别">
            <el-option v-for="item in sexData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
      </div>
      <div class="inputBox">
          <img src="../../../assets/img/candidate/tanchuang_ic_age.png" alt="">
          <el-input v-model="age" placeholder="请输入年龄"></el-input>
      </div>
      <div class="inputBox">
          <img src="../../../assets/img/candidate/tanchuang_ic_phnnenumber.png" alt="">
          <el-input v-model="phone" placeholder="请输入手机号"></el-input>
      </div>
      <div class="inputBox">
          <img src="../../../assets/img/candidate/tanchuang_ic_email.png" alt="">
          <el-input v-model="email" placeholder="请输入邮箱号码"></el-input>
      </div>
      <div class="inputBox">
          <img src="../../../assets/img/candidate/tanchuang_ic_exp.png" alt="">
          <el-select v-model="experience" placeholder="请选择工作经验">
            <el-option v-for="item in experienceData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
      </div>
      <div class="inputBox">
          <img src="../../../assets/img/candidate/tanchuang_ic_place.png" alt="">
          <el-select v-model="address" placeholder="所在地">
            <el-option v-for="item in addressData" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "standardBasic",
        data(){
          return{
            name:'',
            post:'',
            postData:[],
            channels:'',
            channelsData:[
              {value:'手动添加',label:'手动添加'},
              {value:'内部推荐',label:'内部推荐'},
              {value:'社招官网',label:'社招官网'},
              {value:'拉钩',label:'拉钩'},
              {value:'猎聘',label:'猎聘'},
              {value:'BOSS直聘',label:'BOSS直聘'},
            ],
            resoure:'',
            resoureData:[],
            sex:'',
            sexData:[
              {value:'男',label:'男'},
              {value:'女',label:'女'}
            ],
            age:'',
            email:'',
            phone:'',
            experience:'',
            experienceData:[
              {
                value:'应届毕业生',
                label:'应届毕业生'
              },
              {
                value:'1',
                label:'1',
              },
              {
                value:'2',
                label:'2',
              },
              {
                value:'3',
                label:'3',
              },
              {
                value:'4',
                label:'4',
              },
              {
                value:'5',
                label:'5',
              }
            ],
            address:'',
            addressData:[],
          }
        }
    }
</script>

<style scoped>

</style>
