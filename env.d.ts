/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  /** Canonical site URL for SEO (overrides seoConfig.siteUrl). */
  readonly VITE_SITE_URL?: string
  /** Analytics master switch — set to 'false' to disable umami entirely. */
  readonly VITE_UMAMI_ENABLED?: string
  /** umami tracker host, e.g. https://analytics.example.com (no trailing slash). */
  readonly VITE_UMAMI_HOST?: string
  /** umami website UUID (dashboard → Settings → Websites). */
  readonly VITE_UMAMI_WEBSITE_ID?: string
  /** Tracker script filename (umami TRACKER_SCRIPT_NAME). Default: script.js. */
  readonly VITE_UMAMI_SCRIPT_NAME?: string
  /** First-party only: domain events are posted to (data-host-url). */
  readonly VITE_UMAMI_HOST_URL?: string
}
