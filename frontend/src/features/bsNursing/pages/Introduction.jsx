import { Link } from "react-router-dom";
import { FaArrowRight, FaGraduationCap, FaClock, FaCertificate, FaCheck } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import BsNursingSubNav from "../components/SubNav";
import Card from "../../../components/ui/Card";
import { semesters } from "../data/semesters";
import { bsNursingProgram } from "../data/program";

const facts = [
  { icon: FaClock, label: "Duration", value: bsNursingProgram.duration },
  { icon: FaGraduationCap, label: "Credit Hours", value: bsNursingProgram.creditHours },
  { icon: FaCertificate, label: "Regulator", value: bsNursingProgram.accreditation },
];

export default function Introduction() {
  const breadcrumbItems = [
    { label: "BS Nursing", to: "/bs-nursing" },
    { label: "Introduction", to: "/bs-nursing/introduction" },
  ];

  return (
    <>
      <SEO
        title="BS Nursing Introduction — Program Overview | QaziPedia"
        description="An overview of the 4-year BS Nursing program: structure, semester breakdown, and where to find notes, MCQs and past papers for every subject."
        path="/bs-nursing/introduction"
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />
      <BsNursingSubNav />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mt-6 mb-3">
          BS Nursing
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-teal-950 leading-tight">
          A 4-year path from fundamentals to independent clinical practice
        </h1>
        <p className="mt-4 text-ink-700 leading-relaxed max-w-2xl">
          {bsNursingProgram.intro}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {facts.map(({ icon: Icon, label, value }) => (
            <Card key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-900/8 text-teal-800 flex items-center justify-center shrink-0">
                <Icon size={15} />
              </div>
              <div>
                <p className="text-xs text-ink-500">{label}</p>
                <p className="text-sm font-semibold text-teal-950">{value}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div>
            <h2 className="font-display text-xl font-semibold text-teal-950 mb-4">
              Eligibility
            </h2>
            <ul className="space-y-2.5">
              {bsNursingProgram.eligibility.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-ink-700">
                  <FaCheck className="text-amber-600 mt-0.5 shrink-0" size={11} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-teal-950 mb-4">
              Where this degree leads
            </h2>
            <ul className="space-y-2.5">
              {bsNursingProgram.careerPaths.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-ink-700">
                  <FaCheck className="text-amber-600 mt-0.5 shrink-0" size={11} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="font-display text-2xl font-semibold text-teal-950 mt-12 mb-5">
          Browse by semester
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {semesters.map((s) => (
            <Link key={s.path} to={s.path}>
              <Card className="flex items-center justify-between group">
                <div>
                  <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                    {s.focus}
                  </p>
                  <h3 className="font-display text-lg font-semibold text-teal-950 mt-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-ink-500 mt-1">
                    {s.subjects.length} subjects
                  </p>
                </div>
                <FaArrowRight className="text-teal-700 group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
