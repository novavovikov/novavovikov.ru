import React from 'react'
import cn from 'classnames'
import * as s from './input.module.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: Props) {
  return <input type="text" className={cn(s.Input, className)} {...props} />
}
