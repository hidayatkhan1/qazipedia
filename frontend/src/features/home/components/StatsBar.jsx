import { stats } from "../../../data/stats";

export default function StatsBar() {
  return (
    <section className="bg-parchment-200/60 border-y border-teal-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ label, value }) => (
          <div key={label} className="text-center md:text-left">
            <p className="font-display text-3xl md:text-4xl font-semibold text-teal-950">
              {value}
            </p>
            <p className="text-sm text-ink-700 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
