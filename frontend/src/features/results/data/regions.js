import { departments as alliedHealthDepartments } from "../../alliedHealth/data/departments";

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// The 7 KMU regions, in the exact order requested, each with its own
// set of affiliated institutes.
const instituteNames = {
  malakand: ["KMU IHS Swat", "Institute of Health Sciences Dir", "Timergara College of Nursing"],
  peshawar: ["KMU Peshawar Main Campus", "Khyber Girls Medical College", "Rehman Medical Institute"],
  mardan: ["KMU IHS Mardan", "Bacha Khan Medical College Nursing Wing", "Mardan Institute of Health Sciences"],
  hazara: ["Hazara University Health Sciences", "KMU IHS Haripur", "Ayub Medical College Nursing Institute"],
  kohat: ["KMU IHS Kohat", "Kohat Institute of Nursing & Allied Health", "Frontier College of Health Sciences Kohat"],
  bannu: ["KMU IHS Bannu", "Bannu Medical College Nursing Wing", "TAJ College of Health Sciences Bannu"],
  "dera-ismail-khan": ["Gomal Medical College Nursing Institute", "KMU IHS Dera Ismail Khan", "DI Khan Institute of Allied Health Sciences"],
};

// Every KMU-affiliated institute in this dataset teaches BS Nursing, plus
// a deterministic subset of 2-4 Allied Health departments — so the
// Nursing tab always has a program to select, and so does Allied Health.
function alliedHealthSubsetFor(instituteIndex, regionIndex) {
  const seed = instituteIndex + regionIndex * 3;
  const count = 2 + (seed % 3); // 2-4 departments
  const names = alliedHealthDepartments.map((d) => d.name);
  return Array.from({ length: count }, (_, i) => names[(seed + i * 5) % names.length]).filter(
    (v, i, arr) => arr.indexOf(v) === i
  );
}

export const regions = [
  { slug: "malakand", name: "Malakand Region" },
  { slug: "peshawar", name: "Peshawar Region" },
  { slug: "mardan", name: "Mardan Region" },
  { slug: "hazara", name: "Hazara Region" },
  { slug: "kohat", name: "Kohat Region" },
  { slug: "bannu", name: "Bannu Region" },
  { slug: "dera-ismail-khan", name: "Dera Ismail Khan Region" },
].map((region, regionIndex) => ({
  ...region,
  institutes: instituteNames[region.slug].map((name, i) => ({
    slug: slugify(name),
    name,
    programsByTrack: {
      nursing: ["BS Nursing"],
      "allied-health": alliedHealthSubsetFor(i, regionIndex),
    },
  })),
}));

export const tracks = [
  { slug: "nursing", label: "Nursing" },
  { slug: "allied-health", label: "Allied Health" },
];

export const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

export const sessions = ["Spring 2026", "Fall 2025", "Spring 2025", "Fall 2024"];

export function getRegion(slug) {
  return regions.find((r) => r.slug === slug);
}
