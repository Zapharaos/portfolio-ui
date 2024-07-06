import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectContainer from '@/components/ProjectContainer.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import type {Experience, Project} from '@/types/models'

describe('ProjectContainer.vue', () => {

    // Define a base project + reusable project items for easier test data setup
    const baseProject: Project = {
        index: 0,
        hidden: false,
        url: 'https://example.com',
        title: 'project',
        description: 'description',
        image: {name: 'name', file: 'file'},
        technologies: [{name: 'HTML'}, {name: 'CSS'}, {name: 'JavaScript'}]
    };
    const baseProjects: Project[] = [
        {...baseProject, index: 2},
        baseProject,
        {...baseProject, index: 1}
    ];

  test('should render the same number of project cards in responsive mode as the sum of list1 and list2', () => {
    // Mount the ProjectsComponent
    const wrapper = mount(ProjectContainer, {
      propsData: {
          title: "title",
          projects: baseProjects
      }
    })

    // Count responsive list length
    const responsive = wrapper.find('.responsive')
    expect(responsive.findAllComponents(ProjectCard).length).toBe(baseProjects.length)

    // Count total lists length
    const defaultProjectsList = wrapper.findAll('.projects-list:not(.responsive)')
    const list1 = defaultProjectsList.at(0)?.findAllComponents(ProjectCard)
    const list2 = defaultProjectsList.at(1)?.findAllComponents(ProjectCard)
    expect(list1.length + list2.length).toBe(baseProjects.length)
    expect(list1.length === 0 && list2.length === 0 ).toBe(false)
  })
});
