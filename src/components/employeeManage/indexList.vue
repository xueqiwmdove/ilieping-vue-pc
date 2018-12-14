<template>  
  <div >
   <div class="main">
          <!--顶部导航-->
        <pageheader class="pageheader"></pageheader>
          <!--侧边栏-->
          <div class="aside">
            <pageaside></pageaside>
          </div>
          <!--右侧内容栏-->
      <div class="right-content pull-right">
        <div class="content">
            <p class="headline">
                <span @click="personChanges()">员工列表</span>
            </p>
            <ul class="nav-tabs nav" id="uploadTabs"></ul>
            <el-row>
              <!--左侧员工架构  -->
              <el-col :span="5">
                  <treelist v-on:getDptid="getid" @getState='getstate' @getStatus='getstatus' @getlists='getList' :countPersons='countPersons' ></treelist>
              </el-col>
              <el-col :span="19">
                <div class="table-parent_e">
                  <!--查询条件  -->
                    <el-form ref="form" :model="form" label-width="80px" style="margin-top:20px;min-width:756px;">
                      <el-row>
                        <el-col :lg="6" :md="9" :sm="12">
                          <el-form-item label="工作类型">
                            <el-select v-model="form.workType" placeholder="请选择工作类型">
                              <el-option label="不限" value=""></el-option>
                              <el-option label="全职" value="0"></el-option>
                              <el-option label="兼职" value="1"></el-option>
                              <el-option label="实习" value="2"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :lg="6" :md="9" :sm="12">
                            <el-form-item label="在职情况">
                            <el-select v-model="form.serviceSituation" placeholder="请选择工作类型">
                              <el-option label="不限" value=""></el-option>
                              <el-option label="已转正" value="1"></el-option>
                              <el-option label="试用期" value="0"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :lg="8" :md="9" :sm="12">
                            <el-form-item label="">
                              <el-input v-model="form.name"  maxlength="11"  placeholder="请输入姓名/手机号"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <button class="el-icon-search btn_resite serach"  @click="getList" >搜索</button>
                        </el-col>
                      </el-row>
                    </el-form>
                  <!-- 列表 -->
                    <el-table :data="tableData" style="width: 100%; min-width:756px;">
                          <el-table-column prop="employeeName" label="员工" header-align='center' align='center'>
                             <template slot-scope="scope" >
                              <span style="cursor: pointer;margin-left:-23px;" @click="personDetail(scope.row)">{{scope.row.employeeName}}</span>
                             </template>
                          </el-table-column>
                          <el-table-column prop="userName" label="性别/年龄" header-align='center' align='center'>
                            <template slot-scope="scope">
                                {{scope.row.employeeSex=='1'?'男':'女' }}/{{scope.row.employeeAge}}
                            </template>
                          </el-table-column>
                          <el-table-column prop="workType" label="工作类型" header-align='center' align='center'>
                            <template slot-scope="scope">
                                {{scope.row.workType=='0'?'全职':scope.row.workType=='1'?'兼职':scope.row.workType=='2'?'实习':'' }}
                            </template>
                          </el-table-column>
                          <el-table-column prop="deptName" label="任职部门" header-align='center' align='center'></el-table-column>
                          <el-table-column prop="position" label="任职岗位" header-align='center' align='center'></el-table-column>
                          <el-table-column prop="entryTime" label="入职时间" header-align='center' align='center'>
                          </el-table-column>
                          <el-table-column prop="serviceSituation" label="在职情况" width="80" header-align='center' align='center'>
                            <template slot-scope="scope">
                              <span v-if="scope.row.status =='1'">{{'已离职'}}</span>
                               <span v-if="scope.row.status =='0'">{{scope.row.serviceSituation =='0'?'试用期':scope.row.serviceSituation =='1' ?'已转正':''}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column label="操作" width="160" header-align='center' align='center'  ><!--show-overflow-tooltip="true"-->
                            <template slot-scope="scope">
															<el-dropdown placement='bottom'>
															 <span class="el-dropdown-link options">
																	操作选项
															 </span>
																<el-dropdown-menu slot="dropdown" class="options_div">
																  <el-dropdown-item v-if="scope.row.status=='0'" @click.native="personDetail(scope.row)">员工资料</el-dropdown-item>
																  <el-dropdown-item v-if="(scope.row.isSign=='1')&&(scope.row.status =='0')" @click.native="checkSign(scope.row)">查看合同</el-dropdown-item>
																  <el-dropdown-item v-if="scope.row.isSign=='0'&&(scope.row.status =='0')"  @click.native="makeSign(scope.row)">签署合同</el-dropdown-item>
																  <el-dropdown-item v-if="(scope.row.serviceSituation =='0')&& (scope.row.status =='0') &&(scope.row.workType=='0')" @click.native="personRegular(scope.row)">提前转正</el-dropdown-item>
																  <el-dropdown-item v-if="scope.row.status=='0'" @click.native="makeQuit(scope.row)">办理离职</el-dropdown-item>
																  <el-dropdown-item v-if="scope.row.status=='0'"  @click.native="personChanges(scope.row)">人事变更</el-dropdown-item>
																  <el-dropdown-item @click.native="personDelete(scope.row)">删除员工</el-dropdown-item>
																  <el-dropdown-item v-if="scope.row.status=='1'" @click.native="quitDiscredit(scope.row)">离职失信曝光</el-dropdown-item>
																  <el-dropdown-item v-if="scope.row.status=='1'" @click.native="quitAssess(scope.row)">快速离职评价</el-dropdown-item>
																  <el-dropdown-item v-if="scope.row.status=='1'" @click.native="multidimensional(scope.row)">多维度离职评价</el-dropdown-item>
																</el-dropdown-menu>
															</el-dropdown>
                                	    <!-- <div class="operation" @mouseenter="enter(scope.row.id)" @mouseleave="leave()">
                                        <div class="options">操作选项</div>
                                        <div class="options_div" v-show="seen && scope.row.id==current">
                                          <ul>
                                            <li v-if="scope.row.status=='0'" @click="personDetail(scope.row)">员工资料</li>
                                            <li v-if="(scope.row.isSign=='1')&&(scope.row.status =='0')" @click="checkSign(scope.row)">查看合同</li>
                                            <li v-if="scope.row.isSign=='0'&&(scope.row.status =='0')"  @click="makeSign(scope.row)">签署合同</li>
                                            <li v-if="(scope.row.serviceSituation =='0')&& (scope.row.status =='0')" @click="personRegular(scope.row)">提前转正</li>
                                            <li v-if="scope.row.status=='0'" @click="makeQuit(scope.row)">办理离职</li>
                                            <li v-if="scope.row.status=='0'"  @click="personChanges(scope.row)">人事异动</li>
                                            <li @click="personDelete(scope.row)">删除员工</li>
                                            <li v-if="scope.row.status=='1'" @click="quitDiscredit(scope.row)">离职失信曝光</li>
                                            <li v-if="scope.row.status=='1'" @click="quitAssess(scope.row)">快速离职评价</li>
                                            <li v-if="scope.row.status=='1'" @click="multidimensional(scope.row)">多维度离职评价</li>
                                          </ul>
                                        </div>
                                      </div> -->
                            </template>
                          </el-table-column>
                    </el-table>
                  <!-- 分页  -->
                    <div class="bottom-pagination" v-if="totalCount > 5">
                      <el-pagination @current-change="changePage" @size-change="changeSize" :current-page="pageIndex" :page-size="pageSize" :page-sizes="[5,10, 25, 50, 100]" layout="total, prev, pager, next, sizes, jumper" :total="totalCount">
                      </el-pagination>
                    </div>
                  <!-- 分页 end -->
                  <!-- end-->
                  <!-- 弹窗-删除员工  -->
                  <el-dialog title="" width="540px; height:300px;" :visible.sync="dialogDeletePerson" class="add_dialog sty_delete sty_dialogcs " style="border-bottom: 0px solid #E5E5E5;"  custom-class="sty_dialogc">
                          <div style="text-align:center;"><i class="el-icon-warning" style="font-size:50px;color:#F5A623;"></i></div>
                          <div style="text-align:center;font-size:16px;color:#394A66;margin:10px 0 ;">删除后将清空该员工所有信息您将无法查看</div>
                          <div style="text-align:center;font-size:16px;color:#394A66">该员工的所有信息</div>
                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" style="height:36px" @click="makeDelete">确 定</el-button>
                        <el-button @click="dialogDeletePerson = false"  style="height:36px;">取 消</el-button>
                      </div>
                  </el-dialog>
                  <!-- end-->
                  <!-- end-->
                <!-- 弹窗-人事变更  -->
                  <el-dialog title="人事变更" width="540px" :visible.sync="dialogChange" :class="{some_dia: !flag11}" custom-class="sty_dialogc" class="add_dialog  sty_dialogc" :before-close="closeChange">
                          <el-scrollbar style="height:100%" >  
                          <el-form :model="personChange" :rules="rules" ref="personChange" id="re_style" >
                              <el-row>
                                  <el-form-item label="变更员工" :label-width="formLabelWidth">
                                    <span class="span_dialog">{{personChange.name}}</span>
                                  </el-form-item>
                            </el-row>
                            <el-row v-clickoutside="handleClose2">
                              <el-col :span='8'>
                                <el-form-item label="部门" :label-width="formLabelWidth"><i class="icon_sty" style="left:-10px;top:-0px;">*</i>
                                    <span class="span_dialog">{{personChange.partnerName}}</span>
                                  </el-form-item>
                              </el-col>
                              <el-col :span='14'>
                                  <el-form-item label="变更为" :label-width="formLabelWidth">
                                    <el-input  @click.native="treeClick"  v-model="personChange.region"  placeholder="请选择部门名称"  class="el-icon-arrow-down"></el-input>
                                          <div v-if="treeVisabled" class="form_tree tree_sty" >
                                              <treeSelect  :tree-datas="treeDatas" v-on:getIds="getIds"></treeSelect>
                                          </div>
                                  </el-form-item>
                              </el-col>
                            </el-row>
                              <el-row>
                              <el-col :span='8'>
                                  <el-form-item label="职位" :label-width="formLabelWidth"><i class="icon_sty" style="left:-10px;top:-0px;">*</i>
                                    <span class="span_dialog">{{personChange.position}}</span>
                                  </el-form-item>
                              </el-col>
                              <el-col :span='14'>
                                  <el-form-item label="变更为" :label-width="formLabelWidth">
                                    <el-input class="sty_input" type="text" placeholder="请输入职位" v-model="personChange.Newposition" ></el-input>
                                  </el-form-item>
                              </el-col>
                            </el-row>
                              <el-row>
                              <el-col :span='8'>
                                  <el-form-item label="工作类型" :label-width="formLabelWidth"><i class="icon_sty" style="left:-10px;top:-0px;">*</i>
                                    <span class="span_dialog">{{personChange.workType}}</span>
                                  </el-form-item>
                              </el-col>
                              <el-col :span='14'>
                                  <el-form-item label="变更为" :label-width="formLabelWidth">
                                    <el-select v-model="personChange.type" placeholder="请选择工作类型" style="width:100%;" >
                                      <el-option label="全职" value="0"></el-option>
                                      <el-option label="兼职" value="1"></el-option>
                                      <el-option label="实习" value="2"></el-option>
                                    </el-select>
                                  </el-form-item>
                              </el-col>
                            </el-row>
                              <el-row>
                              <el-col :span='8'>
                                  <el-form-item label="直属上级" :label-width="formLabelWidth"><i class="icon_sty" style="left:-10px;top:-0px;">*</i>
                                    <span class="span_dialog">{{personChange.Superior}}</span>
                                  </el-form-item>
                              </el-col>
                              <el-col :span='14'>
                                  <el-form-item label="变更为" :label-width="formLabelWidth">
                                     <el-input  class="sty_input"  type="text" placeholder="请输入直属上级" v-model="personChange.newSuperior" ></el-input> 
                                  </el-form-item>
                              </el-col>
                            </el-row>
                              <el-row v-if="flag11">
                              <el-col :span='8'>
                                  <el-form-item label="工作地点" :label-width="formLabelWidth"><i class="icon_sty" style="left:-10px;top:-0px;">*</i>
                                    <span class="span_dialog">{{personChange.place}}</span>
                                  </el-form-item>
                              </el-col>
                              <el-col :span='14'>
                                  <el-form-item label="变更为" :label-width="formLabelWidth">
                                     <el-input  class="sty_input" type="text" placeholder="请输入工作地点" v-model="personChange.placeholder"></el-input>
                                  </el-form-item>
                              </el-col>
                            </el-row >
                              <el-row  v-else>
                                <el-col :span='12'>
                                    <el-form-item label="工作地点" :label-width="formLabelWidth"><i class="icon_sty" style="left:-10px;top:-0px;">*</i>
                                      <span class="span_dialog">{{personChange.place}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='14'>
                                    <el-form-item label="变更为" :label-width="formLabelWidth">
                                      <el-input style="width:220px;" class="sty_input" type="text" placeholder="请输入工作地点" v-model="personChange.placeholder"></el-input>
                                    </el-form-item>
                                </el-col>
                              </el-row>
                            <el-row>
                              <el-form-item label="生效日期" :label-width="formLabelWidth" prop="raldate">
                                    <el-date-picker v-model="personChange.raldate"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                                  </el-form-item>
                            </el-row>
                            <el-row>
                              <el-form-item label="变更备注" :label-width="formLabelWidth" prop="fontMark">
                                        <el-input type="textarea" v-model="personChange.fontMark" style="width:100%;" placeholder="请输入评价"></el-input>
                                  </el-form-item>
                            </el-row>
                            <el-row  >
                                  <el-form-item :label-width="formLabelWidth" label="上传附件">
                                      <fileUpload v-on:getfile='getFiles'></fileUpload>
                                  </el-form-item>
                             </el-row>
                            </el-form>
                          </el-scrollbar>
                             <div slot="footer" class="dialog-footer">
                                 <el-button  type="primary"  @click="submitChange('personChange')" :disabled="disableType">确 定</el-button>
                                  <el-button @click="closeChange(personChange)">取 消</el-button>
                              </div>
                  </el-dialog>

                  <!-- end-->
                <!-- 弹窗-办理离职 -->
                  <el-dialog title="办理离职" width="540px" :visible.sync="dialogQuit" class="add_dialog sty_dialogcs " custom-class="sty_dialogc" :before-close="closeQuit" >
                           <el-scrollbar style="height:100%" > 
                          <el-form :model="makequit" :rules="rules" ref="makequit"  id="re_style">
                            <el-row>
                                  <el-form-item label="转正员工" :label-width="formLabelWidth">
                                    <span class="span_dialog">{{makequit.name}}</span>
                                  </el-form-item>
                            </el-row>
                            <el-row>
                              <el-form-item label="最后工作日期" :label-width="formLabelWidth" prop="lastDate">
                                    <el-date-picker v-model="makequit.lastDate" type="date"  value-format="yyyy-MM-dd" placeholder="请选择最后工作日期"></el-date-picker>
                              </el-form-item>
                            </el-row>
                            <el-row>
                              <el-form-item label="备注" :label-width="formLabelWidth" prop="marks">
                                        <el-input type="textarea" v-model="makequit.marks"  placeholder="请输入评价"></el-input>
                               </el-form-item>
                            </el-row>
                              <el-row  >
                                  <el-form-item :label-width="formLabelWidth" label="上传附件">
                                      <fileUpload v-on:getfile='getFiles'></fileUpload>
                                  </el-form-item>
                             </el-row>
                            </el-form>
                          </el-scrollbar>
                            <div slot="footer" class="dialog-footer">
                                  <el-button type="primary"  @click="submitQuit"  style="height:36px;">确 定</el-button>
                                  <el-button @click="closeQuit(makequit)"  style="height:36px;">取 消</el-button>
                            </div>
                  </el-dialog>
                <!-- end-->
                <!-- 弹窗-转正 -->
                  <el-dialog title="转正" width="540px" :visible.sync="dialogFormal" class="add_dialog sty_dialogc" custom-class="sty_dialogc" :before-close="closeFormal" >
                         <el-scrollbar style="height:100%">  
                          <el-form :model="makeNormal" :rules="rules" ref="makeNormal" id="re_style">
                            <el-row>
                                  <el-form-item label="转正员工" :label-width="formLabelWidth" >
                                    <span class="span_dialog" >{{makeNormal.name}}</span>
                                  </el-form-item>
                              <el-row>
                                  <el-form-item label="入职日期" :label-width="formLabelWidth">
                                    <span  class="span_dialog">{{makeNormal.dateEnter}}</span>
                                  </el-form-item>
                              </el-row>
                            </el-row>
                            <el-row>
                                  <el-form-item label="试用期月数" :label-width="formLabelWidth">
                                    <span class="span_dialog">{{makeNormal.monuth}}个月</span>
                                  </el-form-item>
                              <el-row>
                                  <el-form-item label="预计转正日期" :label-width="formLabelWidth">
                                    <span  class="span_dialog">{{makeNormal.normalDate}}</span>
                                  </el-form-item>
                              </el-row>
                            </el-row>
                            <el-row>
                              <el-form-item label="实际转正日期" :label-width="formLabelWidth" prop="newDate">
                                    <el-date-picker v-model="makeNormal.newDate" type="date" value-format="yyyy-MM-dd" placeholder="请选择实际转正日期"></el-date-picker>
                                  </el-form-item>
                            </el-row>
                            <el-row>
                              <el-form-item label="评价备注" :label-width="formLabelWidth" prop="mark">
                                        <el-input type="textarea" v-model="makeNormal.mark" style="width:100%;" placeholder="请输入评价"></el-input>
                                  </el-form-item>
                            </el-row>
                             <el-row  >
                                <el-form-item :label-width="formLabelWidth" label="上传附件">
                                    <fileUpload v-on:getfile='getFiles'></fileUpload>
                                </el-form-item>
                             </el-row>
                            </el-form>
                         </el-scrollbar>
                              <div slot="footer" class="dialog-footer">
                                   <el-button type="primary"  @click="submitNormol"  style="height:36px;">确 定</el-button>
                                  <el-button @click="closeFormal(makeNormal)"  style="height:36px;">取 消</el-button>
                            </div>
                    </el-dialog>
                <!-- end-->
                </div>
              </el-col>
            </el-row>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
	import http from '@/http/http'
  import api from '@/api/api.js';
  import {headers} from '@/assets/js/common/lp.js'
  import store from '@/store/store';
  import {format} from '@/assets/js/date.js'
  import pageheader from '@/components/common/pageheader';
  import pageaside from '@/components/common/pageaside';
  import treelist from '@/components/common/treeList'
  import treeDia from '@/components/common/treeDia'
  import upLoad from '@/components/common/upLoad';
  import treeSelect from '@/components/common/treeSelect'
  import fileUpload from '@/components/common/fileUpload'
// duanyanhong
// 2018.12.2
// 自定义控制员工架构下拉框点击空白处隐藏
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};
export default {
  name: 'exposureUpload',
	components: {
	  pageheader,
    pageaside,
    treelist,
    treeDia,
    treeSelect,
    upLoad,
    fileUpload
	},
   data() {
      return {
        disableType:true,
        seen:false,
        current:0,
        treeVisabled:false,
        countPersons:'',//部门总人数
        getDptid:'',//获取当前点击的部门id
        formLabelWidth: '120px',//输入框长度
        tableData: [],//表格
        totalCount:0,//总条数
        pageIndex: 1,//页码
        pageSize:10,//页面条数
        parentId:'',//部门上级id
        deptId:'',//部门id
        dialogDelete:false,//删除部门
        dialogChange:false,//人事变更
        dialogQuit:false,//办理离职
        dialogDeletePerson:false,//删除员工
        dialogFormal:false,//转正
        fileList:[],//上传文件集合数组
        treeDatas:[],
        flag11:true,
        // resetImg:'',
        grouping:'',//分组
        status:'',//是否离职
        iconUrl:'',
        deptIds:'',
        conpanyName:'',
        idPerson:'',
        imgList:[],
        ids:'',
        makeNormal:{//转正表单
          name:'',
          dateEnter:'',
          monuth:'',
          normalDate:'',
          newDate:'',
          mark:'',
        },
        makequit:{//办理员工离职
          name:'',
          lastDate:'',
          marks:'',
        },
        personChange:{//人事变更
          name:'',
          region:'',
          partnerName:'',
          position:'',
          Newposition:'',
          workType:'',
          type:'',
          newSuperior:'',
          Superior:'',
          place:'',
          placeholder:'',
          raldate:'',
          fontMark:'',
        },
        form:{//搜索栏表单
          workType:'',
          serviceSituation:'',
          name:'',
        },
        rules: {//表单校验规则
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min:1, max: 32, message: '长度在32个', trigger: 'blur' }
          ],
          mark:[
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          newDate:[
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          lastDate:[
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          marks:[
            { required: true, message: '备注不为空', trigger: 'blur' },
          ],
          raldate:[
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          fontMark:[
            { required: true, message: '备注不为空', trigger: 'blur' ,},
           ],
        },
      };
    },
    computed:{

    },
    watch:{
        personChange:{
          handler(newValue, oldValue){
            if(this.personChange.fontMark != '' && this.personChange.raldate != '') {
                this.disableType = false;
            }else {
               this.disableType = true;
            }
            },
            deep:true
        }
      },
   directives: {clickoutside},
    methods: {
     handleClose2(e) {
        this.treeVisabled=false
      },    
  //鼠标移入移出
      enter(index){
        this.seen = true;
        this.current = index;
      },
      leave(){
        this.seen = false;
        this.current = null;
      },
       // 获取员工架构
      getTree() {
        // that.$emit('updataTree')
        let that = this
        this.$http({
	  			method:"get",
	  			url:api.treeList,
	  			headers:headers('application/json;charset=utf-8'),
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code==10000 || res.data.data==null){
            that.treeDatas = res.data.data
            console.log(that.treeDatas,'<//====treeDatas')
	  			}else{
	  			that.$message.error(res.data.msg);
	  			}
        });
      },
      //获取部门人数
      getNum() {
          let that = this
          this.$http({
            method:"post",
            url:api.countPerson,
            headers:headers('application/json;charset=utf-8'),
            data:{
              "deptId":""
            },
            cache:false
          }).then(function(res){
            if(res.data.code==10000 || res.data.data==null){
              that.countPersons = res.data.data
            }else{
            that.$message.error(res.data.msg);
            }
          });
        },
    //获取当前点击部门id
      getid:function(val) {
        this.deptId = val
        this.grouping=''
        this.status=''
        this.getList()
      },
      //获取未分组人员
      getstate(val) {
        this.grouping = val
        this.status='0'
        this.deptId=''
        this.getList()
      },
      //获取离职部门
      getstatus(val) {
        this.grouping='1'
        this.deptId=''
        this.status=val
        this.getList()
      },

    //获取上级部门id
      getParent(val) {
        this.parentId =val.id,
        this.form1.label=val.label
      },
    //切换页码
      changePage(newPage) {
      	let that=this;
				if(that.pageIndex === newPage) {
					return;
				}
				that.pageIndex = newPage;
				that.getList();
      },
    //改变页数
			changeSize(newSize) {
				let that=this;
				that.pageSize = newSize;
				that.getList();
			},
    //获取表格数据
      getList() {
        let that =this
          let currentPage=that.pageIndex || 1;
          let pageSize  =that.pageSize || 10;
          　  let re = /^[0-9]+.?[0-9]*/;
              let re2 =/^1[34578]\d{9}$/
          　if (re.test(that.form.name) &&  !re2.test(that.form.name)) {
               that.$message({
                 message:'请输入正确手机号！',
                 type:'error'
               })
               return
        　　} else {
             this.$http({
            method:"post",
            url:api.employeeList+'/'+currentPage+'/'+pageSize,
            headers:headers('application/json;charset=utf-8'),
            data:{
              "status": that.status || "0",
              "grouping":that.grouping || '0',
              "deptId":that.deptId||"",
              "workType":that.form.workType||'',
              "serviceSituation":that.form.serviceSituation ||'',
              "searchContent":that.form.name||'' ,
            },
            cache:false
          }).then(function(res){
            if(res.data.code==10000 || res.data.data==null){
              that.tableData=res.data.data;
              that.totalCount = res.data.count;
            }else{
            that.$message.error(res.data.msg);
            }
          });
        }

      },
   // 删除员工
      personDelete(val) {
        this.dialogDeletePerson = true
        this.idPerson = val.id
      },
      //删除员工
      makeDelete() {
        let that = this
        this.$http({
	  			method:"DELETE",
	  			url:api.deleteEmployee+'/'+that.idPerson,
	  			headers:headers('application/json;charset=utf-8'),
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code==10000 || res.data.data==null){
            that.$message({
              message:res.data.msg,
              type:'success'
            })
            that.getList()
            that.getNum()
            that.dialogDeletePerson=false
	  			}else{
            that.$message.error(res.data.msg);
            that.dialogDeletePerson=false
	  			}
        });
      },
  //员工资料跳转
      personDetail(val) {
        this.$router.push({path:'/staffInfo',query:{id:val.id}})
      },
  //查看合同
      checkSign(val) {
        this.$router.push({path:'/contractManagement',query:{id:val.id}})
      },
  //签署合同
      makeSign(val) {
        this.$router.push({path:'/bySinging',query:{id:val}})
      },
  //快速离职评价
      quitAssess(val) {
        this.$router.push({path:'/quickUpload',query:{id:val}})
      },
  //多维度评价
      multidimensional (val) {
        this.$router.push({path:'/uploadOne',query:{id:val}})
      },
  //离职失信曝光
      quitDiscredit() {
      this.$router.push({path:'/exposure'})
      },
 //获取上传文件
      getFiles(val) {
       this.imgList=val
      console.group("label");
      },
  //提前转正
      personRegular(val) {
        this.$store.commit('resetImgInit');
        this.dialogFormal =!this.dialogFormal
        this.makeNormal.dateEnter=val.entryTime
        this.makeNormal.normalDate=val.expectedTurnTomep
        this.makeNormal.name=val.employeeName
        this.idPerson = val.id
        this.makeNormal.monuth  =val.probation
      },
   //转正弹窗关闭
      closeFormal(makeNormal){
        this.dialogFormal = false;
        this.$store.commit('resetImgClear');
        this.resetForm(makeNormal)
      },
       resetForm(makeNormal) {
        this.$refs.makeNormal.resetFields();
      },
  //转正提交
      submitNormol() {
        var timel =new Date().format("yyyy-MM-dd");
        if(this.makeNormal.newDate <timel ) {
           this.$message({
              message: '预计转正日期不能小于当前日期！',
              type: 'error'
           });
           this.makeNormal.newDate=''
           return
        }else {
         this.$refs.makeNormal.validate(valid => {
            if (valid) {
              let that=this;
              let params = new FormData() ;
               if(that.imgList[0] !=''){
                 that.imgList.forEach((file,index) => {
                    params.append('files', file.file)
                    params.append('files',that.imgList)
                })
              }
              params.append('type','1');
              params.append('employeeId',that.idPerson);
              params.append('remarks',that.makeNormal.mark);
              params.append('effectiveDate',that.makeNormal.newDate);
              //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
                that.$http({
              		method:"post",
              		url:api.turnPositive,
              		headers:headers("multipart/form-data"),
              		data:params,
              		cache:false
              	}).then(function(res){
                  console.log(res);
                  if(res.data.code==10000){
                	 that.$message({
                      message: '保存成功！',
                      type: 'success'
                    });
                    that.dialogFormal=false
                  }else{
                    that.$message.error(res.data.msg);
                    that.dialogFormal=false
                  }
              })
            }
          });
        }

      },
  //办理离职打开弹窗
      makeQuit(val) {
        console.log(val)
        this.$store.commit('resetImgInit');
        this.dialogQuit =!this.dialogQuit
        this.makequit.name=val.employeeName
        this.idPerson = val.id
      },
  //办理离职弹窗关闭
      closeQuit(makequit){
          this.dialogQuit = false;
          this.$store.commit('resetImgClear');
          this.resetForm3(makequit)
        },
      resetForm3(makequit) {
        this.$refs.makequit.resetFields();
      },
  //离职提交保存
      submitQuit() {
        var timel =new Date().format("yyyy-MM-dd");
        if(this.makequit.lastDate <timel ) {
           this.$message({
              message: '最后工作日期不能小于当前日期！',
              type: 'error'
           });
           this.makequit.lastDate=''
           return
        }else {
            this.$refs.makequit.validate(valid => {
            if (valid) {
              let that=this;
              let params = new FormData() ;
               if(that.imgList[0] !=''){
                 that.imgList.forEach((file,index) => {
                    params.append('files', file.file)
                    params.append('files',that.imgList)
                })
              }
              params.append('type','2');
              params.append('employeeId',that.idPerson);
              params.append('remarks',that.makequit.marks);
              params.append('effectiveDate',that.makequit.lastDate);
              //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
                that.$http({
              		method:"post",
              		url:api.resignation,
              		headers:headers("multipart/form-data"),
              		data:params,
              		cache:false
              	}).then(function(res){
                  console.log(res);
                  if(res.data.code==10000){
                	 that.$message({
                      message: '保存成功！',
                      type: 'success'
                    });
                    that.dialogQuit = false
                    that.getList()
                  }else{
                    that.$message.error(res.data.msg);
                    that.dialogQuit = false

                  }
              })
            }
          });
        }
      },
  //人事变更
      personChanges(val) {
        this.$store.commit('resetImgInit');
        this.dialogChange =!this.dialogChange
        this.idPerson = val.id
        this.personChange.name=val.employeeName
        this.personChange.partnerName=val.deptName
        this.deptIds = val.deptId
        this.personChange.position=val.position
        this.personChange.workType=val.workType=='0'?'全职':val.workType=='1'?'兼职':val.workType=='2'?'实习':''
        this.personChange.Superior=val.directlySuperior
        if(parseInt(val.workAddress) > 6) {
          this.flag11 = false
        }
        this.personChange.place =val.workAddress
      },
 //人事变更弹窗关闭
      closeChange(personChange){
        this.personChange.region=''
        this.personChange.Newposition=''
        this.personChange.type=''
        this.personChange.newSuperior=''
        this.personChange.placeholder=''
        this.dialogChange = false;
        this.disableType =true
        this.$store.commit('resetImgClear');
        if(personChange) {
          this.resetForm2(personChange)
        }
        },
      resetForm2(personChange) {
        this.$refs.personChange.resetFields();
      },
  //获取当前部门id
      getIds(data) {
        console.log(data,55)
       this.conpanyName = data.deptName
       this.ids = data.id
        this.treeVisabled=false
        this.personChange.region=data.label
      },
  //人事变更保存
      submitChange() {
        var timel =new Date().format("yyyy-MM-dd");
        if(this.personChange.raldate <timel) {
           this.$message({
              message: '生效日期不能小于当前日期！',
              type: 'error'
           });
           this.personChange.raldate=''
           return
        }else {
            this.$refs.personChange.validate(valid => {
            if (valid) {
               if(this.personChange.region  || this.personChange.Newposition || this.personChange.type || this.personChange.newSuperior || this.personChange.placeholder) {
                  console.log(3333333)
                  let that=this;
                 let params = new FormData() ;
                    if(that.imgList[0] !=''){
                      that.imgList.forEach((file,index) => {
                          params.append('files', file.file)
                          params.append('files',that.imgList)
                      })
                    }
                    params.append('type','0');
                    params.append('employeeId',that.idPerson);
                    params.append('effectiveDate',that.personChange.raldate||'');
                    params.append('position',that.personChange.Newposition||'');
                    params.append('workType',that.personChange.type||'');
                    params.append('deptId',that.ids)
                    params.append('deptName',that.conpanyName)
                    params.append('remarks',that.personChange.fontMark);
                    params.append('directlySuperior',that.personChange.newSuperior||'');
                    params.append('workAddress  ',that.personChange.placeholder||'');
                    //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
                      that.$http({
                        method:"post",
                        url:api.personChange,
                        headers:headers("multipart/form-data"),
                        data:params,
                        cache:false
                      }).then(function(res){
                        console.log(res);
                        if(res.data.code==10000){
                        that.$message({
                            message: '保存成功！',
                            type: 'success'
                          });
                          that.dialogChange = false
                          that.getList()
                        }else{
                          that.$message.error(res.data.msg);
                          that.dialogChange = false

                        }
                    })
                }else{
                    this.$message.warning('部门，岗位，工作类型，直属上级,工作地点必填一项');
                };
            }
          });
        }
      },
      treeClick() {
       this.treeVisabled=!this.treeVisabled
       this.getTree()
      },
    },
mounted() {
},
created() {
  this.getList()
  this.getNum()
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("./common/indexList/index2.css");

</style>
<style>
@import url("./common/indexList/index.css");
.some_dia .span_dialog {
  width:348px
}
.some_di .sty_input {
  width:220px;
}
</style>


