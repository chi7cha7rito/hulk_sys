// 公共
export const COM_LOADING_STATUS = 'COM_LOADING_STATUS' // 全局的loading status
export const COM_LIST_LOADING_STATUS = 'COM_LIST_LOADING_STATUS' // 查询列表loading状态的显示
export const COM_LIST_TOTAL_COUNT = 'COM_LIST_TOTAL_COUNT' // 查询列表的总数量
export const COM_EDIT_FORM_VISIBLE = 'COM_EDIT_FORM_VISIBLE' // 弹框编辑Form的显示状态
export const COM_ADD_FORM_VISIBLE = 'COM_ADD_FORM_VISIBLE' // 弹框添加Form的显示状态
export const COM_PAGE_NUM = 'COM_PAGE_NUM' // 页码

/**
 * desc 用户登录相关
 */
export const SET_USER_INFO = 'SETUSERINFO' // 设置用户信息
export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS' // 设置登录状态
export const GET_USER_DATA = 'GET_USER_DATA' // 获取用户数据信息

/**
 * desc 赛事相关
 */
export const GET_MATCH_LIST = 'GET_MATCH_LIST' // 获取赛事列表
export const GET_MATCH_TYPE_LIST = 'GET_MATCH_TYPE_LIST' // 赛事类型列表
export const GET_MATCH_DETAILS = 'GET_MATCH_DETAILS' // 赛事详情
export const EDIT_MATCH = 'EDIT_MATCH' // 编辑赛事信息
export const ADD_MATCH = 'ADD_MATCH' // 添加赛事信息
export const GET_ALL_MATCH_CONFIGS = 'GET_ALL_MATCH_CONFIGS' // 所有的赛事配置信息

/**
 * desc 会员相关
 */
export const GET_MEMBER_LIST = 'GET_MEMBER_LIST' // 获取会员列表
export const GET_MEMBER_LOADING_STATUS = 'GET_MEMBER_LOADING_STATUS' // 获取会员列表loading状态
export const GET_MEMBER_TOTAL_COUNT = 'GET_MEMBER_TOTAL_COUNT' // 会员列表的总数
export const CHANGE_MEMBER_LIST_PAGE_NUM = 'CHANGE_MEMBER_LIST_PAGE_NUM' // 更改会员列表页分页的页码
export const GET_MEMBER_LEVEL = 'GET_MEMBER_LEVEL' // 获取会员等级
export const GET_MEMBER_DETAILS = 'GET_MEMBER_DETAILS' // 会员详情
export const GET_MEMBER_BP = 'GET_MEMBER_BP' // 会员详情
export const MEMBER_LIST_EDIT_FORM_VISIBLE = 'MEMBER_LIST_EDIT_FORM_VISIBLE' // 会员列表EDIT FORM 显示状态
export const MEMBER_LIST_BP_FORM_VISIBLE = 'MEMBER_LIST_BP_FORM_VISIBLE' // 会员列表BP FORM 显示状态

/**
 * desc 余额相关
 */
export const GET_BALANCE_LIST = 'GET_BALANCE_LIST' // 获取余额列表
export const GET_BALANCE_LOADING_STATUS = 'GET_BALANCE_LOADING_STATUS' // 获取余额列表loading状态
export const GET_BALANCE_TOTAL_COUNT = 'GET_BALANCE_TOTAL_COUNT' // 余额列表的总数
export const CHANGE_BALANCE_LIST_PAGE_NUM = 'CHANGE_BALANCE_LIST_PAGE_NUM' // 更改余额列表页分页的页码

/**
 * desc 积分相关
 */
export const GET_POINTS_LIST = 'GET_POINTS_LIST' // 获取积分列表
export const GET_POINTS_LOADING_STATUS = 'GET_POINTS_LOADING_STATUS' // 获取积分列表loading状态
export const GET_POINTS_TOTAL_COUNT = 'GET_POINTS_TOTAL_COUNT' // 积分列表的总数
export const CHANGE_POINTS_LIST_PAGE_NUM = 'CHANGE_POINTS_LIST_PAGE_NUM' // 更改积分列表页分页的页码

/**
 * desc 豪气相关
 */
export const GET_SPRIT_LIST = 'GET_SPRIT_LIST' // 获取豪气列表
export const GET_SPRIT_LOADING_STATUS = 'GET_SPRIT_LOADING_STATUS' // 获取豪气列表loading状态
export const GET_SPRIT_TOTAL_COUNT = 'GET_SPRIT_TOTAL_COUNT' // 豪气列表的总数
export const CHANGE_SPRIT_LIST_PAGE_NUM = 'CHANGE_SPRIT_LIST_PAGE_NUM' // 更改豪气列表页分页的页码

/**
 * desc 签到相关
 */
