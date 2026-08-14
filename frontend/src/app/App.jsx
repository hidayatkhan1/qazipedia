import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../features/home/pages/Home";
import ComingSoon from "../pages/ComingSoon";
import NotFound from "../pages/NotFound";
import { navigation } from "../data/navigation";

// BS Nursing — Part 2, fully built
import BsNursingHome from "../features/bsNursing/pages/BsNursingHome";
import BsNursingIntroduction from "../features/bsNursing/pages/Introduction";
import BsNursingSemester from "../features/bsNursing/pages/Semester";
import BsNursingResourceList from "../features/bsNursing/pages/ResourceList";
import { resourceTypes as bsNursingResourceTypes } from "../features/bsNursing/data/resourceTypes";

// Allied Health Sciences — Part 3, fully built
import AlliedHealthHome from "../features/alliedHealth/pages/AlliedHealthHome";
import AlliedHealthDepartment from "../features/alliedHealth/pages/Department";
import AlliedHealthResourceList from "../features/alliedHealth/pages/ResourceList";
import { resourceTypes as alliedHealthResourceTypes } from "../features/alliedHealth/data/resourceTypes";
import { departments as alliedHealthDepartments } from "../features/alliedHealth/data/departments";

// Medical Subjects — Part 4, fully built
import MedicalSubjectsHome from "../features/medicalSubjects/pages/MedicalSubjectsHome";
import MedicalSubject from "../features/medicalSubjects/pages/Subject";
import MedicalSubjectsResourceList from "../features/medicalSubjects/pages/ResourceList";
import { resourceTypes as medicalSubjectsResourceTypes } from "../features/medicalSubjects/data/resourceTypes";
import { subjects as medicalSubjects } from "../features/medicalSubjects/data/subjects";

// Results — Part 5
import Results from "../features/results/pages/Results";

// KMU Regions
import KmuRegionsHome from "../features/kmuRegions/pages/KmuRegionsHome";
import KmuRegion from "../features/kmuRegions/pages/Region";
import KmuRegionsResourceList from "../features/kmuRegions/pages/ResourceList";
import { resourceTypes as kmuRegionsResourceTypes } from "../features/kmuRegions/data/resourceTypes";
import { regions as kmuRegions } from "../features/kmuRegions/data/regions";

// Clinical Skills, Downloads, News & Jobs
import ClinicalSkills from "../features/clinicalSkills/pages/ClinicalSkills";
import Downloads from "../features/downloads/pages/Downloads";
import DownloadCategory from "../features/downloads/pages/DownloadCategory";
import { downloadCategories } from "../features/downloads/data/categories";
import NewsJobs from "../features/newsJobs/pages/NewsJobs";

// About & Contact
import About from "../features/about/pages/About";
import Contact from "../features/contact/pages/Contact";

// Admin dashboard (Part 8, placeholder backend)
import AdminLogin from "../features/admin/pages/AdminLogin";
import AdminLayout from "../features/admin/components/AdminLayout";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import UploadResource from "../features/admin/pages/UploadResource";
import ResultsUpload from "../features/admin/pages/ResultsUpload";

// Flatten the full nav tree (top-level items + every dropdown link)
// into a de-duplicated list of paths, so every link the Navbar or
// Footer renders has a matching route from the very first build.
function collectPaths(items) {
  const paths = new Set();
  for (const item of items) {
    if (item.to) paths.add(item.to);
    if (item.columns) {
      for (const col of item.columns) {
        for (const link of col.links) paths.add(link.to);
      }
    }
  }
  return Array.from(paths);
}

// Paths that now have a real page — excluded from the auto-generated
// ComingSoon placeholder list below so the real route wins.
const bsNursingRealPaths = new Set([
  "/bs-nursing",
  "/bs-nursing/introduction",
  ...Array.from({ length: 8 }, (_, i) => `/bs-nursing/semester-${i + 1}`),
  ...bsNursingResourceTypes.map((r) => `/bs-nursing/${r.slug}`),
]);

const alliedHealthRealPaths = new Set([
  "/allied-health",
  ...alliedHealthDepartments.map((d) => d.path),
  ...alliedHealthResourceTypes.map((r) => `/allied-health/${r.slug}`),
]);

