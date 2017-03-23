/**
 * @desc 赛事相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'

/**
 * state 定义
 */
const state = {
  matchList: [],
  matchTypeList: [],
  matchConfigList: [],
  matchDetails: {
    id: 0,
    closingDatetime: '',
    openingDatetime: '',
    matchConfigId: 0,
    perHand: '',
    status: '1'
  },
  listLoading: false,
  editFormVisible: false,
  total: 0
}

/**
 * Getter 定义
 */
const getters = {
  matchList: state => state.matchList,
  matchTypeList: state => state.matchTypeList,
  matchConfigList: state => state.matchConfigList,
  listLoading: state => state.listLoading,
  total: state => state.total,
  matchDetails: state => state.matchDetails,
  editFormVisible: state => state.editFormVisible
}

/**
 * actions 定义
 */
const actions = {
  /**
   * 获取赛事列表
   */
  getMatchList({ commit }, palyload) {
    commit(types.GET_MATCH_LOADING_STATUS, true)
    api.GetMatchList(palyload)
      .then(res => {
        commit(types.GET_MATCH_LOADING_STATUS, false)
        commit(types.GET_MATCH_TOTAL_COUNT, res.count)
        commit(types.GET_MATCH_LIST, res)
      }).catch(error => {
      commit(types.GET_MATCH_LOADING_STATUS, false)
    })
  },
  /**
   * @desc 获取赛事类型列表
   */
  getMatchTypeList({commit}) {
    api.GetMatchTypeList().then(res => {
      commit(types.GET_MATCH_TYPE_LIST, res)
    })
  },
  /**
   * @desc 获取赛事详情
   */
  getMatchDetails({commit}, palyload) {
    api.GetMacthDetails(palyload).then(res => {
      commit(types.GET_MATCH_DETAILS, res)
      commit(types.MATCH_LIST_EDIT_FORM_VISIBLE, true)
    })
  },
  /**
   * @desc 获取所有赛事配置信息
   */
  getAllMatchConfigs({commit}) {
    api.GetAllMatchConfigs().then(res => {
      commit(types.GET_ALL_MATCH_CONFIGS, res)
    })
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_MATCH_LIST](state, data) {
    state.matchList = []
    if (data && data.rows && data.rows.length) {
      data.rows.forEach(oRow => {
        state.matchList.push(oRow)})
    }
  },
  [types.GET_MATCH_LOADING_STATUS](state, status) {
    state.listLoading = status
  },
  [types.GET_MATCH_TOTAL_COUNT](state, count) {
    state.total = count
  },
  [types.GET_MATCH_TYPE_LIST](state, data) {
    state.matchTypeList = data
  },
  [types.GET_MATCH_DETAILS](state, data) {
    let tmpData = {
      'id': data.id,
      'closingDatetime': data.closingDatetime,
      'openingDatetime': data.openingDatetime,
      'matchConfigId': data.matchConfig.id,
      'perHand': data.perHand,
      'status': data.status
    }
    state.matchDetails = tmpData
  },
  [types.GET_ALL_MATCH_CONFIGS](state, data) {
    state.matchConfigList = data
  },
  [types.MATCH_LIST_EDIT_FORM_VISIBLE](state, status) {
    state.editFormVisible = status
  }
}

export default {
  state,
  actions,
  getters,
mutations}
