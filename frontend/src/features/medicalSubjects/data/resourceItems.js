import { subjects } from "./subjects";
import { resourceTypes } from "./resourceTypes";

function seededPick(arr, seed) {
  return arr[seed % arr.length];
}

const fileSizes = ["0.9 MB", "1.4 MB", "2.1 MB", "3.4 MB", "610 KB", "5.2 MB"];
const videoDurations = ["8 min", "12 min", "18 min", "24 min", "31 min", "45 min"];
const uploaders = ["Faculty Contributors", "Senior Batch 2023", "QaziPedia Team", "Batch 2022 Contributors"];

export const resourceItems = subjects.flatMap((subject, subjectIndex) =>
  resourceTypes.flatMap((type, typeIndex) =>
    subject.topics.map((topic, topicIndex) => {
      const seed = subjectIndex * 37 + typeIndex * 11 + topicIndex;
      const sizePool = type.slug === "videos" ? videoDurations : fileSizes;
      return {
        id: `${type.slug}-${subject.slug}-${topic.slug}`,
        type: type.slug,
        title: `${topic.name} — ${type.label}`,
        subject: subject.slug,
        subjectName: subject.name,
        topic: topic.name,
        topicSlug: topic.slug,
        fileKind: type.fileKind,
        fileSize: seededPick(sizePool, seed),
        uploadedBy: seededPick(uploaders, seed + 1),
        date: new Date(2026, (seed % 6) + 1, ((seed * 3) % 27) + 1).toISOString(),
      };
    })
  )
);

export function getResourcesByType(slug) {
  return resourceItems.filter((r) => r.type === slug);
}
