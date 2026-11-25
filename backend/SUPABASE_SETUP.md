# Supabase setup, testing and go-live

Goal: real shared uploads (database + file storage + admin login) **without touching your live site**.
Your live site on Vercel keeps running the old code until you deliberately merge.

Use **two** Supabase projects (the free plan allows two):

| Project | Used by | Contains |
|---|---|---|
| `qazipedia-test` | Vercel **Preview** + your laptop | dummy uploads, safe to delete |
| `qazipedia` | Vercel **Production** | real content |

Do Parts A and B with the **test** project first. Repeat Part A for production later (Part D).

---

## Part A: Create and prepare a Supabase project (about 10 minutes)

1. Go to **supabase.com**, sign in (GitHub login is fine), click **New project**.
   Name `qazipedia-test`, choose a strong **database password** (save it in a password manager), pick the nearest region, **Free** plan.
2. Open **SQL Editor -> New query**, paste the **entire** contents of `backend/supabase/schema.sql`, click **Run**.
   Expected: "Success. No rows returned". It is safe to run twice.
3. Open **Authentication** settings and **turn OFF new user sign-ups**
   (Authentication -> Sign In / Providers -> "Allow new users to sign up" -> off; the label may have moved slightly, it is in the Auth settings).
   This matters: otherwise anyone could register an account.
4. **Authentication -> Users -> Add user -> Create new user.**
   Enter your admin email and a strong password, tick **Auto Confirm User**.
5. Back in **SQL Editor**, make that user the admin (use your real email):
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'YOUR-ADMIN-EMAIL@example.com';
   ```
   Expected: "Success. 1 row" (if it says 0 rows, the email doesn't match the user you created).
6. **Project Settings -> API** (or "API Keys"). Copy:
   - **Project URL** (looks like `https://abcdxyz.supabase.co`)
   - the **anon / publishable** key
   > Never copy or use the `service_role` / `secret` key anywhere in this project. It bypasses all security.

---

## Part B: Test on your own computer

1. In `frontend/`, copy `.env.example` to `.env` and paste the two values (the **test** project):
   ```
   VITE_SUPABASE_URL=https://abcdxyz.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
   `.env` is git-ignored. Confirm with `git status` that it is **not** listed.
2. `cd frontend && npm install && npm run dev`
3. Open `http://localhost:5173/admin/login` and sign in with the admin email + password.
4. **Checklist, tick every one:**
   - [ ] Upload Resource -> BS Nursing -> Notes -> Semester 5 -> title -> choose a PDF -> Upload. It appears in the list below.
   - [ ] Open `/bs-nursing/notes`, filter Semester 5: your upload is there and **Download** opens the PDF.
   - [ ] Open the site in a **private/incognito window** (not logged in): the upload is visible there too. This proves it is shared, not stored in your browser.
   - [ ] `/admin/results`: upload a PDF for one class. On `/results`, pick the same selections: the card shows your PDF with working View/Download.
   - [ ] On `/results`, pick a class you did **not** upload: it says "Result not yet uploaded".
   - [ ] Log out, then open `/admin`: you are sent to the login page.
   - [ ] Try a wrong password: you see "Incorrect email or password."
   - [ ] In Supabase -> Storage -> `files`: the uploaded files are there. Deleting an item in the admin removes its file too.

Files: PDF, Word, PowerPoint, Excel, images and MP4, **max 50 MB each** (free-plan limit). 1 GB total free storage: link videos from YouTube rather than uploading them.

---

## Part C: Test on a Vercel preview (live site untouched)

1. In your repo, on your computer:
   ```bash
   git checkout main && git pull
   git checkout -b feature/supabase-storage
   ```
   Apply the migration files (see `MIGRATION_STEPS.md` in the zip), then:
   ```bash
   git status            # make sure .env is NOT listed
   git add -A
   git commit -m "Move storage to Supabase"
   git push -u origin feature/supabase-storage
   ```
2. Vercel automatically builds a **Preview** deployment for the branch (Deployments tab).
3. Vercel -> your project -> **Settings -> Environment Variables**. Add both variables with the **test** project's values and tick **only Preview** (untick Production and Development).
4. **Redeploy the preview** (Deployments -> the branch deployment -> ... -> Redeploy). Env vars only apply to new builds.
5. Open the preview URL and repeat the Part B checklist.
6. Also confirm your normal live URL still works exactly as before.

> Check once: Vercel -> Settings -> General -> **Root Directory** must be `frontend`.

---

## Part D: Go live

1. Create the **production** project: repeat Part A (new project `qazipedia`, run schema, sign-ups off, admin user, admin row, copy URL + key).
2. Vercel -> Environment Variables: add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with the **production** values, environment **Production** only.
   (Nothing changes on the live site yet: env vars only apply to the next build.)
3. On GitHub, open a **Pull Request** from `feature/supabase-storage` into `main`, check the preview once more, then **Merge**.
4. Vercel builds production. Open `https://YOUR-SITE/admin/login` and sign in. Do a small real upload and check it from your phone.
5. In GitHub -> Settings -> Secrets and variables -> Actions, add `SUPABASE_URL` and `SUPABASE_ANON_KEY` (production values). The included workflow `.github/workflows/supabase-keepalive.yml` then pings the database every 3 days, because free projects pause after a week of inactivity. After a week, confirm in Supabase that the project is not paused.

### Rollback (30 seconds)
Vercel -> Deployments -> pick the last good deployment -> **Promote to Production** (Instant Rollback).
Or delete the two Production env vars and redeploy: the site falls back to its built-in content and admin login shows "isn't configured".

---

## Security notes

- The old admin password `qazipedia-admin-2026` was visible in your public repo history. It no longer works anywhere in production builds, but treat it as burned: never reuse it.
- The **anon key is public by design**; protection comes from the Row Level Security in `schema.sql`. The `service_role` key must never appear in the frontend, in `.env` files in git, or in Vercel's `VITE_` variables.
- Only emails listed in `public.admins` can write. To add or remove an admin, edit that table in the SQL Editor.
- Sign-ups must stay **off**. Even if someone registered, the database would still refuse their writes, but there is no reason to allow it.
- Use a strong, unique admin password and enable 2FA on your Supabase and GitHub accounts.

## Optional cleanup
- The old Firebase project (`qazipedia-cd938`) is no longer used. You can delete it in the Firebase console.
- `frontend/.gitignore` used to be a folder that held `node_modules`; this migration replaces it with a real file. The old files remain in git history (history is not rewritten), which is harmless.
