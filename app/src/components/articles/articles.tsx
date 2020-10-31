import React from 'react'
import cn from 'classnames'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { MarkdownEdge } from '../../typings/markdown'
import Tags from '../tags'
import Duration from '../duration'
import EmptySearch from './images/search.svg?inline'
import s from './articles.module.css'

interface Props {
  articles: MarkdownEdge[]
}

export default function Articles({ articles }: Props) {
  if (!articles.length) {
    return <EmptySearch />
  }

  return (
    <div className={s.Articles}>
      {articles.map(({ node }, ndx) => {
        const { id, fields, frontmatter, timeToRead } = node
        const { title, description, tags, date, cover } = frontmatter

        return (
          <div key={id}>
            <div key={id} className={s.Article}>
              <div className={s.Article__content}>
                <Link to={fields.slug} className={s.Article__header}>
                  <h4 className={s.Article__title}>{title}</h4>
                </Link>

                <div className={s.Article__description}>{description}</div>

                {tags && tags.length > 0 && (
                  <div className={s.Article__tags}>
                    <Tags tags={tags} />
                  </div>
                )}
                <div className={s.Article__footer}>
                  <div className={s.Article__info}>
                    <Duration date={date} timeToRead={timeToRead} />
                  </div>
                </div>
              </div>

              <Link to={fields.slug} className={s.Article__imgLink}>
                {cover && (
                  <Img
                    className={s.Article__img}
                    fluid={cover.childImageSharp.fluid}
                    alt={title}
                    imgStyle={{
                      transition: '0.25s'
                    }}
                  />
                )}
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
