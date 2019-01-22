<template>
  <div>
    <div class="mainCon el-col-24">
      <!--顶部导航-->
      <nav @click="goToSelectTemplates">
        <img src="../../assets/img/contract/ic_fanhui.svg" alt="">返回
      </nav>
      <!--右侧内容栏-->
      <el-dialog
        title=""
        :visible.sync="contractAlert"
        class="contractAlert"
        custom-class="contractAlertContent">
        <div class="text-center">
          <img src="../../assets/img/dismission/ic_success.svg" >
          　<p>合同发送成功</p>
        </div>
        <span slot="footer" class="dialog-footer">
              <el-button type="primary" class="confirm" @click="goTobySing">继续签约</el-button><!--使用模板确定-->
          <!--<el-button type="primary" class="confirm"  v-show="flag==2">确 定</el-button>&lt;!&ndash;上传文件确定&ndash;&gt;-->
              <el-button class="cancel" @click="goToContractManagement">查看合同管理</el-button>
            </span>
      </el-dialog>

      <div class="right-content pull-right">
        <div class="content">
          <!--主体内容-->


          <div class="signContract">

            <div class="signAside">
              <ul>
                <li><span>第一步：</span>选择签约方</li>
                <li><em></em>{{employeeName}}</li>
                <li><em></em><span class="company">{{enterpriseName}}</span></li>
                <!--<li><em></em>{{agreementName}}</li>-->
                <!--<li><em></em><span class="company">{{message_title}}</span></li>-->
              </ul>
              <ul>
                <li><span>第二步：</span>发起签署位置</li>
                <!--<li>
                  <div>签署信息</div>
                </li>
                <li>签名</li>
                <li>签署日期</li>-->
              </ul>
            </div>
            <!--<vue-scroll :ops="ops">-->
            <div class="contractContent">
              <div class="contractBox" >
                <!--<div class="section0">
                    <h1>劳动用工合同</h1>
                  <h3>第一条劳动合同期限及注意事项
                  </h3>
                  <p class="p">1.1 甲乙双方同意按下列第<input type="text"> 种方式确定劳动合同期限：
                  </p>
                  <p class="p"><span>(1)固定期限：从<input type="text"> 年<input type="text">月<input type="text">日起至<input type="text">年<input type="text">月<input type="text">日止。如果该期限与以后签订的培训服务期不一致，劳动合同期限延续到培训协议约定的服务期届满为止。</span>
                  </p>
                  <p class="p">
                    <span>(2)无固定期限：从<input type="text">年<input type="text">月<input type="text">日起到劳动合同法定解除或终止情形出现时止。</span>
                  </p>
                  <p class="p"><span>(3)&#160;以完成一定的工作为期限：从<input type="text">年<input type="text">月<input type="text">日起至工作任务的完成时止，并以工作任务完成作为终止劳动合同的标志。</span>
                  </p>
                  <p class="p">1.2 双方同意按下列第<input type="text">种方式确定试用期期限(试用期包括在劳动合同期限内)：</span>
                  </p>
                  <p class="p"><span>(1)&#160;无试用期。</span>
                  </p>
                  <p class="p"><span>(2)&#160;试用期从<input type="text">年<input type="text">月<input type="text">日起至<input type="text">年<input type="text">月<input type="text">日止。</span>
                  </p>
                  <p class="p">1.3 试用期结束转正条件为：<input type="text">
                  </p>
                  <p class="p">1.4 甲方有权了解乙方与劳动合同直接相关的基本情况，乙方应当如实说明。乙方向甲方提交的个人资料，应当保证真实准确。
                  </p>
                  <p class="p">1.5 甲方应当如实告知乙方工作内容、工作条件、工作地点、职业危害、安全生产状况、劳动报酬，以及乙方要求了解的其他情况。
                  </p>
                  <p class="p">1.6 未经甲方同意，乙方在劳动合同期间不得同时为其他用人单位或个人提供劳务服务或建立劳动关系。乙方违反本约定给甲方造成损失的，乙方应当承担赔偿责任。乙方隐瞒尚未解除或者终止原劳动合同关系给甲方造成损失的，甲方有权单方解除合同，并就乙方对甲方造成的损失向乙方追偿。
                  </p>
                  <h3>第二条工作内容和工作地点
                  </h3>
                  <p class="p">2.1&#160;&#160;甲方安排乙方担任<input type="text">工作岗位。乙方应当按照甲方规章制度中的岗位职责要求完成生产工作任务。
                  </p>
                  <p class="p">2.2&#160;&#160;有下列情形之一的，甲方可以调整乙方的工作岗位：
                  </p>
                  <p class="p"><span>(1)&#160;甲乙双方协商一致的；</span>
                  </p>
                  <p class="p"><span>(2)&#160;乙方患病或者非因工负伤，在规定的医疗期满后不能从事原工作的；</span>
                  </p>
                  <p class="p"><span>(3)&#160;乙方不能胜任工作的；</span>
                  </p>
                  <p class="p"><span>(4)&#160;法律、行政法规规定的其他情形。</span>
                  </p>
                  <p class="p">2.3&#160;&#160;工作的具体地点：<input type="text">
                  </p>
                  <p class="p">甲乙双方协商一致，可以变更工作地点。
                  </p>
                  <h3>第三条工作时间和休息休假
                  </h3>
                  <p class="p">3.1&#160;&#160;甲方安排乙方执行下列第<input type="text">种工时制度：
                  </p>
                  <p class="p"><span>(1)&#160;&#160;标准工时制度：每日工作不超过八小时，每周工作时间不超过四十小时；</span>
                  </p>
                  <p class="p"><span>(2)&#160;综合计算工时制度：平均每天工作时间不超过八小时，平均每周工作时间不超过四十小时。</span>
                  </p>
                  <p class="p"><span>(3)&#160;不定时工作制度：在保证完成甲方工作任务情况下，乙方自行安排工作和休息时间。</span>
                  </p>
                  <p class="p">甲方实行第(2)、(3)项工作制的，应当经劳动行政部门批准。
                  </p>
                  <p class="p">3.2&#160;&#160;甲方经与乙方协商后可以安排乙方加班，一般每日不超过一小时。有特殊原因需要延长的，延长工作时间每日不超过三小时，每月不超过三十六小时。
                  </p>
                  <p class="p">3.3&#160;&#160;甲方安排乙方加班，应当依照国家规定和甲方的规章制度，支付加班费用或安排乙方补休。
                  </p>
                  <p class="p">3.4&#160;&#160;甲方依法保证乙方的休息休假的权利，乙方在劳动合同期内享受国家规定的节假日、年休假、婚丧假、产假等假期。
                  </p>
                  <h3>第四条劳动报酬、社会保险和福利待遇
                  </h3>
                  <p class="p">4.1&#160;&#160;甲方按照按劳分配原则，实行同工同酬，确定工资分配方式。
                  </p>
                  <p class="p">4.2&#160;&#160;经甲乙双方协商一致，试用期内乙方的工资为每月<input type="text">
                    元人民币。试用期期满，工资报酬按下列<input type="text">方案执行：
                  </p>
                  <p class="p"><span>(1)&#160;&#160;基本工资制。乙方每月的基本工资为<input type="text">元人民币。</span>
                  </p>
                  <p class="p"><span>(2)&#160;基本工资和绩效工资相结合的制度。乙方每月的基本工资为 <input type="text">元人民币。绩效工资按照甲方规章制度确定的标准进行计算。</span>
                  </p>
                  <p class="p" ><span>(3)&#160;计件工资制。乙方在法定工作时间或约定的工作时间内提供正常劳动，甲方按照规章制度的有关规定确定劳动定额和计件报酬标准。</span>
                  </p>
                  <p class="p">4.3&#160;&#160;甲方每月<input type="text">日前向乙方支付工资报酬。甲方依法代扣乙方工资或者乙方拒绝领取的，不属于克扣或者无故拖欠工资。
                  </p>
                  <p class="p">4.4&#160;&#160;甲方可以根据规章制度中的工资分配制度，调整工资标准和相关福利待遇。
                  </p>
                  <p class="p">4.5&#160;&#160;双方依法参加社会保险，按时缴纳各项社会保险费，其中依法应当由乙方缴纳的部分，由甲方从乙方工资报酬中代扣代缴。甲方违反国家规定不缴、少缴社会保险费用造成乙方社会保险待遇损失的，甲方应当承担赔偿责任。
                  </p>
                  <p class="p">4.6&#160;&#160;乙方患病或非因工负伤的相关待遇，按照国家有关规定执行。
                  </p>
                  <p class="p">4.7&#160;&#160;乙方患职业病或因工负伤的相关待遇，按照国家有关规定执行。
                  </p>
                  <p class="p" >4.8&#160;&#160;女职工在孕期、产期、哺乳期以及节育手术期间的相关福利待遇，按照国家有关规定执行。
                  </p>
                  <p class="p">4.9&#160;&#160;甲方为乙方提供下列福利待遇： <input type="text">
                  </p>
                  <h3>第五条劳动条件、劳动保护和职业危害防护
                  </h3>
                  <p class="p">5.1&#160;&#160;甲方为乙方提供符合国家标准的劳动条件和劳动保护，依法对女职工和未成年工实行特殊劳动保护。
                  </p>
                  <p class="p">5.2&#160;&#160;乙方在劳动过程中必须严格遵守关于劳动生产安全的法律法规和甲方的规章制度。但是，对甲方管理人员违章指挥、强令冒险作业，有权拒绝执行；对危害生命安全和身体健康的行为，有权提出批评、检举和控告。
                  </p>
                  <p class="p">5.3&#160;&#160;甲方应当建立、健全劳动安全卫生制度，严格执行国家劳动安全卫生规程和标准，对乙方进行劳动安全卫生教育，防止劳动过程中的事故，减少职业危害。
                  </p>
                  <p class="p">5.4&#160;&#160;甲乙双方应当严格执行国家有关生产事故、职业病、工伤的统计报告和处理制度。乙方在劳动合同期内患有职业禁忌、职业病、工伤等，应当按照国家有关规定处理。
                  </p>
                  <h3>第六条规章制度和劳动纪律
                  </h3>
                  <p class="p">6.1&#160;&#160;甲方在制定、修改或者决定直接涉及乙方切身利益的规章制度或者重大事项时，应当征求工会和乙方的意见，与工会或者职工代表平等协商确定。在规章制度和重大事项决定的实施过程中，工会或者乙方认为不适当的，有权向甲方提出，通过协商予以修改完善。
                  </p>
                  <p class="p">6.2&#160;&#160;甲方应当将直接涉及乙方切身利益的规章制度和重大事项决定公示或者告知乙方。
                  </p>
                  <p class="p" >6.3&#160;&#160;乙方应当遵守甲方的规章制度和劳动纪律，积极参加甲方组织的相关培训，提高专业素质和职业道德。乙方违反规章制度和劳动纪律，甲方可以根据具体情况，依法给予处罚。给甲方造成损失的，甲方可以要求乙方承担赔偿责任。
                  </p>
                  <h3>第七条劳动合同的履行和变更
                  </h3>
                  <p class="p">7.1&#160;&#160;甲乙双方协商一致，可以变更劳动合同的内容。变更劳动合同，应当采用书面形式载明变更的内容、日期等，由双方签字盖章。劳动合同未变更的部分，应当继续履行。
                  </p>
                  <p class="p">7.2&#160;&#160;劳动合同期满，甲方与乙方续延劳动合同的，应当提前三十日通知乙方。双方协商一致，应当及时办理续延手续。
                  </p>
                  <p class="p">7.3&#160;&#160;劳动合同期满，有本合同约定的8.4条款情形之一的，劳动合同应当续延至相应的情形消失时终止。但是8.4条款第(4)项约定的劳动合同的终止，按照国家有关工伤保险的规定执行。
                  </p>
                  <p class="p">&#160;7.4&#160;&#160;有下列情形之一的，乙方提出或者同意订立、续订劳动合同，除乙方提出订立固定期限劳动合同外，应当订立无固定期限劳动合同：
                  </p>
                  <p class="p"><span>(1)&#160;乙方在甲方连续工作满十年的；</span>
                  </p>
                  <p class="p"><span>(2)&#160;连续订立二次固定期限劳动合同，且乙方没有本合同8.3条款第(1)至第(5)项的约定情形之一的，续订劳动合同的；</span>
                  </p>
                  <p class="p"><span>(3)&#160;甲方初次实行劳动合同制度或者甲方作为国有企业改制重新订立劳动合同时，乙方在甲方连续工作满十年且距法定退休年龄不足十年的。</span>
                  </p>
                  <h3>第八条劳动合同的解除和终止</h3>
                  <p class="p">8.1&#160;&#160;甲乙双方协商一致，可以解除劳动合同。
                  </p>
                  <p class="p">8.2&#160;&#160;在试用期中，除乙方在试用期间被证明不符合录用条件和本合同8.3条款第(1)至第(7)项约定的情形之外，甲方不得解除劳动合同。
                  </p>
                  <p class="p">8.3&#160;&#160;试用期满，有下列情形之一的，甲方可以解除劳动合同:
                  </p>
                  <p class="p"><span>(1)&#160;乙方严重违反甲方的规章制度的；</span>
                  </p>
                  <p class="p"><span>(2)&#160;乙方严重失职、营私舞弊，给甲方造成重大损害的；</span>
                  </p>
                  <p class="p"><span>(3)&#160;乙方同时与其他用人单位建立劳动关系，对完成甲方的工作任务造成严重影响，或者经甲方提出，拒不改正的；</span>
                  </p>
                  <p class="p"><span>(4)&#160;乙方以欺诈、胁迫的手段或者乘人之危，使甲方在违背真实意思的情况下订立或者变更劳动合同的；</span>
                  </p>
                  <p class="p"><span>(5)&#160;乙方被依法追究刑事责任的；</span>
                  </p>
                  <p class="p"><span>(6)&#160;乙方患病或者非因工负伤，在规定的医疗期满后不能从事原工作，也不能从事由甲方另行安排的工作的;</span>
                  </p>
                  <p class="p"><span>(7)&#160;乙方不能胜任工作，经过培训或者调整工作岗位，仍不能胜任工作的；</span>
                  </p>
                  <p class="p"><span>(8)&#160;劳动合同订立时所依据的客观情况发生重大变化，致使劳动合同无法履行，经甲方与乙方协商，未能就变更劳动合同内容达成协议的；</span>
                  </p>
                  <p class="p"><span>(9)&#160;甲方依照企业破产法规定进行重整的；</span>
                  </p>
                  <p class="p"><span>(10)&#160;甲方生产经营发生严重困难的；</span>
                  </p>
                  <p class="p"><span>(11)&#160;甲方转产、重大技术革新或者经营方式调整，经变更劳动合同后，仍需裁减人员的；</span>
                  </p>
                  <p class="p"><span>(12)&#160;其他因劳动合同订立时所依据的客观经济情况发生重大变化，致使劳动合同无法履行的；</span>
                  </p>
                  <p class="p"><span>(13)&#160;甲方向乙方提出解除劳动合同并与乙方协商一致解除的；</span>
                  </p>
                  <p class="p" ><span>(14)&#160;法律、行政法规规定的其他情形。</span>
                  </p>
                  <p class="p">8.4&#160;&#160;乙方有下列情形之一的，甲方可以根据本合同8.3条款第(1)至第(5)项的约定解除劳动合同，但是不得根据本合同8.3条款第(6)至第(12)项的约定解除劳动合同。
                  </p>
                  <p class="p"><span>(1)&#160;患病或负伤，在规定医疗期内的；</span>
                  </p>
                  <p class="p"><span>(2)&#160;女职工在孕期、产期、哺乳期内的；</span>
                  </p>
                  <p class="p"><span>(3)&#160;乙方从事接触职业病危害作业，未进行离岗前职业健康检查，或者疑似职业病病人在诊断或者医学观察期间的；</span>
                  </p>
                  <p class="p"><span>(4)&#160;在甲方患职业病或者因工负伤并被确认丧失或者部分丧失劳动能力的；</span>
                  </p>
                  <p class="p"><span>(5)&#160;在甲方连续工作满十五年，且距法定退休年龄不足五年的；</span>
                  </p>
                  <p class="p"><span>(6)&#160;法律、行政法规规定的其他情形。</span>
                  </p>
                  <p class="p">8.5&#160;&#160;甲方单方解除劳动合同，应当事先将理由通知工会。甲方违反法律、行政法规规定或者劳动合同约定的，工会有权要求甲方纠正。甲方应当研究工会的意见，并将处理结果书面通知工会。甲方应当将解除劳动合同的决定书面送达乙方。
                  </p>
                  <p class="p">8.6&#160;&#160;甲方根据本合同8.3条款第(6)至第(8)项的约定解除劳动合同，应当提前三十日以书面形式通知乙方本人或者额外支付乙方一个月工资。
                  </p>
                  <p class="p">8.7&#160;&#160;甲方根据本合同8.3条款第(9)至第(12)项的约定，需要裁减人员二十人以上或者裁减不足二十人但占甲方职工总数百分之十以上的，甲方提前三十日向工会或者全体职工说明情况，听取工会或者职工的意见后，裁减人员方案经向劳动行政部门报告，可以裁减人员。甲方根据本条款裁减人员，在六个月内重新招用人员的，应当通知乙方，并在同等条件下优先招用乙方。
                  </p>
                  <p class="p">8.8&#160;&#160;乙方解除劳动合同应当提前三十日以书面形式通知甲方。试用期内，乙方解除劳动合同的，应当提前三天通知甲方。乙方根据本合同9.2条款第(1)至第(4)项的约定解除劳动合同，应当事先告知甲方。乙方根据9.2条款第(5)至第(8)项的约定可以立即解除劳动合同，不需事先告知甲方。
                  </p>
                  <p class="p">8.9&#160;&#160;甲方应当在解除或终止劳动合同时出具解除或者终止劳动合同的证明，并在十五日内为乙方办理档案和社会保险关系转移手续。乙方应当在劳动合同解除或终止时，办理工作交接。甲方依照有关规定向乙方支付经济补偿的，在办结工作交接时支付。
                  </p>
                  <p class="p">8.10&#160;&#160;有下列情形之一的，劳动合同终止：
                  </p>
                  <p class="p"><span>(1)&#160;劳动合同期满的；</span>
                  </p>
                  <p class="p"><span>(2)&#160;乙方开始依法享受基本养老保险待遇的；</span>
                  </p>
                  <p class="p"><span>(3)&#160;乙方死亡，或者被人民法院宣告死亡或者宣告失踪的；</span>
                  </p>
                  <p class="p"><span>(4)&#160;甲方被依法宣告破产的；</span>
                  </p>
                  <p class="p"><span>(5)&#160;甲方被吊销营业执照、责令关闭、撤销或者甲方决定提前解散的；</span>
                  </p>
                  <p class="p"><span>(6)&#160;法律、行政法规规定的其他情形。</span>
                  </p>
                  <h3>第九条经济补偿和赔偿金
                  </h3>
                  <p class="p">9.1&#160;&#160;甲方根据本合同8.3条款第(6)至第(13)项的约定解除或者终止劳动合同的，应当向乙方支付经济补偿。
                  </p>
                  <p class="p">9.2&#160;&#160;乙方向甲方提出解除劳动合同，有下列情形之一的，甲方应当向乙方支付经济补偿。
                  </p>
                  <p class="p"><span>(1)&#160;甲方未依法或者依照约定提供劳动保护或者劳动条件的;</span>
                  </p>
                  <p class="p"><span>(2)&#160;甲方未依法或者依照约定支付劳动报酬、加班费的；</span>
                  </p>
                  <p class="p"><span>(3)&#160;甲方未依法为乙方缴纳社会保险费的;</span>
                  </p>
                  <p class="p"><span>(4)&#160;甲方的规章制度违反法律、法规的规定，损害乙方权益的;</span>
                  </p>
                  <p class="p"><span>(5)&#160;甲方以暴力、威胁或者非法限制人身自由的手段强迫劳动的;</span>
                  </p>
                  <p class="p"><span>(6)&#160;甲方违章指挥、强令冒险作业危及乙方人身安全的；</span>
                  </p>
                  <p class="p"><span>(7)&#160;甲方劳动条件恶劣、环境污染严重，给乙方身心健康造成严重害的;</span>
                  </p>
                  <p class="p" ><span>(8)&#160;甲方侮辱、体罚、殴打、非法搜查或者拘禁乙方的；</span>
                  </p>
                  <p class="p"><span>(9)&#160;法律、行政法规规定的其他情形。</span>
                  </p>
                  <p class="p">9.3&#160;&#160;根据本合同8.10条款第(4)至第(6)项约定的情形劳动合同终止，甲方应当向乙方支付经济补偿。根据本合同8.10条款第(1)项约定的情形劳动合同终止，除甲方维持或者提高劳动合同约定条件续订劳动合同，乙方不同意续订的情形外，甲方应当向乙方支付经济补偿。

                  </p>
                  <p class="p">9.4&#160;&#160;经济补偿按乙方在甲方工作的年限，每满一年支付一个月工资的标准支付。六个月以上不满一年的，按一年计算；不满六个月的，向乙方支付半个月工资的经济补偿。

                  </p>
                  <p class="p">9.5&#160;&#160;甲方违反国家有关规定或者劳动合同约定，解除或者终止劳动合同，除乙方要求继续履行劳动合同或者劳动合同能够继续履行的情形之外，应当依照本合同9.4条款约定的经济补偿标准的二倍向乙方支付赔偿金。甲方依照本条款支付了赔偿金，不再支付经济补偿金。

                  </p>
                  <p class="p">9.6&#160;&#160;乙方违反国家有关规定或者劳动合同的约定，解除或终止劳动合同给甲方造成损失的，乙方应当承担赔偿责任。
                  </p>
                  <h3><span>第十条争议处理</span></h3>
                  <p class="p">10.1&#160;&#160;因履行劳动合同发生劳动争议，甲乙双方可以向工会组织、甲方的劳动争议调解委员会、依法设立的基层人民调解组织或者在乡镇、街道设立的具有劳动争议调解职能的组织申请调解协商解决。协商不成的，甲乙双方任何一方均可以直接向劳动争议仲裁委员会申请仲裁。
                  </p>
                  <h3 >第十一条其他
                  </h3>
                  <p class="p">11.1&#160;&#160;经双方签字或盖章之日起生效。
                  </p>
                  <p class="p">11.2&#160;&#160;本合同的附件与本合同具有同等法律效力，是本合同不可分割的一部分，对甲乙双方都具有约束力。
                  </p>

                  <div class="partyA">
                    <p>甲方（盖章）：</p>
                    <div class="seal">
                      <p>{{message_title}}</p>
                      <div class="sealBox">

                      </div>
                    </div>

                  </div>
                  <div class="partyB">
                    <p>乙方（签字）：</p>
                    <div class="sign">
                      <p>{{agreementName}}</p>
                      <div class="signBox">

                      </div>
                    </div>

                  </div>
                  </div>-->
                <div class="imgBox" >
                  <div v-for="item in imgs" class="text-center">
                    <img :src="item" alt="合同图片">
                  </div>
                </div>

                <!--发起签约-->
                <div class="signButtonBox">
                  <input type="button" class="signButton" value="发起签约" @click="sendContract">
                </div>
              </div>
            </div>
            <!--</vue-scroll>-->
            <!--<vue-scroll :ops="ops">-->
            <!--<div class="contractImg">
              <p class="contractTitle">
                文档
              </p>
              <div class="contractMain">

                <p>劳动用工合同</p>
                <span>页数：<em>{{pdfImageLength}}</em>页</span>
                <div class="imgBoxs">
                  <div class="singleImg"   v-for="(item,index) in pdfImage" :key="index">
                    <img :src=" item" alt="">
                    <span>{{index+1}}</span>
                  </div>
                </div>
              </div>
            </div>
            </vue-scroll>-->
          </div>

          <!--主体内容-->
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import http from '@/http/http'
  import api from '@/api/api.js'
  import {headers} from '@/assets/js/common/lp.js'


    export default {
      name: "contractDetail",
      components: {
      },
      data(){
         return{
           message_title:'',//公司名
           // agreementName:JSON.parse(localStorage.getItem("contract")).hrEmployeeAlias,//乙方
            arr:[],
           // itemData:JSON.parse(localStorage.getItem("item")),//取出选中模板的的数据集
           // pdfImage:(JSON.parse(localStorage.getItem("item")).pdfImage).split(","),
           // pdfImageLength:(JSON.parse(localStorage.getItem("item")).pdfImage).split(",").length,//合同pdfImg页数
           // ops: {//vuescroll 美化滚动条
           //   vuescroll: {
           //
           //   },
           //   scrollPanel: {
           //
           //   }
           //   // ...
           // },
           contractAlert:false,
           data:[],
           imgs:[],
           employeeName:'',
           enterpriseName:'',

         }
      },
      methods:{
        //点击返回到上一步
        goToSelectTemplates(){
          let that=this;
          // that.$router.push("/selectTemplates")
          // that.$router.push("/customContractTemplate")
          that.$router.push("/standardContract")
        },
       /* company_detail(){
          let that=this;
          that.$http({
            method:"get",
            url:api.detail,
            headers:headers("application/json;charset=utf-8"),
            cache:false
          }).then(function(res){
            if(res.data.code==10000 && res.data!=""){
              console.log(res);
              that.message_title=res.data.data.enterpriseName;
            }
          });
        },*/
        //获取展示的图片
        getImage(){
          let that=this;
          that.$http({
            method:"post",
            url:api.showContractImg+that.$route.params.id,
            headers:headers()
          }).then(function(res){
            if(res.data.code==10000){
              that.data=res.data.data;
              that.imgs=res.data.data.contractImage;
              that.employeeName=res.data.data.employeeName;
              that.enterpriseName=res.data.data.enterpriseName;
              // that.$message.success("合同发送成功");
            }else{
              that.$message.error(res.message || res.data.msg);
            }
          })
        },
        //发起签署
        sendContract(){
          let that=this;
          that.$http({
            method:"post",
            url:api.signContract+that.$route.params.id,
            headers:headers()
          }).then(function(res){
            if(res.data.code==10000){
              that.data=res.data.data;
              that.contractAlert=true;

              // that.$message.success("合同发送成功");
            }else{
              that.$message.error(res.message || res.data.msg);
            }
          })
        },
        goToContractManagement(){
          let that=this;
          that.$router.push("/contractManagement");

        },
        goTobySing(){
          let that=this;
          that.$router.push("/newContract")
        }
      },
      mounted(){
        // console.log(this.pdfImage,typeof (this.pdfImage))
        let that=this;
        // that.company_detail();
        that.getImage();
      }
    }
</script>

<style scoped>
  .main .right-content{
    padding: 80px 0 0;
    box-shadow: none;
  }
  nav{
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #FFFFFF;
    background: #394A66;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.08);
    cursor: pointer;
    width: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    padding: 0;
  }
  nav img{
    cursor: pointer;
    margin: 0 2px 0 33px;
    vertical-align: middle;
  }
  .main .right-content{
    width: 100%;
    position: fixed;
  }
  .text-center{
    text-align: center;
  }
  .contractAlertContent .text-center img{
    margin: -15px 0 0;
  }
  .contractAlertContent .text-center p{
    font-size: 20px;
    color: #394A66;
    letter-spacing: 0;
    margin: 15px 0 47px;
  }
  .imgBox{
    background: #e5e5e5;
  }
</style>
