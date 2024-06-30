import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils'
import WorkItem from '@/components/WorkItem.vue'
import type { Work } from '@/types/models'

describe('WorkItem.vue', () => {

  // Define a reusable items for easier test data setup
  const baseWork: Work = {
    title: "", company: "", period: "", order: 0, description: "", technologies: [], location: "", url: "", logo: ""
  };

  test('does not apply active class element when not active', () => {
    // Mount the WorkItem as not active
    const wrapper = mount(WorkItem, {
      propsData: {
        work: baseWork,
        isActive: false
      }
    });

    // Assert that the active class is not applied
    expect(wrapper.find('.active').exists()).toBe(false);
  });

  test('apply active class element when active', () => {
    // Mount the WorkItem as active
    const wrapper = mount(WorkItem, {
      propsData: {
        work: baseWork,
        isActive: true
      }
    });

    // Assert that the active class is not applied
    expect(wrapper.find('.active').exists()).toBe(true);
  });
});
