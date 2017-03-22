/**
 * desc log4s 工具类
 */
var path = require('path')
var fs = require('fs')
var log4js = require('log4js')
var logConfig = require('../config/log4js.json')
var appConfig = require('../config/app.json')

var appName = appConfig.name

/**
 * @desc 日志类
 */
function Logger () {
  this.init()
}

Logger.prototype.init = function () {
  var appenders = logConfig.appenders

  if (appenders) {
    var baseDir = path.join(__dirname, '..', '..', '..', '..', 'logs')
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir)
    }

    var logDir = path.join(__dirname, '..', '..', '..', '..', 'logs', appName)
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir)
    }
    for (var a of appenders) {
      if (a.type && a.type == 'dateFile') {
        var dir = path.join(__dirname, '..', '..', '..', a.filename)
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir)
        }
      }
    }
  }

  // 加载log4js的配置
  log4js.configure(logConfig)
}

/**
 * desc 普通日志
 */
Logger.prototype.info = function (info) {
  var classSelf = this

  var loggerInfo = log4js.getLogger('info')

  if (info) {
    loggerInfo.info(info)
  }
}

/**
 * desc 错误日志
 */
Logger.prototype.error = function (info) {
  var classSelf = this

  var loggerError = log4js.getLogger('error')

  if (info) {
    loggerError.error(info)
  }
}

/**
 * desc 警告日志
 */
Logger.prototype.warn = function (info) {
  var classSelf = this

  var loggerWarn = log4js.getLogger('warn')

  if (info) {
    loggerWarn.warn(info)
  }
}

module.exports = new Logger()
