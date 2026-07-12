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
    // Primary link has no label → default "View".
    expect(cta.text()).toContain('View')
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

  test('shows a "work in progress" badge when inProgress is set', () => {
    const wip = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, inProgress: true } }
    })
    expect(wip.find('.wip-pill').exists()).toBe(true)

    const notWip = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, inProgress: false } }
    })
    expect(notWip.find('.wip-pill').exists()).toBe(false)
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

  test('the primary CTA shows the link icon and adopts its color', () => {
    const wrapper = mount(ProjectCardFeatured, {
      propsData: {
        project: {
          ...mockProject,
          links: [
            {
              kind: 'github',
              url: 'https://github.com/x',
              label: 'GitHub',
              color: '#6e5494',
              icon: { name: 'gh', file: 'https://cdn.example.com/gh.svg' },
              index: 0
            }
          ]
        }
      }
    })
    const cta = wrapper.find('a.cta')
    expect(cta.classes()).toContain('colored')
    expect(cta.attributes('style')).toContain('--link-hue: #6e5494')
    // Icon rendered inside the CTA (SVG → masked span).
    expect(cta.find('.project-link-icon-mask').exists()).toBe(true)
  })

  test('renders no CTA when the project has no links', () => {
    const wrapper = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, links: [] } }
    })
    expect(wrapper.find('a.cta').exists()).toBe(false)
  })

  test('shows a green dot when up, red when down, nothing when unmonitored', () => {
    const up = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, healthUp: true } }
    })
    expect(up.find('.live-dot--up').exists()).toBe(true)

    const down = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, healthUp: false } }
    })
    expect(down.find('.live-dot--down').exists()).toBe(true)

    const nullish = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, healthUp: null } }
    })
    expect(nullish.find('.live-dot').exists()).toBe(false)

    const absent = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, healthUp: undefined } }
    })
    expect(absent.find('.live-dot').exists()).toBe(false)
  })

  test('frames the icon by default and drops the frame when iconFramed is false', () => {
    const framed = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, iconFramed: true } }
    })
    expect(framed.find('.app-icon').classes()).toContain('framed')

    // Default (undefined) is framed too.
    const byDefault = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, iconFramed: undefined } }
    })
    expect(byDefault.find('.app-icon').classes()).toContain('framed')

    const unframed = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, iconFramed: false } }
    })
    expect(unframed.find('.app-icon').classes()).not.toContain('framed')
  })

  test('applies the contain fit class when imageFit is "contain"', () => {
    const contain = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, imageFit: 'contain' } }
    })
    expect(contain.find('.app-icon').classes()).toContain('fit-contain')

    const cover = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, imageFit: 'cover' } }
    })
    expect(cover.find('.app-icon').classes()).not.toContain('fit-contain')
  })

  test('shows an initial placeholder when the project has no image', () => {
    const wrapper = mount(ProjectCardFeatured, {
      propsData: { project: { ...mockProject, image: undefined, title: 'zephyr' } }
    })
    expect(wrapper.find('.app-icon img').exists()).toBe(false)
    expect(wrapper.find('.app-icon-fallback').text()).toBe('Z')
  })
})
