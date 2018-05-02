/**
 * @desc 余额积分调整的定义
 */
import * as types from '../types'
import api from '../../fetch/api'

/**
 * state 定义
 */
const state = {
  balanceChange: {
    phoneNo: '',
    type: '',
    amount: '',
    source: 10, // 手工调整
    sourceNo: '',
    remark: ''
  },
  pointChange: {
    phoneNo: '',
    type: '',
    points: '',
    source: 5, // 手工调整
    sourceNo: '',
    remark: ''
  },
  spritChange: {
    phoneNo: '',
    type: '',
    amout: ''
  },
  masterChange: {
    phoneNo: '',
    type: '',
    count: '',
    rank: '',
    amout: '',
    remark: '',
    points: '',
    sourceNo: '',
    price: '',
    matchAttendanceCount: ''
  },
  totalBalance: 0,
  totalPoints: 0
}

/**
 * Getter 定义
 */
const getters = {
  balanceChange: state => state.balanceChange,
  pointChange: state => state.pointChange,
  totalAvlBalance: state => state.totalBalance,
  masterChange: state => state.masterChange,
  totalAvlPoints: state => state.totalPoints
}

/**
 * actions 定义
 */
const actions = {
  /**
    * @desc 余额调整
    */
  balanceChange({ commit }, palyload) {
    if (state.balanceChange.type.toString() === '3') {
      state.balanceChange.source = 10
      return api.BalanceIncrease(state.balanceChange).then(res => {
      })
    } else if (state.balanceChange.type.toString() === '6') {
      state.balanceChange.source = 10
      return api.BalanceDecrease(state.balanceChange).then(res => {
      })
    } else if (state.balanceChange.type.toString() === '4') {
      state.balanceChange.source = 9
      return api.BalanceDecrease(state.balanceChange).then(res => {
      })
    }
  },
  /**
   * @desc 获取余额
   */
  getTotalAvlBalance({ commit }) {
    api.TotalBalanceByPhoneNo({ phoneNo: state.balanceChange.phoneNo }).then(res => {
      commit(types.GET_TOTAL_BALANCE, res)
    })
  },
  clearTotalAvlBalance({ commit }) {
    commit(types.GET_TOTAL_BALANCE, 0)
  },
  /**
    * @desc 积分调整
    */
  pointChange({ commit }, palyload) {
    if (state.pointChange.type.toString() === '3') {
      return api.PointIncrease(state.pointChange).then(res => {
      })
    } else if (state.pointChange.type.toString() === '4') {
      return api.PointDecrease(state.pointChange).then(res => {
      })
    }
  },
  /**
   * @desc 获取积分
   */
  getTotalAvlPoints({ commit }) {
    api.TotalPointsByPhoneNo({ phoneNo: state.pointChange.phoneNo }).then(res => {
      commit(types.GET_TOTAL_POINTS, res)
    })
  },
  clearTotalAvlPoints({ commit }) {
    commit(types.GET_TOTAL_POINTS, 0)
  },

  /**
   * 获取赛事参加的人数
   * @param {*} param0 
   * @param {*} id 
   */
  getMemberMatchAttendanceCount({ commit }, id) {
    return api.GetAttendancesByMatchId({ matchId: id }).then(res => {
      commit(types.GET_MATCH_MEMBER_ATTENDANCE_COUNT, res)
    })
  },

  /**
   * 大师分调整
   * @param {*} param0 
   * @param {*} palyload 
   */
  masterPointChange({ commit }, palyload) {
    let request = {
      phoneNo: state.masterChange.phoneNo,
      type: state.masterChange.type,
      point: state.masterChange.points,
      remark:state.masterChange.remark
    }

    if (state.masterChange.type == "4"/*赛事调整*/) {
      request.sourceNo = state.masterChange.sourceNo
    }

    if (state.masterChange.type == "5"/*负调整*/) {
      request.point = -request.point;
    }

    return api.SpritAdjust(request).then(res => {
    })
  }
}

/**
 * mutations 定义
 */
const mutations = {
  [types.GET_TOTAL_BALANCE](state, data) {
    state.totalBalance = data
  },
  [types.GET_TOTAL_POINTS](state, data) {
    state.totalPoints = data
  },
  [types.GET_MATCH_MEMBER_ATTENDANCE_COUNT](state, res) {
    state.masterChange.matchAttendanceCount = res.count
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
