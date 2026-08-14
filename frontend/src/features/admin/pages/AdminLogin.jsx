import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import { useAdminAuth } from "../../../context/AdminAuthContext";

export default function AdminLogin() {
  const { isAuthenticated, login } = useAdminAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  function handleSubmit(e) {
    e.preventDefault();
    if (login(password)) {
      navigate("/admin");
    } else {
      setError(true);
    }
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
            <h1 className="font-display text-2xl font-semibold text-teal-950 mt-4">
              Admin Login
            </h1>
            <p className="text-sm text-ink-700 mt-1.5">
              QaziPedia content dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="sr-only">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Password"
                className="w-full rounded-lg border border-teal-900/20 bg-white px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {error && (
                <p className="text-xs text-danger mt-1.5">Incorrect password. Try again.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-amber-500 text-teal-950 font-semibold py-2.5 text-sm hover:bg-amber-400 transition-colors"
            >
              Log In
            </button>
          </form>

          <p className="text-xs text-ink-500 mt-6 text-center leading-relaxed">
            This is a placeholder login for local testing only — see the
            README before using this on a real deployment.
          </p>
        </div>
      </section>
    </>
  );
}
