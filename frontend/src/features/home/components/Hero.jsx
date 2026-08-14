import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import Button from "../../../components/ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-teal-950 text-parchment-50">
      {/* Ambient pulse-line motif, echoing an ECG monitor readout */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
          <motion.polyline
            points="0,200 150,200 190,120 230,280 270,60 310,200 500,200 540,160 570,240 600,200 1200,200"
            fill="none"
            stroke="#e3a94a"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-14 sm:pt-16 sm:pb-20 md:pt-24 md:pb-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-amber-400 mb-4 sm:mb-5">
            Nursing · Allied Health · Medical Subjects
          </p>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.15] sm:leading-[1.08]">
            Every note, every past paper, one steady pulse.
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-parchment-200/85 leading-relaxed max-w-xl">
            QaziPedia gathers verified notes, MCQs, past papers and clinical
            skills guides for BS Nursing and Allied Health Sciences students
            across Pakistan — organized the way your syllabus actually works.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 max-w-lg"
          >
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-parchment-200/50 text-sm" />
              <input
                type="search"
                placeholder="Search “pharmacology MCQs”, “KMU past papers”…"
                className="w-full rounded-full bg-white/10 border border-white/15 pl-11 pr-4 py-2.5 sm:py-3 text-sm text-parchment-50 placeholder:text-parchment-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <Button type="submit" variant="primary">
              Search
            </Button>
          </form>

          <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 text-xs text-parchment-200/70">
            <span>Popular:</span>
            {["Anatomy notes", "KMU results", "CPR guide", "Nursing past papers"].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/50 transition-colors cursor-pointer"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
