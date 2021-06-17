import React from 'react'
import * as s from './page-scroll-status.module.css'

export default function PageScrollStatus() {
  const [offset, setOffset] = React.useState<number>(0)

  const scrollHandler = React.useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const bodyHeight = document.body.offsetHeight - window.innerHeight

    setOffset((scrollTop / bodyHeight) * 100)
  }, [])

  React.useEffect(() => {
    window.addEventListener('scroll', scrollHandler)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  })

  return (
    <div className={s.PageScrollStatus}>
      <div
        className={s.PageScrollStatus__status}
        style={{ width: `${offset}%` }}
      />
    </div>
  )
}
