import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils';
import AboutComponent from '@/components/AboutComponent.vue';
import { mockAbout } from '@/__test__/mocks'

describe('AboutComponent.vue', () => {

  test('renders correctly with expected content', async () => {
    // Mount the HeroComponent
    const wrapper = mount(AboutComponent, {
      propsData: {
        about: mockAbout
      }
    });

    expect(wrapper.find('#about').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(true)
  })

});
