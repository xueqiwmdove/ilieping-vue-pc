<template>
  <div>
  <newWitesiteHeader></newWitesiteHeader>
  <!--主体-->
    <!--主体-->
    <div class="main">
      <div class="banner brokenQuery">
      </div>
      <div class="searchBox">
        <div class="searchParent">
          <input type="text" class="search" placeholder="请输入姓名或手机号后四位查询" v-model.trim="searchValue" ref="count" @keyup.enter="goToSearch()">
          <input type="button" value="搜索" class="searchButton" @click="goToSearch()" :class="searchBtnClass" :disabled="searchDisabled">
        </div>
        <p>
          <span>今日新增离职报告：<i>155</i>人</span>
          <span>今日成功匹配：<i>5078</i>人</span>
        </p>
      </div>
      <div class="exposureContent">
        <p class="title">
          <span>最新曝光名单</span>
          <a>上传失信人</a>
        </p>
        <div class="dishonestContent">
          <div class="dishonestSingle">
            <img src="../../assets/img/dismission/men_19_32.svg" alt="sex">
            <p>山东**信息有限公司的HR</p>
            <p>上传了谭**（手机号170*****3137）的失信行为</p>
            <div class="describe">
              失信行为：外部交往－未经批准，像竞争对手或提供商
              提供有关公司的任何商业秘密，对公司造成了重大经济
              损失。
            </div>
            <p class="address">山东省／烟台市</p>
          </div>
          <div class="dishonestSingle">
            <img src="../../assets/img/dismission/women_33_45.svg" alt="sex">
            <p>上海**文化传播有限公司的HR</p>
            <p>上传了高**（手机号158*****3937）的失信行为</p>
            <div class="describe">
              失信行为：不到一年，财富中心总，业绩一般，后来业绩连续3个月挂0，被考核掉了，不过他当时也想离职。
            </div>
            <p class="address">上海</p>
          </div>
          <div class="dishonestSingle dif">
            <img src="../../assets/img/dismission/men_33_45.svg" alt="sex">
            <p>南京**人力资源有限公司的HR</p>
            <p>上传了李**（手机号180*****0414）的失信行为</p>
            <div class="describe">
              失信行为：骗取公司薪资， 同时兼职2家公司混底薪，带领下面4人整体行骗。学历不实，能力与自己描述不符，没有任何业绩，我行我素；
            </div>
            <p class="address">江苏省／南京市</p>
          </div>
          <div class="dishonestSingle">
            <img src="../../components/newWitesite/img/ic_superman.png" alt="sex">
            <p>深圳**信息技术有限公司的HR</p>
            <p>上传了张**（手机号137*****7997）的失信行为</p>
            <div class="describe">
              失信行为：没有任何业绩，我行我素；忽悠之前的部下加入自己的团队并收取人头份（1000元/每人），如果不给或不足，会以公司的名义，另其离职。
            </div>
            <p class="address">深圳</p>
          </div>
          <div class="dishonestSingle">
            <img src="../../components/newWitesite/img/ic_superwoman.png" alt="sex">
            <p>福建**有限公司的HR</p>
            <p>上传了苏**（手机号159*****0927）的失信行为</p>
            <div class="describe">
              失信行为：明明做不了高端理财，非要编造之前有几千万业绩，面试风格干练，老道，目前已被辞退，简历上最后工作单位没有添加。
            </div>
            <p class="address">福建省/厦门市</p>
          </div>
          <div class="dishonestSingle dif">
            <img src="../../components/newWitesite/img/ic_superman.png" alt="sex">
            <p>苏州**人力资源有限公司的HR</p>
            <p>上传了孙**（手机号189*****2189）的失信行为</p>
            <div class="describe">
              失信行为：混了三个月的底薪，早上打完卡不见人，晚上下班回来再打卡，拿着合同骗公司说去签合同，惯用手段就是可怜，寻求别人的同情。
            </div>
            <p class="address">江苏省/苏州市</p>
          </div>
        </div>
      </div>
    </div>
    <newWitesiteFooter></newWitesiteFooter>
  </div>

</template>

<script>
  import newWitesiteHeader from '@/components/newWitesite/common/newWitesite_header';
  import newWitesiteFooter from '@/components/newWitesite/common/newWitesite_footer';

    export default {
        name: "brokenQuery",
        components: {
          newWitesiteHeader,
          newWitesiteFooter
        },
      data () {
        return{
          searchValue:'',
        }
      },
      computed:{
        //搜索按钮样式
        searchBtnClass:function () {
          let reg=/\s+/g;
          if((reg.test(this.searchValue)==false && this.searchValue!="") && !this.isLoading){
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
          let reg=/\s+/g;
          if((reg.test(this.searchValue)==false && this.searchValue!="") && !this.isLoading){
            return false
          }else{
            return true
          }
        },
      },
      watch:{
        //监听搜索的时候，数字只能是4位，其他5位。
        searchValue:function(){
          let that=this;
          let _sum=5;
          let _reg=/[^\u4E00-\u9FA5]/g;
          let sum=4;
          let reg=/^\d{4}$/;let reg1=/\s+/g;

          if((_reg.test(that.searchValue))&& that.searchValue!="" ){/*&& that.searchValue.length==5*/
            that.$refs.count.setAttribute("maxlength",_sum);
          }
          else if((reg.test(that.searchValue)) && that.searchValue!="" ){/*&& that.searchValue.length==4*/
            that.$refs.count.setAttribute("maxlength",sum);
          }

          //this.searchValue= this.searchValue.replace(/^\d{5}$/,'');
        },
      },
      methods:{
          //如果登录过就直接可以跳转到后台搜索查询页面
     goToSearch(){
       let that=this;
       if(window.localStorage.getItem("jingjing_login_token")!=undefined && that.searchValue!=""){
         that.$router.push("/searchbefore2/");
         localStorage.setItem('searchValue',that.searchValue)
       }else{
		        that.$confirm('您还未登录，请先登录后再进行操作!', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          center:'true',
		        }).then(() => {
           that.$router.push("login");
		        /*}).catch(() => {
		          that.$message({
		            type: 'info',
		            message: '已取消'
		          });*/
		        });

       }
     }
      }
    }
</script>

<style scoped>
  @import url("../../assets/css/static/init.css");
  @import url("../../components/newWitesite/css/index.css");
  .main .exposureContent .dishonestContent .dishonestSingle .describe{
    text-align: left;
  }
  .click_opacity{
    opacity: 0.6;
  }
</style>
