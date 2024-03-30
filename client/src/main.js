import Vue from 'vue'
import App from './App.vue'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入axios
import axios from '@/api/index'
axios.defaults.withCredentials=true;
//导入路由
import router from '@/router'

import header from '@/components/MyHeader.vue'
import footer from '@/components/MyFotter.vue'
import myimage from '@/components/MyImage.vue'

//引入全局样式
import "@/assets/css/global.css"

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
//使用element-ui
Vue.use(ElementUI);
//引入icon
import '@/assets/icon/iconfont.css'
Vue.component('my-header', header)
Vue.component('my-footer', footer)
Vue.component('my-image', myimage)
//挂载BaseUrl
import global from './globle/globleApi';
Vue.prototype.global = global;
axios.defaults.baseURL = global.baseURL;

new Vue({
  //挂载到实例中
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
