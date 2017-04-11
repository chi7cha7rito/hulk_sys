var express = require('express')
var router = express.Router()
var ccap = require('ccap')

/* GET home page. */
router.get('/genVerifyCodeImg', function (req, res, next) {
  try {
    var captcha = new ccap({
      width: 130, // set width,default is 256

      height: 37, // set height,default is 60

      offset: 20, // set text spacing,default is 40

      quality: 100, // set pic quality,default is 50,
      fontsize: 37,
      generate: function () { // Custom the function to generate captcha text
        return Math.random().toString().slice(-6)
      }
    })
    var ary = captcha.get()

    var txt = ary[0]

    req.session.verifyCode = txt

    var buf = ary[1]

    res.end(buf)
  } catch(e) {
    console.log(e)
  }
})

module.exports = router
