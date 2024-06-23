import { expect, describe, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FooterComponent from '@/components/FooterComponent.vue';

describe('FooterComponent.vue', () => {

  // Mock the navigator.clipboard object for testing purposes
  Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn(),
    },
  });

  test('copyEmail updates hasCopiedEmail on success', async () => {
    // Mount the FooterComponent
    const wrapper = mount(FooterComponent);

    // Call the copyEmail method of the component instance
    await wrapper.vm.copyEmail();

    // Assert that hasCopiedEmail is set to true after successful copy
    expect(wrapper.vm.hasCopiedEmail).toBe(true);

    // Simulate a small delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Expect hasCopiedEmail to be reset after the delay
    expect(wrapper.vm.hasCopiedEmail).toBe(false);

    // Assert that clipboard.writeText was called with the email
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(wrapper.vm.email);
  });

  test('timer updates after a second', async () => {
    // Mount the FooterComponent
    const wrapper = mount(FooterComponent);

    // Store the initial value of currentTimeSeconds
    const initialTime = wrapper.vm.currentTimeSeconds;

    // Wait for the timeout using await and advance time by 1s
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Assert that currentTimeSeconds has changed after the delay
    expect(wrapper.vm.currentTimeSeconds).not.toEqual(initialTime);
  });
});
