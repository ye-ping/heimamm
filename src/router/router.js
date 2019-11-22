import Vue from 'vue';//导入vue

//导入路由
import VueRouter from 'vue-router';

// 导入login组件
import login from '../views/login.vue';
// 导入首页组件
import index from '../views/index.vue'
// 导入学科列表
import subject from '../views/嵌套路由/subject.vue'
import data from '../views/嵌套路由/data.vue'
import user from '../views/嵌套路由/user.vue'
import question from '../views/嵌套路由/question.vue'
import qiye from '../views/嵌套路由/qiye.vue'
// 注册路由
Vue.use(VueRouter);
//创建路由规则
const routes = [
    {path:'/login',component:login},//登录注册路由
    {path:'/',component:login},//重定向
    {
        path:'/index',
        component:index,
     children:[
         {path:'subject',component:subject},//学科
         {path:'data',component:data},//数据列表
         {path:'user',component:user},//用户列表
         {path:'question',component:question},//题库列表
         {path:'qiye',component:qiye},//企业列表
     ]   
    },//首页路由
];
//创建路由实例
const router = new VueRouter({
    routes
})
// 导入路由
export default router;