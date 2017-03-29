/**
 * @desc 用户相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'
import utils from '../../common/js/util'

/**
 * state 定义
 */
const state = {
  sysUserList: [],
  sysUserTypeList: [],
  sysUserConfigList: [],
  sysUserDetails: {
      'id': '',
      'phoneNo': '',
      'name': '',
      'idCardNo': '',
      'gender': '',
      'roleType': '',
      'status': '',
      'createdAt': '',
      'updatedAt': ''
  },
  filters: {
    pageSize: 10,
    pageIndex: 1,
    name: '',
    phoneNo: '',
    idCardNo: '',
    gender: '',
    roleType: '',
    status:''
  },
  addForm: {
    name: '',
    phoneNo: '',
    idCardNo: '',
    gender: '',
    roleType: '',
    status:''
  }
}

/**
 * Getter 定义
 */
const getters = {
  sysUserList: state => state.sysUserList,
  sysUserTypeList: state => state.sysUserTypeList,
  sysUserConfigList: state => state.sysUserConfigList,
  sysUserDetails: state => state.sysUserDetails,
  sysUserFilters: state => state.filters,
  sysUserAddForm: state => state.addForm
}

/**
 * actions 定义
 */
const actions = {
  /**
   * 获取用户列表
   */
  getSysUserList({ state, commit, rootState }) {
    commit(types.COM_LIST_LOADING_STATUS, true)
    let requestData = {}
    Object.assign(requestData, state.filters, {'pageIndex': rootState.com.pageIndex,'pageSize': rootState.com.pageSize})
    api.GetSysUserList(requestData)
      .then(res => {
        commit(types.COM_LIST_LOADING_STATUS, false)
        commit(types.COM_LIST_TOTAL_COUNT, res.count)
        commit(types.GET_SYSUSER_LIST, res)
      }).catch(error => {
      commit(types.COM_LIST_LOADING_STATUS, false)
    })
  },
  /**
   * @desc 获取用户详情
   */
  getSysUserDetails({commit}, palyload) {
    commit(types.COM_EDIT_FORM_VISIBLE, true)
    api.GetSysUserDetails(palyload).then(res => {
      commit(types.GET_SYSUSER_DETAILS, res)
    })
  },
  /**
   * @desc 添加用户
   */
  addSysUser({commit}, palyload) {
    return api.AddSysUser(state.addForm).then(res => {
      commit(types.COM_ADD_FORM_VISIBLE, false)
    })
  },
  /**
   * @desc 编辑用户
   */
  editSysUser({commit}, palyload) {
    let data = state.sysUserDetails
    return api.EditSysUser(data).then(res => {
      commit(types.COM_EDIT_FORM_VISIBLE, false)
    })
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_SYSUSER_LIST](state, data) {
    state.sysUserList = []
    if (data && data.rows && data.rows.length) {
      data.rows.forEach(oRow => {
        state.sysUserList.push(oRow)})
    }
  },
  [types.GET_SYSUSER_TYPE_LIST](state, data) {
    state.sysUserTypeList = data
  },
  [types.GET_SYSUSER_DETAILS](state, data) {
    let tmpData = {
      'id': data.id,
      'phoneNo': data.phoneNo,
      'name': data.name,
      'idCardNo': data.idCardNo,
      'gender': data.gender.val.toString(),
      'roleType': data.roleType.val.toString(),
      'status': data.status.toString(),
      'createdAt': new Date(data.createdAt),
      'updatedAt': new Date(data.updatedAt)
    }
    state.sysUserDetails = tmpData
  },
  [types.GET_ALL_SYSUSER_CONFIGS](state, data) {
    let configList = []
    data.forEach(row => {
      configList.push({id: row.id,name: row.name})})

    state.sysUserConfigList = configList
  },
  [types.CHANGE_SYSUSER_LIST_PAGE_NUM](state, num) {
    state.filters.pageIndex = num
  }
}

export default {
  state,
  actions,
  getters,
mutations}
