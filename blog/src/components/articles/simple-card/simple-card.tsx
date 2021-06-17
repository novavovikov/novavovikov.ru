import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { ArticleProps } from '../articles'
import Tags from '../../tags'
import Duration from '../../duration'
import * as s from './simple-card.module.css'

export default function SimpleCard(props: ArticleProps) {
  const { fields, frontmatter, timeToRead, parent } = props.data
  const { title, description, tags, date, cover } = frontmatter

  return (
    <div className={s.SCard}>
      <div className={s.SCard__body}>
        <Link to={fields.slug} className={s.SCard__imgLink}>
          {cover && (
            <GatsbyImage
              className={s.SCard__img}
              backgroundColor={
                cover.childImageSharp.gatsbyImageData.backgroundColor
              }
              image={cover.childImageSharp.gatsbyImageData}
              alt={title}
              objectFit="cover"
              imgStyle={{
                transition: '0.25s'
              }}
            />
          )}
        </Link>

        <div className={s.SCard__content}>
          <Link to={fields.slug} className={s.SCard__header}>
            <h4 className={s.SCard__title}>{title}</h4>
          </Link>

          <div className={s.SCard__description}>{description}</div>

          {tags && tags.length > 0 && (
            <div className={s.SCard__tags}>
              <Tags tags={tags} />
            </div>
          )}

          <Duration
            className={s.SCard__duration}
            date={date}
            modifiedDate={parent.modifiedTime}
            timeToRead={timeToRead}
          />
        </div>
      </div>
    </div>
  )
}
