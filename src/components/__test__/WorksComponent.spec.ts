import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils'
import WorksComponent from '@/components/WorksComponent.vue'
import type { Work } from '@/types/models'
import WorkItem from '@/components/WorkItem.vue'

describe('WorksComponent.vue', () => {

  // Define a reusable items for easier test data setup
  const baseWork: Work = {
    title: "", company: "", period: "", order: 0, description: "", technologies: [], location: "", url: "", logo: ""
  };
  const baseWorks: Work[] = [
    {...baseWork, order: 2},
    baseWork,
    {...baseWork, order: 1}
  ];

  test('renders work items correctly', () => {
    // Mount the WorksComponent
    const wrapper = mount(WorksComponent, {
      propsData: {
        works: baseWorks
      }
    });

    // Assert that the active class is not applied
    const workItems = wrapper.findAllComponents(WorkItem);
    expect(workItems.length).toBe(baseWorks.length);

  });

  test('correctly identifies active work', async () => {
    // Mount the WorksComponent
    const wrapper = mount(WorksComponent, {
      propsData: {
        works: baseWorks
      }
    });

    // Getting items back
    const items = wrapper.findAllComponents(WorkItem);
    const firstItem = items.at(0);

    // Assert that first item is active
    expect(firstItem?.props('isActive')).toBe(true);

    // Trigger click to activate the second item
    await items?.at(1)?.trigger('click');

    // Assert that second item is now active
    expect(items.at(1)?.props('isActive')).toBe(true);
  });
});