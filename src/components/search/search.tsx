import React from 'react'
import Input from '../input'
import s from './search.module.css'

export default function Search() {
  return (
    <form action="/" className={s.Search}>
      <span className={s.Search__icon}>🔍</span>
      <Input className={s.Search__field} placeholder="Искать..." name="q" />
    </form>
  )
}
