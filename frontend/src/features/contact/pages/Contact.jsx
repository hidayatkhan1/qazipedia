import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import Card from "../../../components/ui/Card";
import Accordion from "../../../components/ui/Accordion";
import Button from "../../../components/ui/Button";
import { siteConfig } from "../../../data/siteConfig";
import { faqs } from "../data/faq";

const socialIcons = [
  { icon: FaFacebookF, href: siteConfig.social.facebook, label: "Facebook" },
  { icon: FaInstagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: FaYoutube, href: siteConfig.social.youtube, label: "YouTube" },
  { icon: FaWhatsapp, href: siteConfig.social.whatsapp, label: "WhatsApp" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const breadcrumbItems = [{ label: "Contact", to: "/contact" }];

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <SEO
        title="Contact QaziPedia"
        description="Get in touch with QaziPedia — ask a question, report an issue, or contribute notes and MCQs for your region."
        path="/contact"
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />

      <section className="bg-teal-950 text-parchment-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mt-6 mb-3">
            Contact
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
            Questions, corrections, or want to contribute?
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <Card className="lg:col-span-3">
            {submitted ? (
              <div className="py-8 text-center">
                <h2 className="font-display text-xl font-semibold text-teal-950">
                  Message sent
                </h2>
                <p className="text-sm text-ink-700 mt-2">
                  Thanks for reaching out — we'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Name">
                    <input type="text" required placeholder="Your name" className={inputClasses} />
                  </Field>
                  <Field label="Email">
                    <input type="email" required placeholder="qazipedia@gmail.com.com" className={inputClasses} />
                  </Field>
                </div>
                <Field label="Subject">
                  <input type="text" required placeholder="What's this about?" className={inputClasses} />
                </Field>
                <Field label="Message">
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your message…"
                    className={inputClasses}
                  />
                </Field>
                <Button type="submit" variant="primary">
                  Send Message
                </Button>
              </form>
            )}
          </Card>

          {/* Contact info + map */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <div className="space-y-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-ink-700 hover:text-teal-900 transition-colors"
                >
                  <FaEnvelope className="text-teal-700 shrink-0" /> {siteConfig.email}
                </a>
                <p className="flex items-center gap-3 text-sm text-ink-700">
                  <FaPhone className="text-teal-700 shrink-0" /> {siteConfig.phone}
                </p>
                <p className="flex items-center gap-3 text-sm text-ink-700">
                  <FaMapMarkerAlt className="text-teal-700 shrink-0" /> {siteConfig.address}
                </p>
              </div>

              <div className="flex gap-2 mt-5 pt-4 border-t border-teal-900/10">
                {socialIcons.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-teal-900/8 text-teal-900 flex items-center justify-center hover:bg-teal-900 hover:text-parchment-50 transition-colors"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </Card>

            <Card className="p-0 overflow-hidden">
              <iframe
                title="QaziPedia location — Peshawar, Khyber Pakhtunkhwa"
                src="https://www.openstreetmap.org/export/embed.html?bbox=71.4%2C33.9%2C71.7%2C34.1&layer=mapnik"
                className="w-full h-56 border-0"
                loading="lazy"
              />
            </Card>
          </div>
        </div>

        <h2 className="font-display text-2xl font-semibold text-teal-950 mt-14 mb-2">
          Frequently asked questions
        </h2>
        <Accordion items={faqs} />
      </section>
    </>
  );
}

const inputClasses =
  "w-full rounded-lg border border-teal-900/20 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-500";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-ink-500 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
