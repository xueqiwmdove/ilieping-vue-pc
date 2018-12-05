<template>
    <div>
      <el-breadcrumb class="linkWay">
        <el-breadcrumb-item v-for="(item,index) in breadList" :key="item.id"  separator="/" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "",
        data(){
          return{
            breadList: [] // 路由集合

          }
        },
        watch: {
          $route () {
            this.getBreadcrumb();
          }
        },
        created() {
          this.getBreadcrumb();
        },
        methods: {

          getBreadcrumb() {
            let breadNumber= typeof(this.$route.meta.breadNumber)!="undefined"?this.$route.meta.breadNumber:1;//默认为1
            console.log(breadNumber)

            let newBread={name:this.$route.name,path:this.$route.fullPath};//当前页面的
            // console.log(newBread)
            let breadList=this.$store.getters.breadListState;//获取breadList数组
            console.log(breadList)
            // let breadLength=this.$store.state.breadListState.length;//目前breadlist集合数组个数
            breadList.splice(breadNumber,breadList.length-breadNumber,newBread);
            if(breadNumber==1){//点击一级菜单
              this.$store.commit('breadListMutations',newBread);
            }
           /* let ishome=this.$route.name=='login';

            else if(breadLength<=breadNumber){//如果不是一级导航，并且breadlist集合个数等于或者小于目前层级
              this.$store.commit('breadListStateAdd',newBread);//要把当前路由添加到breadlist集合
            }else{
              this.$store.commit('breadListStateRemove',parseInt(breadNumber)+1);//如果往回点面包屑导航，截取；
            }*/

            this.$store.commit('breadListMutations',JSON.stringify(breadList));
            this.breadList=this.$store.getters.breadListState;

          },
        }

    }
</script>

<style scoped>

</style>
