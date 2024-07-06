import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils';
import HeroComponent from '@/components/HeroComponent.vue';
import { mockHero } from '@/__test__/mocks'

describe('HeroComponent.vue', () => {

  test('renders correctly with expected content', async () => {
    // Mount the HeroComponent
    const wrapper = mount(HeroComponent, {
      propsData: {
        hero: mockHero
      }
    });

    expect(wrapper.find('#hero').exists()).toBe(true)
    expect(wrapper.find('.name').exists()).toBe(true)
    expect(wrapper.find('.tagline').exists()).toBe(true)
    expect(wrapper.find('.call-to-action').exists()).toBe(true)
    expect(wrapper.find('img').exists()).toBe(true)
  })

});
