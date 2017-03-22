var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var Logger = require('./utils/logger')
var request=require('./utils/requestHepler')

var index = require('./routes/index')
var account = require('./routes/account')
var api=require('./routes/api');

var app = express()

/**
 * desc 全局挂在对象
 */
global.logger = Logger;
global.requestHelper=request;

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').__express)
app.set('view engine', 'html')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/**
 * desc 设置跨域
 */
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// 处理webpack服务请求
app.get('/__webpack_hmr', function (req, res) {
  res.send('')
})


app.use('/', index)
app.use('/account', account)
app.use('/api',api)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
