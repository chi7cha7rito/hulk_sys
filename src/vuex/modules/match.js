/**
 * @desc 赛事相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'

const state = {
  matchList: [],
  listLoading: false,
  total: 0,
  searchKey: {
    page: 0,
    limit: 20
  }
}

const actions = {
  /**
   * 获取赛事列表
   */
  getMatchList({ commit }, palyload) {
    commit(types.GET_MATCH_LOADING_STATUS, true)
    api.GetMatchList(palyload)
      .then(res => {
        commit(types.GET_MATCH_PAGE_NUM)
        commit(types.GET_MATCH_LOADING_STATUS, false)
        commit(types.GET_MATCH_TOTAL_COUNT, res.count)
        commit(types.GET_MATCH_LIST, res)
      })
  }
}

const getters = {
  matchList: state => state.matchList,
  listLoading: state => state.listLoading,
  total: state => state.total
}

const mutations = {
  [types.GET_MATCH_LIST](state, data) {
    // if (state.searchKey.page <= 1) {
    //   state.matchList = res.data
    // } else {
    //   state.matchList = state.matchList.concat(res.data)
    // }
    if (data && data.rows) {
      data.rows.forEach(oRow => {
        state.matchList.push(oRow)})
    }
  },
  [types.GET_SPORTS_SEARCH_KEY](state, params) {
    state.searchKey = params
  },
  [types.GET_MATCH_PAGE_NUM](state) {
    state.searchKey['page'] += 1
  },
  [types.GET_MATCH_LOADING_STATUS](state, status) {
    state.listLoading = status
  },
  [types.GET_MATCH_TOTAL_COUNT](state, count) {
    state.total = count
  }
}

export default {
  state,
  actions,
  getters,
mutations}
