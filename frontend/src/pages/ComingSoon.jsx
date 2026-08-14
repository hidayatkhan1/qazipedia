import { Link, useLocation } from "react-router-dom";
import SEO from "../components/layout/SEO";

export default function ComingSoon() {
  const { pathname } = useLocation();

  return (
    <>
      <SEO title={`Coming soon — QaziPedia`} path={pathname} />
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mb-4">
          Under construction
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-teal-950">
          This page is being built
        </h1>
        <p className="mt-4 text-ink-700">
          <code className="bg-teal-900/5 px-2 py-0.5 rounded text-sm">
            {pathname}
          </code>{" "}
          will arrive in a later build. In the meantime, head back home.
        </p>
        <Link
          to="/"
          className="inline-flex mt-8 items-center gap-2 rounded-full bg-amber-500 text-teal-950 px-4 sm:px-6 py-3 text-sm font-semibold hover:bg-amber-400 transition-colors"
        >
          Back to home
        </Link>
      </section>
    </>
  );
}
