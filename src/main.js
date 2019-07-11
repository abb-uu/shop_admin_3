import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/reset.css'
// 使用多语言
Vue.use(ElementUI, { locale })
// 设置基路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 将axios挂载到Vue原型上,之后每个组件使用时就不用再去引入了
Vue.prototype.$axios = axios
// 每次请求时将token挂载到请求头
axios.interceptors.request.use(
  function (config) {
    // 拦截每次请求,携带token
    config.headers.Authorization = localStorage.getItem('token')

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
