import { describe, expect, test } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { deriveUserSeo, stripHtml, useSeo } from '@/composables/useSeo'
import { seoConfig } from '@/config/seo'
import { mockUser } from '@/__test__/mocks'
import type { Social, User } from '@/types/models'

describe('stripHtml', () => {
  test('removes markup and collapses whitespace', () => {
    expect(stripHtml('<b>Building</b>\n  great   things')).toBe('Building great things')
    expect(stripHtml(undefined)).toBe('')
  })
})

describe('deriveUserSeo', () => {
  test('maps user fields to SEO fields', () => {
    const user: User = {
      ...mockUser,
      name: 'Ada Lovelace',
      locale: 'fr',
      hero: { ...mockUser.hero, tagline: '<span>Building the analytical engine</span>' },
    }

    const seo = deriveUserSeo(user)

    expect(seo.title).toBe('Ada Lovelace')
    expect(seo.description).toBe('Building the analytical engine')
    expect(seo.lang).toBe('fr')
    expect(seo.person['@type']).toBe('Person')
  })

  test('falls back to the about description then config description', () => {
    const noTagline: User = {
      ...mockUser,
      hero: { ...mockUser.hero, tagline: '' },
      about: { ...mockUser.about, description: 'About text' },
    }
    expect(deriveUserSeo(noTagline).description).toBe('About text')

    const empty: User = {
      ...mockUser,
      hero: { ...mockUser.hero, tagline: '' },
      about: { ...mockUser.about, description: '' },
    }
    expect(deriveUserSeo(empty).description).toBe(seoConfig.description)
  })

  test('exposes visible socials as JSON-LD sameAs and skips hidden ones', () => {
    const socials: Social[] = [
      { index: 0, hidden: false, name: 'GitHub', url: 'https://github.com/ada', image: mockUser.logo },
      { index: 1, hidden: true, name: 'Hidden', url: 'https://hidden.example', image: mockUser.logo },
    ]
    const seo = deriveUserSeo({ ...mockUser, socials })

    expect(seo.person.sameAs).toContain('https://github.com/ada')
    expect(seo.person.sameAs).not.toContain('https://hidden.example')
  })
})

describe('useSeo', () => {
  test('provides setUserSeo when mounted within a head context', () => {
    let api: ReturnType<typeof useSeo> | null = null
    const Comp = defineComponent({
      setup() {
        api = useSeo()
        return () => h('div')
      },
    })

    // The unhead plugin is provided globally in src/__test__/setup.ts
    mount(Comp)

    expect(api).not.toBeNull()
    expect(() => api!.setUserSeo(mockUser)).not.toThrow()
  })
})
