import { FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "../../../data/testimonials";
import SectionHeading from "../../../components/ui/SectionHeading";
import Card from "../../../components/ui/Card";

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <SectionHeading
        align="center"
        eyebrow="From students"
        title="Trusted by students across Khyber Pakhtunkhwa"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <Card key={t.name}>
            <FaQuoteLeft className="text-amber-500/40" size={20} />
            <p className="text-sm text-ink-700 leading-relaxed mt-4">
              {t.quote}
            </p>
            <div className="mt-5 pt-4 border-t border-teal-900/10">
              <p className="font-display text-sm font-semibold text-teal-950">
                {t.name}
              </p>
              <p className="text-xs text-ink-500 mt-0.5">{t.role}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
