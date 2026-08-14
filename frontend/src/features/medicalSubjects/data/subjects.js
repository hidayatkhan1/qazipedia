function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const raw = [
  {
    slug: "anatomy",
    name: "Anatomy",
    description:
      "The structure of the human body — from gross anatomy and osteology to histology and embryology.",
    topics: ["Gross Anatomy", "Osteology", "Histology", "Embryology", "Neuroanatomy"],
  },
  {
    slug: "physiology",
    name: "Physiology",
    description:
      "How the body's systems function — cardiovascular, respiratory, renal, endocrine and nervous system physiology.",
    topics: ["Cardiovascular Physiology", "Respiratory Physiology", "Renal Physiology", "Endocrine Physiology", "Neurophysiology"],
  },
  {
    slug: "biochemistry",
    name: "Biochemistry",
    description:
      "The chemistry of living systems — metabolism, enzymes, molecular biology and clinical biochemistry.",
    topics: ["Metabolism", "Enzymology", "Molecular Biology", "Clinical Biochemistry", "Nutrition Biochemistry"],
  },
  {
    slug: "pathology",
    name: "Pathology",
    description:
      "The mechanisms of disease — general pathology, systemic pathology, and diagnostic histopathology.",
    topics: ["General Pathology", "Systemic Pathology", "Hematopathology", "Histopathology Techniques", "Clinical Correlation"],
  },
  {
    slug: "pharmacology",
    name: "Pharmacology",
    description:
      "How drugs work — pharmacokinetics, pharmacodynamics, drug classes, and adverse effects.",
    topics: ["Pharmacokinetics", "Pharmacodynamics", "Autonomic Pharmacology", "Chemotherapy", "Toxicology"],
  },
  {
    slug: "microbiology",
    name: "Microbiology",
    description:
      "Bacteria, viruses, fungi and parasites — and the immune system's response to them.",
    topics: ["Bacteriology", "Virology", "Mycology", "Parasitology", "Immunology"],
  },
  {
    slug: "medicine",
    name: "Medicine",
    description:
      "Internal medicine — diagnosis and management of adult medical conditions across all body systems.",
    topics: ["Cardiology", "Gastroenterology", "Nephrology", "Endocrinology", "Infectious Disease"],
  },
  {
    slug: "surgery",
    name: "Surgery",
    description:
      "General surgery principles, pre- and post-operative care, and common surgical procedures.",
    topics: ["General Surgery Principles", "Pre-op & Post-op Care", "Trauma Surgery", "GI Surgery", "Surgical Anatomy"],
  },
  {
    slug: "gynecology",
    name: "Gynecology",
    description:
      "Obstetrics and gynecology — pregnancy, labor, and disorders of the female reproductive system.",
    topics: ["Obstetrics Basics", "Antenatal Care", "Labor & Delivery", "Gynecological Disorders", "Reproductive Health"],
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    description:
      "Child health — growth and development, neonatal care, and common pediatric conditions.",
    topics: ["Growth & Development", "Neonatology", "Pediatric Nutrition", "Immunization", "Common Childhood Illnesses"],
  },
  {
    slug: "ent",
    name: "ENT",
    description:
      "Diseases and disorders of the ear, nose and throat, and their surgical management.",
    topics: ["Ear Disorders", "Nasal & Sinus Disorders", "Throat & Larynx", "Head & Neck Surgery", "Audiology Basics"],
  },
  {
    slug: "eye",
    name: "Eye",
    description:
      "Ophthalmology — vision science, common eye diseases, and surgical eye care.",
    topics: ["Ocular Anatomy & Physiology", "Refractive Errors", "Cataract & Glaucoma", "Retinal Disorders", "Ocular Trauma"],
  },
  {
    slug: "psychiatry",
    name: "Psychiatry",
    description:
      "Mental health — psychiatric assessment, common disorders, and treatment approaches.",
    topics: ["Psychiatric Assessment", "Mood Disorders", "Anxiety Disorders", "Psychotic Disorders", "Psychopharmacology"],
  },
  {
    slug: "community-medicine",
    name: "Community Medicine",
    description:
      "Population health — epidemiology, preventive medicine, and public health programs in Pakistan.",
    topics: ["Epidemiology", "Preventive Medicine", "Biostatistics", "Health Systems", "National Health Programs"],
  },
];

export const subjects = raw.map((s) => ({
  ...s,
  path: `/medical-subjects/${s.slug}`,
  topics: s.topics.map((name) => ({ name, slug: slugify(name) })),
}));

export function getSubject(slug) {
  return subjects.find((s) => s.slug === slug);
}
