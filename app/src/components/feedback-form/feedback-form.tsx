import React from 'react'
import Input from '../../ui/input'
import Textarea from '../../ui/textarea'
import Button from '../../ui/button'
import s from './feedback-form.module.css'

interface Props {}

export default function FeedbackForm(props: Props) {
  return (
    <form
      className={s.FeedbackForm}
      action="https://getform.io/f/4b129266-c114-4697-b2a0-00beacd7cafc"
      method="POST">
      <h4 className={s.FeedbackForm__title}>📝 Написать сообщение</h4>

      <div className={s.FeedbackForm__row}>
        <Input placeholder="👤 Ваше имя..." name="name" autoFocus />
      </div>

      <div className={s.FeedbackForm__row}>
        <Textarea placeholder="💬 Сообщение..." name="message" />
      </div>

      <Button type="submit">✉️ Отправить</Button>
    </form>
  )
}
