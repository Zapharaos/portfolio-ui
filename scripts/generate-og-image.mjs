/**
 * Optional, dev-only Open Graph image generator.
 *
 *   npm run og:generate
 *
 * Starts the Vite dev server, opens the `/og` route (which renders the OgImage
 * card from the hero data) in a headless browser and screenshots it to
 * `public/og-image.png` at 1200×630.
 *
 * Requirements:
 *   - the backend API must be reachable (VITE_API_URL) so the hero data loads;
 *   - Playwright, installed on demand to keep the project install light:
 *       npm i -D playwright && npx playwright install chromium
 *
 * This is NOT part of the build/CI. You can also just drop your own
 * `public/og-image.png` (1200×630) and skip this entirely.
 */

import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const WIDTH = 1200
const HEIGHT = 630

async function main() {
  let chromium
  try {
    ;({ chromium } = await import('playwright'))
  } catch {
    console.error('\n[og:generate] Playwright is required for this optional tool.')
    console.error('Install it once with:\n  npm i -D playwright && npx playwright install chromium\n')
    process.exitCode = 1
    return
  }

  const { createServer } = await import('vite')
  const server = await createServer({ root, logLevel: 'silent' })
  await server.listen()

  const base = server.resolvedUrls?.local?.[0] ?? `http://localhost:${server.config.server.port}/`
  const ogUrl = new URL('og', base).href

  const browser = await chromium.launch()
  try {
    const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })
    await page.goto(ogUrl, { waitUntil: 'networkidle' })

    const card = await page.waitForSelector('#og-image', { timeout: 15000 }).catch(() => null)
    if (!card) {
      console.error(
        '\n[og:generate] The /og card did not render. Is the backend API (VITE_API_URL) running?\n',
      )
      process.exitCode = 1
      return
    }

    const out = path.join(root, 'public', 'og-image.png')
    await card.screenshot({ path: out })
    console.log(`[og:generate] Wrote ${path.relative(root, out)} (${WIDTH}×${HEIGHT})`)
  } finally {
    await browser.close()
    await server.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
