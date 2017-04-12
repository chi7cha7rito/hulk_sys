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
    type: '',
    subType: ''
  },
  addForm: {
    name: '',
    url: '',
    type: '',
    subType: '',
    status: '1',
    online: false,
    holder: '',
    description: ''
  },
  matchPricesAddForm: {
    priceList: [{
      type: '1',
      price: '0',
      points: '0',
      limitation: '0',
      status: true
    }]
  },
  matchPricesEditForm: {
    priceList: []
  },
  matchRewardAddForm: {
    rewardList: [{
      ranking: '1',
      rewardPoints: '0',
      remark: '',
      status: true
    }]
  },
  matchRewardEditForm: {
    rewardList: []
  }
}

/**
 * Getter 定义
 */
const getters = {
  matchConfig_List: state => state.list,
  matchConfigDetails: state => state.details,
  matchConfigFilters: state => state.filters,
  addMatchConfigForm: state => state.addForm,
  matchPricesEditForm: state => state.matchPricesEditForm,
  matchPricesAddForm: state => state.matchPricesAddForm,
  matchRewardEditForm: state => state.matchRewardEditForm,
  matchRewardAddForm: state => state.matchRewardAddForm
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
      commit(types.MATCH_CONFIG_PRICE_EDIT_FORM, res)
    })
  },
  /**
   * @desc 添加赛事配置
   */
  addMatchConfig({state, commit}, palyload) {
    let data = state.addForm
    let tmpPriceList = [],tmpRewardList = []
    data.status = state.addForm.status ? '1' : '2'

    // make priceList
    if (state.matchPricesAddForm.priceList && state.matchPricesAddForm.priceList.length) {
      state.matchPricesAddForm.priceList.forEach(oPrice => {
        tmpPriceList.push({
          'type': oPrice.type,
          'price': oPrice.price,
          'points': oPrice.points,
          'status': oPrice.status ? '1' : '2',
          'limitation': oPrice.limitation ? oPrice.limitation : '0'
        })
      })
    }

    data.priceList = tmpPriceList

    // make rewardList
    if (state.matchRewardAddForm.rewardList && state.matchRewardAddForm.rewardList.length) {
      state.matchRewardAddForm.rewardList.forEach(oReward => {
        tmpRewardList.push({
          'ranking': oReward.ranking,
          'rewardPoints': oReward.rewardPoints,
          'status': oReward.status ? '1' : '2'
        })
      })
    }

    data.rewardList = tmpRewardList
    return api.AddMatchConfig(state.addForm).then(res => {
      commit(types.COM_ADD_FORM_VISIBLE, false)
    })
  },
  /**
   * @desc 编辑赛事配置
   */
  editMatchConfig({state, commit}, palyload) {
    let data = state.details
    let tmpPriceList = [],tmpRewardList = []
    // data.status = state.details.status ? '1' : '2'

    // make priceList
    if (state.matchPricesEditForm.priceList && state.matchPricesEditForm.priceList.length) {
      state.matchPricesEditForm.priceList.forEach(oPrice => {
        tmpPriceList.push({
          'type': oPrice.type,
          'price': oPrice.price,
          'points': oPrice.points,
          'status': oPrice.status,
          'limitation': oPrice.limitation
        })
      })
    }

    data.priceList = tmpPriceList

    // make rewardList
    if (state.matchRewardEditForm.rewardList && state.matchRewardEditForm.rewardList.length) {
      state.matchRewardEditForm.rewardList.forEach(oReward => {
        tmpRewardList.push({
          'ranking': oReward.ranking,
          'rewardPoints': oReward.rewardPoints,
          'remark': oReward.remark,
          'status': oReward.status ? '1' : '2'
        })
      })
    }

    data.rewardList = tmpRewardList

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
      'status': data.status.toString(),
      'holder': data.holder,
      'description': data.description
    }
    state.details = tmpData
  },
  [types.MATCH_CONFIG_PRICE_EDIT_FORM](state, res) {
    let tmpList = []

    if (res.matchPrices && res.matchPrices.length) {
      res.matchPrices.forEach(oPrice => {
        tmpList.push({
          'type': oPrice.type.toString(),
          'price': oPrice.price.toString(),
          'points': oPrice.points.toString(),
          'status': oPrice.status == '1' ? true : false,
          'limitation': oPrice.limitation ? oPrice.limitation : '0',
          'key': new Date()
        })
      })
    }

    state.matchPricesEditForm.priceList = tmpList

    if (res.matchRewards && res.matchRewards.length) {
      tmpList = []
      res.matchRewards.forEach(oReward => {
        tmpList.push({
          'ranking': oReward.ranking.toString(),
          'rewardPoints': oReward.rewardPoints.toString(),
          'remark': oReward.remark,
          'status': oReward.status == '1' ? true : false,
          'key': new Date()
        })
      })
    }

    state.matchRewardEditForm.rewardList = tmpList
  },
  [types.ADD_MATCH_CONFIG_PRICE_IN_FORM](state, type) {
    let price = {
      'type': '',
      'price': '',
      'points': '',
      'status': true,
      'key': new Date()
    }
    if (type == 'edit') {
      state.matchPricesEditForm.priceList.push(price)
    }else if (type == 'add') {
      state.matchPricesAddForm.priceList.push(price)
    }
  },
  [types.DEL_MATCH_CONFIG_PRICE_IN_FORM](state, payload) {
    var index
    if (payload.type == 'edit') {
      index = state.matchPricesEditForm.priceList.indexOf(payload.item)
      if (index !== -1) {
        state.matchPricesEditForm.priceList.splice(index, 1)
      }
    }else if (payload.type == 'add') {
      index = state.matchPricesAddForm.priceList.indexOf(payload.item)
      if (index !== -1) {
        state.matchPricesAddForm.priceList.splice(index, 1)
      }
    }
  },
  [types.ADD_MATCH_CONFIG_REWARD_IN_FORM](state, type) {
    let tmpReward = {
      'ranking': '',
      'rewardPoints': '',
      'remark': '',
      'status': true,
      'key': new Date()
    }
    if (type == 'edit') {
      state.matchRewardEditForm.rewardList.push(tmpReward)
    }else if (type == 'add') {
      state.matchRewardAddForm.rewardList.push(tmpReward)
    }
  },
  [types.DEL_MATCH_CONFIG_REWARD_IN_FORM](state, payload) {
    var index
    if (payload.type == 'edit') {
      index = state.matchRewardEditForm.rewardList.indexOf(payload.item)
      if (index !== -1) {
        state.matchRewardEditForm.rewardList.splice(index, 1)
      }
    }else if (payload.type == 'add') {
      index = state.matchRewardAddForm.rewardList.indexOf(payload.item)
      if (index !== -1) {
        state.matchRewardAddForm.rewardList.splice(index, 1)
      }
    }
  },
  [types.RESET_MATCH_CONFIG_ADD_FORM](state) {
    state.matchPricesAddForm.priceList = [{
      type: '1',
      price: '0',
      points: '0',
      status: true
    }]

    state.matchRewardAddForm.rewardList = [
      {
        ranking: '1',
        rewardPoints: '0',
        remark: '',
        status: true
      }
    ]

    state.addForm = {
      name: '',
      url: '',
      type: '',
      subType: '',
      status: true,
      online: false,
      holder: '',
      description: ''
    }
  }
}

export default {
  state,
  actions,
  getters,
mutations}
