<template>
    <div class="tree_style" >
      <div class="ly_aside">
      <div id="resite">
        <button class="btn_resite" @click="addNewemployee" >添加员工</button>
        <button class="btn_resite" @click="addPartner" >新增部门</button>
        <!-- <button  class="btn_resite">批量导入</button> -->
      </div>
      <div class="company_tit" style="cursor: pointer;" @click="getAll">{{tit}} <span>({{this.countPersons}})</span></div>
      <!-- tree树结构 -->
      <div class="sty_tree">
         <div style="height:300px;">
            <el-scrollbar style="height:100%">
              <el-tree :data="treeDatas" node-key="id"  :expand-on-click-node="false" class="filter-tree departmentTree"   @click="() => append(data)"  >
                  <span class="custom-tree-node" slot-scope="{ node, data }"  @mouseenter="enter(data.id)" style="width:190px;line-height: 30px;text-align:left;height:30px">
                    <span  :class="{activess : activess == data.id}"  @click="() => append(data)">{{ node.label }}
                      <!-- <span v-for="(index,item) in counts" :key="index"><span v-if="data.id==item">({{index}})</span></span> -->
                        <i class="sty" >
                          <el-dropdown placement='bottom'  >
                           <span > <img class="imgs" src="../../assets/Page 1.svg" alt="" v-show="seen && data.id==current"></span>
                            <el-dropdown-menu slot="dropdown" @mouseleave="leave()" class="sty_dev">
                              <el-dropdown-item @click.native="move(data)">移动部门</el-dropdown-item>
                              <el-dropdown-item @click.native="reset(data)">重命名</el-dropdown-item>
                              <el-dropdown-item @click.native="delet(data)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </i>
                    </span>
                    <span >
                    </span>
                </span>
              </el-tree>
             </el-scrollbar>
         </div>
        <div @click="group('1')"  :class="{actives:isfalse}" class="catorgry" >未命名分组 </div>
        <hr>
        <div @click="quitPerson('1')"  :class="{actives:isfalse2}" class="catorgry" >离职人员 </div>
      </div>

    </div>
   <!-- 弹窗-新增部门  -->
     <el-dialog title="新增部门" :visible.sync="dialogFormVisible" class="add_dialog" custom-class="sty_dialogs" :before-close="closeAdd">
        <el-form :model="form1" :rules="rules"  ref="form1" >
          <el-form-item label="部门名称" :label-width="formLabelWidth" prop="deptName">
            <el-input style="width:280px;" v-model="form1.deptName" maxlength="32"  placeholder="请输入部门名称"></el-input>
          </el-form-item>
          <el-form-item label="上级部门" :label-width="formLabelWidth" v-clickoutside="handleClose1" >
            <el-input @click.native="treeClick" style="width:280px;" v-model="form1.label"   class="el-icon-arrow-down"></el-input>
              <div v-if="treeVisabled" class="form_tree" >
                    <treeDia :tree-datas="treeDatas" v-on:treeHiden='getstatus' v-on:getId="getLabel"></treeDia>
              </div>
          </el-form-item>
        </el-form>
         <div slot="footer" class="dialog-footer">
         <el-button type="primary"  :class="searchBtnClass" :disabled="searchDisabled" style="height:36px;background: #F95714;" @click="addSubmit">提交</el-button>
            <el-button style="height:36px" @click="closeAdd(form1)">取 消</el-button>
        </div>

      </el-dialog>
        <!-- 弹窗-移动部门  -->
     <el-dialog title="移动部门" :visible.sync="dialogMove" class="add_dialog " custom-class="sty_dialogs" >
             <el-form :model="form5" >
                <el-form-item label="待移动部门" :label-width="formLabelWidth">
                  <span style="font-size:16px;">{{form5.label}}</span>
                </el-form-item>
                 <el-form-item label="新上级部门" :label-width="formLabelWidth" v-clickoutside="handleClose4">
                    <el-input @click.native="treeClick1" style="width:280px;"  v-model="form5.name"  class="el-icon-arrow-down"></el-input>
                      <transition name="fade">
                      <div v-if="treeVisabled1" class="form_tree" >
                          <treeSelect :tree-datas="treeDatas" v-on:status='getstatus' v-on:getIds="getParent"></treeSelect>
                      </div>
                      </transition>
                </el-form-item>
              </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" style="height:36px"  @click="moveSubmit">确 定</el-button>
          <el-button style="height:36px" @click="dialogMove = false">取 消</el-button>
        </div>
      </el-dialog>
       <!-- 弹窗-重命名部门  -->
     <el-dialog title="重命名部门" :visible.sync="dialogReset" class="add_dialog " custom-class="sty_dialogs">
             <el-form :model="form4" >
                <el-form-item label="原部门名称" :label-width="formLabelWidth">
                  <el-input disabled style="width:280px;" v-model="form4.label" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item label="新部门名称" :label-width="formLabelWidth">
                  <el-input style="width:280px;" v-model="form4.name" autocomplete="off"  maxlength="32"  placeholder="请输入新部门名称"></el-input>
                </el-form-item>
              </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary"  :class="searchBtnClass1" :disabled="searchDisabled1" style="height:36px;background: #F95714;"  @click="resetName">确 定</el-button>
          <el-button style="height:36px"  @click="dialogReset = false">取 消</el-button>
        </div>
      </el-dialog>
  <!-- end-->
   <!-- 弹窗-删除部门  -->
     <el-dialog title="" :visible.sync="dialogDelete" class="add_dialog " style="border-bottom: 0px solid #E5E5E5;" custom-class="sty_dialogs">
             <div style="text-align:center;"><i class="el-icon-warning" style="font-size:50px;color:#F5A623;"></i></div>
             <div style="text-align:center;font-size:16px;color:#394A66;margin:10px 0 ;">确定要删除部门吗?</div>
             <div style="text-align:center;font-size:16px;color:#394A66">删除后该部门的所有员工将全部移至未命名分组</div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="deletenode" style="height:36px">确 定</el-button>
          <el-button style="height:36px" @click="dialogDelete = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import http from '@/http/http'
