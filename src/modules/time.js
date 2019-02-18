const format = require('date-fns/format')

const DATE_FORMATTER = 'YYYY-MM-DD'
const TIME_FORMATTER = 'YYYY-MM-DD HH:mm'

const _getNow = () => new Date().getTime()

module.exports = app => ({
  getDate (time) {
    return format(time || _getNow(), DATE_FORMATTER)
  },
  getTime (time) {
    return format(time || _getNow(), TIME_FORMATTER)
  },
  format (time, formatter) {
    return format(time || _getNow(), formatter)
  }
})
