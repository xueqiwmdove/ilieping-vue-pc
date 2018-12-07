<template>
    <div class="search searchs" > 
         <el-input  v-model="filterText" class="input_search" placeholder="品牌文化部" >
            <i  slot="prefix" class="el-input__icon se_icon el-icon-search"></i>
         </el-input>
       <!-- <el-input style="width:240px;"   autocomplete="off" placeholder="品牌文化部"></el-input> -->
       <!-- <el-scrollbar style="height:100%" >  -->
         <el-tree  ref="tree2" :data="treeDatas"  :expand-on-click-node="false" node-key="id" :filter-node-method="filterNode"  @click="() => append(data)" class="filter-tree trees departmentTree">
          <span  class="custom-tree-node" slot-scope="{ node, data }">
            <span >
              <el-button  type="text"  @click="() => append(data)" >
                 <span style="color:#394A66 ;" >{{ node.label }}</span>
                <i class=" node_icon" @click="() => append(data)" >
                </i>
              </el-button>
            </span>
         </span>
       </el-tree>
       <!-- </el-scrollbar>     -->
    </div>
</template>
<script>
    export default {
        name: 'treesearch',
        data() {
          return {
            filterText:'',
          }  
        },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
   props :{
      treeDatas:{
         type: Array,
        default () {
          return {}
        }  
      }  
    },
    methods:{
       append(data) {
         console.log(data,'<============parentId')
        this.$emit('getId',data)
         this.$emit('treeHiden',status)
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
       filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }

    }
    }
</script>
<style scoped>
  .node_icon {
    color:#7A8699;
    margin-left:60px;
    font-size: 10px;
  }
  .node_icon:hover{
    color:#F95714;
  }
  .node_icon:visited {
    color:#F95714;
  }
  .filter-tree .el-tree-node__content {
   height: 45px;;
}
.input_search {
  width: 260px;
  margin-top: 10px;
  /* position: absolute;
  top:-21px; */
  
}
.search .input_search .se_icon {
  position: absolute;
  left:213px;
  height: 30px;
  top: 8px;
  font-size: 18px;
  font-weight: 700;
  border-left: 1px solid #E5E5E5;
  color: #F95714;
}
.search .el-icon-search:before {
    content: "\E619";
    margin-left: 5px;
}
</style>
<style>
.search .trees .el-tree-node__content {
   height: 40px; 
}
.searchs .el-scrollbar__wrap {
  overflow-x: hidden !important;
 }
</style>


