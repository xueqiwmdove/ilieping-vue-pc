import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/reg/login'
import reg from '@/components/reg/reg'
import agree from '@/components/reg/agree'
import phoneAuth from '@/components/reg/phoneAuth'
import restPsd from '@/components/reg/restPsd'
import regSuccess from '@/components/reg/regSuccess'
import regCompany from '@/components/reg/regCompany'

import alliancevip from '@/components/company/alliancevip'

import company from '@/components/account/company'
import message from '@/components/messageCenter/message'
import newMessage from '@/components/messageCenter/newMessage'

// import certificate from '@/components/account/certificate'

import account_alliancevip from '@/components/account/alliancevip'
import account from '@/components/account/account'
import updateMobile from '@/components/account/updateMobile'
import updatePsd from '@/components/account/updatePsd'
import address from '@/components/account/address' //企业信息-企业地址
import scale from '@/components/account/scale' //企业信息-企业地址
import industry from '@/components/account/industry' //企业信息-所属行业

import exposureupload from '@/components/leave/exposureupload'
import myupload from '@/components/leave/myupload'
import exposure from '@/components/leave/exposure'
import twoUpload from '@/components/leave/twoUpload'
import searchrecord from '@/components/leave/searchrecord'
import searchbefore from '@/components/leave/searchbefore'
import searchbefore2 from '@/components/leave/searchbefore2'

import searchResult from '@/components/leave/searchResult'

import quickUpload from '@/components/leave/quickUpload'
import uploadOne from '@/components/leave/uploadOne'
import uploadTwo from '@/components/leave/uploadTwo'
import uploadThree from '@/components/leave/uploadThree'
import uploadFour from '@/components/leave/uploadFour'
import competency from '@/components/leave/competency'
import leaveReport from '@/components/leave/leaveReport'
import exposureReport from '@/components/leave/exposureReport'
import quickReport from '@/components/leave/quickReport'

//合同管理
import bySinging from '@/components/contract/bySinging'
import contractManagement from '@/components/contract/contractManagement'//合同管理
import contractTemplate from '@/components/contract/contractTemplate'
import selectTemplates from '@/components/contract/selectTemplates'//发起签约，选择模板
import contractDetail from '@/components/contract/contractDetail'//合同签约


//员工管理
import IndexList from '@/components/employeeManage/indexList'//员工列表
import Archives from '@/components/employeeManage/archives'//员工档案
import staffInfo from '@/components/employeeManage/staffInfo'//员工资料
// import staffProfile from '@/components/employeeManage/staffProfile'//员工列表
import insertEmployee from '@/components/employeeManage/insertEmployee'//新增员工
import insertNewEmployee from '@/components/employeeManage/insertNewEmployee'//新增员工
import employeeSalary from '@/components/employeeManage/employeeSalary'//薪资福利
import insertSuccess from '@/components/employeeManage/insertSuccess'//薪资福利

/* 管网静态页面  */
import newWitesite_index from '@/components/newWitesite/newWitesite_index'
import wasAsked from '@/components/newWitesite/wasAsked'
import contact from '@/components/newWitesite/contact'
import leaveAssessment from '@/components/newWitesite/leaveAssessment'
import ablityAssessment from '@/components/newWitesite/ablityAssessment'

import brokenQuery from '@/components/newWitesite/brokenQuery'

//入职管理
import setupTemplate from '@/components/entryManagement/setupTemplate'//offer模板设置
import offerManage from '@/components/entryManagement/offerManage'//合同签约
import sendOffer from '@/components/entryManagement/sendOffer'//合同签约
import previewOffer from '@/components/entryManagement/previewOffer'//预览offer
import sendSuccess from '@/components/entryManagement/sendSuccess'//发送成功
import emailInfo from '@/components/entryManagement/emailInfo'//邮件接收成功

//账号管理
import businessManager from '@/components/account/businessManager'//企业经办人
import businessCert from '@/components/account/certificate' //企业认证

import hr from '@/components/hr/hr'//人事流程

import HelloWorld from '@/components/reg/HelloWorld'

/* 合同模板 */
import customContractTemplate from '@/components/template/customContractTemplate'
import InterviewManagement from '@/components/Interview/InterviewManagement' //面试管理


