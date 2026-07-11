import { expect, describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import OgImage from '@/components/OgImage.vue'
import { seoConfig } from '@/config/seo'
import { mockHero } from '@/__test__/mocks'

describe('OgImage.vue', () => {
  test('renders the OG card from the hero data and brand icon', () => {
    const wrapper = mount(OgImage, {
      propsData: {
        hero: mockHero
      }
    })

    expect(wrapper.find('#og-image').exists()).toBe(true)
    expect(wrapper.find('.og-title').text()).toBe(mockHero.title)
    // tagline is rendered as HTML
    expect(wrapper.find('.og-tagline').html()).toContain(mockHero.tagline)
    // background image reuses the hero background
    expect(wrapper.find('.og-bg img').attributes('src')).toBe(mockHero.backgroundImage.file)
    // brand mark reuses the colored PWA icon from the SEO config
    expect(wrapper.find('.og-logo').attributes('src')).toBe(seoConfig.icons.icon512)
  })
})
