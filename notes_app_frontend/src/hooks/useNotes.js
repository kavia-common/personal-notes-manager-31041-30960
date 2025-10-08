import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createNote, deleteNote, listNotes, updateNote } from '../services/notesService';
import supabase, { hasSupabaseEnv } from '../supabaseClient';

/**
 * Hook for managing notes state, selection, debounced save, and realtime updates.
 */

// PUBLIC_INTERFACE
export default function useNotes() {
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [error, setError] = useState(null);

  const debounceRef = useRef(null);
  const pendingUpdatesRef = useRef({}); // id -> updates

  const currentNote = useMemo(
    () => notes.find(n => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listNotes();
      setNotes(data);
      if (data.length && !selectedId) {
        setSelectedId(data[0].id);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [selectedId]);

  useEffect(() => {
    load();
  }, [load]);

  // Optional: Realtime subscription for notes table updates
  useEffect(() => {
    if (!hasSupabaseEnv || !supabase.channel) return;

    const channel = supabase.channel('notes-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notes' },
        (payload) => {
          setNotes(prev => {
            if (payload.eventType === 'INSERT') {
              return [payload.new, ...prev.filter(n => n.id !== payload.new.id)];
            }
            if (payload.eventType === 'UPDATE') {
              return prev.map(n => (n.id === payload.new.id ? payload.new : n));
            }
            if (payload.eventType === 'DELETE') {
              return prev.filter(n => n.id !== payload.old.id);
            }
            return prev;
          });
        }
      );

    channel.subscribe();

    return () => {
      try {
        channel.unsubscribe();
      } catch { /* noop */ }
    };
  }, []);

  // PUBLIC_INTERFACE
  const createNew = useCallback(async () => {
    setError(null);
    try {
      const created = await createNote({ title: 'Untitled', content: '' });
      setNotes(prev => [created, ...prev]);
      setSelectedId(created.id);
    } catch (e) {
      setError(e);
    }
  }, []);

  // PUBLIC_INTERFACE
  const removeNote = useCallback(async (id) => {
    if (!id) return;
    setError(null);
    try {
      await deleteNote(id);
      setNotes(prev => prev.filter(n => n.id !== id));
      if (selectedId === id) {
        setSelectedId(notes.length ? notes[0]?.id ?? null : null);
      }
    } catch (e) {
      setError(e);
    }
  }, [selectedId, notes.length]);

  // PUBLIC_INTERFACE
  const updateCurrent = useCallback((partial) => {
    if (!currentNote) return;
    setNotes(prev => prev.map(n => (n.id === currentNote.id ? { ...n, ...partial } : n)));

    // Debounce saves
    pendingUpdatesRef.current[currentNote.id] = {
      ...(pendingUpdatesRef.current[currentNote.id] || {}),
      ...partial,
    };
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const updates = pendingUpdatesRef.current[currentNote.id];
      if (!updates) return;
      setSaving(true);
      try {
        const updated = await updateNote(currentNote.id, updates);
        setNotes(prev => prev.map(n => (n.id === updated.id ? updated : n)));
        setLastSavedAt(Date.now());
      } catch (e) {
        setError(e);
      } finally {
        setSaving(false);
        delete pendingUpdatesRef.current[currentNote.id];
      }
    }, 500);
  }, [currentNote]);

  return {
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
  };
}
