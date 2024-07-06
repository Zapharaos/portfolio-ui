import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils'
import TechnologiesList from '@/components/TechnologiesList.vue'
import {mockTechnologies} from "@/__test__/mocks";

describe('TechnologiesList.vue', () => {

  test('renders correct amount of technology tags', () => {
    // Mount the TechnologiesList with technologies
    const wrapper = mount(TechnologiesList, {
      propsData: {
        technologies: mockTechnologies
      }
    });

    // Assert that the technologies were correctly added to the DOM.
    expect(wrapper.findAll('.technologies-tag').length).toBe(mockTechnologies.length);
  });
});
