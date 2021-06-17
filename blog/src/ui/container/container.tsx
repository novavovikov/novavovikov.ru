import React from 'react'
import cn from 'classnames'
import * as s from './container.module.css'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Container({ className, ...restProps }: Props) {
  return <div className={cn(s.Container, className)} {...restProps} />
}
