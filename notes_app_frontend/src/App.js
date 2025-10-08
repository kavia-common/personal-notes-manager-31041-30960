import React from 'react';
import './index.css';
import './App.css';
import { supabase, hasSupabaseEnv } from './supabaseClient';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';
import EmptyState from './components/EmptyState';
import useNotes from './hooks/useNotes';

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application entry for the Notes app.
   * Renders the TopBar, Sidebar, and NoteEditor using the Ocean Professional theme.
   * Gracefully handles missing Supabase env by rendering a setup notice instead of crashing.
   */
  const {
    notes,
    selectedId,
    setSelectedId,
    createNew,
    removeNote,
    updateCurrent,
    currentNote,
    loading,
    error,
    saving,
    lastSavedAt
  } = useNotes();

  if (!hasSupabaseEnv) {
    return (
      <div className="app-container" role="alert" aria-live="polite" style={{ display: 'grid', placeItems: 'center', padding: 24 }}>
        <div style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: 12, boxShadow: 'var(--shadow-md)', padding: 24, maxWidth: 640 }}>
          <h1 style={{ marginTop: 0 }}>Setup required</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Missing REACT_APP_SUPABASE_URL and/or REACT_APP_SUPABASE_KEY.
            Please add them to your .env file as documented in the README, then restart the dev server.
          </p>
          <div className="status-badge" style={{ marginTop: 8 }}>
            <span>Env</span>
            <strong>{String(hasSupabaseEnv)}</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <TopBar
        onCreate={createNew}
        onDelete={currentNote ? () => removeNote(currentNote.id) : undefined}
        saving={saving}
        lastSavedAt={lastSavedAt}
        error={error}
      />
      <Sidebar
        notes={notes}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onCreate={createNew}
        loading={loading}
      />
      <main className="main" style={{ padding: 16 }}>
        {currentNote ? (
          <NoteEditor
            note={currentNote}
            onChange={updateCurrent}
          />
        ) : (
          <EmptyState onCreate={createNew} />
        )}
      </main>
    </div>
  );
}

export default App;
