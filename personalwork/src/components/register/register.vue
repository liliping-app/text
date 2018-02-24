<template>
 <div class="register">
  <div class="register-box"  v-show="showRegister">
   <div class="register-wrap">
      <div class="close" @click="close">
        <i class="icon iconfont icon-guanbi2fill"></i>
      </div>
      <h3 class="login_title">注册</h3>
      <p  class="alert" v-show="showTishi">{{tishi}}</p>
      <input type="text" placeholder="请输入用户名" v-model="newUsername" @keyup.enter="register">
      <input type="password" placeholder="请输入密码" v-model="newPassword" @keyup.enter="register">
      <input type="password" placeholder="请再次输入密码" v-model="newPassword2" @keyup.enter="register">
      <button @click="register">注册</button>
      <span class="fu" @click="ToLogin">已有账号？马上登录</span>
    </div>
  </div>  
 </div>
</template>
<script>
import axios from 'axios';
// import login from '../login';
import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js';
  export default {
    data () {
      return {
        showRegister: true,
        showTishi: false,
        isShow: true,
        tishi: '',
        username:'',
        password:'',
        newUsername:'',
        newPassword:'',
        newPassword2:'',
        name:''
      }
    },
    methods: {
      close () {
        // this.$parent.ifLogin = false;
        this.$parent.ifRegister = false;
        // this.showLogin = false;
        // this.isShow = false;
        // this.showRegister = false;
      },
      left_register () {
        this.showRegister = true;
        this.isShow = true;
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
        }else {
          let data1 = {'username':this.newUsername,'password':this.newPassword}
          axios.post('//192.168.92.207:2727/reg',data1).then((res) => {
            console.log(res,1222);
              if(res.data.code == 301){
                alert('账号已存在');
              }else {
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
        this.$parent.ifLogin = true;
        this.$parent.ifRegister = false;
      }
    },
    mounted () {
      let uname = getCookie('username');
      this.name = uname;
    },
    components: {
      // login
    }
  }
</script>
<style scoped lang="less">
.register-box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.6);
    z-index: 2;
  }
  h3{
    margin-top: 10px;
    margin-left: 10px;
    font-size: 22px;
    color: #f70611;
    line-height: 30px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .register-wrap {
    text-align: center;
    width: 400px;
    border-radius: 5px;
    border: 2px  solid #fff;
    padding-bottom: 10px;
    height: 280px;
    background: #fff;
    margin: 0 auto;
    margin-top: 200px;
    position: relative;
  }
  .close {
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .close:hover {
    cursor: pointer;
  }
  .icon-guanbi2fill {
    color: #f13841;
    font-size: 24px;
  }
  .icon-guanbi2fill:hover{
    color: #f70611;
  }
  input {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid #888;
    padding: 10px;
    box-sizing: border-box;
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
    background-color: #f13841;
    /*border-radius: 20px;*/
    font-size: 16px;
    margin-bottom: 5px;
    color: #fff;
    cursor: pointer;
  }
  button:hover{
    background: #f70611;
  }
  .fu {
    cursor: pointer;
    color: #666;
  }
  .fu:hover {
    color: #fb2626;
  }
</style>