<!-- 
    Author:周双
    日期：2018/11/27
-->
<template>
    <div class="process-box" ref='processBox'>
        <p>员工历程</p>
        <a href="javascript:void(0);" class="circle-orange btn-prev" :class="{active:prevActive}" @click="transMove('prev')"></a>

        <div class="process-list" :style="{width:processListWidth}" ref="proList" style="transform:translateX(0px)">
            <div class="process-item" v-for="(item, index) in process" :key='index' ref='proitem' :style="{width:processItemW}">
                <p class="txt-time">{{item.createTime}}</p>
                <p class="line-step"><i class="circle-icon"></i></p> 
                <div class="process-info">
                    <h5>{{item.courseTitle}}</h5>
                    <p v-html="item.processRecord"></p>
                </div>                
            </div>
        </div>
        <a href="javascript:void(0);" class="circle-orange btn-next" :class="{active:nextActive}" @click="transMove('next')"> </a>
    </div>
</template>
<script>
  export default {
        name: 'processb-box',
        props:['process'],
        data() {
            return {
                DEBUG:true,
                infoH:'',
                processDataLen:0,
                processListWidth:'100%',
                processItemW:'',
                itemWidth:'',
                transPx: '0',
                transpage:0,
                prevActive:false,
                nextActive:false,     
            };
        },
        created(){
        },
        methods: {
            getTransWidth(processData){

                this.processDataLen = processData.length;
                if(this.processDataLen > 3){
                    this.nextActive = true;
                }
                let processBoxW = this.$refs.processBox.offsetWidth;
                if(this.processDataLen > 3){
                    this.itemWidth = Math.floor(processBoxW/3 - 8)
                    this.processItemW = this.itemWidth  + 'px';
                    this.processListWidth = (this.processDataLen * (this.itemWidth + 20)) + 'px';
                }

            },
            transMove(param){
                let processListBox = this.$refs.proList;
               
                if(param == 'prev'){
                    if(this.transpage < 1){
                        this.prevActive = false;
                        processListBox.style.transform = `translateX(0px)`;
                        processListBox.style.transitionDuration = '300ms'; 
                    }else{
                        if(!(this.transpage >= this.processDataLen-2)){
                            this.nextActive = true;
                        }
                        this.transpage--; 
                        this.transAction(this.itemWidth,processListBox);                       
                    }
                }
                if(param == 'next'){
                    if(!(this.transpage >= this.processDataLen-3)){

                        this.nextActive = true;
                        if(this.transpage > -1){
                            this.prevActive = true;
                        }

                        this.transpage++;
                        this.transAction(this.itemWidth,processListBox);  
                                                 
                    }else{
                        this.nextActive = false;
                    }
                } 
            },
            transAction(itemWidth,contentBox){
                let transTotalW = -(this.transpage * itemWidth);
                contentBox.style.transform = `translateX(${transTotalW}px)`;
                contentBox.style.transitionDuration = '300ms';                 
            }
        },
        mounted(){
        
        }
    }
</script>  

<style scoped>
    .process-box{
        width: 100%;
        overflow: hidden;
        padding-top: 20px;
        border-top: 1px solid #E5E5E5;
        position: relative;
    }
    .process-box>p{
        font-size: 16px;
        color: #394A66;
        padding-bottom: 20px;
        padding-left: 20px;
    }
    .process-box>ul>li{
        position:relative;
        padding-bottom:20px;
    }

    .process-info{
        display: inline-block;
        width: 100%;
        padding: 20px 55px 30px;
        text-align: center;
    }
    .process-info h5{
        font-size: 16px;
        color: #394A66;
        padding-bottom: 10px;
    }
    .process-info p{
        font-size: 14px;
        color: #97A2B3;
        text-align: left;
        line-height: 30px;
    }
    .txt-time{
        display: block;
        font-size: 12px;
        color: #F95714;
        text-align: center;
        width: 150px;
        height: 22px;
        line-height: 21px;
        margin: 20px auto;
        border: 1px solid #F95714;
        border-radius: 12px;
    }    

    .process-list{
        font-size: 0;
        padding-left: 30px;
        padding-right: 40px;
        position: relative;
    }
    .process-list .process-item{
        width: 33.33%;
        display: inline-block;
        vertical-align: top;
    }

    .line-step{
        text-align: center;
        position: relative;
    }
    .line-step:before{
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background: #E5E5E5;
        position: absolute;
        top: 7px;
    }
    .circle-orange{
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #E5E5E5;
        border-radius: 50%;  
        position: absolute;
        top: 110px;
        vertical-align: top;
        z-index: 3;
    }
    .circle-orange.active{
        background: #F95714;
    }
    .btn-prev{
        left: 0px;
    }
    .btn-prev:before{
        content: '';
        display: inline-block;
        width: 10px;
        height: 10px;
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        transform: rotate(45deg);
        position: absolute;
        top: 9px;
        left: 12px;
        z-index: 10;
    }
    .btn-next{
        right: 0;
    }
    .btn-next:before{
        content: '';
        display: inline-block;
        width: 10px;
        height: 10px;
        border-right: 1px solid #fff;
        border-bottom: 1px solid #fff;
        transform: rotate(-45deg);
        position: absolute;
        top: 9px;
        left: 7px;
        z-index: 10;
    }
    .circle-icon{
        box-sizing: content-box;
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #F95714;
        border:3px solid rgb(250, 209, 192);
        border-radius: 50%;
        vertical-align: top;
        position: relative;
    }
</style>


