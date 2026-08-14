export const resourceTypes = [
  {
    slug: "notes",
    label: "Notes",
    icon: "FaBookMedical",
    description: "Department-wise lecture notes across all 11 Allied Health programs.",
    fileKind: "PDF / DOCX",
  },
  {
    slug: "books",
    label: "Books",
    icon: "FaBook",
    description: "Reference and recommended textbooks for Allied Health Sciences.",
    fileKind: "PDF",
  },
  {
    slug: "past-papers",
    label: "Past Papers",
    icon: "FaFileAlt",
    description: "Previous exam papers from Allied Health departments, sorted by year.",
    fileKind: "PDF",
  },
  {
    slug: "mcqs",
    label: "MCQs",
    icon: "FaQuestionCircle",
    description: "Chapter-wise multiple choice question banks for self-testing.",
    fileKind: "Interactive / PDF",
  },
];

export function getResourceType(slug) {
  return resourceTypes.find((r) => r.slug === slug);
}
