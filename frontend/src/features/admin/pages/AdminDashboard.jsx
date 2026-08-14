import { useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import { FaUpload, FaFileMedical, FaArrowRight, FaMapMarkedAlt } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Card from "../../../components/ui/Card";
import {
  getTotalUploadCount,
  listResultDocuments,
  subscribeToUploads,
  getUploadsVersion,
} from "../../../lib/adminStorage";
import { adminSections } from "../data/sectionsRegistry";

export default function AdminDashboard() {
  useSyncExternalStore(subscribeToUploads, getUploadsVersion);

  const totalUploads = getTotalUploadCount();
  const resultDocs = listResultDocuments();

  return (
    <>
      <SEO title="Admin Dashboard | QaziPedia" path="/admin" />

      <h1 className="font-display text-2xl font-semibold text-teal-950">
        Overview
      </h1>
      <p className="text-sm text-ink-700 mt-1">
        Content uploaded here is stored in this browser only — see the
        README's "Admin dashboard" section for what that means and how
        to move to a real backend.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <Card className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-teal-900/8 text-teal-800 flex items-center justify-center shrink-0">
            <FaUpload size={16} />
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-teal-950">
              {totalUploads}
            </p>
            <p className="text-xs text-ink-500">Resources uploaded</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-teal-900/8 text-teal-800 flex items-center justify-center shrink-0">
            <FaFileMedical size={16} />
          </div>
          <div>
            <p className="font-display text-2xl font-semibold text-teal-950">
              {resultDocs.length}
            </p>
            <p className="text-xs text-ink-500">Result documents uploaded</p>
          </div>
        </Card>
      </div>

      <Card className="mt-6 flex items-start gap-4 border-amber-500/20!">
        <div className="w-11 h-11 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
          <FaMapMarkedAlt size={16} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">
            What's new
          </p>
          <p className="text-sm text-teal-950 font-medium mt-1">
            BS Nursing now has a Region → Institute → Session → Semester finder
          </p>
          <p className="text-xs text-ink-700 mt-1 leading-relaxed max-w-md">
            It's a navigation aid, not a new upload dimension — BS Nursing
            content is standardized across every KMU institute, so it
            still reads from the same Semester-based uploads below.
            Nothing to configure here.
          </p>
          <Link
            to="/bs-nursing"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors mt-2"
          >
            View it live <FaArrowRight size={10} />
          </Link>
        </div>
      </Card>

      <h2 className="font-display text-lg font-semibold text-teal-950 mt-10 mb-4">
        Upload to a section
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {adminSections.map((s) => (
          <Link key={s.key} to={`/admin/upload?section=${s.key}`}>
            <Card className="flex items-center justify-between group">
              <div>
                <p className="font-display text-sm font-semibold text-teal-950">
                  {s.label}
                </p>
                <p className="text-xs text-ink-500 mt-0.5">
                  {s.resourceTypes.length} resource types
                </p>
              </div>
              <FaArrowRight
                size={12}
                className="text-teal-700 group-hover:translate-x-0.5 transition-transform"
              />
            </Card>
          </Link>
        ))}
      </div>

      <Link
        to="/admin/results"
        className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors mt-6"
      >
        Manage KMU Results documents <FaArrowRight size={12} />
      </Link>
    </>
  );
}
