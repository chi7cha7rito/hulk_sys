/**
 * desc 公共组件
 */
import NotFound from './pages/404.vue'
import Home from './pages/home.vue'
import Main from './pages/main.vue'

/**
 * 账号相关
 */
import Login from './pages/account/login.vue'
import AccountList from './pages/account/list.vue'
import AccountAdd from './pages/account/add.vue'

/**
 * 赛事管理
 */
import MatchList from './pages/match/list' // 查询列表
import MatchAdd from './pages/match/add' // 赛事添加

let routes = [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: '赛事管理',
    iconCls: 'el-icon-message',
    children: [
      { path: '/main', component: Main, name: '主页', hidden: true },
      { path: '/match', component: MatchList, name: '赛事查询' },
      { path: '/addMatch', component: MatchAdd, name: '赛事添加' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '账号管理',
    iconCls: 'el-icon-message',
    children: [
      { path: '/account', component: AccountList, name: '账号查询' },
      { path: '/addAccount', component: AccountAdd, name: '赛事添加' }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
]

export default routes
