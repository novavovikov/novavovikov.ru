import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import Tags from '../../tags/tags'
import Duration from '../../duration/duration'
import { ArticleProps } from '../articles'
import s from './vertical-card.module.css'

export default function VerticalCard(props: ArticleProps) {
  const { fields, frontmatter, timeToRead } = props.data
  const { title, description, tags, date, cover } = frontmatter

  return (
    <div className={s.VCard}>
      <div className={s.VCard__body}>
        <Link to={fields.slug} className={s.VCard__imgLink}>
          {cover && (
            <Img
              className={s.VCard__img}
              fluid={cover.childImageSharp.fluid}
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
