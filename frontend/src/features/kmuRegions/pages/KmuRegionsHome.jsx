import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import PartnerLogos from "../../../components/ui/PartnerLogos";
import KmuRegionsSubNav from "../components/SubNav";
import Card from "../../../components/ui/Card";
import { regions } from "../data/regions";
import { resourceTypes } from "../data/resourceTypes";
import { getResourcesByRegion } from "../data/resourceItems";

export default function KmuRegionsHome() {
  const breadcrumbItems = [{ label: "KMU Regions", to: "/kmu-regions" }];

  return (
    <>
      <SEO
        title="KMU Regions — Slides, Notes & MCQs by Region | QaziPedia"
        description="Browse slides, notes and MCQs organized by all 7 KMU regions: Malakand, Peshawar, Mardan, Hazara, Kohat, Bannu and Dera Ismail Khan."
        path="/kmu-regions"
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />

      <section className="bg-teal-950 text-parchment-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mt-6 mb-3">
            KMU Regions
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
            Slides, notes and MCQs, organized the way KMU organizes itself
          </h1>
          <p className="mt-4 text-parchment-200/85 max-w-xl text-sm sm:text-base">
            Every one of KMU's 7 regions has its own contributor community.
            Pick a region to see what's been shared there, or jump straight
            to slides, notes or MCQs across all regions.
          </p>

          <div className="mt-8 pt-6 border-t border-white/10">
            <PartnerLogos variant="dark" />
          </div>
        </div>
      </section>

      <KmuRegionsSubNav />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <h2 className="font-display text-2xl font-semibold text-teal-950 mb-5">
          Browse by region
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {regions.map((r) => {
            const itemCount = getResourcesByRegion(r.slug).length;
            return (
              <Link key={r.slug} to={`/kmu-regions/${r.slug}`}>
                <Card className="h-full group">
                  <h3 className="font-display text-lg font-semibold text-teal-950 group-hover:text-teal-700 transition-colors">
                    {r.name}
                  </h3>
                  <p className="text-sm text-ink-700 mt-2 leading-relaxed">
                    {r.description}
                  </p>
                  <p className="text-xs font-medium text-amber-600 mt-4">
                    {itemCount} resources
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>

        <h2 className="font-display text-2xl font-semibold text-teal-950 mb-5">
          Browse by resource type
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {resourceTypes.map((r) => {
            const Icon = Icons[r.icon];
            return (
              <Link key={r.slug} to={`/kmu-regions/${r.slug}`}>
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
