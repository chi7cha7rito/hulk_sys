/**
 * @desc 余额相关的定义
 */
import * as types from '../types'
import api from '../../fetch/api'

/**
 * state 定义
 */
const state = {
  balanceDecrease: {
    phoneNo: '',
    type: 2, // 消费
    amount: '',
    source: '',
    sourceNo: '',
    remark: ''
  },
  pointDecrease: {
    phoneNo: '',
    type: 2, // 消费
    points: '',
    source: '',
    sourceNo: '',
    remark: ''
  },
  totalBalance: 0,
  totalPoints: 0
}

/**
 * Getter 定义
 */
const getters = {
  balanceDecrease: state => state.balanceDecrease,
  pointDecrease: state => state.pointDecrease,
  totalBalance: state => state.totalBalance,
  totalPoints: state => state.totalPoints
}

/**
 * actions 定义
 */
const actions = {
  /**
    * @desc 余额消费
    */
  balanceDecrease({commit}, palyload) {
    if (state.balanceDecrease.source.toString() === '5') {
      return api.BalanceDecrease(state.balanceDecrease).then(res => {
      })
    } else if (state.balanceDecrease.source.toString() === '8') {
      return api.BuyPoints(state.balanceDecrease).then(res => {
      })
    }
  },
  /**
   * @desc 获取余额
   */
  getTotalBalance({commit}) {
    api.TotalBalanceByPhoneNo({phoneNo: state.balanceDecrease.phoneNo}).then(res => {
      commit(types.GET_TOTAL_BALANCE, res)
    })
  },
  clearTotalBalance({commit}) {
    commit(types.GET_TOTAL_BALANCE, 0)
  },
  /**
    * @desc 积分消费
    */
  pointDecrease({commit}, palyload) {
    return api.PointDecrease(state.pointDecrease).then(res => {
    })
  },
  /**
   * @desc 获取积分
   */
  getTotalPoints({commit}) {
    api.TotalPointsByPhoneNo({phoneNo: state.pointDecrease.phoneNo}).then(res => {
      commit(types.GET_TOTAL_POINTS, res)
    })
  },
  clearTotalPoints({commit}) {
    commit(types.GET_TOTAL_POINTS, 0)
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_TOTAL_BALANCE](state, data) {
    state.totalBalance = data
  },
  [types.GET_TOTAL_POINTS](state, data) {
    state.totalPoints = data
  }
}

export default {
  state,
  actions,
  getters,
mutations}
