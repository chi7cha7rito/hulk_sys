import * as types from '../types'

/**
 * App通用配置
 */
const state = {
  loading: false,
  listLoading: false, // 查询列表loading状态的显示
  total: 0, // 查询列表的总数量
  editFormVisible: false, // 弹框编辑Form的显示状态
  addFormVisible: false, // 弹框添加Form的显示状态,
  pageIndex: 1, // 全局的页面维护
  pageSize: 10 // 全局的pageSize 定义
}

const actions = {
  /**
   * @desc 设置全局的loading 状态
   * @param {*} param0 
   * @param {*} status 
   */
  setLoadingState({ commit }, status) {
    commit(types.COM_LOADING_STATUS, status)
  },
  /**
   * @desc 设置查询列表的loading 状态
   * @param {*} param0 
   * @param {*} status 
   */
  setListLoadingState({commit}, status) {
    commit(types.COM_LIST_LOADING_STATUS, status)
  },
  /**
   * @desc 设置编辑弹框Form的显示状态
   * @param {*} param0 
   * @param {*} status 
   */
  setEditFormVisible({commit}, status) {
    commit(types.COM_EDIT_FORM_VISIBLE, status)
  },
  /**
   * @desc 设置添加弹框Form的显示状态
   * @param {*} param0 
   * @param {*} status 
   */
  setAddFormVisible({commit}, status) {
    commit(types.COM_ADD_FORM_VISIBLE, status)
  },
  /**
   * @desc 设置列表的total
   * @param {*} param0 
   * @param {*} status 
   */
  setListTotalCount({commit}, status) {
    commit(types.COM_LIST_TOTAL_COUNT, status)
  },
  /**
   * @desc 修改PageIndex
   */
  setPageIndex({commit}, num) {
    commit(types.COM_PAGE_NUM, num)
  }
}

const getters = {
  loading: state => state.loading,
  listLoading: state => state.listLoading,
  total: state => state.total,
  editFormVisible: state => state.editFormVisible,
  addFormVisible: state => state.addFormVisible,
  pageIndex: state => state.pageIndex
}

const mutations = {
  [types.COM_LOADING_STATUS](state, status) {
    state.loading = status
  },
  [types.COM_LIST_LOADING_STATUS](state, status) {
    state.listLoading = status
  },
  [types.COM_LIST_TOTAL_COUNT](state, status) {
    state.total = status
  },
  [types.COM_EDIT_FORM_VISIBLE](state, status) {
    state.editFormVisible = status
  },
  [types.COM_ADD_FORM_VISIBLE](state, status) {
    state.addFormVisible = status
  },
  [types.COM_PAGE_NUM](state, index) {
    state.pageIndex = index
  }
}

export default {
  state,
  actions,
  getters,
mutations}
