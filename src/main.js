import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//导入全局样式
import   './style/base.css'
// 导入全局过滤器
import   './filter/filter.js'

// 导入路由 
import router from './router/router.js'

//导入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  router,//挂载路由
  render: h => h(App),
}).$mount('#app')
