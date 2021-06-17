import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import Tags from '../../tags/tags'
import Duration from '../../duration/duration'
import { ArticleProps } from '../articles'
import * as s from './vertical-card.module.css'

export default function VerticalCard(props: ArticleProps) {
  const { fields, frontmatter, timeToRead, parent } = props.data
  const { title, description, tags, date, cover } = frontmatter

  return (
    <div className={s.VCard}>
      <div className={s.VCard__body}>
        <Link to={fields.slug} className={s.VCard__imgLink}>
          {cover && (
            <GatsbyImage
              className={s.VCard__img}
              backgroundColor={
                cover.childImageSharp.gatsbyImageData.backgroundColor
              }
              image={cover.childImageSharp.gatsbyImageData}
              alt={title}
              imgStyle={{
                transition: '0.25s'
              }}
            />
          )}
        </Link>

        <div className={s.VCard__info}>
          <Duration
            className={s.VCard__duration}
            date={date}
            modifiedDate={parent.modifiedTime}
            timeToRead={timeToRead}
          />

          <Link to={fields.slug} className={s.VCard__header}>
            <h4 className={s.VCard__title}>{title}</h4>
          </Link>
          <div className={s.VCard__description}>{description}</div>
        </div>

        {tags && tags.length > 0 && (
          <div className={s.VCard__tags}>
            <Tags tags={tags} />
          </div>
        )}
      </div>
    </div>
  )
}
