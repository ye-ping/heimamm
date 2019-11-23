// 导入axios
import axios from 'axios'

// 统一设置基地址
axios.defaults.baseURL='http://183.237.67.218:3002'
// 统一携带跨域cookie
axios.defaults.withCredentials =true;

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
    axios({
        url:'/register',
        method:'post',
        data
    })
}