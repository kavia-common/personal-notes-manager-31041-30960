import React from 'react';
import '../App.css';

/**
 * Note editor for title and content. Calls onChange for debounced saving upstream.
 */

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onChange }) {
  const onTitle = (e) => onChange({ title: e.target.value });
  const onContent = (e) => onChange({ content: e.target.value });

  return (
    <div className="editor-card">
      <input
        className="editor-title"
        type="text"
        placeholder="Title"
        value={note.title ?? ''}
        onChange={onTitle}
      />
      <textarea
        className="editor-content"
        placeholder="Write your note here…"
        value={note.content ?? ''}
        onChange={onContent}
      />
    </div>
  );
}
