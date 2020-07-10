//导入Vue
import Vue from 'vue';
//导入Vuex
import Vuex from 'vuex'
//use一下Vuex
Vue.use(Vuex);
// 导入localStorage中的方法
import {getUserInfo} from '../utils/token.js'

//创建store创库
const store = new Vuex.Store({
    state:{//全局仓库
        userinfo: getUserInfo("userInfo")||{},
    },
    mutations:{
        CHANGEINFO(state,info){
            state.userinfo=info;
        }
    }
});

//暴露创库
export default store;