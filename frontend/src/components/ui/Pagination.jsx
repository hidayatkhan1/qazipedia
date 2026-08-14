export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 mt-10">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-3 py-1.5 rounded-full text-sm font-medium text-teal-900 hover:bg-teal-900/8 disabled:opacity-30 disabled:pointer-events-none transition-colors"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
            p === page
              ? "bg-teal-900 text-parchment-50"
              : "text-ink-700 hover:bg-teal-900/8"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-3 py-1.5 rounded-full text-sm font-medium text-teal-900 hover:bg-teal-900/8 disabled:opacity-30 disabled:pointer-events-none transition-colors"
      >
        Next
      </button>
    </nav>
  );
}
