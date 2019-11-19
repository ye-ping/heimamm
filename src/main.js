import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// 导入路由 
import router from './router/router.js'


new Vue({
  router,//挂载路由
  render: h => h(App),
}).$mount('#app')
