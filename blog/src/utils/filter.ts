import isWithinInterval from 'date-fns/isWithinInterval'
import isAfter from 'date-fns/isAfter'
import startOfToday from 'date-fns/startOfToday'

interface Event {
  startDate: string
  endDate: string | null
}

export function filterByDates<T extends Event>(
  events: T[],
  comparedDate: Date = startOfToday()
) {
  return events.filter(({ startDate, endDate }) => {
    const start = new Date(startDate)
    const end = new Date(endDate || startDate)

    return (
      isWithinInterval(comparedDate, { start, end }) ||
      isAfter(start, comparedDate)
    )
  })
}
