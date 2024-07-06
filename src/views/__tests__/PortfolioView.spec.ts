import { expect, describe, test, vi, afterEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import PortfolioView from '@/views/PortfolioView.vue';
import { getUserData} from '@/services/user'
import { mockUser } from '@/__test__/mocks'

// Mock the user service
vi.mock('@/services/user');

describe('PortfolioView.vue', () => {

  // Define mock error object
  const errorMock = new Error('Failed to fetch user data');

  afterEach(() => {
    // Clear mock calls and behavior
    vi.mocked(getUserData).mockRestore();
  })

  test('renders error state on service error', async () => {
    // Mock user service with error (named mock)
    vi.mocked(getUserData).mockRejectedValue(errorMock)

    // Mount the component
    const wrapper = mount(PortfolioView);

    // Wait until the DOM updates.
    await flushPromises();

    // Assertions for error state
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.error).not.toBeNull();
  });

  test('renders correctly with user data', async () => {
    // Mock the user service to succeed
    vi.mocked(getUserData).mockResolvedValue(mockUser);

    // Mount the component
    const wrapper = mount(PortfolioView)

    // Wait until the DOM updates.
    await flushPromises()

    // Assertions on component state after successful data retrieval
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.error).toBeNull
  })

});
