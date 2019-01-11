<template>
    <div>
         <el-tree :data="treeDatas" class="filter-tree " node-key="id"  :expand-on-click-node="false"  @click="() => append(data)"  :filter-node-method="filterNode"   >
          <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
              <el-button  type="text"  @click="() => append(data)"  >
                 <span style="color:#394A66 ;"  >{{ node.label }}</span>
                <i class=" node_icon"  >
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
   props :{
      treeDatas:{
         type: Array,
        default () {
          return {

          }
        }
      }
    },
   watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
   }  ,
    methods:{
       append(data) {
         console.log(data,'<============parentId')
         this.$emit('getIds',data)
         this.$emit('status',status)
      },
       filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

    },
    created(){
      console.log(this.treeDatas,'<======treeDatas')
    }
    }
</script>
<style>
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

  .filter-tree .el-icon-caret-bottom::before{
      /*content: "\E603" !important;*/
      /*content: "\E60B";*/
      color: #c0c4cc;
      width: 5px;
      font-weight: bolder;
      right: 18px;
  }
</style>

