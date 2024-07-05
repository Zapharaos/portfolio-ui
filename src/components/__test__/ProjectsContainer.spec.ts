import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectContainer from '@/components/ProjectContainer.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import type { Project } from '@/types/models'

describe('ProjectContainer.vue', () => {

  test('should render the same number of project cards in responsive mode as the sum of list1 and list2', () => {
    // Mount the ProjectsComponent
    const projects: Project[] = [
      { title: "", order: 0, description: "", url: "", image: "", technologies: [] },
      { title: "", order: 0, description: "", url: "", image: "", technologies: [] },
      { title: "", order: 0, description: "", url: "", image: "", technologies: [] },
    ];
    const wrapper = mount(ProjectContainer, {
      propsData: {
        projects: projects
      }
    })

    // Count responsive list length
    const responsive = wrapper.find('.responsive')
    expect(responsive.findAllComponents(ProjectCard).length).toBe(projects.length)

    // Count total lists length
    const defaultProjectsList = wrapper.findAll('.projects-list:not(.responsive)')
    const list1 = defaultProjectsList.at(0)?.findAllComponents(ProjectCard)
    const list2 = defaultProjectsList.at(1)?.findAllComponents(ProjectCard)
    expect(list1.length + list2.length).toBe(projects.length)
    expect(list1.length === 0 && list2.length === 0 ).toBe(false)
  })
});