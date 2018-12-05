<template>
  <div class="industryBox" @click="showOrHide" v-clickOutSide="handleClose">
    <input type="text" class="industry" id="industry"  placeholder="行业" v-model="industrySingle" readonly/>
    <em class="triangleBottom" style="top: 18px; right: 10px;" ></em>
    <!--下拉-->
    <div class="pulldown industryPullDown" v-show="isShow">
      <ul>
        <li v-for="item in industryItem" :key="item.id" :label="item.enumCode" :value="item.enumValue" @click="changeIndustry(item.enumValue,item.enumCode)">{{item.enumValue}}</li>
      </ul>
      <span class="hidden" >{{id}}</span>
    </div>
  </div>
</template>

<script>
  import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'

  export  default {
    data(){
      return{
        industryItem: [{

        }],
        industrySingle:"",
        isShow:false,
        id:'',
      }
    },
    methods:{
      //隐藏下拉框
      handleClose(){
        this.isShow=false;
      },

      //显示隐藏下拉框
      showOrHide(){
        let that=this;
        that.isShow=!that.isShow;

      },
      //页面加载获取industry
      getIndustry(){
        let that=this;
        that.$http({
          method:"get",
          url:api.industry,
          headers:headers("application/json;charset=utf-8")
        }).then(function (res) {
          // console.log(res)
          if(res.data.code==10000&& res.data.data!=""){
            let data=res.data.data;
            that.industryItem=data.valueList;
          }

        })
      },
      //点击赋值
      changeIndustry(value,id) {
        let that=this;
        console.log(value,id);
        //定义一个变量赋值给隐藏的span
        that.industrySingle=value;
        that.id=id;
        that.$emit('child-msg',that.id);
      },

    },
    directives : {
      clickOutSide:{
        bind:function(el,binding,vnode){
          function documentHandler(e){
            if(el.contains(e.target)){
              return false;
            }
            if(binding.expression){
              binding.value(e)
            }
          }
          el._vueClickOutside_ = documentHandler;
          document.addEventListener('click',documentHandler);
        },
        unbind:function(el,binding){
          document.removeEventListener('click',el._vueClickOutside_);
          delete el._vueClickOutside_;
        }
      }
    },
    mounted(){
      let that=this;
      that.getIndustry();
    }

  }
</script>

<style scoped>
  .pulldown {
    width: 220px;
    padding: 0;
    position: absolute;
    top: 44px;
    right: -100px;
    font-size: 14px;
    background: #FFFFFF;
    color: #394A66;
    letter-spacing: 0;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.20);
    z-index: 8;
    display: block;
  }
  .pulldown li{
    width: 100%;
    padding:0 0 0 14px;
    list-style: none;
    height: 34px;
    line-height: 34px;
  }
  .pulldown li:hover,.pulldown li.active{
    background: #F9F9F9;
    color: #f95714;
    cursor: pointer;
  }
.hidden{
  display:none;
}
  .industryBox{
    display: inline-block;
    vertical-align: top;
    position: relative;
  }
  .triangleBottom{
    position: absolute;
    border-top: 6px solid #AAADB5;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
</style>
