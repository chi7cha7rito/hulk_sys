var express = require('express')
var nodeExcel = require('excel-export')
var router = express.Router()
var moment = require('moment')

/**
 * 余额明细的导出
 */
router.get('/balance', function (req, res, next) {
  let { phoneNo, type, startCreatedAt, endCreatedAt } = req.query
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
  let { phoneNo, type, startCreatedAt, endCreatedAt } = req.query
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
  let { matchName, startOpening, endOpening } = req.query
  return requestHelper.call('/chip/findAll', 'get', req.query).then(function (data) {
    var conf = {}
    conf.cols = [{
      caption: '赛事名称',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row['match.matchConfig.name'] || ''
      }
    }, {
      caption: '会员名称',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row['member.user.name'] || ''
      }
    }, {
      caption: '比赛日期',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return moment.utc(row['match.openingDatetime']).local().format('YYYY-MM-DD') || ''
      }
    }, {
      caption: '比赛时间',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return moment.utc(row['match.openingDatetime']).local().format('HH:mm') || ''
      }
    }, {
      caption: '每手价格',
      type: 'number',
      beforeCellWrite: function (row, cellData) {
        return row['match.perHand'] || 0
      }
    }, {
      caption: '购买手数',
      type: 'number',
      beforeCellWrite: function (row, cellData) {
        return row['quantity'] || 0
      }
    }, {
      caption: '付款金额',
      type: 'number',
      beforeCellWrite: function (row, cellData) {
        return row['payAmount'] || 0
      }
    }, {
      caption: '付款方式',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        if (row['payAmount'].toString() === '1') return '余额'
        if (row['payAmount'].toString() === '2') return '积分'
        return ''
      }
    }]
    conf.rows = data.data
    var result = nodeExcel.execute(conf)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats;')
    res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent('赛事重入明细') + '.xlsx')
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
 * 参赛明细的导出
 */
router.get('/matchResult', function (req, res, next) {
  let { matchName, startOpening, endOpening } = req.query
  return requestHelper.call('/attendance/findResult', 'get', req.query).then(function (data) {
    var conf = {}
    conf.cols = [{
      caption: '赛事ID',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.match.id.toString() || ''
      }
    }, {
      caption: '赛事名称',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.match.matchConfig.name || ''
      }
    }, {
      caption: '会员名称',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.member.user.name || ''
      }
    }, {
      caption: '会员手机',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.member.user.phoneNo || ''
      }
    }, {
      caption: '比赛日期',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return moment.utc(row['match.openingDatetime']).local().format('YYYY-MM-DD') || ''
      }
    }, {
      caption: '比赛时间',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return moment.utc(row['match.openingDatetime']).local().format('HH:mm') || ''
      }
    }, {
      caption: '门票价格',
      type: 'number',
      beforeCellWrite: function (row, cellData) {
        return row.matchPrice || 0
      }
    }, {
      caption: '付款方式',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        if (row.payType.toString() === '1') return '余额'
        if (row.payType.toString() === '2') return '积分'
        if (row.payType.toString() === '3') return '优惠券'
        return ''
      }
    }, {
      caption: '名次',
      type: 'number',
      beforeCellWrite: function (row, cellData) {
        return row.result || 0
      }
    }, {
      caption: '奖励积分',
      type: 'number',
      beforeCellWrite: function (row, cellData) {
        return row.rewards || 0
      }
    }, {
      caption: '奖励说明',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.rewardsRemark || ''
      }
    }, {
      caption: '是否发放',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.issue ? '是' : '否'
      }
    }]
    conf.rows = data.data
    var result = nodeExcel.execute(conf)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats;')
    res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent('赛事结果') + '.xlsx')
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
 * 大师分汇总积分导出
 */
router.get('/spritResult', function (req, res, next) {
  let { startDatetime, endDatetime } = req.query
  return requestHelper.call('/sprit/spritRanking', 'get', req.query).then(function (data) {
    var conf = {}
    conf.cols = [{
      caption: '会员名称',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.name.toString() || ''
      }
    }, {
      caption: '手机号',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.phoneNo || ''
      }
    }, {
      caption: '大师分',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.total || ''
      }
    }]
    data.data.rows.forEach((oItem, index) => {
      oItem.index = index + 1
    })
    conf.rows = data.data.rows;
    var result = nodeExcel.execute(conf)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats;')
    res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent(`${moment(startDatetime).format('YYYY-MM-DD')}-${moment(endDatetime).format('YYYY-MM-DD')}大师分汇总`) + '.xlsx')
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
 * 大师分明细积分导出
 */
router.get('/spritList', function (req, res, next) {
  let { startDatetime, endDatetime, phoneNo } = req.query
  return requestHelper.call('/sprit/list', 'get', req.query).then(function (data) {
    var conf = {}
    conf.cols = [{
      caption: '会员名称',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.member.user.name.toString() || ''
      }
    }, {
      caption: '手机号',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.member.user.phoneNo || ''
      }
    }, {
      caption: '大师分',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.point || ''
      }
    },
    {
      caption: '参赛日期',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.sourceDate ? moment(row.sourceDate).format('YYYY-MM-DD') : ''
      }
    }, {
      caption: '参赛人数',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.attendCount || ''
      }
    }, {
      caption: '参赛费用',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.price || ''
      }
    },{
      caption: '名次',
      type: 'int',
      beforeCellWrite: function (row, cellData) {
        return row.ranking+" " || ''
      }
    },{
      caption: '备注',
      type: 'string',
      beforeCellWrite: function (row, cellData) {
        return row.remark || ''
      }
    }]

    conf.rows = data.data;
    var result = nodeExcel.execute(conf)
    res.setHeader('Content-Type', 'application/vnd.openxmlformats;')
    res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURIComponent(`${moment.utc(startDatetime).local().format('YYYY-MM-DD')}-${moment.utc(endDatetime).local().format('YYYY-MM-DD')}大师分明细`) + '.xlsx')
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
