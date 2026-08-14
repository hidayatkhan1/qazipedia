import { Navigate, NavLink, Outlet, Link } from "react-router-dom";
import { FaTachometerAlt, FaUpload, FaFileMedical, FaSignOutAlt, FaExternalLinkAlt } from "react-icons/fa";
import { useAdminAuth } from "../../../context/AdminAuthContext";

const navItems = [
  { to: "/admin", label: "Overview", icon: FaTachometerAlt, end: true },
  { to: "/admin/upload", label: "Upload Resource", icon: FaUpload },
  { to: "/admin/results", label: "KMU Results", icon: FaFileMedical },
];

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAdminAuth();

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
      <aside>
        <div className="mb-6">
          <p className="font-display text-lg font-semibold text-teal-950">
            Admin
          </p>
          <p className="text-xs text-ink-500">QaziPedia dashboard</p>
        </div>

        <nav className="flex md:flex-col gap-1 overflow-x-auto no-scrollbar">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-teal-900 text-parchment-50"
                    : "text-ink-700 hover:bg-teal-900/8"
                }`
              }
            >
              <Icon size={13} /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 pt-4 border-t border-teal-900/10 flex md:flex-col gap-1">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-ink-700 hover:bg-teal-900/8 transition-colors"
          >
            <FaExternalLinkAlt size={12} /> View site
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-danger hover:bg-danger/10 transition-colors text-left"
          >
            <FaSignOutAlt size={13} /> Log out
          </button>
        </div>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
