/**
 * @desc 用户登录相关的actions 和 mutations,state 定义
 */

import api from '../../fetch/api'
import * as types from '../types'
import util from '../../common/js/util'

const state = {
  // 用户登录状态
  loginStatus: false,
  // 用户登录信息
  userInfo: {},
  // 用户数据信息
  userData: []
}

const actions = {
  /**
   * 用户登录
   */
  setUserInfo({ commit }, res) {
    util.removeUserInfo()
    util.setUserInfo(JSON.stringify({'id': res.id,'roleType': res.roleType.val}))
    commit(types.SET_USER_INFO, res)
    commit(types.SET_LOGIN_STATUS, true)
  },

  /**
   * 退出登录
   */
  setSignOut({ commit }) {
    util.removeUserInfo()
    commit(types.SET_LOGIN_STATUS, false)
    commit(types.SET_USER_INFO, {})
  },

  /**
   * 请求用户信息
   */
  getUserData({ commit }, id) {
    commit(types.COM_LOADING_STATUS, true)
    api.UserInfo(id)
      .then(res => {
        commit(types.COM_LOADING_STATUS, false)
        commit(types.GET_USER_DATA, res.data)
      })
  }
}

const getters = {
  getUserData: state => state.userData,
  loginStatus: state => state.loginStatus,
  userInfo: state => state.userInfo
}

const mutations = {
  [types.SET_USER_INFO](state, res) {
    state.userInfo = res
  },

  [types.SET_LOGIN_STATUS](state, status) {
    state.loginStatus = status
  },

  [types.GET_USER_DATA](state, res) {
    state.userData = res
  }
}

export default {
  state,
  actions,
  getters,
mutations}
