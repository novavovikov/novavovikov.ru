import React from 'react'
import { Link } from 'gatsby'
import s from './events-block.module.css'
import { pluralizeText } from '../../utils/pluralizeText'

interface Props {
  to: string
  count: number
  title: string
  img: string
}

export default function EventsBlock({ to, count, title, img }: Props) {
  if (count === 0) {
    return null
  }

  return (
    <Link
      className={s.EventsBlock}
      to={to}
      title={`Предстоящие ${title} события`}>
      <img className={s.EventsBlock__img} src={img} alt={title} />
      <div className={s.EventsBlock__title}>{title}</div>
      <div className={s.EventsBlock__count}>
        {count}{' '}
        {pluralizeText(count, {
          one: 'событие',
          few: 'события',
          other: 'событий'
        })}
      </div>
    </Link>
  )
}
