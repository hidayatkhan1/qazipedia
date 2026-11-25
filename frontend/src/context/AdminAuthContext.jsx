import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

// ============================================================
// ADMIN AUTH
//
// Production (Supabase configured): real email + password login via
// Supabase Auth. After sign-in we also ask the database whether this
// user is in the `admins` table (the is_admin() function). Being
// signed in is not enough. The database enforces the same rule on
// every write, so even a tampered frontend cannot write anything.
//
// Local development without Supabase: a throwaway password that is
// compiled out of production builds (import.meta.env.DEV is false there).
//
// Production WITHOUT Supabase: admin login is disabled. There is no
// password in the shipped bundle to find.
// ============================================================

const DEV_ONLY_PASSWORD = import.meta.env.DEV ? "dev-admin-password" : null;
const DEV_SESSION_KEY = "qazipedia_dev_admin_session";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [state, setState] = useState({
    isAuthenticated: !isSupabaseConfigured && DEV_ONLY_PASSWORD
      ? sessionStorage.getItem(DEV_SESSION_KEY) === "true"
      : false,
    isLoading: isSupabaseConfigured,
  });

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;

    async function applySession(session) {
      if (!session) {
        if (active) setState({ isAuthenticated: false, isLoading: false });
        return;
      }
      const { data, error } = await supabase.rpc("is_admin");
      if (active) setState({ isAuthenticated: !error && data === true, isLoading: false });
    }

    supabase.auth.getSession().then(({ data }) => applySession(data.session));

    // Supabase warns against awaiting other Supabase calls directly inside
    // this callback (it can deadlock), so the work is deferred a tick.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setTimeout(() => applySession(session), 0);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  /** Returns { ok: true } or { ok: false, error: "message" }. */
  const login = useCallback(async (email, password) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { ok: false, error: "Incorrect email or password." };
      const { data: isAdmin, error: rpcError } = await supabase.rpc("is_admin");
      if (rpcError || isAdmin !== true) {
        await supabase.auth.signOut();
        return { ok: false, error: "This account is not an admin." };
      }
      setState({ isAuthenticated: true, isLoading: false });
      return { ok: true };
    }

    if (DEV_ONLY_PASSWORD && password === DEV_ONLY_PASSWORD) {
      sessionStorage.setItem(DEV_SESSION_KEY, "true");
      setState({ isAuthenticated: true, isLoading: false });
      return { ok: true };
    }
    return {
      ok: false,
      error: DEV_ONLY_PASSWORD
        ? "Incorrect password."
        : "Admin login isn't configured on this deployment.",
    };
  }, []);

  const logout = useCallback(async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    sessionStorage.removeItem(DEV_SESSION_KEY);
    setState({ isAuthenticated: false, isLoading: false });
  }, []);

  const mode = isSupabaseConfigured ? "supabase" : DEV_ONLY_PASSWORD ? "dev" : "disabled";

  return (
    <AdminAuthContext.Provider value={{ ...state, login, logout, mode }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
