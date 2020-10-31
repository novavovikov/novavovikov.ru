import React from 'react'
import { SocialSystem, ShareParams, Share } from '../../utils/share'
import ExternalLink from '../external-link'

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  system: SocialSystem
  params: ShareParams
  children: React.ReactNode
}

export default function ShareLink({ system, params, ...restProps }: Props) {
  const share = new Share(params)
  const url = share.get(system)

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open(url, 'popup', 'width=600,height=600')
  }

  return <ExternalLink href={url} onClick={onClick} {...restProps} />
}
