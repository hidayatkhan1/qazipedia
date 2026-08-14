# QaziPedia — Parts 1-8: complete frontend + placeholder admin dashboard

Educational platform for BS Nursing, Allied Health Sciences, and Medical
Subjects students in Pakistan. Every nav-linked page is real (Parts
1-7), plus a working local-demo admin dashboard (Part 8).

**Deploying this?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for the
frontend hosting options (Vercel/Netlify/Firebase Hosting) and the
full Firebase backend setup.

## Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL. To build for production:

```bash
npm run build
npm run preview   # serve the production build locally
```

## What's real vs. stubbed

**Fully built:**
- Home page (`/`) — Hero, stats bar, category grid, subject explorer,
  latest news, latest jobs, testimonials, newsletter CTA
- Navbar and Footer — shared across the whole site
- **BS Nursing section** (`/bs-nursing`) — program overview, Introduction
  (eligibility + career paths), all 8 semester pages, and all 7 resource
  library pages (Notes, Books, Past Papers, MCQs, Assignments, Practical
  Files, Clinical Procedures) with search, semester filtering, and
  pagination
- **Allied Health Sciences section** (`/allied-health`) — overview with
  all 11 department cards, all 11 individual department pages, and all
  4 resource library pages (Notes, Books, Past Papers, MCQs) with search,
  department filtering, and pagination
- **Medical Subjects section** (`/medical-subjects`) — overview with all
  14 subject cards, all 14 individual subject pages, and all 5 resource
  library pages (Notes, MCQs, Past Papers, Books, Videos) with search,
  subject filtering, and pagination
- **KMU Results** (`/results`) — Nursing / Allied Health tab selector,
  then a cascading Region → Institute → Program → Semester → Session
  wizard covering all 7 KMU regions (Malakand, Peshawar, Mardan, Hazara,
  Kohat, Bannu, Dera Ismail Khan). Ends in a lookup for that class's
  **single result gazette PDF** — one document listing every student in
  that class, not a per-student marks table (see "How results work"
  below for why)
- **KMU Regions** (`/kmu-regions`) — the same 7 regions, browsed as a
  content library instead of a results lookup: overview with region
  cards + resource type cards, all 7 individual region pages (with the
  KMU/IHS partner logo placeholders — see below), and all 3 resource
  library pages (Slides, Notes, MCQs) with search, region filtering,
  and pagination
- **Clinical Skills** (`/clinical-skills`) — tag grid of all 12
  procedures (Vital Signs, Injection, Cannulation, Catheterization, CPR,
  ECG, Bandaging, Wound Dressing, IV Therapy, Patient Care, Drug
  Calculations, Procedure Videos), each with an icon and one-line
  description. Built intentionally light — an overview page, not a
  deep resource library per procedure (see note below)
- **Downloads** (`/downloads`) — tag grid of all 6 categories (PDF,
  Notes, Books, Syllabus, Forms, Guidelines), same lightweight pattern
- **News & Jobs** (`/news-jobs`) — Jobs and News merged into one page
  with a tab switcher, themed specifically around KMU and its
  affiliated KPK institutes (Khyber Girls Medical College, Rehman
  Medical Institute, Ayub Medical College, Gomal Medical College, KMU
  IHS campuses, etc. — the same real institute names already used in
  `results/regions.js`, kept consistent across the site). `/news` and
  `/jobs` redirect here for anyone with old links

**Permanently removed (by request):** the top-level Notes / MCQs / Past
Papers / Books nav items and their "browse by" sub-pages are gone from
`navigation.js` entirely — not stubbed, not routed, just gone. (The
site-wide aggregator versions of these were built once in Part 5 and
removed; don't confuse them with the program-specific ones like
`/bs-nursing/notes`, which are untouched and still real.)

- **About** (`/about`) — mission, vision, values, and founder/team
  sections using editable placeholder templates (not invented names —
  see "Placeholder discipline" below)
