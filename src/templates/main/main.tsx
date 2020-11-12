import React from 'react'
import { graphql, Link, PageProps } from 'gatsby'
import { AllMarkdownRemark, Site } from '../../typings/markdown'
import Page from '../../ui/page'
import Articles from '../../components/articles'
import SidebarBlock from '../../components/sidebar-block'
import Contacts from '../../components/contacts'
import Tags from '../../components/tags'
import EventsBlock from '../../components/events-block'
import { useQueryParam } from 'use-query-params'
import { QUERY_PARAM } from '../../constants/queryParams'
import { filterArticles } from '../../utils/articles'
import { pluralizeText } from '../../utils/pluralizeText'
import s from './main.module.css'
import FeedbackForm from '../../components/feedback-form'
import Popup from '../../components/popup'
import {
  addToUrlParams,
  deleteFromUrlParams,
  hasToUrlParams
} from '../../utils/urlParams'

interface Data {
  site: Site
  allMarkdownRemark: AllMarkdownRemark
}

interface PageContext {
  tags: string[]
  frontendEventsCount: number
  kotlinEventsCount: number
}

export default function MainPage(props: PageProps<Data, PageContext>) {
  const { pathname, search } = props.location
  const { tags, frontendEventsCount, kotlinEventsCount } = props.pageContext
  const { allMarkdownRemark, site } = props.data

  const [tag] = useQueryParam<string>(QUERY_PARAM.tag)
  const [query] = useQueryParam<string>(QUERY_PARAM.query)

  const articles = filterArticles(allMarkdownRemark.edges, {
    tag,
    title: query
  })

  const articlesCount = articles.length
  const feedbackUrl = addToUrlParams(QUERY_PARAM.popup, 'feedback', {
    search,
    prefix: pathname
  })

  const returnToPage = React.useCallback(async () => {
    const url = deleteFromUrlParams(QUERY_PARAM.popup, {
      search,
      prefix: pathname
    })

    await props.navigate(url)
  }, [search, pathname])

  const title = React.useMemo(() => {
    if (articlesCount === 0) {
      return 'Не найдено ни одной статьи 😔'
    }

    const resultText = pluralizeText(articlesCount, {
      one: 'статья',
      few: 'статьи',
      other: 'статей'
    })

    if (tag) {
      return `#️⃣ Найдено с тегом <mark>${tag}</mark> ${articlesCount} ${resultText}:`
    }

    if (query) {
      return `📖 Найдено со словом <mark>${query}</mark> ${articlesCount} ${resultText}:`
    }
  }, [tag, query, articlesCount])

  return (
    <Page title={title}>
      <div className={s.Main}>
        <div className={s.Content}>
          <Articles articles={articles} />
        </div>
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
            <Contacts data={site.siteMetadata.social} />
          </SidebarBlock>

          <div className={s.Links}>
            {false && (
              <Link to={feedbackUrl} className={s.SidebarAside__link}>
                Обратная связь
              </Link>
            )}

            <Popup
              open={hasToUrlParams(QUERY_PARAM.popup, 'feedback', { search })}
              onClose={returnToPage}>
              <FeedbackForm />
            </Popup>
          </div>
        </div>
      </div>
    </Page>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        author
        social {
          twitter
          github
          telegram
          email
        }
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { type: { ne: "DRAFT" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          timeToRead
          frontmatter {
            date
            title
            description
            tags
            cover {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
