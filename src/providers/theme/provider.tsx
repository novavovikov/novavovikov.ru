import React from 'react'
import { Theme, ThemeContext } from './context'
import { DEFAULT_THEME } from '../../utils/theme'

export default function ThemeProvider({ children }) {
  const [theme, onChangeTheme] = React.useState<Theme>(
    typeof window === `undefined`
      ? DEFAULT_THEME
      : (localStorage.getItem('theme') as Theme) ?? DEFAULT_THEME
  )
  const switchTheme = React.useCallback(() => {
    const updatedTheme = theme === 'light' ? 'dark' : 'light'

    localStorage.setItem('theme', updatedTheme)
    onChangeTheme(updatedTheme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        switchTheme
      }}>
      {children}
    </ThemeContext.Provider>
  )
}
