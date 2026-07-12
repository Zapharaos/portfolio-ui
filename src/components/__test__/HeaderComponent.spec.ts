import { expect, describe, test, vi, beforeEach, afterEach } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { mockFileType } from '@/__test__/mocks'

// Route-aware navigation: mock vue-router so we can assert router.push calls.
const push = vi.fn()
let currentRouteName = 'ProjectsView'
vi.mock('vue-router', () => ({
  useRouter: () => ({ push }),
  useRoute: () => ({ get name() { return currentRouteName } })
}))

describe('HeaderComponent.vue', () => {
  afterEach(() => {
    document.documentElement.scrollTop = 0
    push.mockClear()
    currentRouteName = 'ProjectsView'
  })

  enableAutoUnmount(afterEach)

  test('navigates to the projects route from the Projects menu item', async () => {
    const wrapper = mount(HeaderComponent, { propsData: { logo: mockFileType } })
    wrapper.vm.goToProjects()
    expect(push).toHaveBeenCalledWith({ name: 'ProjectsView' })
  })

  test('nav items are real anchors with hrefs (openable in a new tab)', () => {
    const wrapper = mount(HeaderComponent, { propsData: { logo: mockFileType } })
    const hrefs = wrapper.findAll('.nav-item-link').map((a) => a.attributes('href'))
    expect(hrefs).toEqual(['/', '/projects', '#footer'])
  })

  test('a modifier-click lets the browser handle the link (no SPA navigation)', () => {
    const wrapper = mount(HeaderComponent, { propsData: { logo: mockFileType } })
    const preventDefault = vi.fn()
    // ctrl/cmd-click should NOT run the in-app action nor preventDefault.
    wrapper.vm.onNavClick(
      { ctrlKey: true, preventDefault } as unknown as MouseEvent,
      () => push({ name: 'ProjectsView' })
    )
    expect(preventDefault).not.toHaveBeenCalled()
    expect(push).not.toHaveBeenCalled()
  })

  test('a plain click runs the action and prevents default', () => {
    const wrapper = mount(HeaderComponent, { propsData: { logo: mockFileType } })
    const preventDefault = vi.fn()
    const action = vi.fn()
    wrapper.vm.onNavClick(
      { ctrlKey: false, metaKey: false, shiftKey: false, altKey: false, preventDefault } as unknown as MouseEvent,
      action
    )
    expect(preventDefault).toHaveBeenCalled()
    expect(action).toHaveBeenCalled()
  })

  test('Contact scrolls to the footer when it exists on the current page', () => {
    const footer = document.createElement('div')
    footer.id = 'footer'
    footer.scrollIntoView = vi.fn() // jsdom doesn't implement scrollIntoView
    document.body.appendChild(footer)
    try {
      const wrapper = mount(HeaderComponent, { propsData: { logo: mockFileType } })
      wrapper.vm.scrollToSection('footer')
      // Footer present on the current page → scroll, no navigation.
      expect(footer.scrollIntoView).toHaveBeenCalled()
      expect(push).not.toHaveBeenCalled()
    } finally {
      footer.remove()
    }
  })

  test('falls back to the home page when the section is absent here', () => {
    // No #work element in this isolated mount → navigate home with the hash.
    const wrapper = mount(HeaderComponent, { propsData: { logo: mockFileType } })
    wrapper.vm.scrollToSection('work')
    expect(push).toHaveBeenCalledWith({ path: '/', hash: '#work' })
  })

  test('Home navigates to the home route when off it', () => {
    const wrapper = mount(HeaderComponent, { propsData: { logo: mockFileType } })
    wrapper.vm.goHome()
    expect(push).toHaveBeenCalledWith({ path: '/' })
  })

  test('handleScroll to quit if the menu is shown', async () => {
    const wrapper = mount(HeaderComponent, {
      propsData: {
        logo: mockFileType
      }
    })

    // Indicating that the responsive menu is open
    wrapper.vm.showResponsiveMenu = true

    // Saving the previous value to compare
    const previousScrollValue = wrapper.vm.lastScrollTop

    // Mocking the scroll position
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 100,
      writable: true
    })

    // Triggering the scroll event
    window.dispatchEvent(new Event('scroll'))

    // Wait for component to update
    await wrapper.vm.$nextTick()

    // Asserting that the function instantly quit since the menu is open
    expect(wrapper.vm.lastScrollTop).toBe(previousScrollValue)
  })

  test('handleScroll BOTTOM to succeed and update lastScrollTop', async () => {
    const wrapper = mount(HeaderComponent, {
      attachTo: document.body,
      propsData: {
        logo: mockFileType
      }
    })

    // Initial scroll setup
    wrapper.vm.lastScrollTop = 0

    // Mocking the scroll position
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 100,
      writable: true
    })

    // Directly call handleScroll (mimicking scroll event)
    wrapper.vm.handleScroll()

    // Wait for component to update
    await wrapper.vm.$nextTick()

    // Asserting that the function succeeded
    expect(wrapper.vm.lastScrollTop).toBe(100)
    expect(wrapper.find('header').isVisible()).toBe(false)
  })

  test('handleScroll TOP to succeed and update lastScrollTop', async () => {
    const wrapper = mount(HeaderComponent, {
      attachTo: document.body,
      propsData: {
        logo: mockFileType
      }
    })

    // Initial scroll setup
    wrapper.vm.lastScrollTop = 100

    // Mocking the scroll position
    Object.defineProperty(document.documentElement, 'scrollTop', {
      value: 0,
      writable: true
    })

    // Directly call handleScroll (mimicking scroll event)
    wrapper.vm.handleScroll()

    // Wait for component to update
    await wrapper.vm.$nextTick()

    // Asserting that the function succeeded
    expect(wrapper.vm.lastScrollTop).toBe(0)
    expect(wrapper.find('header').isVisible()).toBe(true)
  })

  test('toggles responsive menu on button click', async () => {
    const wrapper = mount(HeaderComponent, {
      propsData: {
        logo: mockFileType
      }
    })
    const menuButton = wrapper.find('.responsive-menu-btn')

    // Initially : desktop version => responsive-menu should not be toggled
    expect(wrapper.vm.showResponsiveMenu).toBe(false)

    // Click menu button to activate the responsive-menu
    await menuButton.trigger('click')
    expect(wrapper.vm.showResponsiveMenu).toBe(true)
  })
})
