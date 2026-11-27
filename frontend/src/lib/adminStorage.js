// ============================================================
// Storage layer for admin uploads.
//
// TWO MODES, chosen automatically at startup:
//   * Supabase mode  - when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
//                      are set. Rows live in Postgres, files in Supabase
//                      Storage, and every visitor sees the same content.
//   * Local demo     - when they are not set (e.g. a preview deployment
//                      with no Supabase attached). Same behaviour as the
//                      old placeholder: browser localStorage, this
//                      browser only. Nothing crashes.
//
// HOW READS STAY SYNCHRONOUS
// The pages read with getUploadedItems(), getResultDocumentOverride(),
// etc. and re-render through useSyncExternalStore + the version counter
// below. In Supabase mode those getters read from an in-memory cache.
// The cache is filled by the load*() functions (called from effects),
// which then call notify(), so components re-render with real data.
// Until the first load finishes the getters return "nothing uploaded
// yet", so visitors briefly see only the built-in content, never an
// error. Writes (add / delete / set) are async and throw on failure.
// ============================================================

import { supabase, isSupabaseConfigured, STORAGE_BUCKET } from "./supabaseClient";

/** True when a real shared backend is connected (vs. browser-only demo). */
export const isBackendConfigured = isSupabaseConfigured;

export const MAX_FILE_BYTES = 50 * 1024 * 1024; // Supabase free-plan per-file maximum

// ---------- change notification (shared by both modes) ----------
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
/** Stable snapshot for useSyncExternalStore: only changes when data changes. */
export function getUploadsVersion() {
  return version;
}

// ---------- helpers ----------
function resultCompositeKey({ region, institute, program, semester, session }) {
  return `${region}::${institute}::${program}::${semester}::${session}`;
}

function safeFileName(name) {
  return (
    name
      .normalize("NFKD")
      .replace(/[^\w.-]+/g, "_")
      .replace(/_+/g, "_")
      .slice(-120) || "file"
  );
}

function friendlyError(error) {
  const msg = String(error?.message || error || "Something went wrong.");
  if (error?.code === "42501" || /row-level security|not authorized|permission denied/i.test(msg)) {
    return "Not allowed. Please log in again as the admin.";
  }
  if (/payload too large|exceeded the maximum|too large/i.test(msg)) {
    return "That file is too large (maximum 50 MB).";
  }
  if (/mime type|not supported|invalid.*type/i.test(msg)) {
    return "That file type isn't allowed. Use PDF, Word, PowerPoint, Excel, an image or MP4.";
  }
  if (/failed to fetch|networkerror|network request failed/i.test(msg)) {
    return "Network problem. Check your connection and try again.";
  }
  return msg;
}

function assertFileOk(file) {
  if (file && file.size > MAX_FILE_BYTES) {
    throw new Error("That file is too large (maximum 50 MB).");
  }
}

async function uploadToBucket(folder, file) {
  assertFileOk(file);
  const path = `${folder}/${Date.now()}-${safeFileName(file.name)}`;
  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
    contentType: file.type || undefined,
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(friendlyError(error));
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return { path, url: data.publicUrl };
}

async function removeFromBucket(path) {
  if (!path) return;
  try {
    await supabase.storage.from(STORAGE_BUCKET).remove([path]);
  } catch {
    // Best effort: an orphaned file is harmless, a failed delete must not block the UI.
  }
}

// ============================================================
// LOCAL DEMO MODE (browser localStorage) - used only when Supabase is not configured
// ============================================================
const STORAGE_PREFIX = "qazipedia_uploads:";
const RESULTS_KEY = STORAGE_PREFIX + "results-documents-map";

function readSectionLocal(sectionKey) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + sectionKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeSectionLocal(sectionKey, items) {
  try {
    localStorage.setItem(STORAGE_PREFIX + sectionKey, JSON.stringify(items));
  } catch {
    // localStorage unavailable - the site still works with its built-in data.
  }
}
function readResultsMapLocal() {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function writeResultsMapLocal(map) {
  try {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}
function listActiveSectionsLocal() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX) && key !== RESULTS_KEY) {
      keys.push(key.slice(STORAGE_PREFIX.length));
    }
  }
  return keys;
}

// ============================================================
// SUPABASE MODE: in-memory cache filled from the database
// ============================================================
const EMPTY = Object.freeze([]);
const sectionCache = new Map(); // "bs-nursing:notes" -> item[]
const sectionState = new Map(); // key -> "loading" | "loaded"
let remoteTotalCount = 0;
const resultsCache = new Map(); // doc_key -> result doc
const resultChecked = new Set(); // doc_keys we have looked up (even if not found)
let resultsAllLoaded = false;

function rowToItem(r) {
  return {
    id: r.id,
    title: r.title,
    note: r.note,
    filterValue: r.filter_value,
    filterLabel: r.filter_label,
    fileName: r.file_name,
    filePath: r.file_path,
    fileUrl: r.file_url,
    uploadedAt: r.uploaded_at,
  };
}

