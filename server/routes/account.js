var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/login', function (req, res, next) {
  req.session.user={"name":"kingsley"}
  res.json({
    'status': '1',
    'message': '',
    'data': {
      "id":"1",
      "name":"Kingsley"
    }
  })
})

router.get('/aa', function (req, res, next) {
  console.log(req.session.user);
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
