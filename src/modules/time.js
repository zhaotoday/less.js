const format = require('date-fns/format')

const DATE_FORMATTER = 'YYYY-MM-DD'
const TIME_FORMATTER = 'YYYY-MM-DD HH:mm'

module.exports = {
  getDate (time) {
    return format(time, DATE_FORMATTER)
  },
  getTime (time) {
    return format(time, TIME_FORMATTER)
  },
  format (time, formmater) {
    return format(time, formmater)
  }
}
