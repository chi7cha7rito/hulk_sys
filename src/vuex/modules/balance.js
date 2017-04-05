/**
 * @desc 余额相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'

/**
 * state 定义
 */
const state = {
  balanceList: [],
  listLoading: false,
  total: 0,
  balanceFilters: {
    pageSize: 10,
    pageIndex: 1,
    phoneNo: '',
    type: '',
    startCreatedAt: '',
    endCreatedAt: ''
  }
}

/**
 * Getter 定义
 */
const getters = {
  balanceList: state => state.balanceList,
  balanceListLoading: state => state.listLoading,
  balanceTotal: state => state.total,
  balanceFilters: state => state.balanceFilters
}

/**
 * actions 定义
 */
const actions = {
  /**
   * 获取余额列表
   */
  getBalanceList({ commit }) {
    commit(types.GET_BALANCE_LOADING_STATUS, true)
    api.GetBalances(state.balanceFilters)
      .then(res => {
        commit(types.GET_BALANCE_LOADING_STATUS, false)
        commit(types.GET_BALANCE_TOTAL_COUNT, res.count)
        commit(types.GET_BALANCE_LIST, res)
      }).catch(error => {
      commit(types.GET_BALANCE_LOADING_STATUS, false)
    })
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_BALANCE_LIST](state, data) {
    state.balanceList = []
    if (data && data.rows && data.rows.length) {
      data.rows.forEach(oRow => {
        state.balanceList.push(oRow)})
    }
  },
  [types.GET_BALANCE_LOADING_STATUS](state, status) {
    state.listLoading = status
  },
  [types.GET_BALANCE_TOTAL_COUNT](state, count) {
    state.total = count
  },
  [types.CHANGE_BALANCE_LIST_PAGE_NUM](state, num) {
    state.filters.pageIndex = num
  }
}

export default {
  state,
  actions,
  getters,
mutations}
