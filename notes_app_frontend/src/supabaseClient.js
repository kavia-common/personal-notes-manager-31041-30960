import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client initialization.
 * Uses REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY from environment.
 * Gracefully handles missing envs by exporting a flag and a no-op client.
 */

const url = process.env.REACT_APP_SUPABASE_URL;
const key = process.env.REACT_APP_SUPABASE_KEY;

export const hasSupabaseEnv = Boolean(url && key);

// PUBLIC_INTERFACE
export function getSupabaseEnvStatus() {
  /** Returns object with env presence booleans for diagnostics. */
  return {
    hasUrl: Boolean(url),
    hasKey: Boolean(key),
  };
}

export const supabase = hasSupabaseEnv
  ? createClient(url, key)
  // Fallback dummy object to avoid undefined access if imported elsewhere
  : {
      from() {
        return {
          select: async () => ({ data: null, error: new Error('Supabase env missing') }),
          insert: async () => ({ data: null, error: new Error('Supabase env missing') }),
          update: async () => ({ data: null, error: new Error('Supabase env missing') }),
          delete: async () => ({ data: null, error: new Error('Supabase env missing') }),
          on: () => ({ subscribe: () => ({ unsubscribe() {} }) }),
        };
      },
      channel() {
        return { on() { return this; }, subscribe() {} };
      }
    };

export default supabase;
