import { useState } from "react";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import { newsItems, jobItems } from "../data/items";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const tabs = [
  { slug: "news", label: "News" },
  { slug: "jobs", label: "Jobs" },
];

export default function NewsJobs() {
  const [tab, setTab] = useState("news");
  const breadcrumbItems = [{ label: "News & Jobs", to: "/news-jobs" }];

  return (
    <>
      <SEO
        title="News & Jobs — KMU and KPK Medical Universities | QaziPedia"
        description="The latest news, admissions updates and healthcare job openings from Khyber Medical University and affiliated institutes across Khyber Pakhtunkhwa."
        path="/news-jobs"
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />

      <section className="bg-teal-950 text-parchment-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mt-6 mb-3">
            News & Jobs
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
            What's happening at KMU and KPK's medical institutes
          </h1>
          <p className="mt-4 text-parchment-200/85 max-w-xl text-sm sm:text-base">
            University updates, admissions and healthcare jobs from
            Khyber Medical University and its affiliated institutes
            across Khyber Pakhtunkhwa, in one feed.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="flex gap-2 mb-6" role="tablist" aria-label="News or Jobs">
          {tabs.map((t) => (
            <button
              key={t.slug}
              role="tab"
              aria-selected={tab === t.slug}
              onClick={() => setTab(t.slug)}
              className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors ${
                tab === t.slug
                  ? "bg-teal-900 text-parchment-50"
                  : "bg-teal-900/8 text-teal-900 hover:bg-teal-900/15"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "news" ? (
          <div className="space-y-3">
            {newsItems.map((n) => (
              <Card key={n.title} className="p-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge tone="amber">{n.tag}</Badge>
                  <span className="text-xs text-ink-500">{n.institute}</span>
                </div>
                <h3 className="font-display text-base font-medium text-teal-950 leading-snug mt-2">
                  {n.title}
                </h3>
                <p className="flex items-center gap-1.5 text-xs text-ink-500 mt-2">
                  <FaCalendarAlt size={10} /> {formatDate(n.date)}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {jobItems.map((j) => (
              <Card key={j.title + j.institute} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge tone="teal">{j.tag}</Badge>
                    <h3 className="font-display text-base font-medium text-teal-950 mt-2">
                      {j.title}
                    </h3>
                    <p className="text-sm text-ink-700 mt-0.5">{j.institute}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-ink-500">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt size={10} /> {j.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock size={10} /> Due {formatDate(j.deadline)}
                      </span>
                    </div>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="shrink-0 text-xs font-semibold rounded-full border border-teal-700 text-teal-900 px-4 py-2 hover:bg-teal-900 hover:text-parchment-50 transition-colors"
                  >
                    Apply
                  </a>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
