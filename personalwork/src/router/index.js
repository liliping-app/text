import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/myhome/myhome';
import Works from '@/components/myworks/myworks';
import Upload from '@/components/myupload/myupload';
import Upload2 from '@/components/myupload/upload';
import Upload3 from '@/components/myupload/upload3';
import Login from '@/components/login';
import Register from '@/components/register/register';
Vue.use(Router);
window.loginGolb = new Vue();
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home',
            component: Home
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/works/:id',
            name: 'works',
            component: Works
        },
        {
            path: '/upload',
            name: 'upload',
            component: Upload3
        }
    ]
});
