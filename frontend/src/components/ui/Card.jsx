// NOTE: this component sets a default border-color (border-teal-900/10).
// If you pass a className that overrides the border color (e.g.
// "border-amber-500/20"), it may silently lose the CSS cascade to
// this default - Tailwind v4 generates utilities in source-encounter
// order, not alphabetical or usage order, so which one "wins" isn't
// predictable by reading the className string alone. Use the
// important modifier to guarantee the override applies:
// className="border-amber-500/20!" (verified this actually works in
// this Tailwind version - plain overrides do NOT reliably work).
export default function Card({ children, className = "", as: Tag = "div" }) {
  return (
    <Tag
      className={`rounded-[var(--radius-card)] border border-teal-900/10 bg-white/70 backdrop-blur-sm p-6 transition-shadow duration-200 hover:shadow-lg hover:shadow-teal-950/5 ${className}`}
    >
      {children}
    </Tag>
  );
}
