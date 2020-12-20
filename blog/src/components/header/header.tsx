import React from 'react'
import { Link } from 'gatsby'
import Container from '../../ui/container'
import LogoIcon from './icons/logo.svg?inline'
import Search from '../search'
import ThemeControl from '../theme-control'
import s from './header.module.css'
import { ROUTES } from '../../constants/routes'

export default function Header() {
  return (
    <header className={s.Header}>
      <Container>
        <div className={s.HeaderContent}>
          <div className={s.HeaderSection}>
            <Link to={ROUTES.MAIN} className={s.Header__logo}>
              <LogoIcon />
            </Link>

            <Search />
          </div>

          <ThemeControl />
        </div>
      </Container>
    </header>
  )
}
