# Ship It AI

A production-ready, AI-enhanced frontend application built as part of the FlyRank AI Full Stack Internship.

## Project Overview

Ship It AI is a Vite + React + TypeScript app. This first slice is an accessible settings form for name, email, and notification preference, with client-side validation and local storage.

## Getting Started

Prerequisites: Node.js 20 or later.

```bash
git clone https://github.com/Ayushmaurya01/shipit-ai.git
cd shipit-ai
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Testing

```bash
npm test
```

## Architecture

- `src/App.tsx` — page shell and settings heading
- `src/components/SettingsForm.tsx` — accessible form UI
- `src/lib/settings.ts` — validation, defaults, and `localStorage` persistence

Settings are stored in the browser under `shipit-ai.settings`. No API keys are used.

## Deployment

The production URL and deployment instructions will be added after deployment.

## Known Limitations

- Settings are stored only in this browser; there is no account backend yet.
- AI features are not implemented in this slice.

## License

See the `LICENSE` file.
