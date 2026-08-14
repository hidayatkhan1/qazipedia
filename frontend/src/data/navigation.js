// Full site navigation. Each top-level item may carry `columns`
// (grouped dropdown content) for the desktop mega-menu, or be a
// plain link when it has no children.

export const navigation = [
  { label: "Home", to: "/" },

  {
    label: "BS Nursing",
    to: "/bs-nursing",
    columns: [
      {
        heading: "Semesters",
        links: [
          { label: "Introduction", to: "/bs-nursing/introduction" },
          { label: "Semester 1", to: "/bs-nursing/semester-1" },
          { label: "Semester 2", to: "/bs-nursing/semester-2" },
          { label: "Semester 3", to: "/bs-nursing/semester-3" },
          { label: "Semester 4", to: "/bs-nursing/semester-4" },
          { label: "Semester 5", to: "/bs-nursing/semester-5" },
          { label: "Semester 6", to: "/bs-nursing/semester-6" },
          { label: "Semester 7", to: "/bs-nursing/semester-7" },
          { label: "Semester 8", to: "/bs-nursing/semester-8" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Lecture Notes", to: "/bs-nursing/notes" },
          { label: "Books", to: "/bs-nursing/books" },
          { label: "Past Papers", to: "/bs-nursing/past-papers" },
          { label: "MCQs", to: "/bs-nursing/mcqs" },
          { label: "Assignments", to: "/bs-nursing/assignments" },
          { label: "Practical Files", to: "/bs-nursing/practical-files" },
          { label: "Clinical Procedures", to: "/bs-nursing/clinical-procedures" },
        ],
      },
    ],
  },

  {
    label: "Allied Health Sciences",
    to: "/allied-health",
    columns: [
      {
        heading: "Departments",
        links: [
          { label: "Medical Laboratory Technology", to: "/allied-health/mlt" },
          { label: "Radiology", to: "/allied-health/radiology" },
          { label: "Operation Theatre Technology", to: "/allied-health/ot-technology" },
          { label: "Dental Technology", to: "/allied-health/dental-technology" },
          { label: "Cardiology Technology", to: "/allied-health/cardiology-technology" },
          { label: "Anesthesia Technology", to: "/allied-health/anesthesia-technology" },
          { label: "Emergency Technology", to: "/allied-health/emergency-technology" },
          { label: "Physiotherapy", to: "/allied-health/physiotherapy" },
          { label: "Optometry", to: "/allied-health/optometry" },
          { label: "Public Health", to: "/allied-health/public-health" },
          { label: "Nutrition", to: "/allied-health/nutrition" },
        ],
      },
      {
        heading: "Each department includes",
        links: [
          { label: "Notes", to: "/allied-health/notes" },
          { label: "Books", to: "/allied-health/books" },
          { label: "Past Papers", to: "/allied-health/past-papers" },
          { label: "MCQs", to: "/allied-health/mcqs" },
          { label: "Results", to: "/results" },
          { label: "Downloads", to: "/downloads" },
        ],
      },
    ],
  },

  {
    label: "Medical Subjects",
    to: "/medical-subjects",
    columns: [
      {
        heading: "Subjects",
        links: [
          { label: "Anatomy", to: "/medical-subjects/anatomy" },
          { label: "Physiology", to: "/medical-subjects/physiology" },
          { label: "Biochemistry", to: "/medical-subjects/biochemistry" },
          { label: "Pathology", to: "/medical-subjects/pathology" },
          { label: "Pharmacology", to: "/medical-subjects/pharmacology" },
          { label: "Microbiology", to: "/medical-subjects/microbiology" },
          { label: "Medicine", to: "/medical-subjects/medicine" },
          { label: "Surgery", to: "/medical-subjects/surgery" },
          { label: "Gynecology", to: "/medical-subjects/gynecology" },
          { label: "Pediatrics", to: "/medical-subjects/pediatrics" },
          { label: "ENT", to: "/medical-subjects/ent" },
          { label: "Eye", to: "/medical-subjects/eye" },
          { label: "Psychiatry", to: "/medical-subjects/psychiatry" },
          { label: "Community Medicine", to: "/medical-subjects/community-medicine" },
        ],
      },
      {
        heading: "Every subject has",
        links: [
          { label: "Notes", to: "/medical-subjects/notes" },
          { label: "MCQs", to: "/medical-subjects/mcqs" },
          { label: "Past Papers", to: "/medical-subjects/past-papers" },
          { label: "Books", to: "/medical-subjects/books" },
          { label: "Videos", to: "/medical-subjects/videos" },
          { label: "Downloads", to: "/downloads" },
        ],
      },
    ],
  },

  { label: "KMU Results", to: "/results" },

  {
    label: "KMU Regions",
    to: "/kmu-regions",
    columns: [
      {
        heading: "Regions",
        links: [
          { label: "Malakand Region", to: "/kmu-regions/malakand" },
          { label: "Peshawar Region", to: "/kmu-regions/peshawar" },
          { label: "Mardan Region", to: "/kmu-regions/mardan" },
          { label: "Hazara Region", to: "/kmu-regions/hazara" },
          { label: "Kohat Region", to: "/kmu-regions/kohat" },
          { label: "Bannu Region", to: "/kmu-regions/bannu" },
          { label: "Dera Ismail Khan Region", to: "/kmu-regions/dera-ismail-khan" },
        ],
      },
      {
        heading: "Every region includes",
        links: [
          { label: "Slides", to: "/kmu-regions/slides" },
          { label: "Notes", to: "/kmu-regions/notes" },
          { label: "MCQs", to: "/kmu-regions/mcqs" },
        ],
      },
    ],
  },

  {
    label: "Clinical Skills",
    to: "/clinical-skills",
    columns: [
      {
        heading: "Procedures",
        links: [
          { label: "Vital Signs", to: "/clinical-skills/vital-signs" },
          { label: "Injection", to: "/clinical-skills/injection" },
          { label: "Cannulation", to: "/clinical-skills/cannulation" },
          { label: "Catheterization", to: "/clinical-skills/catheterization" },
          { label: "CPR", to: "/clinical-skills/cpr" },
          { label: "ECG", to: "/clinical-skills/ecg" },
          { label: "Bandaging", to: "/clinical-skills/bandaging" },
          { label: "Wound Dressing", to: "/clinical-skills/wound-dressing" },
          { label: "IV Therapy", to: "/clinical-skills/iv-therapy" },
          { label: "Patient Care", to: "/clinical-skills/patient-care" },
          { label: "Drug Calculations", to: "/clinical-skills/drug-calculations" },
          { label: "Procedure Videos", to: "/clinical-skills/videos" },
        ],
      },
    ],
  },

  { label: "News & Jobs", to: "/news-jobs" },

  {
    label: "Downloads",
    to: "/downloads",
    columns: [
      {
        heading: "Categories",
        links: [
          { label: "PDF", to: "/downloads/pdf" },
          { label: "Notes", to: "/downloads/notes" },
          { label: "Books", to: "/downloads/books" },
          { label: "Syllabus", to: "/downloads/syllabus" },
          { label: "Forms", to: "/downloads/forms" },
          { label: "Guidelines", to: "/downloads/guidelines" },
        ],
      },
    ],
  },

  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
