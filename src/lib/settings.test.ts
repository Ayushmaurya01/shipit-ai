import { afterEach, describe, expect, it } from 'vitest'
import {
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
  SETTINGS_STORAGE_KEY,
  validateSettings,
} from './settings'

afterEach(() => {
  window.localStorage.clear()
})

describe('validateSettings', () => {
  it('requires a name and a valid email', () => {
    expect(validateSettings(DEFAULT_SETTINGS)).toEqual({
      name: 'Enter your name.',
      email: 'Enter your email address.',
    })
  })

  it('accepts complete settings', () => {
    expect(
      validateSettings({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        notifications: 'all',
      }),
    ).toEqual({})
  })
})

describe('settings storage', () => {
  it('saves and loads normalized settings', () => {
    saveSettings({
      name: '  Ada  ',
      email: ' ada@example.com ',
      notifications: 'none',
    })

    expect(loadSettings()).toEqual({
      name: 'Ada',
      email: 'ada@example.com',
      notifications: 'none',
    })
    expect(window.localStorage.getItem(SETTINGS_STORAGE_KEY)).toContain(
      'ada@example.com',
    )
  })

  it('falls back when stored JSON is invalid', () => {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, '{not-json')
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS)
  })
})
