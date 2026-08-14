import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import BsNursingSubNav from "../components/SubNav";
import RegionInstituteFinder from "../components/RegionInstituteFinder";
import ImagePlaceholder from "../../../components/ui/ImagePlaceholder";
import Card from "../../../components/ui/Card";
import { semesters } from "../data/semesters";
import { resourceTypes } from "../data/resourceTypes";

export default function BsNursingHome() {
  const breadcrumbItems = [{ label: "BS Nursing", to: "/bs-nursing" }];

  return (
    <>
      <SEO
        title="BS Nursing — Notes, MCQs, Past Papers & More | QaziPedia"
        description="Everything for the BS Nursing program in one place: semester-wise subjects, notes, MCQs, past papers, books, assignments and clinical procedure guides."
        path="/bs-nursing"
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />

      <section className="bg-teal-950 text-parchment-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mt-6 mb-3">
            Program
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
            BS Nursing, organized the way your semester actually runs
          </h1>
          <p className="mt-4 text-parchment-200/85 max-w-xl">
            Eight semesters, every subject, and the notes, MCQs and past
            papers to match — plus clinical procedure guides for skills
            lab and ward rotations.
          </p>
          <Link
            to="/bs-nursing/introduction"
            className="inline-flex items-center gap-2 mt-7 rounded-full bg-amber-500 text-teal-950 px-4 sm:px-6 py-3 text-sm font-semibold hover:bg-amber-400 transition-colors"
          >
            View program overview <FaArrowRight size={12} />
          </Link>
        </div>
      </section>

      <BsNursingSubNav />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mb-3">
          Find your class
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-teal-950 mb-3">
          Region, institute, batch, semester
        </h2>
        <p className="text-sm text-ink-700 max-w-2xl mb-6 leading-relaxed">
          Not sure where to start? Find your KMU region and institute,
          your batch, and your semester — we'll take you straight there.
        </p>

        

        <RegionInstituteFinder />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14">
        <p className="text-sm text-ink-500 mb-5">
          Or jump straight to a semester:
        </p>
        <h2 className="font-display text-2xl font-semibold text-teal-950 mb-5">
          Browse by semester
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {semesters.map((s) => (
            <Link key={s.path} to={s.path}>
              <Card className="text-center">
                <p className="font-display text-2xl font-semibold text-teal-950">
                  {s.number}
                </p>
                <p className="text-xs text-ink-500 mt-1">{s.subjects.length} subjects</p>
              </Card>
            </Link>
          ))}
        </div>

        <h2 className="font-display text-2xl font-semibold text-teal-950 mb-5">
          Browse by resource type
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resourceTypes.map((r) => {
            const Icon = Icons[r.icon];
            return (
              <Link key={r.slug} to={`/bs-nursing/${r.slug}`}>
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
      </section>
    </>
  );
}
