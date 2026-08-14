import { useMemo, useState, useSyncExternalStore } from "react";
import {
  FaFilePdf,
  FaDownload,
  FaEye,
  FaRedo,
  FaCalendarAlt,
  FaUsers,
  FaExclamationCircle,
} from "react-icons/fa";
import Card from "../../../components/ui/Card";
import { regions, tracks, semesters, sessions } from "../data/regions";
import { getResultDocument } from "../data/resultDocuments";
import { getResultDocumentOverride, subscribeToUploads, getUploadsVersion } from "../../../lib/adminStorage";

const steps = ["region", "institute", "program", "semester", "session"];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatFileSize(kb) {
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

export default function ResultChecker() {
  const [track, setTrack] = useState("nursing");
  const [selection, setSelection] = useState({
    region: "",
    institute: "",
    program: "",
    semester: "",
    session: "",
  });
  const [showDocument, setShowDocument] = useState(false);

  const region = regions.find((r) => r.slug === selection.region);
  const institute = region?.institutes.find((i) => i.slug === selection.institute);
  const availablePrograms = institute?.programsByTrack[track] ?? [];

  function handleTrackChange(nextTrack) {
    setTrack(nextTrack);
    setSelection({ region: "", institute: "", program: "", semester: "", session: "" });
    setShowDocument(false);
  }

  // Reset every step after the one that changed, so picking a new
  // region doesn't leave a stale institute/program selected.
  function update(field, value) {
    const idx = steps.indexOf(field);
    const reset = Object.fromEntries(steps.slice(idx + 1).map((s) => [s, ""]));
    setSelection((prev) => ({ ...prev, [field]: value, ...reset }));
    setShowDocument(false);
  }

  const canSubmit = useMemo(
    () => steps.every((s) => selection[s].trim() !== ""),
    [selection]
  );

  // Re-render if an admin uploads a matching result document while
  // this page is open.
  const uploadTick = useSyncExternalStore(subscribeToUploads, getUploadsVersion);

  const document = useMemo(() => {
    if (!showDocument || !canSubmit) return undefined;
    const querySelection = {
      region: selection.region,
      institute: selection.institute,
      program: selection.program,
      semester: Number(selection.semester),
      session: selection.session,
    };
    // A real admin upload always wins over the placeholder generator.
    return (
      getResultDocumentOverride(querySelection) ?? getResultDocument(querySelection)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDocument, canSubmit, selection, uploadTick]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setShowDocument(true);
  }

  function handleReset() {
    setSelection({ region: "", institute: "", program: "", semester: "", session: "" });
    setShowDocument(false);
  }

  return (
    <div>
      {/* Nursing / Allied Health track tabs */}
      <div className="flex gap-2 mb-5" role="tablist" aria-label="Result track">
        {tracks.map((t) => (
          <button
            key={t.slug}
            role="tab"
            aria-selected={track === t.slug}
            onClick={() => handleTrackChange(t.slug)}
            className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors ${
              track === t.slug
                ? "bg-teal-900 text-parchment-50"
                : "bg-teal-900/8 text-teal-900 hover:bg-teal-900/15"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Region">
            <select
              value={selection.region}
              onChange={(e) => update("region", e.target.value)}
              className={selectClasses}
            >
              <option value="">Select region…</option>
              {regions.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name}
                </option>
              ))}
            </select>
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
            <Field label="Program">
              <select
                value={selection.program}
                onChange={(e) => update("program", e.target.value)}
                className={selectClasses}
              >
                <option value="">Select program…</option>
                {availablePrograms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
          )}

          {selection.program && (
            <Field label="Semester">
              <select
                value={selection.semester}
                onChange={(e) => update("semester", e.target.value)}
                className={selectClasses}
              >
                <option value="">Select semester…</option>
                {semesters.map((n) => (
                  <option key={n} value={n}>
                    Semester {n}
                  </option>
                ))}
              </select>
            </Field>
          )}

          {selection.semester && (
            <Field label="Session">
              <select
                value={selection.session}
                onChange={(e) => update("session", e.target.value)}
                className={selectClasses}
              >
                <option value="">Select session…</option>
                {sessions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          )}

          {canSubmit && (
            <button
              type="submit"
              className="w-full rounded-full bg-amber-500 text-teal-950 font-semibold py-3 text-sm hover:bg-amber-400 transition-colors"
            >
              Find Result
            </button>
          )}
        </form>
      </Card>

      {document !== undefined && (
        <div className="mt-8" id="result-document">
          {document ? (
            <Card className="border-2! border-teal-900/15!">
              <div className="flex items-start gap-4 flex-wrap">
                <div className="w-12 h-12 rounded-lg bg-teal-900/8 text-teal-800 flex items-center justify-center shrink-0">
                  <FaFilePdf size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                    Result Gazette
                  </p>
                  <h3 className="font-display text-lg font-semibold text-teal-950 mt-1 break-words">
                    {document.fileName}
                  </h3>
                  <p className="text-sm text-ink-700 mt-1">
                    {institute.name} · {selection.program} · Semester {selection.semester} ·{" "}
                    {selection.session}
                  </p>

                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-xs text-ink-500">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt size={10} /> Uploaded {formatDate(document.uploadedDate)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaUsers size={10} /> {document.studentCount} students listed
                    </span>
                    <span>
                      {document.pageCount} {document.pageCount === 1 ? "page" : "pages"} ·{" "}
                      {formatFileSize(document.fileSizeKB)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-ink-500 mt-4 leading-relaxed">
                This one PDF lists every student's result for this class — find your name or
                roll number inside it.
              </p>

              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-teal-900/10">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full bg-teal-900 text-parchment-50 px-4 py-2 hover:bg-teal-800 transition-colors"
                >
                  <FaEye size={11} /> View PDF
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full border border-teal-700 text-teal-900 px-4 py-2 hover:bg-teal-900 hover:text-parchment-50 transition-colors"
                >
                  <FaDownload size={11} /> Download
                </a>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full bg-teal-900/8 text-teal-900 px-4 py-2 hover:bg-teal-900/15 transition-colors ml-auto"
                >
                  <FaRedo size={11} /> Check another
                </button>
              </div>
            </Card>
          ) : (
            <Card className="border-2! border-amber-500/20! text-center py-8">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                <FaExclamationCircle size={18} />
              </div>
              <h3 className="font-display text-lg font-semibold text-teal-950 mt-4">
                Result not yet uploaded
              </h3>
              <p className="text-sm text-ink-700 mt-1.5 max-w-sm mx-auto">
                {institute?.name} hasn't uploaded a result for {selection.program}, Semester{" "}
                {selection.semester}, {selection.session} yet. Check back soon, or contact your
                institute directly.
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full bg-teal-900/8 text-teal-900 px-4 py-2 hover:bg-teal-900/15 transition-colors mt-5"
              >
                <FaRedo size={11} /> Try another selection
              </button>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

const selectClasses =
  "w-full rounded-lg border border-teal-900/20 bg-white px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-amber-500";

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
