# QaziPedia

Educational platform for KPK nursing and medical students.

- `frontend/` React + Vite + Tailwind app (deployed on Vercel, Root Directory = `frontend`)
- `backend/supabase/schema.sql` database tables, file bucket and security rules (Supabase)
- `backend/SUPABASE_SETUP.md` step-by-step setup, testing and go-live guide

Run locally: `cd frontend && npm install && npm run dev`
Without Supabase keys the admin runs in a local demo mode; with them, uploads are shared with every visitor.
