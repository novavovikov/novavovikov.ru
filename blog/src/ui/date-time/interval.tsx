import React from 'react'
import DateTime from './date-time'

interface Props {
  prepend?: React.ReactNode
  append?: React.ReactNode
  startDate: Date
  endDate: Date | null
  delimiter?: string
}

export function Interval({
  prepend,
  append,
  startDate,
  endDate,
  delimiter = ' — '
}: Props) {
  return (
    <>
      {prepend}
      <DateTime date={startDate} />
      <DateTime date={endDate} prepend={delimiter} />
      {append}
    </>
  )
}
