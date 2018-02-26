<template>
  <div class="myupload">
  <transition name="turn">
    <h1 class="uploadTitle">欢迎上传你的作品</h1>
  </transition>
    <div class="load">
    <form enctype="multipart/form-data" class="refer">
    <!-- <form class="refer"> -->
      <span class="work_name">作品名称：</span><input type="text" class="userName" v-model="inputtext.user" placeholder="请输入你的作品名">
      <br/>
      <br/>
      <span class="work_adds">作品地址：</span><input type="text" class="userName"  v-model="inputtext.adds" placeholder="请输入你的作品地址">
      <br/>
      <br/>
      <span class="work_adds">上传图片：</span>
      <input id="fileinput" @change="uploading($event)" type="file" accept="image/*">
<!--      <button  @click="submit($event)"></button> -->
      <!--图片展示-->
      <div class="img">
        <img :src="src"/>
      </div>
      <!-- <div class="upload_warp_left" @click="fileClick">
        <img src="./upload.png" alt="">
      </div> -->
      <br/>
      <span class="work_adds">上传图片：</span>
      <el-upload class="upload-demo" :action="uploadurl" :beforeUpload="beforeAvatarUpload">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <br>

      <span class="work_adds">作品描述：</span>
      <br>
        <textarea placeholder="请对你的作品进行描述...." id="" cols="48" rows="5" class="indues" v-model="inputtext.area"></textarea>  
        <button type="submit"  @click="submit($event)" class="submit_txt" value="提交">提交</button>     
    </form>
    </div>
  </div>
</template>
<script>
// import imgInputer from '../imginputer/imginputer';
import axios from 'axios';
import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js';
  export default {
    data () {
      return {
        inputtext: {
          user:'',
          adds:'',
          area:''
        },
        file:'',
        src:'',
        // uploadurl: 'http://192.168.92.207/upload',
        uploadurl:''
      }
    },
    methods: {
      getNowFormatDate() {
          var date = new Date();
          var seperator1 = "-";
          var seperator2 = ":";
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
              month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
          }
          var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                  + " " + date.getHours() + seperator2 + date.getMinutes()
                  + seperator2 + date.getSeconds();
          return currentdate;
      },
      beforeAvatarUpload (file) {
        console.log(file,"file");
        const extension = file.name.split('.')[1] == 'jpg';
        const isLt2M = file.size/1024/1024 <=3;
        if (!extension) {
          this.$message.error('上传文件只能是xlsx格式 ！');
        }
        if (!isLt2M) {
          this.$message.error('上传文件不能超过3M ！');
        }
        return extension && isLt2M;
      },
      uploading(event){
        this.file = event.target.files[0];//获取文件
        var windowURL = window.URL || window.webkitURL;
        this.file = event.target.files[0];
        //创建图片文件的url
        this.src = windowURL.createObjectURL(event.target.files[0]);
      },
      submit (event) {
        event.preventDefault();//取消默认行为
        let formData = new FormData();
        console.log(this.inputtext);
        // 作品名
        if(this.inputtext.user === '') {
          console.log(122);
          alert('请输入你自己的作品名称')
        }else {
          console.log(544,this.inputtext.user);
        }
        // 作品地址
        if(this.inputtext.adds === '') {
          console.log(122);
           alert('请输入你自己的作品的链接')
        }else {
          console.log(544,this.inputtext.adds);
        }
        
        // 作品地址
        if(this.inputtext.area === '') {
          console.log(122);
          alert('请输入你对自己的作品的描述')
        }else {
          console.log(544,this.inputtext.area);
        }
        formData.append('user', this.inputtext.user);
        formData.append('adds', this.inputtext.adds);
        formData.append('adds', this.inputtext.area);
        formData.append('file', this.file);
        formData.append('src', this.src);
        console.log(formData,"formData");
        let oldName = getCookie('username');
        
        this.getNowFormatDate();
        // let data = {
        //   'user':this.inputtext.user,'adds':this.inputtext.adds,'area':this.inputtext.area,'file':this.formdata
        // }
        if(!oldName){
          this.$parent.ifLogin = true;
          // this.$parent.ifRegister = false;
        }else {
          axios.post('//192.168.92.94:2727/upload',formData).then(res => {
              console.log(res,'res');
          }) 
        }
      }
    },
    created () {
      // this.$refs.x.$on('input',value => {this.target = value})
    }
  }
