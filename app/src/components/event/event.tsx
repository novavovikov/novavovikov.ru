import React from 'react'
import ExternalLink from '../external-link'
import format from 'date-fns/format'
import s from './event.module.css'

interface Props {
  url: string
  title: string
  flag: Nulled<string>
  location: string
  startDate: Date
  endDate: Date
}

export default function Event(props: Props) {
  const { url, title, flag, location, startDate, endDate } = props

  const dateParams: [string, Intl.DateTimeFormatOptions] = [
    'ru-RU',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  ]

  return (
    <div className={s.Event}>
      <div className={s.Event__info}>
        <div className={s.Event__description}>
          <ExternalLink href={url}>{title}</ExternalLink>
        </div>
        <div className={s.Event__location}>
          {flag} {location}
        </div>
      </div>
      <div className={s.Event__dates}>
        с <b>{startDate.toLocaleDateString(...dateParams)}</b> по{' '}
        <b>{endDate.toLocaleDateString(...dateParams)}</b>
        <div className={s.Event__calendar}>
          📅{' '}
          <ExternalLink href={getGoogleCalendarLink(props)}>
            Добавить в Google календарь
          </ExternalLink>
        </div>
      </div>
    </div>
  )
}

function getGoogleCalendarLink(event: Props) {
  const { url, title, startDate, endDate, location } = event

  const gUrl = new URL('https://www.google.com/calendar/render?action=TEMPLATE')
  const start = format(startDate, "yyyyMMdd'T'HHmmss")
  const end = format(endDate, "yyyyMMdd'T'HHmmss")

  gUrl.searchParams.append('dates', `${start}/${end}`)
  gUrl.searchParams.append('text', title)
  gUrl.searchParams.append('details', url)
  gUrl.searchParams.append('location', location)

  return gUrl.toString()
}
