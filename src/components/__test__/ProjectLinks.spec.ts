import { expect, describe, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectLinks from '@/components/ProjectLinks.vue'
import type { ProjectLink } from '@/types/models'

const links: ProjectLink[] = [
  { kind: 'github', url: 'https://github.com/example', label: '', index: 10 },
  { kind: 'website', url: 'https://example.com', label: 'My custom label', index: 20 }
]

describe('ProjectLinks.vue', () => {
  test('renders one anchor per link', () => {
    const wrapper = mount(ProjectLinks, { propsData: { links } })
    expect(wrapper.findAll('.project-link').length).toBe(links.length)
  })

  test('falls back to "View" (no default icon) when neither label nor icon is set', () => {
    const wrapper = mount(ProjectLinks, { propsData: { links } })
    const anchors = wrapper.findAll('.project-link')
    // First link has no label and no icon -> neutral "View", no icon at all.
    expect(anchors[0].text()).toBe('View')
    expect(anchors[0].find('.project-link-icon').exists()).toBe(false)
    // Second link has a custom label -> shown as-is.
    expect(anchors[1].text()).toBe('My custom label')
  })

  test('shows no text and no icon element when an icon is set but no label', () => {
    const iconNoLabel: ProjectLink[] = [
      {
        kind: 'github',
        url: 'https://github.com/example',
        label: '',
        icon: { name: 'gh', file: 'https://cdn.example.com/gh.png' },
        index: 10
      }
    ]
    const wrapper = mount(ProjectLinks, { propsData: { links: iconNoLabel } })
    const anchor = wrapper.find('.project-link')
    expect(anchor.find('img.project-link-icon-img').exists()).toBe(true)
    expect(anchor.text()).toBe('')
  })

  test('places the icon after the label when iconPosition is "after"', () => {
    const afterLinks: ProjectLink[] = [
      {
        kind: 'other',
        url: 'https://x.com',
        label: 'Open',
        icon: { name: 'ext', file: 'https://cdn.example.com/ext.svg' },
        iconPosition: 'after',
        index: 10
      }
    ]
    const wrapper = mount(ProjectLinks, { propsData: { links: afterLinks } })
    const children = Array.from(wrapper.find('.project-link').element.children)
    // Last child is the icon (span mask), first is the label span.
    expect(children[0].tagName.toLowerCase()).toBe('span')
    expect(children[children.length - 1].classList.contains('project-link-icon-mask')).toBe(true)
  })

  test('tints SVG icons via mask, renders raster icons as <img>', () => {
    const iconLinks: ProjectLink[] = [
      {
        kind: 'other',
        url: 'https://svg.example.com',
        label: 'Svg',
        icon: { name: 'vec', file: 'https://cdn.example.com/logo.svg' },
        index: 10
      },
      {
        kind: 'other',
        url: 'https://png.example.com',
        label: 'Png',
        icon: { name: 'raster', file: 'https://cdn.example.com/logo.png' },
        index: 20
      }
    ]
    const wrapper = mount(ProjectLinks, { propsData: { links: iconLinks } })
    const anchors = wrapper.findAll('.project-link')

    // SVG → masked span carrying the icon URL, no <img>.
    const mask = anchors[0].find('.project-link-icon-mask')
    expect(mask.exists()).toBe(true)
    expect(mask.attributes('style')).toContain('https://cdn.example.com/logo.svg')
    expect(anchors[0].find('img').exists()).toBe(false)

    // PNG → plain <img>, no mask.
    expect(anchors[1].find('img.project-link-icon-img').exists()).toBe(true)
    expect(anchors[1].find('.project-link-icon-mask').exists()).toBe(false)
  })

  test('applies the colored class and --link-hue when a color is set', () => {
    const colored: ProjectLink[] = [
      { kind: 'github', url: 'https://github.com/x', label: '', color: '#22cc88', index: 10 },
      { kind: 'website', url: 'https://x.com', label: '', index: 20 }
    ]
    const wrapper = mount(ProjectLinks, { propsData: { links: colored } })
    const anchors = wrapper.findAll('.project-link')

    expect(anchors[0].classes()).toContain('colored')
    expect(anchors[0].attributes('style')).toContain('--link-hue: #22cc88')
    expect(anchors[1].classes()).not.toContain('colored')
  })

  test('tracks outbound clicks', async () => {
    const analytics = await import('@/composables/useAnalytics')
    const spy = vi.spyOn(analytics, 'trackOutbound').mockImplementation(() => {})

    const wrapper = mount(ProjectLinks, {
      propsData: { links, projectTitle: 'My Project' }
    })
    await wrapper.find('.project-link').trigger('click')

    expect(spy).toHaveBeenCalledWith('https://github.com/example', 'project', {
      label: 'My Project',
      kind: 'github'
    })
    spy.mockRestore()
  })
})
