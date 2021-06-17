import React from 'react'
import { ArticleProps } from '../articles'
import * as s from './hero-card.module.css'

export default function HeroCard(props: ArticleProps) {
  return (
    <div className={s.HCard}>
      <div className={s.HCard__body}>123213</div>
    </div>
  )
}
