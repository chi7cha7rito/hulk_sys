/**
 * @desc 会员相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'

/**
 * state 定义
 */
const state = {
  memberList: [],
  memberLevel: [],
  listLoading: false,
  editFormVisible: false,
  bpFormVisible: false,
  memberDetails: {},
  memberBP: {},
  total: 0,
  filters: {
    pageSize: 10,
    pageIndex: 1,
    phoneNo: '',
    name: '',
    idCardNo: '',
    gender: '',
    status: '',
    level: '',
    startCreatedAt: '',
    endCreatedAt: ''
  }
}

/**
 * Getter 定义
 */
const getters = {
  memberList: state => state.memberList,
  memberLevel: state => state.memberLevel,
  memberListLoading: state => state.listLoading,
  memberTotal: state => state.total,
  memberFilters: state => state.filters,
  memberDetails: state => state.memberDetails,
  memberEditFormVisible: state => state.editFormVisible,
  memberBpFormVisible: state => state.bpFormVisible,
  memberBP: state => state.memberBP
}

/**
 * actions 定义
 */
const actions = {
  /**
   * 获取会员列表
   */
  getMemberList({ commit }) {
    commit(types.GET_MEMBER_LOADING_STATUS, true)
    api.GetMembers(state.filters)
      .then(res => {
        commit(types.GET_MEMBER_LOADING_STATUS, false)
        commit(types.GET_MEMBER_TOTAL_COUNT, res.count)
        commit(types.GET_MEMBER_LIST, res)
      }).catch(error => {
      commit(types.GET_MEMBER_LOADING_STATUS, false)
    })
  },
  /**
   * @desc 获取会员等级
   */
  getMemberLevel({commit}) {
    api.GetMemberLevel().then(res => {
      commit(types.GET_MEMBER_LEVEL, res)
    })
  },
  /**
   * @desc 获取会员详情
   */
  getMemberDetails({commit}, palyload) {
    api.GetMemberDetails(palyload).then(res => {
      commit(types.GET_MEMBER_DETAILS, res)
      commit(types.MEMBER_LIST_EDIT_FORM_VISIBLE, true)
    })
  },
  /**
   * @desc 获取会员余额积分
   */
  getMemberBP({commit}, palyload) {
    api.GetMemberBP(palyload).then(res => {
      commit(types.GET_MEMBER_BP, res)
      commit(types.MEMBER_LIST_BP_FORM_VISIBLE, true)
    })
  },
  /**
   * @desc 编辑会员
   */
  editMember({commit}, palyload) {
    let data = state.memberDetails
    api.EditMember(data).then(res => {
      commit(types.MEMBER_LIST_EDIT_FORM_VISIBLE, false)
    })
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_MEMBER_LIST](state, data) {
    state.memberList = []
    if (data && data.rows && data.rows.length) {
      data.rows.forEach(oRow => {
        state.memberList.push(oRow)})
    }
  },
  [types.GET_MEMBER_LOADING_STATUS](state, status) {
    state.listLoading = status
  },
  [types.GET_MEMBER_TOTAL_COUNT](state, count) {
    state.total = count
  },
  [types.GET_MEMBER_LEVEL](state, data) {
    state.memberLevel = data
  },
  [types.GET_MEMBER_DETAILS](state, data) {
    let tmpData = {
      'id': data.id,
      'gender': data.gender.val.toString(),
      'phoneNo': data.phoneNo,
      'name': data.name,
      'idCardNo': data.idCardNo,
      'cardNo': data.member.cardNo,
      'status': data.member.status.toString()
    }
    state.memberDetails = tmpData
  },
  [types.GET_MEMBER_BP](state, data) {
    state.memberBP = data
  },
  [types.MEMBER_LIST_EDIT_FORM_VISIBLE](state, status) {
    state.editFormVisible = status
  },
  [types.MEMBER_LIST_BP_FORM_VISIBLE](state, status) {
    state.bpFormVisible = status
  },
  [types.CHANGE_MEMBER_LIST_PAGE_NUM](state, num) {
    state.filters.pageIndex = num
  }
}

export default {
  state,
  actions,
  getters,
mutations}
