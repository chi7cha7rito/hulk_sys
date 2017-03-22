import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'

import store from './vuex/store'
import routes from './routes'

import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'


Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
routes})

/**
 * @desc 判断用户是否登录
 */
// router.beforeEach((to, from, next) => {
//   if (to.path == '/login') {
//     localStorage.removeItem('userInfo')
//   }
//   if (localStorage.getItem('userInfo')!=="undefined") {
//     let user = JSON.parse(localStorage.getItem('userInfo'))
//     if (!user && to.path != '/login') {
//       next({ path: '/login' })
//     } else {
//       next()
//     }
//   }else {
//      next({ path: '/login' })
//   }
// })

router.afterEach(transition => {
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
