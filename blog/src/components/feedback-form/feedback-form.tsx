import React from 'react'
import Input from '../../ui/input'
import Textarea from '../../ui/textarea'
import Button from '../../ui/button'
import { useField } from '../../hooks/use-field'
import { PopupFormProps } from '../form-popup/form-popup'
import s from './feedback-form.module.css'

interface Data {
  name: string
  message: string
}

export default function FeedbackForm({
  isLoading,
  hasError,
  onSubmit = () => {}
}: PopupFormProps<Data>) {
  const [name, setName] = useField('')
  const [message, setMessage] = useField('')

  const onSubmitForm: React.FormEventHandler = React.useCallback(
    (e) => {
      e.preventDefault()
      onSubmit({ name, message })
    },
    [name, message]
  )

  return (
    <form className={s.FeedbackForm} onSubmit={onSubmitForm}>
      <h4 className={s.FeedbackForm__title}>📝 Написать сообщение</h4>

      <div className={s.FeedbackForm__row}>
        <Input
          value={name}
          onChange={setName}
          placeholder="👤 Ваше email или имя..."
          name="name"
          autoFocus
        />
      </div>

      <div className={s.FeedbackForm__row}>
        <Textarea
          onChange={setMessage}
          placeholder="💬 Сообщение..."
          name="message"
          value={message}
          required
        />
      </div>

      {hasError && (
        <div className={s.FeedbackForm__error}>
          Что-то пошло не так, попробуйте снова!
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? <span className={s.FeedbackForm__loading} /> : '✉️ '}
        Отправить
      </Button>
    </form>
  )
}
