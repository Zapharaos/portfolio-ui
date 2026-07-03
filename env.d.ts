/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  /** Canonical site URL for SEO (overrides seoConfig.siteUrl). */
  readonly VITE_SITE_URL?: string
}
