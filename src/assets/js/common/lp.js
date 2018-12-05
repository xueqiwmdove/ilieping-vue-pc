import md5 from 'js-md5';
//时间格式转换
export function formatDateTime(inputTime) {  
    var date = new Date(inputTime);
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;  
    second = second < 10 ? ('0' + second) : second; 
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 
}

export function judgFailTime(nowtime) {
	var time = new Date(nowtime.replace("-","/"));
	var b = 30; //分钟数
	time.setMinutes(time.getMinutes() + b, time.getSeconds(), 0);
	return time;
}

//前端自定义md5签名算法
export function sign(token, current_timestamp, nonce_str, key) {
    let waitSignStr = token + current_timestamp.substr(0, 10) + nonce_str.substr(0, 16) + key;
    return md5(waitSignStr);
}

//设置请求消息头
export function headers(contentType,token){
	let headers={};
	headers['Content-Type'] = contentType ? contentType : 'application/json;charset=utf-8';
      let nowtime=new Date();
			
      let a = window.location.href;
      let b = a.indexOf("#");
      let loginUrl = a.substring(b+2);
      if(loginUrl){
        localStorage.loginUrl = loginUrl;
      }
      let url = a.substring(0,b+2);
      if(loginUrl==='login' || loginUrl==='reg' || loginUrl==='phoneAuth' || loginUrl=='emailInfo'){
      	token='';
      }else{
	      token=window.localStorage.getItem('jingjing_login_token');
				let forData=formatDateTime(nowtime);
				let forData30=judgFailTime(forData);
			  window.localStorage.setItem('nowtime',formatDateTime(forData30));
      }
	  token = token ? token : '';

	let key = 'jmjbGEWO4EyItpA4';
	let current_timestamp = new Date().getTime() + '';
	let nonce_str = getNonceStr(32);

	let lp_sign = sign(token, current_timestamp, nonce_str, key);
	headers['token'] = token;
	headers['current-timestamp'] = current_timestamp;
	headers['nonce-str'] = nonce_str;
	headers['lp-sign'] = lp_sign;
	return headers;
}
//生成随机字符串
export function getNonceStr(len) {
    len = len || 32;
    let chars = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let maxPos = chars.length;
    let s = '';
    for (let i = 0; i < len; i++) {
        s += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return s;
}