function rowToResult(r) {
  return {
    region: r.region,
    institute: r.institute,
    program: r.program,
    semester: r.semester,
    session: r.session,
    regionName: r.region_name,
    instituteName: r.institute_name,
    fileName: r.file_name,
    filePath: r.file_path,
    fileUrl: r.file_url,
    fileSizeKB: r.file_size_kb,
    pageCount: r.page_count,
    studentCount: r.student_count,
    uploadedDate: r.uploaded_date,
  };
}

// ============================================================
// PUBLIC API - READS (synchronous, read the cache / localStorage)
// ============================================================

/** Admin-uploaded items for a section key such as "bs-nursing:notes". */
export function getUploadedItems(sectionKey) {
  if (!supabase) return readSectionLocal(sectionKey);
  return sectionCache.get(sectionKey) ?? EMPTY;
}

/** Total uploaded resources across every section (dashboard stat). */
export function getTotalUploadCount() {
  if (!supabase) {
    return listActiveSectionsLocal().reduce((sum, key) => sum + readSectionLocal(key).length, 0);
  }
  return remoteTotalCount;
}

/** The admin-uploaded result document for one exact class/session, or null. */
export function getResultDocumentOverride(selection) {
  if (!supabase) return readResultsMapLocal()[resultCompositeKey(selection)] ?? null;
  return resultsCache.get(resultCompositeKey(selection)) ?? null;
}

/** True once we know whether a result document exists for this selection. */
export function isResultDocumentLoaded(selection) {
  if (!supabase) return true;
  return resultsAllLoaded || resultChecked.has(resultCompositeKey(selection));
}

/** Every uploaded result document, newest first (admin list view). */
export function listResultDocuments() {
  const docs = !supabase ? Object.values(readResultsMapLocal()) : Array.from(resultsCache.values());
  return docs.sort((a, b) => new Date(b.uploadedDate) - new Date(a.uploadedDate));
}

// ============================================================
// PUBLIC API - LOADERS (async; call from useEffect; no-ops in local mode)
// ============================================================

/** Fetch one section's uploads into the cache (once). */
export async function loadUploads(sectionKey) {
  if (!supabase) return;
  if (sectionState.has(sectionKey)) return;
  sectionState.set(sectionKey, "loading");
  const { data, error } = await supabase
    .from("uploads")
    .select("*")
    .eq("section_key", sectionKey)
    .order("uploaded_at", { ascending: false })
    .limit(1000);
  if (error) {
    console.error("[QaziPedia] could not load uploads:", error.message);
    sectionState.delete(sectionKey); // allow a later retry
    return;
  }
  sectionCache.set(sectionKey, data.map(rowToItem));
  sectionState.set(sectionKey, "loaded");
  notify();
}

/** Fetch only the total number of uploads (dashboard). */
export async function loadUploadCount() {
  if (!supabase) return;
  const { count, error } = await supabase
    .from("uploads")
    .select("id", { count: "exact", head: true });
  if (error) {
    console.error("[QaziPedia] could not count uploads:", error.message);
    return;
  }
  remoteTotalCount = count ?? 0;
  notify();
}

/** Fetch every result document (admin list view). */
export async function loadResultDocuments() {
  if (!supabase) return;
  const { data, error } = await supabase
    .from("result_documents")
    .select("*")
    .order("uploaded_date", { ascending: false })
    .limit(1000);
  if (error) {
    console.error("[QaziPedia] could not load result documents:", error.message);
    return;
  }
  resultsCache.clear();
  data.forEach((r) => resultsCache.set(r.doc_key, rowToResult(r)));
  resultsAllLoaded = true;
  notify();
}

/** Fetch the result document for ONE class/session (public Results page). */
export async function loadResultDocument(selection) {
  if (!supabase) return;
  const key = resultCompositeKey(selection);
  if (resultsAllLoaded || resultChecked.has(key)) return;
  const { data, error } = await supabase
    .from("result_documents")
    .select("*")
    .eq("doc_key", key)
    .maybeSingle();
  if (error) {
    console.error("[QaziPedia] could not look up result document:", error.message);
    return;
  }
  if (data) resultsCache.set(key, rowToResult(data));
  resultChecked.add(key);
  notify();
}

// ============================================================
// PUBLIC API - WRITES (async; throw an Error with a readable message)
// ============================================================

/**
 * Add an uploaded resource. `file` is the browser File object. In
 * Supabase mode the file is stored in the bucket and linked; in local
 * demo mode only its name is kept.
 */
