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

  },
  pricesConfigs: [{
    id: '1',
    name: '线上价格'
  }, {
    id: '2',
    name: '原价'
  },
    {
      id: '3',
      name: '高级会员价'
    },
    {
      id: '4',
      name: '豪客价'
    }, {
      id: '5',
      name: '豪爵价'
    }, {
      id: '6',
      name: '优惠价'
    }
  ],
  matchPricesEditForm: {
    priceList: []
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
  pricesConfigs: state => state.pricesConfigs
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
  },
  [types.MATCH_CONFIG_PRICE_EDIT_FORM](state, res) {
    let tmpList = []

    if (res.matchPrices && res.matchPrices) {
      res.matchPrices.forEach(oPrice => {
        tmpList.push({
          'type': oPrice.type.val.toString(),
          'price': oPrice.price.toString(),
          'points': oPrice.points,
          'status': oPrice.status == '1' ? true : false,
          'key': new Date()
        })
      })
    }

    state.matchPricesEditForm.priceList = tmpList
  },
  [types.ADD_MATCH_CONFIG_PRICE_IN_FORM](state, type) {
    let price = {
      'type': '',
      'price': '',
      'points': '',
      'status': true,
      'key': new Date()
    }

    state.matchPricesEditForm.priceList.push(price)
  },
  [types.DEL_MATCH_CONFIG_PRICE_IN_FORM](state, item) {
    var index = state.matchPricesEditForm.priceList.indexOf(item)
    if (index !== -1) {
      state.matchPricesEditForm.priceList.splice(index, 1)
    }
  }
}

export default {
  state,
  actions,
  getters,
mutations}
