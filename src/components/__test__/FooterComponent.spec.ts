import { expect, describe, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FooterComponent from '@/components/FooterComponent.vue'
import { mockUser, mockSocials } from '@/__test__/mocks'

describe('FooterComponent.vue', () => {
  test('renders the clock in the user timezone when set', () => {
    vi.useFakeTimers()
    const spy = vi.spyOn(Date.prototype, 'toLocaleTimeString')
    try {
      mount(FooterComponent, {
        propsData: { user: { ...mockUser, timezone: 'Asia/Tokyo' } }
      })
      vi.advanceTimersByTime(1000)

      expect(spy).toHaveBeenCalledWith(
        mockUser.locale,
        expect.objectContaining({ timeZone: 'Asia/Tokyo' })
      )
    } finally {
      spy.mockRestore()
      vi.useRealTimers()
    }
  })

  test('omits the timeZone option when the user has no timezone', () => {
    vi.useFakeTimers()
    const spy = vi.spyOn(Date.prototype, 'toLocaleTimeString')
    try {
      mount(FooterComponent, {
        propsData: { user: { ...mockUser, timezone: '' } }
      })
      vi.advanceTimersByTime(1000)

      const options = spy.mock.calls[0][1] as Intl.DateTimeFormatOptions
      expect(options.timeZone).toBeUndefined()
    } finally {
      spy.mockRestore()
      vi.useRealTimers()
    }
  })

  test('applies the colored class and --social-hue only to socials with a color', () => {
    const user = {
      ...mockUser,
      socials: mockSocials,
      footer: { ...mockUser.footer, showSocials: true }
    }
    const wrapper = mount(FooterComponent, { propsData: { user } })

    const icons = wrapper.findAll('.social-icon.colored')
    // Only the first mock social defines a color.
    expect(icons.length).toBe(1)
    expect(icons[0].attributes('style')).toContain('--social-hue: #6e5494')
  })

  test('copyEmail updates hasCopiedEmail on success', async () => {
    // Mount the FooterComponent
    const wrapper = mount(FooterComponent, {
      propsData: {
        user: mockUser
      }
    })

    // Call the copyEmail method of the component instance
    await wrapper.vm.copyEmail()

    // Assert that hasCopiedEmail is set to true after successful copy
    expect(wrapper.vm.hasCopiedEmail).toBe(true)

    // Simulate a small delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Expect hasCopiedEmail to be reset after the delay
    expect(wrapper.vm.hasCopiedEmail).toBe(false)

    // Assert that clipboard.writeText was called with the email
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockUser.email)
  })

  test('copyEmail catches error during writeText', async () => {
    // Mock writeText to throw an error
    navigator.clipboard.writeText = vi.fn().mockRejectedValueOnce(new Error('mock error'))

    // Mount the FooterComponent
    const wrapper = mount(FooterComponent, {
      propsData: {
        user: mockUser
      }
    })

    // Call the copyEmail method and expect an error to be caught (implementation might vary)
    try {
      await wrapper.vm.copyEmail()
      // Successful copy is not expected, fail the test here
      expect(false).toBe(true)
    } catch (error: any) {
      expect(error.message).not.toBe('')
      expect(wrapper.vm.hasCopiedEmail).toBe(false)
    }
  })

  test('timer updates after a second', async () => {
    // Mount the FooterComponent
    const wrapper = mount(FooterComponent, {
      propsData: {
        user: mockUser
      }
    })

    // Store the initial value of currentTimeSeconds
    const initialTime = wrapper.vm.currentTime

    // Wait for the timeout using await and advance time by 1s
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Assert that currentTimeSeconds has changed after the delay
    expect(wrapper.vm.currentTime).not.toEqual(initialTime)
  })
})
