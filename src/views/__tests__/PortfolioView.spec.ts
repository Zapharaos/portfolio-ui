import { expect, describe, test, vi, afterEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import PortfolioView from '@/views/PortfolioView.vue'
import { getUserData } from '@/services/user'
import { applyTheme } from '@/composables/useTheme'
import { mockUser, mockUserWithTheme } from '@/__test__/mocks'

// Mock the user service
vi.mock('@/services/user')
// Mock the theme composable to assert it is driven by the fetched user
vi.mock('@/composables/useTheme', () => ({
  applyTheme: vi.fn(),
  applyCachedTheme: vi.fn()
}))

describe('PortfolioView.vue', () => {
  // Define mock error object
  const errorMock = new Error('Failed to fetch user data')

  afterEach(() => {
    // Clear mock calls and behavior
    vi.mocked(getUserData).mockRestore()
    vi.mocked(applyTheme).mockClear()
  })

  test('renders error state on service error', async () => {
    // Mock user service with error (named mock)
    vi.mocked(getUserData).mockRejectedValue(errorMock)

    // Mount the component
    const wrapper = mount(PortfolioView)

    // Wait until the DOM updates.
    await flushPromises()

    // Assertions for error state
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.error).not.toBeNull()
  })

  test('renders correctly with user data', async () => {
    // Mock the user service to succeed
    vi.mocked(getUserData).mockResolvedValue(mockUser)

    // Mount the component
    const wrapper = mount(PortfolioView)

    // Wait until the DOM updates.
    await flushPromises()

    // Assertions on component state after successful data retrieval
    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.error).toBeNull
  })

  test('applies the fetched user theme after loading', async () => {
    vi.mocked(getUserData).mockResolvedValue(mockUserWithTheme)

    mount(PortfolioView)
    await flushPromises()

    expect(applyTheme).toHaveBeenCalledWith(mockUserWithTheme.theme)
  })

  test('clears the theme when the user has none', async () => {
    vi.mocked(getUserData).mockResolvedValue(mockUser)

    mount(PortfolioView)
    await flushPromises()

    expect(applyTheme).toHaveBeenCalledWith(null)
  })
})
