/**
 * @desc 重入统计相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'

/**
 * state 定义
 */
const state = {
  chipStatsList: [],
  listLoading: false,
  total: 0,
  filters: {
    pageSize: 10,
    pageIndex: 1,
    matchName: '',
    startOpening: '',
    endOpening: ''
  }
}

/**
 * Getter 定义
 */
const getters = {
  chipStatsList: state => state.chipStatsList,
  chipStatsListLoading: state => state.listLoading,
  chipStatsTotal: state => state.total,
  chipStatsFilters: state => state.filters
}

/**
 * actions 定义
 */
const actions = {
  /**
   * 获取重入统计列表
   */
  getChipStatsList({ commit }) {
    commit(types.GET_CHIPSTATS_LOADING_STATUS, true)
    api.GetChipStats(state.filters)
      .then(res => {
        commit(types.GET_CHIPSTATS_LOADING_STATUS, false)
        commit(types.GET_CHIPSTATS_TOTAL_COUNT, res.count)
        commit(types.GET_CHIPSTATS_LIST, res)
      }).catch(error => {
      commit(types.GET_CHIPSTATS_LOADING_STATUS, false)
    })
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_CHIPSTATS_LIST](state, data) {
    state.chipStatsList = []
    if (data && data.rows && data.rows.length) {
      data.rows.forEach(oRow => {
        state.chipStatsList.push(oRow)
      })
    }
  },
  [types.GET_CHIPSTATS_LOADING_STATUS](state, status) {
    state.listLoading = status
  },
  [types.GET_CHIPSTATS_TOTAL_COUNT](state, count) {
    state.total = count
  },
  [types.CHANGE_CHIPSTATS_LIST_PAGE_NUM](state, num) {
    state.filters.pageIndex = num
  }
}

export default {
  state,
  actions,
  getters,
mutations}
