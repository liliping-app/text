<template>
  <div id="app">
  
    <!-- 头部header -->
    <v-header :username="username"></v-header>
    <v-login @isLogFn="lisLogFn" v-show="ifLogin"></v-login>
    <v-register v-show="ifRegister"></v-register>
    <router-view keep-alive></router-view>
  </div>
</template>

<script>
import header from './components/header/header';
import login from './components/login.vue';
import register from './components/register/register.vue';

export default {
  name:'app',
  data () {
    return {
      ifLogin: false,
      ifRegister: false,
      username:''
    }
  },
  components: {
    'v-header': header,
    'v-login': login,
    'v-register':register
  },
  methods: {
    lisLogFn (data) {
      console.log(data,888)
      this.username = data;
      console.log(data,5444);
    }
  }
};
var d= new Date();
d.setHours(d.getHours() + (24 * 30)); //保存一个月
document.cookie = "visited=yes; expires=" + d.toGMTString();
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif,'Microsoft YaHei';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>

