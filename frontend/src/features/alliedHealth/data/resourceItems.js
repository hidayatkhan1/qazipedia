import { departments } from "./departments";
import { resourceTypes } from "./resourceTypes";

function seededPick(arr, seed) {
  return arr[seed % arr.length];
}

const fileSizes = ["0.9 MB", "1.4 MB", "2.1 MB", "3.4 MB", "610 KB", "5.2 MB"];
const uploaders = ["Faculty Contributors", "Senior Batch 2023", "QaziPedia Team", "Batch 2022 Contributors"];

export const resourceItems = departments.flatMap((dept, deptIndex) =>
  resourceTypes.flatMap((type, typeIndex) =>
    dept.subjects.map((subject, subjectIndex) => {
      const seed = deptIndex * 37 + typeIndex * 11 + subjectIndex;
      return {
        id: `${type.slug}-${dept.slug}-${subject.slug}`,
        type: type.slug,
        title: `${subject.name} — ${type.label}`,
        department: dept.slug,
        departmentName: dept.short,
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
