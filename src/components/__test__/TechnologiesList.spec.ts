import { expect, describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import TechnologiesList from '@/components/TechnologiesList.vue'
import { mockTechnologies } from '@/__test__/mocks'

describe('TechnologiesList.vue', () => {
  test('renders correct amount of technology tags', () => {
    // Mount the TechnologiesList with technologies
    const wrapper = mount(TechnologiesList, {
      propsData: {
        technologies: mockTechnologies
      }
    })

    // Assert that the technologies were correctly added to the DOM.
    expect(wrapper.findAll('.technologies-tag').length).toBe(mockTechnologies.length)
  })

  test('applies colored class and --tag-hue only to tags with a color', () => {
    const wrapper = mount(TechnologiesList, {
      propsData: {
        technologies: mockTechnologies
      }
    })

    const tags = wrapper.findAll('.technologies-tag')
    // First mock tech has a color, the others do not.
    expect(tags[0].classes()).toContain('colored')
    expect(tags[0].attributes('style')).toContain('--tag-hue: #ff8800')
    expect(tags[1].classes()).not.toContain('colored')
    expect(tags[1].attributes('style')).toBeUndefined()
  })

  test('renders technologies in the order they are provided', () => {
    const wrapper = mount(TechnologiesList, {
      propsData: {
        technologies: mockTechnologies
      }
    })

    const names = wrapper.findAll('.technologies-tag').map((t) => t.text())
    expect(names).toEqual(mockTechnologies.map((t) => t.name))
  })
})
