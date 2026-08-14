import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { categories } from "../../../data/categories";
import SectionHeading from "../../../components/ui/SectionHeading";
import Card from "../../../components/ui/Card";

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <SectionHeading
        eyebrow="Start here"
        title="Everything organized by what you actually need"
        description="Eight resource types, structured around your semester — not around our database."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {categories.map(({ icon, title, description, to, count }) => {
          const Icon = Icons[icon];
          return (
            <Link key={title} to={to}>
              <Card className="h-full group">
                <div className="w-12 h-12 rounded-full bg-teal-900/8 text-teal-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-teal-950 transition-colors">
                  {Icon && <Icon size={18} />}
                </div>
                <h3 className="font-display text-lg font-semibold text-teal-950 mt-4">
                  {title}
                </h3>
                <p className="text-sm text-ink-700 mt-1.5 leading-relaxed">
                  {description}
                </p>
                <p className="text-xs font-medium text-amber-600 mt-4">
                  {count}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
