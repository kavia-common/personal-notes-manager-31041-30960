import React from 'react';
import '../App.css';

/**
 * Sidebar lists notes and provides create button.
 */

// PUBLIC_INTERFACE
export default function Sidebar({ notes, selectedId, onSelect, onCreate, loading }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <strong>Notes</strong>
        <button className="primary-btn" onClick={onCreate} disabled={loading}>
          + New
        </button>
      </div>
      <ul className="sidebar-list">
        {loading && <li style={{ padding: 12, color: 'var(--color-text-muted)' }}>Loading…</li>}
        {!loading && notes.length === 0 && (
          <li style={{ padding: 12, color: 'var(--color-text-muted)' }}>No notes yet</li>
        )}
        {!loading && notes.map(n => (
          <li
            key={n.id}
            className={`sidebar-item ${n.id === selectedId ? 'active' : ''}`}
            onClick={() => onSelect(n.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' ? onSelect(n.id) : null)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                {n.title || 'Untitled'}
              </span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>
                {n.updated_at ? new Date(n.updated_at).toLocaleDateString() : ''}
              </span>
            </div>
            {n.content && (
              <div style={{ color: 'var(--color-text-muted)', fontSize: 12, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {n.content}
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
