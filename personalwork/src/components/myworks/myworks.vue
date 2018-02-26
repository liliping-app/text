<template>
  <div class="myworks">
    <div class="right-main" ref="toptop">
     <!--  <div class="welcome">
        <h3>Welcome{{name}}</h3>
        <i class="icon iconfont icon-wodezhuxiaoicon quit" @click="quit"></i>
        <span>退出</span>
      </div> -->
      <h1 class="first-title">vue.js实例</h1>
      <div class="share" v-for="(detail,index) in getArray">
        <h2 class="second-title">{{detail.secondTitle}}</h2>
        <div class="title-detail">
          <div class="left">{{detail.time}}</div>
          <div class="right">{{detail.littleTitle}}</div>
        </div>
        <a :href="detail.shareLink" target="_blank" class="share-link">
          <div class="introduce">
            {{detail.introduce}}
          </div>
          <img :src="detail.introduceImg">
        </a>
        <!-- 评论 -->
        <h3 class="discuss" @click="toggleTalk(index)">评论</h3>
        <transition name="flash">
        <div class="zan">
          <p class="getStar" @click="toggleStar(index)">点赞</p>
          <span class="plus">+1</span>
        </div>
        </transition>
        <transition name="mybox">
          <div class="talks" v-if="showtalk[index]">   
            <commemt-content :comment="detail.comment" v-on:change="changCommer"></commemt-content>
            <comment-textarea :type="type" :name="oldComment" v-on:submit="addComment($event,index)"  v-on:canel="canelCommit"></comment-textarea>
          </div>
        </transition>
      </div>
      <!-- 点击加载更多 -->
      <div class="more" @click="more" v-show="localShow">点击加载更多</div>
      <div class="retract" @click="retract" v-show="localRetract">点击收起</div>
      <!-- 回到顶部 -->
      <div class="toTop" :style="stop" @click="goTop">
        <i class="icon iconfont icon-iconicchevronless"></i>
      </div>
    </div>
  </div>
</template>
<script>
import commemt from '../content';
import textarea from '../textarea';
import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js';
  export default {
    data () {
      return {
        name: '',
        configs: config.secondPage[window.location.href.split('works/')[1]],
        commenter: "session", //评论人
        type: 0,                //0为评论作者1为评论别人的评论2为评论别人的别人
        oldComment: null,
        chosedIndex: -1,
        showtalk: [],
        getArray:[],
        stop:{
          display:'none'
        },
        localShow: true,
        localRetract: false
      }
    },
    methods: {
      // 点击回到顶部
      goTop(){
        var topTop = this.$refs.toptop;
        document.body.scrollTop = topTop.offsetTop;
      },
      addComment: function ($event,index) {
        // alert($event,index)
        let self = this;
        if(this.type == 0) {
          this.configs[index].comment.push({
            name: this.name,
            time: self.getTime(),
            content: $event,
            reply: []
          });
        } else if (this.type == 1) {
          this.configs[index].comment[this.chosedIndex].reply.push({
            responder: this.name,
            reviewers:this.configs[index].comment[this.chosedIndex].name,
            time: self.getTime(),
            content: $event
          });
          this.type = 0;
        }
      },
      changCommer: function(name,index) {
        this.oldComment = name;
        this.chosedIndex = index;
        this.type = 1;
        console.log(this.oldComment,98);
        // console.log(this.chosedIndex,90);
      },
      canelCommit: function() {
        this.type = 0;
      },
      toggleTalk: function(index){
        // 判断登录
        let uname = getCookie('username');
        console.log(123,uname);
        if (uname == ""){
          console.log(uname,"uname");
          this.$parent.ifLogin = true; 
        } else {
          // this.ifLogin = false;
          console.log(uname,"uname");
          // 显示和收起评论
          this.$set(this.showtalk, index, !this.showtalk[index]);
          // this.$set(data,'ifLogin',false);
        }
        
      },
      toggleStar (index){
        console.log(index);
        // this.ishowed = true;
      },
      // 点击回到顶部的出现和消失
      showtop(){
        this.scroll = document.body.scrollTop;
        // console.log(this.scroll,"this.scroll");
        if(this.scroll > 200){
          this.stop.display = "block"
        } else {
          this.stop.display = "none"
        }
      },
      getTime() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var day = now.getDate();
        month.length < 2 ?  "0" + month : month;
        day.length < 2 ?  "0" + day : day;
        return year+"-"+month+"-"+day;
      },
      // 注销登录
      quit(){
        /*删除cookie*/
        delCookie('username');
        this.name = '';
        console.log(this.name,"username")
      },
      // 点击加载更多
      more () {
        let self = this;
        self.getArray = config.secondPage[window.location.href.split('works/')[1]].allLun;
        this.localShow = false;
        this.localRetract = true;
      },
      retract () {
        let self = this;
        self.getArray = [];
        for (let i = 0; i < 2;i ++){
          self.getArray.push(config.secondPage[window.location.href.split('works/')[1]].allLun[i]);
          this.localShow = true;
          this.localRetract = false;
        }
      }
    },
    mounted() {
      // 评论的状态变换
      let self = this;
      // this.getArray = config.secondPage[window.location.href.split('works/')[1]].allLun;
      for (let i = 0; i < config.all.length; i++) {
        self.showtalk.push(false);
      }
      // 取消登录
      /*页面挂载获取保存的cookie值，渲染到页面上*/
      let youname = getCookie('username');
      console.log(youname,"youname")
      this.name = youname;
      // 滚动高度
      window.addEventListener('scroll', this.showtop);
      // 默认出来两个
      for (let j = 0; j< 2; j++){
        self.getArray.push(config.secondPage[window.location.href.split('works/')[1]].allLun[j]);
      }
    },
    components: {
    "commemt-content":commemt,
    "comment-textarea":textarea
    }
  }
