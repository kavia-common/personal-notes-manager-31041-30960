# Notes App Frontend (React + Supabase)

A modern, lightweight notes application UI using the Ocean Professional theme with Supabase-backed CRUD.

## Features

- Ocean Professional theme (clean, subtle shadows, blue/amber accents)
- Sidebar for notes list, top bar for actions, main editor area
- CRUD via Supabase: list, create, update (debounced auto-save), delete
- Minimal inline status indicators (saving, saved time, error badge)
- Graceful handling when env vars are missing (renders setup notice)

## Quick Start

1) Install dependencies
```
npm install
```

2) Create a Supabase project and a `notes` table with columns:
- id: uuid (default: uuid_generate_v4()) or bigint with identity
- title: text
- content: text
- created_at: timestamp with time zone (default now())
- updated_at: timestamp with time zone (default now())

3) Add an `.env` file in the project root with:
```
REACT_APP_SUPABASE_URL=your-project-url
REACT_APP_SUPABASE_KEY=your-anon-public-key
```

4) Start the dev server
```
npm start
```

If env vars are missing, the app will render a setup notice instead of crashing.

## Scripts

- `npm start` - start development server
- `npm test` - run tests
- `npm run build` - production build

## Files Overview

- `src/supabaseClient.js` - initializes Supabase using env vars
- `src/services/notesService.js` - CRUD methods: listNotes, createNote, updateNote, deleteNote
- `src/hooks/useNotes.js` - state management, selection, debounced auto-save, optional realtime
- `src/components/Sidebar.js` - notes list with create button
- `src/components/TopBar.js` - actions and status indicators
- `src/components/NoteEditor.js` - editor for title/content
- `src/components/EmptyState.js` - welcome/empty state
- `src/index.css` & `src/App.css` - theme and layout styles (Ocean Professional)

## Supabase Realtime (Optional)

The app subscribes to realtime changes for the `notes` table if available. Ensure Realtime is enabled for the table in Supabase to see updates reflected automatically.

## Environment Variables

The app requires:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_KEY`

These must be supplied via `.env` and the development server must be restarted after changes.

## Design

- Theme name: Ocean Professional
- Colors:
  - Primary: #2563EB
  - Secondary/Success: #F59E0B
  - Error: #EF4444
  - Background: #f9fafb
  - Surface: #ffffff
  - Text: #111827
- Layout: Sidebar (notes), TopBar (actions), Main (editor)

