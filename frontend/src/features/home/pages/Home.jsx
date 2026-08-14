import SEO from "../../../components/layout/SEO";
import Hero from "../components/Hero";
import CategoryGrid from "../components/CategoryGrid";
import StatsBar from "../components/StatsBar";
import SubjectExplorer from "../components/SubjectExplorer";
import NewsAndJobs from "../components/NewsAndJobs";
import Testimonials from "../components/Testimonials";
import NewsletterCTA from "../components/NewsletterCTA";

export default function Home() {
  return (
    <>
      <SEO
        title="QaziPedia — Notes, MCQs & Past Papers for Nursing & Allied Health"
        description="Free notes, MCQs, past papers, results and clinical skills resources for BS Nursing, Allied Health Sciences and Medical Subjects students in Pakistan."
        path="/"
      />
      <Hero />
      <StatsBar />
      <CategoryGrid />
      <SubjectExplorer />
      <NewsAndJobs />
      <Testimonials />
      <NewsletterCTA />
    </>
  );
}
