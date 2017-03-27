/**
 * @desc 优惠券相关的定义
 */

import api from '../../fetch/api'
import * as types from '../types'

/**
 * state 定义
 */
const state = {
  couponList: [],
  listLoading: false,
  addFormVisible: false,
  total: 0,
  filters: {
    pageSize: 10,
    pageIndex: 1,
    phoneNo: '',
    type: '',
    status: '',
    startCreatedAt: '',
    endCreatedAt: ''
  },
  addForm: {
    memberId: '',
    type: '',
    subType: '',
    source: '',
    remark: ''
  }
}

/**
 * Getter 定义
 */
const getters = {
  couponList: state => state.couponList,
  couponListLoading: state => state.listLoading,
  couponTotal: state => state.total,
  couponFilters: state => state.filters,
  couponAddFormVisible: state => state.addFormVisible
}

/**
 * actions 定义
 */
const actions = {
  /**
   * 获取优惠券列表
   */
  getCouponList({ commit }) {
    commit(types.GET_COUPON_LOADING_STATUS, true)
    api.GetCoupons(state.filters)
      .then(res => {
        commit(types.GET_COUPON_LOADING_STATUS, false)
        commit(types.GET_COUPON_TOTAL_COUNT, res.count)
        commit(types.GET_COUPON_LIST, res)
      }).catch(error => {
      commit(types.GET_COUPON_LOADING_STATUS, false)
    })
  },
  /**
   * @desc 新增优惠券
   */
  addCoupon({commit}, palyload) {
    let data = state.couponDetails
    api.AddCoupon(data).then(res => {
      commit(types.COUPON_LIST_ADD_FORM_VISIBLE, false)
      commit(types.GET_COUPON_LOADING_STATUS, true)
      api.GetCoupons(state.filters)
        .then(res => {
          commit(types.GET_COUPON_LOADING_STATUS, false)
          commit(types.GET_COUPON_TOTAL_COUNT, res.count)
          commit(types.GET_COUPON_LIST, res)
        }).catch(error => {
        commit(types.GET_COUPON_LOADING_STATUS, false)
      })
    })
  },
  /**
  * @desc 作废优惠券
  */
  widthDrawCoupon({commit}, id) {
    return api.WidthDrawCoupon({id: id,status: '3'}).then(res => {
    })
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_COUPON_LIST](state, data) {
    state.couponList = []
    if (data && data.rows && data.rows.length) {
      data.rows.forEach(oRow => {
        state.couponList.push(oRow)})
    }
  },
  [types.GET_COUPON_LOADING_STATUS](state, status) {
    state.listLoading = status
  },
  [types.GET_COUPON_TOTAL_COUNT](state, count) {
    state.total = count
  },
  [types.COUPON_LIST_ADD_FORM_VISIBLE](state, status) {
    state.addFormVisible = status
  },
  [types.CHANGE_COUPON_LIST_PAGE_NUM](state, num) {
    state.filters.pageIndex = num
  }
}

export default {
  state,
  actions,
  getters,
mutations}
