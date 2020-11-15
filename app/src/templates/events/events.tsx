import { PageProps } from 'gatsby'
import React from 'react'
import Page from '../../ui/page'
import { EventType } from '../../typings/event'
import Event from '../../components/event/event'
import Map from '../../components/map'
import { Coordinates } from '../../components/map/map'
import { getDateObject } from '../../utils/date'
import s from './events.module.css'

interface PageContext {
  name: String
  events: EventType[]
}

export default function Events(props: PageProps<{}, PageContext>) {
  const { name, events } = props.pageContext

  const coordinates = events.reduce<Coordinates[]>((acc, { locationData }) => {
    return locationData.geometry
      ? [...acc, [locationData.geometry.lat, locationData.geometry.lng]]
      : acc
  }, [])

  return (
    <Page
      title={`Предстоящие ${name} события:`}
      containerProps={{
        className: s.Events
      }}>
      <div className={s.Events__content}>
        <div className={s.Events__list}>
          {events.length === 0 && (
            <div>К сожалению, мы не нашли предстоящих событий 😔</div>
          )}

          {events.map((event, ndx) => (
            <Event
              key={ndx}
              {...event}
              flag={event.locationData.flag}
              startDate={getDateObject(event.startDate)!}
              endDate={getDateObject(event.endDate)}
            />
          ))}
        </div>

        {events.length > 0 && (
          <div className={s.Events__map}>
            <Map coordinates={coordinates} />
          </div>
        )}
      </div>
    </Page>
  )
}
