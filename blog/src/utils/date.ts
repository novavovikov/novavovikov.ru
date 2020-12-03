import { LocationTimezone } from '../typings/event'

export function getDateObject(
  date: Nulled<string>,
  // FIXME use timezone
  timezone: Nulled<LocationTimezone>
) {
  if (!date) {
    return null
  }

  const d = new Date(date)

  return new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000)
}
