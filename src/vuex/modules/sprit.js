/**
 * @desc 豪气相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'

/**
 * state 定义
 */
const state = {
  spritList: [],
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
  spritList: state => state.spritList,
  spritListLoading: state => state.listLoading,
  spritTotal: state => state.total,
  spritFilters: state => state.filters
}

/**
 * actions 定义
 */
const actions = {
  /**
   * 获取余额列表
   */
  getSpritList({ commit }) {
    commit(types.GET_SPRIT_LOADING_STATUS, true)
    api.GetSpritRanking(state.filters)
      .then(res => {
        commit(types.GET_SPRIT_LOADING_STATUS, false)
        commit(types.GET_SPRIT_TOTAL_COUNT, res.count)
        commit(types.GET_SPRIT_LIST, res)
      }).catch(error => {
      commit(types.GET_SPRIT_LOADING_STATUS, false)
    })
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_SPRIT_LIST](state, data) {
    state.spritList = []
    if (data && data.rows && data.rows.length) {
      data.rows.forEach(oRow => {
        state.spritList.push(oRow)})
    }
  },
  [types.GET_SPRIT_LOADING_STATUS](state, status) {
    state.listLoading = status
  },
  [types.GET_SPRIT_TOTAL_COUNT](state, count) {
    state.total = count
  },
  [types.CHANGE_SPRIT_LIST_PAGE_NUM](state, num) {
    state.filters.pageIndex = num
  }
}

export default {
  state,
  actions,
  getters,
mutations}
