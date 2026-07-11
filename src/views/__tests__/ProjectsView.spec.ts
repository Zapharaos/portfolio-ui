import { expect, describe, test, vi, beforeEach, afterEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import router from '@/router'
import ProjectsView from '@/views/ProjectsView.vue'
import ProjectCardFeatured from '@/components/ProjectCardFeatured.vue'
import { getUserData } from '@/services/user'
import { getProjects, getProjectsHealth } from '@/services/projects'
import { applyTheme } from '@/composables/useTheme'
import { mockUser, mockUserWithTheme, mockProjects, mockProjectsHealth } from '@/__test__/mocks'

vi.mock('@/services/user')
vi.mock('@/services/projects')
vi.mock('@/composables/useTheme', () => ({
  applyTheme: vi.fn(),
  applyCachedTheme: vi.fn()
}))

const mountView = () => mount(ProjectsView, { global: { plugins: [router] } })

describe('ProjectsView.vue', () => {
  beforeEach(() => {
    // Sensible defaults; individual tests override as needed.
    vi.mocked(getUserData).mockResolvedValue(mockUser)
    vi.mocked(getProjects).mockResolvedValue(mockProjects)
    vi.mocked(getProjectsHealth).mockResolvedValue(mockProjectsHealth)
  })

  afterEach(() => {
    vi.mocked(getUserData).mockRestore()
    vi.mocked(getProjects).mockRestore()
    vi.mocked(getProjectsHealth).mockRestore()
    vi.mocked(applyTheme).mockClear()
  })

  test('renders one featured card per visible project, sorted by index', async () => {
    const wrapper = mountView()
    await flushPromises()

    const cards = wrapper.findAllComponents(ProjectCardFeatured)
    expect(cards.length).toBe(mockProjects.length)
    // Sorted by index: Alpha (0), Beta (1), Gamma (2).
    expect(cards.map((c) => c.props('project').title)).toEqual(['Alpha', 'Beta', 'Gamma'])
  })

  test('merges health state into projects by id', async () => {
    const wrapper = mountView()
    await flushPromises()

    const byTitle = Object.fromEntries(
      wrapper.findAllComponents(ProjectCardFeatured).map((c) => [
        c.props('project').title,
        c.props('project')
      ])
    )
    // Alpha=id1 (up), Beta=id2 (down), Gamma=id3 (no health row).
    expect(byTitle['Alpha'].healthUp).toBe(true)
    expect(byTitle['Beta'].healthUp).toBe(false)
    expect(byTitle['Gamma'].healthUp).toBeUndefined()
  })

  test('still renders content when the health endpoint fails', async () => {
    vi.mocked(getProjectsHealth).mockRejectedValue(new Error('health down'))

    const wrapper = mountView()
    await flushPromises()

    expect(wrapper.vm.error).toBeNull()
    expect(wrapper.findAllComponents(ProjectCardFeatured).length).toBe(mockProjects.length)
  })

  test('excludes hidden projects', async () => {
    vi.mocked(getProjects).mockResolvedValue([
      ...mockProjects,
      { ...mockProjects[0], id: 99, index: 9, title: 'Secret', hidden: true }
    ])

    const wrapper = mountView()
    await flushPromises()

    const titles = wrapper.findAllComponents(ProjectCardFeatured).map((c) => c.props('project').title)
    expect(titles).not.toContain('Secret')
  })

  test('applies the fetched user theme', async () => {
    vi.mocked(getUserData).mockResolvedValue(mockUserWithTheme)

    mountView()
    await flushPromises()

    expect(applyTheme).toHaveBeenCalledWith(mockUserWithTheme.theme)
  })

  test('renders error state on service error', async () => {
    vi.mocked(getUserData).mockRejectedValue(new Error('boom'))

    const wrapper = mountView()
    await flushPromises()

    expect(wrapper.vm.loading).toBe(false)
    expect(wrapper.vm.error).not.toBeNull()
  })
})
