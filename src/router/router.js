import Vue from 'vue';//导入vue

//导入路由
import VueRouter from 'vue-router';

// 导入login组件
import login from '../views/login.vue';
// 导入首页组件
import index from '../views/index.vue'
// 注册路由
Vue.use(VueRouter);
//创建路由规则
const routes = [
    {path:'/login',component:login},//登录注册路由
    {path:'/',component:login},//重定向
    {path:'/index',component:index},//首页路由
];
//创建路由实例
const router = new VueRouter({
    routes
})
// 导入路由
export default router;