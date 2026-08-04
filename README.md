# de-la-brioche

A cross-platform desktop CV generator and job seeker toolkit built with Electron, React, and TypeScript.

## Features

- **CV management** — browse and edit markdown CVs, export to PDF
- **Cover letter generator** — AI-powered cover letter drafts (requires OpenAI API key)
- **Local storage** — profiles and cover letters stored via PGlite (PostgreSQL WASM)
- **Cross-platform** — packaged for macOS, Windows, and Linux

## Quick start

```bash
npm install
npm start          # dev mode with hot reload
npm run package    # build for the current platform
npm run make       # create distributable (DMG, NSIS, DEB, ZIP)
```

## Project layout

```
src/
├── main/           Electron main process (IPC, DB, PDF generation)
├── preload/        Secure bridge between main and renderer
├── renderer/       React app (Tailwind CSS, React Router)
├── features/       Domain modules
└── modules/        Shared utilities
assets/
├── cvs/            CV markdown sources
├── avatar.png
├── styles.css      CV print styles
└── cv.hbs          Handlebars template for PDF output
generated/          Exported PDFs
```

## PDF generation

Uses Electron's built-in Chromium renderer (`BrowserWindow.printToPDF`). No puppeteer required. The app renders the CV markdown through Handlebars + marked, applies print styles, and generates a PDF via the same engine that displays the preview.

## Cover letters

Set `OPENAI_API_KEY` in your environment, then use the Cover Letters tab to generate tailored drafts from a job description.

## Tech stack

- Electron 34 + Vite
- React 19, Tailwind CSS, shadcn/ui
- PGlite + Drizzle ORM
- Handlebars + marked
