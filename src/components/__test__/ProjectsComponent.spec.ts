import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectsComponent from '@/components/ProjectsComponent.vue'
import type { Project } from '@/types/models'
import ProjectCard from '@/components/ProjectCard.vue'

describe('ProjectsComponent.vue', () => {

  test('should render the same number of project cards in responsive mode as the sum of list1 and list2', () => {
    // Mount the ProjectsComponent
    const project1: Project = {
      title: "", order: 0, description: "", url: "", image: "", technologies: []
    }
    const project2: Project = {
      title: "", order: 0, description: "", url: "", image: "", technologies: []
    }
    const project3: Project = {
      title: "", order: 0, description: "", url: "", image: "", technologies: []
    }
    const projects: Project[] = [project1, project2, project3]
    const wrapper = mount(ProjectsComponent, {
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
