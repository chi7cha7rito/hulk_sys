import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import match from './modules/match'
import com from './modules/com'
import member from './modules/member'
import balance from './modules/balance'
import points from './modules/points'
import sprit from './modules/sprit'
import signIn from './modules/signIn'
import coupon from './modules/coupon'
import matchConfig from './modules/matchConfig'
import sysUser from './modules/sysUser'
import memberLevel from './modules/memberLevel'
import rechargeSetup from './modules/rechargeSetup'
import recharge from './modules/recharge'
import consume from './modules/consume'
import campaign from './modules/campaign'
import accountChange from './modules/accountChange'
import chip from './modules/chip'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    com,
    user,
    match,
    member,
    balance,
    points,
    sprit,
    signIn,
    coupon,
    matchConfig,
    sysUser,
    memberLevel,
    rechargeSetup,
    recharge,
    consume,
    campaign,
    accountChange,
  chip}
})
