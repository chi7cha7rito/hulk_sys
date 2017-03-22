var express = require('express')
var router = express.Router()

/* GET home page. */
router.post('/common', function (req, res, next) {
  try {
    var url = req.body.url
    var method = req.body.method
    var params = req.body.params
    return requestHelper.call(url, method, params).then(function (data) {
      res.json(data)
    }).catch(function (err) {
      res.json({
        'status': '0',
        'message': '接口异常',
        'data': null
      })
    })
  } catch(e) {
    logger.error('api_common_error' + e)
  }
})

module.exports = router
