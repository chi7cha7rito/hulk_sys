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

/**
 * 赛事管理
 */
import MatchList from './pages/match/list' // 查询列表
import MatchConfig from './pages/match/config' // 赛事配置
import MatchType from './pages/match/type' // 赛事类型


/**
 * 会员管理
 */
import MemberList from './pages/member/list' // 会员列表
import BalanceList from './pages/member/balance' // 余额列表
import PointsList from './pages/member/point' // 积分列表
import Coupon from './pages/member/coupon' // 优惠券
import Sprit from './pages/member/sprit' // 豪气查询
import SignIn from './pages/member/signIn' // 签到查询

/**
 * 系统管理
 */
import MemberLevel from './pages/settings/memberLevel' // 会员等级
import RechargeConfig from './pages/settings/recharge' // 充值返现


/**
 * 俱乐部管理
 */
import Campaign from './pages/operation/campaign' // 报名及重入
import Recharge from './pages/operation/recharge' // 店内充值
import ChipHistory from './pages/operation/chipHistory' // 店内充值
import Consume from './pages/operation/consume' // 店内消费


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
      { path: '/campaign', component: Campaign, name: '报名及重入' },
      { path: '/recharge', component: Recharge, name: '店内充值' },
      { path: '/consume', component: Consume, name: '店内消费' },
      { path: '/chipHistory', component: ChipHistory, name: '重入统计' }
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
      { path: '/matchConfig', component: MatchConfig, name: '赛事配置' },
      { path: '/matchType', component: MatchType, name: '赛事类型' }
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
      { path: '/points', component: PointsList, name: '积分记录' },
      { path: '/sprit', component: Sprit,  name: '豪气查询' },
      { path: '/coupon', component: Coupon, name: '优惠券查询' },
      { path: '/signIn', component: SignIn, name: '签到查询' }
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
    name: '系统管理',
    iconCls: 'el-icon-message',
    children: [
      { path: '/rechargeConfig', component: RechargeConfig, name: '充值返现' },
      { path: '/memberLevel', component: MemberLevel, name: '会员等级' }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
]

export default routes
