<template>
<div>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li class="menu-item" v-for="(item,index) in goods" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span class="icon" v-if="classMap[item.type]" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodss">
      <ul>
        <li ref="foodList" class="food-list food-list-hook" v-for="item in goods">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" width= "57" height="57" alt=""/>
              </div>  
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好频率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :deliveryPricee="config.seller.deliveryPrice" :minPrice="config.seller.minPrice" :selectFoods="selectFoods"></shopcart>
  </div>
  <!-- 详情页的页面 -->
  <food @add="addFood" :food="selectedFood" ref="food"></food>
</div>
</template>
<script>
import axios from 'axios';
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
import shopcart from '../shopcart/shopcart.vue';
import food from '../food/food';
let ERR_OK = 0;
  export default {
    name: 'Goods',
    data () {
      return {
        goods: [],
        config: config,
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    methods: {
      selectMenu(index) {
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood(food,event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        console.log(this.selectedFood)
        this.$refs.food.show();
      },
      addFood(target){
        this._drop(target);
      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        console.log('_drop');
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
      _initScroll() {

        this.meunScroll = new BScroll(this.$refs.menu, {
          click: true
        });
        // better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
        //注意此处是 this.$refs.xxx
        this.foodsScroll = new BScroll(this.$refs.foodss, {
          click: true,
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight () {//获取每一个food的dom对象
        let foodList = this.$refs.foodss.getElementsByClassName('food-list-hook');
        let height = 0;
        console.log(this.listHeight,7888)
        this.listHeight.push(height);//初始化第一个高度为0
        for (let i =0; i < foodList.length; i++){
          let item = foodList[i];//每一个item都是刚才获取的food的每一个dom
          height += item.clientHeight;//主要是为了获取每一个foods内部块的高度
          this.listHeight.push(height);
          console.log(this.listHeight,1117888)
        }
      }
    },
    computed: {
       currentIndex() { //计算到达哪个区域的区间的时候的对应的索引值
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];// //当前menu子块的高度
          let height2 = this.listHeight[i + 1]; //下一个menu子块的高度
          //滚动到底部的时候,height2为undefined,需要考虑这种情况
          //需要确定是在两个menu子块的高度区间
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;//返回这个menu子块的索引
          }
        }
        return 0;
      },
      selectFoods () {//自动将所有的goods.food添加一个count属性,方便做数量运算
        let foods =[];
        console.log('foods',1234,this.goods)
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if(food.count) {
              foods.push(food);
              console.log(food.count,65)
            }
          });
        });
        return foods;
        console.log(foods,8888)
      }
     
     
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special',
      'invoice', 'guarantee'];
      this.goods = config.goods;
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();
      });
    //   let url = 'http://tao-yao-yao.6655.la/qingmoId';
    //   axios.get(url).then((response) => {
    //     console.log(response,65)
    //     response = response.data.body;
    //     if(response.errno === ERR_OK){
    //       this.goods = response.data=config.gooods;
    //       this.$nextTick(() => {
    //         this._initScroll();
    //         this._calculateHeight();
    //       })
    //     }
    //   })
    },
    components: {
      cartcontrol,
      shopcart,
      food
    },
    // events: {
    //   'cart.add'(target) {
    //     console.log('cart.add',3222);
    //     this._drop(target);
    //   }
    // }
  }
</script>
<style lang="less" scored>
  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        height: 54px;
        padding: 0 12px;
        line-height: 14px;
        text-align: center;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
          .text {
            &:after{
              display: none;
            }
          }
        }
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            background-image: url(../../static/goods/decrease_3@3x.png);
          }
          &.discount {
            background-image: url(../../static/goods/discount_3@3x.png);
          }
          &.guarantee {
            background-image: url(../../static/goods/guarantee_3@3x.png);
          }
          &.invoice {
            background-image: url(../../static/goods/invoice_3@3x.png);
          }
          &.special {
            background-image: url(../../static/goods/special_3@3x.png);
          }
        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          position: relative;
          &:after {
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            border-top: 1px solid rgba(7, 17, 27, .1);
            font-size: 12px;
          }
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        position: relative;
        &:after {
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-top: 1px solid rgba(7, 17, 27, .1);
          font-size: 12px;
        }
        &:last-child {
          &:after {
            display: none;
          }
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            /*color: rgb (7, 17, 27);*/
          }
          .desc, .extra {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .desc {
            line-height: 12px;
            margin-bottom: 8px;
          }
          .extra {
            .count {
              margin-right: 12px;
            }
          }
          .price {
            font-size: 700;
            line-height: 24px;
            .now{
              margin-right:8px;
              font-size: 14px;
              color: rgb(240,20,20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
</style>