import React from 'react'
import cn from 'classnames'
import DefaultComponent, { DefaultComponentProps } from '../default-component'
import s from './button.module.css'

interface Props {
  theme?: 'blue' | 'gray' | 'transparent'
}

export default function Button<Type extends React.ElementType = 'button'>(
  props: DefaultComponentProps<Type, Props>
) {
  const { className, as = 'button', theme = 'blue', ...restProps } = props

  return (
    <DefaultComponent
      as={as}
      className={cn(
        s.Button,
        {
          [s.Button_blue]: theme === 'blue',
          [s.Button_gray]: theme === 'gray',
          [s.Button_transparent]: theme === 'transparent'
        },
        className
      )}
      {...restProps}
    />
  )
}
