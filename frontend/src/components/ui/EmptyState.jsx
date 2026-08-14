import { FaInbox } from "react-icons/fa";

export default function EmptyState({
  title = "Nothing here yet",
  description = "Try a different filter, or check back soon — new resources are added every week.",
}) {
  return (
    <div className="text-center py-16 px-6">
      <div className="w-14 h-14 rounded-full bg-teal-900/8 text-teal-700 flex items-center justify-center mx-auto">
        <FaInbox size={20} />
      </div>
      <h3 className="font-display text-lg font-semibold text-teal-950 mt-4">
        {title}
      </h3>
      <p className="text-sm text-ink-700 mt-1.5 max-w-sm mx-auto">
        {description}
      </p>
    </div>
  );
}
