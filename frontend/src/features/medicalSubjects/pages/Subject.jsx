import { useLocation, Link, Navigate } from "react-router-dom";
import { FaBookMedical, FaQuestionCircle, FaFileAlt, FaBook, FaPlayCircle } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import MedicalSubjectsSubNav from "../components/SubNav";
import Card from "../../../components/ui/Card";
import { getSubject } from "../data/subjects";

const quickLinks = [
  { slug: "notes", label: "Notes", icon: FaBookMedical },
  { slug: "mcqs", label: "MCQs", icon: FaQuestionCircle },
  { slug: "past-papers", label: "Past Papers", icon: FaFileAlt },
  { slug: "books", label: "Books", icon: FaBook },
  { slug: "videos", label: "Videos", icon: FaPlayCircle },
];

export default function Subject() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").pop();
  const subject = getSubject(slug);

  if (!subject) return <Navigate to="/medical-subjects" replace />;

  const breadcrumbItems = [
    { label: "Medical Subjects", to: "/medical-subjects" },
    { label: subject.name, to: subject.path },
  ];

  return (
    <>
      <SEO
        title={`${subject.name} — Notes, MCQs, Past Papers & Videos | QaziPedia`}
        description={`${subject.description} Notes, MCQs, books, past papers and video lectures for ${subject.name}.`}
        path={subject.path}
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />
      <MedicalSubjectsSubNav />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mt-6 mb-3">
          Medical Subjects
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-teal-950">
          {subject.name}
        </h1>
        <p className="mt-3 text-ink-700 max-w-2xl leading-relaxed">
          {subject.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {quickLinks.map(({ slug, label, icon: Icon }) => (
            <Link
              key={slug}
              to={`/medical-subjects/${slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-900 bg-teal-900/8 hover:bg-teal-900/15 px-3 py-1.5 rounded-full transition-colors"
            >
              <Icon size={11} /> All {label}
            </Link>
          ))}
        </div>

        <h2 className="font-display text-xl font-semibold text-teal-950 mt-10 mb-4">
          Core topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subject.topics.map((topic) => (
            <Card key={topic.slug}>
              <h3 className="font-display text-base font-semibold text-teal-950">
                {topic.name}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {quickLinks.map(({ slug, label, icon: Icon }) => (
                  <Link
                    key={slug}
                    to={`/medical-subjects/${slug}`}
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
