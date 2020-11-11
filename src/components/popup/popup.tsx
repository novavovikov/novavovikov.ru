import React from 'react'
import cn from 'classnames'
import ReactDOM from 'react-dom'
import s from './popup.module.css'

const bodyNode =
  typeof document !== 'undefined' && document.querySelector('body')

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  transitionOut?: number
}

export default function Popup(props: Props) {
  if (!bodyNode) {
    return null
  }

  const {
    className,
    open,
    onClose,
    transitionOut = 400,
    children,
    ...restProps
  } = props

  const [isOpen, setOpenStatus] = React.useState(open)

  React.useEffect(() => {
    if (open) {
      setOpenStatus(open)
    } else {
      setTimeout(() => {
        setOpenStatus(open)
      }, transitionOut)
    }
  }, [open])

  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div className={cn(s.Popup, className)} {...restProps}>
      <div
        onClick={onClose}
        className={cn(s.Popup__overlay, {
          [s.Popup__overlay_opened]: open,
          [s.Popup__overlay_closed]: !open
        })}
      />
      <div
        className={cn(s.Popup__content, {
          [s.Popup__content_opened]: open,
          [s.Popup__content_closed]: !open
        })}>
        {children}
      </div>
    </div>,
    bodyNode
  )
}
