import React from 'react'
import cn from 'classnames'
import { Link } from 'gatsby'
import { PostPreviewData } from '../../typings/post-preview'
import * as s from './post-preview.module.css'

interface Props extends PostPreviewData {
  inverse?: boolean
  imageUrl: Nulled<string>
}

export default function PostPreview(props: Props) {
  const { inverse, path, title, imageUrl } = props

  return (
    <Link className={s.PostPreview} to={path}>
      <h4
        className={cn(s.PostPreview__title, {
          [s.PostPreview__title_inverse]: inverse
        })}>
        {!inverse && '← '}
        {title}
        {inverse && ' →'}
      </h4>
      {imageUrl && (
        <img className={s.PostPreview__img} src={imageUrl} alt={title} />
      )}
    </Link>
  )
}
