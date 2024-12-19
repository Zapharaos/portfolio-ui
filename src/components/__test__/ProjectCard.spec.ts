import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils'
import ProjectCard from '@/components/ProjectCard.vue'
import {mockProject} from "@/__test__/mocks";

describe('ProjectCard.vue', () => {

  test('does not render clickable element when URL is not provided', () => {
    // Mount the ProjectCard with an empty url
    const wrapper = mount(ProjectCard, {
      propsData: {
        project: { ...mockProject, url: "" }
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
        project: mockProject
      }
    });

    // Assert that the clickable elements were rendered
    expect(wrapper.find('a.clickable').exists()).toBe(true);
    expect(wrapper.find('.link-open').exists()).toBe(true);
  });
});