</script>
<style lang="less" scoped>
  .myupload {
    margin-left: 200px;
    float:none;
    height: auto;
    padding-bottom: 320px;
    background: #e1e5e6;
    overflow: hidden;
  }
  .uploadTitle {
    margin: 0 auto;
    text-align: center;
    font-size: 42px;
    font-weight: bold;
    color:#688df4;
    text-shadow: 2px 2px 5px #2086ea;
    padding-top: 60px;
    text-align: center;
    width: 100%;
  }
  .load {
    margin: 0 auto;
    width: 800px;
    margin-bottom: 20px;
    min-height: 100px;
    text-align: center;
    padding: 20px 20px;
    margin-top: 50px;
     /* background: #fff;
      box-shadow: 1px 1px 5px rgba(0,0,0,.1), 0 0 10px rgba(0,0,0,.12); */ 
  }
  .refer {
    width: 100%;
    margin: 0 auto;
    height: auto;
    text-align: left;
    font-size: 20px;
    span{
      margin-right: 30px;
    }
    .work_name,.work_adds {
      display: inline-block;
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: right;
    }
    .userName {
      font-size: 16px;
      color: #323435;
      padding: 7px 5px;
    }
    .fileText {
      font-size: 0;
    }
    .fileText::-webkit-file-upload-button {
        background: #efeeee;
        color: #333;
        border: 0;
        padding: 10px 10px;
        border-radius: 5px;
        font-size: 12px;
        box-shadow: 1px 1px 5px rgba(0,0,0,.1), 0 0 10px rgba(0,0,0,.12);
    }
    .img{
      width: 600px;
      height: 400px;
    }
    .box {
      position: relative;
      .fileText1 {
        position: absolute;
        left: -9999px;
      }
      label {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
      }
    }
    .indues{
      margin-left: 130px;
      border-radius: 5px;
      padding-left: 10px;
      padding-top: 20px;
    }
    .submit_txt {
      display: block;
      border:0 none;
      width: 80px;
      margin-left: 550px;
      margin-top: 20px;
      height: 35px;
      line-height: 35px;
      color: #fff;
      background: #2086ea;
      border-radius: 20px;
      font-size: 18px;
    }
    .submit_txt:hover{
      background: #1b54f2;
      box-shadow: 0 2px 3px rgba(0,0,0,.6);
    }
  }
  .upload_warp {
    margin: 14px;
    height: 120px;
  }

  .upload2 {
    border: 1px solid #ccc;
    background-color: #fff;
    width: 500px;
    // margin: 0 auto;
    margin-left:130px;
    box-shadow: 0px 1px 0px #ccc;
    border-radius: 5px;
    input{
      margin: 0 10px 10px 10px;

    }
  }
  .upload_warp_left {
    float: left;
    width: 40%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
  }
  .upload_warp_left img {
    margin-top: 42px;
  }
  .upload_warp_right {
    float: left;
    width: 57%;
    margin-left: 2%;
    height: 100%;
    border: 1px dashed #999;
    border-radius: 5px;
    line-height: 130px;
    color: #999;
    text-align: center;
  }
  .upload_warp_text {
    text-align: left;
    text-indent: 14px;
    line-height: 40px;
    border-top: 1px solid #ccc;
    font-size: 18px;
    color: #999;
    height: 40px;
  }
  .upload_warp_img {
    border-top: 1px solid #D2D2D2;
    padding: 14px 0 0 14px;
    overflow: hidden
  }
  .upload_warp_img_div {
    position: relative;
    height: 100px;
    width: 120px;
    border: 1px solid #ccc;
    margin: 0px 30px 10px 0px;
    float: left;
    line-height: 100px;
    display: table-cell;
    text-align: center;
    background-color: #eee;
    cursor: pointer;
  }
  .upload_warp_img_div img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }
  .upload_warp_img_div_text {
    white-space: nowrap;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .upload_warp_img_div_top {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.4);
    line-height: 30px;
    text-align: left;
    color: #fff;
    font-size: 12px;
    text-indent: 4px;
  }
  .upload_warp_img_div_del {
    position: absolute;
    top: 6px;
    width: 16px;
    right: 4px;
  } 
  .img{
    width: 600px;
    height: 400px;
  }
</style>