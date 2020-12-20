import React from 'react'
import { Link } from 'gatsby'
import Page from '../../ui/page'
import NotFoundImage from './images/not-found.svg?inline'
import { ROUTES } from '../../constants/routes'

export default function NotFoundPage() {
  return (
    <Page>
      <div>
        <div>Страница не найдена</div>
        Перейти на <Link to={ROUTES.MAIN}>главную страницу</Link>
      </div>

      <NotFoundImage />
    </Page>
  )
}
