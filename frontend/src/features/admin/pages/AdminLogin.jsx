import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import { useAdminAuth } from "../../../context/AdminAuthContext";

const inputClasses =
  "w-full rounded-lg border border-teal-900/20 bg-white px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-amber-500";

export default function AdminLogin() {
  const { isAuthenticated, isLoading, login, mode } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (isLoading) {
    return <p className="text-center text-sm text-ink-500 py-24">Checking your session…</p>;
  }
  if (isAuthenticated) return <Navigate to="/admin" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const result = await login(email.trim(), password);
    setBusy(false);
    if (result.ok) navigate("/admin");
    else setError(result.error);
  }

  return (
    <>
      <SEO title="Admin Login | QaziPedia" path="/admin/login" />
      <section className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-teal-900/8 text-teal-800 flex items-center justify-center mx-auto">
              <FaLock size={16} />
            </div>
            <h1 className="font-display text-2xl font-semibold text-teal-950 mt-4">Admin Login</h1>
            <p className="text-sm text-ink-700 mt-1.5">QaziPedia content dashboard</p>
          </div>

          {mode === "disabled" ? (
            <p className="text-sm text-ink-700 text-center leading-relaxed">
              Admin login isn't configured on this deployment yet.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "supabase" && (
                <div>
                  <label htmlFor="admin-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    required
                    autoFocus
                    autoComplete="username"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="Admin email"
                    className={inputClasses}
                  />
                </div>
              )}
              <div>
                <label htmlFor="admin-password" className="sr-only">
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  required
                  autoFocus={mode !== "supabase"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Password"
                  className={inputClasses}
                />
                {error && (
                  <p role="alert" className="text-xs text-danger mt-1.5">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-full bg-amber-500 text-teal-950 font-semibold py-2.5 text-sm hover:bg-amber-400 disabled:opacity-60 transition-colors"
              >
                {busy ? "Logging in…" : "Log In"}
              </button>
            </form>
          )}

          {mode === "dev" && (
            <p className="text-xs text-ink-500 mt-6 text-center leading-relaxed">
              Local development login. Add the Supabase keys to .env to use the real login.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
