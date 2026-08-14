import * as Icons from "react-icons/fa";
import { FaDownload, FaCalendarAlt, FaFileDownload } from "react-icons/fa";
import Card from "./Card";
import Badge from "./Badge";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * item: { title, badgeLabel, fileKind, fileSize, date }
 * icon: react-icons/fa component name, e.g. "FaBookMedical"
 */
export default function ResourceCard({ item, icon }) {
  const Icon = Icons[icon] || FaFileDownload;

  return (
    <Card className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-full bg-teal-900/8 text-teal-800 flex items-center justify-center shrink-0">
        <Icon size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-base font-semibold text-teal-950 leading-snug">
          {item.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <Badge tone="amber">{item.badgeLabel}</Badge>
          <Badge tone="neutral">{item.fileKind}</Badge>
          <span className="text-xs text-ink-500">{item.fileSize}</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-teal-900/10">
          <span className="flex items-center gap-1.5 text-xs text-ink-500">
            <FaCalendarAlt size={10} /> {formatDate(item.date)}
          </span>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-1.5 text-xs font-semibold text-teal-900 hover:text-amber-600 transition-colors"
          >
            <FaDownload size={11} /> Download
          </a>
        </div>
      </div>
    </Card>
  );
}