export async function addUploadedItem(sectionKey, item, file) {
  if (!supabase) {
    const items = readSectionLocal(sectionKey);
    const newItem = {
      ...item,
      fileName: item.fileName || file?.name || "no-file-selected.pdf",
      id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      uploadedAt: new Date().toISOString(),
    };
    writeSectionLocal(sectionKey, [newItem, ...items]);
    notify();
    return newItem;
  }

  let uploaded = null;
  if (file) uploaded = await uploadToBucket(`uploads/${sectionKey.replace(":", "/")}`, file);

  const { data, error } = await supabase
    .from("uploads")
    .insert({
      section_key: sectionKey,
      title: item.title,
      note: item.note ?? "",
      filter_value: item.filterValue ?? "",
      filter_label: item.filterLabel ?? "",
      file_name: file?.name ?? item.fileName ?? null,
      file_path: uploaded?.path ?? null,
      file_url: uploaded?.url ?? null,
    })
    .select()
    .single();

  if (error) {
    if (uploaded) await removeFromBucket(uploaded.path); // don't leave an orphaned file
    throw new Error(friendlyError(error));
  }

  const newItem = rowToItem(data);
  sectionCache.set(sectionKey, [newItem, ...(sectionCache.get(sectionKey) ?? [])]);
  remoteTotalCount += 1;
  notify();
  return newItem;
}

/** Delete an uploaded resource (and its file). */
export async function deleteUploadedItem(sectionKey, id) {
  if (!supabase) {
    writeSectionLocal(sectionKey, readSectionLocal(sectionKey).filter((i) => i.id !== id));
    notify();
    return;
  }

  const existing = (sectionCache.get(sectionKey) ?? []).find((i) => i.id === id);
  // .select() makes a blocked delete visible: row-level security silently
  // affects 0 rows instead of returning an error.
  const { data, error } = await supabase.from("uploads").delete().eq("id", id).select("id");
  if (error) throw new Error(friendlyError(error));
  if (!data || data.length === 0) {
    throw new Error("Not allowed, or it was already deleted. Please log in again as the admin.");
  }

  await removeFromBucket(existing?.filePath);
  sectionCache.set(sectionKey, (sectionCache.get(sectionKey) ?? []).filter((i) => i.id !== id));
  remoteTotalCount = Math.max(0, remoteTotalCount - 1);
  notify();
}

/** Create or replace the result document for one exact class/session. */
export async function setResultDocument(selection, doc, file) {
  if (!supabase) {
    const map = readResultsMapLocal();
    map[resultCompositeKey(selection)] = {
      ...doc,
      ...selection,
      fileName: doc.fileName || file?.name || "result-gazette.pdf",
      uploadedDate: new Date().toISOString(),
    };
    writeResultsMapLocal(map);
    notify();
    return;
  }

  const key = resultCompositeKey(selection);

  // Remember the previous file so a replacement doesn't leave it orphaned.
  const { data: previous } = await supabase
    .from("result_documents")
    .select("file_path")
    .eq("doc_key", key)
    .maybeSingle();

  let uploaded = null;
  if (file) {
    uploaded = await uploadToBucket(`results/${safeFileName(key)}`, file);
  }

  const { data, error } = await supabase
    .from("result_documents")
    .upsert(
      {
        doc_key: key,
        region: selection.region,
        institute: selection.institute,
        program: selection.program,
        semester: selection.semester,
        session: selection.session,
        region_name: doc.regionName ?? null,
        institute_name: doc.instituteName ?? null,
        file_name: file?.name ?? doc.fileName ?? null,
        file_path: uploaded?.path ?? null,
        file_url: uploaded?.url ?? null,
        file_size_kb: file ? Math.max(1, Math.ceil(file.size / 1024)) : doc.fileSizeKB ?? null,
        page_count: doc.pageCount ?? null,
        student_count: doc.studentCount ?? null,
        uploaded_date: new Date().toISOString(),
      },
      { onConflict: "doc_key" }
    )
    .select()
    .single();

  if (error) {
    if (uploaded) await removeFromBucket(uploaded.path);
    throw new Error(friendlyError(error));
  }

  if (previous?.file_path && previous.file_path !== uploaded?.path) {
    await removeFromBucket(previous.file_path);
  }
  resultsCache.set(key, rowToResult(data));
  resultChecked.add(key);
  notify();
}

/** Delete the result document for one exact class/session (and its file). */
export async function deleteResultDocument(selection) {
  if (!supabase) {
    const map = readResultsMapLocal();
    delete map[resultCompositeKey(selection)];
    writeResultsMapLocal(map);
    notify();
    return;
  }

  const key = resultCompositeKey(selection);
  const existing = resultsCache.get(key);
  const { data, error } = await supabase
    .from("result_documents")
    .delete()
    .eq("doc_key", key)
    .select("doc_key");
  if (error) throw new Error(friendlyError(error));
  if (!data || data.length === 0) {
    throw new Error("Not allowed, or it was already deleted. Please log in again as the admin.");
  }

  await removeFromBucket(existing?.filePath);
  resultsCache.delete(key);
  notify();
}
