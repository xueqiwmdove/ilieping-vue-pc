<template>
  <!--行业地区弹窗-->
  <div class="industryArea blance_alert" v-show="isShowIndustry">
    <div class="alert_header">
      地区/行业
      <img src="../../assets/img/dismission/ic_close.svg" alt="" class="pull-right" @click="closeAlertFun()">
    </div>
    <div class="alert_body">
      <div class="industryBox">
        <label>行业</label>
        <el-select v-model="industry" placeholder="请选择行业" id="industry">
          <el-option
            v-for="item in industryData"
            :key="item.enumCode"
            :label="item.enumValue"
            :value="item.enumValue">
          </el-option>
        </el-select>
        <em class="triangleBottom"></em>
      </div>
       <div class="areaBox">
           <label >地区</label>
         <el-select v-model="area" filterable placeholder="请选择地区" id="area">
           <el-option
             v-for="item in areaData"
             :label="item"
             :value="item">
           </el-option>
         </el-select>
         <!--<input type="text" placeholder="请选择地区" id="area" onclick="$(this).next().next('.areaPullDown').toggle()">
             <em class="triangleBottom"></em>
              <div class="areaPullDown">
                  <input type="text" class="areaSearch" placeholder="请输入地区首字母或名称检索">
                  <ul>
                      <li ng-repeat="item in cityArr">{{item}}</li>
                  </ul>
              </div>-->
       </div>
      <div class="phone-error-info">
        <img src="../../assets/img/reg/info.svg" alt="提示">
        <span>请选择该离职人员所处的行业与地区</span>
      </div>
    </div>
    <div class="alert_footer">
      <input type="button" value="提交" class="submit" ng-click="alertSubmit()">
    </div>

  </div>
</template>

<script>
  import http from '@/http/http';
  import api from '@/api/api.js';
  import {headers} from "../../assets/js/common/lp";

    export default {
        name: 'industryAlert',
        props:{
          // isShowIndustry:false
        },
        data(){
          return{
            industry:'',
            industryData:[],
            area:'',
            areaData:[
              '全国','北京市','上海市','天津市','重庆市','河北省','山西省','内蒙古','辽宁省','吉林省','黑龙江省','江苏省','浙江省','广西','安徽省',
              '福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','海南省','四川省','贵州省','云南省','西藏','陕西省','甘肃省','青海省',
              '宁夏','新疆','台湾','香港','澳门'
            ],
            isShowIndustry:false,
          }
        },
      methods:{
          //获取下拉行业的数据
        getIndustryData(){
          let that=this;
          that.$http({
            url:api.industry,
            method:'get',
            headers:headers()
          }).then(function (res) {
              console.log(res);
            let result=res.data;
              console.log(result);
            if(result.code==10000){
                that.industryData=result.data.valueList;
                console.log(that.industryData)
            }
          })
        },
        //关闭
        closeAlertFun(){
          let that=this;
          that.isShowIndustry=false;
        }
      },
      computed:{

      },
      mounted(){
          //页面一加载就调用
          let that=this;
        that.getIndustryData()
      }

    }
</script>

<style scoped>

  .el-select .el-input.is-focus .el-input__inner,.el-select .el-input__inner:focus{
    border: 1px solid #E5E5E5!important;
  }
  .industryArea{
    z-index:101;
  }
</style>
