export const resourceTypes = [
  {
    slug: "slides",
    label: "Slides",
    icon: "FaChalkboardTeacher",
    description: "Lecture slide decks shared by faculty across each KMU region.",
    fileKind: "PPTX / PDF",
  },
  {
    slug: "notes",
    label: "Notes",
    icon: "FaBookMedical",
    description: "Written notes contributed by students and faculty in each region.",
    fileKind: "PDF / DOCX",
  },
  {
    slug: "mcqs",
    label: "MCQs",
    icon: "FaQuestionCircle",
    description: "Practice MCQ sets for self-testing, organized by region.",
    fileKind: "Interactive / PDF",
  },
];

export function getResourceType(slug) {
  return resourceTypes.find((r) => r.slug === slug);
}
