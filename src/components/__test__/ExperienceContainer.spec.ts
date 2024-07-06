import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils'
import ExperienceContainer from '@/components/ExperienceContainer.vue'
import ExperienceCard from '@/components/ExperienceCard.vue'
import type { Experience } from '@/types/models'
import { mockExperience } from '@/__test__/mocks'

describe('ExperienceContainer.vue', () => {

  // Define a reusable items for easier test data setup
  const mockExperiences: Experience[] = [
    {...mockExperience, index: 2},
      mockExperience,
    {...mockExperience, index: 1}
  ];

  test('renders work items correctly', () => {
    // Mount the ExperienceContainer
    const wrapper = mount(ExperienceContainer, {
      propsData: {
        title: "title",
        experiences: mockExperiences
      }
    });

    // Assert that the active class is not applied
    const experienceItems = wrapper.findAllComponents(ExperienceCard);
    expect(experienceItems.length).toBe(mockExperiences.length);

  });

  test('correctly active/collapse', async () => {
    // Mount the ExperienceContainer
    const wrapper = mount(ExperienceContainer, {
      propsData: {
        title: "",
        experiences: mockExperiences
      }
    });

    // Getting items back
    const items = wrapper.findAllComponents(ExperienceCard);
    const firstItem = items.at(0);
    const secondItem = items.at(1);

    // Assert that first item is active
    expect(firstItem?.props('isActive')).toBe(true);

    // Trigger click to collapse the first item
    await firstItem?.find('button').trigger('click')

    // Assert that second item is now active
    expect(firstItem?.emitted('collapse'))
    expect(items.at(1)?.props('isActive')).toBe(false);

    // Trigger click to activate the second item
    await secondItem?.find('.item-header').trigger('click')

    // Assert that second item is now active
    expect(secondItem?.emitted('activate'))
    expect(items.at(1)?.props('isActive')).toBe(true);
  });
});
