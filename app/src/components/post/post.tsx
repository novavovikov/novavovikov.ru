import React from 'react'
import { ArticleInfo } from '../../typings/markdown'
import Duration from '../duration'
import Img from 'gatsby-image'
import ExternalLink from '../../ui/external-link'
import ShareMenu from '../share-menu'
import s from './post.module.css'
import Tags from '../tags/tags'

interface Props {
  postLink: string
  githubLink: string
  article: ArticleInfo
}

export default function Post(props: Props) {
  const { html, timeToRead } = props.article
  const { title, date, cover, tags } = props.article.frontmatter
  const coverFluid = cover?.childImageSharp.fluid

  return (
    <div className={s.Post}>
      <div className={s.Post__header}>
        <h2 className={s.Post__title}>{title}</h2>

        <div>
          <ExternalLink
            href={props.githubLink}
            className={s.Post__edit}
            title="Редактировать на GitHub">
            <span className={s.Post__editIcon}>🖊️</span>
            Редактировать на GitHub
          </ExternalLink>
        </div>
      </div>

      <div className={s.Post__controls}>
        <Duration
          className={s.Post__date}
          date={date}
          timeToRead={timeToRead}
        />

        <ShareMenu url={props.postLink} text={title} image={coverFluid?.src} />
      </div>

      {coverFluid && (
        <Img
          className={s.Post__img}
          fluid={coverFluid}
          alt={title}
          imgStyle={{
            transition: '0.25s'
          }}
        />
      )}

      {html && (
        <div
          className={s.Post__content}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}

      {tags && tags.length > 0 && (
        <div className={s.Post__tags}>
          <Tags tags={tags} />
        </div>
      )}
    </div>
  )
}
