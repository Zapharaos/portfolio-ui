import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils'
import ProjectCard from '@/components/ProjectCard.vue'
import type { Project } from '@/types/models'

describe('ProjectCard.vue', () => {

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

  test('does not render clickable element when URL is not provided', () => {
    // Mount the ProjectCard with an empty url
    const wrapper = mount(ProjectCard, {
      propsData: {
        project: { ...baseProject, url: "" }
      }
    });

    // Assert that the clickable elements were not rendered
    expect(wrapper.find('.clickable').exists()).toBe(false);
    expect(wrapper.find('.link-open').exists()).toBe(false);
  });

  test('renders clickable when URL is provided', () => {
    // Mount the ProjectCard with an url
    const wrapper = mount(ProjectCard, {
      propsData: {
        project: baseProject
      }
    });

    // Assert that the clickable elements were rendered
    expect(wrapper.find('a.clickable').exists()).toBe(true);
    expect(wrapper.find('.link-open').exists()).toBe(true);
  });
});
