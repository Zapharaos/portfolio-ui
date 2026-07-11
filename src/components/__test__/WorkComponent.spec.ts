import { expect, describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import WorkComponent from '@/components/WorkComponent.vue'
import { mockExperience, mockProject, mockWork, mockWorkItem } from '@/__test__/mocks'
import type { Work, WorkItem } from '@/types/models'
import ExperienceContainer from '@/components/ExperienceContainer.vue'

describe('WorkComponent.vue', () => {
  test('renders experience containers', () => {
    const workItem: WorkItem = {
      ...mockWorkItem,
      experiences: [mockExperience],
      showProjects: false,
      showExperiences: true
    }
    const work: Work = { ...mockWork, items: [workItem] }

    const wrapper = mount(WorkComponent, { propsData: { work } })

    expect(wrapper.findAllComponents(ExperienceContainer).length).toBe(1)
  })

  test('does not render project work items (projects live on the dedicated page)', () => {
    const workItem: WorkItem = {
      ...mockWorkItem,
      projects: [mockProject],
      experiences: [],
      showProjects: true,
      showExperiences: false
    }
    const work: Work = { ...mockWork, items: [workItem] }

    const wrapper = mount(WorkComponent, { propsData: { work } })

    // A projects-only item renders nothing in the home Work section.
    expect(wrapper.findAllComponents(ExperienceContainer).length).toBe(0)
  })
})
