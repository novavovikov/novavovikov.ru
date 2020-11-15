import React from 'react'
import cn from 'classnames'
import Loader from './icons/loader.svg?inline'
import s from './splash.module.css'

interface Props {
  hidden?: boolean
  useLoader?: boolean
}

export default function Splash({ hidden = true, useLoader }: Props) {
  return (
    <div
      className={cn(s.Splash, {
        [s.Splash_hidden]: hidden
      })}>
      {useLoader && <Loader className={cn('icon', s.Splash__loader)} />}
    </div>
  )
}
