/* Credits : https://web.dev/articles/building/a-theme-switch-component?hl=fr */

import { defineStore } from 'pinia';

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

const storageKey = 'theme-preference';
const envSingleTheme: string = import.meta.env.VITE_SINGLE_THEME;

export const useThemeStore = defineStore('theme', () => {

  const singleTheme: Theme = envSingleTheme as Theme;
  const hasSingleTheme = singleTheme === Theme.DARK || singleTheme === Theme.LIGHT;

  const getColorPreference = (): Theme => {
    if(hasSingleTheme)
    {
      return singleTheme
    }
    else if (localStorage.getItem(storageKey))
    {
      return localStorage.getItem(storageKey) as Theme;
    }
    else
    {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? Theme.DARK
        : Theme.LIGHT
    }
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
    const root = document.querySelector<HTMLElement>(':root');
    if (theme.value === Theme.DARK) {
      console.log("dark")
      document.firstElementChild?.classList.remove(Theme.LIGHT)
      document.firstElementChild?.classList.add(Theme.DARK)
      root?.style.setProperty('--color-background', 'var(--dark-color)');
      root?.style.setProperty('--color-text', 'var(--light-color)');
      root?.style.setProperty('--color-text-opposite', 'var(--dark-color)');
      root?.style.setProperty('--color-header-hover', 'var(--color-header-hover-dark)');
      root?.style.setProperty('--filter-img-color', 'var(--filter-img-color-dark)');
    }
    else {
      console.log("light")
      document.firstElementChild?.classList.remove(Theme.DARK)
      document.firstElementChild?.classList.add(Theme.LIGHT)
      root?.style.setProperty('--color-background', 'var(--light-color)');
      root?.style.setProperty('--color-text', 'var(--dark-color)');
      root?.style.setProperty('--color-text-opposite', 'var(--light-color)');
      root?.style.setProperty('--color-header-hover', 'var(--color-header-hover-light)');
      root?.style.setProperty('--filter-img-color', 'var(--filter-img-color-light)');
    }
  }

  // set early so no page flashes / CSS is made aware
  reflectPreference()

  window.onload = () => {
    // set on load so screen readers can see latest value on the button
    reflectPreference()
  }

  if (!hasSingleTheme)
  {
    // sync with system changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({matches:isDark}) => {
        theme.value = isDark ? Theme.DARK : Theme.LIGHT
        setPreference()
      })
  }

  return {
    hasSingleTheme,
    theme,
    toggleTheme,
  }
});