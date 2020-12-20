import React from 'react'
import cn from 'classnames'
import { Link } from 'gatsby'
import { useQueryParam } from 'use-query-params'
import { QUERY_PARAM } from '../../constants/queryParams'
import s from './tags.module.css'
import { ROUTES } from '../../constants/routes'

interface Props {
  limit?: number
  tags: string[]
}

export default function Tags({ limit = 6, tags }: Props) {
  const [selectedTag] = useQueryParam<string>(QUERY_PARAM.tag)
  const [isVisible, setVisible] = React.useState<boolean>(false)

  const initialTags = React.useMemo(() => tags.slice(0, limit), [tags])
  const visibleTags = isVisible ? tags : initialTags

  const toggleVisibility = () => setVisible((v) => !v)

  return (
    <div className={s.Tags}>
      {visibleTags.map((tag) => (
        <Link
          key={tag}
          className={cn(s.Tags__item, {
            [s.Tags__item_active]: selectedTag === tag
          })}
          to={`${ROUTES.MAIN}?t=${tag}`}>
          #{tag}
        </Link>
      ))}

      {tags.length > initialTags.length && (
        <button
          className={cn(s.Tags__item, s.Tags__more)}
          onClick={toggleVisibility}>
          {isVisible ? 'Скрыть' : 'Показать все'}
        </button>
      )}
    </div>
  )
}
