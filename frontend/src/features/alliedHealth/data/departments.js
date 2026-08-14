function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const raw = [
  {
    slug: "mlt",
    name: "Medical Laboratory Technology",
    short: "MLT",
    description:
      "Trains students to run diagnostic lab tests across hematology, clinical chemistry, microbiology and blood banking — the science behind most clinical diagnoses.",
    subjects: ["Hematology", "Clinical Chemistry", "Microbiology", "Histopathology", "Blood Banking & Transfusion"],
  },
  {
    slug: "radiology",
    name: "Radiology",
    short: "Radiology",
    description:
      "Covers medical imaging — X-ray, CT, MRI and ultrasound — and the physics, positioning and safety protocols behind producing a diagnostic image.",
    subjects: ["Radiographic Positioning", "Radiation Physics", "CT & MRI Principles", "Ultrasound Fundamentals", "Radiation Safety"],
  },
  {
    slug: "ot-technology",
    name: "Operation Theatre Technology",
    short: "OT Technology",
    description:
      "Prepares students to assist in surgical procedures: sterilization, instrument handling, anesthesia support and operating room protocols.",
    subjects: ["Surgical Instrumentation", "Sterilization Techniques", "OT Protocols", "Anesthesia Assistance", "Wound Care"],
  },
  {
    slug: "dental-technology",
    name: "Dental Technology",
    short: "Dental Technology",
    description:
      "Focuses on dental lab work — crowns, dentures, orthodontic appliances — plus chairside assisting and infection control.",
    subjects: ["Dental Materials", "Crown & Bridge Work", "Denture Fabrication", "Orthodontic Appliances", "Dental Infection Control"],
  },
  {
    slug: "cardiology-technology",
    name: "Cardiology Technology",
    short: "Cardiology Technology",
    description:
      "Trains students in cardiac diagnostics — ECG, echocardiography, stress testing — and assisting in cath-lab procedures.",
    subjects: ["ECG Interpretation", "Echocardiography", "Cardiac Stress Testing", "Cath Lab Procedures", "Cardiac Anatomy"],
  },
  {
    slug: "anesthesia-technology",
    name: "Anesthesia Technology",
    short: "Anesthesia Technology",
    description:
      "Covers anesthesia equipment, patient monitoring and peri-operative support alongside anesthesiologists.",
    subjects: ["Anesthesia Equipment", "Patient Monitoring", "Airway Management", "Peri-operative Care", "Pharmacology of Anesthesia"],
  },
  {
    slug: "emergency-technology",
    name: "Emergency Technology",
    short: "Emergency Technology",
    description:
      "Prepares students for emergency and trauma response: triage, first aid, ambulance protocols and critical care basics.",
    subjects: ["Triage & Trauma Care", "Basic Life Support", "Ambulance Protocols", "Emergency Pharmacology", "Disaster Management"],
  },
  {
    slug: "physiotherapy",
    name: "Physiotherapy",
    short: "Physiotherapy",
    description:
      "Focuses on movement science and rehabilitation — musculoskeletal, neurological and cardiopulmonary physiotherapy techniques.",
    subjects: ["Musculoskeletal Physiotherapy", "Neuro Rehabilitation", "Exercise Therapy", "Electrotherapy", "Sports Injury Management"],
  },
  {
    slug: "optometry",
    name: "Optometry",
    short: "Optometry",
    description:
      "Trains students in eye examination, vision correction and detecting early signs of ocular disease.",
    subjects: ["Ocular Anatomy", "Refraction Techniques", "Contact Lens Fitting", "Binocular Vision", "Ocular Disease Screening"],
  },
  {
    slug: "public-health",
    name: "Public Health",
    short: "Public Health",
    description:
      "Covers population-level health: epidemiology, health promotion, disease prevention and healthcare policy.",
    subjects: ["Epidemiology", "Biostatistics", "Health Promotion", "Environmental Health", "Health Policy"],
  },
  {
    slug: "nutrition",
    name: "Nutrition",
    short: "Nutrition",
    description:
      "Focuses on clinical and community nutrition — diet planning, therapeutic nutrition and public nutrition programs.",
    subjects: ["Human Nutrition", "Diet Therapy", "Community Nutrition", "Food Science", "Nutritional Biochemistry"],
  },
];

export const departments = raw.map((d) => ({
  ...d,
  path: `/allied-health/${d.slug}`,
  subjects: d.subjects.map((name) => ({ name, slug: slugify(name) })),
}));

export function getDepartment(slug) {
  return departments.find((d) => d.slug === slug);
}
