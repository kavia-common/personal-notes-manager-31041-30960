import React from 'react';

/**
 * Top bar with new/delete actions and status.
 */

// PUBLIC_INTERFACE
export default function TopBar({ onCreate, onDelete, saving, lastSavedAt, error }) {
  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
        <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Notes</div>
        <div className="status-badge" title={saving ? 'Saving…' : 'All changes saved'}>
          <span>{saving ? 'Saving…' : 'Saved'}</span>
          {!saving && lastSavedAt && (
            <span style={{ color: 'var(--color-text-muted)' }}>
              {new Date(lastSavedAt).toLocaleTimeString()}
            </span>
          )}
        </div>
        {error && (
          <div className="status-badge" style={{ background: '#fef2f2', color: '#991b1b', borderColor: '#fee2e2' }}>
            Error
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="icon-btn" onClick={onCreate}>+ New</button>
        <button className="danger-btn" onClick={onDelete} disabled={!onDelete}>Delete</button>
      </div>
    </header>
  );
}