const medicalSubjectsRealPaths = new Set([
  "/medical-subjects",
  ...medicalSubjects.map((s) => s.path),
  ...medicalSubjectsResourceTypes.map((r) => `/medical-subjects/${r.slug}`),
]);

const resultsRealPaths = new Set(["/results"]);

const kmuRegionsRealPaths = new Set([
  "/kmu-regions",
  ...kmuRegions.map((r) => `/kmu-regions/${r.slug}`),
  ...kmuRegionsResourceTypes.map((r) => `/kmu-regions/${r.slug}`),
]);

const quickSectionsRealPaths = new Set([
  "/clinical-skills",
  "/downloads",
  ...downloadCategories.map((c) => `/downloads/${c.slug}`),
  "/news-jobs",
]);

const aboutContactRealPaths = new Set(["/about", "/contact"]);

const placeholderPaths = collectPaths(navigation).filter(
  (p) =>
    p !== "/" &&
    !bsNursingRealPaths.has(p) &&
    !alliedHealthRealPaths.has(p) &&
    !medicalSubjectsRealPaths.has(p) &&
    !resultsRealPaths.has(p) &&
    !kmuRegionsRealPaths.has(p) &&
    !quickSectionsRealPaths.has(p) &&
    !aboutContactRealPaths.has(p)
);
const extraPaths = [
  "/login",
  "/register",
  "/about/privacy-policy",
  "/about/terms",
  "/about/disclaimer",
];

export default function App() {
  return (
    <Routes>
      {/* Admin — separate chrome, no public Navbar/Footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="upload" element={<UploadResource />} />
        <Route path="results" element={<ResultsUpload />} />
      </Route>

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        {/* BS Nursing — Part 2 */}
        <Route path="/bs-nursing" element={<BsNursingHome />} />
        <Route path="/bs-nursing/introduction" element={<BsNursingIntroduction />} />
        {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
          <Route key={n} path={`/bs-nursing/semester-${n}`} element={<BsNursingSemester />} />
        ))}
        {bsNursingResourceTypes.map((r) => (
          <Route key={r.slug} path={`/bs-nursing/${r.slug}`} element={<BsNursingResourceList />} />
        ))}

        {/* Allied Health Sciences — Part 3 */}
        <Route path="/allied-health" element={<AlliedHealthHome />} />
        {alliedHealthResourceTypes.map((r) => (
          <Route
            key={r.slug}
            path={`/allied-health/${r.slug}`}
            element={<AlliedHealthResourceList />}
          />
        ))}
        {alliedHealthDepartments.map((d) => (
          <Route key={d.slug} path={d.path} element={<AlliedHealthDepartment />} />
        ))}

        {/* Medical Subjects — Part 4 */}
        <Route path="/medical-subjects" element={<MedicalSubjectsHome />} />
        {medicalSubjectsResourceTypes.map((r) => (
          <Route
            key={r.slug}
            path={`/medical-subjects/${r.slug}`}
            element={<MedicalSubjectsResourceList />}
          />
        ))}
        {medicalSubjects.map((s) => (
          <Route key={s.slug} path={s.path} element={<MedicalSubject />} />
        ))}

        {/* Results — Part 5 */}
        <Route path="/results" element={<Results />} />

        {/* KMU Regions */}
        <Route path="/kmu-regions" element={<KmuRegionsHome />} />
        {kmuRegionsResourceTypes.map((r) => (
          <Route
            key={r.slug}
            path={`/kmu-regions/${r.slug}`}
            element={<KmuRegionsResourceList />}
          />
        ))}
        {kmuRegions.map((r) => (
          <Route key={r.slug} path={`/kmu-regions/${r.slug}`} element={<KmuRegion />} />
        ))}

        {/* Clinical Skills, Downloads, News & Jobs */}
        <Route path="/clinical-skills" element={<ClinicalSkills />} />
        <Route path="/downloads" element={<Downloads />} />
        {downloadCategories.map((c) => (
          <Route key={c.slug} path={`/downloads/${c.slug}`} element={<DownloadCategory />} />
        ))}
        <Route path="/news-jobs" element={<NewsJobs />} />
        <Route path="/news" element={<Navigate to="/news-jobs" replace />} />
        <Route path="/jobs" element={<Navigate to="/news-jobs" replace />} />

        {/* About & Contact */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {[...placeholderPaths, ...extraPaths].map((path) => (
          <Route key={path} path={path} element={<ComingSoon />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
