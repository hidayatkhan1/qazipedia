import { semesters } from "./semesters";
import { resourceTypes } from "./resourceTypes";

// Deterministic pseudo-random helpers so the dummy data is stable
// across builds instead of reshuffling on every render.
function seededPick(arr, seed) {
  return arr[seed % arr.length];
}

const fileSizes = ["0.8 MB", "1.2 MB", "2.4 MB", "3.1 MB", "560 KB", "4.7 MB"];
const uploaders = ["Faculty of Nursing", "Senior Batch 2023", "QaziPedia Team", "Batch 2022 Contributors"];

/**
 * One or two items per subject, per resource type, per semester —
 * enough variety to demonstrate filtering without hand-writing
 * hundreds of near-identical rows.
 */
export const resourceItems = semesters.flatMap((semester) =>
  resourceTypes.flatMap((type, typeIndex) =>
    semester.subjects.map((subject, subjectIndex) => {
      const seed = semester.number * 31 + typeIndex * 7 + subjectIndex;
      return {
        id: `${type.slug}-s${semester.number}-${subject.slug}`,
        type: type.slug,
        title: `${subject.name} — ${type.label}`,
        semester: semester.number,
        subject: subject.name,
        subjectSlug: subject.slug,
        fileKind: type.fileKind,
        fileSize: seededPick(fileSizes, seed),
        uploadedBy: seededPick(uploaders, seed + 1),
        date: new Date(2026, (seed % 6) + 1, ((seed * 3) % 27) + 1).toISOString(),
      };
    })
  )
);

export function getResourcesByType(slug) {
  return resourceItems.filter((r) => r.type === slug);
}
