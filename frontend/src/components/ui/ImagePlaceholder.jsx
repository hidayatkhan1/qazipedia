// No real photo is available for this spot yet. This renders a
// clearly-labeled placeholder using the same dashed-border convention
// as the Navbar logo and About page photos, rather than leaving a
// blank gap or inventing a stock image that doesn't represent the
// real school/program. Swap in a real <img> once a photo exists -
// see the `as="img"` usage note below.

const sizeClasses = {
  circle: {
    sm: "w-12 h-12 text-[9px]",
    md: "w-14 h-14 text-[10px]",
    lg: "w-20 h-20 text-xs",
  },
};

export default function ImagePlaceholder({
  shape = "banner",
  size = "md",
  label = "Add photo",
  className = "",
}) {
  if (shape === "circle") {
    return (
      <span
        className={`rounded-full border-2 border-dashed border-teal-700/40 flex items-center justify-center text-teal-700/60 font-medium shrink-0 ${sizeClasses.circle[size]} ${className}`}
      >
        {label}
      </span>
    );
  }

  return
}
