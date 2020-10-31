import React from 'react'
import { Theme, ThemeContext } from './context'

const initialTheme = (localStorage.getItem('theme') as Theme) ?? 'dark'

export default function ThemeProvider({ children }) {
  const [theme, onChangeTheme] = React.useState<Theme>(initialTheme)
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
