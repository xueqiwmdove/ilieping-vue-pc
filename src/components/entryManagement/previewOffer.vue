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
            <p class="headline">发offer</p>
            <!--<breadcrumb></breadcrumb>-->
            <div class="previewOfferMain">
              <div class="sendOfferSteps">
                <div class="sendOffer-status">
                  <div class="sendOffer_one">
                    <div>
                      <img src="../../assets/img/dismission/step1_a.svg" />
                      <i class="step_a" ></i>
                    </div>
                    <span>填写信息</span>
                  </div>
                  <!--<i class="step_a" ></i>-->
                  <div class="sendOffer_two">
                    <div>
                      <img src="../../assets/img/dismission/step2_a.svg" />
                      <i class="step_a" ></i>
                    </div>
                    <span>预览offer</span>
                  </div>
                  <!--<i class="step_a" ></i>-->
                  <div class="sendOffer_three">
                    <img src="../../assets/img/dismission/step3.svg" />
                    <span>完成发送</span>
                  </div>
                </div>
              </div>
              <div class="htmlBox" v-html="previewOffer"></div>
              <div class="sendButton">
                <input type="button" value="发送此offer" class="sendOffer" @click="sendOffer"   >
                <input type="button" value="返回上一步" class="returnPrev" @click="goToSendOffer">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api'
  import {headers} from "@/assets/js/common/lp";
  import pageheader from '@/components/common/pageheader'
  import pageaside from '@/components/common/pageaside';

  import breadcrumb from '@/components/common/breadcrumb'
  import {mapState,mapActions} from 'vuex'
  export default {
        name: 'previewOffer',
        components: {
          pageheader,
          pageaside,breadcrumb
        },
        data() {
            return {
              previewOffer:localStorage.getItem("html"),
              fullscreenLoading: false
            }
        },
        watch: {},
        methods: {
          //发送offer
          sendOffer(){
            let that=this;

            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
              loading.close();
            }, 2000);

             that.$http({
                url:api.sendOfferId+that.$route.params.offerId,
                method:'post',
                headers:headers()
            }).then((res)=>{
              console.log(res);
              if(res.data.code=10000){
                that.$router.push('/sendSuccess');
              }
            }).catch((res)=>{
              console.log(res);
              that.$message.error("offer发送失败！")
            })
          },
          //返回上一步
          goToSendOffer(){
            return this.$router.push('/sendOffer/'+this.$route.params.offerId);
          }
        },
        mounted() {
          let that=this;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main .right-content .content .headline{
    margin: 0;
  }
  /*.offerTemplate{
    font-family: "MicrosoftYaHei"!important;
  }*/
  .htmlBox{
    padding: 40px 40px 0;
  }
  .sendOfferSteps .sendOffer-status .sendOffer_one .step_a{
    background:  #C9EACC;
  }
  .sendButton{
    text-align: center;
    margin: 62px 0;
    font-size: 0;
  }
  .sendButton input{
    width: 180px;
    height: 44px;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;

  }
  .sendButton .sendOffer{
    background: #f95714;
    color: #fff;
  }
  .sendButton .returnPrev{
    color: #394A66;
    background: #FAFBFC;
    border: 1px solid #E5E5E5;
    margin: 0 0 0 20px;
  }
  .sendOfferSteps .sendOffer-status .sendOffer_three span{
    color: #97A2B3;
  }
  .offerTemplate{
    height: auto;
    font-size: 0;
    font-family: "MicrosoftYaHei";
  }
  .img_top,.img_bottom{
    background-size:100% 100%;
  }
  p,.title{
    margin: 0 0 10px 0;
    line-height: 20px;
  }
</style>
