import { createClient } from "@supabase/supabase-js";

// Both values come from Supabase -> Project Settings -> API.
// The anon key is designed to be public (it ships in the browser);
// what protects your data is Row Level Security in
// backend/supabase/schema.sql, NOT hiding this key.
// NEVER put the "service_role" key in the frontend or in git.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// When the env vars are missing (for example on a branch preview that
// has no Supabase project attached), the site keeps working in the
// old local-only demo mode instead of crashing.
export const isSupabaseConfigured = Boolean(url && anonKey);

export const STORAGE_BUCKET = "files";

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null;

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.info(
    "[QaziPedia] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set - " +
      "running in local demo mode (browser localStorage). See backend/SUPABASE_SETUP.md."
  );
}
