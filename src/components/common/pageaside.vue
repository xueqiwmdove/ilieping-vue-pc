<template>
  <div>
   <!--侧边栏-->
    <div class="aside">
        <ul id="accordion" class="accordion">
            <li>
                <div class="link" @click="toggle1" >
                    <i class="fa fa-paint-brush">
                        <img src="../../assets/img/dismission/index_dimission.svg" alt="" class="click-before" v-if="before1">
                        <img src="../../assets/img/dismission/ic_dimission_cb.svg" alt="" class="click-after" v-if="after1">
                    </i>
                    <!--评价与失信查询-->
                             离职查询
                    <i class="fa fa-chevron-down">
                        <img src="../../assets/img/dismission/ic_top.svg" alt="" class="click-before" v-if="before1">
                        <img src="../../assets/img/dismission/ic_down.svg" alt="" class="click-after fa_down" v-if="after1">
                    </i>
                </div>
                <ul class="submenu" v-if="isShow1">
                   <li @click="click_searchbefore1(1)" :class="flag==1?'active':''"><span>离职评价查询</span></li>
                   <li @click="click_searchbefore2(2)" :class="flag==2?'active':''"><span>失信曝光查询</span></li>
                </ul>
            </li>
            <li>
            <div class="link" @click="toggle5">
              <i class="fa fa-globe">
                <img src="../../assets/img/staff/ic_yuangongguanli.svg" alt="" class="click-before"  v-if="before5">
                <img src="../../assets/img/staff/ic_yuangongguanli2.svg" alt="" class="click-after" v-if="after5">
              </i>
            员工管理
              <i class="fa fa-chevron-down">
                <img src="../../assets/img/dismission/ic_top.svg" alt="" class="click-before" v-if="before5">
                <img src="../../assets/img/dismission/ic_down.svg" alt="" class="click-after fa_down" v-if="after5">
              </i>
            </div>
            <ul class="submenu" v-if="isShow5">
              <li @click="click_list(13)" :class="flag==13?'active':''"><span>员工列表</span></li>
              <li @click="click_employee(12)" :class="flag==12?'active':''"><span>录入新员工</span></li>
            </ul>
          </li>
          <li>
            <div class="link" @click="toggle4">
              <i class="fa fa-globe">
                <img src="../../assets/img/contract/ic_hetong.svg" alt="" class="click-before"  v-if="before4">
                <img src="../../assets/img/contract/ic_hetong2.svg" alt="" class="click-after" v-if="after4">
              </i>
              合同管理
              <i class="fa fa-chevron-down">
                <img src="../../assets/img/dismission/ic_top.svg" alt="" class="click-before" v-if="before4">
                <img src="../../assets/img/dismission/ic_down.svg" alt="" class="click-after fa_down" v-if="after4">
              </i>
            </div>
            <ul class="submenu" v-if="isShow4">
              <li @click="click_bySinging(9)" :class="flag==9?'active':''"><span>发起签约</span></li>
              <li @click="click_contractManagement(10)" :class="flag==10?'active':''"><span>员工合同管理</span></li>
              <li @click="click_contractTemplate(11)" :class="flag==11?'active':''"><span>合同模板</span></li>
            </ul>
          </li>
          <li>
            <div class="link" @click="toggle8">
              <i class="fa fa-globe">
                <img src="../../assets/img/dismission/ic_personnel_process.svg" alt="" class="click-before"  v-if="before8">
                <img src="../../assets/img/dismission/ic_personnel_process_pre.svg" alt="" class="click-after" v-if="after8">
              </i>
              人事异动
              <i class="fa fa-chevron-down">
                <img src="../../assets/img/dismission/ic_top.svg" alt="" class="click-before" v-if="before8">
                <img src="../../assets/img/dismission/ic_down.svg" alt="" class="click-after fa_down" v-if="after8">
              </i>
            </div>
            <ul class="submenu" v-if="isShow8">
              <li @click="click_hr(25)" :class="flag==25?'active':''"><span>人事异动</span></li>
            </ul>
          </li>
            <li>
                <div class="link" @click="toggle2">
                    <i class="fa fa-globe">
                        <img src="../../assets/img/dismission/ic_upload.svg" alt="" class="click-before" v-if="before2">
                        <img src="../../assets/img/dismission/ic_upload_cb.svg" alt="" class="click-after" v-if="after2">
                    </i>
                    上传离职
                    <i class="fa fa-chevron-down">
                        <img src="../../assets/img/dismission/ic_top.svg" alt="" class="click-before" v-if="before2">
                        <img src="../../assets/img/dismission/ic_down.svg" alt="" class="click-after fa_down" v-if="after2">
                    </i>
                </div>
                <ul class="submenu" v-if="isShow2">
                    <li @click="click_twoUpload(3)" :class="flag==3?'active':''"><span>上传离职评价</span></li>
                    <li @click="click_exposure(4)" :class="flag==4?'active':''"><span>曝光失信人员</span></li>
                    <li @click="click_myupload(5)" :class="flag==5?'active':''"><span>上传记录</span></li>
                </ul>
            </li>
            <li>
                <div class="link" @click="toggle3">
                    <i class="fa fa-globe">
                        <img src="../../assets/img/dismission/ic_account_number.svg" alt="" class="click-before"  v-if="before3">
                        <img src="../../assets/img/dismission/ic_account_number_orange.svg" alt="" class="click-after" v-if="after3">
                    </i>
                    账号管理
                    <i class="fa fa-chevron-down">
                        <img src="../../assets/img/dismission/ic_top.svg" alt="" class="click-before" v-if="before3">
                        <img src="../../assets/img/dismission/ic_down.svg" alt="" class="click-after fa_down" v-if="after3">
                    </i>
                </div>
                <ul class="submenu" v-if="isShow3">
                    <li @click="click_account(6)" :class="flag==6?'active':''"><span>账号安全</span></li>
                    <li @click="toBusinessCert(111)" :class="flag==111?'active':''"><span>企业认证</span></li>
                    <li @click="click_company(7)" :class="flag==7?'active':''"><span>企业资料</span></li>
                    <!-- <li @click="click_alliancevip(8)" :class="flag==8?'active':''"><span>联盟会员</span></li> -->
                </ul>
            </li>
              <li>
                <div class="link" @click="toggle9">
                    <i class="fa fa-globe">
                        <img src="../../assets/img/edition_1.5/houxuan_ic_recruitment.png" alt="" class="click-before"  v-if="before9">
                        <img src="../../assets/img/edition_1.5/houxuan_ic_recruitment_pre.png" alt="" class="click-after" v-if="after9">
                    </i>
                   招聘管理
                    <i class="fa fa-chevron-down">
                        <img src="../../assets/img/dismission/ic_top.svg" alt="" class="click-before" v-if="before9">
                        <img src="../../assets/img/dismission/ic_down.svg" alt="" class="click-after fa_down" v-if="after9">
                    </i>
                </div>
                <ul class="submenu" v-if="isShow9">
                    <li @click="click_potion(21)" :class="flag==21?'active':''"><span>职位管理</span></li>
                    <li @click="click_candidate(22)" :class="flag==22?'active':''"><span>候选人管理</span></li>
                     <li @click="click_interviewMmanagement(30)" :class="flag==30?'active':''"><span>面试管理</span></li>
                     <li @click="click_option(31)" :class="flag==31?'active':''"><span>设置</span></li>
                    <li @click="click_potion25(25)" :class="flag==25?'active':''"><span>人才库</span></li>
                    <li @click="click_potion26(26)" :class="flag==26?'active':''"><span>设置</span></li>
                </ul>
            </li>


          <!-- <li>
            <div class="link" @click="toggle7">
              <i class="fa fa-globe">
                <img src="../../assets/img/entryManagement/ic_ruzhiguanli.svg" alt="" class="click-before"  v-if="before7">
                <img src="../../assets/img/entryManagement/ic_ruzhiguanli2.svg" alt="" class="click-after" v-if="after7">
              </i>
              入职管理
              <i class="fa fa-chevron-down">
                <img src="../../assets/img/dismission/ic_top.svg" alt="" class="click-before" v-if="before7">
                <img src="../../assets/img/dismission/ic_down.svg" alt="" class="click-after fa_down" v-if="after7">
              </i>
            </div>
            <ul class="submenu" v-if="isShow7">
              <li @click="click_sendOffer(18)" :class="flag==18?'active':''"><span>发起offer</span></li>
              <li @click="click_offerManage(19)" :class="flag==19?'active':''"><span>offer管理</span></li>
              <li @click="click_setupTemplate(20)" :class="flag==20?'active':''"><span>offer模板设置</span></li>
            </ul>
          </li> -->

        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageaside',
   data() {
      return {
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
       isActive:true,
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
      routerLink(index) {
        // 点击哪个路由就赋值给自定义的下下标
        this.navIndex = index;
        // 路由跳转
        // this.$router.push(path)
      },
      toggle1:function(){
        this.isShow1 = !this.isShow1;
        this.before1 = !this.before1;
        this.after1 = !this.after1;
      },
      toggle2:function(){
        this.isShow2 = !this.isShow2;
        this.before2 = !this.before2;
        this.after2= !this.after2;
      },
      toggle3:function(){
        this.isShow3 = !this.isShow3;
        this.before3 = !this.before3;
        this.after3= !this.after3;
      },
      toggle4:function(){
        this.isShow4 = !this.isShow4;
        this.before4 = !this.before4;
        this.after4= !this.after4;
      },
      toggle5:function(){
        this.isShow5 = !this.isShow5;
        this.before5 = !this.before5;
        this.after5= !this.after5;
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
        this.before8 = !this.before8;
        this.after8= !this.after8;
      },
      toggle9:function(){
        this.isShow9 = !this.isShow9;
        this.before9 = !this.before9;
        this.after9= !this.after9;
      },
      click_searchbefore1(a){
         this.isActive=true;
         this.flag=a;
    		 this.$router.push('/searchbefore');
    	},
      click_searchbefore2(a){
      	this.flag=a;
    			this.$router.push('/searchbefore2');
    	},
    	click_searchrecord(a){
    		this.flag=a;
    		this.$router.push('/searchrecord');
    	},
    	click_twoUpload(a){
    		this.flag=a;
    		this.$router.push('/twoUpload');
    	},
    	click_exposure(a){
    		this.flag=a;
    		this.$router.push('/exposure');
    	},
    	click_myupload(a){
    		this.flag=a;
    		this.$router.push('/myupload');
    	},
    	click_exposureUpload(a){
    		this.flag=a;
    		this.$router.push('/exposureUpload');
    	},
    	click_account(a){
    		this.flag=a;
    		this.$router.push('/account');
      },
      click_potion(a){//职位管理
        this.flag=a;
    		this.$router.push('/jobmanageindex');
      },
       click_potion25(a){//人才库
        this.flag=a;
    		this.$router.push('/jobmanageindex');
      },
       click_potion26(a){//设置
        this.flag=a;
    		this.$router.push('/jobmanageindex');
      },
       click_candidate(a){//候选人管理
        this.flag=a;
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
        this.$router.push('/bySinging');
      },
      click_contractManagement(a){//合同管理
      	this.flag=a;
        this.$router.push('/contractManagement');
      },
      click_contractTemplate(a){//合同模板
      	this.flag=a;
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
        this.$router.push('/indexList');
      },
      click_employee(a){//新增员工
        this.flag=a;
        this.$router.push('/insertEmployee');
      },
      click_hr(a){//人事流程
        this.flag=a;
        this.$router.push('/hr');
      },
      toBusinessCert(a){
        this.flag=a;
        this.$router.push('/businessCert');
      },
			click_interviewMmanagement(a){
        this.flag=a;
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
			}else if(loginUrl=='searchbefore2'){
    		let that=this;
				that.isShow1=true;
				that.before1=false;
				that.after1=true;
    		that.flag=2;
			}else if(loginUrl=='twoUpload'){
    		let that=this;
				that.isShow2=true;
				that.before2=false;
				that.after2=true;
    		that.flag=3;
			}else if(loginUrl=='exposure'){
    		let that=this;
				that.isShow2=true;
				that.before2=false;
				that.after2=true;
    		that.flag=4;
			}else if(loginUrl=='myupload'){
    		let that=this;
				that.isShow2=true;
				that.before2=false;
				that.after2=true;
    		that.flag=5;
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
    		that.flag=10;
			}else if(loginUrl=='contractTemplate'){
    		let that=this;
				that.isShow4=true;
				that.before4=false;
				that.after4=true;
    		that.flag=11;
			}else if(loginUrl == 'insertEmployee'){
        let that=this;
				that.isShow5=true;
				that.before5=false;
				that.after5=true;
    		that.flag=12;
			}else if(loginUrl == 'indexList'){
    		let that=this;
				that.isShow5=true;
				that.before5=false;
				that.after5=true;
    		that.flag=13;
			}else if(loginUrl == 'hr'){
    		let that=this;
				that.isShow8=true;
				that.before8=false;
				that.after8=true;
    		that.flag=25;
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
        that.flag=9;
				that.isShow9=true;
				that.before9=false;
				that.after9=true;
 	    }else if(loginUrl=='InterviewManagement'){
				let that=this;
				that.flag=30;
				that.isShow9=true;
				that.before9=false;
				that.after9=true;
			}else if(loginUrl=='candidatindex') {
        let that=this;
				that.flag=9;
				that.isShow9=true;
				that.before9=false;
				that.after9=true;
      }	else if(loginUrl=='option'){
        let that=this;
				that.flag=31;
				that.isShow9=true;
				that.before9=false;
				that.after9=true;
      }
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>


