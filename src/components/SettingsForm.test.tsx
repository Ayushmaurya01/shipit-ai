import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { SETTINGS_STORAGE_KEY } from '../lib/settings'
import { SettingsForm } from './SettingsForm'

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})

describe('SettingsForm', () => {
  it('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.click(screen.getByRole('button', { name: 'Save settings' }))

    expect(screen.getByText('Enter your name.')).toBeInTheDocument()
    expect(screen.getByText('Enter your email address.')).toBeInTheDocument()
    expect(
      screen.getByText('Fix the highlighted fields, then try again.'),
    ).toBeInTheDocument()
  })

  it('saves valid settings and reports success', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText('Name'), 'Ada Lovelace')
    await user.type(screen.getByLabelText('Email'), 'ada@example.com')
    await user.click(screen.getByLabelText(/All updates/))
    await user.click(screen.getByRole('button', { name: 'Save settings' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      'Your settings have been saved.',
    )
    expect(JSON.parse(window.localStorage.getItem(SETTINGS_STORAGE_KEY)!)).toEqual({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      notifications: 'all',
    })
  })
})
