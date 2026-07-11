import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import {
  initAnalytics,
  resolveAnalyticsConfig,
  track,
  trackOutbound,
  useAnalytics
} from '@/composables/useAnalytics'

/** Fully control the umami env so tests don't depend on the repo's `.env`. */
function stubEnv(overrides: Record<string, string>): void {
  const keys = [
    'VITE_UMAMI_ENABLED',
    'VITE_UMAMI_HOST',
    'VITE_UMAMI_WEBSITE_ID',
    'VITE_UMAMI_SCRIPT_NAME',
    'VITE_UMAMI_HOST_URL'
  ]
  for (const key of keys) vi.stubEnv(key, overrides[key] ?? '')
}

function injectedScripts(): HTMLScriptElement[] {
  return Array.from(document.head.querySelectorAll('script[data-website-id]'))
}

describe('useAnalytics', () => {
  beforeEach(() => {
    document.head.querySelectorAll('script[data-website-id]').forEach((s) => s.remove())
    delete (window as { umami?: unknown }).umami
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  describe('resolveAnalyticsConfig', () => {
    test('falls back to config defaults when env is blank', () => {
      stubEnv({})
      const config = resolveAnalyticsConfig()
      expect(config.enabled).toBe(true) // config default
      expect(config.host).toBe('')
      expect(config.scriptName).toBe('script.js') // config default
    })

    test('lets env override the config and treats VITE_UMAMI_ENABLED=false as off', () => {
      stubEnv({
        VITE_UMAMI_ENABLED: 'false',
        VITE_UMAMI_HOST: 'https://analytics.example.com',
        VITE_UMAMI_WEBSITE_ID: 'uuid-123',
        VITE_UMAMI_SCRIPT_NAME: 'stats.js'
      })
      const config = resolveAnalyticsConfig()
      expect(config.enabled).toBe(false)
      expect(config.host).toBe('https://analytics.example.com')
      expect(config.scriptName).toBe('stats.js')
    })
  })

  describe('initAnalytics', () => {
    test('injects the umami script when enabled and configured', () => {
      stubEnv({
        VITE_UMAMI_ENABLED: 'true',
        VITE_UMAMI_HOST: 'https://analytics.example.com',
        VITE_UMAMI_WEBSITE_ID: 'uuid-123',
        VITE_UMAMI_SCRIPT_NAME: 'script.js'
      })

      initAnalytics()

      const scripts = injectedScripts()
      expect(scripts).toHaveLength(1)
      expect(scripts[0].getAttribute('src')).toBe('https://analytics.example.com/script.js')
      expect(scripts[0].getAttribute('data-website-id')).toBe('uuid-123')
      expect(scripts[0].hasAttribute('data-host-url')).toBe(false)
      expect(scripts[0].defer).toBe(true)
    })

    test('adds data-host-url in first-party mode and strips trailing slashes', () => {
      stubEnv({
        VITE_UMAMI_HOST: 'https://mysite.com/',
        VITE_UMAMI_WEBSITE_ID: 'uuid-123',
        VITE_UMAMI_SCRIPT_NAME: 'stats.js',
        VITE_UMAMI_HOST_URL: 'https://mysite.com/'
      })

      initAnalytics()

      const script = injectedScripts()[0]
      expect(script.getAttribute('src')).toBe('https://mysite.com/stats.js')
      expect(script.getAttribute('data-host-url')).toBe('https://mysite.com')
    })

    test('is idempotent — does not inject the same script twice', () => {
      stubEnv({ VITE_UMAMI_HOST: 'https://a.example.com', VITE_UMAMI_WEBSITE_ID: 'x' })

      initAnalytics()
      initAnalytics()

      expect(injectedScripts()).toHaveLength(1)
    })

    test('no-op when disabled', () => {
      stubEnv({
        VITE_UMAMI_ENABLED: 'false',
        VITE_UMAMI_HOST: 'https://a.example.com',
        VITE_UMAMI_WEBSITE_ID: 'x'
      })
      initAnalytics()
      expect(injectedScripts()).toHaveLength(0)
    })

    test('no-op when host or websiteId is missing', () => {
      stubEnv({ VITE_UMAMI_WEBSITE_ID: 'x' }) // no host
      initAnalytics()
      expect(injectedScripts()).toHaveLength(0)

      vi.unstubAllEnvs()
      stubEnv({ VITE_UMAMI_HOST: 'https://a.example.com' }) // no websiteId
      initAnalytics()
      expect(injectedScripts()).toHaveLength(0)
    })
  })

  describe('track', () => {
    test('forwards to window.umami.track when present', () => {
      const umamiTrack = vi.fn()
      ;(window as { umami?: unknown }).umami = { track: umamiTrack }

      track('cta-click', { section: 'hero' })

      expect(umamiTrack).toHaveBeenCalledWith('cta-click', { section: 'hero' })
    })

    test('is a safe no-op when umami is not loaded', () => {
      expect(() => track('whatever')).not.toThrow()
    })
  })

  describe('trackOutbound', () => {
    test('tags the event with context and destination host', () => {
      const umamiTrack = vi.fn()
      ;(window as { umami?: unknown }).umami = { track: umamiTrack }

      trackOutbound('https://github.com/user', 'social')

      expect(umamiTrack).toHaveBeenCalledWith('outbound', {
        context: 'social',
        url: 'https://github.com/user',
        host: 'github.com'
      })
    })

    test('merges extra properties (label, section) into the payload', () => {
      const umamiTrack = vi.fn()
      ;(window as { umami?: unknown }).umami = { track: umamiTrack }

      trackOutbound('https://acme.com/app', 'project', { label: 'Acme', section: 'Projects' })

      expect(umamiTrack).toHaveBeenCalledWith('outbound', {
        context: 'project',
        url: 'https://acme.com/app',
        host: 'acme.com',
        label: 'Acme',
        section: 'Projects'
      })
    })

    test('ignores an empty or null url', () => {
      const umamiTrack = vi.fn()
      ;(window as { umami?: unknown }).umami = { track: umamiTrack }

      trackOutbound('', 'social')
      trackOutbound(null, 'social')

      expect(umamiTrack).not.toHaveBeenCalled()
    })

    test('leaves host empty for a non-absolute url', () => {
      const umamiTrack = vi.fn()
      ;(window as { umami?: unknown }).umami = { track: umamiTrack }

      trackOutbound('mailto:me@example.com', 'email')

      expect(umamiTrack).toHaveBeenCalledWith('outbound', {
        context: 'email',
        url: 'mailto:me@example.com',
        host: ''
      })
    })
  })

  test('useAnalytics exposes track and trackOutbound', () => {
    const api = useAnalytics()
    expect(typeof api.track).toBe('function')
    expect(typeof api.trackOutbound).toBe('function')
  })
})
