import React from 'react'
import { Share, ShareParams } from '../../utils/share'

export default function MobileShare(props: ShareParams) {
  const { url, text } = props

  const handleMenu = React.useCallback(() => {
    const link = Share.urlNormalizer(`${window.location.origin}${url}`)

    navigator.share({
      title: text || '',
      url: link
    })
  }, [url, text])

  return <button onClick={handleMenu}>{text}</button>
}
