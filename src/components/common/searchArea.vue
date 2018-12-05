<template>
  <!--搜索地区下拉-->
  <div class="areaDetail">
    <span class="chosen allCountry" >全国</span>
    <span ng-repeat="item in allArea">{{item}}</span>
  </div>
</template>

<script>
  export default {
    name:'searchPage',
    data(){
      return{

      }
    },
    methods:{

    }
  }
</script>

