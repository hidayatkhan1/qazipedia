import { useLocation, Link, Navigate } from "react-router-dom";
import { FaFileAlt, FaQuestionCircle, FaBookMedical } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import BsNursingSubNav from "../components/SubNav";
import Card from "../../../components/ui/Card";
import { getSemester } from "../data/semesters";

const quickLinks = [
  { slug: "notes", label: "Notes", icon: FaBookMedical },
  { slug: "mcqs", label: "MCQs", icon: FaQuestionCircle },
  { slug: "past-papers", label: "Past Papers", icon: FaFileAlt },
];

export default function Semester() {
  const { pathname } = useLocation();
  const number = pathname.split("-").pop(); // "/bs-nursing/semester-3" -> "3"
  const semester = getSemester(number);

  if (!semester) return <Navigate to="/bs-nursing/introduction" replace />;

  const breadcrumbItems = [
    { label: "BS Nursing", to: "/bs-nursing" },
    { label: semester.title, to: semester.path },
  ];

  return (
    <>
      <SEO
        title={`BS Nursing ${semester.title} — Subjects, Notes & MCQs | QaziPedia`}
        description={`Subjects, notes, MCQs and past papers for BS Nursing ${semester.title}: ${semester.subjects.map((s) => s.name).join(", ")}.`}
        path={semester.path}
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />
      <BsNursingSubNav />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mt-6 mb-3">
          {semester.focus}
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-teal-950">
          {semester.title}
        </h1>
        <p className="mt-3 text-ink-700 max-w-2xl">
          {semester.subjects.length} subjects this semester. Open a subject
          card for its notes, MCQs and past papers, or use the resource
          pills above to browse everything of one type at once.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {semester.subjects.map((subject) => (
            <Card key={subject.slug}>
              <h2 className="font-display text-lg font-semibold text-teal-950">
                {subject.name}
              </h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {quickLinks.map(({ slug, label, icon: Icon }) => (
                  <Link
                    key={slug}
                    to={`/bs-nursing/${slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-900 bg-teal-900/8 hover:bg-teal-900/15 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <Icon size={11} /> {label}
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
