/**
 * @desc 充值返现相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'
import utils from '../../common/js/util'

/**
 * state 定义
 */
const state = {
  rechargeSetupList: [],
  rechargeSetupDetails: {
    'id': '',
    'threshold': '',
    'reward': '',
    'remark': '',
    'status': ''
  },
  filters: {},
  addForm: {
    threshold: '',
    reward: '',
    remark: '',
    status: ''
  }
}

/**
 * Getter 定义
 */
const getters = {
  rechargeSetupList: state => state.rechargeSetupList,
  rechargeSetupDetails: state => state.rechargeSetupDetails,
  rechargeSetupFilters: state => state.filters,
  rechargeSetupAddForm: state => state.addForm
}

/**
 * actions 定义
 */
const actions = {
  /**
   * 获取充值返现列表
   */
  getRechargeSetupList({ state, commit, rootState }) {
    commit(types.COM_LIST_LOADING_STATUS, true)
    api.GetRechargeSetupList()
      .then(res => {
        commit(types.COM_LIST_LOADING_STATUS, false)
        commit(types.COM_LIST_TOTAL_COUNT, res.count)
        commit(types.GET_RECHARGESETUP_LIST, res)
      }).catch(error => {
      commit(types.COM_LIST_LOADING_STATUS, false)
    })
  },
  /**
   * @desc 获取充值返现详情
   */
  getRechargeSetupDetails({commit}, palyload) {
    commit(types.COM_EDIT_FORM_VISIBLE, true)
    api.GetRechargeSetupDetails(palyload).then(res => {
      commit(types.GET_RECHARGESETUP_DETAILS, res)
    })
  },
  /**
   * @desc 添加充值返现
   */
  addRechargeSetup({commit}, palyload) {
    return api.AddRechargeSetup(state.addForm).then(res => {
      commit(types.COM_ADD_FORM_VISIBLE, false)
    })
  },
  /**
   * @desc 编辑充值返现
   */
  editRechargeSetup({commit}, palyload) {
    let data = state.rechargeSetupDetails
    return api.EditRechargeSetup(data).then(res => {
      commit(types.COM_EDIT_FORM_VISIBLE, false)
    })
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_RECHARGESETUP_LIST](state, data) {
    state.rechargeSetupList = []
    if (data && data && data.length) {
      data.forEach(oRow => {
        state.rechargeSetupList.push(oRow)})
    }
  },
  [types.GET_RECHARGESETUP_DETAILS](state, data) {
    let tmpData = {
      'id': data.id,
      'threshold': data.threshold,
      'reward': data.reward,
      'remark': data.remark,
      'status': data.status.toString()
    }
    state.rechargeSetupDetails = tmpData
  }
}

export default {
  state,
  actions,
  getters,
mutations}
