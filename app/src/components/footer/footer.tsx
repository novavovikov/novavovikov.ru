import React from 'react'
import { Link } from 'gatsby'
import Container from '../../ui/container'
import RSS from './icons/rss.svg?inline'
import s from './footer.module.css'

export default function Footer() {
  const year = React.useMemo(() => new Date().getUTCFullYear(), [])

  return (
    <footer className={s.Footer}>
      <Container>
        <div className={s.Footer__content}>
          Copyright © {year}
          <Link className={s.Footer__rss} to="/rss.xml">
            <RSS className="icon" />
          </Link>
        </div>
      </Container>
    </footer>
  )
}
