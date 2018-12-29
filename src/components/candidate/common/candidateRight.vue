<template>
  <!--候选人信息弹窗右边状态栏-->
  <div class="candidate_right">
    <div v-if="signs != '0'">
      <div class="operating_button">
        <el-button class="button" v-if="flag==1" @click="changeStatus2(1)" :icon="status">进入用人部门筛选</el-button>
        <el-button class="button" v-if="flag==2" @click="changeStatus2(2)" :icon="status">进入面试</el-button>
        <el-button class="button" v-if="flag==3" @click="changeStatus2(3)" :icon="status">进入沟通offer</el-button>
        <el-button class="button" v-if="flag==4" @click="changeStatus2(4)" :icon="status">进入待入职</el-button>
        <el-button class="button" v-if="flag==5" @click="changeStatus2(5)" :icon="status">办理入职</el-button>
        <!--<el-button class="buttonRow" :icon="status" ></el-button>-->
        <!--<el-button class="buttonRow" :icon="status" @click="changeStatus"></el-button>
        <div class="button_pullDown" v-show="isShow">
          <ul>
            <li @click="changeli(1)" :class="flag==1?'el-icon-success':''">初筛</li>
            <li @click="changeli(2)" :class="flag==2?'el-icon-success':''">用人部门筛选</li>
            <li @click="changeli(3)" :class="flag==3?'el-icon-success':''">面试</li>
            <li @click="changeli(4)" :class="flag==4?'el-icon-success':''">offer/录用</li>
            <li @click="changeli(5)" :class="flag==5?'el-icon-success':''">待入职</li>
          </ul>
        </div>-->
      </div>

      <button class="button recommend" v-if="flag==2&& step==2" @click="showmodel1" >推荐给用人部门</button><!--@click="addCandidateShow('recommend')"-->
      <button class="button weedOut" @click="showmodel3" >淘汰</button><!--@click="visable.weekOut==true"-->
      <button class="button remark" @click="showmodel2">备注</button><!--@click="visable.remark==true"-->
    </div>


    <div v-if="signs == '0'" class="file_for_details" v-for="item in candidateStepsData">
      <H4>归档详情</H4>
      <P><i>分类:</i>我们拒绝了候选人</P>
      <P><i>原因:</i>{{item.archivingReason}}</P>
      <P><i>说明:</i>{{item.detailedReasons}}</P>
      <button  class="button weedOut" @click="renew">恢复到初筛</button>
      <button class="button weedOut" @click="showmodel2">备注</button><!--@click="visable.remark==true"-->
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
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import weekOutAlert from '@/components/candidate/common/weekOutAlert'
  import remarkAlert from '@/components/candidate/common/remarkAlert'
  import recommendDia from '@/components/candidate/common/recommendDia'

    export default {
        name: "candidateRight",
        props:['step','signs','candidateStepsData' ],
        components:{
          weekOutAlert,
          remarkAlert,
          recommendDia,
        },
        data(){
          return{
            status:'el-icon-caret-right',
            count:0,
            isShow:false,
            flag:1,
            cerateList:{
              type:'',
            },
            visableModal:false,
            candidateId:'',
          }
        },
      // computed(){
      //   this.flag= this.candidateStepsData[0].status-1;
      //   console.log( this.flag)
      // },
      methods:{
       getList() {
         this.$emit("getList")//触发给父组件
       },
      //点击切换按钮状态,关联父组件
        changeStatus2(param){
          let that=this;
          that.candidateId=localStorage.getItem('candidateID');

          // that.flag=param;
          //办理入职跳转到录入新员工页面
          if(this.flag==5){
            //2:初筛,3用人部门筛选,4:面试,5:offer/录用,6待入职；
            // that.changeCandidateStatus(that.candidateId,6);

            this.$confirm('此操作将跳转到录入新员工, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/insertNewEmployee/'+that.candidateId);
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            }).catch(() => {

              this.$message({
                type: 'info',
                message: '已取消跳转'
              });
            });

          }else if(this.flag>5){
            that.flag=5;
          }else{
            that.flag=param+1;
            console.log("flag-"+that.flag,that.candidateStepsData[0].status-1);
            //2:初筛,3用人部门筛选,4:面试,5:offer/录用,6待入职；
            that.changeCandidateStatus(that.candidateId,that.flag+1)
           /* if( that.flag<=that.candidateStepsData[0].status-1 ){
            }else{
              //2:初筛,3用人部门筛选,4:面试,5:offer/录用,6待入职；
              that.changeCandidateStatus(that.candidateId,that.flag)
            }*/


          }

          //子组件通过父组件里面的 listento-flag，传到父组件当中；
          // that.$emit("listento-flag",that.flag);
          // that.$emit("listento-flag",trueFlag);

        },
        //切换候选人状态
        changeCandidateStatus(Id,status){
         let that=this;
          that.$http({
            method:"put",
            url:api.changeCandidateStatus+Id+'/'+status,
            headers:headers(),
          }).then(function(res){
            if(res.data.code==10000 ){
              that.$message.success(res.data.msg);
            }else{
              that.$message.error(res.data.msg);
            }
          });

        },
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
          // that.flag=flag;
          that.isShow=false;
          that.status="el-icon-caret-bottom";
          if(flag<that.flag){

          }else{
            that.$emit("listento-flag",that.flag)

          }

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
      //  恢复到初筛
        renew(){
         let that=this;
         that.candidateId=localStorage.getItem('candidateID');
          this.$http({
            method:"get",
            url:api.init+ that.candidateId,
            headers:headers(),
            cache:false
          }).then(function(res){
            if(res.data.code==10000 ){
              that.$message.success(res.data.msg);
              setTimeout(function () {
                window.location.reload();
              },3000)
            }else{
              that.$message.error(res.data.msg);
            }
          });
        },

      },
      updated(){
        // this.flag= this.candidateStepsData[0].status-1;
        // if(this.candidateStepsData[0].status!=undefined){
        //   this.flag= this.candidateStepsData[0].status-1;
        //   console.log(this.flag)
        //   // if(this.flag==3){
        //   //   this.$emit("listento-flag",this.flag)
        //   // }
        // }

      },
      // mounted(){
      //
      // }
    }
</script>

<style scoped>

</style>


