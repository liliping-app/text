<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
     <!-- <router-view keep-alive></router-view> -->
    <router-view keep-alive></router-view> 
  </div>
</template>

<script>
import {urlParse} from './common/js/util';//引入urlParse.js文件window.loacation.search的操作
import axios from 'axios';
import header from './components/header/header';
const ERR_OK = 0;
export default {
    name: 'app',
    data() {
      return {
        seller: {
          id: (()=> {
            let queryParam = urlParse();
            //获取地址中的查询字符串
            return queryParam.id;
          })()
        }
      }
    },
    mounted () {
      let self = this;
      // let url = 'http://tao-yao-yao.6655.la/qingmoId?id=' + this.seller.id;
      // console.log(url, axios, 54)
      //   axios.get(url).then ((response) => {
      //   console.log(response.data);
      //   response = response.data.body;
      //     console.log(response,43);
      //   if(response.errno === ERR_OK) {
          
      //     this.seller = Object.assign({}, this.seller, response.data);
      //   }
      // })
    },
    components:{
      'v-header':header
    }
};
</script>

<style lang="less" scored>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a{text-decoration: none;}
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  content: '';
  position: relative;
  &:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7, 17, 27, .1);
  }
}
.tab-item {
  flex: 1;
  text-align: center;
  & > a {
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
    &.router-link-active {
      color: rgb(240, 20, 20);
    }
  }
}
  

</style>
