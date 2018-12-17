// let Butterfly="http://101.132.66.158:8899/jersey/";
// let Butterfly="http://127.0.0.1:8899/jersey/";
let Butterfly="http://192.168.2.166:8899/jersey/";//测试ip
// let Butterfly="http://192.168.6.6:8899/jersey/";//薛尧
// let Butterfly="http://192.168.6.209:8891/jersey/";//潘述钱ip
// let Butterfly="http://192.168.6.208:8891/jersey/";//郭峰ips
// let Butterfly="http://192.168.6.207:8899/jersey/";//施玮ip
// let Butterfly="http://192.168.6.195:8899/jersey/";//李博凯
// let Butterfly="http://192.168.6.188:8899/jersey/";//曹莉

const api = {
  baseUrl:Butterfly,
  signContract:Butterfly+'sign/initiate/contract/',
  showContractImg:Butterfly+'sign/search/display/info/contract/',//展示待签署合同的图片
  createContract:Butterfly+'sign/create/undetermined/contract',//创建待定合同
  employeList:Butterfly+'department/get/',//员工
  returnEmployeeDetail:Butterfly+'sign/contractDisplayCid/',//回显员工信息
  json:Butterfly+'contactUs/test',//测试合同管理json数据格式
  jsonData:Butterfly+'sign/search/contract/show/json/',//接口合同管理json数据格式
	jsonDatacontract:Butterfly+'/sign/create/undetermined/contract',
  user:Butterfly+'enterpriseInfo/current/user',
  detail:Butterfly+'enterpriseDate/enterprise/detail',
  isPhone:Butterfly+'enterpriseInfo/register/isPhone/',
  login:Butterfly+'login',
  mobile:Butterfly+'sys/mobile',
  mobiletoken:Butterfly+'sms/login',
  sms:Butterfly+'sys/send/validate/sms',
  smstoken:Butterfly+'send/validate/sms',
  password:Butterfly+'enterpriseInfo/forget/password',
  validate:Butterfly+'enterpriseInfo/validate',
  industry:Butterfly+'system/get/enterprise_industry',
  update_phone:Butterfly+'enterpriseInfo/update/phone',
  update_password:Butterfly+'enterpriseInfo/update/password',
  integral:Butterfly+'enterpriseInfo/account/integral',
  search:Butterfly+'user/record/search/1/10',//查询数据结果
  search2:Butterfly+'user/record/search/',//查询数据结果页面
  certification:Butterfly+'enterpriseDate/enterprise/certification',//企业认证接口
  address:Butterfly+'enterpriseDate/enterprise/address',//修改地址
  scale:Butterfly+'enterpriseDate/enterprise/scale',//公司规模
  company_industry:Butterfly+'enterpriseDate/own/industry',//所属行业
  myupload_table:Butterfly+'user/page/',//
  tests:Butterfly+'dimission/evaluation/questions/hr/',//测题
  leaveReport:Butterfly+'report/get/',//获取离职报告信息
  register:Butterfly+'enterpriseInfo/register',//注册
  messageList:Butterfly+'website/message/list/',//消息中心
  leaveReasonAlert:Butterfly+'dimission/resignation/reason/',//获取离职原因弹窗,
  quickUpload:Butterfly+'dimission/quick/insert',//快速评价插入信息
  exposureReport:Butterfly+"dishonesty/getDishonesty/",//获取曝光报告
  myupload_delete:Butterfly+'user/delete/',//删除上传记录
  api_dimissionList:Butterfly+'dimission/dishonesty/list',//
  uploadOne:Butterfly+"dimission/insert/info",//上传第一步
  uploadTwo: Butterfly + "dimission/insert/result",//上传第二步,
  submitTest:Butterfly+'dimission/insert/result/question',//提交测试题
  uoloadThree:Butterfly + "dimission/dishonesty/insert",//上传第三步，插入失信信息
  userInfo:Butterfly+ "user/getUserInfoByDimissionId/",//上传第四步里面的回显用户基本信息
  uploadFour:Butterfly + "dimission/dishonesty/upload",//上传第四步
  quickReport:Butterfly+"dishonesty/getFast/",//快速上传报告
  workVerify:Butterfly+'dishonesty/insert/workVerify',//曝光失信人员
  Integral:Butterfly+'user/minusReduction',//积分接口
  searchAgreementList:Butterfly+'sign/searchAgreementList/',
  seeMessage:Butterfly+'website/read/message/',//消息中心查看
  deletemessage:Butterfly+'website/remove/message/',//消息中心删除
  templateKinds:Butterfly+'sign/page/find',//合同模板查询，
  hrSendContract:Butterfly+'sign/save/contract',//hr 发送合同，保存合同内容
  folder:Butterfly+'folder/getListFolder',//查询所有的文件夹
  deletefolder:Butterfly+'folder/del/',//查询所有的文件夹
  insertfolder:Butterfly+'folder/insert/',//新建文件夹
  updatefolder:Butterfly+'folder/update',//文件夹重命名
  setArchive:Butterfly+'sign/archive/',//试用期 合同管理 合同归档 重新归档
  contactUs:Butterfly+'contactUs/contact/us',//联系我们
  remind:Butterfly+'sign/remind',//员工合同管理 提醒接口
  cancelContract:Butterfly+'sign/cancel/',//员工合同管理 撤销合同 接口
  signAgreementContract:Butterfly+'sign/signAgreement',//员工合同管理 签署合同 接口
  exportContract:Butterfly+'download/export',//员工合同管理 下载合同 接口
  cancelArchiveContract:Butterfly+'sign/cancelArchive/',//员工合同管理取消归档合同 接口
  clickSign:Butterfly+'sign/save/check',//点击签约
  detailContract:Butterfly+'sign/detail/',//员工合同管理取消归档合同 接口
  countContract:Butterfly+'sign/count',//员工合同管理统计各类合同的数量
   // duan
  employeeList:Butterfly+'employee/getEmployeeList',//员工列表
  treeList:Butterfly+'org/structure',//员工架构
  addpartment:Butterfly+'org/insertDept',//员工列表新增部门
  updatepartment:Butterfly+'org/update',//修改部门（移动，重命名）
  deleteDept:Butterfly+'org/deleteDept',//删除部门
  turnPositive:Butterfly+'employee/turnPositive',//提前转正
  resignation:Butterfly+'employee/resignation',//员工离职办理
  personChange:Butterfly+'employee/personChange',//人事流程变更
  deleteEmployee:Butterfly+'employee/delete',//删除员工
  countPerson:Butterfly+'employee/countEmployee',//总人数
  counts:Butterfly+'org/dept/counts',//统计部门人数
  messageLists:Butterfly+'website/message/list',//信息列表
  getAddress:Butterfly+'enterpriseDate/enterprise/address/get',//地址（优化）
  deleteAddress:Butterfly+'enterpriseDate/enterprise/address/delete',//删除企业地址
  saveAddress:Butterfly+'enterpriseDate/enterprise/address/save',//添加企业地址
  updatesAddress:Butterfly+'enterpriseDate/enterprise/address/update',//更新企业地址
  getUpdatesAddress:Butterfly+'enterpriseDate/enterprise/address/get',//获取编辑对应id企业地址
  dot:Butterfly+'website/has/message',//信息点点

  hr_list:Butterfly+'process/list',//查询人事流程列表
  hr_revoke:Butterfly+'process/revoke',//查询人事流程 撤销人事流程

  offerManageList:Butterfly+'offer/find/list',//offer管理列表1
  sendOffer:Butterfly+'offer/save/offerUserInfo',//发送offer第一步3
  sendOfferId:Butterfly+'offer/send/',//发送offer8
  offerDetail:Butterfly+'offer/detail/',//查看offer5
  offerDetailButton:Butterfly+'offer/detailHTML/',//查看offer按钮4
  updateOfferStatus:Butterfly+'offer/update/',//修改offer状态6
  offerModelSearch:Butterfly+'offer/template/',//offer模板查询2
  searchCompanyStructure:Butterfly+'org/structure',//公司组织架构
  addDepartment:Butterfly+'org/insertDept',//新增部门
   updateOfferModel:Butterfly+'offer/template/update',//跟新offer模板7
  confirmOffer:Butterfly+'offer/updatePC/',//确认接收此offer

  // hr_revoke:Butterfly+'process/revoke',//查询人事流程 撤销人事流程
  hr_details:Butterfly+'process/details/',//查询人事流程详情
  hr_exp:Butterfly+'download/annex/',//人事附件下载
  employInsert:Butterfly+'employee/insert',//员工信息
  employSalary:Butterfly+'employee/salary/insert',//薪资
  //=>zhoushuang
  employeeArchives:`${Butterfly}employee/archives`, //员工档案a /{id}
  employeeProcess:`${Butterfly}employee/getProcess`,//员工历程 /{employeeId}
  employeeDel:`${Butterfly}employee/delete`,//删除员工 /{id}
  staffPersonChange:`${Butterfly}employee/personChange`,//人事变更
  staffTurnPositive:`${Butterfly}employee/turnPositive`,//员工转正
  staffResignation:`${Butterfly}employee/resignation`,//员工离职
  staffList:`${Butterfly}process/list`,//人事流程 process/list
  updataEmployee:`${Butterfly}employee/update/employee`,//更新员工信息
  updateSalary:`${Butterfly}employee/update/salary`,//更新员工薪资
  archivesUploadPhoto:`${Butterfly}employee/upload/photo`,//员工档案图片上传
  archivesUploadFile:`${Butterfly}employee/upload/annexInfo`,//员工档案文件上传
	archivesUploadFileList:`${Butterfly}employee/upload/annexInfoMore`,//上传多张照片
  archivesDelFile:`${Butterfly}employee/delete/annexInfo`,//员工档案删除附件
  archivesLoadFile:`${Butterfly}download/annex`,//员工档案下载附件
  getAuthCertData:`${Butterfly}enterpriseDate/enterprise/getCertification`, //获取企业认证数据

	//jing
  interviewListToday:Butterfly+'interview/today/list/',//1.5版本面试管理 今天的面试
  interviewListBefore:Butterfly+'interview/before/list/',//1.5版本面试管理 明天及之后的面试
	interviewListAfter:Butterfly+'interview/after/list/',//1.5版本面试管理 昨天及之前的面试

  interviewListAfter:Butterfly+'interview/after/list/',//1.5版本面试管理 昨天及之前的面试
  getphone:Butterfly+'current/login/phone',//账户信息获取手机号
 // duan
  getPosition:Butterfly+'positionInfo/getPosition',//职位列表
  getAddress:Butterfly+'enterpriseDate/enterprise/address/get',//企业地址列表
  structurePerson:Butterfly+'org/structure/',//人员架构列表
  positionCount:Butterfly+'positionInfo/count',//不同岗位统计人数
  getEmployeeList:Butterfly+'employee/getEmployeeList',//招聘负责人，面试官列表
  insertOrUpdate:Butterfly+'positionInfo/insertOrUpdate',//添加，更新岗位
  positionDetail:Butterfly+'positionInfo/detail',//添加，更新岗位  
  getPosition:Butterfly+'positionInfo/getPosition',//查询职位列表  
  candidateList:Butterfly+'candidate/search/list',//查询候选人列表  
  getGrouping:Butterfly+'candidate/get/status/grouping',//查询候选人分组人数  

  
  positionDetail:Butterfly+'positionInfo/detail',//添加，更新岗位
  getPosition:Butterfly+'positionInfo/getPosition',//查询职位列表

	logout:Butterfly+'logout',//退出接口

};
export default api;


