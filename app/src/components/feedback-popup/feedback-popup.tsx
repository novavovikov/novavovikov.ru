import React from 'react'
import axios from 'axios'
import { useAsyncFn } from 'react-use'
import FeedbackForm from '../feedback-form/feedback-form'
import Popup, { PopupProps } from '../popup'

export default function FeedbackPopup(props: PopupProps) {
  const [state, request] = useAsyncFn(
    async (from: string, message: string) =>
      axios.post('/feedback', { from, message }),
    []
  )

  const isDone = Boolean(state.value)

  return (
    <Popup {...props}>
      {isDone && <div>Спасибо, сообщение отправлено!</div>}

      {!isDone && (
        <FeedbackForm
          isLoading={state.loading}
          hasError={Boolean(state.error)}
          onSubmit={request}
        />
      )}
    </Popup>
  )
}
