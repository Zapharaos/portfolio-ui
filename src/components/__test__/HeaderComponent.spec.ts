import {expect, describe, test, vi, afterEach} from 'vitest';
import {enableAutoUnmount, mount} from '@vue/test-utils';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { mockFileType } from '@/__test__/mocks'

describe('HeaderComponent.vue', () => {

  enableAutoUnmount(afterEach);

  afterEach(() => {
    document.documentElement.scrollTop = 0;
  })

  test('handleScroll to quit if the menu is shown', async () => {
    const wrapper = mount(HeaderComponent, {
      propsData: {
        logo: mockFileType
      }
    });

    // Indicating that the responsive menu is open
    wrapper.vm.showResponsiveMenu = true;

    // Saving the previous value to compare
    const previousScrollValue = wrapper.vm.lastScrollTop;

    // Mocking the scroll position
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 100,
      writable: true,
    });

    // Triggering the scroll event
    window.dispatchEvent(new Event('scroll'));

    // Wait for component to update
    await wrapper.vm.$nextTick();

    // Asserting that the function instantly quit since the menu is open
    expect(wrapper.vm.lastScrollTop).toBe(previousScrollValue);
  });

  test('handleScroll BOTTOM to succeed and update lastScrollTop', async () => {
    const wrapper = mount(HeaderComponent, {
      attachTo: document.body,
      propsData: {
        logo: mockFileType
      }
    });

    // Initial scroll setup
    wrapper.vm.lastScrollTop = 0;

    // Mocking the scroll position
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 100,
      writable: true,
    });

    // Directly call handleScroll (mimicking scroll event)
    wrapper.vm.handleScroll();

    // Wait for component to update
    await wrapper.vm.$nextTick();

    // Asserting that the function succeeded
    expect(wrapper.vm.lastScrollTop).toBe(100);
    expect(wrapper.find('header').isVisible()).toBe(false);
  });

  test('handleScroll TOP to succeed and update lastScrollTop', async () => {
    const wrapper = mount(HeaderComponent, {
      attachTo: document.body,
      propsData: {
        logo: mockFileType
      }
    });

    // Initial scroll setup
    wrapper.vm.lastScrollTop = 100;

    // Mocking the scroll position
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 0,
      writable: true,
    });

    // Directly call handleScroll (mimicking scroll event)
    wrapper.vm.handleScroll();

    // Wait for component to update
    await wrapper.vm.$nextTick();

    // Asserting that the function succeeded
    expect(wrapper.vm.lastScrollTop).toBe(0);
    expect(wrapper.find('header').isVisible()).toBe(true);
  });

  test('toggles responsive menu on button click', async () => {
    const wrapper = mount(HeaderComponent, {
      propsData: {
        logo: mockFileType
      }
    });
    const menuButton = wrapper.find('.responsive-menu-btn');

    // Initially : desktop version => responsive-menu should not be toggled
    expect(wrapper.vm.showResponsiveMenu).toBe(false);

    // Click menu button to activate the responsive-menu
    await menuButton.trigger('click');
    expect(wrapper.vm.showResponsiveMenu).toBe(true);
  });

});
