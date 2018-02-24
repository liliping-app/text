<template>
  <div class="myhome">
    <div class="homeMT" v-for="(item,index) in home">
    <router-link :to="{name:'works',params:{id:index}}" target="_black" class="homeLink">
      <div class="home-img">
        <img :src="item.homeImg" class="head-img" alt="">
      </div>
      <h1 class="myTitle"><em>{{item.homeTitle}}</em></h1>
      <div class="present">{{item.homePresent}}</div>
      <p class="time">{{item.homeTime}}</p>
    </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        home: config.all
      }
    }
  }
</script>
<style lang="less" scoped>
  .myhome {
    margin-left: 200px;
    float:left;
    height: auto;
    padding-left: 100px;
    background:#e1e5e6;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .homeMT {
    float: left;
    width: 400px;
    height: 360px;
    background: #fff;
    text-align: center;
    margin-top: 20px;
    margin-right: 30px;
    margin-bottom: 30px;
   
    &:last-child {
      margin-right: 0;
    }
    .homeLink {
      display: block;
      width: 400px;
      height: 360px;
/*      transition: all .3s ease;
      transition-property: all;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-delay:initial;*/
    }
    .homeLink:hover {
      text-decoration: none;
      transition: all .3s ease;
      transform: translateY(-6px);
      -webkit-transform: translateY(-6px);
      -moz-transform: translateY(-6px);
      box-shadow:0 10px 40px 24px rgba(255, 255, 255, .3);
      -webkit-box-shadow:0 10px 40px 24px rgba(255, 255, 255, .3);
      -moz-box-shadow:0 10px 40px 24px rgba(255, 255, 255, .3);
    }
    .home-img {
      display: block;
      width: 400px;
      height: 220px;
      .head-img{
        width: 400px;
        height: 220px;
      }
    }
    .myTitle {
      text-align:center;
      padding: 3px 0;
      font-size: 20px;
      color: #333;
      height: 56px;
      position: relative;
    }
    .myTitle em{
      display: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      position:relative;
      font-style:normal;
      text-align:center;
      overflow:hidden;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical
    }
    .present {
      line-height: 26px;
      height: 50px;
      text-overflow:ellipsis;
      color: #666; 
      font-size: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .time {
      font-size: 15px;
      margin-top: 5px;
      color: #999;
    }
  }
</style>