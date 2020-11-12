import { Theme } from '../providers/theme/context'

export const DEFAULT_THEME = 'light'

export const initialTheme =
  typeof window === `undefined`
    ? DEFAULT_THEME
    : (localStorage.getItem('theme') as Theme) ?? DEFAULT_THEME
