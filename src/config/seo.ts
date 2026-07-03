/**
 * SEO configuration — single source of truth.
 *
 * This is the ONLY file you need to edit to make the portfolio's SEO your own.
 * It feeds two layers:
 *   1. Build time  — `plugins/vite-plugin-seo.ts` injects these values as static
 *      tags into `index.html` and generates `robots.txt` / `sitemap.xml` /
 *      `site.webmanifest`. Static tags are required so social crawlers
 *      (LinkedIn, Facebook, X, Slack, Discord…) — which do NOT run JavaScript —
 *      can read the preview metadata.
 *   2. Runtime     — `src/composables/useSeo.ts` enriches the document head with
 *      the data fetched from the API (real name, description, og:image, locale,
 *      social links…).
 *
 * Image assets referenced here (favicons, OG image) are NOT generated: drop your
 * own files into `public/` and point the paths below at them.
 * `siteUrl` can be overridden at build time with the `VITE_SITE_URL` env var
 * (see `.env.example`); the value below is the fallback default.
 */

export interface SeoConfig {
  /** Human-readable site / brand name (used in og:site_name, title template). */
  siteName: string
  /** Canonical base URL, no trailing slash. Overridable via `VITE_SITE_URL`. */
  siteUrl: string
  /** Title used when no page-specific title is set. */
  defaultTitle: string
  /** Template for page titles. `%s` is replaced by the page title. */
  titleTemplate: string
  /** Default meta description. */
  description: string
  /** Keywords (optional — low SEO value nowadays, kept for completeness). */
  keywords: string[]
  /** BCP-47 / OG locale, e.g. `en`, `en_US`, `fr_FR`. Sets `<html lang>`. */
  locale: string
  /** Author / person behind the portfolio. */
  author: {
    name: string
    jobTitle: string
    url: string
  }
  /** Open Graph settings. `image` is a path under `public/` or an absolute URL. */
  og: {
    image: string
    imageAlt: string
    type: string
  }
  /** Twitter / X card settings. `handle` includes the leading `@` (or empty). */
  twitter: {
    card: 'summary' | 'summary_large_image'
    handle: string
  }
  /** Browser theme color (address bar / PWA). */
  themeColor: string
  /** Icon asset paths (files you provide in `public/`). */
  icons: {
    favicon: string
    appleTouchIcon: string
    icon192: string
    icon512: string
  }
  /** PWA web app manifest fields. */
  manifest: {
    name: string
    shortName: string
    backgroundColor: string
    display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser'
  }
  /** Search-engine indexing directives. */
  robots: {
    index: boolean
    follow: boolean
    /** Extra `Disallow:` paths for robots.txt (e.g. `['/admin']`). */
    disallow?: string[]
  }
  /** schema.org JSON-LD (Person + WebSite) structured data. */
  person: {
    enabled: boolean
    /** Social profile URLs (schema.org `sameAs`). Enriched at runtime from API. */
    sameAs?: string[]
  }
}

// NOTE: this module is shared with the Node build plugin, so it must stay free of
// `import.meta.env`. The `siteUrl` below is the fallback default; it is overridden
// by the `VITE_SITE_URL` env var at build time (in `plugins/vite-plugin-seo.ts`)
// and at runtime (in `src/composables/useSeo.ts`).
export const seoConfig: SeoConfig = {
  siteName: 'Matthieu Freitag',
  siteUrl: 'https://www.matthieu-freitag.com',
  defaultTitle: 'Matthieu Freitag',
  titleTemplate: '%s · Matthieu Freitag',
  description:
    'Portfolio of Matthieu Freitag — software engineer. Discover my projects, experiences and the technologies I work with.',
  keywords: ['portfolio', 'software engineer', 'developer', 'web', 'projects'],
  locale: 'en',
  author: {
    name: 'Matthieu Freitag',
    jobTitle: 'Software Engineer',
    url: 'https://www.matthieu-freitag.com',
  },
  og: {
    image: '/og-image.png',
    imageAlt: 'Matthieu Freitag — Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    handle: '',
  },
  themeColor: '#181818',
  icons: {
    favicon: '/logo.ico',
    appleTouchIcon: '/apple-touch-icon.png',
    icon192: '/icon-192.png',
    icon512: '/icon-512.png',
  },
  manifest: {
    name: 'Matthieu Freitag',
    shortName: 'Freitag',
    backgroundColor: '#181818',
    display: 'standalone',
  },
  robots: {
    index: true,
    follow: true,
  },
  person: {
    enabled: true,
  },
}

export default seoConfig
