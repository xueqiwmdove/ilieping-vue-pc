<template>
    <div>
       <el-input style="width:240px;" v-model="filterText"  autocomplete="off" placeholder="品牌文化部"></el-input>
         <el-tree  ref="tree2" :data="treeDatas"  :expand-on-click-node="false" node-key="id" :filter-node-method="filterNode"  @click="() => append(data)" class="filter-tree departmentTree">
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
    </div>
</template>
<script>
    export default {
        name: 'treedia',
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
<style >
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
</style>

