import apiClient from './api'
import { type Project, type ProjectHealth } from '@/types/models'

/** Fetch the full catalog of visible projects (ordered by index server-side). */
export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await apiClient.get<Project[]>('projects/')
    return response.data
  } catch (error) {
    console.error('There was an error fetching the projects!', error)
    throw error
  }
}

/**
 * Fetch the health state of monitored projects (dedicated endpoint, kept
 * separate from the content payload). Merged into projects by `id`.
 *
 * Client-side rate limiting: a result is reused for HEALTH_CACHE_TTL ms instead
 * of refetching (e.g. on SPA navigation home ↔ projects), and concurrent calls
 * share a single in-flight request. Failures are not cached.
 */
const HEALTH_CACHE_TTL = 60_000
let healthCache: { at: number; data: ProjectHealth[] } | null = null
let healthInFlight: Promise<ProjectHealth[]> | null = null

export const getProjectsHealth = async (): Promise<ProjectHealth[]> => {
  if (healthCache && Date.now() - healthCache.at < HEALTH_CACHE_TTL) {
    return healthCache.data
  }
  if (healthInFlight) return healthInFlight

  healthInFlight = apiClient
    .get<ProjectHealth[]>('projects/health/')
    .then((response) => {
      healthCache = { at: Date.now(), data: response.data }
      return response.data
    })
    .catch((error) => {
      console.error('There was an error fetching the projects health!', error)
      throw error
    })
    .finally(() => {
      healthInFlight = null
    })

  return healthInFlight
}

/** Test helper: drop the in-memory health cache. */
export const _clearHealthCache = (): void => {
  healthCache = null
  healthInFlight = null
}
