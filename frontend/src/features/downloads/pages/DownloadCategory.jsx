import { useMemo, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import Card from "../../../components/ui/Card";
import ResourceCard from "../../../components/ui/ResourceCard";
import EmptyState from "../../../components/ui/EmptyState";
import { downloadCategories } from "../data/categories";
import { useMergedResources } from "../../../hooks/useAdminUploads";

// Programs that keep their own copy of this same resource "type"
// (e.g. every program has its own Notes / Books / MCQs list). When a
// download category slug matches one of these, we surface direct
// links into each program's real, filterable resource list instead
// of pretending there's one universal pile of files.
const PROGRAM_LINKS = [
  { slug: "bs-nursing", label: "BS Nursing" },
  { slug: "allied-health", label: "Allied Health Sciences" },
  { slug: "medical-subjects", label: "Medical Subjects" },
  { slug: "kmu-regions", label: "KMU Regions" },
];

const SECTION_TYPE_SLUGS = {
  "bs-nursing": ["notes", "books", "past-papers", "mcqs", "assignments", "practical-files", "clinical-procedures"],
  "allied-health": ["notes", "books", "past-papers", "mcqs"],
  "medical-subjects": ["notes", "mcqs", "past-papers", "books", "videos"],
  "kmu-regions": ["slides", "notes", "mcqs"],
};

export default function DownloadCategory() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").pop();
  const category = downloadCategories.find((c) => c.slug === slug);

  const [query, setQuery] = useState("");

  const uploaded = useMergedResources("downloads", slug, []);
  const items = useMemo(
    () =>
      uploaded
        .filter(
          (item) =>
            query.trim() === "" || item.title.toLowerCase().includes(query.toLowerCase())
        )
        .map((item) => ({ ...item, badgeLabel: item.programName || "All Programs" })),
    [uploaded, query]
  );

  if (!category) return <Navigate to="/downloads" replace />;

  const relatedPrograms = PROGRAM_LINKS.filter((p) =>
    SECTION_TYPE_SLUGS[p.slug]?.includes(slug)
  );

  const Icon = Icons[category.icon];
  const breadcrumbItems = [
    { label: "Downloads", to: "/downloads" },
    { label: category.name, to: `/downloads/${category.slug}` },
  ];

  return (
    <>
      <SEO
        title={`${category.name} Downloads | QaziPedia`}
        description={category.blurb}
        path={`/downloads/${category.slug}`}
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />

      <section className="bg-teal-950 text-parchment-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />
          <div className="flex items-center gap-4 mt-6">
            {Icon && (
              <div className="w-12 h-12 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                <Icon size={18} />
              </div>
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mb-1">
                Downloads
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">
                {category.name}
              </h1>
            </div>
          </div>
          <p className="mt-4 text-parchment-200/85 max-w-xl text-sm sm:text-base">
            {category.blurb}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {relatedPrograms.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display text-lg font-semibold text-teal-950 mb-1">
              Browse {category.name.toLowerCase()} by program
            </h2>
            <p className="text-sm text-ink-700 mb-4">
              Every program keeps its own {category.name.toLowerCase()}, filterable and
              searchable — jump straight in.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedPrograms.map((p) => (
                <Link key={p.slug} to={`/${p.slug}/${slug}`}>
                  <Card className="flex items-center justify-between group">
                    <span className="font-display text-sm font-semibold text-teal-950">
                      {p.label}
                    </span>
                    <FaArrowRight
                      size={12}
                      className="text-teal-700 group-hover:translate-x-0.5 transition-transform"
                    />
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <h2 className="font-display text-lg font-semibold text-teal-950 mb-1">
          General {category.name.toLowerCase()} uploads
        </h2>
        <p className="text-sm text-ink-700 mb-4">
          Documents that apply across programs — official forms, syllabi and general
          reference material — uploaded directly to this category.
        </p>

        {items.length > 0 && (
          <div className="relative mb-4 max-w-sm">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${category.name.toLowerCase()}…`}
              className="w-full rounded-full border border-teal-900/20 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        )}

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <ResourceCard key={item.id} item={item} icon={category.icon} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={`No general ${category.name.toLowerCase()} yet`}
            description="Nothing has been uploaded to this category directly yet — check the program-specific lists above, or check back soon."
          />
        )}
      </section>
    </>
  );
}
