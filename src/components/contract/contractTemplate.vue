<template>
  <div>
    <div class="mainCon el-col-24">
      <!--顶部导航-->
      <pageheader class="pageheader"></pageheader>
      <!--侧边栏-->
      <!--<div class="aside">-->
        <pageaside></pageaside>
      <!--</div>-->
      <!--右侧内容栏-->
      <div class="right-content pull-right">
        <div class="content">
          <!--主体内容-->
          <p class="headline">
            <a>合同模板</a>
          </p>

          <div class="templates">
            <div class="signTemplate" v-for="(item,index) in templateData" :key="index" @click="previewPdf(item.templateAddress)">
              <p>{{item.templateName}}</p>
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
  import api from '@/api/api.js'
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader'
  import pageaside from '@/components/common/pageaside'


    export default {
      name: "contractTemplate",
      components: {
        pageheader,
        pageaside
      },
      data(){
         return{
           templateData:[],//模板数据
         }
      },
      methods:{
        //点击展示模板
        showModels(){
          let that=this;
          //合同模板查询
          that.$http({
            url:api.templateKinds,
            method:"post",
            headers:headers(),
          }).then(function (result) {
            // console.log(result);
            if(result.data.code==10000){
              that.templateData=result.data.data;

            }else{
              that.$message.error(result.message || result.data.msg)
            }
          })

        },
        previewPdf(url){
          window.open(url, '_blank');
        }
      },
      mounted(){
        let that=this;
        that.showModels();
      }
    }
</script>

<style scoped>
  .main .right-content .content .headline{
    margin: 0;
  }
  .templates{
    margin:10px;
  }
  .signTemplate{
    display: inline-block;
    width: 209px;
    height: 240px;
    margin:10px;
    background: url(../../assets/img/contract/templateBg.png) no-repeat center;
    cursor: pointer;
  }
  .signTemplate p{
    margin: 37px 0 0;
    font-size: 16px;
    color: #394A66;
    letter-spacing: 0;
    text-align: center;
  }
</style>
