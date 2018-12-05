<template>
  <div>
   <!--头部-->
    <header>
        <div id="header" class="header">
            <img src="../img/logo-top.svg" height="60" width="180"/>
            <ul class="nav">
                <li @click="click_home(1)" :class="flag==1?'active':''"><div>首页</div></li>
                <li @click="gotoLeave(2)" :class="flag==2?'active':''">
                    <div>离职评价</div>
                </li>
                <li @click="gotobrokenQuery(3)" :class="flag==3?'active':''"><div>失信查询</div></li>
                <li @click="gotowasAsked(4)" :class="flag==4?'active':''"><div>背调征询</div></li>
                <li @click="gotoablityAssessment(5)" :class="flag==5?'active':''">
                    <div>职场能力评估</div>
                </li>
                <li @click="gotoContact(6)" :class="flag==6?'active':''"><div>联系我们</div></li>
                <li class="reg" v-if="Isconsole_b" @click="gotoreg"><div>注册</div></li>
                <li class="login" v-if="Isconsole_b" @click="gotologin"><div>登录</div></li>
                <li class="goToWorkbench" v-if="Isconsole" @click="click_console"><div>返回工作台</div></li>
            </ul>
        </div>
    </header>
  </div>
</template>

<script>
  export default {
    name: "newWitesite_header",
    data () {
      return{
      	Isconsole_b:true,
        Isconsole:false,
				flag:"",
      }
    },
    methods:{
    	click_console(){
    		let that=this;
        that.$router.push('/searchbefore')
    	},
    	click_home(a){
    		let that=this;
    		that.flag=a;
        that.$router.push('/');
    	},
      gotoLeave(a){
        let that=this;
        that.flag=a;
        that.$router.push('/leaveAssessment')
      },
      gotobrokenQuery(a){
        let that=this;
        that.flag=a;
        that.$router.push('/brokenQuery')
      },
      gotowasAsked(a){
          let that=this;
          that.flag=a;
          that.$router.push('/wasAsked')
      },
      //gotoablityAssessment
      gotoablityAssessment(a){
        let that=this;
        that.flag=a;
        that.$router.push('/ablityAssessment')
      },
      gotoContact(a){
        let that=this;
        that.flag=a;
        that.$router.push('/contact')
      },
      gotologin(){
        let that=this;
        that.$router.push('/login')
      },
      gotoreg(){
        let that=this;
        that.$router.push('/reg')
      },
			formatDateTime(inputTime) {  
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
    },
		mounted () {
			let lasttokenTime=localStorage.getItem('nowtime');
      let nowtime=new Date();//当前时间
			let dataNowtime=this.formatDateTime(nowtime);
			if(lasttokenTime < dataNowtime){
				window.localStorage.clear();
			}
			let Islogin=localStorage.getItem('jingjing_login_token');
			let that=this;
			if(!Islogin){
				that.Isconsole_b= true;
				that.Isconsole= false;
			}else{
				that.Isconsole_b= false;
				that.Isconsole= true;
			}
      let a = window.location.href;
      let b = a.indexOf("#");
      let loginUrl = a.substring(b+2);
			if(loginUrl=='leaveAssessment'){
    		let that=this;
    		that.flag=2;
			}else if(loginUrl=='brokenQuery'){
    		let that=this;
    		that.flag=3;
			}else if(loginUrl=='wasAsked'){
    		let that=this;
    		that.flag=4;
			}else if(loginUrl=='ablityAssessment'){
    		let that=this;
    		that.flag=5;
			}else if(loginUrl=='contact'){
    		let that=this;
    		that.flag=6;
			}else{
    		let that=this;
    		that.flag=1;
			}
		},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("../../../assets/css/static/init.css");
	@import url("../css/index.css");
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
  z-index: 999;
  /*background: rgba(255, 255, 255, 0.8);*/
  /*-webkit-box-shadow: 0 0 4px #888888;*/
          /*box-shadow: 0 0 4px #888888;*/
}
header .header {
  width: 1200px;
  margin: 14px auto 0;
}
header .header .nav {
  float: right;
  font-size: 0;
  margin-top: 16px;
}
header .header .nav .reg {
  margin: 0 20px 0 0;
}
header .header .nav .goToWorkbench {
  display: inline-block;
  padding: 0 10px;
  width: auto!important;
}
header .header .nav .reg,
header .header .nav .login,
header .header .nav .goToWorkbench {
  width: 88px;
  text-align: center;
  border-radius: 4px;
  letter-spacing: 0.24px;
}
header .header .nav .reg:hover,
header .header .nav .login:hover,
header .header .nav .goToWorkbench:hover {
  background: #F95714;
  color: #fff;
}
header .header .nav .reg:hover div,
header .header .nav .login:hover div,
header .header .nav .goToWorkbench:hover div {
  color: #fff!important;
}
header .header .nav .reg,
header .header .nav .login,
header .header .nav .goToWorkbench {
  border: 1px solid #f95714;
  color: #f95714;
}
header .header .nav .reg div,
header .header .nav .login div,
header .header .nav .goToWorkbench div {
  color: #f95714;
}
header .header .nav > li:nth-child(2),
header .header .nav > li:nth-child(3) {
  height: 52px;
}
header .header .nav > li {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  position: relative;
  margin-right: 30px;
  cursor: pointer;
  /*关键一：将二级菜单设置为display：none;*/
}
header .header .nav > li div {
  /* display: inline-block;
        height: 52px;*/
  font-size: 16px;
  color: #fff;
  /*color: #394A66;*/
  text-decoration: none;
  cursor: pointer;
}
header .header .nav > li.active div{
  color: #F95714;
}
header .header .nav > li ul.submenu {
  position: absolute;
  top: 49px;
  left: -32px;
  padding-left: 0;
  border-top: 2px solid #F95714;
  background: #F3F6F9;
  color: #97A2B3;
  letter-spacing: 0.24px;
  display: none;
}
header .header .nav > li ul.submenu li,
header .header .nav > li ul.submenu li > div {
  display: inline-block;
  width: 140px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
header .header .nav > li ul.submenu li:hover {
  background: #fff;
  color: #f95714;
}
header .header .nav > li ul.submenu li:hover {
  background: #fff;
  color: #f95714;
}
header:hover,
header.on {
  background: rgba(255, 255, 255, 0.8);
  -webkit-box-shadow: 0 0 4px #888888;
          box-shadow: 0 0 4px #888888;
}
header:hover .header .nav li div,
header.on .header .nav li div {
  color: #394A66;
}
header.on div{
  color: #F95714;
}
header:hover .header .nav li.active div,
header.on .header .nav li.active div,
header:hover .header .nav li:hover div,
header.on .header .nav li:hover div{
  color: #F95714;
}
header:hover .header .nav .reg,
header.on .header .nav .reg,
header:hover .header .nav .login,
header.on .header .nav .login,
header:hover .header .nav .goToWorkbench,
header.on .header .nav .goToWorkbench {
  color: #f95714;
}
header:hover .header .nav .reg div,
header.on .header .nav .reg div,
header:hover .header .nav .login div,
header.on .header .nav .login div,
header:hover .header .nav .goToWorkbench div,
header.on .header .nav .goToWorkbench div {
  color: #f95714;
}

</style>
