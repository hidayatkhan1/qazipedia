import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import Card from "../../../components/ui/Card";
import { procedures } from "../data/procedures";

export default function ClinicalSkills() {
  const breadcrumbItems = [{ label: "Clinical Skills", to: "/clinical-skills" }];

  return (
    <>
      <SEO
        title="Clinical Skills — Procedure Guides | QaziPedia"
        description="Step-by-step clinical skills guides for nursing and allied health students: vital signs, injections, cannulation, CPR, ECG, wound care and more."
        path="/clinical-skills"
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />

      <section className="bg-teal-950 text-parchment-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mt-6 mb-3">
            Clinical Skills
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
            The procedures every clinical rotation asks you to know
          </h1>
          <p className="mt-4 text-parchment-200/85 max-w-xl text-sm sm:text-base">
            Twelve core skills, from vital signs to drug calculations —
            pick one to see step-by-step guidance.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {procedures.map((p) => {
            const Icon = Icons[p.icon];
            return (
              <Link key={p.slug} to={`/clinical-skills/${p.slug}`}>
                <Card className="h-full group">
                  <div className="w-11 h-11 rounded-full bg-teal-900/8 text-teal-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-teal-950 transition-colors">
                    {Icon && <Icon size={16} />}
                  </div>
                  <h3 className="font-display text-base font-semibold text-teal-950 mt-3">
                    {p.name}
                  </h3>
                  <p className="text-xs text-ink-700 mt-1.5 leading-relaxed">
                    {p.blurb}
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
