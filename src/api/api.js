// 导入axios
import axios from 'axios'
import { getToken} from '../utils/token.js';
// import { Message } from 'element-ui';
// import { listenerCount } from 'cluster';
// import {removeToken} from '../utils/token.js'
// 导入elementUI的弹窗
// import {Message} from 'element-ui';
// 导入vue
// import Vue from 'vue';
// Vue.use(Message);  

// 导入router
// import router from '../router/router.js'

// 统一设置基地址
axios.defaults.baseURL='http://183.237.67.218:3002'
// 统一携带跨域cookie
axios.defaults.withCredentials =true;



// 统一设置 axios 拦截器
// 请求拦截器
// 请求发送 之前
// config 是当前这次请求的 各种设置
// 可以统一设置header
axios.interceptors.request.use(
    function(config) {
      // 为config 统一设置token
      config.headers.token = getToken();
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  
  // 响应拦截器
  // axios 直接使用的.then之前
  // response 服务器响应的内容
  axios.interceptors.response.use(
    function(response) {
      // 判断token
      // if (response.data.code === 0) {
      //     // 提示
      //     Message.error('小老弟，伪造token，牛逼啊！')
      //   // 删除token
      //   removeToken();
      //   // 去登录页
      //   router.push("/login");
      //   return;
      // }
      // if(response.data.code===200){
      //   Message.success(response.data.message);
      // }
      return response;
     
    },
    function(error) {
      return Promise.reject(error);
    }
  );



// 暴露出去 有名字的暴露  名字一般和接口地址一样
export function login(data){//登录api
    return axios({
        url:'/login',
        method:'post',
        data
    })
}

// 接受短信api
export function sendsms(data){
    return axios({
        url:'/sendsms',
        method:'post',
        data
    })
}

// 注册api
export function res(data){
    return  axios({
        url:'/register',
        method:'post',
        data
    })
}
// 登录验证
export function userInfo(){
  return  axios({
        url:'/user/info',
        method:'get',
        // 设置请求头
        // headers:{
        //     token:getToken,
        // }
    })
}



// 学科列表api
// 新增
export const subject ={
  // 新增
add(data){
  return axios({
    url:'/subject/add',
    method:'post',
    data
  })
},
// 列表
list(params){
  return axios({
    url:'/subject/list',
    method:'get',
    params
  })
},
  // 编辑
edit(data){
  return axios({
    url:'/subject/edit',
    method:'post',
    data
  })
},
  //删除
  remove(data){
    return axios({
      url:'/subject/remove',
      method:'post',
      data
    })
  },
  //状态
status(data){
  return axios({
    url:'/subject/status',
    method:'post',
    data
  })
}
  //
}

// 企业列表
export const qiye ={
  // 新增
add(data){
  return axios({
    url:'/enterprise/add',
    method:'post',
    data
  })
},
// 列表
list(params){
  return axios({
    url:'/enterprise/list',
    method:'get',
    params
  })
},
  // 编辑
edit(data){
  return axios({
    url:'/enterprise/edit',
    method:'post',
    data
  })
},
  //删除
  remove(data){
    return axios({
      url:'/enterprise/remove',
      method:'post',
      data
    })
  },
  //状态
status(data){
  return axios({
    url:'/enterprise/status',
    method:'post',
    data
  })
}
  //
}


// 用户列表
export const user ={
  // 新增
add(data){
  return axios({
    url:'/user/add',
    method:'post',
    data
  })
},
// 列表
list(params){
  return axios({
    url:'/user/list',
    method:'get',
    params
  })
},
  // 编辑
edit(data){
  return axios({
    url:'/user/edit',
    method:'post',
    data
  })
},
  //删除
  remove(data){
    return axios({
      url:'/user/remove',
      method:'post',
      data
    })
  },
  //状态
status(data){
  return axios({
    url:'/user/status',
    method:'post',
    data
  })
}
  //
}