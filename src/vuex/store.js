import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import match from './modules/match'
import com from './modules/com'
import member from './modules/member'
import balance from './modules/balance'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    com,
    user,
    match,
    member,
  balance}
})
