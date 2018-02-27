import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/hello';
import Goods from '@/components/goods/goods';
import Ratings from '@/components/ratings/ratings';
import Seller from '@/components/seller/seller';
Vue.use(Router);

export default new Router({
    routes: [
      {
        path: '/',
        redirect:'/goods',
        component: Goods
      },
      {
        path:'/goods',
        name: 'Goods',
        component: Goods
      },
      {
        path:'/ratings',
        name: 'Ratings',
        component: Ratings
      },
      {
        path:'/seller',
        name: 'Seller',
        component: Seller
      }
    ]
});
