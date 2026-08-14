import { useState, useMemo, useSyncExternalStore } from "react";
import { useSearchParams } from "react-router-dom";
import { FaUpload, FaTrash, FaCheckCircle } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Card from "../../../components/ui/Card";
import EmptyState from "../../../components/ui/EmptyState";
import { adminSections } from "../data/sectionsRegistry";
import {
  getUploadedItems,
  addUploadedItem,
  deleteUploadedItem,
  subscribeToUploads,
  getUploadsVersion,
} from "../../../lib/adminStorage";

const inputClasses =
  "w-full rounded-lg border border-teal-900/20 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-500";

export default function UploadResource() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionKey = searchParams.get("section") || adminSections[0].key;
  const section = adminSections.find((s) => s.key === sectionKey) ?? adminSections[0];

  const [resourceTypeSlug, setResourceTypeSlug] = useState(section.resourceTypes[0].slug);
  const [filterValue, setFilterValue] = useState(section.filterDimension.options[0]?.value ?? "");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [fileName, setFileName] = useState("");
  const [justUploaded, setJustUploaded] = useState(false);

  useSyncExternalStore(subscribeToUploads, getUploadsVersion);

  function handleSectionChange(nextKey) {
    setSearchParams({ section: nextKey });
    const nextSection = adminSections.find((s) => s.key === nextKey);
    setResourceTypeSlug(nextSection.resourceTypes[0].slug);
    setFilterValue(nextSection.filterDimension.options[0]?.value ?? "");
    setJustUploaded(false);
  }

  const storageKeyStr = `${section.key}:${resourceTypeSlug}`;
  const existingItems = useMemo(() => getUploadedItems(storageKeyStr), [storageKeyStr]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !filterValue) return;

    const filterOption = section.filterDimension.options.find((o) => o.value === filterValue);

    addUploadedItem(storageKeyStr, {
      title: title.trim(),
      note: note.trim(),
      filterValue,
      filterLabel: filterOption?.label ?? filterValue,
      fileName: fileName || "no-file-selected.pdf",
    });

    setTitle("");
    setNote("");
    setFileName("");
    setJustUploaded(true);
    setTimeout(() => setJustUploaded(false), 2500);
  }

  return (
    <>
      <SEO title="Upload Resource | QaziPedia Admin" path="/admin/upload" />

      <h1 className="font-display text-2xl font-semibold text-teal-950">
        Upload Resource
      </h1>
      <p className="text-sm text-ink-700 mt-1">
        Uploads appear immediately on the matching public page in this
        browser.
      </p>

      <Card className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Section">
              <select
                value={section.key}
                onChange={(e) => handleSectionChange(e.target.value)}
                className={inputClasses}
              >
                {adminSections.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Resource Type">
              <select
                value={resourceTypeSlug}
                onChange={(e) => setResourceTypeSlug(e.target.value)}
                className={inputClasses}
              >
                {section.resourceTypes.map((rt) => (
                  <option key={rt.slug} value={rt.slug}>
                    {rt.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label={section.filterDimension.label}>
            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className={inputClasses}
            >
              {section.filterDimension.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Title">
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cardiovascular Physiology — Notes"
              className={inputClasses}
            />
          </Field>

          <Field label="Topic / description (optional, helps search)">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Cardiovascular Physiology"
              className={inputClasses}
            />
          </Field>

          <Field label="File">
            <input
              type="file"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
              className="block w-full text-sm text-ink-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal-900/8 file:text-teal-900 hover:file:bg-teal-900/15"
            />
            <p className="text-xs text-ink-500 mt-1.5">
              The file itself isn't stored anywhere yet — only its name.
              Real file storage needs the Part 8 backend.
            </p>
          </Field>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 text-teal-950 font-semibold px-5 py-2.5 text-sm hover:bg-amber-400 transition-colors"
          >
            <FaUpload size={12} /> Upload
          </button>
          {justUploaded && (
            <span className="inline-flex items-center gap-1.5 text-sm text-success ml-3">
              <FaCheckCircle size={12} /> Uploaded
            </span>
          )}
        </form>
      </Card>

      <h2 className="font-display text-lg font-semibold text-teal-950 mt-10 mb-4">
        Uploaded to {section.label} —{" "}
        {section.resourceTypes.find((r) => r.slug === resourceTypeSlug)?.label}
      </h2>

      {existingItems.length > 0 ? (
        <div className="space-y-3">
          {existingItems.map((item) => (
            <Card key={item.id} className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-teal-950 truncate">{item.title}</p>
                <p className="text-xs text-ink-500 mt-0.5">
                  {item.filterLabel} · {item.fileName}
                </p>
              </div>
              <button
                onClick={() => deleteUploadedItem(storageKeyStr, item.id)}
                aria-label={`Delete ${item.title}`}
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-danger hover:bg-danger/10 transition-colors"
              >
                <FaTrash size={12} />
              </button>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nothing uploaded here yet"
          description="Uploads for this section and resource type will show up here."
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
