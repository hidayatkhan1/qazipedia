function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function slugifyFileName(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Looks up the single class-wide result PDF for a given
 * Region + Institute + Program + Semester + Session — one document
 * covers every student in that class, matching how KMU actually
 * publishes results (a gazette PDF, not a per-student file).
 *
 * Deterministic: the same selection always returns the same answer.
 * Roughly 7 in 10 combinations "have" an uploaded document, so the
 * "not yet uploaded" state is also visible while browsing — that
 * state becomes real once Part 8 wires this up to an actual admin
 * upload + database instead of this placeholder function.
 */
export function getResultDocument({ region, institute, program, semester, session }) {
  const key = `${region}-${institute}-${program}-${semester}-${session}`;
  const seed = hashSeed(key);

  const exists = seed % 10 < 7;
  if (!exists) return null;

  const fileName = `${slugifyFileName(program)}-semester-${semester}-${slugifyFileName(
    session
  )}-${slugifyFileName(institute)}.pdf`;

  const day = (seed % 27) + 1;
  const month = (seed % 6) + 1;
  const uploadedDate = new Date(2026, month, day).toISOString();

  return {
    fileName,
    uploadedDate,
    fileSizeKB: 180 + (seed % 700), // 180-880 KB
    pageCount: 1 + (seed % 6), // 1-6 pages
    studentCount: 20 + (seed % 60), // 20-79 students, for display context
  };
}
