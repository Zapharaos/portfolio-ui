/**
 * Analytics (umami) — runtime wiring.
 *
 * Injects the umami tracking `<script>` (self-hosted or cloud) and exposes helpers
 * to record custom events. Everything is driven by `src/config/analytics.ts`.
 *
 * Safe by design:
 *   - browser-only (guards against SSR / prerender where `document` is absent);
 *   - no-op when analytics is disabled or `host` / `websiteId` are missing, so the
 *     script is never injected and `track()` can be called unconditionally;
 *   - idempotent injection — calling `initAnalytics()` twice loads a single script.
 */

import { analyticsConfig, type AnalyticsConfig } from '@/config/analytics'

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: Record<string, unknown>) => void
    }
  }
}

/**
 * Effective config: the `src/config/analytics.ts` defaults with the `VITE_UMAMI_*`
 * env vars layered on top. Kept here (not in the config module) because that module
 * is shared with the Node build project and must stay free of `import.meta.env`.
 */
export function resolveAnalyticsConfig(): AnalyticsConfig {
  const env = import.meta.env
  // A blank env var counts as "unset" so the config default wins — this keeps
  // `src/config/analytics.ts` the real fallback even when `.env` lists the keys.
  const pick = (value: string | undefined, fallback: string): string =>
    (value ?? '').trim() || fallback
  const enabledEnv = (env.VITE_UMAMI_ENABLED ?? '').trim().toLowerCase()

  return {
    enabled: enabledEnv === '' ? analyticsConfig.enabled : enabledEnv !== 'false',
    host: pick(env.VITE_UMAMI_HOST, analyticsConfig.host),
    websiteId: pick(env.VITE_UMAMI_WEBSITE_ID, analyticsConfig.websiteId),
    scriptName: pick(env.VITE_UMAMI_SCRIPT_NAME, analyticsConfig.scriptName),
    hostUrl: pick(env.VITE_UMAMI_HOST_URL, analyticsConfig.hostUrl)
  }
}

/** True only when we're in a browser and analytics is fully configured. */
function isActive(config: AnalyticsConfig): boolean {
  return typeof document !== 'undefined' && config.enabled && !!config.host && !!config.websiteId
}

/**
 * Inject the umami tracker `<script>`. Call once (from `App.vue`). No-op on the
 * server, when analytics is disabled, or if the script is already present.
 */
export function initAnalytics(): void {
  const config = resolveAnalyticsConfig()
  if (!isActive(config)) return

  const { host, websiteId, scriptName, hostUrl } = config
  const src = `${host.replace(/\/$/, '')}/${scriptName.replace(/^\//, '')}`

  // Idempotent: don't inject the tracker twice (e.g. HMR / re-mounts).
  if (document.querySelector(`script[src="${src}"]`)) return

  const script = document.createElement('script')
  script.defer = true
  script.src = src
  script.setAttribute('data-website-id', websiteId)
  // First-party mount: `data-host-url` is the domain the script posts events to,
  // proxied to umami by your reverse proxy. Absent = post to the script's origin.
  if (hostUrl) {
    script.setAttribute('data-host-url', hostUrl.replace(/\/$/, ''))
  }
  document.head.appendChild(script)
}

/**
 * Record a custom event. Safe to call unconditionally — no-op until the umami
 * script has loaded (or forever, if analytics is disabled).
 */
export function track(eventName: string, data?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  window.umami?.track(eventName, data)
}

/**
 * Record an outbound click, tagging the event with the destination host so links
 * to different services can be told apart in the dashboard:
 * `outbound` + `{ context, url, host, ...extra }`.
 * @param context broad category of the click (e.g. `'social'`, `'resume'`,
 *   `'project'`, `'experience'`).
 * @param extra optional extra properties, e.g. `{ label, section }` to identify
 *   which project/experience and under which section it was clicked.
 */
export function trackOutbound(
  url: string | null | undefined,
  context: string,
  extra: Record<string, unknown> = {}
): void {
  if (!url) return
  let host = ''
  try {
    host = new URL(url).hostname
  } catch {
    // Not an absolute URL (e.g. `mailto:` / relative) — leave host empty.
  }
  track('outbound', { context, url, host, ...extra })
}

/** Composable form, for components that prefer the `useX()` convention. */
export function useAnalytics() {
  return { track, trackOutbound }
}
