import { resourceTypes as bsNursingResourceTypes } from "../../bsNursing/data/resourceTypes";
import { semesters as bsNursingSemesters } from "../../bsNursing/data/semesters";
import { resourceTypes as alliedHealthResourceTypes } from "../../alliedHealth/data/resourceTypes";
import { departments as alliedHealthDepartments } from "../../alliedHealth/data/departments";
import { resourceTypes as medicalSubjectsResourceTypes } from "../../medicalSubjects/data/resourceTypes";
import { subjects as medicalSubjects } from "../../medicalSubjects/data/subjects";
import { resourceTypes as kmuRegionsResourceTypes } from "../../kmuRegions/data/resourceTypes";
import { regions as kmuRegions } from "../../kmuRegions/data/regions";
import { downloadCategories } from "../../downloads/data/categories";

// Each section describes: its resource types (what an admin can pick
// as the upload category), and its "filter dimension" — the other
// axis every resource list page filters by (semester, department,
// subject, or region). adapt() converts a generic uploaded item into
// the exact field shape that section's ResourceList component expects
// (verified against each page's actual filter/search/badge logic).
export const adminSections = [
  {
    key: "bs-nursing",
    label: "BS Nursing",
    resourceTypes: bsNursingResourceTypes,
    filterDimension: {
      label: "Semester",
      options: bsNursingSemesters.map((s) => ({ value: String(s.number), label: s.title })),
    },
    adapt: (item) => ({
      id: item.id,
      title: item.title,
      semester: Number(item.filterValue),
      subject: item.note || item.title,
      fileKind: "Uploaded file",
      fileSize: item.fileName || "—",
      date: item.uploadedAt,
    }),
  },
  {
    key: "allied-health",
    label: "Allied Health Sciences",
    resourceTypes: alliedHealthResourceTypes,
    filterDimension: {
      label: "Department",
      options: alliedHealthDepartments.map((d) => ({ value: d.slug, label: d.name })),
    },
    adapt: (item) => ({
      id: item.id,
      title: item.title,
      department: item.filterValue,
      departmentName: item.filterLabel,
      subject: item.note || item.title,
      fileKind: "Uploaded file",
      fileSize: item.fileName || "—",
      date: item.uploadedAt,
    }),
  },
  {
    key: "medical-subjects",
    label: "Medical Subjects",
    resourceTypes: medicalSubjectsResourceTypes,
    filterDimension: {
      label: "Subject",
      options: medicalSubjects.map((s) => ({ value: s.slug, label: s.name })),
    },
    adapt: (item) => ({
      id: item.id,
      title: item.title,
      subject: item.filterValue,
      subjectName: item.filterLabel,
      topic: item.note || item.title,
      fileKind: "Uploaded file",
      fileSize: item.fileName || "—",
      date: item.uploadedAt,
    }),
  },
  {
    key: "kmu-regions",
    label: "KMU Regions",
    resourceTypes: kmuRegionsResourceTypes,
    filterDimension: {
      label: "Region",
      options: kmuRegions.map((r) => ({ value: r.slug, label: r.name })),
    },
    adapt: (item) => ({
      id: item.id,
      title: item.title,
      region: item.filterValue,
      regionName: item.filterLabel,
      topic: item.note || item.title,
      fileKind: "Uploaded file",
      fileSize: item.fileName || "—",
      date: item.uploadedAt,
    }),
  },
  {
    key: "downloads",
    label: "Downloads (General)",
    resourceTypes: downloadCategories.map((c) => ({
      slug: c.slug,
      label: c.name,
      icon: c.icon,
      description: c.blurb,
      fileKind: "PDF",
    })),
    filterDimension: {
      label: "Applies to",
      options: [
        { value: "all-programs", label: "All Programs" },
        { value: "bs-nursing", label: "BS Nursing" },
        { value: "allied-health", label: "Allied Health Sciences" },
        { value: "medical-subjects", label: "Medical Subjects" },
        { value: "kmu-regions", label: "KMU Regions" },
      ],
    },
    adapt: (item) => ({
      id: item.id,
      title: item.title,
      program: item.filterValue,
      programName: item.filterLabel,
      note: item.note || item.title,
      fileKind: "Uploaded file",
      fileSize: item.fileName || "—",
      date: item.uploadedAt,
    }),
  },
];

export function getAdminSection(key) {
  return adminSections.find((s) => s.key === key);
}

/** Storage key convention used by adminStorage.js for this section+type. */
export function storageKey(sectionKey, resourceTypeSlug) {
  return `${sectionKey}:${resourceTypeSlug}`;
}
