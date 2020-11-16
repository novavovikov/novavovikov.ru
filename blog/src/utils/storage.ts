import { EventType } from '../typings/event'
import { isObject } from './object'

interface LSData {
  lastEvent: EventType | null
}

// FIXME remove this validation
function validateData(data: any) {
  try {
    const value = JSON.parse(data)
    return isObject(value) ? value : data
  } catch (err) {
    return data
  }
}

export const ls = {
  getItem: <Key extends keyof LSData>(
    key: Key,
    defaultValue: LSData[Key]
  ): LSData[Key] => {
    if (typeof window === `undefined`) {
      return defaultValue
    }

    const data = localStorage.getItem(key)
    const value: LSData[Key] = validateData(data)

    return value ?? defaultValue
  },
  setItem: <Key extends keyof LSData>(key: Key, value: LSData[Key]) => {
    if (typeof window !== `undefined`) {
      const data = isObject(value) ? JSON.stringify(value) : value

      localStorage.setItem(key, data as string)
    }
  }
}
