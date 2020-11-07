import React from 'react'
import cn from 'classnames'
import s from './textarea.css'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function Textarea({ className, ...restProps }: Props) {
  return <textarea className={cn(s.Textarea, className)} {...restProps} />
}
