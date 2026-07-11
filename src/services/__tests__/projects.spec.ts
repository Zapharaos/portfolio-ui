import { describe, test, expect, vi, beforeEach } from 'vitest'

vi.mock('@/services/api', () => ({ default: { get: vi.fn() } }))

import apiClient from '@/services/api'
import { getProjectsHealth, _clearHealthCache } from '@/services/projects'
import { mockProjectsHealth } from '@/__test__/mocks'

describe('getProjectsHealth client cache', () => {
  beforeEach(() => {
    _clearHealthCache()
    vi.mocked(apiClient.get).mockReset()
  })

  test('reuses the cached result within the TTL (no refetch)', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockProjectsHealth })

    const first = await getProjectsHealth()
    const second = await getProjectsHealth()

    expect(first).toEqual(mockProjectsHealth)
    expect(second).toBe(first) // served from cache, same reference
    expect(apiClient.get).toHaveBeenCalledTimes(1)
  })

  test('dedupes concurrent calls into a single request', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: mockProjectsHealth })

    const [a, b] = await Promise.all([getProjectsHealth(), getProjectsHealth()])

    expect(a).toEqual(mockProjectsHealth)
    expect(b).toEqual(mockProjectsHealth)
    expect(apiClient.get).toHaveBeenCalledTimes(1)
  })

  test('does not cache failures', async () => {
    vi.mocked(apiClient.get)
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce({ data: mockProjectsHealth })

    await expect(getProjectsHealth()).rejects.toThrow('boom')
    const retry = await getProjectsHealth()

    expect(retry).toEqual(mockProjectsHealth)
    expect(apiClient.get).toHaveBeenCalledTimes(2)
  })
})
