import React from 'react'
import cn from 'classnames'
import { Link } from 'gatsby'
import { useQueryParam } from 'use-query-params'
import { QUERY_PARAM } from '../../constants/queryParams'
import s from './tags.module.css'

interface Props {
  tags: string[]
}

export default function Tags({ tags }: Props) {
  const [selectedTag] = useQueryParam<string>(QUERY_PARAM.tag)

  return (
    <div className={s.Tags}>
      {tags.map((tag) => (
        <Link
          key={tag}
          className={cn(s.Tags__item, {
            [s.Tags__item_active]: selectedTag === tag
          })}
          to={`/?t=${tag}`}>
          #{tag}
        </Link>
      ))}
    </div>
  )
}
