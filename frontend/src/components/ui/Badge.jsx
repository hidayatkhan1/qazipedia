const tones = {
  teal: "bg-teal-900/8 text-teal-800",
  amber: "bg-amber-500/15 text-amber-700",
  neutral: "bg-ink-900/5 text-ink-700",
};

export default function Badge({ children, tone = "teal", className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
