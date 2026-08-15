// Curriculum outline for the BS Nursing program. Each subject
// gets a slug so resource pages can filter/link by subject later.
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const raw = [
  {
    number: 1,
    title: "Semester 1",
    focus: "Foundations",
    subjects: [
      "Microbiology",
      "Biochemistry",
      "English – Functional English",
      "Fundamentals of Nursing – I",
      "Anatomy & Physiology – I",
      "Ideology and Constitution of Pakistan",
      "Information and Communication Technology",
    ],
  },
  {
    number: 2,
    title: "Semester 2",
    focus: "Basic Sciences",
    subjects: [
      "Fundamentals of Nursing – II",
      "Quantitative Reasoning – I",
      "Anatomy & Physiology – II",
      "Applied Nutrition",
      "Theoretical Basis of Nursing",
      "Islamic Studies / Ethics",
    ],
  },
  {
    number: 3,
    title: "Semester 3",
    focus: "Clinical Foundations",
    subjects: [
      "Professional Communication Skills",
      "Clinical Pharmacology and Drug Administration – I",
      "Medical Surgical Nursing – I",
      "Health Assessment – I",
      "Pathophysiology – I",
    ],
  },
  {
    number: 4,
    title: "Semester 4",
    focus: "Clinical Practice",
    subjects: [
      "Applied Psychology",
      "Medical Surgical Nursing – II",
      "Health Assessment – II",
      "Pathophysiology – II",
      "Clinical Pharmacology and Drug Administration – II",
      "Professional Ethics for Nurses",
    ],
  },
  {
    number: 5,
    title: "Semester 5",
    focus: "Specialized Nursing",
    subjects: [
      "Civics and Community Engagement",
      "Pediatric Health Nursing",
      "Maternal, Neonatal and Child Health Nursing",
      "Epidemiology",
      "Infectious Diseases",
    ],
  },
  {
    number: 6,
    title: "Semester 6",
    focus: "Advanced Nursing",
    subjects: [
      "Principles of Teaching & Learning",
      "Public Health Nursing",
      "Mental Health Nursing",
      "Introduction to Biostatistics (QR II)",
      "Culture, Health & Society",
    ],
  },
  {
    number: 7,
    title: "Semester 7",
    focus: "Leadership & Research",
    subjects: [
      "Leadership & Management",
      "Critical Care Nursing",
      "Introduction to Nursing Research",
      "Entrepreneurship",
      "Elective",
    ],
  },
  {
    number: 8,
    title: "Semester 8",
    focus: "Professional Practice",
    subjects: [
      "Geriatric Nursing",
      "Trends and Issues in Health Care",
      "Expository Writing",
      "Elective",
      "Clinical Practicum",
    ],
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
