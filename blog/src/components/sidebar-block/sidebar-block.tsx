import React from 'react'
import cn from 'classnames'
import s from './sidebar-block.module.css'
import DefaultComponent, {
  DefaultComponentProps
} from '../../ui/default-component'

interface Props {
  className?: string

  title: React.ReactNode
  titleProps?: DefaultComponentProps<'span'>

  icon: string
  iconProps?: DefaultComponentProps<'span'>

  aside?: React.ReactNode
  children: React.ReactNode
}

export default function SidebarBlock({
  className,
  title,
  titleProps = {},

  icon,
  iconProps = {},

  aside,
  children
}: Props) {
  return (
    <div className={cn(s.SidebarBlock, className)}>
      <div className={s.SidebarBlock__header}>
        <h4 className={s.SidebarBlock__title}>
          <span>{icon}</span>
          <DefaultComponent component="span" {...titleProps}>
            {title}
          </DefaultComponent>
        </h4>

        {aside}
      </div>
      {children}
    </div>
  )
}
