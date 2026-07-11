/**
 * Runtime theme application.
 *
 * The whole palette is derived from three CSS tokens defined in
 * `src/assets/base.css` (`--color-background`, `--color-text`, `--color-primary`);
 * every other color is computed from them via `color-mix()`. A `Theme` fetched
 * from the API overrides just those three tokens on `:root`, and the rest of the
 * palette recomputes itself.
 *
 * When no theme is linked (`null`), we remove the overrides so `base.css` wins —
 * no default values are duplicated in JS.
 *
 * A localStorage cache lets us re-apply the last known theme synchronously at
 * boot, before the API responds, to avoid a flash of the default theme (FOUC).
 */

import type { Theme } from '@/types/models'

/** Theme field → the CSS custom property it overrides. */
const TOKEN_MAP: Record<keyof Omit<Theme, 'name'>, string> = {
  background: '--color-background',
  text: '--color-text',
  primary: '--color-primary'
}

const STORAGE_KEY = 'theme'

/**
 * Apply a theme (or clear overrides when `null`) and keep the cache in sync.
 * Only the three tokens are touched; everything derived recomputes on its own.
 */
export function applyTheme(theme: Theme | null): void {
  const root = document.documentElement

  if (!theme) {
    // Back to base.css defaults + drop the stale cache.
    Object.values(TOKEN_MAP).forEach((cssVar) => root.style.removeProperty(cssVar))
    localStorage.removeItem(STORAGE_KEY)
    return
  }

  for (const [field, cssVar] of Object.entries(TOKEN_MAP) as [keyof Theme, string][]) {
    root.style.setProperty(cssVar, theme[field])
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))
}

/**
 * Anti-FOUC: re-apply the last cached theme before the API fetch. A corrupted
 * cache is purged silently so a bad entry never blocks rendering.
 */
export function applyCachedTheme(): void {
  const cached = localStorage.getItem(STORAGE_KEY)
  if (!cached) return
  try {
    applyTheme(JSON.parse(cached) as Theme)
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
}
