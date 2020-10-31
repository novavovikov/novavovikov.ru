import React from 'react'
import cn from 'classnames'
import differenceInCalendarWeeks from 'date-fns/differenceInCalendarWeeks'
import s from './age-map.module.css'

const BIRTH_DATE = new Date(1987, 5, 13)
const DEATH_DATE = new Date(2067, 2, 0)

const passed = new Array(differenceInCalendarWeeks(new Date(), BIRTH_DATE)).fill(0)
const rest = new Array(differenceInCalendarWeeks(DEATH_DATE, new Date())).fill(1)

export default function AgeMap () {
  return (
    <div className={s.AgeMap}>
      {passed.map((_, ndx) => <span key={ndx} className={cn(s.AgeMap__week, s.AgeMap__week_filled)}/>)}
      {rest.map((_, ndx) => <span key={ndx} className={s.AgeMap__week}/>)}
    </div>
  )
}
