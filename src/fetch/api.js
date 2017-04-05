import axios from 'axios'
import qs from 'qs'
import util from '../common/js/util'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://localhost:3000'

// POST传参序列化
axios.interceptors.request.use((config) => {
  let userInfo = util.getUserInfo()
  if (config.data.url != '/user/findByPhoneNo') {
    if (!userInfo) {
      throw new Error('invalid request for use session expired')
    }
    if (config.data.params) {
      config.data.params.operator = JSON.parse(userInfo).id.toString()
    }
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  if (res.status == '200' && res.data && res.data.status == '1') {
    return res.data
  }else {
    return Promise.reject(res.data)
  }
}, (error) => {
  console.log('网络异常')
  return Promise.reject(error)
})

export function fetch (url, method, params) {
  let requestData = {
    url,
    method,
  params}

  return new Promise((resolve, reject) => {
    axios.post('/api/common', requestData)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  /**
   * 用户登录
   */
  Login(params) {
    return fetch('/user/findByPhoneNo', 'get', params)
  },
  /**
  * 获取赛事列表
  */
  GetMatchList(params) {
    return fetch('/match/findMatches', 'get', params)
  },
  /**
   * 获取赛事列表
   */
  GetMatchTypeList(params) {
    return fetch('/matchType/findByPid', 'get')
  },
  /**
   * @desc 获取指定赛事的详情
   */
  GetMacthDetails(params) {
    return fetch('/match/findMatchById', 'get', params)
  },
  /**
   * @desc 编辑赛事详情
   * @param {} params 
   */
  EditMatch(params) {
    return fetch('/match/update', 'post', params)
  },
  /**
   * @desc 添加赛事
   * @param {} params 
   */
  AddMatch(params) {
    return fetch('/match/create', 'post', params)
  },
  /**
   * @desc 删除比赛
   * @param {} params 
   */
  DelMatch(params) {
    return fetch('/match/changeStatus', 'post', params)
  },
  /**
   * @desc 获取所有的赛事配置信息
   */
  GetAllMatchConfigs() {
    return fetch('/matchConfig/findAll', 'get')
  },
  /**
   * @desc 获取会员列表
   */
  GetMembers(params) {
    return fetch('/member/findMembers', 'get', params)
  },
  /**
   * @desc 获取会员等级
   */
  GetMemberLevel() {
    return fetch('/memberLevel/findAll', 'get')
  },
  /**
   * @desc 获取会员详情
   */
  GetMemberDetails(params) {
    return fetch('/member/findById', 'get', params)
  },
  /**
   * @desc 编辑会员详情
   * @param {} params 
   */
  EditMember(params) {
    return fetch('/member/update', 'post', params)
  },
  /**
   * @desc 获取会员余额积分
   * @param {} params 
   */
  GetMemberBP(params) {
    return fetch('/member/findTotal', 'get', params)
  },
  /**
   * @desc 获取余额纪录
   * @param {} params 
   */
  GetBalances(params) {
    return fetch('/balance/findEntries', 'get', params)
  },
  /**
   * @desc 获取积分纪录
   * @param {} params 
   */
  GetPoints(params) {
    return fetch('/point/findEntries', 'get', params)
  },
  /**
   * @desc 获取豪气排名列表
   * @param {} params 
   */
  GetSpritRanking(params) {
    return fetch('/sprit/spritRanking', 'get', params)
  },
  /**
   * @desc 获取签到排名列表
   * @param {} params 
   */
  GetSignInStats(params) {
    return fetch('/signIn/signInStats', 'get', params)
  },
  /**
   * @desc 获取优惠券列表
   * @param {} params 
   */
  GetCoupons(params) {
    return fetch('/coupon/findAll', 'get', params)
  },
  /**
   * @desc  新增优惠券
   * @param {} params 
   */
  AddCoupon(params) {
    return fetch('/coupon/create', 'post', params)
  },
  /**
   * @desc 作废优惠券
   * @param {} params 
   */
  WidthDrawCoupon(params) {
    return fetch('/coupon/update', 'post', params)
  },
  /**
   * @desc 获取赛事配置列表
   * @param {} params 
   */
  GetMatchConfigList(params) {
    return fetch('/matchConfig/findMatchConfigs', 'get', params)
  },
  /**
   * @desc 获取赛事配置详情
   * @param {} params 
   */
  GetMatchConfigDetails(params) {
    return fetch('/matchConfig/findMatchConfigById', 'get', params)
  },
  /**
   * @desc 添加赛事配置
   * @param {} params 
   */
  AddMatchConfig(params) {
    return fetch('/matchConfig/add', 'post', params)
  },
  /**
   * @desc 编辑赛事配置
   * @param {} params 
   */
  EditMatchConfig(params) {
    return fetch('/matchConfig/edit', 'post', params)
  },
  /**
   * @desc 删除赛事配置
   * @param {} params 
   */
  DelMatchConfig(params) {
    return fetch('/matchConfig/changeStatus', 'post', params)
  },
  /**
   * @desc 获取用户列表
   * @param {} params 
   */
  GetSysUserList(params) {
    return fetch('/user/findAll', 'get', params)
  },
  /**
    * @desc 获取用户信息
    * @param {} params 
    */
  GetSysUserDetails(params) {
    return fetch('/user/findById', 'get', params)
  },
  /**
    * @desc 更新用户信息
    * @param {} params 
    */
  EditSysUser(params) {
    return fetch('/user/update', 'post', params)
  },
  /**
    * @desc 新增用户信息
    * @param {} params 
    */
  AddSysUser(params) {
    return fetch('/user/create', 'post', params)
  },
  /**
   * @desc 重置密码
   */
  ResetPassword(params) {
    return fetch('/user/resetPwd', 'post', params)
  },
  /**
   * @desc 修改密码
   */
  EditPassword(params) {
    return fetch('/user/editPwd', 'post', params)
  },
  /**
   * @desc 获取所有有效的会员信息
   */
  FindAllMembers(params){
    return fetch('/member/findAllMembers', 'get', params)
  },
  /**
   * @desc 获取会员账户详情信息
   */
  FindAccountInfo(params){
    return fetch('/member/findAccountInfo', 'get', params)
  },
  /**
   * @desc 获取会员等级列表
   */
  GetMemberLevelList() {
    return fetch('/memberLevel/findAll', 'get')
  },
  /**
    * @desc 获取会员等级信息
    * @param {} params 
    */
  GetMemberLevelDetails(params) {
    return fetch('/memberLevel/findById', 'get', params)
  },
  /**
    * @desc 更新会员等级信息
    * @param {} params 
    */
  EditMemberLevel(params) {
    return fetch('/memberLevel/update', 'post', params)
  },
  /**
    * @desc 新增会员等级信息
    * @param {} params 
    */
  AddMemberLevel(params) {
    return fetch('/memberLevel/create', 'post', params)
  },
  /**
  * @desc 获取充值返现列表
  */
  GetRechargeSetupList() {
    return fetch('/rechargeSetup/findAll', 'get')
  },
  /**
    * @desc 获取充值返现信息
    * @param {} params 
    */
  GetRechargeSetupDetails(params) {
    return fetch('/rechargeSetup/findById', 'get', params)
  },
  /**
    * @desc 更新充值返现信息
    * @param {} params 
    */
  EditRechargeSetup(params) {
    return fetch('/rechargeSetup/update', 'post', params)
  },
  /**
    * @desc 新增充值返现信息
    * @param {} params 
    */
  AddRechargeSetup(params) {
    return fetch('/rechargeSetup/create', 'post', params)
  },
  /**
    * @desc 余额增加
    * @param {} params 
    */
  BalanceIncrease(params) {
    return fetch('/balance/increase', 'post', params)
  },
  /**
    * @desc 余额扣减
    * @param {} params 
    */
  BalanceDecrease(params) {
    return fetch('/balance/decrease', 'post', params)
  },
  /**
    * @desc 购买积分
    * @param {} params 
    */
  BuyPoints(params) {
    return fetch('/balance/buyPoints', 'post', params)
  },
  /**
   * @desc 获取余额
   * @param {} params 
   */
  TotalBalanceByPhoneNo(params) {
    return fetch('/balance/totalByPhoneNo', 'get', params)
  },
  /**
  * @desc 积分扣减
  * @param {} params 
  */
  PointDecrease(params) {
    return fetch('/point/decrease', 'post', params)
  },
  /**
  * @desc 积分增加
  * @param {} params 
  */
  PointIncrease(params) {
    return fetch('/point/increase', 'post', params)
  },
  /**
  * @desc 获取余额
  * @param {} params 
  */
  TotalPointsByPhoneNo(params) {
    return fetch('/point/totalByPhoneNo', 'get', params)
  },
  /**
  * @desc 获取参赛人员
  * @param {} params 
  */
  GetAttendances(params) {
    return fetch('/attendance/findAll', 'get', params)
  },
  /**
  * @desc 获取可报名赛事
  */
  GetAvailableMatches() {
    return fetch('/match/findAvailable', 'get')
  },
  /**
  * @desc 线下报名
  */
  CreateOffline(params){
    return fetch('/attendance/createOffline','post',params);
  },
  /**
  * @desc 购买筹码
  */
  BuyChips(params){
      return fetch('/chip/create','post',params);
  }
}
