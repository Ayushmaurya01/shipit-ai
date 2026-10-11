import { useEffect, useId, useState, type FormEvent } from 'react'
import {
  loadSettings,
  NOTIFICATION_OPTIONS,
  saveSettings,
  validateSettings,
  type Settings,
  type SettingsErrors,
} from '../lib/settings'

export function SettingsForm() {
  const formId = useId()
  const [form, setForm] = useState<Settings>(() => loadSettings())
  const [errors, setErrors] = useState<SettingsErrors>({})
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    if (status !== 'saved') {
      return
    }

    const timeout = window.setTimeout(() => {
      setStatus('idle')
      setStatusMessage('')
    }, 4000)

    return () => window.clearTimeout(timeout)
  }, [status])

  function updateField<K extends keyof Settings>(key: K, value: Settings[K]) {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) {
        return current
      }
      const next = { ...current }
      delete next[key]
      return next
    })
    if (status !== 'idle') {
      setStatus('idle')
      setStatusMessage('')
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateSettings(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('error')
      setStatusMessage('Fix the highlighted fields, then try again.')
      const firstInvalid = (['name', 'email', 'notifications'] as const).find(
        (field) => nextErrors[field],
      )
      if (firstInvalid) {
        document.getElementById(`${formId}-${firstInvalid}`)?.focus()
      }
      return
    }

    try {
      const saved = saveSettings(form)
      setForm(saved)
      setErrors({})
      setStatus('saved')
      setStatusMessage('Your settings have been saved.')
    } catch {
      setStatus('error')
      setStatusMessage('Settings could not be saved. Try again.')
    }
  }

  const nameErrorId = `${formId}-name-error`
  const emailErrorId = `${formId}-email-error`
  const notificationsErrorId = `${formId}-notifications-error`

  return (
    <form className="settings-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor={`${formId}-name`}>Name</label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? nameErrorId : undefined}
          maxLength={80}
        />
        {errors.name ? (
          <p id={nameErrorId} className="field-error" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor={`${formId}-email`}>Email</label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? emailErrorId : undefined}
        />
        {errors.email ? (
          <p id={emailErrorId} className="field-error" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <fieldset
        className="field notification-fieldset"
        aria-invalid={Boolean(errors.notifications)}
        aria-describedby={
          errors.notifications ? notificationsErrorId : undefined
        }
      >
        <legend>Notification preference</legend>
        <p className="field-hint">Choose how often we email you.</p>
        <div className="notification-options">
          {NOTIFICATION_OPTIONS.map((option) => {
            const optionId = `${formId}-notifications-${option.value}`
            return (
              <label key={option.value} className="notification-option" htmlFor={optionId}>
                <input
                  id={optionId}
                  type="radio"
                  required
                  name="notifications"
                  value={option.value}
                  checked={form.notifications === option.value}
                  onChange={() => updateField('notifications', option.value)}
                />
                <span>
                  <span className="option-label">{option.label}</span>
                  <span className="option-description">{option.description}</span>
                </span>
              </label>
            )
          })}
        </div>
        {errors.notifications ? (
          <p id={notificationsErrorId} className="field-error" role="alert">
            {errors.notifications}
          </p>
        ) : null}
      </fieldset>

      <div className="form-actions">
        <button type="submit" className="save-button">
          Save settings
        </button>
        <p
          className={`form-status ${status}`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      </div>
    </form>
  )
}
