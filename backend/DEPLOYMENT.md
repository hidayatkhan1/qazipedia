# Deploying QaziPedia

Two separate things can be deployed independently:

1. **The frontend** — the whole public site. Works today, no backend
   needed, since Parts 1-7 are static data. Do this first.
2. **The backend** — Firebase (Auth + Firestore + Storage), needed
   for the admin dashboard's uploads to actually persist and be
   visible to every visitor, not just your own browser.

You can deploy #1 today and add #2 whenever you're ready — the site
works fine without it (admin uploads just stay in local demo mode,
see README's "Part 8: Admin Dashboard" section).

---

## Part 1 — Deploy the frontend (5 minutes, no account setup beyond a host)

Pick one. All three are free at this scale, all three give you HTTPS
and a real URL automatically, and config files for all three are
already in this repo.

### Option A: Vercel (recommended if you're not sure)

1. Push this project to a GitHub repo.
2. Go to vercel.com, "Add New Project", import the repo.
3. Vercel auto-detects Vite. Leave defaults, click Deploy.
4. Done — `vercel.json` (already in this repo) handles client-side
   routing so refreshing `/bs-nursing/notes` doesn't 404.

### Option B: Netlify

1. Push to GitHub.
2. netlify.com -> "Add new site" -> "Import an existing project".
3. Build command `npm run build`, publish directory `dist` (already
   set in `netlify.toml`).
4. Deploy.

### Option C: Firebase Hosting

Do this if you're already planning to use Firebase for the backend
(Part 2 below) — one project, one dashboard, for both. See Part 2;
Hosting deploy is `npm run deploy:firebase:hosting-only` once
Firebase CLI is set up.

### Manual/local build (any static host)

```bash
npm install
npm run build
```

Upload the contents of `dist/` to any static host. Just make sure
your host rewrites all paths to `index.html` (this is what
`vercel.json`, `netlify.toml`, and `public/_redirects` all do) —
without that, every page except the homepage 404s on refresh.

---

## Part 2 — Set up the Firebase backend

This makes the admin dashboard's uploads real and shared, instead of
per-browser localStorage.

### Step 1: Create the Firebase project

1. Go to console.firebase.google.com, "Add project".
2. Name it (e.g. "qazipedia"), follow the prompts (Analytics is optional, skip it if unsure).
3. Once created, click the web icon (`</>`) to register a web app. Name it anything.
4. Firebase shows you a config object — you'll need these 6 values in the next step.

### Step 2: Fill in your environment variables

```bash
cp .env.example .env
```

Open `.env` and paste in the 6 values from Step 1
(`apiKey` -> `VITE_FIREBASE_API_KEY`, etc. - the names match).

These values are safe to have in a public frontend bundle (unlike a
traditional API secret) — see the comment at the top of `.env.example`
for why. Still not committed to git though (`.gitignore` already
excludes `.env`).

### Step 3: Enable the services you need

In the Firebase Console, for your new project:

- **Authentication** -> Get Started -> Sign-in method -> enable "Email/Password".
  Then go to the Users tab -> "Add user" -> create exactly one admin
  account (your own email + a real password). This site is designed
  for a single admin, not open registration — don't enable any sign-up
  flow in the frontend.
- **Firestore Database** -> Create database -> start in production mode
  (the rules in `firestore.rules`, already in this repo, define
  access — production mode just means "use my rules file", not
  "locked out").
- **Storage** -> Get started -> same production-mode choice.

### Step 4: Install the Firebase CLI and connect this project

```bash
npm install -g firebase-tools
firebase login
```

Open `.firebaserc` and replace `YOUR-FIREBASE-PROJECT-ID` with your
actual project ID (found in Firebase Console -> Project Settings ->
General -> "Project ID").

### Step 5: Deploy the security rules

```bash
firebase deploy --only firestore:rules,storage
```

This pushes `firestore.rules` and `storage.rules` (already written,
in this repo) — public read access so visitors can see uploaded
content, write access restricted to your one signed-in admin account.

### Step 6: Deploy hosting (if using Firebase Hosting from Part 1)

```bash
npm run deploy:firebase:hosting-only
```

### Verify it worked

Run `npm run dev` locally with `.env` filled in. Open the browser
console — if you see the "running in local demo mode" message from
`src/lib/firebaseClient.js`, something's wrong with your `.env`
(check for typos, or that you actually copied from `.env.example`
rather than editing it in place... `cp`, not rename). No message
means it's reading your real config.

---

## Wiring the real backend (the step after this guide)

Right now, filling in `.env` connects Firebase but **doesn't yet
change what the admin dashboard does** — `src/lib/adminStorage.js`
still uses `localStorage` internally. That's intentional: I didn't
want to rewrite 6 files' worth of async data-fetching logic without
being able to test it against a real project, since that project
didn't exist until you complete the steps above.

Once you've done Steps 1-5 and confirmed `isFirebaseConfigured` is
`true` (Verify section above), the next concrete step is rewriting
the *inside* of these functions in `src/lib/adminStorage.js` to call
Firestore/Storage instead of `localStorage`:

- `getUploadedItems`, `addUploadedItem`, `deleteUploadedItem` ->
  Firestore `uploads` collection (schema documented in the comment
  at the top of `firestore.rules`)
- `setResultDocument`, `getResultDocumentOverride`,
  `listResultDocuments`, `deleteResultDocument` -> Firestore
  `resultDocuments` collection (same key format already used:
  `region::institute::program::semester::session`)
- File uploads -> Firebase Storage, under `/uploads/` and `/results/`
  (matching `storage.rules`)
- `src/context/AdminAuthContext.jsx` -> real Firebase Auth
  (`signInWithEmailAndPassword`) instead of the hardcoded password

This becomes an async rewrite (Firestore reads are promises, not
synchronous like `localStorage.getItem`), which touches
`useAdminUploads.js`, `UploadResource.jsx`, `ResultsUpload.jsx`,
`ResultChecker.jsx`, and `AdminDashboard.jsx` — each needs a loading
state added. Worth doing as its own focused pass once your project is
live and testable, rather than blind.
