import React from 'react'
import { ArticleInfo } from '../../typings/markdown'
import Duration from '../duration'
import { GatsbyImage, getSrc } from 'gatsby-plugin-image'
import ExternalLink from '../../ui/external-link'
import ShareMenu from '../share-menu'
import * as s from './post.module.css'
import Tags from '../tags/tags'
import PageScrollStatus from '../../ui/page-scroll-status'

interface Props {
  postLink: string
  githubLink: string
  article: ArticleInfo
}

export default function Post(props: Props) {
  const { html, timeToRead, parent } = props.article
  const { title, description, date, cover, tags } = props.article.frontmatter
  const coverImageData = cover?.childImageSharp.gatsbyImageData

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
          modifiedDate={parent.modifiedTime}
          timeToRead={timeToRead}
        />

        <ShareMenu
          url={props.postLink}
          title={title}
          description={description}
          image={coverImageData ? getSrc(coverImageData) : null}
        />
        <PageScrollStatus />
      </div>

      {coverImageData && (
        <GatsbyImage
          className={s.Post__img}
          backgroundColor={coverImageData.backgroundColor}
          image={coverImageData}
          alt={title}
          imgStyle={{
            transition: '0.25s'
          }}
        />
      )}

      {html && (
        <article
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
