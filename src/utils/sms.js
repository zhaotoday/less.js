const QcloudSms = require('qcloudsms_js')

module.exports = app => QcloudSms(app.$consts.SMS.APPID, app.$consts.SMS.APPKEY)
