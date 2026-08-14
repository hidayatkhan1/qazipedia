import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { newsItems } from "../../../data/newsItems";
import { jobsPreview } from "../../../data/jobsPreview";
import Card from "../../../components/ui/Card";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NewsAndJobs() {
  return (
    <section className="bg-parchment-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* News */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold text-teal-950">
              Recent News
            </h2>
            <Link to="/news-jobs" className="text-sm font-semibold text-amber-600 flex items-center gap-1.5">
              All news <FaArrowRight size={11} />
            </Link>
          </div>
          <div className="space-y-3">
            {newsItems.map((n) => (
              <Card key={n.title} className="p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600">
                  {n.category}
                </p>
                <Link to={n.to} className="block mt-1.5">
                  <h3 className="font-display text-base font-medium text-teal-950 leading-snug hover:text-teal-700 transition-colors">
                    {n.title}
                  </h3>
                </Link>
                <p className="text-xs text-ink-500 mt-2">{formatDate(n.date)}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Jobs */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold text-teal-950">
              Latest Jobs
            </h2>
            <Link to="/news-jobs" className="text-sm font-semibold text-amber-600 flex items-center gap-1.5">
              All jobs <FaArrowRight size={11} />
            </Link>
          </div>
          <div className="space-y-3">
            {jobsPreview.map((j) => (
              <Card key={j.title + j.hospital} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-base font-medium text-teal-950">
                    {j.title}
                  </h3>
                  <p className="text-sm text-ink-700 mt-0.5">{j.hospital}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-ink-500">
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt size={10} /> {j.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock size={10} /> Due {formatDate(j.deadline)}
                    </span>
                  </div>
                </div>
                <Link
                  to={j.to}
                  className="shrink-0 text-xs font-semibold rounded-full border border-teal-700 text-teal-900 px-4 py-2 hover:bg-teal-900 hover:text-parchment-50 transition-colors"
                >
                  Apply
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