Vue.use(Router);
const router =new Router({
  linkActiveClass:'active',
  routes: [
		{
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
		},
    {//登录
      path: '/login',
      name: 'login',
      component: login
    },
    {//注册
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {//用户协议
      path: '/agree',
      name: 'agree',
      component: agree
    },
    {//忘记密码
      path: '/phoneAuth',
      name: 'phoneAuth',
      component: phoneAuth
    },
    {//重置密码
      path: '/restPsd',
      name: 'restPsd',
      component: restPsd
    },
    {//注册成功
      path: '/regSuccess',
      name: 'regSuccess',
      component: regSuccess
    },
    {//完善企业信息
      path: '/regCompany',
      name: 'regCompany',
      component: regCompany
    },
    {//加入会员
      path: '/alliancevip',
      name: 'alliancevip',
      component: alliancevip
    },
    {//企业资料
      path: '/company',
      name: 'company',
      component: company
    },
    // {//企业认证
    //   path: '/certificate',
    //   name: 'certificate',
    //   component: certificate
    // },
    {//消息中心
      path: '/message',
      name: 'message',
      component: message
    },
     {//消息中心
      path: '/newMessage',
      name: 'newMessage',
      component: newMessage
    },
    {//联盟会员
      path: '/account_alliancevip',
      name: 'account_alliancevip',
      component: account_alliancevip
    },
    {//账号安全
      path: '/account',
      name: 'account',
      component: account
    },
    {//修改手机号
      path: '/updateMobile',
      name: 'updateMobile',
      component: updateMobile
    },
    {//修改密码
      path: '/updatePsd',
      name: 'updatePsd',
      component: updatePsd
    },
    {//企业地址
      path: '/address',
      name: 'address',
      component: address
    },
    {//企业资料
      path: '/scale',
      name: 'scale',
      component: scale
    },
    {//所属行业
      path: '/industry',
      name: 'industry',
      component: industry,
      meta:{
        breadNumber:2,
      }
    },
    {//上传曝光记录
      path: '/exposureupload',
      name: 'exposureupload',
      component: exposureupload
    },
    {//上传离职记录
      path: '/myupload',
      name: 'myupload',
      component: myupload
    },
    {//曝光失信行为
      path: '/exposure',
      name: 'exposure',
      component: exposure
    },
    {//上传离职评价
      path: '/twoUpload',
      name: 'twoUpload',
      component: twoUpload
    },
    {//查询记录
      path: '/searchrecord',
      name: 'searchrecord',
      component: searchrecord
    },
    {//离职评价
      path: '/searchbefore',
      name: 'searchbefore',
      component: searchbefore
    },
    {//失信曝光查询
      path: '/searchbefore2',
      name: 'searchbefore2',
      component: searchbefore2
    },
    {//搜索结果
      path: '/searchResult/:type',
      name: 'searchResult',
      component: searchResult
    },
    {//快速上传
      path: '/quickUpload',
      name: 'quickUpload',
      component: quickUpload
    },
    {//上传1
      path: '/uploadOne',
      name: 'uploadOne',
      component: uploadOne
    },
    {//上传2
      path: '/uploadTwo',
      name: 'uploadTwo',
      component: uploadTwo
    },
    {//上传3
      path: '/uploadThree',
      name: 'uploadThree',
      component: uploadThree
    },
    {//上传4
      path: '/uploadFour',
      name: 'uploadFour',
      component: uploadFour
    },
    {//胜任力测评
      path: '/competency/:reportId/:flag',
      name: 'competency',
      component: competency
    },
    {//离职报告
      path: '/leaveReport/:reportId',
      name: 'leaveReport',
      component: leaveReport
    },
    {//曝光报告
      path: '/exposureReport/:reportId',
      name: 'exposureReport',
      component: exposureReport
    },
    {//快速上传报告
      path: '/quickReport/:reportId',
      name: 'quickReport',
      component: quickReport
    },
    {//发起签约
      path: '/bySinging',
      name: '发起签约',
      component: bySinging,
    },
    {//员工合同管理
      path: '/contractManagement',
      name: 'contractManagement',
      component: contractManagement
    },
    {//合同模板
      path: '/contractTemplate',
      name: 'contractTemplate',
      component: contractTemplate
    },
    {//发起签约。选择模板
      path: '/selectTemplates',
      name: 'selectTemplates',
      component: selectTemplates
    },
    {//签约合同
      path: '/contractDetail/:id',
      name: 'contractDetail/:id',
      component: contractDetail
    },
    {//官网首页
      path: '/',
      name: 'newWitesite_index',
      component: newWitesite_index

    },
    {//背景征调
      path: '/wasAsked',
      name: 'wasAsked',
      component: wasAsked

    },
    {//官网联系我们
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {//官网离职被调
      path: '/leaveAssessment',
      name: 'leaveAssessment',
      component: leaveAssessment
    },
    {//职场能力评估
      path: '/ablityAssessment',
      name: 'ablityAssessment',
      component: ablityAssessment
    },
    {//失信查询
      path: '/brokenQuery',
      name: 'brokenQuery',
      component: brokenQuery
    },
    {//合同模板管理
      path:'/setupTemplate',
      name:'setupTemplate',
      component:setupTemplate,
    },
    {//发送offer
      path:'/sendOffer/:offerId',
      name:'发送offer',
      component:sendOffer,
      meta:{
        breadNumber:1,
      }
    },
    {//预览offer
      path:'/previewOffer/:offerId',
      name:'预览offer',
      component:previewOffer,
      meta:{breadNumber:2}
    },
    {//发送成功
      path:'/sendSuccess',
      name:'sendSuccess',
      component:sendSuccess
    },
    {//offer管理
      path:'/offerManage',
      name:'offerManage',
      component:offerManage,
      meta:{breadNumber:1}
    },
    {// 员工列表
      path:'/indexList',
      name:'indexList',
      component:IndexList,
    },
    {//员工档案
      path:'/archives',
      name:'archives',
      component:Archives,
    },
    {// 员工资料
      path:'/staffInfo',
      component:staffInfo
    },
    {// 企业经办人
      path:'/businessManager',
      component:businessManager
    },
    {// 企业认证
      path:'/businessCert',
      component:businessCert
    },
    {// 人事流程
      path:'/hr',
      name:'hr',
      component:hr,
    },
    {
      path:'/emailInfo/:id/:msg',
      name:'emailInfo',
      component:emailInfo
    },
    {//员工录入
      path: '/insertEmployee',
      name: 'insertEmployee',
      component: insertEmployee,
    },
    {//员工录入
      path: '/insertNewEmployee',
      name: 'insertNewEmployee',
      component: insertNewEmployee,
    },
    {//薪资福利
      path: '/employeeSalary/:employeeId',
      name: 'employeeSalary',
      component: employeeSalary,
    },
    {//添加陈宫
      path: '/insertSuccess',
      name: 'insertSuccess',
      component: insertSuccess,
    },
		{
				path: '/customContractTemplate',
				name: 'customContractTemplate',
				component: customContractTemplate,
		},
		{
			path: '/InterviewManagement',
			name: 'InterviewManagement',
			component: InterviewManagement,
		},
		
  ]
});


router.beforeEach((to, from, next) => {
	if(!localStorage.jingjing_login_token && to.path!=='/' && to.name !== 'phoneAuth' && to.name !== 'reg' && to.name !== 'regCompany' && to.name !== 'regSuccess' && to.name !== 'agree'  && to.name !== 'restPsd' && to.name !== 'ablityAssessment' && to.name !== 'leaveAssessment' && to.name !== 'contact' && to.name !== 'wasAsked' && to.name !== 'newWitesite_index' && to.name !== 'bySinging' && to.name !== 'brokenQuery' && to.name !== 'login'){
     router.push({path:'/login'});
	}else{
	    let a = window.location.href;
        let b = a.indexOf("#");
	    let loginUrl = a.substring(b+2);
	    if(loginUrl){
	      localStorage.loginUrl = loginUrl;
	    }
//	   console.log(to.path);
//	   console.log(router.push);
//         localStorage.setItem("oldUrl",to.path);
	   next();
	}
});
export default router;
