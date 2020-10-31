import React from 'react'

export type Theme = 'dark' | 'light'

export interface ThemeContextValue {
  theme: Theme
  switchTheme: () => void
}

export const ThemeContext = React.createContext<Nulled<ThemeContextValue>>(null)

export const useThemeContext = () => {
  const value = React.useContext(ThemeContext)

  if (!value) {
    throw new Error('Could not be used outside of ThemeContext')
  }

  return value
}
