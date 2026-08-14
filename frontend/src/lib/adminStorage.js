// ============================================================
// PLACEHOLDER BACKEND — browser localStorage standing in for a
// real database until Part 8's backend (Firebase or Node/Mongo)
// is wired up. Every function here is written so a future swap
// is mechanical: same function names and shapes, different guts.
//
// IMPORTANT LIMITATION: localStorage is per-browser, per-device.
// Content an admin uploads here is only visible in that same
// browser — it does NOT sync to other visitors or devices. This
// exists so the admin UI and upload flow can be built and tested
// now, not as a substitute for a real shared backend.
// ============================================================

const STORAGE_PREFIX = "qazipedia_uploads:";

// Tiny pub/sub so components using useMergedResources re-render when
// an upload happens in the same tab (native storage events only fire
// in *other* tabs, not the one that made the change).
const listeners = new Set();
let version = 0;
function notify() {
  version += 1;
  listeners.forEach((l) => l());
}
export function subscribeToUploads(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
/** Stable snapshot value for useSyncExternalStore - only changes when a write happens. */
export function getUploadsVersion() {
  return version;
}

function readSection(sectionKey) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + sectionKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeSection(sectionKey, items) {
  try {
    localStorage.setItem(STORAGE_PREFIX + sectionKey, JSON.stringify(items));
  } catch {
    // localStorage unavailable (private browsing, quota, etc.) — fail silently,
    // the site still works using the built-in static data either way.
  }
}

/** Get every admin-uploaded item for a section (e.g. "bs-nursing:notes"). */
export function getUploadedItems(sectionKey) {
  return readSection(sectionKey);
}

/** Add a new admin-uploaded item to a section. Returns the item with its generated id. */
export function addUploadedItem(sectionKey, item) {
  const items = readSection(sectionKey);
  const newItem = {
    ...item,
    id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    uploadedAt: new Date().toISOString(),
  };
  writeSection(sectionKey, [newItem, ...items]);
  notify();
  return newItem;
}

/** Remove an admin-uploaded item by id. */
export function deleteUploadedItem(sectionKey, id) {
  const items = readSection(sectionKey);
  writeSection(sectionKey, items.filter((i) => i.id !== id));
  notify();
}

/** All section keys that currently have at least one upload — used for the dashboard overview. */
export function listActiveSections() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX) && key !== RESULTS_KEY) {
      keys.push(key.slice(STORAGE_PREFIX.length));
    }
  }
  return keys;
}

/** Total count of uploaded items across every section — dashboard stat. */
export function getTotalUploadCount() {
  return listActiveSections().reduce((sum, key) => sum + readSection(key).length, 0);
}

// ============================================================
// KMU Results documents — stored separately since a result is one
// document per exact Region+Institute+Program+Semester+Session
// combination, not a filterable list like the resource sections above.
// ============================================================

const RESULTS_KEY = STORAGE_PREFIX + "results-documents-map";

function resultCompositeKey({ region, institute, program, semester, session }) {
  return `${region}::${institute}::${program}::${semester}::${session}`;
}

function readResultsMap() {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeResultsMap(map) {
  try {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(map));
  } catch {
    // ignore — see note at top of file
  }
}

/** Admin uploads (or replaces) the result document for one exact class/session. */
export function setResultDocument(selection, doc) {
  const map = readResultsMap();
  const key = resultCompositeKey(selection);
  map[key] = { ...doc, ...selection, uploadedDate: new Date().toISOString() };
  writeResultsMap(map);
  notify();
}

/** Looks up an admin-uploaded result document for an exact selection, or null. */
export function getResultDocumentOverride(selection) {
  const map = readResultsMap();
  return map[resultCompositeKey(selection)] ?? null;
}

/** Every admin-uploaded result document, for the admin dashboard's list view. */
export function listResultDocuments() {
  return Object.values(readResultsMap()).sort(
    (a, b) => new Date(b.uploadedDate) - new Date(a.uploadedDate)
  );
}

/** Remove an admin-uploaded result document by its exact selection. */
export function deleteResultDocument(selection) {
  const map = readResultsMap();
  delete map[resultCompositeKey(selection)];
  writeResultsMap(map);
  notify();
}
