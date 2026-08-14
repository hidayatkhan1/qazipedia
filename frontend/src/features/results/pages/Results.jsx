import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import ResultChecker from "../components/ResultChecker";
import { regions } from "../data/regions";

export default function Results() {
  const breadcrumbItems = [{ label: "KMU Results", to: "/results" }];

  return (
    <>
      <SEO
        title="KMU Results — Check Your Result | QaziPedia"
        description="Check your Nursing or Allied Health Sciences semester result across all 7 KMU regions — Malakand, Peshawar, Mardan, Hazara, Kohat, Bannu and Dera Ismail Khan."
        path="/results"
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />

      <section className="bg-teal-950 text-parchment-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mt-6 mb-3">
            KMU Results
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
            Check your KMU semester result
          </h1>
          <p className="mt-4 text-parchment-200/85 max-w-xl text-sm sm:text-base">
            Choose Nursing or Allied Health, then select your region,
            institute, program, semester and session to find your class's
            result document.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <ResultChecker />

        <div className="mt-12 sm:mt-14">
          <h2 className="font-display text-xl font-semibold text-teal-950 mb-4">
            Covered KMU regions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {regions.map((r) => (
              <div
                key={r.slug}
                className="text-center rounded-lg border border-teal-900/10 bg-white/60 px-3 py-4"
              >
                <p className="text-sm font-medium text-teal-950">{r.name}</p>
                <p className="text-xs text-ink-500 mt-1">
                  {r.institutes.length} institutes
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-500 mt-6 leading-relaxed">
            Results shown here are for demonstration purposes on this build
            of QaziPedia and are not official university records. Always
            confirm your result through your institute's official channel.
          </p>
        </div>
      </section>
    </>
  );
}
