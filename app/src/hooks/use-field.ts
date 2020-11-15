import React from 'react'

type Handler = React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>

export const useField = (initialValue: string): [string, Handler] => {
  const [value, setValue] = React.useState<string>(initialValue)

  const onChangeValue = React.useCallback<Handler>((e) => {
    setValue(e.target.value)
  }, [])

  return [value, onChangeValue]
}
