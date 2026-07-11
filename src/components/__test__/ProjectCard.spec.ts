import { expect, describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '@/components/ProjectCard.vue'
import { mockProject } from '@/__test__/mocks'

describe('ProjectCard.vue', () => {
  test('does not render a title link when no url nor links are provided', () => {
    // Mount the ProjectCard without any url or links
    const wrapper = mount(ProjectCard, {
      propsData: {
        project: { ...mockProject, url: '', links: [] }
      }
    })

    // Assert that the title link and its arrow icon were not rendered
    expect(wrapper.find('.card-title-link').exists()).toBe(false)
    expect(wrapper.find('.link-open').exists()).toBe(false)
    // No links row either
    expect(wrapper.findComponent({ name: 'ProjectLinks' }).exists()).toBe(false)
  })

  test('renders a title link to the primary link when links are provided', () => {
    // Mount the ProjectCard with links
    const wrapper = mount(ProjectCard, {
      propsData: {
        project: mockProject
      }
    })

    // Assert that the title link and its arrow icon were rendered
    const titleLink = wrapper.find('a.card-title-link.clickable')
    expect(titleLink.exists()).toBe(true)
    expect(titleLink.attributes('href')).toBe(mockProject.links![0].url)
    expect(wrapper.find('.link-open').exists()).toBe(true)
  })

  test('renders a link per resolved link', () => {
    const wrapper = mount(ProjectCard, {
      propsData: {
        project: mockProject
      }
    })

    // The dedicated links row renders one anchor per link.
    expect(wrapper.findAll('.project-link').length).toBe(mockProject.links!.length)
  })

  test('falls back to the legacy url when links are absent', () => {
    const wrapper = mount(ProjectCard, {
      propsData: {
        project: { ...mockProject, links: undefined, url: 'https://legacy.com' }
      }
    })

    // A single website link is synthesized from project.url.
    const links = wrapper.findAll('.project-link')
    expect(links.length).toBe(1)
    expect(links[0].attributes('href')).toBe('https://legacy.com')
  })
})
