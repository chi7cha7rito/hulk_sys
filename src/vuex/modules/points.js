/**
 * @desc 余额相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'

/**
 * state 定义
 */
const state = {
  pointsList: [],
  listLoading: false,
  total: 0,
  filters: {
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
  pointsList: state => state.pointsList,
  pointsListLoading: state => state.listLoading,
  pointsTotal: state => state.total,
  pointsFilters: state => state.filters
}

/**
 * actions 定义
 */
const actions = {
  /**
   * 获取余额列表
   */
  getPointsList({ commit }) {
    commit(types.GET_POINTS_LOADING_STATUS, true)
    api.GetPoints(state.filters)
      .then(res => {
        commit(types.GET_POINTS_LOADING_STATUS, false)
        commit(types.GET_POINTS_TOTAL_COUNT, res.count)
        commit(types.GET_POINTS_LIST, res)
      }).catch(error => {
      commit(types.GET_POINTS_LOADING_STATUS, false)
    })
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_POINTS_LIST](state, data) {
    state.pointsList = []
    if (data && data.rows && data.rows.length) {
      data.rows.forEach(oRow => {
        state.pointsList.push(oRow)})
    }
  },
  [types.GET_POINTS_LOADING_STATUS](state, status) {
    state.listLoading = status
  },
  [types.GET_POINTS_TOTAL_COUNT](state, count) {
    state.total = count
  },
  [types.CHANGE_POINTS_LIST_PAGE_NUM](state, num) {
    state.filters.pageIndex = num
  }
}

export default {
  state,
  actions,
  getters,
mutations}
