/**
 * @desc 会员等级相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'
import utils from '../../common/js/util'

/**
 * state 定义
 */
const state = {
  memberLevelList: [],
  memberLevelDetails: {
    id: '',
    name: '',
    threshold: '',
    apply: '',
    buyChip: '',
    consume: '',
    weeklyTicket: '',
    status: ''
  },
  filters: {},
  addForm: {
    name: '',
    threshold: '',
    apply: '',
    buyChip: '',
    consume: '',
    weeklyTicket: '',
    status: ''
  }
}

/**
 * Getter 定义
 */
const getters = {
  memberLevelList: state => state.memberLevelList,
  memberLevelDetails: state => state.memberLevelDetails,
  memberLevelFilters: state => state.filters,
  memberLevelAddForm: state => state.addForm
}

/**
 * actions 定义
 */
const actions = {
  /**
   * 获取会员等级列表
   */
  getMemberLevelList({ state, commit, rootState }) {
    commit(types.COM_LIST_LOADING_STATUS, true)
    api.GetMemberLevelList()
      .then(res => {
        commit(types.COM_LIST_LOADING_STATUS, false)
        commit(types.COM_LIST_TOTAL_COUNT, res.count)
        commit(types.GET_MEMBERLEVEL_LIST, res)
      }).catch(error => {
      commit(types.COM_LIST_LOADING_STATUS, false)
    })
  },
  /**
   * @desc 获取会员等级详情
   */
  getMemberLevelDetails({commit}, palyload) {
    commit(types.COM_EDIT_FORM_VISIBLE, true)
    api.GetMemberLevelDetails(palyload).then(res => {
      commit(types.GET_MEMBERLEVEL_DETAILS, res)
    })
  },
  /**
   * @desc 添加会员等级
   */
  addMemberLevel({commit}, palyload) {
    return api.AddMemberLevel(state.addForm).then(res => {
      commit(types.COM_ADD_FORM_VISIBLE, false)
    })
  },
  /**
   * @desc 编辑会员等级
   */
  editMemberLevel({commit}, palyload) {
    let data = state.memberLevelDetails
    return api.EditMemberLevel(data).then(res => {
      commit(types.COM_EDIT_FORM_VISIBLE, false)
    })
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_MEMBERLEVEL_LIST](state, data) {
    state.memberLevelList = []
    if (data && data && data.length) {
      data.forEach(oRow => {
        state.memberLevelList.push(oRow)})
    }
  },
  [types.GET_MEMBERLEVEL_DETAILS](state, data) {
    let tmpData = {
      'id': data.id,
      'name': data.name,
      'threshold': data.threshold,
      'apply': data.apply,
      'buyChip': data.buyChip,
      'consume': data.consume,
      'weeklyTicket': data.weeklyTicket,
      'status': data.status.toString()
    }
    state.memberLevelDetails = tmpData
  }
}

export default {
  state,
  actions,
  getters,
mutations}