- **Contact** (`/contact`) — working contact form (client-side only, no
  backend yet), email/phone/address, OpenStreetMap embed, social links,
  FAQ accordion

**Every nav-linked page (all 11 items) is now real.** The only things
still stubbed are pages *not* linked from the main nav: individual
procedure/category pages under Clinical Skills and Downloads (e.g.
`/clinical-skills/cpr`, `/downloads/pdf`), and the legal pages
(`/about/privacy-policy`, `/about/terms`, `/about/disclaimer`) — all
still route to `ComingSoon`.

## Placeholder discipline

The founder bio and team section on `/about` use editable placeholder
templates (`data/about/content.js`) — "Add Founder Name", "Add a short
bio here" — instead of invented names or biography. This represents an
actual person (you, the site owner), not dummy testimonial content, so
it's deliberately left blank for you to fill in rather than guessed at.

## Folder structure

```
src/
  data/
    siteConfig.js, navigation.js, categories.js, subjects.js,
    stats.js, testimonials.js, newsItems.js, jobsPreview.js,
    footerLinks.js          Homepage data (Part 1)

    bsNursing/
      program.js             Overview: duration, eligibility, career paths
      semesters.js            8 semesters, each with subjects + slugs
      resourceTypes.js        The 7 resource categories (notes, MCQs, etc.)
      resourceItems.js        Deterministic dummy-data generator — builds
                               one item per subject × resource type ×
                               semester from semesters.js + resourceTypes.js

    alliedHealth/
      departments.js           11 departments, each with description +
                                representative subjects + slugs
      resourceTypes.js         4 shared categories (notes, books,
                                past-papers, mcqs) — Results and Downloads
                                link out to the site-wide sections instead
      resourceItems.js         Same deterministic-generator pattern as
                                BS Nursing, keyed by department instead
                                of semester

    medicalSubjects/
      subjects.js               14 subjects, each with description +
                                 core topics + slugs
      resourceTypes.js          5 categories (notes, mcqs, past-papers,
                                 books, videos) — Videos is new for this
                                 section; Downloads still links out
      resourceItems.js          Same generator pattern, keyed by subject;
                                 Videos get duration strings instead of
                                 file sizes

    results/
      regions.js                 7 KMU regions (Malakand, Peshawar,
                                  Mardan, Hazara, Kohat, Bannu, Dera
                                  Ismail Khan), each with institutes.
                                  Every institute offers "BS Nursing"
                                  plus a deterministic 2-4 Allied Health
                                  departments, split by track so the
                                  Nursing/Allied Health tabs always have
                                  something to show
      resultDocuments.js          Deterministic "does a result PDF exist
                                   for this class/session" lookup —
                                   simulates the admin-uploaded document
                                   database Part 8 will build. ~70% of
                                   combinations return a document, ~30%
                                   return null (the "not yet uploaded"
                                   state), so both experiences are
                                   reachable while browsing

    kmuRegions/
      regions.js                  Same 7 regions as results/regions.js
                                   (kept as a separate list since this
                                   one needs a geographic description
                                   per region, not an institute list)
      resourceTypes.js             3 categories: Slides, Notes, MCQs
      resourceItems.js             Same generator pattern, keyed by
                                    region instead of semester/department/
                                    subject

    clinicalSkills/
      procedures.js                12 procedure tags (slug, name, icon,
                                    one-line blurb) — no generated
                                    resource items, this section is
                                    intentionally just the tag grid

    downloads/
      categories.js                6 category tags, same lightweight
                                    shape as procedures.js

    newsJobs/
      items.js                     newsItems + jobItems arrays, themed
                                    around KMU and its affiliated KPK
                                    institutes (reuses real institute
                                    names from results/regions.js)

  components/
    ui/                      Generic building blocks used everywhere
      Button, Card, SectionHeading, ScrollToTop, Badge, Breadcrumbs
      (+ BreadcrumbList JSON-LD helper), EmptyState, PageHeader,
      Pagination, ResourceCard (generic — takes a badgeLabel instead
      of assuming "semester", used by Allied Health and future sections),
      PartnerLogos (KMU/IHS affiliation badges — see "About the KMU/IHS
      logos" below)

    layout/                  Navbar, Footer, Layout, SEO (Helmet wrapper)

    sections/                Homepage-only sections (Hero, CategoryGrid,
                              StatsBar, SubjectExplorer, NewsAndJobs,
                              Testimonials, NewsletterCTA)

    bsNursing/               BS Nursing-specific components
      SubNav.jsx               Sticky tab bar: Overview, Introduction,
                                and all 7 resource types

    alliedHealth/             Allied Health-specific components
      SubNav.jsx                Sticky tab bar: Overview + 4 resource
                                 types (departments are browsed via cards,
                                 not tabs — 11 would be too many)

    medicalSubjects/          Medical Subjects-specific components
      SubNav.jsx                Sticky tab bar: Overview + 5 resource
                                 types (subjects browsed via cards)

    results/                  Results-specific components
      ResultChecker.jsx         The whole cascading wizard: Nursing/
                                 Allied Health tabs, then Region ->
                                 Institute -> Program -> Semester ->
                                 Session -> class result document lookup

    kmuRegions/                KMU Regions-specific components
      SubNav.jsx                 Sticky tab bar: Overview + 3 resource
                                  types (Slides, Notes, MCQs)

  pages/
    Home.jsx, ComingSoon.jsx, NotFound.jsx

    bs-nursing/
      BsNursingHome.jsx        /bs-nursing — semester grid + resource grid
      Introduction.jsx         /bs-nursing/introduction
      Semester.jsx              /bs-nursing/semester-1 .. semester-8
      ResourceList.jsx          /bs-nursing/{notes|books|past-papers|
                                 mcqs|assignments|practical-files|
                                 clinical-procedures}

    results/
      Results.jsx                /results — page shell (SEO, hero,
                                  covered-regions grid) around
                                  ResultChecker

    kmu-regions/
      KmuRegionsHome.jsx          /kmu-regions — region grid + resource
                                   type grid, KMU/IHS logos in the hero
      Region.jsx                   /kmu-regions/{malakand|peshawar|...}
                                    — one component handles all 7
      ResourceList.jsx             /kmu-regions/{slides|notes|mcqs} —
                                    one component handles all 3,
                                    filtered by region

    clinical-skills/
      ClinicalSkills.jsx           /clinical-skills — tag grid, links
                                    out to ComingSoon per-procedure pages

    downloads/
      Downloads.jsx                /downloads — tag grid, links out to
                                    ComingSoon per-category pages

    news-jobs/
      NewsJobs.jsx                  /news-jobs — tab switcher (News /
                                     Jobs) over the two arrays in
                                     newsJobs/items.js

    allied-health/
      AlliedHealthHome.jsx      /allied-health — department grid +
                                 resource type grid
      Department.jsx             /allied-health/{mlt|radiology|...}
                                  — one component handles all 11
      ResourceList.jsx           /allied-health/{notes|books|
                                  past-papers|mcqs} — one component
                                  handles all 4, filtered by department

    medical-subjects/
      MedicalSubjectsHome.jsx    /medical-subjects — subject grid +
                                  resource type grid
      Subject.jsx                 /medical-subjects/{anatomy|physiology|...}
                                   — one component handles all 14
      ResourceList.jsx            /medical-subjects/{notes|mcqs|
                                   past-papers|books|videos} — one
                                   component handles all 5, filtered
                                   by subject

  App.jsx                    Route definitions
  main.jsx                    Entry point: BrowserRouter + HelmetProvider
  index.css                   Tailwind v4 theme tokens
```

