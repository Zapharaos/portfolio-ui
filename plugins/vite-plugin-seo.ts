/**
 * Build-time SEO plugin.
 *
 * Reads the single source of truth (`src/config/seo.ts`) and:
 *   - injects static SEO tags (title, description, Open Graph, Twitter, canonical,
 *     favicons, JSON-LD, `<html lang>`) into `index.html` — so crawlers that do
 *     NOT run JavaScript (social-media link scrapers, etc.) get the metadata;
 *   - generates `robots.txt`, `sitemap.xml` and `site.webmanifest` from the config.
 *
 * The canonical URL is taken from `VITE_SITE_URL` when set, otherwise from
 * `seoConfig.siteUrl`.
 */

import type { HtmlTagDescriptor, Plugin } from 'vite'
import { seoConfig } from '../src/config/seo'
import { buildBaseHead } from '../src/config/seo-tags'

/** Routes to list in the sitemap (the 404 catch-all is intentionally excluded). */
const SITEMAP_ROUTES = ['/']

function buildRobotsTxt(siteUrl: string): string {
  const lines = ['User-agent: *']
  if (seoConfig.robots.index) {
    lines.push('Allow: /')
  } else {
    lines.push('Disallow: /')
  }
  for (const path of seoConfig.robots.disallow ?? []) {
    lines.push(`Disallow: ${path}`)
  }
  lines.push('', `Sitemap: ${siteUrl}/sitemap.xml`, '')
  return lines.join('\n')
}

function buildSitemapXml(siteUrl: string): string {
  const urls = SITEMAP_ROUTES.map(
    (route) => `  <url>\n    <loc>${siteUrl}${route}</loc>\n  </url>`,
  ).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function buildWebManifest(): string {
  const { manifest, icons, themeColor, siteName } = seoConfig
  return JSON.stringify(
    {
      name: manifest.name || siteName,
      short_name: manifest.shortName,
      description: seoConfig.description,
      start_url: '/',
      display: manifest.display,
      background_color: manifest.backgroundColor,
      theme_color: themeColor,
      icons: [
        { src: icons.icon192, sizes: '192x192', type: 'image/png' },
        { src: icons.icon512, sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  )
}

/** Serialize the shared {@link buildBaseHead} data into Vite HTML tag descriptors. */
function renderHeadTags(siteUrl: string): HtmlTagDescriptor[] {
  const head = buildBaseHead(seoConfig, siteUrl)
  const tags: HtmlTagDescriptor[] = [{ tag: 'title', children: head.title, injectTo: 'head' }]

  for (const m of head.meta) {
    const attrs: Record<string, string> = { content: m.content }
    if (m.name) attrs.name = m.name
    if (m.property) attrs.property = m.property
    tags.push({ tag: 'meta', attrs, injectTo: 'head' })
  }

  for (const l of head.link) {
    const attrs: Record<string, string> = { rel: l.rel, href: l.href }
    if (l.sizes) attrs.sizes = l.sizes
    if (l.type) attrs.type = l.type
    tags.push({ tag: 'link', attrs, injectTo: 'head' })
  }

  for (const block of head.jsonLd) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      children: JSON.stringify(block),
      injectTo: 'head',
    })
  }

  return tags
}

export default function seoPlugin(): Plugin {
  let siteUrl = seoConfig.siteUrl

  return {
    name: 'vite-plugin-seo',

    configResolved(config) {
      const envUrl = config.env.VITE_SITE_URL as string | undefined
      siteUrl = (envUrl || seoConfig.siteUrl).replace(/\/$/, '')
    },

    transformIndexHtml(html) {
      return {
        // Normalize the opening <html> tag so it carries the configured locale.
        html: html.replace(/<html\b[^>]*>/i, `<html lang="${seoConfig.locale}">`),
        tags: renderHeadTags(siteUrl),
      }
    },

    // Emit the static SEO files as build assets (they are not tracked in public/).
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobotsTxt(siteUrl) })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemapXml(siteUrl) })
      this.emitFile({ type: 'asset', fileName: 'site.webmanifest', source: buildWebManifest() })
    },

    // Serve the generated files during `vite dev` (they only exist at build time).
    configureServer(server) {
      const files: Record<string, { type: string; body: () => string }> = {
        '/robots.txt': { type: 'text/plain', body: () => buildRobotsTxt(siteUrl) },
        '/sitemap.xml': { type: 'application/xml', body: () => buildSitemapXml(siteUrl) },
        '/site.webmanifest': { type: 'application/manifest+json', body: () => buildWebManifest() },
      }
      server.middlewares.use((req, res, next) => {
        const match = req.url && files[req.url.split('?')[0]]
        if (!match) return next()
        res.setHeader('Content-Type', match.type)
        res.end(match.body())
      })
    },
  }
}
