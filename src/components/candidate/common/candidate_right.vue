<template>
  <div class="candidate_right">
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
    <!--备注弹窗-->
    <el-dialog title="备注" :visible.sync="remarkAlert"  custom-class="remarkAlert">
      <el-row>
        <el-col :span="24">
          <span>备注</span>
          <textarea placeholder="备注"></textarea>
        </el-col>
      </el-row>
    </el-dialog>

    <button class="button weedOut" @click="weekOutAlert==true">淘汰</button>
    <button class="button remark" @click="remarkAlert==true">备注</button>
  </div>
</template>

<script>
    export default {
        name: "candidate_right",
        components:{

        },
        data(){
          return{
            status:'el-icon-caret-bottom',
            count:0,
            isShow:false,
            flag:1,
            weekOutAlert:false
          }
        },
      methods:{
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
        }
      }
    }
</script>

<style scoped>

</style>
