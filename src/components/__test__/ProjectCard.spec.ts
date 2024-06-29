import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectCard from '@/components/ProjectCard.vue'

describe('ProjectCard.vue', () => {

  test('does not render clickable class or span element if URL is not provided', () => {
    // Mount the ProjectCard
    const wrapper = mount(ProjectCard, {
      propsData: {
        project: {}
      }
    });

    expect(wrapper.find('.clickable').exists()).toBe(false);
    expect(wrapper.find('.link-open').exists()).toBe(false);
  });

  test('renders exact amount of technology items', () => {
    // Mount the ProjectCard
    const technologies = ['HTML', 'CSS', 'JavaScript']
    const wrapper = mount(ProjectCard, {
      propsData: {
        project: {technologies: technologies}
      }
    });

    expect(wrapper.findAll('.technologies-tag').length).toBe(technologies.length);
  });
});
