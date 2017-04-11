var express = require('express')
var router = express.Router()

/**
 * node transaction
 */
router.post('/common', function (req, res, next) {
  try {
    var url = req.body.url
    var method = req.body.method
    var params = req.body.params

    // 对于登录请求特殊处理，需要判断当图形验证码不为空的时候，验证是否与req.session.verifyCode一致
    if (params.verifyCode && req.session.verifyCode&&req.session.verifyCode != params.verifyCode) {
       res.json({
        'status': '0',
        'message': '验证码不正确',
        'data': null
      })
    }else {
      return requestHelper.call(url, method, params).then(function (data) {
        res.json(data)
      }).catch(function (err) {
        res.json({
          'status': '0',
          'message': '接口异常',
          'data': null
        })
      })
    }
  } catch(e) {
    logger.error('api_common_error' + e)
  }
})

module.exports = router
