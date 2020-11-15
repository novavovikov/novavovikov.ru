import React from 'react'
import ShareIcon from './icons/share.svg?inline'
import { Share, ShareParams } from '../../utils/share'
import s from './share.module.css'

export default function MobileShare(props: ShareParams) {
  const { url, title, description } = props

  const handleMenu = React.useCallback(() => {
    const link = Share.urlNormalizer(url)

    navigator.share({
      title: title || '',
      text: description,
      url: link
    })
  }, [url, title, description])

  return (
    <button className={s.Share__control} onClick={handleMenu}>
      <ShareIcon className="icon" />
    </button>
  )
}
