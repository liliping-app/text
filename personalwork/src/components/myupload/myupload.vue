<template>
  <div class="myupload">
  <transition name="turn">
    <h1 class="uploadTitle">欢迎上传你的作品</h1>
  </transition>
    <div class="load">
    <form @submit.prevent="submit($event)" class="refer" enctype="multipart/form-data">
    <!-- <form class="refer"> -->
      <span class="work_name">作品名称：</span><input type="text" class="userName" v-model="inputtext.user" placeholder="请输入你的作品名">
      <br/>
      <span class="work_adds">作品地址：</span><input type="text" class="userName"  v-model="inputtext.adds" placeholder="请输入你的作品地址">
       <br/>
      <span class="work_adds">上传图片：</span>
      <input id="fileinput" @change="uploading($event)" type="file" accept="image/*">
<!--      <button  @click="submit($event)"></button> -->
      <!--图片展示-->
      <div class="img">
        <img :src="src"/>
      </div>
      <br/>
      
      <br/>
      <span class="work_works">上传文件：</span>
      <div class="upload2">
        <div class="upload_warp">
          <div class="upload_warp_left" @click="fileClick">
            <img src="./upload.png" alt="">
          </div>
           <div class="upload_warp_right" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">  
            或者将文件拖到此处  
          </div>
        </div>
        <div class="upload_warp_text">
        选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}
        </div>
        <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/> 
        <div class="upload_warp_img" v-show="imgList.length!=0">
          <div class="upload_warp_img_div" v-for="(item,index) of imgList">
            <div class="upload_warp_img_div_top">
              <div class="upload_warp_img_div_text">
                {{item.file.name}}
              </div>
              <img src="./del.png" class="upload_warp_img_div_del" @click="fileDel(index)">
            </div>
            <img :src="item.file.src">
          </div>
        </div>
      </div>
      <br>
      <br>
        <textarea placeholder="请对你的作品进行描述...." id="" cols="48" rows="10" class="indues" v-model="inputtext.area"></textarea>  
        <button type="submit" class="submit_txt" value="提交">提交</button>     
    </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
Vue.prototype.$http = axios;
import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js';
  export default {
    data () {
      return {
        inputtext: {
          user:'',
          adds:'',
          area:''
        },
        imgList: [],
        size: 0,
        src:'',
        fileimg:'',
        file:''
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
      uploading(event){
        this.fileimg = event.target.files[0];//获取文件
console.log(this.file,"fileimg")
        var windowURL = window.URL || window.webkitURL;
        this.fileimg = event.target.files[0];
        //创建图片文件的url
        this.src = windowURL.createObjectURL(event.target.files[0]);
        console.log(this.src,"src");
      },
      fileClick () {
        document.getElementById('upload_file').click();
        console.log('upload_file')
      },
      fileChange(el){     //3
        if (!el.target.files[0].size) return;//判断是否有文件数量  
        this.fileList(el.target);//获取files文件组传入处理  
        el.target.value = ''//清空val值，以便可以重复添加一张图片
        console.log(el,98);
        console.log(el.target.value,8888)  
      }, 
      fileList(fileList){    //1.
        let files = fileList.files;
        console.log(files,6532);
        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != '') {
            this.fileAdd(files[i]);
            console.log('fileAdd',this.fileAdd,'Add',files[i]);
          } else {
            //文件夹处理
            this.folders(fileList.items[i]);
            console.log('folders','this.folders','文件夹处理',fileList.items[i])
          }
        }  
      },
      //文件夹处理
      folders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
          console.log(files,"files","判断是否为原生file")
        }
        files.createReader().readEntries(function (file) {
          console.log('createdReader','文件',file)
          for (let i = 0; i < file.length; i++) {
            console.log('file[i]',file[i])
            if (file[i].isFile) {
              _this.foldersAdd(file[i]);
              console.log('foldersAdd');
            } else {
              _this.folders(file[i]);
              console.log('file_folders')
            }
          }
        })
      },
      foldersAdd(entry) {
        let _this = this;
        entry.file(function (file) {
          console.log(file,"file_foldersAdd")
          _this.fileAdd(file);
        })
      },
      fileAdd(file){  
        if (this.limit !== undefined) this.limit--;
        if (this.limit !== undefined && this.limit < 0) return;
        this.size = this.size + file.size;//总大小  
        //判断是否为图片文件
        if (file.type.indexOf('image') == -1) {
          file.src = 'https://img.alicdn.com/tfs/TB14mWweb_I8KJjy1XaXXbsxpXa-64-64.png';
          this.imgList.push({
            file
          });
          console.log(this.imgList,"this.imgList_true")
        } else {
          let reader = new FileReader();
          reader.vue = this;
          reader.readAsDataURL(file);
          console.log('vue');     //2
          reader.onload = function () {
            file.src = this.result;
            this.vue.imgList.push({
              file
            });
            console.log(this.imgList,"this.imgList_false")
            console.log(this.vue.imgList,11111888888888)
          }
        }
      },
      fileDel(index) {
        this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgList.splice(index, 1);
        console.log(this.imgList,'imgList')
        if (this.limit !== undefined) this.limit = this.imgList.length;
      },
      bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1000, // or 1024
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
         i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      dragenter(el){  
        el.stopPropagation();  
        el.preventDefault();  
      },  
      dragover(el){  
        el.stopPropagation();  
        el.preventDefault();  
      },  
      drop(el){  
        el.stopPropagation();  
        el.preventDefault();  
         this.fileList(el.dataTransfer);  
      },
      submit (event) {
        event.preventDefault();//取消默认行为
        // let formData = new FormData();
        console.log(this.inputtext);
        let imgUrl = document.getElementById('fileinput').value;
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
        if(this.src == ''){
          alert ('请上传你的图片');
        }
        this.getNowFormatDate();
        let formData = new FormData();
        console.log(formData,"formData22")
        formData.append('user', this.inputtext.user);
        formData.append('adds', this.inputtext.adds);
        formData.append('area', this.inputtext.area);
        formData.append('file', this.fileimg);
        formData.append('fileBox', this.imgList);
        // formData.append('src', this.src);
         console.log(formData);
        console.log(formData,'sdfsdf');
        let oldName = getCookie('username');
        console.log(oldName,'oldName',this.file)
        let data = {
          'user':this.inputtext.user,'adds':this.inputtext.adds,'area':this.inputtext.area,'src':this.fileimg,'fileBox':this.imgList
        }
        if(!oldName){
          this.$parent.ifLogin = true;
          // this.$parent.ifRegister = false;
        }else {
          this.$http.post('//192.168.92.207:2727/upload',formData).then(res => {
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
    padding-bottom: 180px;
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
      width: 500px;
      height: 400px;
      background: #fff;
      text-align: center;
      margin: 0 auto;
      margin-top: 10px;
      margin-left: 130px;
      position: relative;
      overflow: hidden;
        img{
          width: auto;
          height: auto;
          position: absolute;
          border: none;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
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
</style>