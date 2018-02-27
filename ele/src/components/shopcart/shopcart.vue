<template>
<div>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
        <!-- totalCount没有定义 -->
          <div class="logo" :class="{'highlight':totalCount > 0}">
            <i class="icon iconfont icon-31gouwuche icon-shopping_cart" :class="{'highlight':totalCount >0}"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
      <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
      <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls">
      <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
      </div>
    </div>
    <transition name="fold">
    <div class="shopcart-list" v-show="tou">
     <!-- <transition name="fold"> -->
      <div class="list-header fold">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price * food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol  :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition> 
  </div>
   <transition name="fade">
   <!--  <div class="list-mask" @click="hideList" v-show="listShow"></div> -->
    <div class="list-mask" @click="hideList" v-show="shopGo"></div>
  </transition>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
  export default {
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true,
        tou: false,
        shopGo: false
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 1
            }
          ];
        }
      },
      
      deliveryPrice: {
        type: Number,
        default: 4
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    methods: {
      drop(el){
        for (let i = 0; i < this.balls.length; i ++){
          let ball = this.balls[i];
          if(!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      toggleList () {
        // if(!this.totalCount){
        //   return;
        // }
        // this.fold = !this.fold;
        // 自己手写的
        this.tou = true;
        this.shopGo = true;
        console.log("true",6555)
        if(this.tou){
          this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
        } else {
          this.scroll.refresh();
          console.log(54123)
        }

      },
      hideList() {
        // this.fold = false;
        this.shopGo = false;
         this.tou = false;
         console.log('false',9090)
      },
      pay() {
        if(this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      },
      empty () {
        this.shopGo = false;
         this.tou = false;
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      drop(el) {
        for(let i = 0;i< this.balls.length; i++){
          let ball = this.balls[i];
          if(!ball.show){
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) {   //找到所以设为true的小球
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();//返回元素相对于视口偏移的位置
            let x = rect.left - 32;  //点击的按钮与小球（fixed）之间x方向的差值
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';    //设置初始位置前，手动置空，覆盖之前的display：none，使其显示
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;  //外层元素做纵向的动画，y是变量
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];//内层元素做横向动画,inner-hook（用于js选择的样式名加上-hook，表明只是用                                                                      //于js选择的，没有真实的样式含义）
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el) {  
//          let rf = el.offestHeight;
        this.$nextTick(() => {//异步执行
          el.style.webkitTransform = 'translate3d(0,0,0)';    //重置回来
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();  //取到做完动画的球，再置为false，即重置，它还可以接着被利用
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
        console.log(total,54,'total')
      },
      totalCount () {
        let count =0;
        // console.log(this.selectFoods,87)
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if(this.totalPrice === 0){
          return `￥${this.minPrice}元起送`;
        }else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        }else {
          return '去结算';
        }
      },
      payClass () {
        console.log(123,"enough")
        if(this.totalPrice < this.minPrice){
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
      // listShow () {
      //   if (!this.totalCount) {
      //     this.fold = true;
      //     return false;
      //     console.log(433)
      //   }
      //   let show = !this.fold;
      //   if (show) {
      //     this.$nextTick(() => {
      //       if (!this.scroll) {
      //         console.log(this.scroll,6555);
      //         this.scroll = new BScroll(this.$refs.listContent, {
      //           click: true
      //         });
      //       } else {
      //         this.scroll.refresh();
      //         console.log(54123)
      //       }
      //     });
      //   }
      //   return show;
      // }
    },
    created: function() {
      console.log(545454,9999)
      //console.log(this.shopGo,this.$refs.listt)
      //   if(!this.shopGo){
      //     this.scroll = new BScroll(this.$refs.aaa, {
      //     click: true
      //   });

      // }else {
      //     this.scroll.refresh();
      //   }
      
    },
    components: {
      cartcontrol
    }
  }
</script>
<style lang="less" scored>
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    background: #141d27;
    .content {
      display: flex;
      background: #141d27;
      font-size: 0;
      margin-left: -1px;
      color: rgba(255, 255, 255, .4);
      .content-left {
        flex: 1;
        .logo-wrapper {
          display: inline-block;
          vertical-align: top;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          border-radius: 50%;
          background: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background: #2b343c;
            &.highlight {
              background: rgb(0, 160, 220);
            }
            .icon-shopping_cart {
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
              &.highlight {
                color: #fff;
              }
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
          }
        }
      }
      .price{
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, .1);
        font-size: 16px;
        font-weight: 700;
        &.highlight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        &.not-enough {
          background: #2b333b;
        }
        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all 0.4s linear;
        }
      }
    }
    .shopcart-list{
      position: absolute;
      left: 0;
      top: 0;
      /*bottom: 48px;*/
/*      max-height: 350px;*/
      z-index: -1;
      width: 100%;
      transform: translate3d(0, -100%, 0);
      &.fold-enter, &.fold-leave-active {
        transition: all 0.5s;
      }
      &.fold-enter,&.fold-leave-active {
        transform: translate3d(0, 0, 0);
      }
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          margin: 0;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: scroll;
        /*overflow-y: hidden;*/
        background: #fff;
        .food {
          width: 100%;
          position: relative;
          padding: 12px 0;
          /*box-sizing: border-box;*/
          &:after {
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            border-top: 1px solid rgba(7, 17, 27, 0.1);
            content: '';
          }
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }
  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    opacity: 1;
    background: rgba(7, 17, 27, .6);
    background-filter: blur(10px);
    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.5s;
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
  }
</style>