import api from '@/api/api.js';
import {headers} from '@/assets/js/common/lp.js'
import treeSelect from '@/components/common/treeSelect'
import treeDia from '@/components/common/treeDia'

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
      name: 'treeselect',
      components: {
        treeSelect,
        treeDia
      },
      props:['countPersons'],
      data() {
        return {
          seen:false,
          current:'',
          activess:'',
          counts:{},
          tit:window.localStorage.getItem('title'),
          isfalse:false,
          isfalse2:false,
          dialogMove:false,//移动弹窗
          dialogReset:false,//重命名弹窗
          dialogDelete:false,//删除部门
          treeVisabled:false,
          treeVisabled1:false,
          dialogFormVisible:false,//新增
          treeDatas:[],
          flag0:false,
          id1:'',//新增部门时选择上级部门id
          parentId:'',//移动部门是获取上级部门id
          Id:'',//移动部门时获取当前的部门id
          dptID:'',//删除部门时获取的上级部门id
          countPerson:'',//部门总人数
          formLabelWidth: '120px',
            form1:{
            deptName:'',
            label:'上海棋至文化传播有限公司',
          },
          form4:{
              name:'',
              label:'',
            },
            form5:{
              name:'',
              region:'',
              label:'请选择新的部门名称'
            },
            rules: {
            deptName:[
              { required: true, message: '请输入部门名称', trigger: 'blur' },
              { min:1, max: 32, message: '长度在32个字符内', trigger: 'blur' }
            ],
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min:1, max: 32, message: '长度在32个', trigger: 'blur' }
            ],
            region: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ]
          },
        }
      },
   computed:{
        //搜索按钮样式
        searchBtnClass:function () {
          if(this.form1.deptName!="" ){
              return{
                click_opacity:false
              }
          }else{
              return{
                click_opacity:true
              }
          }
        },
        //按钮禁用 true
        searchDisabled:function () {
          if(this.form1.deptName!=""  ){
            return false
          }else{
            return true
          }
        },
          //搜索按钮样式
        searchBtnClass1:function () {
          if(this.form4.name !=''){
              return{
                click_opacity:false
              }
          }else{
              return{
                click_opacity:true
              }
          }
        },
        //按钮禁用 true
        searchDisabled1:function () {
          if(this.form4.name !='' ){
            return false
          }else{
            return true
          }
        },
   },
   directives: {clickoutside},
   methods:{
      handleClose1(e) {
          this.treeVisabled = false;
      }, 
       handleClose4(e) {
          this.treeVisabled1 = false;
      }, 
    //获取部门人数
      getcounts() {
          let that = this
          this.$http({
            method:"post",
            url:api.counts,
            headers:headers('application/json;charset=utf-8'),
            cache:false
          }).then(function(res){
            if(res.data.code==10000 || res.data.data==null){
                that.counts=res.data.data
              console.log(res.data.data,'<=======counts')
               for(let item in that.counts) {
              console.log(item,that.counts[item],'<====item')
               }
            }else{
            that.$message.error(res.data.msg);
            }
          });
      },
      enter(index){
        this.seen = true;
        this.current = index;
      },
      leave(){
        this.seen = false;
        this.current = '';
      },
    //点击获取总人数列表
      getAll() {
        this.isfalse2 =false
        this.isfalse=false
        this.active=''
        let id = ''
       this.$emit("getDptid",id)
      },
    //点击获取未分组信息
      group(val) {
       this.$emit("getState",val)
       this.isfalse =true
       this.isfalse2 =false
       this.activess=''
      },
    //点击获取离职人员
      quitPerson(val) {
        this.$emit('getStatus',val)
        this.isfalse2 =true
        this.isfalse=false
        this.activess=''
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
            }else{
            that.$message.error(res.data.msg);
            }
          });
      },
   //关闭新增弹窗   
      closeAdd(form1) {
        this.dialogFormVisible=false
        this.resetForm(form1)
      },
        resetForm(form1) {
        this.$refs.form1.resetFields();
      },
     //添加新员工
      addNewemployee() {
        this.$router.push({path:'/insertNewEmployee'})
      },
       //保存新增部门
      addSubmit() {
        if(this.id1=='') {
          this.id1= 0
        }
        this.$refs.form1.validate(valid => {
          if (valid) {
            if(this.form1.deptName.trim() =='') {
              this.$message({
                message:'部门不能为空',
                type:'error'
              })
            }else {
              let that = this
                this.$http({
                    method:"post",
                    url:api.addpartment,
                    headers:headers('application/json;charset=utf-8'),
                    data:{
                      "deptName":that.form1.deptName,
                      "parentId":that.id1
                    },
                    cache:false
                  }).then(function(res){
                    if(res.data.code==10000){
                      that.dialogFormVisible=false
                      that.$message.success("操作成功");
                      that.getTree()
                    }else{
                    that.$message.error(res.data.msg);
                }
              });
            }
          }
        });
      },
     //新增
      addPartner() {
        this.form1.label = window.localStorage.getItem('title')
        this.form1.deptName=''
        this.id1=''
        this.dialogFormVisible =true;
      },
     //重命名
      reset(data) {
        this.form4.name =''
        this.Id = data.id
        this.form4.label = data.label
        this.dialogReset=true
      }  ,
      // 重命名提交
      resetName() {
        let that = this
          this.$http({
            method:"post",
            url:api.updatepartment,
            headers:headers('application/json;charset=utf-8'),
            data:{
              "id":that.Id,
              "deptName":that.form4.name
            },
            cache:false
          }).then(function(res){
            if(res.data.code==10000 || res.data.data==null){
              that.treeDatas = res.data.data
              that.dialogReset=false
              that.form4={}
              that.getTree()

            }else{
            that.$message.error(res.data.msg);
            }
          });

      },
      treeClick() {
       this.treeVisabled=!this.treeVisabled
      },
        treeClick1() {
       this.treeVisabled1=!this.treeVisabled1
      },
      getstatus() {
        this.treeVisabled=false
        this.treeVisabled1=false
      } ,
      // 获取label
      getLabel(val){
        this.form1.label=val.label
        this.id1 = val.id
        console.log(this.id1,'id1')
      },
      //获取部门id
      getParent(val) {
          this.parentId =val.id,
          this.form5.name=val.label
        },
    //移动部门
      move(data) {
        this.form5.name=data.label
        this.Id=''
        this.form5.label = data.label
        this.dialogMove=!this.dialogMove
        this.Id = data.id
      },
      //y移动保存
      moveSubmit() {
        let that = this
        if(that.Id !==that.parentId ) {
        this.$http({
	  			method:"post",
	  			url:api.updatepartment,
          headers:headers('application/json;charset=utf-8'),
          data:{
            "id":that.Id,
            "parentId":that.parentId
          },
	  			cache:false
	  		}).then(function(res){
	  			if(res.data.code==10000 || res.data.data==null){
            that.treeDatas = res.data.data
            that.dialogMove=false
            that.getTree()

	  			}else{
	  			that.$message.error(res.data.msg);
	  			}
		    });
        }else{
           that.$message({
                message: '请重新移动！',
                type: "error"
              });
            that.dialogMove=false
            that.getTree()
        }
      },
    //删除部门
      delet(data) {
        this.dialogDelete=!this.dialogDelete
        this.Id = data.id
        this.dptID=data.parentId

      },
    // 提交删除
      deletenode() {
        let that = this
        let deptId =that.Id
        let parentId=that.dptID
          this.$http({
            method:"delete",
            url:api.deleteDept+'/'+deptId+'/'+parentId,
            headers:headers('application/json;charset=utf-8'),
            cache:false
          }).then(function(res){
            if(res.data.code==10000 ){
              that.$message({
                  message: '删除成功！',
                  type: "success"
                });
              that.$emit("getlists")
              that.dialogDelete=false
              that.getTree()
            }else if(res.data.code==40000) {
               that.$message.error(res.data.msg);
               that.dialogDelete=false
            }else{
             that.$message.error(res.data.msg);
            }
          });
      },
      append(data) {
          console.log(data,'<=============data')
          this.activess = data.id;
          this.$emit("getDptid",data.id)
          this.isfalse2 =false
          this.isfalse=false
        },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

  },
  created() {
    // if(this.countPersons) {
    //   this.countPerson =this.countPersons
    // }
      this.getTree()
      // this.getNum()
      this.getcounts()
  }
}
</script>
<style scoped>
@import url("../employeeManage/common/indexList/index2.css");
.imgs {
  display: inline-block;
  position: absolute;
  right: -66px;
  top: -20px;
  width: 140px;
  height: 25px;
  /* margin-left: 60px; */
}
</style>
<style>
@import url("../employeeManage/common/indexList/index.css");
</style>
