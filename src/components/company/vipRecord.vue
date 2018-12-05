<template>
  <div>
    <p class="headline">
      <a>会员记录</a>
    </p>
    <div class="table-parent">
      <table class="table " >
        <tr>
          <td>类型</td>
          <td>查看/下载限制</td>
          <td>支付方式</td>
          <td>购买日期</td>
          <td>到期日期</td>
          <td>状态</td>
        </tr>
        <tr>
          <td>2000元/每年</td>
          <td>30次/天</td>
          <td>微信支付</td>
          <td>2018-08-08</td>
          <td>2019-08-09</td>
          <td>续费</td>
        </tr>
        <tr>
          <td>1400元/每年</td>
          <td>20次/天</td>
          <td>支付宝支付</td>
          <td>2018-08-08</td>
          <td>2019-08-09</td>
          <td>首次加入联盟</td>
        </tr>

      </table>

      <!--分页样式-->
      <!--<div class="pageContent">
          <span>显示条数</span>
          <select name="total" >
              <option value="2">2</option>
          </select>
          <span class="start-end-page">1-8条/共8条</span>
          <button class="prev-page">上一页</button>
          <button class="next-page">下一页</button>
          <span>前往</span>
          <input type="text" class="go-to-page"/>
          <span>页</span>
      </div>-->
    </div>
  </div>
</template>

<script>

export default {
  name: 'vipRecord',
  data () {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
