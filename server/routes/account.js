var express = require('express')
var router = express.Router()

/* GET home page. */
router.post('/login', function (req, res, next) {
  res.json({
    'status': '1',
    'message': '',
    'data': {
      "id":"1",
      "name":"Kingsley"
    }
  })
})

module.exports = router
