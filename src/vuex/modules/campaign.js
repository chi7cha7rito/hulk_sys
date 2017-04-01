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
  memberSelectForm: {
    phoneNo: '',
    payType: '',
    balance: '',
    points: '',
    couponList: []
  },
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
  addAttendanceForm: state => state.addForm,
  memberSelectForm: state => state.memberSelectForm
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
//   /**
//    * @desc 获取赛事详情
//    */
//   getMatchDetails({commit}, palyload) {
//     commit(types.COM_EDIT_FORM_VISIBLE, true)
//     api.GetMacthDetails(palyload).then(res => {
//       commit(types.GET_MATCH_DETAILS, res)
//     })
//   },
//   /**
//    * @desc 添加赛事
//    */
//   addMatch({commit}, palyload) {
//     return api.AddMatch(state.addForm).then(res => {
//       commit(types.COM_ADD_FORM_VISIBLE, false)
//     })
//   },
//   /**
//    * @desc 编辑赛事
//    */
//   editMatch({commit}, palyload) {
//     let data = state.matchDetails
//     return api.EditMatch(data).then(res => {
//       commit(types.COM_EDIT_FORM_VISIBLE, false)
//     })
//   },
//   /**
//   * @desc 删除赛事
//   */
//   delMatch({commit}, id) {
//     return api.DelMatch({id: id,status: '3'}).then(res => {
//     })
//   }
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
  },
  [types.SET_MEMBER_ACCOUNT_INFO_IN_CAMPAIGN](state,res){
    state.memberSelectForm.points=res.points;
    state.memberSelectForm.balance=res.balance;
    state.memberSelectForm.couponList=res.coupon;
  }
//   [types.GET_MATCH_DETAILS](state, data) {
//     let tmpData = {
//       'id': data.id,
//       'closingDatetime': new Date(data.closingDatetime),
//       'openingDatetime': new Date(data.openingDatetime),
//       'matchConfigId': data.matchConfig.id.toString(),
//       'perHand': data.perHand,
//       'status': data.status.toString()
//     }
//     state.matchDetails = tmpData
//   }
}

export default {
  state,
  actions,
  getters,
mutations}
