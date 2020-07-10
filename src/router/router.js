import Vue from 'vue';//导入vue

//导入路由
import VueRouter from 'vue-router';

//导入element-ui弹出框
// import {Message} from 'element-ui'
//导入获取token的函数 
// import {getToken} from '../utils/token.js'
// 解决同步跳转报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 导入login组件
import login from '../views/login.vue';
// 导入首页组件
import index from '../views/index.vue'
// 导入userInfo   appi
// import {userInfo} from '../api/api.js';
// 导入学科列表
import subject from '../views/嵌套路由/subject.vue'
import data from '../views/嵌套路由/data.vue'
import user from '../views/嵌套路由/user.vue'
import question from '../views/嵌套路由/question.vue'
import qiye from '../views/嵌套路由/qiye.vue'
// import store from '../store/store.js';
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

//定义白名单,是否要登录
// const whitePaths = ['/login','index'];
// //导航守卫
// router.beforeEach((to,from,next) => {
//     //判断是否常在白名单to.path路径如 /index
//     if(whitePaths.indexOf(to.path) != -1){
//         //存在白名单中
//         //直接放走
//         return next();  
//     }
//     //到这里说明可以访问
//     if(getToken()){
//     //获取用户信息,保存到仓库
//     userInfo().then(res => {
//         store.commit('CHANGEINFO',res.data.data);
//         //判断状态
//         if(res.data.data.status===0){
//             //禁用
//             Message.warning('请等待管理员启用你!!!');
//             return next('/login');
//         }
//          //有token,放走
//         next();
//     })
//       return  
//     }

//     //炉石白名单,没有token,
//     Message('请先登录');
//     next('/login');
   
// })

// 导入路由
export default router;