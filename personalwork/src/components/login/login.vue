<template>
  <div>
    <div class="mask" v-show="isShow" :class="{'on':show}"></div>
    <div class="left_login" @click="left_login">登录</div>
    
    <div class="quit" @click="quit">退出</div>
    <div class="login-wrap" v-show="showLogin">
      <div class="close" @click="close">
        <i class="icon iconfont icon-guanbi2fill"></i>
      </div>
      <h3 class="login_title">登录</h3>
     
      <p class="alert" v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="请输入用户名" v-model="username">
      <input type="password" placeholder="请输入密码" v-model="password">
      <button @click="login">登录</button>
      <span class="fu" @click="ToRegister">没有账号？马上注册</span>
    </div>
    <div class="register-wrap" v-show="showRegister">
      <div class="close" @click="close">
        <i class="icon iconfont icon-guanbi2fill"></i>
      </div>
      <h3 class="login_title">注册</h3>
      <p  class="alert" v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="请输入用户名" v-model="newUsername">
      <input type="password" placeholder="请输入密码" v-model="newPassword">
      <input type="password" placeholder="请再次输入密码" v-model="newPassword2">
      <button @click="register">注册</button>
      <span class="fu" @click="ToLogin">已有账号？马上登录</span>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js';
  export default {
    props:{
      show: {
        type: Boolean,

      }
    },
    data () {
      return {
        showLogin: false,
        showRegister: false,
        showTishi: false,
        isShow: false,
        tishi: '',
        username:'',
        password:'',
        newUsername:'',
        newPassword:'',
        newPassword2:'',
        name:'',
        content:[]
      }
    },
    methods: {
      left_login () {
        this.showLogin = true;
        this.isShow = true;
        this.showTishi = false;
      },
      close () {
        this.showLogin = false;
        this.isShow = false;
        this.showRegister = false;
      },
      login () {
        if(this.username == "" || this.password == ""){
            alert("请输入用户名或密码");
        }else {
          let data = {'username':this.username,'password':this.password}
          /*接口请求*/
          axios.get('//192.168.92.14:2727/log',data).then((res) =>{
            console.log(res,555);
            if(res.data == -1){
              this.tishi = "该用户不存在";
              this.showTishi = true;
              console.log("该用户不存在")
              }else if(res.data == 0){
                this.tishi = "密码输入错误";
                console.log("密码输入错误");
                this.showTishi = true;
              }else {
                this.tishi = "登录成功";
                this.username = '';
                this.password = '';
                this.showTishi = true;
                setCookie('username',this.username,1000*60);
                setTimeout(function(){
                  // this.$router.push('/home');
                }.bind(this),1000);
                this.showLogin =false;
                this.isShow = false;
              }
          }).catch ((error) =>{
            console.log(error);
          })
        }
      },
      quit () {
        console.log("clear")
        /*删除cookie*/
        delCookie('username');
        document.querySelector('.quit').style.backgroundColor = 'red';

      },
      left_register () {
        this.showLogin = false;
        this.showRegister = true;
        this.isShow = true;
        this.showTishi = false;
      },
      ToRegister () {
        this.showRegister = true;
        this.showLogin = false;
        this.showTishi = false;
      },
      register () {
        let self = this;
        this.showTishi = false;
        let password1 = /^[a-zA-Z]\w{5,17}$/;
        let pass01 = password1.test(this.newPassword);
        let pass02 = password1.test(this.newPassword2);
        console.log(pass01,pass02,"pass011")
        if (this.newUsername == "") {
          alert("请输入用户名");
        }else if(this.newPassword == "" || this.newPassword2 ==""){
           alert("请输入密码");
        }else if(!pass01 || (this.newPassword != this.newPassword2)){
          alert("请输入以字母开头，长度在6~18之间，只能包含字符、数字和下划线");
        }else if(this.newUsername != "" && (this.newPassword == this.newPassword2)){
          let data1 = {'username':this.newUsername,'password':this.newPassword}
          axios.post('//192.168.92.14:2727/reg',data1).then((res) => {
            console.log(res,1222);
            if(res.data.code == 200){
              let json = res.config.data;
              console.log(json,"json");
              
               // let map = new Map();
              
              // let con = Object.assign(json);
              // console.log(con,"con");
              // let map = new Map();
              // map.set(json);
              // console.log(map);
              // res.data.data.push(res.config.data);
              this.tishi = "注册成功";
              this.showTishi = true;
              this.username = '';
              this.password = '';
               /*注册成功之后再跳回登录页*/
              setTimeout(function(){
                this.showRegister = false;
                this.showLogin = true;
                this.showTishi = false;
              }.bind(this),1000)
            }
          }).catch ((error) => {
            console.log(error);
          })
        }
      },
      ToLogin () {
        this.showRegister = false;
        this.showLogin = true;
        this.showTishi = false;
      }
    },
    mounted () {
      /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
      if(getCookie('username')){
        // this.$router.push('/home');
      }
      /*页面挂载获取保存的cookie值，渲染到页面上*/
      let uname = getCookie('username');
      this.name = uname;
      /*如果cookie不存在，则跳转到登录页*/
      if(uname == ""){
        // this.$router.push('/home');
      }
    }
  }
</script>
<style scoped lang="less">
  .left_login{
    background: #2086ea;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
    height: 20px;
    padding: 5px;
    width: 40px;
    text-align: center;
    border-radius: 20px;
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
  }
  .left_register {
    float: right;
    margin-right: 10px;
    background: red;
    color: #fff;
    font-size: 16px;
    line-height: 20px;
    height: 20px;
    padding: 5px;
    width: 40px;
    text-align: center;
    border-radius: 20px;
  }
  .left_register:hover,.left_login:hover{
    cursor: pointer;
  }
  .quit {
    margin-top: 10px;
    background: #2086ea;
    color: #fff;
    font-size: 14px;
    line-height: 18px;
    height: 18px;
    padding: 3px;
    width: 40px;
    text-align: center;
    border-radius: 20px;
  }
  .login-wrap {
    text-align: center;
    position: fixed;
    width: 350px;
    border: 2px  dashed #ccc;
    padding-bottom: 10px;
    height: 240px;
    background: #fff;
    margin-top: 15%;
    margin-left: 43%;
  }
  .register-wrap {
    text-align: center;
    position: fixed;
    width: 350px;
    border: 2px  dashed #ccc;
    padding-bottom: 10px;
    height: 280px;
    background: #fff;
    margin-top: 15%;
    margin-left: 43%;
  }
  .login_title {
    padding-top: 10px;
    color: blue;
    padding-bottom: 10px;
    font-size: 18px;
    margin-left: 14px;
  }
  .close {
    float: right;
  }
  .close:hover {
    cursor: pointer;
  }
  .icon-guanbi2fill {
    color: rgba(87,117,250,.8);
    font-size: 23px;
  }
  input {
    display: block;
    width: 250px;
    height: 20px;
    line-height: 20px;
    margin: 0 auto;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid #888;
    padding: 10px;
    box-size: border-box;
  }
  .alert {
    color: red;
  }
  button {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    border: none;
    background-color: rgba(87,117,250,.8);
    border-radius: 20px;
    font-size: 16px;
    margin-bottom: 5px;
    color: #fff;
  }
  .fu {
    cursor: pointer;
  }
  .fu:hover {
    color: #41b883;
  }
</style>