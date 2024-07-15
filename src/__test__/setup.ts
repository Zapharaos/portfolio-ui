import {vi, beforeEach} from 'vitest';
import { setActivePinia, createPinia } from 'pinia'

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

beforeEach(() => {
  // creates a fresh pinia and makes it active
  // so it's automatically picked up by any useStore() call
  // without having to pass it to it: `useStore(pinia)`
  setActivePinia(createPinia())
})