/**
 * @desc 余额相关的定义
 */

import api from '../../fetch/api'

/**
 * state 定义
 */
const state = {
  balanceIncrease: {
    phoneNo: '',
    type: 1, // 充值
    amount: '',
    source: '',
    sourceNo: '',
    remark: ''
  }
}

/**
 * Getter 定义
 */
const getters = {
  balanceIncrease: state => state.balanceIncrease
}

/**
 * actions 定义
 */
const actions = {
  /**
    * @desc 充值
    */
  balanceIncrease({commit}, palyload) {
    return api.BalanceIncrease(state.balanceIncrease).then(res => {
    })
  }
}

export default {
  state,
  actions,
getters}
