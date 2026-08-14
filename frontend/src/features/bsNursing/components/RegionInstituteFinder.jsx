import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import Card from "../../../components/ui/Card";
import { nursingRegions } from "../data/regionFinder";
import { bsNursingSessions } from "../data/sessions";
import { semesters } from "../data/semesters";

const steps = ["region", "institute", "session", "semester"];
const selectClasses =
  "w-full rounded-lg border border-teal-900/20 bg-white px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-amber-500";

export default function RegionInstituteFinder() {
  const navigate = useNavigate();
  const [regionQuery, setRegionQuery] = useState("");
  const [selection, setSelection] = useState({
    region: "",
    institute: "",
    session: "",
    semester: "",
  });

  const region = nursingRegions.find((r) => r.slug === selection.region);
  const institute = region?.institutes.find((i) => i.slug === selection.institute);

  const filteredRegions = useMemo(() => {
    if (!regionQuery.trim()) return nursingRegions;
    return nursingRegions.filter((r) =>
      r.name.toLowerCase().includes(regionQuery.toLowerCase())
    );
  }, [regionQuery]);

  function update(field, value) {
    const idx = steps.indexOf(field);
    const reset = Object.fromEntries(steps.slice(idx + 1).map((s) => [s, ""]));
    setSelection((prev) => ({ ...prev, [field]: value, ...reset }));
  }

  const canContinue = steps.every((s) => selection[s].trim() !== "");

  function handleContinue(e) {
    e.preventDefault();
    if (!canContinue) return;
    navigate(`/bs-nursing/semester-${selection.semester}`);
  }

  return (
    <Card>
      <p className="text-sm text-ink-700 leading-relaxed mb-5">
        BS Nursing's curriculum is standardized by KMU across every
        affiliated institute — so once you find your region, institute
        and batch, Semester shows the same
        real subjects no matter where you study.
      </p>

      <form onSubmit={handleContinue} className="space-y-4">
        <Field label="Region">
          <div className="relative mb-2">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500/50 text-xs" />
            <input
              type="search"
              value={regionQuery}
              onChange={(e) => setRegionQuery(e.target.value)}
              placeholder="Search regions that offer BS Nursing…"
              className="w-full rounded-lg border border-teal-900/20 bg-white pl-9 pr-4 py-2 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <select
            value={selection.region}
            onChange={(e) => update("region", e.target.value)}
            className={selectClasses}
          >
            <option value="">Select region…</option>
            {filteredRegions.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name}
              </option>
            ))}
          </select>
          {filteredRegions.length === 0 && (
            <p className="text-xs text-ink-500 mt-1.5">
              No regions match "{regionQuery}".
            </p>
          )}
        </Field>

        {selection.region && (
          <Field label="Institute">
            <select
              value={selection.institute}
              onChange={(e) => update("institute", e.target.value)}
              className={selectClasses}
            >
              <option value="">Select institute…</option>
              {region.institutes.map((i) => (
                <option key={i.slug} value={i.slug}>
                  {i.name}
                </option>
              ))}
            </select>
          </Field>
        )}

        {selection.institute && (
          <Field label="Session (batch)">
            <select
              value={selection.session}
              onChange={(e) => update("session", e.target.value)}
              className={selectClasses}
            >
              <option value="">Select session…</option>
              {bsNursingSessions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        )}

        {selection.session && (
          <Field label="Semester">
            <select
              value={selection.semester}
              onChange={(e) => update("semester", e.target.value)}
              className={selectClasses}
            >
              <option value="">Select semester…</option>
              {semesters.map((s) => (
                <option key={s.number} value={s.number}>
                  {s.title}
                </option>
              ))}
            </select>
          </Field>
        )}

        {canContinue && (
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 text-teal-950 font-semibold py-3 text-sm hover:bg-amber-400 transition-colors"
          >
            Go to Semester {selection.semester} <FaArrowRight size={12} />
          </button>
        )}
      </form>
    </Card>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-ink-500 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
