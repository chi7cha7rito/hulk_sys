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
  attendanceList: [],
  availableMatchList: [],
  filters: {
    phoneNo: '',
    matchName: '',
    openingStart: '',
    openingEnd: ''
  },
  memberInfo: {},
  addForm: {
    phoneNo: '',
    matchId: '',
    matchPriceId: '',
    payType: '',
    couponId: '',
    balance: '',
    points: ''
  }
}

/**
 * Getter 定义
 */
const getters = {
  attendanceList: state => state.attendanceList,
  availableMatchList: state => state.availableMatchList,
  attendanceFilters: state => state.filters,
  addAttendanceForm: state => state.addForm
}

/**
 * actions 定义
 */
const actions = {
  /**
   * 获取参赛人员列表
   */
  getAttendanceList({ state, commit, rootState }) {
    commit(types.COM_LIST_LOADING_STATUS, true)
    let requestData = {}
    Object.assign(requestData, state.filters, {'pageIndex': rootState.com.pageIndex, 'pageSize': rootState.com.pageSize})
    api.GetAttendances(requestData)
      .then(res => {
        commit(types.COM_LIST_LOADING_STATUS, false)
        commit(types.COM_LIST_TOTAL_COUNT, res.count)
        commit(types.GET_ATTENDANCE_LIST, res)
      }).catch(error => {
      commit(types.COM_LIST_LOADING_STATUS, false)
    })
  },
  /**
   * @desc 获取赛事类型列表
   */
  getAvailableMatches({commit}) {
    api.GetAvailableMatches().then(res => {
      commit(types.GET_AVAILABLE_MATCHES, res)
    })
  },
  /**
   * 线下报名
   * @param {*} param
   */
  createOffline({commit}, params) {
    return api.CreateOffline(params).then(res => {
      commit(types.COM_ADD_FORM_VISIBLE, false)
    })
  },
  /**
   * 购买筹码
   * @param {*} param
   */
  buyChips({commit}, params) {
    return api.BuyChips(params).then(res => {
      commit(types.COM_EDIT_FORM_VISIBLE, false)
    })
  },
  /**
   * 获取有效的比赛奖励配置
   * @param {*} matchConfigId
   */
  findAllActive({commit}, matchConfigId) {
    return api.FindAllActiveReward({'matchConfigId': matchConfigId}).then(res => {
      return res
    })
  },
  /**
   * 设置赛事奖励
   * @param {*} param0 
   * @param {*} params 
   */
  setMatchReward({commit}, params) {
    return api.SetMatchReward(params)
  },
  /**
   * 颁发赛事奖励
   * @param {*} param0 
   * @param {*} params 
   */
  makeMatchReward({commit}, params) {
    return api.MakeMatchReward(params)
  },
  /**
   * 颁发赛事奖励
   * @param {*} param0 
   * @param {*} params 
   */
  confirmJoin({commit}, params) {
    return api.ConfirmJoin(params)
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_ATTENDANCE_LIST](state, data) {
    state.attendanceList = []
    if (data && data.rows && data.rows.length) {
      data.rows.forEach(oRow => {
        state.attendanceList.push(oRow)})
    }
  },
  [types.GET_AVAILABLE_MATCHES](state, data) {
    state.availableMatchList = []
    if (data && data.length) {
      data.forEach(oRow => {
        state.availableMatchList.push(oRow)})
    }
  }
}

export default {
  state,
  actions,
  getters,
mutations}
