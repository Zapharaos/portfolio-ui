import { expect, describe, test, vi, afterEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import PortfolioComponent from '@/components/PortfolioComponent.vue';
import type { User } from '@/types/models'
import { getUserData} from '@/services/user'

// Mock the user service
vi.mock('@/services/user');

describe('PortfolioComponent.vue', () => {

  /*// Define mock user data object
  const successMockData: User = {
    id: 1,
    hero: 'Hero',
    description: 'Description',
    email: 'john.doe@example.com',
    logo: '',
    photo: undefined,
    curriculum: undefined,
    theme_light: undefined,
    theme_dark: undefined,
    socials: [],
    lists: [],
    projects: [],
  };*/

  // Define mock error object
  const errorMock = new Error('Failed to fetch user data');

  afterEach(() => {
    // Clear mock calls and behavior
    vi.mocked(getUserData).mockRestore();
  })

  test('renders error state on service error', async () => {
    /*// Mock user service with error (named mock)
    vi.mocked(getUserData).mockRejectedValue(errorMock)

    // Mount the component
    const wrapper = mount(PortfolioComponent);

    // Wait until the DOM updates.
    await flushPromises();

    // Assertions for error state
    expect(wrapper.vm.loading).toBe(false);
    expect(wrapper.vm.error).not.toBeNull();*/
  });

  test('renders correctly with user data', async () => {
    /*// Mock the user service to succeed
    vi.mocked(getUserData).mockResolvedValue(successMockData);

    // Mount the component
    const wrapper = mount(PortfolioComponent)

    // Wait until the DOM updates.
    await flushPromises()

    // Assertions on component state after successful data retrieval
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.error).toBeNull*/
  })

});
