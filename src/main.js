import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from '@/router/index.js'
import store from './store/index.js'
import './api/mock'


Vue.use(ElementUI);



new Vue({
  render: h => h(App),
  //直接刷新缓存内容会消失
  created() {
    store.commit('addMenu', router)
  },
  //在Vue项目中 想要把路由用起来 必须把路由实例对象挂载起来
  //router: 路由的实例对象
  router,
  store,
}).$mount('#app')