/* Credits : https://web.dev/patterns/theming/theme-switch?hl=fr#js */

import { defineStore } from 'pinia';
import { onMounted } from 'vue'

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

const storageKey = 'theme-preference';

export const useThemeStore = defineStore('theme', () => {

  const getColorPreference = (): Theme => {
    if (localStorage.getItem(storageKey))
      return localStorage.getItem(storageKey) as Theme;
    else
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? Theme.DARK
        : Theme.LIGHT
  }

  const theme = {
    value: getColorPreference(),
  }

  const toggleTheme = () => {
    theme.value = theme.value === Theme.LIGHT
      ? Theme.DARK
      : Theme.LIGHT
    setPreference()
  }

  const setPreference = () => {
    localStorage.setItem(storageKey, theme.value as string)
    reflectPreference()
  }

  const reflectPreference = () => {
    if (theme.value === Theme.DARK) {
      document.firstElementChild?.classList.remove(Theme.LIGHT)
      document.firstElementChild?.classList.add(Theme.DARK)
    }
    else {
      document.firstElementChild?.classList.remove(Theme.DARK)
      document.firstElementChild?.classList.add(Theme.LIGHT)
    }
  }

  onMounted(() => {
    // set early so no page flashes / CSS is made aware
    reflectPreference()

    window.onload = () => {
      // set on load so screen readers can see latest value on the button
      reflectPreference()
    }

    // sync with system changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({matches:isDark}) => {
        theme.value = isDark ? Theme.DARK : Theme.LIGHT
        setPreference()
      })
  })

  return {theme, toggleTheme}
});