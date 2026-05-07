const DATE_FORMATTER = 'yyyy-MM-dd'
const TIME_FORMATTER = 'yyyy-MM-dd HH:mm'

function pad(value: number) {
  return value.toString().padStart(2, '0')
}

function normalizeTime(time?: Date | number | string) {
  return time ? new Date(time) : new Date()
}

/** Small date formatting helper used by Less applications. */
export function createTimeModule() {
  return {
    getDate(time?: Date | number | string) {
      return this.format(time, DATE_FORMATTER)
    },

    getTime(time?: Date | number | string) {
      return this.format(time, TIME_FORMATTER)
    },

    format(time: Date | number | string | undefined, formatter: string) {
      const date = normalizeTime(time)
      return formatter
        .replaceAll('yyyy', String(date.getFullYear()))
        .replaceAll('MM', pad(date.getMonth() + 1))
        .replaceAll('dd', pad(date.getDate()))
        .replaceAll('HH', pad(date.getHours()))
        .replaceAll('mm', pad(date.getMinutes()))
        .replaceAll('ss', pad(date.getSeconds()))
    },
  }
}