</script>
<style lang="less">
  .myworks {
    margin-left: 200px;
    float:none;
    height: auto;
    padding-bottom: 20px;
    background: #e1e5e6;
    overflow: hidden;
  }
  .toTop{
    position: fixed;
    left: 50%;
    margin-left: 500px;
    bottom: 30px;
    width: 40px;
    height: 36px;
    background: rgba(0,0,0,0.6);
    box-shadow:0 1px 3px rgba(0,0,0,.2);
    color: #fff;
    text-align: center;
    line-height: 36px;
    border-radius: 2px;
    cursor: pointer;
    .topTop:hover {
      background: rgba(0,0,0,.7);
    }
    .iconfont{
      font-size: 30px;
    }
  }
  .mybox-enter-active{
    animation-name: fold-in;
    animation-duration: .5s;
  }
  .mybox-leave-active{
    animation-name: fold-out;
    animation-duration: .5s;
  }
  @keyframes fold-in {
    0% {
      transform: scaleY(0.1);
    }
    40% {
      transform: scaleY(1.04);
    }
    60% {
      transform: scaleY(0.98);
    }
    80% {
      transform: scaleY(1.04);
    }
    100% {
      transform: scaleY(0.98);
    }
    80% {
      transform: scaleY(1.02);
    }
    100% {
      transform: scaleY(1);
    }
  }
  @keyframes fold-out {
    0% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(0.5);
    }
    100% {
      transform: scaleY(0);
    }
  }
  h1{
    color: #333;
    font-weight: normal;
    font-size: 30px;
    margin: 0 auto;
  }
  h2{
    color: #2687fb;
  }
  a{
    text-decoration: none;
    color: #666;
  }
  a:hover{
    text-decoration: none;
  }
  .first-title {
    text-align: center;
  }
  .share {
    width: 800px;
    margin: 0 auto;
  }
  .second-title{
    color: #2687fb;
    font-size: 22px;
    margin: 50px 0 20px 0;
  }
  .right-main{
    width: 800px;
    margin-left: 200px;
    margin-top: 50px;
    .first-title{
      font-weight: 600;
    }
  }
  .share-link{
    display: block;
    width: 600px;
    height: auto;
    margin-bottom: 20px;
  }
  .share-link:hover{
    box-shadow: 2px 4px 6px #666;
  }
  .title-detail{
    width: auto;
    height: 25px;
    font-size: 14px;
    line-height: 25px;
    color: #3a3030;
    margin: 20px 0;
    .left{
      width: auto;
      float: left;
      margin-right: 15px;
    }
    .right{
      width: auto;
      float: left;
    }
  }
  .introduce{
    width: auto;
    height: auto;
    font-size: 16px;
    line-height: 25px;
    margin-bottom: 10px;
  }
  .introdece-img{
    max-width: 600px;
    max-height: 300px;
    margin: 20px 0;
  }
  .commentBox {
    margin:30px 0;
    b{
      display: block;
      font-size: 16px;
      margin: 10px 0;
    }
  }
  .discuss{
    font-size: 18px;
    display: inline-block;
    margin-bottom: 30px;
    color: #666;
    cursor: pointer;
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #cbd3dc;
    border-radius: 10px;
    text-align: center;
  }
  .zan {
    display: inline-block;
    width: 80px;
    height: 30px;
    margin-left: 100px;
    position: relative;
    /*margin-bottom: -60px;*/
  }
  /*.flash-enter-active {
     transition: all .3s ease;
  }*/
  .flash-leave-active {
    transition: all 1.5s linear;
    transform: translateY(-50px);
  }
  .flash-enter-active {
    transform: translateY(-20px);
    opacity: 0;
  }
 /* .flash-enter, .flash-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }*/
  .getStar {
    position: absolute;
    top: 10px;
    /*display: inline-block;*/
    font-size: 18px;
    /*margin-left: 100px;
    margin-bottom: -30px;*/
    color: #666;
    cursor: pointer;
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #cbd3dc;
    border-radius: 10px;
    text-align: center;
  }
  .discuss:hover,.getStar:hover{
    color: #000;
    background:#94a3ac;
    box-shadow: 2px 2px 3px #666;
  }
  .plus {
    position: absolute;
    top: 10px;
    left: 30px;
    color: yellow;
  }
  .welcome{
    width: auto;
    height: 100px;
    h3{
      display: block;
      color: rgba(255,0,0,0.9);
    }
    span{
      color: rgba(255,0,0,0.9);
    }
    .quit{
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(0,0,0,0.3);
      text-align: center;
      line-height: 30px;
      color: rgba(255,0,0,0.9);
    }
    .quit:hover{
      background: rgba(0,0,0,0.5);
    }
  }
  .more,.retract {
    width: 160px;
    height: 40px;
    line-height: 40px;
    /*background: #2687fb;*/
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    color: #fff;
    font-size: 16px;
  }
  .more:hover,.retract:hover {
    box-shadow: 2px 4px 6px #666;
  }
  .more {
    background: #2687fb;
  }
  .retract {
    background: #f13841;
  }
  .more:hover {
    background: #0070f6;  
  }
  .retract:hover {
     background: #f70611;
  }
</style>