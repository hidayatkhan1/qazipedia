import { useLocation, Link, Navigate } from "react-router-dom";
import { FaChalkboardTeacher, FaBookMedical, FaQuestionCircle } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import PartnerLogos from "../../../components/ui/PartnerLogos";
import KmuRegionsSubNav from "../components/SubNav";
import Card from "../../../components/ui/Card";
import { getRegion } from "../data/regions";
import { getResourcesByRegion } from "../data/resourceItems";
import { resourceTypes } from "../data/resourceTypes";

const iconMap = {
  slides: FaChalkboardTeacher,
  notes: FaBookMedical,
  mcqs: FaQuestionCircle,
};

export default function Region() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").pop();
  const region = getRegion(slug);

  if (!region) return <Navigate to="/kmu-regions" replace />;

  const items = getResourcesByRegion(region.slug);
  const topics = [...new Set(items.map((i) => i.topic))];

  const breadcrumbItems = [
    { label: "KMU Regions", to: "/kmu-regions" },
    { label: region.name, to: `/kmu-regions/${region.slug}` },
  ];

  return (
    <>
      <SEO
        title={`${region.name} — Slides, Notes & MCQs | QaziPedia`}
        description={`${region.description} Browse slides, notes and MCQs shared by contributors in ${region.name}.`}
        path={`/kmu-regions/${region.slug}`}
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />
      <KmuRegionsSubNav />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mt-6 mb-3">
          KMU Regions
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-teal-950">
          {region.name}
        </h1>
        <p className="mt-3 text-ink-700 max-w-2xl leading-relaxed">
          {region.description}
        </p>

        <div className="mt-6">
          <PartnerLogos variant="light" />
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {resourceTypes.map((r) => {
            const Icon = iconMap[r.slug];
            const count = items.filter((i) => i.type === r.slug).length;
            return (
              <Link
                key={r.slug}
                to={`/kmu-regions/${r.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-900 bg-teal-900/8 hover:bg-teal-900/15 px-3 py-1.5 rounded-full transition-colors"
              >
                <Icon size={11} /> {r.label} ({count})
              </Link>
            );
          })}
        </div>

        <h2 className="font-display text-xl font-semibold text-teal-950 mt-10 mb-4">
          Shared topics in this region
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topics.map((topic) => (
            <Card key={topic}>
              <h3 className="font-display text-base font-semibold text-teal-950">
                {topic}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {resourceTypes.map((r) => {
                  const Icon = iconMap[r.slug];
                  return (
                    <Link
                      key={r.slug}
                      to={`/kmu-regions/${r.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-900 bg-teal-900/8 hover:bg-teal-900/15 px-3 py-1.5 rounded-full transition-colors"
                    >
                      <Icon size={11} /> {r.label}
                    </Link>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
