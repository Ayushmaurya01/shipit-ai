export const NOTIFICATION_PREFERENCES = ['all', 'important', 'none'] as const

export type NotificationPreference = (typeof NOTIFICATION_PREFERENCES)[number]

export type Settings = {
  name: string
  email: string
  notifications: NotificationPreference
}

export type SettingsErrors = Partial<Record<keyof Settings, string>>

export const SETTINGS_STORAGE_KEY = 'shipit-ai.settings'

export const DEFAULT_SETTINGS: Settings = {
  name: '',
  email: '',
  notifications: 'important',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isNotificationPreference(
  value: unknown,
): value is NotificationPreference {
  return (
    typeof value === 'string' &&
    NOTIFICATION_PREFERENCES.includes(value as NotificationPreference)
  )
}

export function validateSettings(settings: Settings): SettingsErrors {
  const errors: SettingsErrors = {}
  const name = settings.name.trim()
  const email = settings.email.trim()

  if (!name) {
    errors.name = 'Enter your name.'
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  } else if (name.length > 80) {
    errors.name = 'Name must be 80 characters or fewer.'
  }

  if (!email) {
    errors.email = 'Enter your email address.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!isNotificationPreference(settings.notifications)) {
    errors.notifications = 'Choose a notification preference.'
  }

  return errors
}

export function loadSettings(): Settings {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_SETTINGS }
  }

  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!raw) {
      return { ...DEFAULT_SETTINGS }
    }

    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') {
      return { ...DEFAULT_SETTINGS }
    }

    const record = parsed as Record<string, unknown>
    const name = typeof record.name === 'string' ? record.name : ''
    const email = typeof record.email === 'string' ? record.email : ''
    const notifications = isNotificationPreference(record.notifications)
      ? record.notifications
      : DEFAULT_SETTINGS.notifications

    return { name, email, notifications }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(settings: Settings): Settings {
  const normalized: Settings = {
    name: settings.name.trim(),
    email: settings.email.trim(),
    notifications: settings.notifications,
  }

  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(normalized))
  return normalized
}

export const NOTIFICATION_OPTIONS: {
  value: NotificationPreference
  label: string
  description: string
}[] = [
  {
    value: 'all',
    label: 'All updates',
    description: 'Product news, tips, and account alerts.',
  },
  {
    value: 'important',
    label: 'Important only',
    description: 'Security and account alerts only.',
  },
  {
    value: 'none',
    label: 'Off',
    description: 'No email notifications.',
  },
]
