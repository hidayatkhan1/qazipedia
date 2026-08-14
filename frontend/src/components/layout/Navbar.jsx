import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { navigation } from "../../data/navigation";
import { siteConfig } from "../../data/siteConfig";
import LogoBadge from "../ui/LogoBadge";
import qazipediaLogo from "../../assets/logos/qazipedia-logo.Png";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null); // desktop dropdown label
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeTimer = useRef(null);

  // Close the mobile drawer whenever the viewport grows back to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEnter = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <header className="sticky top-0 z-50 bg-parchment-50/95 backdrop-blur-md border-b border-teal-900/10">
      {/* Utility strip */}
      <div className="hidden lg:block bg-teal-950 text-parchment-100 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-1.5">
          <span>{siteConfig.tagline}</span>
          <div className="flex gap-4">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-amber-400 transition-colors">
              {siteConfig.email}
            </a>
            <span aria-hidden="true">•</span>
            <span>{siteConfig.phone}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 py-2.5 sm:py-3 gap-3 sm:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0" aria-label="QaziPedia home">
            <LogoBadge
              src={qazipediaLogo}
              alt="QaziPedia logo"
              label="LOGO"
              tone="dark"
              size="md"
              className="w-9 h-9 sm:w-11 sm:h-11"
            />
            <span className="font-display text-lg sm:text-2xl font-semibold text-teal-950 whitespace-nowrap">
              Qazi<span className="text-amber-600">Pedia</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.columns && handleEnter(item.label)}
                onMouseLeave={() => item.columns && handleLeave()}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-amber-600"
                        : "text-teal-950 hover:text-amber-600"
                    }`
                  }
                >
                  {item.label}
                  {item.columns && (
                    <FaChevronDown className="text-[10px] opacity-60" aria-hidden="true" />
                  )}
                </NavLink>

                <AnimatePresence>
                  {item.columns && openMenu === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full pt-3 z-50"
                    >
                      <div className="flex gap-8 bg-white rounded-xl shadow-xl shadow-teal-950/10 border border-teal-900/10 p-6 min-w-[320px]">
                        {item.columns.map((col) => (
                          <div key={col.heading} className="min-w-[180px]">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 mb-3">
                              {col.heading}
                            </p>
                            <ul className="space-y-2">
                              {col.links.map((link) => (
                                <li key={link.to}>
                                  <Link
                                    to={link.to}
                                    className="text-sm text-ink-700 hover:text-teal-900 transition-colors"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Toggle search"
              aria-expanded={searchOpen}
              className="p-2.5 rounded-full text-teal-950 hover:bg-teal-900/10 transition-colors"
            >
              <FaSearch />
            </button>

            <Link
              to="/login"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-teal-950 hover:bg-teal-900/10 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-amber-500 text-teal-950 hover:bg-amber-400 transition-colors shadow-sm"
            >
              Register
            </Link>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2.5 rounded-full text-teal-950 hover:bg-teal-900/10 transition-colors"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Expandable search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <form
                role="search"
                onSubmit={(e) => e.preventDefault()}
                className="pb-4 flex items-center gap-2"
              >
                <input
                  type="search"
                  placeholder="Search notes, MCQs, past papers…"
                  className="w-full rounded-full border border-teal-900/20 bg-white px-5 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="rounded-full bg-teal-900 text-parchment-50 px-5 py-2.5 text-sm font-medium hover:bg-teal-800 transition-colors"
                >
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile drawer — rendered via portal straight to <body> so it
          is never trapped inside the header's own stacking/containing
          context. The header uses backdrop-blur (a CSS filter), and
          filters create a new containing block for fixed-position
          descendants in every modern browser — which silently breaks
          `position: fixed` for anything left nested inside it (the
          drawer would size/position itself against the header's own
          box instead of the viewport, making it effectively invisible
          or clipped on mobile). Porting it to `document.body` sidesteps
          that entirely and guarantees it always renders in front. */}
      {createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-teal-950/40 z-[100] lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.25 }}
                className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-parchment-50 z-[101] lg:hidden overflow-y-auto shadow-2xl"
              >
              <div className="flex items-center justify-between p-5 border-b border-teal-900/10">
                <span className="font-display text-xl font-semibold text-teal-950">
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-full hover:bg-teal-900/10"
                >
                  <FaTimes />
                </button>
              </div>

              <nav className="p-3" aria-label="Mobile primary">
                {navigation.map((item) => (
                  <div key={item.label} className="border-b border-teal-900/5 last:border-none">
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 py-3 px-2 text-sm font-medium text-teal-950"
                      >
                        {item.label}
                      </Link>
                      {item.columns && (
                        <button
                          onClick={() =>
                            setMobileSubOpen(
                              mobileSubOpen === item.label ? null : item.label
                            )
                          }
                          aria-label={`Toggle ${item.label} submenu`}
                          className="p-3 text-teal-700"
                        >
                          <FaChevronDown
                            className={`text-xs transition-transform ${
                              mobileSubOpen === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {item.columns && mobileSubOpen === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4 pb-2"
                        >
                          {item.columns.map((col) => (
                            <div key={col.heading} className="mb-3">
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 mb-1.5 mt-2">
                                {col.heading}
                              </p>
                              {col.links.map((link) => (
                                <Link
                                  key={link.to}
                                  to={link.to}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-1.5 text-sm text-ink-700"
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              <div className="p-5 flex gap-3 border-t border-teal-900/10 mt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-full border border-teal-700 text-teal-900 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-full bg-amber-500 text-teal-950 text-sm font-semibold"
                >
                  Register
                </Link>
              </div>
            </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