export const GET_SIGNIN_LIST = 'GET_SIGNIN_LIST' // 获取签到列表
export const GET_SIGNIN_LOADING_STATUS = 'GET_SIGNIN_LOADING_STATUS' // 获取签到列表loading状态
export const GET_SIGNIN_TOTAL_COUNT = 'GET_SIGNIN_TOTAL_COUNT' // 签到列表的总数
export const CHANGE_SIGNIN_LIST_PAGE_NUM = 'CHANGE_SIGNIN_LIST_PAGE_NUM' // 更改签到列表页分页的页码

/**
 * desc 优惠券相关
 */
export const GET_COUPON_LIST = 'GET_COUPON_LIST' // 获取优惠券列表
export const GET_COUPON_LOADING_STATUS = 'GET_COUPON_LOADING_STATUS' // 获取优惠券列表loading状态
export const GET_COUPON_TOTAL_COUNT = 'GET_COUPON_TOTAL_COUNT' // 优惠券列表的总数
export const CHANGE_COUPON_LIST_PAGE_NUM = 'CHANGE_COUPON_LIST_PAGE_NUM' // 更改优惠券列表页分页的页码
export const COUPON_LIST_ADD_FORM_VISIBLE = 'COUPON_LIST_ADD_FORM_VISIBLE' // 优惠券列表EDIT FORM 显示状态

/**
 * desc 赛事配置相关
 */
export const GET_MATCH_CONFIG_LIST = 'GET_MATCH_CONFIG_LIST' // 获取赛事配置列表
export const GET_MATCH_CONFIG_DETAILS = 'GET_MATCH_CONFIG_DETAILS' // 赛事配置详情
export const EDIT_MATCH_CONFIG = 'EDIT_MATCH_CONFIG' // 编辑赛事配置信息
export const ADD_MATCH_CONFIG = 'ADD_MATCH_CONFIG' // 添加赛事配置信息
export const MATCH_CONFIG_PRICE_EDIT_FORM='MATCH_CONFIG_PRICE_EDIT_FORM'  //赛事配置价格配置的Form
export const ADD_MATCH_CONFIG_PRICE_IN_FORM='ADD_MATCH_CONFIG_PRICE_IN_FORM'  //在赛事配置编辑Form 添加一个价格
export const DEL_MATCH_CONFIG_PRICE_IN_FORM='DEL_MATCH_CONFIG_PRICE_IN_FORM'  //在赛事配置编辑Form 删除价格
export const ADD_MATCH_CONFIG_REWARD_IN_FORM='ADD_MATCH_CONFIG_REWARD_IN_FORM'  //在赛事配置编辑Form 添加奖励规则
export const DEL_MATCH_CONFIG_REWARD_IN_FORM='DEL_MATCH_CONFIG_REWARD_IN_FORM'  //在赛事配置编辑Form 删除奖励规则
export const RESET_MATCH_CONFIG_ADD_FORM='RESET_MATCH_CONFIG_ADD_FORM'// 重置添加表单的数据

/**
 * desc 用户管理相关
 */
export const GET_SYSUSER_LIST = 'GET_SYSUSER_LIST' // 获取赛事列表
export const GET_SYSUSER_TYPE_LIST = 'GET_SYSUSER_TYPE_LIST' // 赛事类型列表
export const GET_SYSUSER_DETAILS = 'GET_SYSUSER_DETAILS' // 赛事详情
export const EDIT_SYSUSER = 'EDIT_SYSUSER' // 编辑赛事信息
export const ADD_SYSUSER = 'ADD_SYSUSER' // 添加赛事信息

/**
 * desc 会员等级相关
 */
export const GET_MEMBERLEVEL_LIST = 'GET_MEMBERLEVEL_LIST' // 获取会员等级列表
export const GET_MEMBERLEVEL_TYPE_LIST = 'GET_MEMBERLEVEL_TYPE_LIST' // 会员等级类型列表
export const GET_MEMBERLEVEL_DETAILS = 'GET_MEMBERLEVEL_DETAILS' // 会员等级详情
export const EDIT_MEMBERLEVEL = 'EDIT_MEMBERLEVEL' // 编辑会员等级信息
export const ADD_MEMBERLEVEL = 'ADD_MEMBERLEVEL' // 添加会员等级信息

/**
 * desc 充值返现相关
 */
export const GET_RECHARGESETUP_LIST = 'GET_RECHARGESETUP_LIST' // 获取充值返现列表
export const GET_RECHARGESETUP_TYPE_LIST = 'GET_RECHARGESETUP_TYPE_LIST' // 充值返现类型列表
export const GET_RECHARGESETUP_DETAILS = 'GET_RECHARGESETUP_DETAILS' // 充值返现详情
export const EDIT_RECHARGESETUP = 'EDIT_RECHARGESETUP' // 编辑充值返现信息
export const ADD_RECHARGESETUP = 'ADD_RECHARGESETUP' // 添加充值返现信息
