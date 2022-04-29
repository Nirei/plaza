interface Interval {
  ge: number
  divisor: number
  unit: Intl.RelativeTimeFormatUnit
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY
const YEAR = 365 * DAY

const intervals: Interval[] = [
  { ge: YEAR, divisor: YEAR, unit: 'year' },
  { ge: MONTH, divisor: MONTH, unit: 'month' },
  { ge: WEEK, divisor: WEEK, unit: 'week' },
  { ge: DAY, divisor: DAY, unit: 'day' },
  { ge: HOUR, divisor: HOUR, unit: 'hour' },
  { ge: MINUTE, divisor: MINUTE, unit: 'minute' },
  { ge: 0, divisor: SECOND, unit: 'seconds' },
]

/**
 * Human readable elapsed or remaining time (example: 3 minutes ago)
 * @param  {Date} date A Date object
 * @param  {Date|number|string} [nowDate] A Date object
 * @param  {Intl.RelativeTimeFormat} [rft] A Intl formater
 * @return {string} Human readable elapsed or remaining time
 * @author github.com/victornpb
 * @see https://stackoverflow.com/a/67338038/938822
 */
export function humanRelativeTime(
  date: Date,
  nowDate: Date = new Date(),
  rft: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto',
  }),
) {
  const diff = (nowDate.getTime() - date.getTime())
  const diffAbs = Math.abs(diff)
  for (const interval of intervals) {
    if (diffAbs >= interval.ge) {
      const x = Math.round(diff / interval.divisor)
      return rft.format(-x, interval.unit)
    }
  }
}
