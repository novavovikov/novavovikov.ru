import React from 'react'
import ExternalLink from '../../ui/external-link'
import { getGoogleCalendarLink } from '../../utils/calendar-event'
import { Interval } from '../../ui/date-time'
import s from './event.module.css'

interface Props {
  url: string
  title: string
  flag: Nulled<string>
  location: string
  startDate: Date
  endDate: Date | null
}

export default function Event(props: Props) {
  const { url, title, flag, location, startDate, endDate } = props

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
        <Interval startDate={startDate} endDate={endDate} />

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