## Design system

- **Colors:** deep teal (authority/clinical calm) + warm parchment
  (paper/academic warmth) + amber (accent/CTAs) - all defined as CSS
  variables in `src/index.css` under `@theme`, not hardcoded hex values
  in components. Change a token once, it updates everywhere.
- **Type:** Fraunces (display/headings) + Inter (body), loaded via
  Google Fonts in `index.html`.
- **Signature motif:** a thin animated "pulse-line" (ECG-style rule),
  used in the Hero background and as a section divider.
- **Accessibility:** visible focus rings, `prefers-reduced-motion`
  respected globally, semantic landmarks.

## The reusable resource-library pattern (now proven three times)

`ResourceList.jsx` + a `resourceTypes.js` + a `getResourcesByType()`
generator is the pattern BS Nursing, Allied Health, and Medical Subjects
all use. It's program-agnostic: BS Nursing filters by semester, Allied
Health by department, Medical Subjects by subject — same search box,
same pagination, same card layout via the shared
`components/ui/ResourceCard.jsx`. Each section's `ResourceList.jsx` is
still hand-written rather than fully generic, since field names differ
slightly per section (`semester` vs `department` vs `subject`/`topic`) —
worth revisiting as a single shared component if a Part 5+ section
needs the exact same shape again.

## A note on routing

