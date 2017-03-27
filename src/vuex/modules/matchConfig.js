/**
 * @desc 赛事配置相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'

/**
 * state 定义
 */
const state = {
  list: [],
  details: {
    id: '',
    name: '',
    url: '',
    type: '',
    subType: '',
    status: false,
    online: false,
    holder: '',
    description: ''
  },
  filters: {
    name: '',
    status: '',
    type: ''
  },
  addForm: {

  }
}

/**
 * Getter 定义
 */
const getters = {
  matchConfig_List: state => state.list,
  matchConfigDetails: state => state.details,
  matchConfigFilters: state => state.filters,
  addMatchConfigForm: state => state.addForm
}

/**
 * actions 定义
 */
const actions = {
  /**
  * 获取赛事配置列表
  */
  getMatchConfigList({ state, commit, rootState }) {
    commit(types.COM_LIST_LOADING_STATUS, true)
    let requestData = {}
    Object.assign(requestData, state.filters, {'pageIndex': rootState.com.pageIndex,'pageSize': rootState.com.pageSize})
    api.GetMatchConfigList(requestData)
      .then(res => {
        commit(types.COM_LIST_LOADING_STATUS, false)
        commit(types.COM_LIST_TOTAL_COUNT, res.count)
        commit(types.GET_MATCH_CONFIG_LIST, res)
      }).catch(error => {
      commit(types.COM_LIST_LOADING_STATUS, false)
    })
  },
  /**
   * @desc 获取赛事配置详情
   */
  getMatchConfigDetails({commit}, palyload) {
    commit(types.COM_EDIT_FORM_VISIBLE, true)
    api.GetMatchConfigDetails(palyload).then(res => {
      commit(types.GET_MATCH_CONFIG_DETAILS, res)
    })
  },
  /**
   * @desc 添加赛事配置
   */
  addMatchConfig({commit}, palyload) {
    return api.AddMatchConfig(state.addForm).then(res => {
      commit(types.COM_ADD_FORM_VISIBLE, false)
    })
  },
  /**
   * @desc 编辑赛事配置
   */
  editMatchConfig({commit}, palyload) {
    let data = state.details
    data.status = state.details.status ? '1' : '2'

    return api.EditMatchConfig(data).then(res => {
      commit(types.COM_EDIT_FORM_VISIBLE, false)
    })
  },
  /**
  * @desc 删除赛事配置
  */
  delMatchConfig({commit}, id) {
    return api.DelMatchConfig({id: id,status: '3'}).then(res => {
    })
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_MATCH_CONFIG_LIST](state, data) {
    state.list = []
    if (data && data.rows && data.rows.length) {
      data.rows.forEach(oRow => {
        state.list.push(oRow)})
    }
  },
  [types.GET_MATCH_CONFIG_DETAILS](state, data) {
    let tmpData = {
      'id': data.id,
      'name': data.name,
      'type': data.Type.id.toString(),
      'subType': data.subType.val.toString(),
      'online': data.online,
      'url': data.url,
      'status': data.status == '1' ? true : false,
      'holder': data.holder,
      'description': data.description
    }
    state.details = tmpData
  }
}

export default {
  state,
  actions,
  getters,
mutations}