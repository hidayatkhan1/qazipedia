import { createContext, useContext, useState, useCallback } from "react";

// ============================================================
// PLACEHOLDER AUTH — a hardcoded password checked in the browser.
// This is NOT secure: anyone who opens devtools or reads the built
// JS bundle can see this password and grant themselves access.
// It exists purely so the admin dashboard UI can be built, clicked
// through, and tested before a real backend exists. Before this
// site goes live, replace everything in this file with real
// authentication (Firebase Auth email/password, or a real login
// API call against your backend) — never ship a hardcoded
// client-side password.
// ============================================================

const PLACEHOLDER_ADMIN_PASSWORD = "qazipedia-admin-2026";
const SESSION_KEY = "qazipedia_admin_session";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true"
  );

  const login = useCallback((password) => {
    if (password === PLACEHOLDER_ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
