import React from 'react'
import Page from '../../ui/page'
import { Link } from 'gatsby'
import { ROUTES } from '../../constants/routes'

export default function EventsPage() {
  return (
    <Page>
      <h2>🎉 Мероприятия:</h2>

      <ul>
        <li>
          <Link to={ROUTES.FRONTEND_EVENTS}>Frontend</Link>
        </li>
        <li>
          <Link to={ROUTES.KOTLIN_EVENTS}>Kotlin</Link>
        </li>
      </ul>
    </Page>
  )
}
