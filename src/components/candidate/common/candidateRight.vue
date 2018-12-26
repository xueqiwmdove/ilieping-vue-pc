<template>
  <!--候选人信息弹窗右边状态栏-->
  <div class="candidate_right">
    <div v-if="signs != '0'">
      <div class="operating_button">
        <button class="button" v-if="flag==1">进入用人部门筛选</button>
        <button class="button" v-if="flag==2">进入面试</button>
        <button class="button" v-if="flag==3">进入沟通offer</button>
        <button class="button" v-if="flag==4">进入待入职</button>
        <button class="button" v-if="flag==5">办理入职</button>
        <el-button class="buttonRow" :icon="status" @click="changeStatus"></el-button>
        <div class="button_pullDown" v-show="isShow">
          <ul>
            <li @click="changeli(1)" :class="flag==1?'el-icon-success':''">初筛</li>
            <li @click="changeli(2)" :class="flag==2?'el-icon-success':''">用人部门筛选</li>
            <li @click="changeli(3)" :class="flag==3?'el-icon-success':''">面试</li>
            <li @click="changeli(4)" :class="flag==4?'el-icon-success':''">offer/录用</li>
            <li @click="changeli(5)" :class="flag==5?'el-icon-success':''">待入职</li>
          </ul>
        </div>
      </div>

      <button class="button recommend" v-if="flag==1&& step==1" @click="showmodel1" >推荐给用人部门</button><!--@click="addCandidateShow('recommend')"-->
      <button class="button weedOut" @click="showmodel3" >淘汰</button><!--@click="visable.weekOut==true"-->
      <button class="button remark" @click="showmodel2">备注</button><!--@click="visable.remark==true"-->
    </div>


    <div v-if="signs == '0'">
      <H4>归档详情</H4>
      <P><i>分类</i></P>
      <P><i>原因</i></P>
      <P><i>说明</i></P>
      <button  class="button remark">恢复到初筛</button>
      <button class="button remark" @click="showmodel2">备注</button><!--@click="visable.remark==true"-->
    </div>
    <!-- 弹窗备注 -->
    <remarkAlert ref="mack" @getList="getList"></remarkAlert>
    <!-- 弹窗推荐人 -->
    <recommendDia ref="reconmmend"></recommendDia>
    <!-- 淘汰弹窗 -->
    <weekOutAlert ref="quit"></weekOutAlert>
  </div>
</template>

<script>
  import weekOutAlert from '@/components/candidate/common/weekOutAlert'
  import remarkAlert from '@/components/candidate/common/remarkAlert'
  import recommendDia from '@/components/candidate/common/recommendDia'

    export default {
        name: "candidateRight",
        props:['step','signs'],
        components:{
          weekOutAlert,
          remarkAlert,
          recommendDia,
        },
        data(){
          return{
            status:'el-icon-caret-bottom',
            count:0,
            isShow:false,
            flag:1,
            cerateList:{
              type:'',
            },
            visableModal:false
          }
        },
      methods:{
       getList() {
         this.$emit("getList")//触发给父组件
       },
      //点击切换按钮状态
        changeStatus(){
          let that=this;
          that.count++;
          that.isShow=!that.isShow;
          if((that.count)%2==0 && that.status=='el-icon-caret-right'){
            that.status="el-icon-caret-bottom";
          }else{
            that.status="el-icon-caret-right";
          }
        },
        changeli(flag){
          let that=this;
          that.flag=flag;
          that.isShow=false;
          that.status="el-icon-caret-bottom";

          that.$emit("listento-flag",that.flag)
        },
        //显示弹窗
        showmodel1(){
          this.$refs.reconmmend.open()
        },
        showmodel2(){
          this.$refs.mack.open()
        },
        showmodel3(){
          this.$refs.quit.open()
        },
        //展示候选人弹窗
        // addCandidateShow(param){
        //   let that=this;
        //   console.log(0)
        //   that.visables[param] = true;
        // },
      }
    }
</script>

<style scoped>

</style>


