import { useState } from "react";

// Renders a real <img> when a src is provided (e.g. an imported file from
// src/assets/logos/*). If the image fails to load — or no src was passed
// in at all — this falls back to the same dashed-circle text badge used
// everywhere else, so a missing/broken logo file never breaks the layout.
export default function LogoBadge({ src, alt, label, tone = "light", size = "md", className = "" }) {
  const [imgFailed, setImgFailed] = useState(false);

  const sizes = {
    sm: "w-10 h-10 text-[9px]",
    md: "w-14 h-14 text-[10px]",
    lg: "w-20 h-20 text-xs",
  };
  // A custom className fully replaces the width/height defaults (rather
  // than competing with them) while still keeping the size's font-size.
  const sizeClass = className ? className : sizes[size];
  const textSizeClass = sizes[size].match(/text-\S+/)?.[0] || "";

  const tones = {
    light: "border-white/30 text-white/70 bg-white/5",
    dark: "border-teal-700/40 text-teal-700/60 bg-teal-900/5",
  };

  if (src && !imgFailed) {
    return (
      <img
        src={src}
        alt={alt || `${label} logo`}
        title={alt || label}
        className={`rounded-full object-cover shrink-0 ${sizeClass}`}
        onError={() => setImgFailed(true)}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border-2 border-dashed font-semibold shrink-0 ${sizeClass} ${textSizeClass} ${tones[tone]}`}
      title={`${label} logo placeholder — swap for the real logo file`}
    >
      {label}
    </span>
  );
}
