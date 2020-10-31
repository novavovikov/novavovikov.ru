import React from 'react'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function ExternalLink({ children, ...restProps }: Props) {
  return (
    <a
      title={typeof children === 'string' ? children : ''}
      target="_blank"
      rel="noopener nofollow"
      {...restProps}>
      {children}
    </a>
  )
}
