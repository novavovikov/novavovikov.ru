import React from 'react'
import { Link } from 'gatsby'
import s from './events-block.module.css'

interface Props {
  to: string
  title: string
  img: string
}

export default function EventsBlock({ to, title, img }: Props) {
  return (
    <Link
      className={s.EventsBlock}
      to={to}
      title={`Предстоящие ${title} события`}>
      <img className={s.EventsBlock__img} src={img} alt={title} />
      <div className={s.EventsBlock__title}>{title}</div>
    </Link>
  )
}
