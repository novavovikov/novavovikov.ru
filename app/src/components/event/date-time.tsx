import React from 'react'

interface Props {
  prepend?: React.ReactNode
  append?: React.ReactNode
  date: Date | null
}

export default function DateTime(props: Props) {
  const { date, time } = getDateAndTime(props.date)

  if (!date) {
    return null
  }

  return (
    <>
      {props.prepend}
      {date} {time && <b>{time}</b>}
      {props.append}
    </>
  )
}

const dateParams: [string, Intl.DateTimeFormatOptions] = [
  'ru-RU',
  {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
]

const timeParams: [string, Intl.DateTimeFormatOptions] = [
  'ru-RU',
  {
    hour: '2-digit',
    minute: '2-digit'
  }
]

function getDateAndTime(d: Date | null) {
  if (!d) {
    return {
      date: null,
      time: null
    }
  }

  const date = d.toLocaleDateString(...dateParams)
  const time = d.toLocaleTimeString(...timeParams)

  if (time === '00:00') {
    return {
      date,
      time: null
    }
  }

  return {
    date,
    time
  }
}