All routes in this project are explicit static paths (e.g.
`/allied-health/mlt`, `/bs-nursing/semester-3`) rather than dynamic
segments like `/allied-health/:department`. This was a deliberate
choice after finding that prefixed dynamic segments (`semester-:number`)
don't reliably match in the installed React Router version — verified
directly against `matchPath`. Pages read the active slug from
`useLocation().pathname` instead of `useParams()`. If you add dynamic
routing later, test matching with `matchRoutes`/`matchPath` first.

## About the KMU/IHS logos

I don't have Khyber Medical University's or IHS's actual logo image
files, and I won't reproduce an institution's official trademarked logo
from memory — that's not something I can do reliably or accurately.
Instead, `components/ui/PartnerLogos.jsx` renders labeled placeholder
badges ("KMU" / "IHS" in a dashed circle), the same convention already
used for QaziPedia's own logo in the Navbar. It's positioned in the
KMU Regions hero (dark background) and on every individual region page
(light background) via a `variant` prop.

**To use your real logos:** replace the two `<span>` placeholder badges
in `PartnerLogos.jsx` with `<img src="/kmu-logo.png" alt="Khyber Medical
University" className="h-9 w-auto" />` (and the same for IHS), after
placing the actual logo files in `public/`.

## KMU Regions vs KMU Results — same regions, different purpose

Both sections cover the same 7 regions, but they're not the same page:
- **KMU Results** (`/results`) — a lookup tool. Pick your class, find
  out if the result gazette is uploaded yet.
- **KMU Regions** (`/kmu-regions`) — a content library. Browse slides,
  notes and MCQs contributed by each region's community, independent of
  results season.

They share the region list conceptually but not the same data file —
`results/regions.js` includes each region's institutes (needed for the
Institute dropdown), while `kmuRegions/regions.js` includes a
geographic description instead (needed for the region overview cards).
If you'd rather they share one source of truth, that's a reasonable
future refactor — flag it and I'll consolidate them.

There are two different ways a "check your result" feature can work:

- **Per-student:** admin uploads one PDF *per student*. Clean experience
  for students, but massive manual work for admin (upload one file for
  every single student, every semester).
