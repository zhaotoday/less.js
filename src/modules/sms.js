const QcloudSms = require('qcloudsms_js')

module.exports = app => {
  const { APPID, APPKEY } = app.$config.SMS
  return QcloudSms(APPID, APPKEY)
}
