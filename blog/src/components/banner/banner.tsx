import React from 'react'
import { Link } from 'gatsby'
import Button from '../../ui/button'
import { EventType } from '../../typings/event'
import ExternalLink from '../../ui/external-link'
import { ls } from '../../utils/storage'
import { Interval } from '../../ui/date-time'
import { getDateObject } from '../../utils/date'
import s from './banner.module.css'

interface Props {
  event: EventType
}

export default function Banner({ event }: Props) {
  const [lastEvent, setLastEvent] = React.useState<EventType | null>(
    ls.getItem('lastEvent', null)
  )

  const onClose = React.useCallback(() => {
    setLastEvent(event)
    ls.setItem('lastEvent', event)
  }, [event])

  const isHidden = lastEvent && lastEvent.id === event.id

  if (isHidden) {
    return null
  }

  return (
    <div className={s.Banner}>
      <div className={s.Banner__body}>
        <button className={s.Banner__close} onClick={onClose}>
          ✕
        </button>
        <div className={s.Banner__label}>Ближайшее событие:</div>
        <div className={s.Banner__location}>
          {event.locationData.flag} {event.location}
        </div>
        <ExternalLink className={s.Banner__link} href={event.url}>
          <h4 className={s.Banner__title}>{event.title}</h4>
        </ExternalLink>
        <div className={s.Banner__interval}>
          <Interval
            prepend="📅 "
            startDate={
              getDateObject(event.startDate, event.locationData.timezone)!
            }
            endDate={getDateObject(event.endDate, event.locationData.timezone)}
          />
        </div>
        <Button as={Link} to={`/events/${event.category}`}>
          Список {event.category} событий
        </Button>
      </div>
    </div>
  )
}
