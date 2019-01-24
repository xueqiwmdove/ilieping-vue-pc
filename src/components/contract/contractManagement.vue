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
        <!--归档   :before-close="handleClose"-->
        <el-dialog title="归档" :visible.sync="Archive_folder_btn" class="Archive_folder_btn" custom-class="Archive_folder_btn">
          <div class="folder_div">
            <div class="file_title">归档文件夹</div>
            <ul>
              <li v-for="(item, key, index) in ArchivefolderData" :key="index">
                <div @click="clickactive(item.id)" :class="flag_active==item.id?'activeFile':''">
                  <div class="div_img"></div>
                  <span class="folderName">{{item.folderName}}</span>
                </div>
              </li>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm_btn_File" class="confirm">确 定</el-button>
          <el-button @click="Archive_folder_btn = false" class="cancel">取 消</el-button>
        </span>
        </el-dialog>
        <!--归档-->
        <!--归档文件夹   :before-close="handleClose"-->
        <el-dialog title="归档文件夹" :visible.sync="Archive_folder" class="Archive_folder" custom-class="Archive_folderCotent">
          <div class="folder_div">
            <ul>
              <li v-for="(item, key, index) in ArchivefolderData" :key="index">
                <div class="div_img"></div>
                <span class="folderName">{{item.folderName}}</span>
                <div class="div_btn">
                  <span class="btn_edit" @click="click_folderbtnEdit(item.id,item.folderName)"></span>
                  <span class="btn_delete" @click="click_folderbtnDelete(item.id,item.folderName)"></span>
                </div>
              </li>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
            	<div @click="showModels" class="folder_btn"><span class="btn_span_img"></span>新建文件夹</div>
            </span>
        </el-dialog>
        <!--归档文件夹-->
        <!--新建文件夹  :before-close="handleClose"-->
        <el-dialog title="新建文件夹" :visible.sync="modelAlert" class="modelAlert" custom-class="modelAlert">
          <div class="modelAlertFolderConter">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="文件夹名称">
                <el-input v-model="form.name" placeholder="请输入文件夹名称"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="confirm_btn" class="confirm">确 定</el-button>
              <el-button @click="modelAlert = false" class="cancel">取 消</el-button>
            </span>
        </el-dialog>
        <!--新建文件夹-->
        <!--重命名文件夹  :before-close="handleClose"-->
        <el-dialog title="重命名文件夹" :visible.sync="modelAlert_edit" class="modelAlert_edit" custom-class="modelAlert_edit">
          <div class="modelAlertFolderConter_edit">
            <el-form ref="form" :model="editForm" label-width="100px">
              <el-form-item label="原文件夹名称">
                <el-input v-model="editForm.editName" placeholder="请输入原文件夹名称" disabled></el-input>
                <input type="hidden" v-model="editForm.editId" />
              </el-form-item>
              <el-form-item label="新文件夹名称">
                <el-input v-model="editForm.NewEditName" placeholder="请输入新文件夹名称"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="renameConfirm_btn" class="confirm">确 定</el-button>
              <el-button @click="modelAlert_edit = false" class="cancel">取 消</el-button>
            </span>
        </el-dialog>
        <!--重命名文件夹-->
        <div class="content border_none" v-if="IsList">
          <!--主体内容-->
          <p class="headline">
            <span><i>员工管理</i> /合同列表</span>
          </p>
          <div class="contractManagement_con">
            <div class="search_div">
              <div class="search_left">
                <div class="select_title">文件类型
                  <el-select v-model="value" placeholder="全部文件" @change="changeSelectedfile">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select></div>
                <div class="search_input_div">
                  <el-input class="search_manage" v-model="search_input" placeholder="请输入合同名称" @keyup.enter.native="getDataSearchAgreementList"></el-input>
                  <div class="icon_btn el-icon-search" @click="getDataSearchAgreementList"></div>
                </div>
              </div>
              <div class="search_right">
                <div class="right_history" @click="Archive_folder = true"><img src="../../assets/img/1.5.1/file.png" alt="">历史归档</div>
                <div class="right_btn" @click="clickSign"><el-button class="primary_btn">新增合同</el-button></div>
              </div>
            </div>
            <div class="search_con">
              <el-row :gutter="20" >
              	<div class="tab_title" v-if="IsTab">
                <ul>
                  <li @click="clickTab(10)" :class="flag==10?'active':''"><div><i class="icon_quanbu"></i>全部({{datacountContract.total}})</div></li>
                  <li @click="clickTab(2)" :class="flag==2?'active':''"><div><i class="icon_daiwoqian"></i>待我签({{datacountContract.companySignLength}})</div></li>
                  <li @click="clickTab(1)" :class="flag==1?'active':''"><div><i class="icon_daiyuangongqian"></i>待员工签({{datacountContract.employeeSignLength}})</div></li>
                  <li @click="clickTab(0)" :class="flag==0?'active':''"><div><i class="icon_yuqiweiqian"></i>逾期未签({{datacountContract.deadLineForLength}})</div></li>
                  <li @click="clickTab(4)" :class="flag==4?'active':''"><div><i class="icon_yicexiao"></i>已撤销({{datacountContract.cancelLength}})</div></li>
                  <li @click="clickTab(5)" :class="flag==5?'active':''"><div><i class="icon_qianyuewancheng"></i>签约完成({{datacountContract.completeLength}})</div></li>
                  <li @click="clickTab(11)" :class="flag==11?'active':''"><div><i class="icon_jijiangdaoqi"></i>即将到期({{datacountContract.expiringLength}})</div></li>
                  <li @click="clickTab(12)" :class="flag==12?'active':''"><div><i class="icon_yidaoqi"></i>已到期({{datacountContract.endTimeLength}})</div></li>
                  <li @click="clickTab(13)" :class="flag==13?'active':''"><div><i class="icon_jijiangjiezhi"></i>即将截止签定合同({{datacountContract.expectedDealTimeLength}})</div></li>
                </ul>
                </div>
              </el-row>
              <el-row :gutter="20" v-if="IsFiolder">
                <ul class="file_ul">
                  <li v-for="(itemFiolder, key, index) in ArchivefolderData" :key="index" @click="clickFiolderTab(itemFiolder.id,itemFiolder.folderName)" :class="flag_FiolderActive==itemFiolder.id?'activeFile':''">
                    <div class="file_div">
                      <div class="div_img"></div>
                      <span class="folderName">{{itemFiolder.folderName}}</span>
                    </div>
                  </li>
                </ul>
              </el-row>
              <div v-if="Isdata" class="table_con_div">
                <el-row :gutter="20" class="DataList" v-for="(item,index) in searchAgreementListData" :key="index">
                  <div style="cursor: pointer;" @click="agreementDetail(item.id,item.docNumber)">
                    <el-col :span="1">
                      <div class="grid-content line_h">
                        <i class="icon_yuqiweiqian" v-if="item.status === 0 && item.type=== null"></i><!-- item.status==0 逾期 -->
                        <i class="icon_yuqiweiqian" v-else-if="item.status === 1 && item.type=== null"></i><!-- item.status==1待员工签署 -->
                        <i class="icon_yuqiweiqian" v-else-if="item.status === 2 && item.type=== null"></i><!-- item.status==2 员工已签署 -->
                        <i class="icon_yuqiweiqian" v-else-if="item.status === 3 && item.type=== null"></i><!-- item.status==3 已归档 -->
                        <i class="icon_yicexiao" v-else-if="item.status === 4 && item.type=== null"></i><!-- item.status==4 已撤销 -->
                        <i class="icon_qianyuewancheng" v-else-if="item.status === 5 && item.type=== null"></i><!-- item.status==5 企业已签署/签约完成 -->
                        <i class="icon_yidaoqi" v-else-if="item.type == 1 "></i><!-- item.type==1 到期时间/已到期-->
                        <i class="icon_jijiangdaoqi" v-else-if="item.type==2"></i><!-- item.type==2 即将到期时间  -->
                        <i class="icon_quanbu" v-else></i><!--  -->
                      </div>
                    </el-col>
                    <el-col :span="5"><div class="grid-content m_t"><p class="p_title_m">{{item.agreementName}}</p><p class="p_title">{{item.hrEmployeeAlias}}</p></div></el-col>
                    <el-col :span="5"><div class="grid-content m_t"><p class="p_title color_str">{{item.deadlineForSignatureStr | formatDate}}&nbsp;截止签约</p><p class="p_title">{{item.createTimeStr | formatDate}}&nbsp;发起签约</p></div></el-col>
                    <el-col :span="5">
                      <div class="grid-content line_h">
                        <p v-if="nowTimeStr > item.deadlineForSignatureStr && item.status===0">逾期未签</p>
                        <p v-else-if="nowTimeStr >= item.endTimeStr">已到期 <span v-if="item.status === 5" class="span_f95714">已公正</span></p><!-- 已到期   -->
                        <p v-else-if="item.status===1">待员工签</p>
                        <p v-else-if="item.status===2">待我签</p>
                        <p v-else-if="item.status===4">已撤销</p>
                        <p v-else-if="item.status===5">签约完成<span class="span_f95714">已公正</span></p>
                        <p v-else-if="item.expiring == 1">即将到期<span v-if="item.status === 5" class="span_f95714">已公正</span></p>

                        <!--<p v-else-if="item.status===3">已归档</p>-->
                      </div>
                    </el-col>
                    <el-col :span="5"><div class="grid-content line_h"><p v-if='item.folderName!=null && item.folderId !=null'>归档文件夹:{{item.folderName}}</p></div></el-col>
                  </div>
                  <el-col :span="3">
                    <div class="grid-content line_h">
                      <div class="operation" @mouseenter="enter(index)" @mouseleave="leave()">
                        <div class="options">操作选项</div>
                        <div class="options_div" v-show="seen && index==current">
                          <ul v-if="item.isArchive===0">
                            <li v-if="item.status===1" @click="getdataremind(item.id,item.employeePhone,item.agreementName,item.deadlineForSignatureStr)">提醒</li>
                            <li v-if="item.status===1 || item.status===2" @click="getcancel(item.id)">撤销</li>
                            <li v-if="item.status===2" @click="getsignAgreement(item.id,item.docNumber)">签署</li>

                            <li v-if="item.status===3 || item.status===4 || item.status===0 || item.status===5" @click="click_Archive_folder_btn(item.id)">归档</li>
                            <li v-if="item.status===5" @click="getExportContract(item.id,item.docNumber)">下载</li>

                          </ul>
                          <ul v-if="item.isArchive===1">
                            <li @click="getExportContract(item.id,item.docNumber)">下载</li>
                            <li @click="click_Archive_folder_btn(item.id)">重新归档</li>
                            <li @click="getCancelArchive(item.id,item.folderId)">取消归档</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- 分页  -->
              <div class="bottom-pagination" v-if="totalCount > 5">
                <el-pagination @current-change="changePage" @size-change="changeSize" :current-page="pageIndex" :page-size="pageSize" :page-sizes="[5,10, 25, 50, 100]" layout="total, prev, pager, next, sizes, jumper" :total="totalCount">
                </el-pagination>
              </div>

            </div><!--搜索内容部分-->
          </div>
          <div v-if="Isdatanull" class="no_data">
            <div><img src="../../assets/img/contract/no_seach.png"/></div>
            <div class="no_data_txt">很抱歉，未查找到此类合同！</div>
          </div>
          <!--主体内容-->
        </div>
        <!-- 员工合同管理 列表 end -->
        <div class="content" v-if="IsDetails">
          <!--详情 主体内容-->
          <div class="headline_title">
            <div class="a" @click="Isshow_details">员工合同管理</div><div class="active">合同详情</div>
          </div>
          <div class="details_bg">
            <el-row :gutter="23" style="margin: 0;">
              <el-col :span="18" style="padding-left: 0;">
                <div class="grid-content bg-purple detailLeft_con">
                  <el-row>
                    <el-col :span="24"><div class="grid-content detailtitle">{{dataDetail.agreementName}}</div></el-col>
                  </el-row>
                  <el-row style="height: 220px;">
                    <el-col :span="14">
                      <div class="grid-content bg-purple">
                        <div class="detailborder detailInfo m_r20">
                          <div class="detailVice_title">合同信息</div>
                          <div class="div_con">
                            <div class="f_l l_title">合同编号</div>
                            <div class="f_l r_con">{{dataDetail.docNumber}}</div>
                          </div>
                          <div class="div_con">
                            <div class="f_l l_title">签署公司</div>
                            <div class="f_l r_con">{{dataDetail.enterpriseName}}</div>
                          </div>
                          <div class="div_con">
                            <div class="f_l l_title">发起签约时间</div>
                            <div class="f_l r_con">{{dataDetail.createTime}}</div>
                          </div>
                          <div class="div_con">
                            <div class="f_l l_title">合同有效期</div>
                            <div class="f_l r_con">{{dataDetail.startTime}}  —　{{dataDetail.endTime}}</div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <div class="grid-content">
                        <div class="detailborder detailInfo">
                          <div class="detailVice_title">合同状态</div>
                          <div class="div_con">
                            <div style="text-align: left;padding-left: 20px;">
                              <span v-if="nowTimeStr > dataDetail.deadlineForSignatureStr && dataDetail.status===0">逾期未签 <span v-if="dataDetail.status === 5" class="span_f95714">已公正</span></span>
                              <span v-else-if="nowTimeStr <= dataDetail.endTimeStr">已到期 <span v-if="dataDetail.status === 5" class="span_f95714">已公正</span></span><!-- 已到期   -->
                              <span v-else-if="dataDetail.expiring == 1">即将到期<span v-if="dataDetail.status === 5" class="span_f95714">已公正</span></span>
                              <span v-else-if="dataDetail.status===2">待我签</span>
                              <span v-else-if="dataDetail.status===4">已撤销</span>
                              <span v-else-if="dataDetail.status===5">签约完成<span class="span_f95714">已公正</span></span>
                              <span v-else-if="dataDetail.status===1">待员工签</span>
                            </div>
                          </div>
                          <div class="div_con">
                            <div class="f_l l_title">签约截止时间</div>
                            <div class="f_l r_con">{{dataDetail.deadlineForSignature}}</div>
                          </div>
                          <div class="div_con">

                            <div class="grid-content " v-if="divfileValue === 1 ">
                              <div v-if="dataDetail.isArchive===0">
                                <el-row>
                                  <el-button v-if="dataDetail.status===1" @click="getdataremind(dataDetail.id,dataDetail.employeePhone,dataDetail.agreementName,dataDetail.deadlineForSignature)">提醒</el-button>
                                  <el-button v-if="dataDetail.status===1 || dataDetail.status===2" @click="getcancel(dataDetail.id)">撤销</el-button>
                                  <el-button v-if="dataDetail.status===2" @click="getsignAgreement(dataDetail.id,dataDetail.docNumber)">签署</el-button>
                                  <el-button v-if="dataDetail.status===3 || dataDetail.status===4 || dataDetail.status===0 || dataDetail.status===5" class="divselect btn_default" @click="click_Archive_folder_btn(dataDetail.id)">归档</el-button>
                                  <el-button v-if="dataDetail.status===5" @click="getExportContract(dataDetail.id,dataDetail.docNumber)">下载</el-button>
                                </el-row>
                              </div>
                              <div v-if="dataDetail.isArchive===1">
                                <el-row>
                                  <el-button type="primary" @click="getExportContract(dataDetail.id,dataDetail.docNumber)">下载</el-button>
                                  <el-button @click="click_Archive_folder_btn(dataDetail.id)">重新归档</el-button>
                                  <el-button @click="getCancelArchive(dataDetail.id,dataDetail.folderId)">取消归档</el-button>
                                </el-row>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24"><div class="grid-content detailtitle">签约方</div></el-col>
                  </el-row>
                  <div class="div_table_infor">
                    <ul>
                      <li>
                        <div class="name">姓名</div>
                        <div class="name">状态</div>
                        <div class="name">时间</div>
                        <div class="name">详情</div>
                      </li>
                      <li>
                        <div class="name">{{dataDetail.hrEmployeeAlias}}</div>
                        <div class="name">
                          <span style="color: #FC8E00;" v-if="dataDetail.verified===1"><img style="vertical-align: text-bottom;" src="../../assets/img/hetong/ic_shimingrenzheng.svg"/> 已实名认证</span>
                          <span style="color: #FC8E00;" v-if="dataDetail.verified===0">未实名认证</span>
                        </div>
                        <div class="name">{{dataDetail.createTime}}</div>
                        <div class="name">————</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-col>
              <el-col :span="6" style="padding-right: 0;">
                <div class="grid-content right_con">
                  <div class="right_title">劳动用工合同</div>
                  <div class="right_title2">页数：<span class="span_color">５</span>页</div>
                  <div>
                    <ul class="ImgUrl_ul">
                      <li v-for="(item,index) in DatapdfImgUrl" :key="index">
                        <img :src="item" :span="6" @click="click_url(dataDetail.agreementAddress)"/>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import http from '@/http/http'
  import api from '@/api/api.js'
  import {headers} from '@/assets/js/common/lp.js'
  import pageheader from '@/components/common/pageheader'
  import pageaside from '@/components/common/pageaside'
  import { Loading } from 'element-ui';
  import search from '@/components/common/search'
  import {formatDate} from '@/assets/js/common/date_year.js'

  export default {
    name: "contracManagement",
    components: {
      pageheader,
      pageaside,
      search
    },
    filters:{
      formatDate(time){
        let date=new Date(time);
        return formatDate(date,'MM/dd');
      }
    },
    data(){
      return{
        IsList:true,//员工合同列表页
        IsDetails:false,//员工合同详情
        Isdata:true,
        Isdatanull:false,//未搜索到数据
        flag:10,//默认全部
        search_input:'',//请输入文件名称
        searchAgreementListData:[],
        totalCount:0,
        pageIndex: 1,
        pageSize: 5,
        nowTimeStr:'',//当前时间
        options: [{
          value: '1',
          label: '全部文件'
        }, {
          value: '2',
          label: '归档文件'
        }],
        value: '全部文件',
        ArchivefolderData:[],
        Archive_folder:false,
        modelAlert:false,
        modelAlert_edit:false,
        form: {
          name: '',
        },
        editForm: {
          editId:'',//原文件夹id
          editName: '',//原文件夹名称
          NewEditName:'',//新文件夹名称
        },
        selectfileValue:'',//代表后端status
        tabType:'',//代表后端type
        ifEndTime:'',//endTimeStr - 30  <=  now()  <  endTimeStr
        IsTab:true,
        IsFiolder:false,
        fileName_Tab:'',
        Archive_folder_btn:false,
        archivedFolderResponseData:[],
        flag_active:'',
        table_id:'',
        agreementId:'',
        flag_FiolderActive:'',
        divfileValue:1, //代表文件类型（1 全部文件，2归档文件）
        /* 员工合同详情 */
        dataDetail:[],
        DatapdfImgUrl:[],//合同图片
        isFile:'',//判断是否归档（1表示归档）其它未归档
        datacountContract:[],//员工合同管理统计各类合同的数量 data
        Isul:false,

        seen:false,
        current:0,

      }
    },
    methods: {
      click_contractTemplate(){
        this.$router.push('/newContract');
      },
      enter(index){
        this.seen = true;
        this.current = index;
      },
      leave(){
        this.seen = false;
        this.current = null;
      },
      Isshow_details(){//返回合同管理列表
        let that=this;
        that.IsDetails=false;
        that.IsList=true;
      },
      agreementDetail(id,docNumber){//合同详情
        if(id==''){
          that.$message.error('合同id不能为空');
          return false;
        }else if(docNumber==''){
          that.$message.error('docNumber不能为空');
          return false;
        }else{
          let that=this;
          that.IsList=false;
          that.IsDetails=true;
          that.$http({
            method:"get",
            url:api.detailContract+id+"/"+docNumber,
            headers:headers('application/json;charset=utf-8'),
          }).then(function(res){
            // loading.close();
            if(res.data.code==10000){
              that.dataDetail=res.data.data;
              that.DatapdfImgUrl=res.data.data.pdfImg;
            }else{
              that.$message.error(res.message || res.data.msg);
            }
          });
        }

      },
      getCancelArchive(agreementId,folderId){//取消归档
        let that=this;
        if(agreementId==''){
          that.$message.error('合同id不能为空');
          return false;
        }else if(folderId==''){
          that.$message.error('文件id不能为空');
          return false;
        }else{
          that.$http({
            method:"POST",
            url:api.cancelArchiveContract+folderId+'/'+agreementId,
            headers:headers('application/json;charset=utf-8'),
          }).then(function(res){
            if(res.data.code==10000){
              that.$message({
                message: '恭喜你，操作成功',
                type: 'success'
              });
              /* 刷新列表数据 */
// 				  			that.pageIndex=1;
// 				  			that.pageSize=5;
// 			      		that.getDataSearchAgreementList(folderId);
              setTimeout('window.location.reload()',1000);
            }else{
              that.$message.error(res.message || res.data.msg);
            }
          });
        }
      },
      getExportContract(agreementId,docNumber){//下载
        let that=this;
        if(agreementId==''){
          that.$message.error('合同id不能为空');
          return false;
        }else{
          // const loading = this.$loading({
          //   lock: true,
          //   text: 'Loading',
          //   spinner: 'el-icon-loading',
          //   background: 'rgba(0, 0, 0, 0.7)'
          // });
          that.$http({
            method:"get",
            url:api.exportContract+'/'+agreementId+'/'+docNumber,
            headers:headers('application/x-download'),
            responseType: 'blob',
          }).then(function(res){
            // loading.close();
            let url = window.URL.createObjectURL(new Blob([res.data]));  // new Blob([data])用来创建URL的file对象或者blob对象
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.download= docNumber+'.pdf';
            document.body.appendChild(link);
            link.click();
          });

        }
      },
      getsignAgreement(agreementId,docNumber){
        let that=this;
        if(agreementId==''){
          that.$message.error('合同id不能为空');
          return false;
        }else{
          that.$http({
            method:"POST",
            url:api.signAgreementContract,
            headers:headers('application/json;charset=utf-8'),
            data:{
              id:agreementId
            }
          }).then(function(res){
            if(res.data.code==10000){
              that.$message({
                message: '恭喜你，操作成功',
                type: 'success'
              });
              setTimeout('window.location.reload()',1000);
              // that.agreementDetail(agreementId,docNumber);
            }else{
              that.$message.error(res.message || res.data.msg);
            }
          });
        }
      },
      getcancel(agreementId){
        let that=this;
        if(agreementId==''){
          that.$message.error('合同id不能为空');
          return false;
        }else{
          that.$http({
            method:"POST",
            url:api.cancelContract+agreementId,
            headers:headers('application/json;charset=utf-8'),
          }).then(function(res){
            if(res.data.code==10000){
              that.$message({
                message: '恭喜你，操作成功',
                type: 'success'
              });
              setTimeout('window.location.reload()',1000);
              // that.getDataSearchAgreementList();
            }else{
              that.$message.error(res.message || res.data.msg);
            }
          });
        }
      },
      getdataremind(dataid,employeePhone,agreementName,deadlineForSignatureStr){//获取提醒的接口
        let that=this;
        if(dataid==""){
          that.$message.error('合同id不能为空');
          return false;
        }else if(employeePhone==""){
          that.$message.error('员工手机号不能为空');
          return false;
        }else if(agreementName==""){
          that.$message.error('合同名称不能为空');
          return false;
        }else if(deadlineForSignatureStr==""){
          that.$message.error('截止签字时间不能为空');
          return false;
        }else{
          let params={
            mobile:employeePhone,
            agreementName:agreementName,
            deadlineSignature:deadlineForSignatureStr,
            agreementId:dataid,
          };
          that.$http({
            method:"POST",
            url:api.remind,
            headers:headers('application/json;charset=utf-8'),
            data:params
          }).then(function(res){
            if(res.data.code==10000){
              that.$message({
                message: '恭喜你，操作成功',
                type: 'success'
              });
              setTimeout('window.location.reload()',1000);
            }else{
              that.$message.error(res.message || res.data.msg);
            }
          });
        }

      },
      click_ul(id){//select 是否显示
        let that=this;
        let nav_ul_id=document.getElementById('nav_ul_none_'+id);
        if(nav_ul_id.style.display=="block"){
          nav_ul_id.style.display="none";
        }else{
          nav_ul_id.style.display="block";
        }
      },
      click_Archive_folder_btn(id){
        let that=this;
        that.agreementId=id;
        that.Archive_folder_btn=true;
        that.flag_active="";
      },
      confirm_btn_File(){//归档 弹出框 点击确定
        let that=this;
        if(that.flag_active==''){
          that.$message.error('请选择归档文件夹名称');
          return false;
        }else{
          that.$http({
            method:"POST",
            url:api.setArchive+that.flag_active+"/"+that.agreementId,
            headers:headers('application/json;charset=utf-8'),
          }).then(function(res){
            if(res.data.code==10000 && res.data!=""){
              that.$message({
                message: '恭喜你，操作成功',
                type: 'success'
              });
              setTimeout('window.location.reload()',1000);
// 	              that.Archive_folder_btn=false;
// 	              that.getDataSearchAgreementList();
            }else{
              that.$message.error(res.message || res.data.msg);
            }
          });
        }
      },
      clickactive(id){//归档 弹出框
        let that=this;
        that.flag_active=id;
      },
      clickFiolderTab(id,fileName){
        let that=this;
        that.flag_FiolderActive=id;
        that.fileName_Tab=fileName;
        that.tabType="";
        that.selectfileValue='';
        that.isFile='1';
        that.getDataSearchAgreementList();
      },
      clickTab(value){
        let that=this;
        that.flag=value;
        that.tabType="";
        that.selectfileValue="";
        if(value==10){//全部10
          that.selectfileValue='';
        }else if(value==2){//待我签(2)
          that.selectfileValue=2;
        }else if(value==1){//待员工签(1)
          that.selectfileValue=1;
        }else if(value==0){//逾期未签(0)
          that.selectfileValue=0;
        }else if(value==4){//已撤销(4)
          that.selectfileValue=4;
        }else if(value==5){//签约完成(5)
          that.selectfileValue=5;
        }else if(value==11){//即将到期(11)
          that.tabType=2;
          that.selectfileValue=5;
        }else if(value==12){//已到期(12)
          that.tabType=1;
          that.selectfileValue=5;
        }else if(value==13){//即将截止签定合同(13)
          that.tabType=3;
          that.isFile=0;
        }else{
          that.tabType="";
          that.selectfileValue="";
        }
        that.getDataSearchAgreementList();
      },
      changeSelectedfile(value){//选择
        let that=this;
        that.flag_FiolderActive="";
        that.fileName_Tab='';
        if(value==1){//全部文件
          that.divfileValue=1;//选择全部文件数据类型
          that.search_input='';
          that.tabType="";
          that.selectfileValue="";
          that.isFile="";
          that.IsTab=true;
          that.IsFiolder=false;
        }else if(value==2){//归档文件夹
          that.divfileValue=2;//选择归档文件夹数据类型
          that.isFile="1";
          that.IsTab=false;
          that.IsFiolder=true;
        }
        that.pageIndex=1;
        that.pageSize=5;
        that.getDataSearchAgreementList();
      },
      confirm_btn(){//确定新建文件夹
        let that=this;
        if(that.form.name==""){
          that.$message.error('请填写新建文件夹名称');
          return false;
        }else{
          that.$http({
            method:"POST",
            url:api.insertfolder+that.form.name,
            headers:headers('application/json;charset=utf-8'),
          }).then(function(res){
            if(res.data.code==10000 && res.data!=""){
              that.$message({
                showClose: true,
                message: '恭喜你，添加成功',
                type: 'success'
              });
              that.getArchive_folderData();
              that.modelAlert=false;
              that.Archive_folder=true;
            }else{
              that.$message.error(res.message || res.data.msg);
            }
          });
        }
      },
      click_folderbtnEdit(id,folderName){//编辑归档文件夹
        let that=this;
        that.Archive_folder = false;//新建文件夹弹出框
        that.modelAlert_edit=true;
        that.editForm.editName=folderName;
        that.editForm.editId=id;
      },
      renameConfirm_btn(){//重命名文件夹确定
        let that=this;
        if(that.editForm.NewEditName==""){
          that.$message.error('请填写新建文件夹名称');
          return false;
        }else{
          that.$http({
            method:"POST",
            url:api.updatefolder,
            headers:headers('application/json;charset=utf-8'),
            data:{
              id:that.editForm.editId,
              folderName:that.editForm.NewEditName
            }
          }).then(function(res){
            if(res.data.code==10000 && res.data!=""){
              that.$message({
                showClose: true,
                message: '恭喜你，修改成功',
                type: 'success'
              });
              if(that.value==2){
                that.isFile=1;
              }else{
                that.isFile="";
              }
              that.getArchive_folderData();
              that.getDataSearchAgreementList();
              that.modelAlert_edit=false;
              that.Archive_folder=true;
            }else{
              that.$message.error(res.message || res.data.msg);
            }
          });
        }
      },
      click_folderbtnDelete(id,folderName){//删除归档文件夹
        let that=this;
        that.$confirm('确定要删除该归档文件夹吗？<br/>该归档文件夹删除后将无法恢复，确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          center: true,
          customClass: 'member-confirm-class danger',
        }).then(() => {
          that.$http({
            method:"DELETE",
            url:api.deletefolder+id,
            headers:headers('application/json;charset=utf-8'),
          }).then(function(res){
            if(res.data.code==10000 && res.data!=""){
              that.$message({
                showClose: true,
                message: '恭喜你，删除成功',
                type: 'success'
              });
              that.getArchive_folderData();
              that.Archive_folder=false;
            }else{
              that.$message.error(res.message || res.data.msg);
            }
          });
        }).catch(() => {});
      },
      showModels(){//归档文件夹
        let that=this;
        that.Archive_folder = false;//新建文件夹弹出框
        that.modelAlert=true;
        that.form.name='';
      },
      changePage(newPage) {
        let that=this;
        if(that.pageIndex === newPage) {
          return;
        }
        that.pageIndex = newPage;
        that.tabType="";
        that.search_input="";
        that.fileName_Tab="";
        that.selectfileValue="";
        that.getDataSearchAgreementList();
      },
      changeSize(newSize) {
        let that=this;
        that.pageSize = newSize;
        that.tabType="";
        that.search_input="";
        that.fileName_Tab="";
        that.selectfileValue="";
        that.getDataSearchAgreementList();
      },
      getDataSearchAgreementList(){
        let that=this;
        let currentPage=that.pageIndex || 1;
        let pageSize=that.pageSize || 5;
        let nowTime="";
        let deadlineStrTime="";
        if(that.selectfileValue===0){//点击逾期未签传当前时间值
          nowTime=that.nowTimeStr;
          that.selectfileValue="";
        }else if(that.selectfileValue===1 || that.selectfileValue===2){//待员工、待我签
          deadlineStrTime=that.nowTimeStr;
        }else if(that.tabType===3){//即将截止签定合同
          deadlineStrTime=that.nowTimeStr;
          that.isFile="";
        }else{
          nowTime="";
        }
        let params={
          type:that.tabType,
          folderId:that.flag_FiolderActive,
          folderName:that.fileName_Tab,
          agreementName:that.search_input,
          status:that.selectfileValue,
          deadlineForSignatureStr:nowTime,
          isArchive:that.isFile,
          deadlineStr:deadlineStrTime
        };
        // const loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // });
        that.$http({
          method:"post",
          url:api.searchAgreementList+currentPage+'/'+pageSize,
          headers:headers('application/json;charset=utf-8'),
          data:params
        }).then(function(res){
          // loading.close();
          if(res.data.code==10000){
            if(res.data.data.archivedFolderResponse=="" || res.data.data.listSign=="" || res.data.data.listSign==null){
              that.Isdatanull=true;
              that.Isdata=false;
            }else{
              that.Isdatanull=false;
              that.Isdata=true;
              that.archivedFolderResponseData=res.data.data.archivedFolderResponse;
              that.searchAgreementListData=res.data.data.listSign;
              that.totalCount = res.data.count;
              that.isFile=res.data.data.listSign.isArchive;//判断是否归档（1，归档)其它值未归档
            }
          }else{
            that.$message.error(res.data.msg);
          }
        });
      },
      nowTime(){
        let that=this;
        let now_date = new Date();
        let seperator1 = "-";
        let year = now_date.getFullYear();
        let month = now_date.getMonth() + 1;
        let strDate = now_date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        that.nowTimeStr=currentdate;
      },
      getArchive_folderData(){
        let that=this;
        that.$http({
          method:"get",
          url:api.folder,
          headers:headers('application/json;charset=utf-8'),
        }).then(function(res){
          if(res.data.code==10000 || res.data.data==null){
            that.ArchivefolderData=res.data.data;
//           endTimeStr - 30  <=  now()  <  endTimeStr

          }else{
            that.$message.error(res.data.msg);
          }
        });
      },
      getcountContract(){
        let that=this;
        that.$http({
          method:"get",
          url:api.countContract,
          headers:headers('application/json;charset=utf-8'),
        }).then(function(res){
          if(res.data.code==10000 || res.data.data==null){
            that.datacountContract=res.data.data;
          }else{
            that.$message.error(res.data.msg);
          }
        });
      },
      //发起签约调接口,判断其企业是否验证通过
      clickSign(){
        let that=this;
        that.$http({
          url:api.clickSign,
          method:"post",
          headers:headers(),
        }).then(function (result) {
          // console.log(result);
          if(result.data.code==10000){
            that.$router.push('/newContract');
            // that.signAlert = true;
            // that.templateData=result.data.data;
            // console.log(that.templateData);
          }else if(result.data.code==40007){
            let isAuthentication=result.data.data.isAuthentication;
            //TODO 审核中 您的企业正在审核中，审核通过后即可使用合同签约功能

            if(isAuthentication==1||isAuthentication==0){
              // that.$confirm('您的账号暂未企业认证，认证成功后即可使用合同签约功能！', '提示', {
              //   confirmButtonText: '确定',
              //   cancelButtonText: '取消',
              //   center:'true',
              // });
              that.$confirm('需要通过企业认证才能发起签署', '提示', {
                confirmButtonText: '去认证',
                cancelButtonText: '稍后再说',
                center:'true',
              }).then(() => {
                that.$router.push("/businessCert");
              }).catch(()=>{

              })
            }else if(isAuthentication==2){
              that.$confirm('您的企业正在审核中，审核通过后即可使用合同签约功能！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center:'true',
              });

            }

          }else{
            that.$message.error(result.message || result.data.msg)
          }
        })
      },
    },
    mounted(){
      let that=this;
      if(this.$route.query.flag){
        that.clickTab(this.$route.query.flag);
      }else{
        that.clickTab(10);
      }
//    	that.getDataSearchAgreementList();
      that.nowTime();
      that.getArchive_folderData();
      that.getcountContract();
    }
  }
