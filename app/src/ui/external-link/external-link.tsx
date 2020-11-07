import React from 'react'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  component?: React.ElementType
}

export default function ExternalLink(props: Props) {
  const { children, component: Component = 'a', ...restProps } = props

  return (
    <Component
      target="_blank"
      rel="noopener nofollow"
      title={typeof children === 'string' ? children : ''}
      {...restProps}>
      {children}
    </Component>
  )
}
