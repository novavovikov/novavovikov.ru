import React from 'react'

export { default } from './popup'

export interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  transitionOut?: number
}
