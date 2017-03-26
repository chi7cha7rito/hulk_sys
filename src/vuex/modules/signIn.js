/**
 * @desc 豪气相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'

/**
 * state 定义
 */
const state = {
  signInList: [],
  listLoading: false,
  total: 0,
  filters: {
    pageSize: 10,
    pageIndex: 1,
    startDatetime: '',
    endDatetime: ''
  }
}

/**
 * Getter 定义
 */
const getters = {
  signInList: state => state.signInList,
  signInListLoading: state => state.listLoading,
  signInTotal: state => state.total,
  signInFilters: state => state.filters
}

/**
 * actions 定义
 */
const actions = {
  /**
   * 获取余额列表
   */
  getSignInList({ commit }) {
    commit(types.GET_SIGNIN_LOADING_STATUS, true)
    api.GetSignInStats(state.filters)
      .then(res => {
        commit(types.GET_SIGNIN_LOADING_STATUS, false)
        commit(types.GET_SIGNIN_TOTAL_COUNT, res.count)
        commit(types.GET_SIGNIN_LIST, res)
      }).catch(error => {
      commit(types.GET_SIGNIN_LOADING_STATUS, false)
    })
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_SIGNIN_LIST](state, data) {
    state.signInList = []
    if (data && data.rows && data.rows.length) {
      data.rows.forEach(oRow => {
        state.signInList.push(oRow)})
    }
  },
  [types.GET_SIGNIN_LOADING_STATUS](state, status) {
    state.listLoading = status
  },
  [types.GET_SIGNIN_TOTAL_COUNT](state, count) {
    state.total = count
  },
  [types.CHANGE_SIGNIN_LIST_PAGE_NUM](state, num) {
    state.filters.pageIndex = num
  }
}

export default {
  state,
  actions,
  getters,
mutations}
