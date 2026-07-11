import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { applyCachedTheme, applyTheme } from '@/composables/useTheme'
import { mockTheme } from '@/__test__/mocks'

const STORAGE_KEY = 'theme'
const root = document.documentElement

function readTokens() {
  return {
    background: root.style.getPropertyValue('--color-background'),
    text: root.style.getPropertyValue('--color-text'),
    primary: root.style.getPropertyValue('--color-primary')
  }
}

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    root.style.removeProperty('--color-background')
    root.style.removeProperty('--color-text')
    root.style.removeProperty('--color-primary')
  })
  afterEach(() => {
    localStorage.clear()
  })

  describe('applyTheme', () => {
    test('sets the three tokens on :root and caches the theme', () => {
      applyTheme(mockTheme)

      expect(readTokens()).toEqual({
        background: mockTheme.background,
        text: mockTheme.text,
        primary: mockTheme.primary
      })
      expect(JSON.parse(localStorage.getItem(STORAGE_KEY) as string)).toEqual(mockTheme)
    })

    test('null removes the tokens and clears the cache', () => {
      applyTheme(mockTheme)
      applyTheme(null)

      expect(readTokens()).toEqual({ background: '', text: '', primary: '' })
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })
  })

  describe('applyCachedTheme', () => {
    test('re-applies the cached theme', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTheme))
      applyCachedTheme()

      expect(readTokens().primary).toBe(mockTheme.primary)
    })

    test('does nothing when there is no cache', () => {
      applyCachedTheme()
      expect(readTokens()).toEqual({ background: '', text: '', primary: '' })
    })

    test('purges a corrupted cache without throwing', () => {
      localStorage.setItem(STORAGE_KEY, '{ not json')
      expect(() => applyCachedTheme()).not.toThrow()
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    })
  })
})
