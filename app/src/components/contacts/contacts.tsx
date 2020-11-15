import React from 'react'
import { SocialData } from '../../typings/markdown'
import TwitterIcon from './icons/tw.svg?inline'
import GithubIcon from './icons/github.svg?inline'
import MailIcon from './icons/mail.svg?inline'
import TelegramIcon from './icons/telegram.svg?inline'
import s from './contacts.module.css'
import ExternalLink from '../../ui/external-link'

const SOCIAL_ICONS = {
  twitter: TwitterIcon,
  github: GithubIcon,
  email: MailIcon,
  telegram: TelegramIcon
}

interface Props {
  data: SocialData
}

export default function Contacts({ data }: Props) {
  return (
    <div className={s.Contacts}>
      {Object.keys(data).map((name) => {
        const Icon = SOCIAL_ICONS[name]

        return (
          <ExternalLink
            key={name}
            href={data[name]}
            className={s.Contacts__item}
            title={name}>
            <Icon className="icon" />
          </ExternalLink>
        )
      })}
    </div>
  )
}
