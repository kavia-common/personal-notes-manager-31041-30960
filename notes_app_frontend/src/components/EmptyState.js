import React from 'react';

/**
 * Empty state placeholder when no note is selected.
 */

// PUBLIC_INTERFACE
export default function EmptyState({ onCreate }) {
  return (
    <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'center', background: 'white', border: '1px solid var(--color-border)', padding: 24, borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ marginTop: 0 }}>Welcome to your notes</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Create a note to get started.</p>
        <button className="primary-btn" onClick={onCreate}>Create note</button>
      </div>
    </div>
  );
}
