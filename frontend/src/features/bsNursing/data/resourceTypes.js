export const resourceTypes = [
  {
    slug: "notes",
    label: "Lecture Notes",
    icon: "FaBookMedical",
    description: "Semester-wise notes written and reviewed by senior students.",
    fileKind: "PDF / DOCX",
  },
  {
    slug: "books",
    label: "Books",
    icon: "FaBook",
    description: "Reference and recommended textbooks for the BS Nursing curriculum.",
    fileKind: "PDF",
  },
  {
    slug: "past-papers",
    label: "Past Papers",
    icon: "FaFileAlt",
    description: "Previous semester and annual exam papers, sorted by year.",
    fileKind: "PDF",
  },
  {
    slug: "mcqs",
    label: "MCQs",
    icon: "FaQuestionCircle",
    description: "Chapter-wise multiple choice question banks for self-testing.",
    fileKind: "Interactive / PDF",
  },
  {
    slug: "assignments",
    label: "Assignments",
    icon: "FaClipboardList",
    description: "Sample assignments and marking rubrics submitted by faculty.",
    fileKind: "DOCX / PDF",
  },
  {
    slug: "practical-files",
    label: "Practical Files",
    icon: "FaFlask",
    description: "Lab and skills-lab practical file templates and worked examples.",
    fileKind: "PDF",
  },
  {
    slug: "clinical-procedures",
    label: "Clinical Procedures",
    icon: "FaHeartbeat",
    description: "Step-by-step clinical procedure guides tied to ward rotations.",
    fileKind: "PDF / Video",
  },
];

export function getResourceType(slug) {
  return resourceTypes.find((r) => r.slug === slug);
}
