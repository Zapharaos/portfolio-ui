/**
 * Analytics configuration — single source of truth (umami).
 *
 * Privacy-friendly, cookieless analytics via (self-hosted) **umami**. This is the
 * ONLY file you need to touch to enable, disable or repoint analytics.
 *
 * Analytics is a pure runtime concern: `src/composables/useAnalytics.ts` injects
 * the umami tracker `<script>` into the page (once, browser-only) and exposes
 * `track()` for custom events. If analytics is disabled — or the host / websiteId
 * are missing — nothing is injected and every `track()` call is a safe no-op, so
 * callers never need to guard.
 *
 * Every field below is a default that can be overridden at build time with a
 * `VITE_UMAMI_*` env var (see `.env.example`), so deployment-specific ids can stay
 * out of the source and analytics can be flipped on/off per environment. The env
 * overrides are applied in `src/composables/useAnalytics.ts`.
 *
 * NOTE: like `seo.ts`, this module lives under `src/config`, which is also part of
 * the Node build project (`tsconfig.node.json`). It must therefore stay free of
 * `import.meta.env` — read env vars in the composable instead.
 */

export interface AnalyticsConfig {
  /**
   * Master switch. When `false`, no script is injected and `track()` is a no-op.
   * Even when `true`, analytics stays off until `host` and `websiteId` are set.
   * Override: `VITE_UMAMI_ENABLED` (`false` to disable).
   */
  enabled: boolean
  /**
   * Where the tracker `<script src>` is loaded from (no trailing slash).
   * Empty = analytics off. Override: `VITE_UMAMI_HOST`.
   */
  host: string
  /**
   * The site's UUID from the umami dashboard (Settings → Websites).
   * Empty = analytics off. Override: `VITE_UMAMI_WEBSITE_ID`.
   */
  websiteId: string
  /**
   * Tracker script filename — must match umami's `TRACKER_SCRIPT_NAME`
   * (e.g. `script.js` by default, or `stats.js` / `t.js` when renamed to dodge
   * ad-blockers). Mismatch = 404 = no tracking. Override: `VITE_UMAMI_SCRIPT_NAME`.
   */
  scriptName: string
  /**
   * First-party mode only: the domain (usually your own) the tracker posts events
   * to (`data-host-url`), proxied to umami by your reverse proxy. Empty = events
   * are sent directly to the script's origin (`host`). Override: `VITE_UMAMI_HOST_URL`.
   */
  hostUrl: string
}

// Edit the defaults below to make analytics your own, or leave `host` /
// `websiteId` empty and provide everything through `VITE_UMAMI_*` env vars.
export const analyticsConfig: AnalyticsConfig = {
  enabled: true,
  host: '',
  websiteId: '',
  scriptName: 'script.js',
  hostUrl: ''
}

export default analyticsConfig
