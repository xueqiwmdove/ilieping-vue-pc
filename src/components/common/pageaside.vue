<template>
  <div>
   <!--侧边栏-->
    <div class="aside">
        <ul id="accordion" class="accordion">
        	  <li @click="click_admin(0)" :class="flagli==0?'activeLi':''">
                <div class="link">
                	<i class="icon iconfont icon-gongzuotaisvg"></i>工作台
                </div>
            </li>
            <li :class="flagli==1?'activeLi':''">
              <div class="link" @click="toggle1(1)" >
              <i class="icon iconfont icon-liepingchaxun"></i>猎评查询
              <i :class="classA==1 ? 'addClass' : ''" class="el-icon-arrow-right elIcon"></i>
               </div>
                <ul class="submenu" v-if="isShow1">
                   <li @click="click_searchbefore1(1)" :class="flag==1?'active':''"><span>离职评价查询</span></li>
                   <li @click="click_searchbefore2(2)" :class="flag==2?'active':''"><span>失信行为查询</span></li>
                </ul>
            </li>
            <li :class="flagli==2?'activeLi':''">
            <div class="link" @click="toggle5(5)">
              <i class="icon iconfont icon-liepingpuguangsvg"></i>
            猎评曝光
<i :class="classA==5 ? 'addClass' : ''" class="el-icon-arrow-right elIcon"></i>
            </div>
            <ul class="submenu" v-if="isShow5">
              <li @click="click_twoUpload(3)" :class="flag==3?'active':''"><span>离职评价上传</span></li>
              <li @click="click_exposure(4)" :class="flag==4?'active':''"><span>失信行为上传</span></li>
              <li @click="click_myupload(5)" :class="flag==5?'active':''"><span>上传记录</span></li>
            </ul>
          </li>
          <li :class="flagli==3?'activeLi':''">
            <div class="link" @click="toggle4(4)">
              <i class="icon iconfont icon-yuangongguanli"></i>
              员工管理
<i :class="classA==4 ? 'addClass' : ''" class="el-icon-arrow-right elIcon"></i>
            </div>
            <ul class="submenu" v-if="isShow4">
              <li @click="click_list(7)" :class="flag==7?'active':''"><span>员工列表</span></li>
              <li @click="click_personnelTransaction(8)" :class="flag==8?'active':''"><span>人事异动</span></li>
              <li @click="click_contractManagement(9)" :class="flag==9?'active':''"><span>合同管理</span></li>
            </ul>
          </li>
          <li :class="flagli==4?'activeLi':''">
            <div class="link" @click="toggle8(8)">
              <i class="icon iconfont icon-zhaopinguanli"></i>
              招聘管理
<i :class="classA==8 ? 'addClass' : ''" class="el-icon-arrow-right elIcon"></i>
            </div>
            <ul class="submenu" v-if="isShow8">
              <li @click="click_interviewMmanagement(10)" :class="flag==10?'active':''"><span>面试日程</span></li>
              <li @click="click_potion(11)" :class="flag==11?'active':''"><span>岗位管理</span></li>
              <li @click="click_candidate(12)" :class="flag==12?'active':''"><span>候选人管理</span></li>
              <li @click="click_potion25(13)" :class="flag==13?'active':''"><span>人才库</span></li>

            </ul>
          </li>
            <li :class="flagli==5?'activeLi':''">
                <div class="link" @click="toggle2">
                    <i class="icon iconfont icon-mobanshezhi"></i>
                    模版配置
