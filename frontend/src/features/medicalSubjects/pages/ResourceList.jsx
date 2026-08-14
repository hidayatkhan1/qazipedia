import { useEffect, useMemo, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import MedicalSubjectsSubNav from "../components/SubNav";
import ResourceCard from "../../../components/ui/ResourceCard";
import Pagination from "../../../components/ui/Pagination";
import EmptyState from "../../../components/ui/EmptyState";
import { getResourceType } from "../data/resourceTypes";
import { getResourcesByType } from "../data/resourceItems";
import { useMergedResources } from "../../../hooks/useAdminUploads";
import { subjects } from "../data/subjects";

const PAGE_SIZE = 8;

export default function ResourceList() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").pop();
  const type = getResourceType(slug);

  const [subjectFilter, setSubjectFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const staticItems = useMemo(() => (type ? getResourcesByType(type.slug) : []), [type]);
  const allItems = useMergedResources("medical-subjects", type?.slug, staticItems);

  const filtered = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSubject = subjectFilter === "all" || item.subject === subjectFilter;
      const matchesQuery =
        query.trim() === "" ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.topic.toLowerCase().includes(query.toLowerCase());
      return matchesSubject && matchesQuery;
    });
  }, [allItems, subjectFilter, query]);

  useEffect(() => setPage(1), [subjectFilter, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered
    .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    .map((item) => ({ ...item, badgeLabel: item.subjectName }));

  if (!type) return <Navigate to="/medical-subjects" replace />;

  const breadcrumbItems = [
    { label: "Medical Subjects", to: "/medical-subjects" },
    { label: type.label, to: `/medical-subjects/${type.slug}` },
  ];

  return (
    <>
      <SEO
        title={`Medical Subjects ${type.label} — All Subjects | QaziPedia`}
        description={`${type.description} Browse and filter by subject across all 14 Medical Subjects.`}
        path={`/medical-subjects/${type.slug}`}
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />
      <MedicalSubjectsSubNav />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <Breadcrumbs items={breadcrumbItems} />

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mt-6 mb-3">
          Medical Subjects
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-teal-950">
          {type.label}
        </h1>
        <p className="mt-2 text-ink-700 max-w-xl">{type.description}</p>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500/50 text-sm" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${type.label.toLowerCase()} by topic or title…`}
              className="w-full rounded-full border border-teal-900/20 bg-white pl-11 pr-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <label htmlFor="subject-filter" className="sr-only">
            Filter by subject
          </label>
          <select
            id="subject-filter"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="rounded-full border border-teal-900/20 bg-white px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shrink-0"
          >
            <option value="all">All subjects</option>
            {subjects.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <p className="text-xs text-ink-500 mt-6 mb-3">
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </p>

        {pageItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pageItems.map((item) => (
                <ResourceCard key={item.id} item={item} icon={type.icon} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </>
        ) : (
          <EmptyState
            title={`No ${type.label.toLowerCase()} found`}
            description="Try a different search term or switch subjects."
          />
        )}
      </section>
    </>
  );
}
