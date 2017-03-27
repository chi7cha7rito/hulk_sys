import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://localhost:3000/'

// POST传参序列化
// axios.interceptors.request.use((config) => {
//     if(config.method  === 'post'){
//         config.data = qs.stringify(config.data)
//     }
//     return config
// },(error) =>{
//      _.toast("错误的传参", 'fail')
//     return Promise.reject(error)
// })

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
    return fetch('/account/login', 'post', params)
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
    return fetch('/matchConfig/create', 'post', params)
  },
  /**
   * @desc 编辑赛事配置
   * @param {} params 
   */
  EditMatchConfig(params) {
    return fetch('/matchConfig/update', 'post', params)
  },
  /**
   * @desc 删除赛事配置
   * @param {} params 
   */
  DelMatchConfig(params) {
    return fetch('/matchConfig/changeStatus', 'post', params)
  }
}
