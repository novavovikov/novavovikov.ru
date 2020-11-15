export function getDateObject(date: string | null) {
  if (!date) {
    return null
  }

  const d = new Date(date)

  return new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000)
}
