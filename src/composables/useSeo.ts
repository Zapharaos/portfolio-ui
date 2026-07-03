/**
 * Runtime head management.
 *
 * The static SEO baseline already lives in `index.html` (injected at build time
 * from `src/config/seo.ts`). This composable enriches it with the data fetched
 * from the API — real name, description, locale and the Person JSON-LD with the
 * actual social links.
 *
 * `@unhead/vue` deduplicates tags by their identity (`title`, `meta[name|property]`,
 * `link[rel=canonical]`), so updating these here reuses the static elements
 * instead of duplicating them.
 */

import { reactive } from 'vue'
import { useHead } from '@unhead/vue'
import { seoConfig } from '@/config/seo'
import { absoluteUrl, buildPersonJsonLd } from '@/config/seo-tags'
import type { User } from '@/types/models'

/** Strip HTML tags and collapse whitespace (hero taglines may contain markup). */
export function stripHtml(value?: string): string {
  if (!value) return ''
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export interface UserSeo {
  title: string
  description: string
  lang: string
  person: Record<string, unknown>
}

// Canonical URL, overridable at runtime via the VITE_SITE_URL env var.
const siteUrl =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || seoConfig.siteUrl

/** Pure mapping from the API user object to the dynamic SEO fields. */
export function deriveUserSeo(user: User, canonicalUrl: string = siteUrl): UserSeo {
  return {
    title: user.name || seoConfig.defaultTitle,
    description:
      stripHtml(user.hero?.tagline) ||
      stripHtml(user.about?.description) ||
      seoConfig.description,
    lang: user.locale || seoConfig.locale,
    person: buildPersonJsonLd(seoConfig, canonicalUrl, {
      email: user.email,
      location: user.location,
      sameAs: (user.socials ?? [])
        .filter((social) => !social.hidden)
        .map((social) => social.url)
        .filter(Boolean),
    }),
  }
}

export function useSeo() {
  const state = reactive({
    title: seoConfig.defaultTitle,
    description: seoConfig.description,
    // og:image stays the dedicated share image from the config (public/og-image.png);
    // the logo is usually a small square and makes a poor social preview.
    ogImage: absoluteUrl(seoConfig.og.image, siteUrl),
    lang: seoConfig.locale,
    person: buildPersonJsonLd(seoConfig, siteUrl) as Record<string, unknown>,
  })

  useHead({
    title: () => state.title,
    titleTemplate: (title?: string) =>
      title && title !== seoConfig.defaultTitle
        ? seoConfig.titleTemplate.replace('%s', title)
        : seoConfig.defaultTitle,
    htmlAttrs: { lang: () => state.lang },
    meta: [
      { name: 'description', content: () => state.description },
      { property: 'og:title', content: () => state.title },
      { property: 'og:description', content: () => state.description },
      { property: 'og:image', content: () => state.ogImage },
      { name: 'twitter:title', content: () => state.title },
      { name: 'twitter:description', content: () => state.description },
      { name: 'twitter:image', content: () => state.ogImage },
    ],
    script: seoConfig.person.enabled
      ? [
          {
            type: 'application/ld+json',
            key: 'schema-person',
            innerHTML: () => JSON.stringify(state.person),
          },
        ]
      : [],
  })

  /** Enrich the head with the fetched user data. */
  function setUserSeo(user: User): void {
    const derived = deriveUserSeo(user)
    state.title = derived.title
    state.description = derived.description
    state.lang = derived.lang
    state.person = derived.person
  }

  return { setUserSeo }
}
