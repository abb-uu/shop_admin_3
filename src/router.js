import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/login/Login.vue'
import Index from './components/index/Index.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

// 前置守卫
router.beforeEach((to, from, next) => {
  // 获取token
  const token = localStorage.getItem('token')
  // 当访问登录页或者token存在则允许访问,否则跳转到登录页
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})

export default router
