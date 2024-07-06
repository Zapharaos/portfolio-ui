import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils'
import TechnologiesList from '@/components/TechnologiesList.vue'
import type { Technology } from '@/types/models'

describe('TechnologiesList.vue', () => {

  // Define a reusable items for easier test data setup
  const technologies: Technology[] = [
      {name: 'tech1'},
      {name: 'tech2'},
      {name: 'tech3'},
  ];

  test('renders correct amount of technology tags', () => {
    // Mount the TechnologiesList with technologies
    const wrapper = mount(TechnologiesList, {
      propsData: {
        technologies: technologies
      }
    });

    // Assert that the technologies were correctly added to the DOM.
    expect(wrapper.findAll('.technologies-tag').length).toBe(technologies.length);
  });
});
