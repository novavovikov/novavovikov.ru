import format from 'date-fns/format'
import addDays from 'date-fns/addDays'

function getGoogleDates(startDate: Date, endDate: Date | null): string {
  if (!endDate) {
    const start = format(startDate, 'yyyyMMdd')
    const end = format(addDays(startDate, 1), 'yyyyMMdd')
    return `${start}/${end}`
  }

  const start = format(startDate, "yyyyMMdd'T'HHmmss")
  const end = format(endDate, "yyyyMMdd'T'HHmmss")
  return `${start}/${end}`
}

export function getGoogleCalendarLink(event: Props) {
  const { url, title, startDate, endDate, location } = event

  const gUrl = new URL('https://www.google.com/calendar/render?action=TEMPLATE')
  const dates = getGoogleDates(startDate, endDate)

  gUrl.searchParams.append('dates', dates)
  gUrl.searchParams.append('text', title)
  gUrl.searchParams.append('details', url)
  gUrl.searchParams.append('location', location)

  return gUrl.toString()
}
