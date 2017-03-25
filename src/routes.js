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

/**
 * 会员管理
 */
import MemberList from './pages/member/list' // 会员列表
import BalanceList from './pages/member/balance' // 余额列表

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
    name: '俱乐部管理',
    iconCls: 'el-icon-message',
    children: [
      { path: '/match', component: MatchList, name: '报名及重入' },
      { path: '/recharge', component: MatchAdd, name: '店内充值' },
      { path: '/consume', component: MatchAdd, name: '店内消费' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '赛事管理',
    iconCls: 'el-icon-message',
    children: [
      { path: '/main', component: Main, name: '主页', hidden: true },
      { path: '/match', component: MatchList, name: '赛事查询' },
      { path: '/matchConfig', component: MatchAdd, name: '赛事配置' },
      { path: '/matchType', component: MatchAdd, name: '赛事类型' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '会员管理',
    iconCls: 'el-icon-message',
    children: [
      { path: '/member', component: MemberList, name: '会员查询' },
      { path: '/balance', component: BalanceList, name: '余额记录' },
      { path: '/points', component: BalanceList, name: '积分记录' },
      { path: '/sprit', component: BalanceList, name: '豪气查询' },
      { path: '/coupon', component: BalanceList, name: '优惠券查询' },
      { path: '/coupon', component: BalanceList, name: '签到查询' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '后台账号管理',
    iconCls: 'el-icon-message',
    children: [
      { path: '/account', component: AccountList, name: '账号查询' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '系统配置',
    iconCls: 'el-icon-message',
    children: [
      { path: '/member', component: MemberList, name: '充值返现' },
      { path: '/balance', component: BalanceList, name: '会员等级' }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
]

export default routes
