import React from 'react'
import twIcon from './icons/tw.svg?inline'
import tgIcon from './icons/telegram.svg?inline'
import fbIcon from './icons/fb.svg?inline'
import { ShareParams, SocialSystem } from '../../utils/share'
import ShareLink from '../../ui/share-link'
import s from './share.module.css'

const SYSTEMS_DATA = [
  {
    system: SocialSystem.twitter,
    icon: twIcon
  },
  {
    system: SocialSystem.telegram,
    icon: tgIcon
  },
  {
    system: SocialSystem.facebook,
    icon: fbIcon
  }
]

export default function DesktopShare(props: ShareParams) {
  return (
    <div className={s.Share}>
      {SYSTEMS_DATA.map(({ system, icon: Icon }) => (
        <ShareLink
          key={system}
          system={system}
          className={s.Share__control}
          params={props}>
          <Icon className="icon" />
        </ShareLink>
      ))}
    </div>
  )
}
