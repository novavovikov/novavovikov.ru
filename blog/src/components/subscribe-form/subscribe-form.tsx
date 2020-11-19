import React from 'react'
import Input from '../../ui/input/input'
import Button from '../../ui/button'
import { useField } from '../../hooks/use-field'
import { PopupFormProps } from '../form-popup/form-popup'
import s from './subscribe-form.module.css'

interface Data {
  name: string
  message: string
}

export default function SubscribeForm({
  isLoading,
  hasError,
  onSubmit = () => {}
}: PopupFormProps<Data>) {
  const [email, setEmail] = useField('')

  const onSubmitForm: React.FormEventHandler = React.useCallback(
    (e) => {
      e.preventDefault()
      onSubmit({ name: email, message: '' })
    },
    [email]
  )

  return (
    <form className={s.SubscribeForm} onSubmit={onSubmitForm}>
      <h4 className={s.SubscribeForm__title}>📝 Подписаться на события</h4>

      <div className={s.SubscribeForm__row}>
        <Input
          value={email}
          onChange={setEmail}
          placeholder="📧 Ваш email..."
          name="name"
          autoFocus
        />
      </div>

      {hasError && (
        <div className={s.SubscribeForm__error}>
          Что-то пошло не так, попробуйте снова!
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? <span className={s.SubscribeForm__loading} /> : '✉️ '}
        Подписаться
      </Button>
    </form>
  )
}
