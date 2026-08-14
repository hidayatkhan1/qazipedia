export const resourceTypes = [
  {
    slug: "notes",
    label: "Notes",
    icon: "FaBookMedical",
    description: "Topic-wise lecture notes across all 14 Medical Subjects.",
    fileKind: "PDF / DOCX",
  },
  {
    slug: "mcqs",
    label: "MCQs",
    icon: "FaQuestionCircle",
    description: "Topic-wise multiple choice question banks for self-testing.",
    fileKind: "Interactive / PDF",
  },
  {
    slug: "past-papers",
    label: "Past Papers",
    icon: "FaFileAlt",
    description: "Previous exam papers for Medical Subjects, sorted by year.",
    fileKind: "PDF",
  },
  {
    slug: "books",
    label: "Books",
    icon: "FaBook",
    description: "Reference and recommended textbooks for Medical Subjects.",
    fileKind: "PDF",
  },
  {
    slug: "videos",
    label: "Videos",
    icon: "FaPlayCircle",
    description: "Recorded lectures and demonstrations for every subject.",
    fileKind: "Video",
  },
];

export function getResourceType(slug) {
  return resourceTypes.find((r) => r.slug === slug);
}
