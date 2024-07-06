import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils';
import HeroComponent from '@/components/HeroComponent.vue';
import type {Hero} from "@/types/models";

describe('HeroComponent.vue', () => {

  const mockHero: Hero = {
    title: 'title',
    tagline: 'tagline',
    callToActionContent: 'callToActionContent',
    backgroundImage: {name: 'name', file: 'file'},
  }

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
