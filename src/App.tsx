import { SettingsForm } from './components/SettingsForm'

export default function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#settings">
        Skip to settings
      </a>
      <header className="site-header">
        <p className="brand">Ship It AI</p>
        <p className="brand-tagline">Account</p>
      </header>
      <main id="settings" className="settings-page">
        <section className="settings-card" aria-labelledby="settings-heading">
          <div className="settings-intro">
            <h1 id="settings-heading">Settings</h1>
            <p>
              Update your profile and choose which emails you want from Ship It
              AI.
            </p>
          </div>
          <SettingsForm />
        </section>
      </main>
    </div>
  )
}
