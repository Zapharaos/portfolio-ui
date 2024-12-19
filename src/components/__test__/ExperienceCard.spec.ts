import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils'
import ExperienceCard from '@/components/ExperienceCard.vue'
import { mockExperience } from '@/__test__/mocks'

describe('ExperienceCard.vue', () => {

  test('does not apply active class element when not active', () => {
    // Mount the ExperienceCard as not active
    const wrapper = mount(ExperienceCard, {
      propsData: {
        experience: mockExperience,
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
        experience: mockExperience,
        isActive: true
      }
    });

    // Assert that the active class is not applied
    expect(wrapper.find('.active').exists()).toBe(true);
  });
});
