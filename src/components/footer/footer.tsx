import React from 'react'
import Container from '../container'
import s from './footer.module.css'

export default function Footer() {
  const year = React.useMemo(() => new Date().getUTCFullYear(), [])

  return (
    <footer className={s.Footer}>
      <Container>Copyright © {year}</Container>
    </footer>
  )
}
