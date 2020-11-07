import React from 'react'
import cn from 'classnames'
import DefaultComponent, { DefaultComponentProps } from '../default-component'
import s from './button.module.css'

interface Props {
  theme?: 'solid' | 'transparent'
}

export default function Button<Type extends React.ElementType = 'button'>(
  props: DefaultComponentProps<Type, Props>
) {
  const {
    className,
    component = 'button',
    theme = 'solid',
    ...restProps
  } = props

  return (
    <DefaultComponent
      component={component}
      className={cn(
        s.Button,
        {
          [s.Button_solid]: theme === 'solid',
          [s.Button_transparent]: theme === 'transparent'
        },
        className
      )}
      {...restProps}
    />
  )
}
