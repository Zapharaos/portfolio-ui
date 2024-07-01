import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils'
import ExperienceCard from '@/components/ExperienceCard.vue'
import type { Experience } from '@/types/models'

describe('ExperienceCard.vue', () => {

  // Define a reusable items for easier test data setup
  const baseExperience: Experience = {
    title: "", company: "", period: "", order: 0, description: "", technologies: [], location: "", url: "", logo: ""
  };

  test('does not apply active class element when not active', () => {
    // Mount the ExperienceCard as not active
    const wrapper = mount(ExperienceCard, {
      propsData: {
        experience: baseExperience,
        isActive: false
      }
    });

    // Assert that the active class is not applied
    expect(wrapper.find('.active').exists()).toBe(false);
  });

  test('apply active class element when active', () => {
    // Mount the ExperienceCard as active
    const wrapper = mount(ExperienceCard, {
      propsData: {
        experience: baseExperience,
        isActive: true
      }
    });

    // Assert that the active class is not applied
    expect(wrapper.find('.active').exists()).toBe(true);
  });
});
