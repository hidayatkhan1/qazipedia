import { NavLink } from "react-router-dom";
import { resourceTypes } from "../data/resourceTypes";

const tabs = [
  { label: "Overview", to: "/bs-nursing" },
  { label: "Introduction", to: "/bs-nursing/introduction" },
  ...resourceTypes.map((r) => ({ label: r.label, to: `/bs-nursing/${r.slug}` })),
];

export default function BsNursingSubNav() {
  return (
    <nav
      aria-label="BS Nursing sections"
      className="sticky top-16 sm:top-[72px] z-30 bg-parchment-50/95 backdrop-blur-md border-b border-teal-900/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ul className="flex gap-1 overflow-x-auto no-scrollbar py-2.5">
          {tabs.map((tab) => (
            <li key={tab.to} className="shrink-0">
              <NavLink
                to={tab.to}
                end={tab.to === "/bs-nursing"}
                className={({ isActive }) =>
                  `block px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-teal-900 text-parchment-50"
                      : "text-ink-700 hover:bg-teal-900/8"
                  }`
                }
              >
                {tab.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
