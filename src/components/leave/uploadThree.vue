<template>
  <div>
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
          <!--主体内容 第三步-->
          <p class="headline">
            <router-link to="/twoUpload">上传离职评价</router-link>
            <a class="active">多维度评价</a>
          </p>

          <div class="uploadleave">
            <div class="uploadleave-status">
              <div class="status_success">
                <img src="../../assets/img/dismission/success.svg"  class="success two" />
                <!--hover 热区-->
               <!-- <div class="hover-info">
                  <i class="triangle-left"></i>
                  点击图标返回当前步骤修改
                </div>-->
              </div>
              <i class="step_a" ></i>
              <div class="status_success">
                <img src="../../assets/img/dismission/success.svg"  class="success three"/>
              </div>
              <i class="step_a" ></i>
              <div class="status_success">
                <img src="../../assets/img/dismission/step3_a.svg" />
              </div>
              <i class="step_a" ></i>
              <img src="../../assets/img/dismission/step4.svg" />
            </div>
            <div class="uploadleave-step">
              <dl>
                <dd>录入</dd>
                <dd>员工基础信息</dd>
              </dl>
              <dl>
                <dd>录入</dd>
                <dd>员工离职信息</dd>
              </dl>
              <dl>
                <dd>（选填）</dd>
                <dd>曝光失信行为</dd>
              </dl>
              <dl>
                <dd>上传</dd>
                <dd>联盟数据库</dd>
              </dl>
            </div>
          </div>

          <div class="uploadLeaveSetp4" id="demoT" style="padding: 20px;">
            <h1 style="padding-top: 20px;margin-bottom: 6px">失信行为</h1>
            <h3>（选填）</h3>
            <dishonest @childComponent="getChildData"></dishonest>
            <div style="width: 100%;background: #ffffff;text-align: center;" >
              <button id="step4_entry" class="uploadLeaveSetup4 active" @click="submit_three()">下一步</button>
            </div>
          </div>
          <!--主体内容-->
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
  import dishonest from '@/components/common/dishonest';

    export default {
        name: "uploadThree",
        components:{
          pageheader,
          pageaside,
          dishonest
        },
        data(){
          return{
            dishonestData:[],
            dishonestyId:''
          }
        },
      methods:{
          //触发子组件失信行为-》添加修改删除失信行为
        getChildData(val){
          let that=this;
          that.dishonestData=val;
          console.log(that.dishonestData)
        },
        submit_three(){
          let that=this;
          //转化
          console.log(that.dishonestData);

          that.$http({
            method: "post",
            url:api.uoloadThree,
            data:{
              listDimissionDishonesty:that.dishonestData,
              reportId:localStorage.getItem("reportId"),
            },
            headers:headers(),
          }).then(function (res) {
            let result = res.data;
            if (result.code == 10000) {
              that.$router.push('/uploadFour');
              localStorage.removeItem("listDis");
            } else {

              that.$message.error(res.data.msg);
            }
          });
        }
      }
    }
</script>

<style scoped>
  .headLine{
    margin: 0;
  }

</style>
