// Curriculum outline for the 4-year BS Nursing program. Each subject
// gets a slug so resource pages can filter/link by subject later.
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const raw = [
  {
    number: 1,
    title: "Semester 1",
    focus: "Foundations",
    subjects: ["Anatomy", "Physiology", "Fundamentals of Nursing", "English", "Islamic Studies / Pak Studies"],
  },
  {
    number: 2,
    title: "Semester 2",
    focus: "Basic Sciences",
    subjects: ["Biochemistry", "Microbiology", "Psychology", "Community Health Nursing I", "Communication Skills"],
  },
  {
    number: 3,
    title: "Semester 3",
    focus: "Clinical Foundations",
    subjects: ["Pharmacology", "Pathology", "Medical Surgical Nursing I", "Nutrition"],
  },
  {
    number: 4,
    title: "Semester 4",
    focus: "Clinical Practice",
    subjects: ["Medical Surgical Nursing II", "Community Health Nursing II", "Research Methodology", "Biostatistics"],
  },
  {
    number: 5,
    title: "Semester 5",
    focus: "Specialized Nursing",
    subjects: ["Maternal & Child Health Nursing", "Mental Health & Psychiatric Nursing", "Nursing Management"],
  },
  {
    number: 6,
    title: "Semester 6",
    focus: "Critical & Specialized Care",
    subjects: ["Critical Care Nursing", "Pediatric Nursing", "Professional Nursing Practice"],
  },
  {
    number: 7,
    title: "Semester 7",
    focus: "Research & Leadership",
    subjects: ["Community Health Nursing III", "Nursing Research Project I", "Leadership & Management"],
  },
  {
    number: 8,
    title: "Semester 8",
    focus: "Internship & Transition",
    subjects: ["Nursing Research Project II", "Clinical Internship", "Professional Adjustment"],
  },
];

export const semesters = raw.map((s) => ({
  ...s,
  path: `/bs-nursing/semester-${s.number}`,
  subjects: s.subjects.map((name) => ({ name, slug: slugify(name) })),
}));

export function getSemester(number) {
  return semesters.find((s) => s.number === Number(number));
}
