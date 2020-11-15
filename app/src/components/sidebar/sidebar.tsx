import React from 'react'
import SidebarBlock from '../sidebar-block/sidebar-block'
import EventsBlock from '../events-block/events-block'
import Tags from '../tags/tags'
import { Link } from 'gatsby'
import { NavigateFn, WindowLocation } from '@reach/router'
import Contacts from '../contacts/contacts'
import FeedbackPopup from '../feedback-popup/feedback-popup'
import {
  addToUrlParams,
  deleteFromUrlParams,
  hasToUrlParams
} from '../../utils/urlParams'
import { QUERY_PARAM } from '../../constants/queryParams'
import { SocialData } from '../../typings/markdown'
import s from '../../templates/main/main.module.css'

interface Props {
  location: WindowLocation
  tags: string[]
  socialData: SocialData
  frontendEventsCount: number
  kotlinEventsCount: number
  navigate: NavigateFn
}

export default function Sidebar(props: Props) {
  const {
    tags,
    socialData,
    frontendEventsCount,
    kotlinEventsCount,
    navigate
  } = props
  const { search, pathname } = props.location

  const feedbackUrl = addToUrlParams(QUERY_PARAM.popup, 'feedback', {
    search,
    prefix: pathname
  })

  const returnToPage = React.useCallback(async () => {
    const url = deleteFromUrlParams(QUERY_PARAM.popup, {
      search,
      prefix: pathname
    })

    await navigate(url)
  }, [search, pathname])

  return (
    <div className={s.Sidebar}>
      <SidebarBlock title="События" icon="📅">
        <div className={s.SidebarAside}>
          {frontendEventsCount === 0 && kotlinEventsCount === 0 && (
            <>Мы не нашли {'\n'}предстоящих событий 😔</>
          )}

          <EventsBlock
            to="events/frontend"
            count={frontendEventsCount}
            title="Frontend"
            img="/frontend-events.jpeg"
          />

          <EventsBlock
            to="events/kotlin"
            count={kotlinEventsCount}
            title="Kotlin"
            img="/kotlin-events.png"
          />
        </div>
      </SidebarBlock>
      {tags.length > 0 && (
        <SidebarBlock title="Теги" icon="#️⃣">
          <Tags tags={tags} />
        </SidebarBlock>
      )}

      <SidebarBlock
        title="Контакты"
        icon="📟"
        aside={
          null && (
            <Link to="/about" className={s.SidebarAside__link}>
              Обо мне
            </Link>
          )
        }>
        <Contacts data={socialData} />
      </SidebarBlock>

      <div className={s.Links}>
        <Link to={feedbackUrl} className={s.SidebarAside__link}>
          Обратная связь
        </Link>

        <FeedbackPopup
          open={hasToUrlParams(QUERY_PARAM.popup, 'feedback', { search })}
          onClose={returnToPage}
        />
      </div>
    </div>
  )
}
