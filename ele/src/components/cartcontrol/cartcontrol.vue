<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
      <!-- <div class="cart-decrease"  @click.stop.prevent="decreaseCart" transition="move"> -->
        <transition name="inner">
          <span class="icon iconfont icon-jian icon-remove_circle_outline"></span>
        </transition>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="icon iconfont icon-jia cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    
  </div>
</template>
<script>
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      decreaseCart(event) {
        console.log(this.food);
        if(!event._constructed) {
          // return;
        }
        if(this.food.count) {
          this.food.count--;
        }
      },
      addCart(event){
        console.log(this.food);
        if(!event._constructed){
          // return;
        }if(!this.food.count){
          Vue.set(this.food, 'count', 1);
        }else {
          this.food.count ++;
        }
        this.$emit('cart.add',event.target);
      }
    }
  }
</script>
<style lang="less" scored>
  .cartcontrol {
    font-size: 0;
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      width: 10px;
      transition: all 0.4s linear;
    /*  &.move-transition {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        .inner {
          display: inline-block;
          line-height: 24px;
          font-size: 12px;
          color: rgb(0, 160, 220);
          transition: all 0.4s linear;
          transform: rotate(0);
          margin-right: 0 !important;
        }
      }
      &.move-enter, &.move-leave {
        opacity: 0;
        .inner{
          transform: rotate(180deg);
        }
      }*/
    }
    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.4s linear;
      /*过渡效果css属性的名称，过渡效果需要多少时间，速度效果的速度曲线*/
    }
     &.fade-enter, &.fade-leave-active {
      opacity: 0;
      transform:translate3d(24px, 0, 0);
      /*这样可以开启硬件加速，动画更流畅，3D旋转，X轴位移24px*/
    }
    .inner{
      display: inline-block; /*设置成inline-block才有高度，才能有动画*/
      line-height: 24px;
      font-size: 24px;
      vertical-align: top;
      color: rgb(0, 160, 220, 0.2);
      &.inner-enter-active, &.inner-leave-active {
        transition: all 0.4s linear;
        transform: rotate(0);
      }
      &.inner-enter, &.inner-leave-active {
        opacity: 0;
        transform: rotate(180deg);
      }
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .cart-add {
      display: inline-block;
      padding:6px;
      line-height: 24px;
      font-size: 12px;
      color: rgb(0, 160, 220);
    }
  }
</style>