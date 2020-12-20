import React from 'react'
import cn from 'classnames'
import { Link } from 'gatsby'

import s from './paginator.module.css'
import { ROUTES } from '../../constants/routes'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  rootPath?: string
  currentPage: number
  totalPages: number
}

export default function Paginator({
  className,
  rootPath = ROUTES.MAIN,
  currentPage,
  totalPages,
  ...restProps
}: Props) {
  const hasNextPage = currentPage < totalPages

  return (
    <div className={cn(s.Paginator, className)} {...restProps}>
      {Array.from({ length: currentPage }).map((_, ndx) => {
        const pageNumber = ndx + 1
        const pageUrl = ndx === 0 ? `${rootPath}` : `${rootPath}${pageNumber}`

        return (
          <Link
            key={pageNumber}
            to={pageUrl}
            className={s.Paginator__control}
            activeClassName={s.Paginator__control_active}>
            {pageNumber}
          </Link>
        )
      })}

      {hasNextPage && (
        <>
          <Link
            to={`${rootPath}${currentPage + 1}`}
            className={s.Paginator__control}>
            {currentPage + 1}
          </Link>

          <Link
            to={`${rootPath}${currentPage + 1}`}
            className={cn(s.Paginator__control, s.Paginator__control_nextPage)}>
            ▶️
          </Link>
        </>
      )}
    </div>
  )
}
