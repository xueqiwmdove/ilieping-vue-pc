/**
 * 此文件为axios ajax的统一设置,包括请求拦截，post处理等
 */
import axios from 'axios';
import qs from 'qs';
import router from '../router/index.js';

const http = axios.create({
  baseURL: 'http://192.168.2.166:8899/jersey/',
  timeout: 35000,
});

// 对数据返回进行拦截
http.interceptors.response.use((res) => {
if(res.data.code===40401){
      let a = window.location.href;
      let b = a.indexOf("#");
      let loginUrl = a.substring(b+2);
      if(loginUrl){
        localStorage.loginUrl = loginUrl;
      }
      let url = a.substring(0,b+2);
      localStorage.removeItem('jingjing_login_token');
      window.location.href= url;
  }
  return res
}, error => {
  return Promise.reject(error)
})
export default http
