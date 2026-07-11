import { expect, describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCardFeatured from '@/components/ProjectCardFeatured.vue'
import ProjectLinks from '@/components/ProjectLinks.vue'
import TechnologiesList from '@/components/TechnologiesList.vue'
import { mockProject } from '@/__test__/mocks'

describe('ProjectCardFeatured.vue', () => {
  test('renders title, app icon, technologies and a primary CTA', () => {
    const wrapper = mount(ProjectCardFeatured, { propsData: { project: mockProject } })

    expect(wrapper.find('.card-title').text()).toContain(mockProject.title)
    expect(wrapper.find('.app-icon img').attributes('src')).toBe(mockProject.image!.file)
    expect(wrapper.findComponent(TechnologiesList).exists()).toBe(true)

    const cta = wrapper.find('a.cta')
    expect(cta.exists()).toBe(true)
    expect(cta.attributes('href')).toBe(mockProject.links![0].url)
    expect(cta.text()).toContain('Voir')
  })

  test('renders remaining links as secondary links, not in the CTA', () => {
    const wrapper = mount(ProjectCardFeatured, { propsData: { project: mockProject } })
    // mockProject has 2 links: 1 becomes the CTA, the rest go to ProjectLinks.
    const secondary = wrapper.findComponent(ProjectLinks)
    expect(secondary.exists()).toBe(true)
    expect(secondary.props('links').length).toBe(mockProject.links!.length - 1)
  })

  test('shows the category badge, metric and "new" ribbon when provided', () => {
    const wrapper = mount(ProjectCardFeatured, {
      propsData: {
        project: { ...mockProject, category: 'Secondaire', metric: '~6k € ARR', isNew: true }
      }
    })
    expect(wrapper.find('.badge').text()).toBe('Secondaire')
    expect(wrapper.find('.metric').text()).toBe('~6k € ARR')
    expect(wrapper.find('.new-pill').exists()).toBe(true)
  })

  test('hides badge, metric and ribbon when absent', () => {
    const wrapper = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, category: '', metric: '', isNew: false } }
    })
    expect(wrapper.find('.badge').exists()).toBe(false)
    expect(wrapper.find('.metric').exists()).toBe(false)
    expect(wrapper.find('.new-pill').exists()).toBe(false)
  })

  test('uses the custom label for the CTA when the primary link has one', () => {
    const wrapper = mount(ProjectCardFeatured, {
      propsData: {
        project: { ...mockProject, links: [{ kind: 'website', url: 'https://x.com', label: 'Demo', index: 0 }] }
      }
    })
    expect(wrapper.find('a.cta').text()).toContain('Demo')
  })

  test('falls back to the legacy url when links are absent', () => {
    const wrapper = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, links: undefined, url: 'https://legacy.com' } }
    })
    expect(wrapper.find('a.cta').attributes('href')).toBe('https://legacy.com')
  })

  test('shows the Live dot only when healthUp is true', () => {
    const up = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, healthUp: true } }
    })
    expect(up.find('.live-dot').exists()).toBe(true)

    const down = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, healthUp: false } }
    })
    expect(down.find('.live-dot').exists()).toBe(false)

    const nullish = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, healthUp: null } }
    })
    expect(nullish.find('.live-dot').exists()).toBe(false)

    const absent = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, healthUp: undefined } }
    })
    expect(absent.find('.live-dot').exists()).toBe(false)
  })

  test('shows an initial placeholder when the project has no image', () => {
    const wrapper = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, image: undefined, title: 'zephyr' } }
    })
    expect(wrapper.find('.app-icon img').exists()).toBe(false)
    expect(wrapper.find('.app-icon-fallback').text()).toBe('Z')
  })
})
