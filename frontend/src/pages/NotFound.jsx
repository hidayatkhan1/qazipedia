import { Link } from "react-router-dom";
import SEO from "../components/layout/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found — QaziPedia" path="/404" />
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
        <p className="font-display text-6xl font-semibold text-teal-950">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-teal-950">
          We couldn't find that page
        </h1>
        <p className="mt-3 text-ink-700">
          It may have moved, or the link might be outdated.
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
