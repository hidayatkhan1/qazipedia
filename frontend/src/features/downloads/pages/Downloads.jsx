import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import Card from "../../../components/ui/Card";
import { downloadCategories } from "../data/categories";
import { resourceTypes as bsNursingResourceTypes } from "../../bsNursing/data/resourceTypes";

export default function Downloads() {
  const breadcrumbItems = [{ label: "Downloads", to: "/downloads" }];

  return (
    <>
      <SEO
        title="Downloads — PDFs, Forms & Guidelines | QaziPedia"
        description="Download syllabus documents, admission forms, guidelines and reference PDFs for Nursing and Allied Health Sciences students."
        path="/downloads"
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />

      <section className="bg-teal-950 text-parchment-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mt-6 mb-3">
            Downloads
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
            Everything you can download in one place
          </h1>
          <p className="mt-4 text-parchment-200/85 max-w-xl text-sm sm:text-base">
            Syllabus documents, official forms, guidelines and general
            reference PDFs — sorted by category.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {downloadCategories.map((c) => {
            const Icon = Icons[c.icon];
            return (
              <Link key={c.slug} to={`/downloads/${c.slug}`}>
                <Card className="h-full group">
                  <div className="w-11 h-11 rounded-full bg-teal-900/8 text-teal-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-teal-950 transition-colors">
                    {Icon && <Icon size={16} />}
                  </div>
                  <h3 className="font-display text-base font-semibold text-teal-950 mt-3">
                    {c.name}
                  </h3>
                  <p className="text-xs text-ink-700 mt-1.5 leading-relaxed">
                    {c.blurb}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Nursing Resources — quick access into the full BS Nursing
          resource library, in the same card style used across the
          rest of the site (Downloads categories above, Admin
          dashboard's "Upload to a section" grid). */}
      <section className="bg-teal-950/[0.03] border-t border-teal-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mb-2">
                BS Nursing
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-teal-950">
                Nursing Resources
              </h2>
              <p className="mt-2 text-ink-700 text-sm sm:text-base max-w-xl">
                Notes, books, past papers, MCQs and more — every resource type in the
                BS Nursing library, filterable by semester.
              </p>
            </div>
            <Link
              to="/bs-nursing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors shrink-0"
            >
              View BS Nursing home <FaArrowRight size={11} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bsNursingResourceTypes.map((r) => {
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
        </div>
      </section>
    </>
  );
}
