# Deployment

- **Frontend:** Vercel. Root Directory `frontend`, build command `npm run build`, output `dist`. `frontend/vercel.json` already rewrites all paths to `index.html`.
- **Backend:** Supabase. Follow `SUPABASE_SETUP.md`.
- **Environment variables (Vercel -> Settings -> Environment Variables):** `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Use your TEST project's values for **Preview** and your PRODUCTION project's values for **Production**.
