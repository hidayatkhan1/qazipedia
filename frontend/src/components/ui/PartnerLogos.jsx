// KMU (Khyber Medical University) and IHS (Institute of Health Sciences)
// affiliation logos. Real logo files live in src/assets/logos — swap
// kmu-logo.svg / ihs-logo.svg for the real artwork (keep the same
// filenames, or update the imports below) and they'll appear automatically.
// If a file is ever missing or fails to load, LogoBadge falls back to the
// dashed placeholder badge instead of a broken image icon.
import LogoBadge from "./LogoBadge";
import kmuLogo from "../../assets/logos/kmu-logo.Png";
import ihsLogo from "../../assets/logos/ihs-logo.Png";

const partners = [
  { code: "KMU", name: "Khyber Medical University", src: kmuLogo },
  { code: "IHS", name: "Institute of Health Sciences", src: ihsLogo },
];

export default function PartnerLogos({ variant = "dark" }) {
  const isDark = variant === "dark";

  return (
    <div className="flex items-center gap-4">
      <p
        className={`text-[11px] font-semibold uppercase tracking-wider shrink-0 ${
          isDark ? "text-parchment-200/60" : "text-ink-500"
        }`}
      >
        Affiliated with
      </p>
      <div className="flex items-center gap-3">
        {partners.map((p) => (
          <div key={p.code} className="flex items-center gap-2" title={p.name}>
            <LogoBadge
              src={p.src}
              alt={`${p.name} logo`}
              label={p.code}
              tone={isDark ? "light" : "dark"}
              size="sm"
            />
            <span
              className={`hidden sm:inline text-xs font-medium ${
                isDark ? "text-parchment-200/80" : "text-ink-700"
              }`}
            >
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
