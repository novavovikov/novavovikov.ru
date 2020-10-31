import React from 'react'
import { Link } from 'gatsby'
import Page from '../../components/page'
import NotFoundImage from './images/not-found.svg?inline'

export default function NotFoundPage() {
  return (
    <Page>
      <div>
        <div>Страница не найдена</div>
        Перейти на <Link to="/">главную страницу</Link>
      </div>

      <NotFoundImage />
    </Page>
  )
}
