import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import MedicalSubjectsSubNav from "../components/SubNav";
import Card from "../../../components/ui/Card";
import { subjects } from "../data/subjects";
import { resourceTypes } from "../data/resourceTypes";

export default function MedicalSubjectsHome() {
  const breadcrumbItems = [{ label: "Medical Subjects", to: "/medical-subjects" }];

  return (
    <>
      <SEO
        title="Medical Subjects — Notes, MCQs, Past Papers & Videos | QaziPedia"
        description="Notes, MCQs, past papers, books and videos for all 14 core Medical Subjects: Anatomy, Physiology, Pathology, Pharmacology, Medicine, Surgery and more."
        path="/medical-subjects"
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />

      <section className="bg-teal-950 text-parchment-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mt-6 mb-3">
            Program
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
            14 subjects, every resource a medical student actually needs
          </h1>
          <p className="mt-4 text-parchment-200/85 max-w-xl">
            From Anatomy to Community Medicine — find your subject, then
            browse notes, MCQs, past papers, books and recorded video
            lectures built around its syllabus.
          </p>
        </div>
      </section>

      <MedicalSubjectsSubNav />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="font-display text-2xl font-semibold text-teal-950 mb-5">
          Browse by subject
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {subjects.map((s) => (
            <Link key={s.slug} to={s.path}>
              <Card className="h-full group">
                <h3 className="font-display text-lg font-semibold text-teal-950 group-hover:text-teal-700 transition-colors">
                  {s.name}
                </h3>
                <p className="text-sm text-ink-700 mt-2 leading-relaxed line-clamp-3">
                  {s.description}
                </p>
                <p className="text-xs font-medium text-amber-600 mt-4">
                  {s.topics.length} core topics
                </p>
              </Card>
            </Link>
          ))}
        </div>

        <h2 className="font-display text-2xl font-semibold text-teal-950 mb-5">
          Browse by resource type
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {resourceTypes.map((r) => {
            const Icon = Icons[r.icon];
            return (
              <Link key={r.slug} to={`/medical-subjects/${r.slug}`}>
                <Card className="h-full group">
                  <div className="w-11 h-11 rounded-full bg-teal-900/8 text-teal-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-teal-950 transition-colors">
                    {Icon && <Icon size={16} />}
                  </div>
                  <h3 className="font-display text-base font-semibold text-teal-950 mt-3">
                    {r.label}
                  </h3>
                  <p className="text-xs text-ink-700 mt-1.5 leading-relaxed">
                    {r.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-10">
          <Link
            to="/downloads"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            Browse syllabus & downloads <FaArrowRight size={12} />
          </Link>
        </div>
      </section>
    </>
  );
}
