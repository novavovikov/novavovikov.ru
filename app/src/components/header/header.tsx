import React from 'react'
import { Link } from 'gatsby'
import { useThemeContext } from '../../providers/theme'
import Container from '../../ui/container'
import LogoIcon from './icons/logo.svg?inline'
import Search from '../search'
import ExternalLink from '../../ui/external-link'
import { LINKS } from '../../constants/links'
import Button from '../../ui/button'
import s from './header.module.css'

export default function Header() {
  const { theme, switchTheme } = useThemeContext()

  return (
    <header className={s.Header}>
      <Container>
        <div className={s.HeaderContent}>
          <div className={s.HeaderSection}>
            <Link to="/" className={s.Header__logo}>
              <LogoIcon />
            </Link>

            <Search />
          </div>

          <div className={s.HeaderSection}>
            <Button<typeof ExternalLink>
              className={s.Header__ghlink}
              theme="transparent"
              component={ExternalLink}
              href={LINKS.articles}>
              ✍️ Написать статью
            </Button>

            <button
              className={s.Header__theme}
              title={theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
              onClick={switchTheme}>
              {theme === 'light' ? '🌒' : '🌤️'}
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}
