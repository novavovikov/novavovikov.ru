import React from 'react'
import cn from 'classnames'
import * as s from './duration.module.css'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  date: string
  modifiedDate: string
  timeToRead: number
}

const DATE_PARAMS: [string, Intl.DateTimeFormatOptions] = [
  'ru-RU',
  {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
]

export default function Duration({
  className,
  date,
  modifiedDate,
  timeToRead,
  ...restProps
}: Props) {
  const modified =
    modifiedDate && new Date(modifiedDate).toLocaleDateString(...DATE_PARAMS)

  const created = date
    ? new Date(date).toLocaleDateString(...DATE_PARAMS)
    : modified

  return (
    <div className={cn(s.Duration, className)} {...restProps}>
      <span title={`Последнее обновление ${modified}`}>🗓️ {created}</span>

      <span>
        {iconByTime(timeToRead)} {timeToRead} мин. чтения
      </span>
    </div>
  )
}

function iconByTime(time: number) {
  switch (true) {
    case time > 5:
      return '🥤'
    case time > 10:
      return '🍺'
    default:
      return '☕'
  }
}
