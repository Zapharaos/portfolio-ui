import { expect, describe, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FooterComponent from '@/components/FooterComponent.vue';
import {mockUser} from "@/__test__/mocks";

describe('FooterComponent.vue', () => {

  test('copyEmail updates hasCopiedEmail on success', async () => {
    // Mount the FooterComponent
    const wrapper = mount(FooterComponent, {
      propsData: {
        user: mockUser
      }
    });

    // Call the copyEmail method of the component instance
    await wrapper.vm.copyEmail();

    // Assert that hasCopiedEmail is set to true after successful copy
    expect(wrapper.vm.hasCopiedEmail).toBe(true);

    // Simulate a small delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Expect hasCopiedEmail to be reset after the delay
    expect(wrapper.vm.hasCopiedEmail).toBe(false);

    // Assert that clipboard.writeText was called with the email
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockUser.email);
  });

  test('copyEmail catches error during writeText', async () => {
    // Mock writeText to throw an error
    navigator.clipboard.writeText = vi.fn().mockRejectedValueOnce(new Error('mock error'));

    // Mount the FooterComponent
    const wrapper = mount(FooterComponent, {
      propsData: {
        user: mockUser
      }
    });

    // Call the copyEmail method and expect an error to be caught (implementation might vary)
    try {
      await wrapper.vm.copyEmail();
      // Successful copy is not expected, fail the test here
      expect(false).toBe(true);
    } catch (error: any) {
      expect(error.message).not.toBe('');
      expect(wrapper.vm.hasCopiedEmail).toBe(false);
    }
  });

  test('timer updates after a second', async () => {
    // Mount the FooterComponent
    const wrapper = mount(FooterComponent, {
      propsData: {
        user: mockUser
      }
    });

    // Store the initial value of currentTimeSeconds
    const initialTime = wrapper.vm.currentTime;

    // Wait for the timeout using await and advance time by 1s
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Assert that currentTimeSeconds has changed after the delay
    expect(wrapper.vm.currentTime).not.toEqual(initialTime);
  });
});
