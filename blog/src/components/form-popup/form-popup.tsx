import React from 'react'
import axios from 'axios'
import { useAsyncFn } from 'react-use'
import Popup, { PopupProps } from '../popup'

export interface PopupFormProps<Data> {
  isLoading?: boolean
  hasError?: boolean
  onSubmit?: (data: Data) => void
}

interface Props extends PopupProps {
  requestUrl: string
  successMessage?: string
}

export default function FormPopup<Data>(props: Props) {
  const {
    children,
    successMessage = 'Спасибо, сообщение отправлено!',
    ...restProps
  } = props
  const [state, request] = useAsyncFn(
    async (data: Data) => axios.post(request.url, data),
    []
  )

  const isDone = Boolean(state.value)

  return (
    <Popup {...restProps}>
      {isDone && <div>{successMessage}</div>}

      {!isDone && (
        <>
          {React.Children.toArray(children).map((child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                isLoading: state.loading,
                hasError: Boolean(state.error),
                onSubmit: request
              })
            }
          })}
        </>
      )}
    </Popup>
  )
}