</script>

<style scoped>
  @import url("../../assets/css/base/index.css");
  .folder_div{
    height: 300px;
    overflow: auto;
  }
  .folder_div ul li{
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    padding-left: 20px;
  }
  .folder_div ul li:hover{
    background: #F9F9F9;
  }
  .folder_div ul li .div_img{
    float: left;
    width: 16px;
    height: 15px;
    display: inline-block;
    margin: 12px 20px 0;
    background: url(../../assets/img/contract/ic_wenjianjia.svg) no-repeat center;
  }
  .folder_div ul li:hover .div_img{
    background: url(../../assets/img/contract/ic_wenjianjia2.svg) no-repeat center;
  }
  .folder_div .activeFile .div_img{
    background: url(../../assets/img/contract/ic_wenjianjia2.svg) no-repeat center;
  }
  .folder_div .activeFile .folderName{
    color: #394A66;
  }
  .file_ul li.activeFile{
    color: #fff;
    background: #F95714;
  }
  .file_ul li.activeFile .div_img{
    background: url(../../assets/img/hetong/wenjian.svg) no-repeat center;
  }
  .folder_div ul li .folderName{
    color: #748093;

  }
  .folder_div ul li:hover .folderName{
    color: #21324E;
  }
  .folder_div ul li .div_btn{
    float: right;
    display: inline-block;
    margin-right: 20px;
    width: 80px;
    height: 40px;
  }
  .folder_div ul li:hover .btn_edit{
    width: 16px;
    height: 15px;
    display: inline-block;
    margin: 0 5px;
    background: url(../../assets/img/contract/ic_xiugai.svg) no-repeat center;
  }
  .folder_div ul li:hover .btn_delete{
    width: 16px;
    height: 15px;
    margin: 0 5px;
    display: inline-block;
    background: url(../../assets/img/contract/ic_shanchu.svg) no-repeat center;
  }
  .folder_btn{
    line-height: 40px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #21324E;
    letter-spacing: 0;
    text-align: center;
    cursor: pointer;
  }
  .folder_btn:hover{
    color: #F95714;
  }
  .folder_btn .btn_span_img{
    width: 15.8px;
    height: 14.7px;
    margin: 0px 10px;
    display: inline-block;
    background: url(../../assets/img/contract/ic_xinjianwenjian.svg) no-repeat center;
  }
  .folder_btn:hover .btn_span_img{
    width: 15.8px;
    height: 14.7px;
    margin: 0px 10px;
    display: inline-block;
    background: url(../../assets/img/contract/ic_xinjianwenjian2.svg) no-repeat center;
  }
  .color_str{
    color: #394A66;
  }
  .modelAlertFolderConter{
    height: 160px;
    overflow: auto;
    padding: 60px 80px 0;
  }
  .modelAlertFolderConter_edit{
    height: 160px;
    overflow: auto;
    padding: 30px 80px 0;
  }
  /* 滚动条整体样式 */
  .folder_div::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .folder_div::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 6px;
    background:#DCDCDC;;
    /*background-color: #F90;*/
    /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
  }
  .folder_div::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    /*border-radius: 10px;*/
    background: #fff;
  }
  .bottom-pagination{
    text-align: right;
    margin: 20px 0;
  }
  /*.active{
      color: #fff !important;
      background-color: #FC8E00 !important;
      border-color: #FC8E00 !important;
  }*/
  .selected_ul{
    width: 90px;
    display: inline-block;
    position: relative;
  }
  .selected_ul li{
    font-size: 14px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .divselect {
    width: 110px;
  }
  input[type=text]{
    text-indent: 0px !important;
  }
  .file_ul{

  }
  .file_ul li{
    float: left;
    display: inline-block;
    line-height: 34px;
    height: 34px;
    margin-right: 20px;
    background: #F9F9F9;
    padding: 0 10px;
  }
  .file_ul li .file_div{
    line-height:34px;
    height: 34px;
    cursor: pointer;
  }
  .file_ul li .div_img{
    float: left;
    width: 16px;
    height: 15px;
    display: inline-block;
    margin: 10px 5px 0;
    background: url(../../assets/img/contract/ic_wenjianjia.svg) no-repeat center;
  }
  .file_title{
    font-size: 14px;
    color: #394A66;
    margin: 20px 0 10px 30px;
  }
  .no_data{
    text-align: center;
    padding: 90px 0 200px 0;
  }
  .no_data img{
    width: 160px;
    margin: 20px;
  }
  .no_data .no_data_txt{margin-top: 10px;color: #97A2B3;}

  .nav_ul li{
    background: #FAFBFC;
    border: 1px solid #E5E5E5;
    border-radius: 2px;
    width:110px;
    height: 34px;
    line-height: 34px;
    text-align: left;
  }
  .nav_ul li .divtitle{

  }
  .nav_ul li .divtitle span{
    padding:0 10px;
  }
  .nav_ul li .divtitle .click_div{
    display: inline-block;
    float: right;
    width: 32px;
    height: 32px;
    text-align: center;
    background: #E6E6E6;
  }
  .nav_ul li .divtitle .click_div .el-icon-caret-bottom{
    color: #AAADB5;
  }
  .nav_ul li .nav_ul_none{
    display: none;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    margin-top: -2px;
    margin-left: -1px;
    z-index: 10;
    position: absolute;
  }
  .nav_ul li .nav_ul_none li{
    border: none;
    width: 108px;
    background: #fff;
  }
  .nav_ul li .nav_ul_none li:hover div{
    color: #F95714;
    cursor: pointer;
  }
  .nav_ul li .nav_ul_none li div{
    padding: 0 0 0 10px;
  }
  .nav_ul li.block .nav_ul_none{
    display: block;
  }
  .main .right-content .content .headline_title{
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #21324E;
    letter-spacing: 0;
    border-bottom: 1px solid #E5E5E5;
    margin-bottom: 2px;
  }
  .headline_title .a{
    display: inline-block;
    height: 100%;
    text-align: left;
    line-height: 50px;
    color: #21324E;
    border: none;
    padding: 0 20px;
    display: inline-block;
    float: left;
    cursor: pointer;
  }
  .headline_title .active{
    display: inline-block;
    float: left;
    width: auto;
    margin: 0 10px;
    padding: 0 10px;
    text-align: center;
    color: #FC8E00;
    border-bottom: 2px solid #FC8E00;
  }
  .con_header{
    background: #F8FAFC;
    padding: 10px 0 0 20px;
  }
  .primary_btn{
    color: #fff;
    background-color: #F95714;
    border-color: #F95714;
  }
  .search_con{
    padding: 0 20px 20px
  }
  .p_title_m{
    line-height: 30px;
  }
  .border_bottom{
    padding-bottom: 20px;
  }
  .line_h{
    color: #7A8699;
    line-height: 90px;
  }
  .m_t{
    padding-top: 20px;
  }
  .tab_title{
  	height: 40px;
  	line-height: 40px;
    margin: 0;
    border-bottom: 1px solid #E5E5E5;
  }
  .tab_title ul li{
    float: left;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    line-height: 40px;
    height: 40px;
    border-bottom: #E5E5E5;
    padding: 0 10px;
  }
  .tab_title ul li.active{
    color: #333;
    border-bottom: 2px solid #F95714;
  }
  .table_con_div{
    border-top:1px solid #E5E5E5;
    margin-top: 40px;
  }
  .btn_default{
    background: #FAFBFC;
    border: 1px solid #E5E5E5;
    border-radius: 2px;
    color: #394A66;
  }
  .file_type p{
    margin-top: 10px;
  }
  /* 合同详情 */
  .details_bg{
    background: #FAFAFA;
  }
  .detailLeft_con{
    padding: 20px;
    /*border: 1px solid #E5E5E5;*/
    background: #fff;
    min-height: 510px;
    padding-bottom: 120px;
  }
  .detailLeft_con .detailtitle{
    font-size: 16px;
    color: #21324E;
    text-align: left;
    line-height: 44px;
  }
  .detailLeft_con .m_r20{
    margin-right: 20px;
  }
  .detailLeft_con .detailInfo .div_con{
    height: 44px;
    line-height: 44px;
  }
  .detailLeft_con .detailInfo .div_con .l_title{
    width: 100px;
    color: #97A2B3;
    font-size: 14px;
    text-align: right;
  }
  .detailLeft_con .detailInfo .div_con .r_con{
    font-size: 14px;
    color: #394A66;
    text-align: left;
    padding-left: 20px;
  }
  .detailLeft_con .detailborder{
    border: 1px solid #E5E5E5;
    height: 220px;
  }
  .detailLeft_con .detailborder .detailVice_title{
    height: 44px;
    line-height: 44px;
    text-align: left;
    padding-left: 20px;
    background: #F8FAFC;
  }
  .right_con{
    padding-top: 20px;
    /*border: 1px solid #E5E5E5;*/
    background: #fff;
    min-height: 510px;
  }
  .right_con .right_title{
    line-height: 36px;
    font-size: 14px;
    color: #394A66;
    text-align: center;
  }
  .right_con .right_title2{
    font-size: 12px;
    color: #7A8699;
    text-align: center;
    line-height: 30px;
  }
  .right_con .right_title2 .span_color{
    color: #FC8E00;
  }
  .ImgUrl_ul{
    max-height: 512px;
    overflow-x: auto;
  }
  .ImgUrl_ul li img{
    width: 100%;
    cursor: pointer;
  }
  .ImgUrl_ul::-webkit-scrollbar {/*滚动条*/
    width:6px;
  }
  .ImgUrl_ul::-webkit-scrollbar-track {/*滚动槽*/
    -webkit-box-shadow:inset 0 0 3px rgba(0,0,0,0.3);
    border-radius:3px;
  }
  .ImgUrl_ul::-webkit-scrollbar-thumb {/*滚动条滑块*/
    border-radius:3px;
    background:rgba(0,0,0,0.1);
    -webkit-box-shadow:inset 0 0 3px rgba(0,0,0,0.5);
  }
  .div_table_infor{width: 100%; height: 100px; border: 1px solid #E5E5E5;}
  .div_table_infor ul li div{
    width: 25%;
    float: left;
    display: inline-block;
    text-align: left;
    padding-left: 20px;
    height: 50px;
    line-height: 50px;
  }
  .div_table_infor ul li:first-child div{
    background: #F8FAFC;
  }
  .operation .options{ color: #2569F6; cursor: pointer;}
  .operation .options_div{
    position: absolute;
    z-index: 10;
    display: block;
    width: 80px;
    margin-top: -30px;
    text-align: center;
    font-size: 14px;
    color: #394A66;
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.20);
    margin-left: -10px;
  }
  .operation .options_div ul li{
    width: 100%;
    height: 34px;
    line-height: 34px;
    cursor: pointer;
  }
  .operation .options_div ul li:active,.operation .options_div ul li:hover{
    color: #F95714;
    background: #F8FAFC;
  }
  .DataList{ height:106px; border-bottom:1px solid #E5E5E5; margin: 0 !important;}
  .DataList:hover{background:#FFFBFA; }
  .contractManagement_con .search_div{ height: 100px; line-height: 40px; padding: 20px;}
  .contractManagement_con .search_div .search_left{float: left; display: inline-block;}
  .contractManagement_con .search_div .search_left .select_title{font-size:14px;float: left; display: inline-block;margin-right: 10px;}
  .contractManagement_con .search_div .search_left .search_input_div{ float: left;display: inline-block;}
  .contractManagement_con .search_div .search_left .search_manage{ float: left;display: inline-block;}
  .contractManagement_con .search_div .search_left .icon_btn{ float: left;display: inline-block; color: #F95714;}
  .contractManagement_con .search_div .search_right{float:right; display: inline-block;}
  .contractManagement_con .search_div .search_right .right_history{float:left; display: inline-block; margin: 0 20px; cursor: pointer;}
  .contractManagement_con .search_div .search_right .right_history img{margin-right: 10px;}
  .contractManagement_con .search_div .search_right .right_btn{float:left; display: inline-block;}

  .headline_title{height: 40px;}
  .headline_title .active{height: 40px; line-height: 40px;}
</style>

