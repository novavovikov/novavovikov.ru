import React from 'react'
import useDarkMode from 'use-dark-mode'
import s from './theme-control.module.css'

export default function ThemeControl() {
  const [mounted, setMounted] = React.useState<boolean>(false)
  const { value: isDarkMode, toggle: switchTheme } = useDarkMode()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const { content, title } = React.useMemo(() => {
    if (!mounted) {
      return { content: null, title: '' }
    }

    if (isDarkMode) {
      return { content: '🌞', title: 'Светлая тема' }
    }

    return { content: '🌚', title: 'Тёмная тема' }
  }, [mounted, isDarkMode])

  return (
    <button
      className={s.ThemeControl}
      title={title}
      aria-label={title}
      onClick={switchTheme}>
      {content}
    </button>
  )
}
