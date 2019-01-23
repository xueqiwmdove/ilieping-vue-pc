// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"; // 解决Ie9
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'

import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
//echarts
import echarts from 'echarts'

import FileSaver from 'file-saver'

import '../src/assets/css/static/layui/css/layui.css'
import '../src/assets/css/static/swiper/swiper-4.3.3.min.css'
import '../src/assets/css/static/init.css'
import '../src/assets/css/new/index.css'
import '../src/assets/css/new/certificate.css'
import '../src/assets/css/new/account.css'
import '../src/assets/css/new/company.less'
import '../src/assets/css/new/search.less'
import '../src/assets/css/new/myUpload.css'
import '../src/assets/css/new/competency.css'
import '../src/assets/css/new/leaveReport.css'
import '../src/assets/css/new/uploadLeave.less'
import '../src/assets/css/new/vip.less'
import '../src/assets/css/pagination/my-pagination.css'
import '../src/assets/css/new/common.css'
import '../src/assets/css/new/message.css'

import '../src/assets/css/new/bySinging.less'
import '../src/assets/css/new/selectTemplates.less'
import '../src/assets/css/new/contractDetail.less'

import '../src/assets/css/new/sendOffer.less'
import '../src/assets/css/new/offerManage.less'

import '../src/assets/css/new/hr.less'
import '../src/assets/css/new/customContractTemplate.less'

import '../src/assets/css/new/addCandidate.less'
import '../src/assets/css/new/candidateSteps.less'

//VueJsonp解决跨域
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)
//element-ui
import ElementUI from 'element-ui'
import './theme/element/index.css'

Vue.use(ElementUI);

import md5 from 'js-md5';
//Ueditor 富文本编辑器
import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.min.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.min.js'

//开启debug模式
Vue.config.debug = true;
Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true;//withCredentials默认是false，意思就是不携带cookie信息，那就让它为true，我是全局性配置的
axios.defaults.timeout = 40000;
// axios.interceptors.response.use((res) => {
//   if (res.status === 200) {
//    if(res.data.code == 40401){
// 		router.replace({
// 		  path: '/login',
// 		});
//    }
// 	return res;
// 	} else {
// 		alert('网络错误');
// 	}
// });
import { Message, Loading } from 'element-ui';
let loading;        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}


axios.interceptors.request.use(function(config){

  showFullScreenLoading();
  return config
},function(err){
  return Promise.reject(err)
});

axios.interceptors.response.use(function(response){
  tryHideFullScreenLoading();
  if (response.status === 200) {
    if(response.data.code == 40401){
      router.replace({
        path: '/login',
      });
    }
    return response;
  }
},function(error) {
    if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
    console.log("错误回调", error);//     alert("网络超时");
    return Promise.reject(error);          // reject这个错误信息
  }
  return Promise.reject(error)
});


Vue.use(Vuex)
Vue.use(VueCookies)
//echarts
Vue.prototype.$echarts = echarts;
//引入轮播插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

export default axios;

Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
Vue.config.productionTip = false

import http from '../src/http/http.js';
import api from '../src/api/api.js';
import store from '../src/store/store.js'  // 引入store 对象

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,// 注入到根实例中
  components: { App },
  template: '<App/>'
})
//路由切换时回到顶部
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
