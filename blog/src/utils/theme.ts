import { ls } from './storage'

export const DEFAULT_THEME = 'light'

export const initialTheme = ls.getItem('theme', DEFAULT_THEME)
