import { Link } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

/**
 * items: [{ label, to }] — the current page is the last item and
 * renders as plain text (not a link). Also emits BreadcrumbList
 * JSON-LD via the `jsonLd` export helper for use in <SEO jsonLd={...} />.
 */
export default function Breadcrumbs({ items, variant = "light" }) {
  const isDark = variant === "dark";
  const base = isDark ? "text-parchment-200/70" : "text-ink-500";
  const hover = isDark ? "hover:text-parchment-50" : "hover:text-teal-900";
  const current = isDark ? "text-parchment-50" : "text-teal-950";

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className={`flex flex-wrap items-center gap-1.5 ${base}`}>
        <li className="flex items-center gap-1.5">
          <Link to="/" className={`flex items-center gap-1 transition-colors ${hover}`}>
            <FaHome size={11} /> Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <FaChevronRight size={9} className="opacity-50" />
            {i === items.length - 1 ? (
              <span className={`font-medium ${current}`}>{item.label}</span>
            ) : (
              <Link to={item.to} className={`transition-colors ${hover}`}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://qazipedia.com/" },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        item: `https://qazipedia.com${item.to}`,
      })),
    ],
  };
}
