var express = require('express')
var nodeExcel = require('excel-export')
var router = express.Router()
var moment = require('moment')

/**
 * 余额明细的导出
 */
router.get('/balance', function (req, res, next) {
  let {phoneNo, type, startCreatedAt, endCreatedAt} = req.query
  return requestHelper.call('/balance/findAll', 'get', req.query).then(function (data) {
    var conf = {}
    conf.cols = [{
      caption: '姓名',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.member.user.name || ''
      }
    }, {
      caption: '手机号',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.member.user.phoneNo || ''
      }
    }, {
      caption: '类型',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.type.name || ''
      }
    }, {
      caption: '金额',
      type: 'number',
      beforeCellWrite: function (row, cellData) {
        return row.amount || 0
      }
    }, {
      caption: '来源',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.source.name || ''
      }
    }, {
      caption: '来源编号',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.sourceNo || ''
      }
    }, {
      caption: '备注',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.remark || ''
      }
    }, {
      caption: '日期',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return moment.utc(row.createdAt).local().format('YYYY-MM-DD') || ''
      }
    }, {
      caption: '时间',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return moment.utc(row.createdAt).local().format('HH:mm') || ''
      }
    }]
    conf.rows = data.data
    var result = nodeExcel.execute(conf)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats;')
    res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent('会员余额明细') + '.xlsx')
    res.end(result, 'binary')
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
  let {phoneNo, type, startCreatedAt, endCreatedAt} = req.query
  return requestHelper.call('/point/findAll', 'get', req.query).then(function (data) {
    var conf = {}
    conf.cols = [{
      caption: '姓名',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.member.user.name || ''
      }
    }, {
      caption: '手机号',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.member.user.phoneNo || ''
      }
    }, {
      caption: '类型',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.type.name || ''
      }
    }, {
      caption: '积分',
      type: 'number',
      beforeCellWrite: function (row, cellData) {
        return row.points || 0
      }
    }, {
      caption: '来源',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.source.name || ''
      }
    }, {
      caption: '来源编号',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.sourceNo || ''
      }
    }, {
      caption: '备注',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.remark || ''
      }
    }, {
      caption: '日期',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return moment.utc(row.createdAt).local().format('YYYY-MM-DD') || ''
      }
    }, {
      caption: '时间',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return moment.utc(row.createdAt).local().format('HH:mm') || ''
      }
    }]
    conf.rows = data.data
    var result = nodeExcel.execute(conf)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats;')
    res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent('会员积分明细') + '.xlsx')
    res.end(result, 'binary')
  }).catch(function (err) {
    res.json({
      'status': '0',
      'message': '接口异常',
      'data': null
    })
  })
})



/**
 * 重入明细的导出
 */
router.get('/chips', function (req, res, next) {
  let {matchName, startOpening, endOpening} = req.query
  return requestHelper.call('/chip/findAll', 'get', req.query).then(function (data) {
    var conf = {}
    conf.cols = [{
      caption: '姓名',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.member.user.name || ''
      }
    }, {
      caption: '手机号',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.member.user.phoneNo || ''
      }
    }, {
      caption: '类型',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.type.name || ''
      }
    }, {
      caption: '金额',
      type: 'number',
      beforeCellWrite: function (row, cellData) {
        return row.amount || 0
      }
    }, {
      caption: '来源',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.source.name || ''
      }
    }, {
      caption: '来源编号',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.sourceNo || ''
      }
    }, {
      caption: '备注',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.remark || ''
      }
    }, {
      caption: '日期',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return moment.utc(row.createdAt).local().format('YYYY-MM-DD') || ''
      }
    }, {
      caption: '时间',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return moment.utc(row.createdAt).local().format('HH:mm') || ''
      }
    }]
    conf.rows = data.data
    var result = nodeExcel.execute(conf)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats;')
    res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent('会员余额明细') + '.xlsx')
    res.end(result, 'binary')
  }).catch(function (err) {
    res.json({
      'status': '0',
      'message': '接口异常',
      'data': null
    })
  })
})

module.exports = router
