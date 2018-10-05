const QcloudSms = require('qcloudsms_js')

module.exports = app => QcloudSms(app.$config.SMS.APPID, app.$config.SMS.APPKEY)
