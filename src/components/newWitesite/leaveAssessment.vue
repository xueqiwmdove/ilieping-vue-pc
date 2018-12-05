
<template>
  <div>
    <newWitesiteHeader></newWitesiteHeader>
    <!--主体-->
    <!--查询报告-->
    <div class="main">
      <div class="content leaveContent">
      </div>
      <div class="report content">
        <p class="headLine">多维度报告</p>
        <div class="reportBg">
          <p class="rotate rotate1"><i class="triangle-left"></i>员工基本信息</p>
          <p class="rotate rotate2"><i class="triangle-top"></i>职场胜任力测评</p>
          <p class="rotate rotate3">职场失信行为曝光<i class="triangle-right"></i></p>
        </div>
      </div>
      <div class="assessmentFlow content">
        <p class="headLine">评价上传流程</p>
        <div class="assessment">
          <div class="step1">
            <h3 class="title">选择添加人员</h3>
            <div class="twokinds">
              <div class="kind">
                <h4>01、多维度评价</h4>
                <p>基于胜任力模型全方位点评离职员工                          </p>
              </div>
               <div class="kind">
                   <h4>02、快速评价</h4>
                   <p>一句话快速点评员工                                   </p>
               </div>
            </div>
          </div>
          <div class="step2">
            <h3 class="title">录入员工基本信息</h3>
            <p>录入离职人员基本信息、工作经历、教育经历等；让离职报告更权威更公正。</p>
          </div>
          <div class="step3">
            <h3 class="title">胜任力模型测评</h3>
            <div class="twokinds">
              <div class="kind">
                <h4>01、HR测评</h4>
                <p>基于胜任力模型建立多维度测评问卷，明确核心能力，进行素质定义。</p>
              </div>
              <div class="kind">
                <h4>02、上级测评</h4>
                <p>直属上级评价,通过H5链接形式将评测发送至直属上级。双重评测更具公正性。</p>
              </div>
            </div>
          </div>
          <div class="step4">
            <h3 class="title">曝光职场失信行为</h3>
            <p>企业通过“爱猎评”的离职报告，可以将无良员工的恶劣行径进行网络公示，利用网络手段进行权利声张和损失追讨，
              让其在职场无处可藏，不仅能够在企业内部产生惩戒示范效应，而且能够有效遏制此类职场恶劣行径，净化职场诚信环境。</p>
          </div>
          <div class="step5">
            <h3 class="title">上传企业联盟</h3>
            <p>使”职业信用“真正成为具有经济价值的”无形之手“，帮助企业打造正向激励的高绩效企业文化，全面提高人力资源管理效益。</p>
          </div>
        </div>
      </div>
    </div>

    <!--主体-->
    <newWitesiteFooter></newWitesiteFooter>
  </div>

</template>

<script>
  import newWitesiteHeader from '@/components/newWitesite/common/newWitesite_header';
  import newWitesiteFooter from '@/components/newWitesite/common/newWitesite_footer';

  export default {
    name: "leaveAssessment",
    components: {
      newWitesiteHeader,
      newWitesiteFooter
    },
    data () {
      return{
      }
    }
  }
</script>

<style scoped>
  @import url("../../assets/css/static/init.css");
  @import url("../../components/newWitesite/css/index.css");
  .step1{
    width: 670px;
  }
</style>