- **Per-class (what this is built for):** admin uploads **one PDF per
  class/session** — the whole gazette, every student's result in one
  file — which is how KMU and most Pakistani universities actually
  publish results. A student finds their own name/roll number inside
  that PDF (same as opening a university's official results page today).

We went with per-class because per-student upload isn't realistic for
one admin to maintain. That's why the wizard stops at **Session**, not
a roll number — there's no per-student lookup, because there's no
per-student file. Once a session is selected, `resultDocuments.js`
answers one question: "has this class's result PDF been uploaded yet?"
— shown either as a result card (file name, upload date, page count,
"View/Download") or a clear "not yet uploaded" state.

**What Part 8 needs to change to make this real:** an admin form to
upload one PDF per Region + Institute + Program + Semester + Session,
storage for that file, and a database lookup that `resultDocuments.js`
gets replaced by. The View/Download buttons are currently decorative
(`onClick={(e) => e.preventDefault()}`, same convention used by every
other download button on the site) since there's no real file to serve
yet.

## Mobile responsiveness pass

Every section container now uses `px-4 sm:px-6` instead of a flat
`px-6`, and heading sizes step down an extra notch on the smallest
screens (e.g. Hero's `text-3xl sm:text-5xl md:text-6xl` instead of
jumping straight to `text-4xl`). The header is `h-16` on mobile /
`h-18` from `sm:` up — the three sticky sub-nav bars
(`bsNursing/SubNav.jsx`, `alliedHealth/SubNav.jsx`,
`medicalSubjects/SubNav.jsx`) were updated to match (`top-16
sm:top-[72px]`) so they still sit flush under the header at every
breakpoint instead of leaving a gap on mobile.

## Notes for editing

- Every list on the Home page, BS Nursing, Allied Health, Medical
  Subjects, and Results lives in `src/data/*.js` or
  `src/data/{bsNursing,alliedHealth,medicalSubjects,results}/*.js`.
  Edit the data file - components re-render automatically.
- `App.jsx` auto-generates a placeholder route for every link in
  `navigation.js` that doesn't already have a real page, so adding a
  new nav link automatically gets a working (if empty) page.

## Cleanup: fixing links after the Jobs/News merge

Merging Jobs and News into one page (and removing the old top-level
Notes/MCQs/Past Papers/Books pages) left several places pointing at
URLs that no longer existed. Found and fixed with a full-codebase grep,
not just the obvious spots:

- `data/categories.js` (homepage's 8-tile grid) — was linking to
  `/notes`, `/mcqs`, `/past-papers`, `/books`, `/jobs`. Rewritten so
  every tile points at something real: Notes/MCQs/Slides now go to
  their `/kmu-regions/...` pages, Jobs became "News & Jobs" pointing at
  `/news-jobs`, and a "KMU Regions" tile was added.
- `data/jobsPreview.js` and `data/newsItems.js` (homepage preview
  cards) — item links pointed at sub-category URLs like
  `/jobs/government` and `/news/admissions` that were never built.
  Now all point at `/news-jobs`.
- `components/sections/NewsAndJobs.jsx` — the "All news" / "All jobs"
  header links pointed at `/news` and `/jobs` directly. Still would
  have worked via the redirects below, but updated to the canonical
  URL rather than relying on a redirect hop.
- `data/footerLinks.js` — the footer's "Resources" column still linked
  to `/notes`, `/mcqs`, `/past-papers`, `/books`. Replaced with
  `/kmu-regions/slides|notes|mcqs` and `/downloads`.
- `App.jsx` — added `<Navigate>` redirects from `/news` and `/jobs` to
  `/news-jobs`, in case anything external (or a person's browser
  history) still points at the old URLs.

Verified with a grep across the whole `src/` tree for any remaining
`/jobs`, `/news/`, `/notes`, `/mcqs`, `/past-papers`, `/books`
references after these fixes — none found.

## Part 8: Admin Dashboard (placeholder backend)

**Try it:** `/admin/login`, password `qazipedia-admin-2026`.

This is a real, working admin UI — you can log in, upload content, and
watch it appear live on the public pages. What it is *not* is a real
backend. Read this section before showing it to anyone as "the finished
product."

### The core honest limitation

Uploads are stored in **your browser's `localStorage`**, not a server.
That means:
- Upload something on your laptop → it shows up when you browse the
  site in that same browser. It will **not** show up for a student on
  their phone, or even for you in a different browser.
- Clear your browser data and every upload is gone.
- This is genuinely useful for testing the admin UX and content flow
  right now, and it's built so swapping in a real backend later is
  mechanical (see below) — but it is not shippable as-is.

### What's real and tested

- **Login** (`/admin/login`) — placeholder password gate. The password
  is a plain string in the JS bundle, visible to anyone who opens
  devtools. Fine for local testing, must be replaced with real auth
  (Firebase Auth, or a real login API) before going live.
- **Dashboard** (`/admin`) — upload counts, quick links into each section.
- **Upload Resource** (`/admin/upload`) — one generic form that works
  for all 4 resource-library sections (BS Nursing, Allied Health,
  Medical Subjects, KMU Regions) via `data/admin/sectionsRegistry.js`.
  Pick a section, it dynamically shows that section's resource types
  and filter dimension (Semester / Department / Subject / Region).
- **KMU Results Upload** (`/admin/results`) — mirrors the public
  Region → Institute → Program → Semester → Session wizard, ends in a
  file picker instead of a lookup. Matches the Option B design from
  earlier: one PDF per class, not per student.
- **Uploads appear live** — `useMergedResources` (in `src/hooks/`)
  merges admin-uploaded items with each section's static generated
  data, so an upload on `/admin/upload` actually shows up on e.g.
  `/bs-nursing/notes` immediately, no refresh needed.

### Bugs found and fixed while building this (so you know the testing was real)

1. **`useSyncExternalStore` infinite-render risk** — `getUploadsVersion()`
   originally used `Date.now()` as the snapshot value, which changes
   every millisecond and would have caused runaway re-renders. Fixed
   with a proper integer version counter that only changes on writes.
2. **`getTotalUploadCount()` returned `NaN`** — `listActiveSections()`
   was sweeping up the special `results-documents-map` storage key
   (an object, not an array) alongside the real per-section arrays.
   `.length` on that object is `undefined`, poisoning the sum. Fixed
   by excluding that key explicitly. Caught by writing an actual test
   script with a jsdom `localStorage` polyfill and running the real
   functions — not by inspection.
3. **Results field-name mismatch** — the admin's `setResultDocument`
   wrote `uploadedAt`, but `ResultChecker.jsx` reads
   `document.uploadedDate` to render the date. Would have shown
   "Invalid Date" on every admin-uploaded result. Fixed.
4. **BS Nursing semester filter always failed** — `sectionsRegistry.js`
   assumed `bsNursing/semesters.js` exported plain numbers
   (`[1, 2, ... 8]`), but it actually exports objects
   (`{number, title, focus, subjects}`). `String(semesterObject)`
   produced `"[object Object]"`, so every BS Nursing upload's semester
   field silently became `NaN` (`null` once serialized) and would
   never have matched the Semester filter dropdown. Fixed to read
   `.number` and `.title` off the actual object shape.

All four fixes were verified with real function calls against a jsdom
`localStorage` polyfill (add → adapt → merge → filter, end to end),
not just by re-reading the code — including confirming an uploaded
item survives the exact filter logic `ResourceList.jsx` runs and
correctly appears in its semester's results.

### Moving to a real backend

Everywhere this matters, the placeholder functions live in one file:
`src/lib/adminStorage.js`. Swapping to Firebase or Node/Mongo means
rewriting the *inside* of `getUploadedItems`, `addUploadedItem`,
`deleteUploadedItem`, `setResultDocument`, `getResultDocumentOverride`,
etc. to call your real API/Firestore instead of `localStorage` — every
page that calls these functions (`UploadResource.jsx`, `ResultsUpload.jsx`,
`useMergedResources.js`, `ResultChecker.jsx`) doesn't need to change,
since the function signatures stay the same. Also needed at that point:
real auth in `AdminAuthContext.jsx`, and real file storage (the file
picker currently only captures the file's *name*, not its bytes — no
file is actually stored anywhere yet).

## BS Nursing: Region → Institute → Session → Semester finder

`/bs-nursing` now has a second way to navigate, added on top of the
existing semester grid: `components/bsNursing/RegionInstituteFinder.jsx`,
a cascading Region → Institute → Session (batch year, e.g. "2021 –
2025") → Semester picker with a search box on the Region step.

**Important design decision:** this is a *navigation aid*, not a
content filter. BS Nursing's curriculum is standardized by KMU across
every affiliated institute, so no matter which region/institute/batch
you pick, the destination is the same real Semester page
(`/bs-nursing/semester-N`) — the finder just helps you get there with
confidence you're looking at the right thing, and the UI says this
explicitly rather than implying content secretly varies by region.

- `data/bsNursing/regionFinder.js` — derives which regions/institutes
  offer BS Nursing from the *real* `results/regions.js` data (not a
  separate hardcoded list), so it can't drift out of sync
- `data/bsNursing/sessions.js` — 6 batch years, each spanning the
  program's real 4-year duration
- Verified: the derivation produces all 7 regions with correct,
  non-empty institute lists (tested with a bundled standalone run, not
  just read through)

The admin dashboard has a "What's new" note about this (`/admin`) —
deliberately *not* a new upload dimension, since that would contradict
the "standardized curriculum" framing above.

## Reusable image placeholder

`components/ui/ImagePlaceholder.jsx` generalizes the dashed-border
"PHOTO" pattern. Two shapes: `circle` (people/logos, 3 sizes) and
`banner` (wide, for hero images — used on `/bs-nursing`).

## About page: real placeholder avatars, not text-in-a-circle

`/about`'s founder and Technical Support photos moved from the
text-based `ImagePlaceholder` component to actual `<img>` tags backed
by real SVG files: `src/assets/people/founder-placeholder.svg` and
`tech-supporter-placeholder.svg` — generic avatar silhouettes drawn in
the site's own color palette, not real photos (I don't have those and
won't invent them). Vite inlines both as base64 data URIs in the
production bundle (verified in `dist/`), so there's no extra network
request.

**To go live:** replace either SVG file with a real photo (same
filename works with zero code changes; a different filename just
needs the `import` line at the top of `About.jsx` updated to match).



## A Tailwind v4 gotcha found and fixed

While adding a colored-border `Card` on the admin dashboard, a
className like `"border-amber-500/20"` silently failed to override
`Card`'s default `border-teal-900/10` — not because of a typo, but
because **Tailwind v4 generates utility CSS in source-encounter order,
not alphabetical or usage order**, so which of two conflicting
border-color classes "wins" isn't predictable from reading the
className string. Verified this by inspecting the actual compiled
CSS output order, not by guessing.

This meant **two pre-existing cards in `ResultChecker.jsx` had the
same bug** — one was silently working by encounter-order luck, the
other silently wasn't (the amber "result not yet uploaded" card was
rendering with the wrong border color this whole time). Both fixed
using Tailwind v4's trailing `!` important modifier
(`"border-amber-500/20!"`), which was verified to actually produce
`!important` in the compiled output. `Card.jsx` now has a comment
documenting this so it doesn't happen again.

## Next up

Every nav-linked page is real, and there's now a working (if
local-only) admin dashboard. The real next step is picking and wiring
an actual backend — Firebase vs. Node/Express + MongoDB — so uploads
persist for real and are visible to every visitor, not just the
browser that made them.

## Admin dashboard & file uploads — now built

See the "Part 8: Admin Dashboard" section above for what's actually
built, tested, and its real limitations. Short version: a working
admin UI exists now (`/admin/login`), but it's backed by browser
`localStorage`, not a real shared backend — uploads are per-browser,
not visible site-wide. **Decided:** Results uploads are
**per-class/session** (one PDF = one class's full gazette), not
per-student — see "How results work" above.

