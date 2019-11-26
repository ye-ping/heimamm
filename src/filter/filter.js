//导入Vue
import Vue from 'vue'
// 导入moment时间处理插件
import moment from 'moment'
// 声明全局过滤器
Vue.filter('qiye-Time',value=>{
    return moment(value).format('YYYY年MM月DD日'); 
})