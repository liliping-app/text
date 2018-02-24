<template>
  <div class="header">
    <div class="left_register" @click="left_register">注册</div>
    <div class="left_login" @click="left_login">登录</div>
    <div class="welcomes">
      <h3 class="h3">{{username}}</h3>
      <div class="quitBox">
        <i class="quit" @click="quit">退出</i>
        <span></span>
      </div>
    </div>
    <div class="header-logo">
      <img src="../../static/logo.png" class="logo" alt=""/>
    </div>
    <div class="nav">
    <router-link to="/home" class="works">作 品</router-link>
    <router-link to="/upload" class="upload">上 传</router-link>
    </div>
    
  </div>
</template>
<script>
import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js';

  export default {
    props: {
      username: String
    },
    data () {
      return {
        
      }
    },
    // computed:{
    //   name: function(){
    //     var newName = this.isOut ? this.username : "";
    //     console.log(newName,'newName',this.isOut,this.username)
    //     return newName
    //   }
    // },
    methods: {
      left_register () {
        this.$parent.ifRegister = true;
        this.$parent.ifLogin = false;
      },
      left_login (){
        let oldName = getCookie('username');
        if(!oldName){
          this.$parent.ifLogin = true;
          // this.$parent.ifRegister = false;
        }
      },
      quit() {
        delCookie('username');
        this.$parent.username = '';
        console.log(11111);
      } 
    },
    created () {
      let self = this;
      this.$parent.username = getCookie('username');
      console.log(this.name,"name");
      loginGolb.$on('isLogFn',function(name){
        console.log(434344)
        self.$parent.username = name;
      }.bind(this));
    }
  }
</script>
<style lang="less" scoped>
/*@import '../../common/css/minx.less';*/
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    background: #94a3ac;
    float: left;
    z-index: 2;
  }
   .left_login{
    position: absolute;
    top: 450px;
    left: 65px;
    background: #2086ea;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
    height: 20px;
    padding: 5px;
    width: 60px;
    text-align: center;
    border-radius: 20px;
  }
  .left_login:hover{
    background: #1b54f2;
    box-shadow: 0 2px 3px rgba(0,0,0,.6);
  }
  .left_register:hover{
    background: red;
    box-shadow: 0 2px 3px rgba(0,0,0,.6);
  }
  .left_register {
    position: absolute;
    top: 500px;
    left: 65px;
    margin-right: 10px;
    background: #dc143c;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
    height: 20px;
    padding: 5px;
    width: 60px;
    text-align: center;
    border-radius: 20px;
  }
  .left_register:hover,.left_login:hover{
    cursor: pointer;
  }
  .welcomes{
    width: auto;
    height: 100px;
    h3{
      display: block;
      height: 45px;
      padding-left: 80px;
      /*width: 300px;*/
      overflow: hidden;
      line-height: 50px;
      color: #dc143c;
      font-size: 28px;
      text-align: center;
       background: url('https://img.alicdn.com/tfs/TB1mQ9FdvDH8KJjy1XcXXcpdXXa-116-45.png') no-repeat;
    }
    span{
      color: rgba(255,0,0,0.9);
    }
     /*background: rgba(38,135,251,.47);*/
    .quitBox{
      cursor: pointer;
      .quit{
        display: block;
        margin:0 auto;
        width: 40px;
        height: 40px;
        font-size: 14px;
        border-radius: 50%;
        background: rgba(0,0,0,0.3);
        text-align: center;
        line-height: 40px;
        color: rgba(255,0,0,0.9);
        font-style: normal;
      }
      span{
          font-size: 12px;
        }
      .quit:hover{
        background: rgba(0,0,0,0.5);
      } 
    }
  }
  .header-logo {
    margin: 0 auto;
    margin-top: 100px;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background: #fff;
    text-align: center;
    margin-bottom: 60px;
    .logo {
      width: 64px;
      height: 62px;
      margin-top: 8px;
    }
  }
  .nav {
    width: 100px;
    height: auto;
    margin: 0 auto;
  }
  .home,.works,.upload {
    display: block;
    font-size: 22px;
    color: #2f25ed;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .home:hover, .works:hover,.upload:hover,{
    text-decoration: none;
    color: #ccc;
    border-radius: 30px;
    /*box-shadow: 0 0 40px #fff;*/
    /*text-shadow:-1px 0 #97ccf7,
              0 1px #97ccf7,
              1px 0 #97ccf7,
              0 -1px #97ccf7;*/
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;
    -moz-transition: all 0.5s;
    transition: all 0.5s;
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: initial;
    transition-delay: initial;
    transform: scale(1.3);
  }
</style>