/**
 * @desc 用户登录相关的actions 和 mutations,state 定义
 */

import api from '../../fetch/api'
import * as types from '../types'
import util from '../../common/js/util'
import md5 from 'md5'

const state = {
  // 用户登录状态
  loginStatus: false,
  // 用户登录信息
  userInfo: {},
  // 用户数据信息
  userData: [],
  // 修改密码
  changePassword: {
    id: '',
    originalPwd: '',
    newPwd: '',
    confirmPwd: ''
  },
  genVerifyCodeUrl:"/common/genVerifyCodeImg"
}

const actions = {
  /**
   * 用户登录
   */
  setUserInfo({ commit }, res) {
    util.removeUserInfo()
    util.setUserInfo(JSON.stringify({'id': res.id, 'roleType': res.roleType.val,'name':res.name}))
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
   * 重置密码
   */
  changePwd({ commit }, palyload) {
    let user = JSON.parse(util.getUserInfo())
    let data = state.changePassword
    data.id = user.id
    data.originalPwd = md5(state.changePassword.originalPwd)
    data.newPwd = md5(state.changePassword.newPwd)
    data.confirmPwd = md5(state.changePassword.confirmPwd)
    return api.EditPwd(data).then(res => {
      state.changePassword = {}
    })
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
  },
  changeVerifyCodeUrl({commit}){
    commit(types.CHANGE_VERIFY_CODE_URL)
  }
}

const getters = {
  getUserData: state => state.userData,
  loginStatus: state => state.loginStatus,
  userInfo: state => state.userInfo,
  changePassword: state => state.changePassword,
  genVerifyCodeUrl:(state,getters,rootState)=>{return rootState.com.domain+state.genVerifyCodeUrl}
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
  },
  [types.CHANGE_VERIFY_CODE_URL](state){
    state.genVerifyCodeUrl+="?t="+new Date().valueOf();
  }
}

export default {
  state,
  actions,
  getters,
mutations}
