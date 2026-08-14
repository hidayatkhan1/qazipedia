import SEO from "../../../components/layout/SEO";
import Breadcrumbs, { breadcrumbJsonLd } from "../../../components/ui/Breadcrumbs";
import Card from "../../../components/ui/Card";
import ImagePlaceholder from "../../../components/ui/ImagePlaceholder";
import { mission, vision, founder, } from "../data/content";

export default function About() {
  const breadcrumbItems = [{ label: "About", to: "/about" }];

  return (
    <>
      <SEO
        title="About QaziPedia — Our Mission & Team"
        description="QaziPedia is a free study hub for BS Nursing, Allied Health Sciences and Medical Subjects students across Khyber Pakhtunkhwa. Learn about our mission, vision and team."
        path="/about"
        jsonLd={breadcrumbJsonLd(breadcrumbItems)}
      />

      <section className="bg-teal-950 text-parchment-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 mt-6 mb-3">
            About
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight max-w-2xl">
            Built for students who kept losing notes in group chats
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="font-display text-xl font-semibold text-teal-950">Our Mission</h2>
            <p className="text-sm text-ink-700 leading-relaxed mt-3">{mission}</p>
          </Card>
          <Card>
            <h2 className="font-display text-xl font-semibold text-teal-950">Our Vision</h2>
            <p className="text-sm text-ink-700 leading-relaxed mt-3">{vision}</p>
          </Card>
        </div>

        <h2 className="font-display text-2xl font-semibold text-teal-950 mt-14 mb-5">
          What we stand for
        </h2>
     

        <h2 className="font-display text-2xl font-semibold text-teal-950 mt-14 mb-5">
          Founder
        </h2>
        <Card className="flex items-start gap-4">
          <ImagePlaceholder shape="circle" size="md" label="PHOTO" />
          <div>
            <h3 className="font-display text-lg font-semibold text-teal-950">
              {founder.name}
            </h3>
            <p className="text-xs font-medium text-amber-600 mt-0.5">{founder.role}</p>
            <p className="text-sm text-ink-700 mt-2 leading-relaxed">{founder.bio}</p>
          </div>
        </Card>

   
      </section>
    </>
  );
}
