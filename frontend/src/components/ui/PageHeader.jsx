import Breadcrumbs from "./Breadcrumbs";

export default function PageHeader({ eyebrow, title, description, breadcrumbItems = [] }) {
  return (
    <div className="bg-teal-950 text-parchment-50 relative overflow-hidden">
      <div className="pulse-rule absolute bottom-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-10 md:pt-10 md:pb-12">
        <Breadcrumbs items={breadcrumbItems} variant="dark" />
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mt-5 mb-2">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl md:text-4xl font-semibold leading-tight max-w-2xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-sm md:text-base text-parchment-200/85 max-w-xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
