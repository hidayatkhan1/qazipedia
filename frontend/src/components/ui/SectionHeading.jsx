export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment} mb-8 sm:mb-10`}>
      {eyebrow && (
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mb-2.5 sm:mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-teal-950 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-ink-700 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
