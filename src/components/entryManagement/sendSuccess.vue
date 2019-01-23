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
            <p class="headline">发offer</p>
            <!--<breadcrumb></breadcrumb>-->
            <div class="sendSuccessMain">
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
                    <img src="../../assets/img/dismission/step3_a.svg" />
                    <span>完成发送</span>
                  </div>
                </div>
              </div>
              <div class="successInfo">

                <img src="../../assets/img/dismission/ic_success.svg" alt="">
                <h4>恭喜，offer已成功发送给{{name}}</h4>
                <p>请耐心等待对方确认哦！确认后即可为TA办理入职了！</p>
                <div class="sendButton">
                  <input type="button" value="继续发offer" class="continueOffer" @click="goToSendOffer">
                  <input type="button" value="查看offer" class="lookOffer" @click="goToOfferManagement">
                </div>

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
        name: 'sendSuccess',
        components: {
          pageaside,
          pageheader,
          breadcrumb
        },
        data() {
            return {
              name:localStorage.getItem("offerName"),
            }
        },
        watch: {},
        methods: {
          goToSendOffer(){
            return this.$router.push('/sendOffer/null')
          },
          goToOfferManagement(){
            return this.$router.push('/offerManage')
          }
        },
        mounted() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .successInfo{
    text-align: center;
    text-align: -moz-center;
    text-align: -webkit-center;
  }
  .successInfo img{
    margin: 66px 0 0;
  }
  .successInfo h4{
    font-size: 20px;
    color: #394A66;
    letter-spacing: 0;
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin: 28px 0 5px;
  }
  .successInfo p{
    font-size: 14px;
    color: #97A2B3;
    letter-spacing: 0;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  .sendOfferSteps .sendOffer-status .step_a{
    background:  #C9EACC;
  }
  .sendButton{
    text-align: center;
    font-size: 0;
    margin: 42px 0 134px;
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
  .sendButton .continueOffer{
    background: #f95714;
    color: #fff;
  }
  .sendButton .lookOffer{
    color: #394A66;
    background: #FAFBFC;
    border: 1px solid #E5E5E5;
    margin: 0 0 0 20px;
  }
</style>
