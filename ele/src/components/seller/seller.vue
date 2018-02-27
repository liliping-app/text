<template>
  <div class="seller" ref="seller">
    <div class="sell-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <span class="icon iconfont icon-xihuan icon-favorite" :class="{'active':favorite}" @click="toggleFavorite"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" alt="" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import {saveToLocal, loadFromLocal} from '../../common/js/store';  //启动接口的
import star from '../star/star';
import split from '../split/split';
  export default {
    props: ['id'],
    data () {
      return {
        seller: config.seller,
        favorite: (() => {
          // 返回该id下 key为favorite的所对应的value,
        //   return loadFromLocal(this.seller.id, 'favorite', false);
          return loadFromLocal(this.id, 'favorite', false);
        })()
      }
    },
    computed: {
     
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    //当seller变动的时候会触发
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    mounted() {
      //当seller变动的时候会触发
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    methods: {

      toggleFavorite () {
        // if(!event._construted){
        //   return;
        // }
        //通过取反来设置切换
        this.favorite = !this.favorite;
        // saveToLocal ('favorite', this.favorite);
        //利用localstorage存储这个属性
        saveToLocal(this.id, 'favorite', this.favorite);
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      //编程习惯的前置下划线,代表内部使用的方法
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          //这是图片列表的总长度
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          //设置图片列表的宽度等于列表的总长度
          this.$refs.picList.style.width = width + 'px';
          //异步绑定滚动
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true, //bscroll的横向滚动属性
                eventPassthrough: 'vertical'  //bscroll的过滤垂直滚动
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    components: {
      star,
      split
    }
  }
</script>
<style lang="less" scored>
  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      position: relative;
      padding: 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .desc {
        padding-bottom: 18px;
        position: relative;
        &:after {
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          content: '';
        }
        font-size: 0;
        .star {
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }
        .text {
          display: inline-block;
          margin-right: 12px;
          line-height: 18px;
          vertical-align: top;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border: none;
          }
          h2{
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .content {
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress {
              font-size: 24px;
            }
          }
        }
      }
      .favorite {
        position: absolute;
        width: 50px;
        right: 11px;
        top: 18px;
        text-align: center;
        .icon-favorite {
          display: block;
          margin-bottom: 4px;
          line-height: 24px;
          font-size: 24px;
          color: #d4d6d9;
          &.active {
            color: rgb(240, 20, 20);
          }
        }
        .text {
          line-height: 10px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .content-wrapper {
        padding: 0 12px 16px 12px;
        position: relative;
        &:after{
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          content: '';
        }
        .content {
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20);
        }
      }
      .supports {
        .support-item {
          padding: 16px 12px;
          position: relative;
          &:after {
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            border-top: 1px solid rgba(7, 17, 27, 0.1);
            content: '';
          }
          font-size: 0;
          &:last-child {
            &:after {
              display: none;
            }
          }
        }
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: top;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease {
             background-image: url(../../static/seller/decrease_4@2x.png);
          }
          &.discount {
             background-image: url(../../static/seller/discount_4@2x.png);
          }
          &.guarantee {
             background-image: url(../../static/seller/guarantee_4@2x.png);
          }
          &.invoice {
             background-image: url(../../static/seller/invoice_4@2x.png);
          }
           &.special {
             background-image: url(../../static/seller/special_4@2x.png);
          }
        }
        .text {
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
      }
    }
    .pics {
      padding: 18px;
      .title {
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          font-size: 0;
          .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child {
              margin: 0;
            }
          }
        }
      }
    }
    .info {
      padding: 18px 18px 0 18px;
      color: rgb(7, 17, 27);
      .title {
        padding-bottom: 12px;
        line-height: 14px;
        position: relative;
        &:after{
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          content:'';
        }
        font-size: 14px;
      }
      .info-item {
        padding: 16px 12px;
        line-height: 16px;
        position: relative;
        &:after{
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-top: 1px solid rgba(7, 17, 27, 0.1);
          content:'';
        }
        font-size: 12px;
        &:last-child {
          &:after{
            display: none;
          }
        }
      }
    }
  }
</style>