/**
 * @desc 赛事相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'
import utils from '../../common/js/util'

/**
 * state 定义
 */
const state = {
  matchList: [],
  matchTypeList: [],
  matchConfigList: [],
  matchDetails: {
    id: '0',
    closingDatetime: '',
    openingDatetime: '',
    matchConfigId: '',
    perHand: '',
    status: ''
  },
  listLoading: false,
  editFormVisible: false,
  addFormVisible: false,
  total: 0,
  filters: {
    pageSize: 10,
    pageIndex: '1',
    name: '',
    status: '',
    startClosing: '',
    endClosing: '',
    type: ''
  },
  addForm: {
    closingDatetime: '',
    openingDatetime: '',
    matchConfigId: '',
    perHand: '',
    status: ''
  }
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
  editFormVisible: state => state.editFormVisible,
  addFormVisible: state => state.addFormVisible,
  filters: state => state.filters,
  addForm: state => state.addForm
}

/**
 * actions 定义
 */
const actions = {
  /**
   * 获取赛事列表
   */
  getMatchList({ commit }) {
    commit(types.GET_MATCH_LOADING_STATUS, true)
    api.GetMatchList(state.filters)
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
    commit(types.MATCH_LIST_EDIT_FORM_VISIBLE, true)
    api.GetMacthDetails(palyload).then(res => {
      commit(types.GET_MATCH_DETAILS, res)
    })
  },
  /**
   * @desc 获取所有赛事配置信息
   */
  getAllMatchConfigs({commit}) {
    api.GetAllMatchConfigs().then(res => {
      commit(types.GET_ALL_MATCH_CONFIGS, res)
    })
  },
  /**
   * @desc 添加赛事
   */
  addMatch({commit}, palyload) {
    return api.AddMatch(state.addForm).then(res => {
      commit(types.MATCH_LIST_ADD_FORM_VISIBLE, false)
    })
  },
  /**
   * @desc 编辑赛事
   */
  editMatch({commit}, palyload) {
    let data = state.matchDetails
    return api.EditMatch(data).then(res => {
      commit(types.MATCH_LIST_EDIT_FORM_VISIBLE, false)
    })
  },
  /**
  * @desc 删除赛事
  */
  delMatch({commit}, id) {
    return api.DelMatch({id: id,status: '3'}).then(res => {
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
      'closingDatetime': new Date(data.closingDatetime),
      'openingDatetime': new Date(data.openingDatetime),
      'matchConfigId': data.matchConfig.id.toString(),
      'perHand': data.perHand,
      'status': data.status.toString()
    }
    state.matchDetails = tmpData
  },
  [types.GET_ALL_MATCH_CONFIGS](state, data) {
    let configList = []
    data.forEach(row => {
      configList.push({id: row.id,name: row.name})})

    state.matchConfigList = configList
  },
  [types.MATCH_LIST_EDIT_FORM_VISIBLE](state, status) {
    state.editFormVisible = status
  },
  [types.MATCH_LIST_ADD_FORM_VISIBLE](state, status) {
    state.addFormVisible = status
  },
  [types.CHANGE_MATCH_LIST_PAGE_NUM](state, num) {
    state.filters.pageIndex = num
  },
  [types.COM_ERROR_MESSAGE](state, msg) {
    state.errorMsg = msg
  }
}

export default {
  state,
  actions,
  getters,
mutations}
