var express = require('express')
var router = express.Router()

/**
 * 余额明细的导出
 */
router.get('/balance', function (req, res, next) {
  let {phoneNo, type, startCreatedAt, endCreatedAt} = req.query

  return requestHelper.call('/balance/findAll', 'get', req.query).then(function (data) {
    res.json(data)
  }).catch(function (err) {
    res.json({
      'status': '0',
      'message': '接口异常',
      'data': null
    })
  })
})

/**
 * 积分明细导出
 */
router.get('/points', function (req, res, next) {
  res.json({
    'status': '0',
    'message': '接口异常',
    'data': null
  })
})

module.exports = router
