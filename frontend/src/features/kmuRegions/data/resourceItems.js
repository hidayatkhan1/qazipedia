import { regions } from "./regions";
import { resourceTypes } from "./resourceTypes";

const topics = [
  "Anatomy",
  "Physiology",
  "Community Health Nursing",
  "Pharmacology",
  "Biochemistry",
  "Pathology",
  "Microbiology",
  "Fundamentals of Nursing",
];

const fileSizes = ["0.8 MB", "1.3 MB", "2.0 MB", "3.1 MB", "540 KB", "4.6 MB"];
const uploaders = ["Regional Faculty", "QaziPedia Team", "Senior Batch Contributors", "Institute Coordinators"];

function seededPick(arr, seed) {
  return arr[seed % arr.length];
}

export const resourceItems = regions.flatMap((region, regionIndex) =>
  resourceTypes.flatMap((type, typeIndex) =>
    topics.map((topic, topicIndex) => {
      const seed = regionIndex * 41 + typeIndex * 13 + topicIndex;
      return {
        id: `${type.slug}-${region.slug}-${topicIndex}`,
        type: type.slug,
        title: `${topic} — ${type.label}`,
        region: region.slug,
        regionName: region.name,
        topic,
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

export function getResourcesByRegion(regionSlug) {
  return resourceItems.filter((r) => r.region === regionSlug);
}
