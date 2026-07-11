/**
 * Framework-neutral builders that turn {@link SeoConfig} into head data.
 *
 * Shared by both SEO layers so they stay in sync:
 *   - `plugins/vite-plugin-seo.ts` serializes the result to static HTML tags.
 *   - `src/composables/useSeo.ts` feeds the result to `@unhead/vue`.
 */

import type { SeoConfig } from './seo'

export interface HeadMeta {
  name?: string
  property?: string
  content: string
}

export interface HeadLink {
  rel: string
  href: string
  sizes?: string
  type?: string
}

export interface HeadData {
  title: string
  lang: string
  meta: HeadMeta[]
  link: HeadLink[]
  /** JSON-LD blocks (each serialized into its own <script type="application/ld+json">). */
  jsonLd: Record<string, unknown>[]
}

/** Absolute-ify a path (`/og-image.png`) against the site URL; pass-through for URLs. */
export function absoluteUrl(pathOrUrl: string, siteUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  return `${siteUrl.replace(/\/$/, '')}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`
}

/** `robots` meta content, e.g. `"index, follow"` / `"noindex, nofollow"`. */
export function robotsContent(robots: SeoConfig['robots']): string {
  return `${robots.index ? 'index' : 'noindex'}, ${robots.follow ? 'follow' : 'nofollow'}`
}

/** schema.org Person structured data (optionally enriched with API values). */
export function buildPersonJsonLd(
  config: SeoConfig,
  siteUrl: string,
  extra?: { email?: string; location?: string; sameAs?: string[] }
): Record<string, unknown> {
  const sameAs = [...(config.person.sameAs ?? []), ...(extra?.sameAs ?? [])].filter(Boolean)
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.author.name,
    jobTitle: config.author.jobTitle,
    url: siteUrl,
    ...(config.og.image ? { image: absoluteUrl(config.og.image, siteUrl) } : {}),
    ...(extra?.email ? { email: extra.email } : {}),
    ...(extra?.location ? { address: extra.location } : {}),
    ...(sameAs.length ? { sameAs } : {})
  }
}

/** schema.org WebSite structured data. */
export function buildWebSiteJsonLd(config: SeoConfig, siteUrl: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.siteName,
    url: siteUrl,
    ...(config.description ? { description: config.description } : {})
  }
}

/**
 * Full static SEO baseline derived from the config. Used at build time and as the
 * runtime default.
 */
export function buildBaseHead(config: SeoConfig, siteUrl: string = config.siteUrl): HeadData {
  const ogImage = absoluteUrl(config.og.image, siteUrl)

  const meta: HeadMeta[] = [
    { name: 'description', content: config.description },
    { name: 'author', content: config.author.name },
    { name: 'robots', content: robotsContent(config.robots) },
    { name: 'theme-color', content: config.themeColor },
    // Open Graph
    { property: 'og:site_name', content: config.siteName },
    { property: 'og:title', content: config.defaultTitle },
    { property: 'og:description', content: config.description },
    { property: 'og:type', content: config.og.type },
    { property: 'og:url', content: siteUrl },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:alt', content: config.og.imageAlt },
    { property: 'og:locale', content: config.locale },
    // Twitter
    { name: 'twitter:card', content: config.twitter.card },
    { name: 'twitter:title', content: config.defaultTitle },
    { name: 'twitter:description', content: config.description },
    { name: 'twitter:image', content: ogImage }
  ]

  if (config.keywords.length) {
    meta.push({ name: 'keywords', content: config.keywords.join(', ') })
  }
  if (config.twitter.handle) {
    meta.push({ name: 'twitter:site', content: config.twitter.handle })
    meta.push({ name: 'twitter:creator', content: config.twitter.handle })
  }

  const link: HeadLink[] = [
    { rel: 'canonical', href: siteUrl },
    { rel: 'icon', href: config.icons.favicon },
    { rel: 'apple-touch-icon', href: config.icons.appleTouchIcon },
    { rel: 'manifest', href: '/site.webmanifest' }
  ]

  // Only the WebSite block is emitted statically. The Person block is added at
  // runtime (see useSeo) because its `sameAs` links come from the API data, and
  // keeping it runtime-only avoids duplicating it against the static markup.
  const jsonLd: Record<string, unknown>[] = [buildWebSiteJsonLd(config, siteUrl)]

  return {
    title: config.defaultTitle,
    lang: config.locale,
    meta,
    link,
    jsonLd
  }
}
