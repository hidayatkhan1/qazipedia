import { useState } from "react";
import Button from "../../../components/ui/Button";

export default function NewsletterCTA() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
      <div className="rounded-2xl bg-teal-900 text-parchment-50 px-8 py-12 md:px-14 md:py-16 relative overflow-hidden">
        <div className="pulse-rule absolute top-0 left-0 right-0" />
        <div className="max-w-xl">
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
            Get new notes and job alerts in your inbox
          </h2>
          <p className="mt-3 text-parchment-200/85 text-sm md:text-base">
            One email a week. No spam — just new notes, past papers and
            healthcare job openings as they're posted.
          </p>

          {submitted ? (
            <p className="mt-6 text-amber-400 font-medium text-sm">
              You're subscribed. Welcome to QaziPedia.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <label htmlFor="cta-newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="cta-newsletter"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm placeholder:text-parchment-200/50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
