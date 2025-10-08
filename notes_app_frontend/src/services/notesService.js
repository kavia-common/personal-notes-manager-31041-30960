import { supabase } from '../supabaseClient';

/**
 * Service layer for CRUD operations on 'notes' table.
 * Table columns expected: id (uuid or int), title (text), content (text), created_at (timestamp), updated_at (timestamp), user_id (optional).
 */

const TABLE = 'notes';

// PUBLIC_INTERFACE
export async function listNotes() {
  /** Fetch list of notes ordered by updated_at desc. */
  const { data, error } = await supabase
    .from(TABLE)
    .select('id,title,content,created_at,updated_at')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

// PUBLIC_INTERFACE
export async function createNote(partial = {}) {
  /** Create a new note with optional initial content/title. */
  const payload = {
    title: partial.title ?? 'Untitled',
    content: partial.content ?? '',
  };
  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
export async function updateNote(id, updates) {
  /** Update an existing note by id. */
  const { data, error } = await supabase
    .from(TABLE)
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  /** Delete a note by id. */
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}
