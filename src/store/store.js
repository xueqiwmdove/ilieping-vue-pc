import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    resetImg:0,
    breadListState:[
     /* {name:'发起签约1',path:'/bySinging',breadNumber:'1'},
      {name:'发送offer',path:'/sendOffer/null',breadNumber:'1'}*/
    ]
  },
  mutations: {
    resetImgInit(state){
      state.resetImg = 0;
    },
    resetImgClear(state){
      state.resetImg = 1;
    },
    breadListMutations(getters,list){
      getters.breadListState=list;
      // console.log("q231"+list,getters.breadListState)
      sessionStorage.setItem('breadListStorage',list);
    }
  },
  getters:{
    breadListState(){
      return JSON.parse(sessionStorage.getItem('breadListStorage')) || [];
    }
  }
 /* mutations: {
    breadListStateAdd(state,obj){
      state.breadListState.push(obj);
    },
    breadListStateRemove(state,num){
      state.breadListState.splice(num,state.breadListState.length-num);
    }
  }
*/
})
