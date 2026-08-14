import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { subjectGroups } from "../../../data/subjects";
import SectionHeading from "../../../components/ui/SectionHeading";
import Card from "../../../components/ui/Card";

export default function SubjectExplorer() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <SectionHeading
        eyebrow="Browse by program"
        title="Find your subject, not just your major"
        description="Three programs, each broken down into the subjects students search for most."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {subjectGroups.map(({ group, to, subjects }) => (
          <Card key={group} className="flex flex-col">
            <h3 className="font-display text-xl font-semibold text-teal-950">
              {group}
            </h3>
            <ul className="mt-4 space-y-2.5 flex-1">
              {subjects.map((s) => (
                <li key={s.name}>
                  <Link
                    to={s.to}
                    className="text-sm text-ink-700 hover:text-teal-900 transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to={to}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              View all {group} <FaArrowRight size={12} />
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