<i :class="classA==2 ? 'addClass' : ''" class="el-icon-arrow-right elIcon"></i>
                </div>
                <ul class="submenu" v-if="isShow2">
                    <li @click="click_potion26(14)" :class="flag==14?'active':''"><span>面试模板</span></li>
                    <!--<li @click="click_contractTemplate(15)" :class="flag==15?'active':''"><span>合同模板</span></li>-->
                </ul>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageaside',
   data() {
      return {
      classA: '',
      	flagli:'',
       isShow1:false,
       isShow2:false,
       isShow3:false,
       isShow4:false,
       isShow5:false,
       isShow6:false,
       isShow7:false,
       isShow8:false,
	   isShow9:false,
       before1:true,
       after1:false,
       before2:true,
       after2:false,
       before3:true,
       after3:false,
       before4:true,
       after4:false,
       before5:true,
       after5:false,
       before6:true,
       after6:false,
       before7:true,
       after7:false,
       before8:true,
       after8:false,
       before9:true,
       after9:false,
				flag:"",
        nav: [
          {title: '离职查询', path: '/searchbefore1',sonList:[{title:'离职评价查询',path:'/searchbefore'},{title:'失信曝光查询',path:'/searchbefore2'}]},
          {title: '上传离职', path: '/twoUpload',sonList:[{title:'上传离职评价',path:'/twoUpload'},{title:'曝光失信人员',path:'/exposure'},{title:'上传记录',path:'/myupload'}]},
         /* {title: '账号管理', path: '/list',sonList:['账号安全','企业资料','联盟会员']}*/
        ],
        navIndex:0,
   };
    },
    methods: {
    	click_admin(a){
    		this.flagli=a;
    		this.$router.push('/account_alliancevip');
    	},
      routerLink(index) {
        // 点击哪个路由就赋值给自定义的下下标
        this.navIndex = index;
        // 路由跳转
        // this.$router.push(path)
      },
      toggle1:function(){
        this.isShow1 = !this.isShow1;
//      this.before1 = !this.before1;
//      this.after1 = !this.after1;
        if(this.isShow1==true){
        	this.classA=1;
        }else{
        	this.classA="";
        }
      },
      toggle2:function(){
        this.isShow2 = !this.isShow2;
        if(this.isShow2==true){
        	this.classA=2;
        }else{
        	this.classA="";
        }
      },
      toggle3:function(){
        this.isShow3 = !this.isShow3;
//      this.before3 = !this.before3;
//      this.after3= !this.after3;
this.classA=!this.classA;
      },
      toggle4:function(){
        this.isShow4 = !this.isShow4;
        if(this.isShow4==true){
        	this.classA=4;
        }else{
        	this.classA="";
        }
      },
      toggle5:function(){
        this.isShow5 = !this.isShow5;
        if(this.isShow5==true){
        	this.classA=5;
        }else{
        	this.classA="";
        }
      },
      toggle6:function(){
        this.isShow6 = !this.isShow6;
        this.before6 = !this.before6;
        this.after6= !this.after6;
      },
      toggle7:function(){
        this.isShow7 = !this.isShow7;
        this.before7 = !this.before7;
        this.after7= !this.after7;
      },
      toggle8:function(){
        this.isShow8 = !this.isShow8;
        if(this.isShow8==true){
        	this.classA=8;
        }else{
        	this.classA="";
        }
      },
      toggle9:function(){
        this.isShow9 = !this.isShow9;
        this.before9 = !this.before9;
        this.after9= !this.after9;
      },
      click_searchbefore1(a){
         this.flag=a;
         this.flagli=1;
         this.$router.push('/searchbefore');
    	},
      click_searchbefore2(a){
      	this.flag=a;
      	this.flagli=1;
    			this.$router.push('/searchbefore2');
    	},
    	click_searchrecord(a){
    		this.flag=a;
    		this.$router.push('/searchrecord');
    	},
    	click_twoUpload(a){
    		this.flag=a;
    		this.flagli=2;
    		this.$router.push('/twoUpload');
    	},
    	click_exposure(a){
    		this.flag=a;
    		this.flagli=2;
    		this.$router.push('/exposure/0');
    	},
    	click_myupload(a){
    		this.flag=a;
        this.flagli=2;
    		this.$router.push('/myupload');
    	},
    	click_exposureUpload(a){
    		this.flag=a;
    		this.$router.push('/exposureUpload');
    	},
    	click_account(a){//账号安全
    		this.flag=a;
    		this.$router.push('/account');
      },
      click_potion(a){//职位管理
        this.flag=a;
        this.flagli=4;
    		this.$router.push('/jobmanageindex');
      },
       click_potion25(a){//人才库
        this.flag=a;
        this.flagli=4;
    		this.$router.push('/talentPool');
      },
       click_potion26(a){//设置
        this.flag=a;
        this.flagli=5;
    		this.$router.push('/option');
      },
       click_candidate(a){//候选人管理
        this.flag=a;
        this.flagli=4;
    		this.$router.push('/candidatindex');
      },
      click_company(a) {//企业资料
      	this.flag=a;
        this.$router.push('/company');
      },
      click_alliancevip(a) {//联盟会员
      	this.flag=a;
        this.$router.push('/account_alliancevip');
      },
      click_bySinging(a){//发起签约
      	this.flag=a;
        this.$router.push('/newContract');
      },
      click_contractManagement(a){//合同管理
      	this.flag=a;
      	this.flagli=3;
        this.$router.push('/contractManagement');
      },
      click_contractTemplate(a){//合同模板
      	this.flag=a;
      	this.flagli=5;
        this.$router.push('/contractTemplate');
      },
      click_sendOffer(a){//发送offer
        this.flag=a;
        console.log(this.flag)
        this.$router.push('/sendOffer/null');
      },
      click_offerManage(a){//offer管理
        this.flag=a;
        this.$router.push('/offerManage');
      },
      click_setupTemplate(a){//offer管理
        this.flag=a;
        this.$router.push('/setupTemplate');
      },
      click_list(a){//员工列表
        this.flag=a;
        this.flagli=3;
        this.$router.push('/indexList');
      },
      click_employee(a){//新增员工
        this.flag=a;
        this.$router.push('/insertEmployee');
      },
      click_personnelTransaction(a){//人事异动
        this.flag=a;
        this.flagli=3;
        this.$router.push('/personnelTransaction');
      },
      toBusinessCert(a){//企业认证
        this.flag=a;
        this.$router.push('/businessCert');
      },
			click_interviewMmanagement(a){
        this.flag=a;
        this.flagli=4;
        this.$router.push('/InterviewManagement');
      },
      click_option(a){
        this.flag=a;
        this.$router.push('/option');
			}
    },
    mounted () {
      let a = window.location.href;
      let b = a.indexOf("#");
      let loginUrl = a.substring(b+2);
			if(loginUrl=='searchbefore'){
    		let that=this;
				that.isShow1=true;
				that.before1=false;
				that.after1=true;
    		that.flag=1;
    		that.flagli=1;
			}else if(loginUrl=='searchbefore2'){
    		let that=this;
				that.isShow1=true;
				that.before1=false;
				that.after1=true;
    		that.flag=2;
    		that.flagli=1;
			}else if(loginUrl=='twoUpload'){
    		let that=this;
				that.isShow5=true;
				that.before5=false;
				that.after5=true;
    		that.flag=3;
    		this.flagli=2;
			}else if(loginUrl=='exposure/0'){
    		let that=this;
				that.isShow5=true;
				that.before5=false;
				that.after5=true;
    		that.flag=4;
    		this.flagli=2;
			}else if(loginUrl=='myupload'){
    		let that=this;
				that.isShow5=true;
				that.before5=false;
				that.after5=true;
    		that.flag=5;
    		that.flagli=2;
			}else if(loginUrl=='account'){
    		let that=this;
				that.isShow3=true;
				that.before3=false;
				that.after3=true;
    		that.flag=6;
			}else if(loginUrl=='company'){
    		let that=this;
				that.isShow3=true;
				that.before3=false;
				that.after3=true;
    		that.flag=7;
			}else if(loginUrl=='account_alliancevip'){
    		let that=this;
				that.isShow3=true;
				that.before3=false;
				that.after3=true;
    		that.flag=8;
			}else if(loginUrl=='bySinging'){
    		let that=this;
				that.isShow4=true;
				that.before4=false;
				that.after4=true;
    		that.flag=9;
			}else if(loginUrl=='contractManagement'){
    		let that=this;
				that.isShow4=true;
				that.before4=false;
				that.after4=true;
    		that.flag=9;
    		this.flagli=3;
			}else if(loginUrl=='contractTemplate'){
    		let that=this;
				that.isShow2=true;
				that.before2=false;
				that.after2=true;
    		that.flag=15;
    		this.flagli=5;
			}else if(loginUrl == 'insertEmployee'){
        let that=this;
				that.isShow5=true;
				that.before5=false;
				that.after5=true;
    		that.flag=12;
			}else if(loginUrl == 'indexList'){
    		let that=this;
				that.isShow4=true;
				that.before4=false;
				that.after4=true;
    		that.flag=7;
    		that.flagli=3;
			}else if(loginUrl == 'personnelTransaction'){
    		let that=this;
				that.isShow4=true;
				that.before4=false;
				that.after4=true;
    		that.flag=8;
    		that.flagli=3;
      }else if(loginUrl=='sendOffer/null'){
				let that=this;
				that.isShow7=true;
				that.before7=false;
				that.after7=true;
			  that.flag=18;
      }else if(loginUrl=='offerManage'){
				let that=this;
				that.isShow7=true;
				that.before7=false;
				that.after7=true;
        that.flag=19;
      }else if(loginUrl=='setupTemplate'){
				let that=this;
				that.isShow7=true;
				that.before7=false;
				that.after7=true;
        that.flag=20;
      }else if(loginUrl=='businessCert'){
				let that=this;
        that.flag=111;
				that.isShow3=true;
				that.before3=false;
				that.after3=true;
      }else if(loginUrl=='jobmanageindex'){
				let that=this;
        that.flag=11;
				that.isShow8=true;
				that.before8=false;
				that.after8=true;
				this.flagli=4;
       }else if(loginUrl=='InterviewManagement'){
				let that=this;
				that.flag=10;
				that.isShow8=true;
				that.before8=false;
				that.after8=true;
				this.flagli=4;
			}
			else if(loginUrl=='candidatindex') {
        let that=this;
				that.flag=12;
				that.isShow8=true;
				that.before8=false;
				that.after8=true;
				this.flagli=4;
      }else if(loginUrl=='talentPool') {
        let that=this;
        that.flag=13;
        that.isShow8=true;
        that.before8=false;
        that.after8=true;
        this.flagli=4;
      }else if(loginUrl=='option'){
        let that=this;
				that.flag=14;
				that.isShow2=true;
				that.before2=false;
				that.after2=true;
				this.flagli=5;
      }else if(loginUrl=='admin'){
      	that.flagli=0;
      }
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("../../assets/css/asideiconfont/demo.css");
@import url("../../assets/css/asideiconfont/iconfont.css");
.main .aside{
	height: 100%;
	overflow-x: auto;
}
.main .aside .accordion .submenu li span{
	display: block;
	text-decoration: none;
	color: #7A8699;
	padding: 0 60px;
	-webkit-transition: all 0.25s ease;
	transition: all 0.25s ease;
	cursor: pointer;
}
.main .aside .accordion .submenu li:hover span{
	color: #F95714;
}
.fa_down{
	  width: 8px !important;
    height: 4.7px !important;
}
.main .aside .accordion .submenu li.active span{
  color: #F95714;
}
.activeLi{background: linear-gradient(135deg,rgba(254,147,56,1) 0%,rgba(249,117,55,1) 99%,rgba(249,87,20,1) 100%);}
.activeLi .link i,.activeLi .link{color: #fff !important;}
.elIcon{
	  right: 10px;
    left: auto !important;
    font-size: 14px;
    top: 14px;
}
.addClass{
	transform: rotate(90deg);
}
</style>


