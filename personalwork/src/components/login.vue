<template>
    <div class="login">
        <div class="login-box">
            <div class="login-wrap">
                <h3>登录</h3>
                <p v-show="showTishi">{{tishi}}</p>
                <input type="text" placeholder="请输入用户名" v-model="username" @keyup.enter="login">
                <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
                <button v-on:click="login" class="loginbutton">登录</button>
                <span @click="register2">没有账号？马上注册</span>
                <i class=" icon iconfont icon-guanbi2fill" @click="closeLogin"></i>
            </div>
        </div>
    </div>
</template>
<script>
    // import register from './register/register';
    import { setCookie,getCookie} from '../assets/js/cookie.js';
    import axios from 'axios';
    export default{
        
        data () {
            return{
                showTishi: false,
                tishi:'',
                username: '',
                password:'',
                newPassword:'',
                newUsername:'',
                myShow: false
            }
        },
        computed: {
            isLogin () {
              if(this.isLog == true){
                return true
              } else {
                return false
              }
            }
        },
        mounted () {
            /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
            if (getCookie ('username')) {
                // this.$router.push('/');
                console.log("getCookie")
            }
        
        },
        // conponents: {
        //     register
        // },
        methods:{
            closeLogin(){
                console.log("click");
                this.$parent.ifLogin = false;
                this.$parent.ifRegister = false;
            },
            register2 () {
                console.log(1222)
                this.$parent.ifLogin = false;
                this.$parent.ifRegister = true;
            },
            login(){
                let password1 = /^[a-zA-Z]\w{5,17}$/;
                let pass01 = password1.test(this.newPassword);
                console.log(pass01,434)
                if (this.username == "" || this.password == "")
                {
                    alert("请输入用户名或密码");
                } else {
                    let data = {'username':this.username,'password':this.password}
                    /*接口请求*/
                    axios.post('//192.168.92.207:2727/log',data).then (res => {
                        /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
                        if(res.data.code == 301){
                            this.tishi = "该用户不存在";
                            this.showTishi = true;
                            console.log(33)
                        } else if (res.data.code == 302) {
                            this.tishi = "密码输入错误";
                            this.showTishi = true;
                            console.log(3344);
                        } else {
                            this.tishi = "登录成功";
                            this.showTishi = true;
                            setCookie ('username',this.username,500);
                            // this.$parent.username = this.username;
                            this.$parent.ifLogin = false;
                            loginGolb.$emit('isLogFn',this.username)
                            console.log("username",this.username);
                            this.username = "";
                            this.password = "";
                            this.tishi ="";

                        }
                    }, response => {
                        console.log(2);
                    })
                    
                }
            }
        }
    }
</script>
<style lang="less">
    h3{
        font-size: 22px;
        color: #0070f6;
        line-height: 30px;
        font-weight: 600;
        margin-bottom: 15px;
    }
    .login{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,.6);
        z-index:2;
        .login-box{
            width: 400px;
            margin: 0 auto;
            margin-top: 200px;
            
            .login-wrap{
                text-align: center;
                background: #fff;
                border-radius: 5px;
                padding: 30px;
                position: relative; 
                .icon-guanbi2fill{
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 24px;
                    cursor: pointer;
                    color: #2687fb;
                } 
                .icon-guanbi2fill:hover {
                    color: #0070f6;
                } 
                .loginbutton:hover{
                    background: #0070f6;
                }
            }
            input{
                    display: block;
                    width: 250px;
                    height: 40px;
                    line-height: 40px;
                    margin: 0 auto;
                    margin-bottom: 10px;
                    outline: none;
                    border: 1px solid #888;
                    padding:10px;
                    box-sizing: border-box;
                }
                button{
                    display: block;
                    width: 250px;
                    height: 40px;
                    line-height: 40px;
                    margin: 0 auto;
                    border: none;
                    background: #2687fb;
                    color: #fff;
                    font-size: 16px;
                    margin-bottom: 5px;
                    cursor: pointer;
                }
                span{
                    cursor: pointer;
                }
                span:hover{
                    color: #2687fb;
                }

        }
    }
</style>