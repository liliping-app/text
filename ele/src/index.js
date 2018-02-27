// require('./style.scss');

// document.querySelector('#app').innerHTML = require('./tpl.html');

import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});

// document.body.innerHTML += require('./tpl.html');
