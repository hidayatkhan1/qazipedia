import { useState, useSyncExternalStore } from "react";
import { FaUpload, FaTrash, FaCheckCircle } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Card from "../../../components/ui/Card";
import EmptyState from "../../../components/ui/EmptyState";
import { regions, tracks, semesters, sessions } from "../../results/data/regions";
import {
  setResultDocument,
  listResultDocuments,
  deleteResultDocument,
  subscribeToUploads,
  getUploadsVersion,
} from "../../../lib/adminStorage";

const inputClasses =
  "w-full rounded-lg border border-teal-900/20 bg-white px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-amber-500";

export default function ResultsUpload() {
  const [track, setTrack] = useState("nursing");
  const [selection, setSelection] = useState({
    region: "",
    institute: "",
    program: "",
    semester: "",
    session: "",
  });
  const [fileName, setFileName] = useState("");
  const [justUploaded, setJustUploaded] = useState(false);

  useSyncExternalStore(subscribeToUploads, getUploadsVersion);

  const region = regions.find((r) => r.slug === selection.region);
  const institute = region?.institutes.find((i) => i.slug === selection.institute);
  const availablePrograms = institute?.programsByTrack[track] ?? [];

  function update(field, value) {
    const order = ["region", "institute", "program", "semester", "session"];
    const idx = order.indexOf(field);
    const reset = Object.fromEntries(order.slice(idx + 1).map((f) => [f, ""]));
    setSelection((prev) => ({ ...prev, [field]: value, ...reset }));
  }

  const canSubmit =
    selection.region && selection.institute && selection.program && selection.semester && selection.session;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setResultDocument(
      {
        region: selection.region,
        institute: selection.institute,
        program: selection.program,
        semester: Number(selection.semester),
        session: selection.session,
      },
      {
        fileName: fileName || "result-gazette.pdf",
        pageCount: 1,
        fileSizeKB: 250,
        studentCount: 0,
        // Human-readable labels, so the admin list view doesn't need
        // to re-look-up institute/region names from slugs.
        regionName: region?.name,
        instituteName: institute?.name,
      }
    );

    setSelection({ region: "", institute: "", program: "", semester: "", session: "" });
    setFileName("");
    setJustUploaded(true);
    setTimeout(() => setJustUploaded(false), 2500);
  }

  const uploadedDocs = listResultDocuments();

  return (
    <>
      <SEO title="KMU Results Upload | QaziPedia Admin" path="/admin/results" />

      <h1 className="font-display text-2xl font-semibold text-teal-950">
        KMU Results — Upload
      </h1>
      <p className="text-sm text-ink-700 mt-1">
        One PDF per class/session — every student in that class finds
        their own result inside it. This overrides the placeholder
        result generator for the exact same selection.
      </p>

      <Card className="mt-6">
        <div className="flex gap-2 mb-5" role="tablist" aria-label="Result track">
          {tracks.map((t) => (
            <button
              key={t.slug}
              type="button"
              role="tab"
              aria-selected={track === t.slug}
              onClick={() => {
                setTrack(t.slug);
                setSelection({ region: "", institute: "", program: "", semester: "", session: "" });
              }}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
                track === t.slug
                  ? "bg-teal-900 text-parchment-50"
                  : "bg-teal-900/8 text-teal-900 hover:bg-teal-900/15"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Region">
            <select
              value={selection.region}
              onChange={(e) => update("region", e.target.value)}
              className={inputClasses}
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
                className={inputClasses}
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
                className={inputClasses}
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
            <div className="grid grid-cols-2 gap-4">
              <Field label="Semester">
                <select
                  value={selection.semester}
                  onChange={(e) => update("semester", e.target.value)}
                  className={inputClasses}
                >
                  <option value="">Select…</option>
                  {semesters.map((n) => (
                    <option key={n} value={n}>
                      Semester {n}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Session">
                <select
                  value={selection.session}
                  onChange={(e) => update("session", e.target.value)}
                  className={inputClasses}
                >
                  <option value="">Select…</option>
                  {sessions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          )}

          {canSubmit && (
            <Field label="Result PDF">
              <input
                type="file"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                className="block w-full text-sm text-ink-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal-900/8 file:text-teal-900 hover:file:bg-teal-900/15"
              />
              <p className="text-xs text-ink-500 mt-1.5">
              .
              </p>
            </Field>
          )}

          {canSubmit && (
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 text-teal-950 font-semibold px-5 py-2.5 text-sm hover:bg-amber-400 transition-colors"
            >
              <FaUpload size={12} /> Upload Result
            </button>
          )}
          {justUploaded && (
            <span className="inline-flex items-center gap-1.5 text-sm text-success ml-3">
              <FaCheckCircle size={12} /> Uploaded
            </span>
          )}
        </form>
      </Card>

      <h2 className="font-display text-lg font-semibold text-teal-950 mt-10 mb-4">
        Uploaded result documents
      </h2>

      {uploadedDocs.length > 0 ? (
        <div className="space-y-3">
          {uploadedDocs.map((doc) => (
            <Card
              key={`${doc.region}-${doc.institute}-${doc.program}-${doc.semester}-${doc.session}`}
              className="flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-teal-950 truncate">{doc.fileName}</p>
                <p className="text-xs text-ink-500 mt-0.5">
                  {doc.instituteName} · {doc.program} · Semester {doc.semester} · {doc.session}
                </p>
              </div>
              <button
                onClick={() =>
                  deleteResultDocument({
                    region: doc.region,
                    institute: doc.institute,
                    program: doc.program,
                    semester: doc.semester,
                    session: doc.session,
                  })
                }
                aria-label={`Delete ${doc.fileName}`}
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-danger hover:bg-danger/10 transition-colors"
              >
                <FaTrash size={12} />
              </button>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No result documents uploaded yet"
          description="Uploaded result PDFs will be listed here."
        />
      )}
    </>
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
