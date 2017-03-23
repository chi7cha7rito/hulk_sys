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
   * @desc 获取所有的赛事配置信息
   */
  GetAllMatchConfigs(){
    return fetch('/matchConfig/findAll','get')
  }
}
