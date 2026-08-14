import { Helmet } from "react-helmet-async";

const SITE_URL = "https://qazipedia.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Drop this at the top of every page component to control that
 * page's title, meta description, canonical URL and social cards.
 * Falls back to sensible site-wide defaults when props are omitted.
 */
export default function SEO({
  title = "QaziPedia — Notes, MCQs & Past Papers for Nursing & Allied Health",
  description = "QaziPedia is a free study hub for BS Nursing, Allied Health Sciences and Medical Subjects students in Pakistan.",
  path = "/",
  image = DEFAULT_IMAGE,
  jsonLd,
}) {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
