import React from 'react'
import cn from 'classnames'
import SidebarIcon from './icons/sidebar.svg?inline'
import SidebarBlock from '../sidebar-block'
import EventsBlock from '../events-block'
import Tags from '../tags'
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
import ExternalLink from '../../ui/external-link'
import { LINKS } from '../../constants/links'
import Button from '../../ui/button'
import { useSidebarSwipes } from './use-sidebar-swipes'
import s from './sidebar.module.css'

interface Props {
  location: WindowLocation
  tags: string[]
  socialData: SocialData
  frontendEventsCount: number
  kotlinEventsCount: number
  navigate: NavigateFn
}

export default function Sidebar(props: Props) {
  const { search, pathname } = props.location
  const {
    tags,
    socialData,
    frontendEventsCount,
    kotlinEventsCount,
    navigate
  } = props

  const {
    sidebarRef,
    controlRef,
    position,
    speed,
    opened,
    setOpenStatus
  } = useSidebarSwipes()

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

  const onCloseSidebar = React.useCallback(() => {
    setOpenStatus(false)
  }, [])

  const toggleSidebar = React.useCallback(() => {
    setOpenStatus(!opened)
  }, [opened])

  const sidebarStyles =
    position === 100
      ? {}
      : { transform: `translate(${position}%)`, transition: `${speed}ms` }

  return (
    <>
      <div className={s.SidebarSwipeControl} ref={controlRef} />

      <button
        className={cn(s.SidebarControl, {
          [s.SidebarControl_active]: opened
        })}
        onClick={toggleSidebar}>
        <SidebarIcon className="icon" />
      </button>

      <div
        className={cn(s.Sidebar, { [s.Sidebar_opened]: opened })}
        ref={sidebarRef}
        style={sidebarStyles}>
        <Button theme="gray" component={ExternalLink} href={LINKS.articles}>
          ✍️ Написать статью
        </Button>
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

        <div className={s.SidebarAside__links}>
          <Link
            className={s.SidebarAside__link}
            to={feedbackUrl}
            onClick={onCloseSidebar}>
            Обратная связь
          </Link>

          <FeedbackPopup
            open={hasToUrlParams(QUERY_PARAM.popup, 'feedback', { search })}
            onClose={returnToPage}
          />
        </div>
      </div>
    </>
  )
}
