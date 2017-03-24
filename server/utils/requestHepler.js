/**
 * @desc request helper
 */

var axios = require('axios')
var qs = require('qs')
var md5 = require('md5')
var appConfig = require('../config/app.json')

// axios 配置
axios.defaults.timeout = 5000

axios.defaults.headers.common['hulk_token'] = md5(appConfig.soa.token)
axios.defaults.baseURL = 'http://localhost:7001/'

/**
 * desc 定义统一的返回信息
 */
axios.interceptors.response.use(function (res) {
  return res.data
}, function (error) {
  return Promise.reject(error)
})

function RequestHepler () {
  this.axios = axios
}

/**
 * desc 统一的请求get方法
 */
RequestHepler.prototype.call = function (url, method, params) {
  var classSelf = this

  var urlStr = url.replace(/\//g, '_')

  params = params || {}

  logger.info('hulk_sys' + urlStr + '_request_data==>' + JSON.stringify(params))

  if (method.toUpperCase() == 'GET') {
    return new Promise(function (resolve, reject) {
      classSelf.axios.get(url, {
        params: params
      }).then(function (res) {
        logger.info('hulk_sys' + urlStr + '_response==>' + JSON.stringify(res))
        resolve(res)
      }, function (err) {
        reject(err)
      }).catch(function (error) {
        logger.info('hulk_sys_' + urlStr + '_error==>' + error)
        reject(error)
      })
    })
  }
  else if (method.toUpperCase() == 'POST') {
    return new Promise(function (resolve, reject) {
      classSelf.axios({
        method:'POST',
        url:url,
        data:JSON.stringify(params),
        headers:{
          'Content-Type':'application/json'
        }
      }).then(function (res) {
        logger.info('hulk_sys' + urlStr + '_response==>' + JSON.stringify(res))
        resolve(res)
      }, function (err) {
        reject(err)
      }).catch(function (error) {
        logger.info('hulk_sys_' + urlStr + '_error==>' + error)
        reject(error)
      })
    })
  }
}

module.exports = new RequestHepler()
