import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import store from './vuex/store'
import routes from './routes'

import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.devtools = process.env.NODE_ENV !== 'production'

Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
routes})

const util = require('./common/js/util.js')

/**
 * @desc 判断用户是否登录
 */
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    util.default.removeUserInfo()
    next();
  }else {
    let userInfo = util.default.getUserInfo()
    if (userInfo) {
      let user = JSON.parse(userInfo)
      if (!user) {
        next({ path: '/login' })
      }else {
        next()
      }
    }else {
      next({ path: '/login' })
    }
  }
})

router.afterEach(transition => {
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
