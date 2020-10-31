import React from 'react'
import cn from 'classnames'
import s from './sidebar-block.module.css'

interface Props {
  className?: string
  title: string
  icon: string
  aside?: React.ReactNode
  children: React.ReactNode
}

export default function SidebarBlock({
  className,
  title,
  icon,
  aside,
  children
}: Props) {
  return (
    <div className={cn(s.SidebarBlock, className)}>
      <div className={s.SidebarBlock__header}>
        <h4 className={s.SidebarBlock__title}>
          <span>{icon}</span>
          <span>{title}</span>
        </h4>

        {aside}
      </div>
      {children}
    </div>
  )
}
