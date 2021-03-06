import React from 'react'
import { graphql, PageProps } from 'gatsby'
import { AllMarkdownRemark, Site } from '../../typings/markdown'
import Page from '../../ui/page'
import Articles from '../../components/articles'
import { useQueryParam } from 'use-query-params'
import { QUERY_PARAM } from '../../constants/queryParams'
import { filterArticles } from '../../utils/articles'
import { pluralizeText } from '../../utils/pluralizeText'
import Banner from '../../components/banner'
import { EventType } from '../../typings/event'
import Sidebar from '../../components/sidebar'
import * as s from './main.module.css'
import Paginator from '../../components/paginator'
import { filterByDates } from '../../utils/filter'

interface Data {
  site: Site
  allMarkdownRemark: AllMarkdownRemark
}

interface PageContext {
  tags: string[]
  frontendEvents: EventType[]
  kotlinEvents: EventType[]
  pagination: {
    currentPage: number
    totalPages
  }
}

export default function MainPage(props: PageProps<Data, PageContext>) {
  const { allMarkdownRemark, site } = props.data
  const { tags, frontendEvents, kotlinEvents, pagination } = props.pageContext

  const [tag] = useQueryParam<string>(QUERY_PARAM.tag)
  const [query] = useQueryParam<string>(QUERY_PARAM.query)

  const isMainPage = !tag && !query
  const lastEvent = frontendEvents[0] ?? kotlinEvents[0] ?? null
  const frontendFutureEvents = filterByDates(frontendEvents)
  const kotlinFutureEvents = filterByDates(kotlinEvents)

  const articles = filterArticles(allMarkdownRemark.edges, {
    tag,
    title: query
  })

  const articlesCount = articles.length

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
    <Page
      title={title}
      preHeader={isMainPage && lastEvent && <Banner event={lastEvent} />}>
      <div className={s.Main}>
        <div className={s.Content}>
          <Articles
            hasSearchMode={Boolean(tag) || Boolean(query)}
            articles={articles}
          />

          <Paginator
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        </div>

        <Sidebar
          location={props.location}
          socialData={site.siteMetadata.social}
          tags={tags}
          frontendEventsCount={frontendFutureEvents.length}
          kotlinEventsCount={kotlinFutureEvents.length}
          navigate={props.navigate}
        />
      </div>
    </Page>
  )
}

export const pageQuery = graphql`
  query blogListQuery($limit: Int!, $skip: Int!) {
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
      filter: { fileAbsolutePath: { regex: "/^((?!DRAFT).)*$/" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
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
                gatsbyImageData(width: 400)
              }
            }
          }
          fields {
            slug
          }
          parent {
            ... on File {
              modifiedTime
            }
          }
        }
      }
    }
  }
`
