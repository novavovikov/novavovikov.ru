import React from 'react'
import { isMobile } from 'mobile-device-detect'
import DesktopShare from './desktop-share'
import MobileShare from './mobile-share'
import { ShareParams } from '../../utils/share'

export default function ShareMenu(props: ShareParams) {
  if (navigator.share && isMobile) {
    return <MobileShare {...props} />
  }

  return <DesktopShare {...props} />
}
