-- ===========================================================================
-- QaziPedia: Supabase schema, file bucket and security rules.
-- Run this ONCE in Supabase Dashboard -> SQL Editor -> New query -> Run.
-- It is safe to re-run (idempotent).
--
-- Security model:
--   * Everyone (the public site) can READ content and files.
--   * Only users listed in public.admins can WRITE.
--   * Being "logged in" is NOT enough: that is why sign-ups must also be
--     disabled (see SUPABASE_SETUP.md), and why writes check is_admin().
-- ===========================================================================

-- 1) Who is an admin -------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
-- No policies on purpose: the browser can never read or edit this table.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- 2) Uploaded resources (notes, MCQs, slides, downloads, ...) --------------
create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  section_key  text not null,              -- e.g. 'bs-nursing:notes'
  title        text not null,
  note         text not null default '',
  filter_value text not null default '',   -- semester / department / subject / region
  filter_label text not null default '',
  file_name    text,
  file_path    text,                       -- object path inside the bucket
  file_url     text,                       -- public download URL
  uploaded_at  timestamptz not null default now()
);
create index if not exists uploads_section_key_idx on public.uploads (section_key, uploaded_at desc);
alter table public.uploads enable row level security;

drop policy if exists "uploads: public read" on public.uploads;
create policy "uploads: public read" on public.uploads
  for select to anon, authenticated using (true);

drop policy if exists "uploads: admin insert" on public.uploads;
create policy "uploads: admin insert" on public.uploads
  for insert to authenticated with check (public.is_admin());

drop policy if exists "uploads: admin update" on public.uploads;
create policy "uploads: admin update" on public.uploads
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "uploads: admin delete" on public.uploads;
create policy "uploads: admin delete" on public.uploads
  for delete to authenticated using (public.is_admin());

-- 3) KMU result PDFs: one per class/session --------------------------------
create table if not exists public.result_documents (
  doc_key        text primary key,         -- region::institute::program::semester::session
  region         text not null,
  institute      text not null,
  program        text not null,
  semester       int  not null,
  session        text not null,
  region_name    text,
  institute_name text,
  file_name      text,
  file_path      text,
  file_url       text,
  file_size_kb   int,
  page_count     int,
  student_count  int,
  uploaded_date  timestamptz not null default now()
);
alter table public.result_documents enable row level security;

drop policy if exists "results: public read" on public.result_documents;
create policy "results: public read" on public.result_documents
  for select to anon, authenticated using (true);

drop policy if exists "results: admin insert" on public.result_documents;
create policy "results: admin insert" on public.result_documents
  for insert to authenticated with check (public.is_admin());

drop policy if exists "results: admin update" on public.result_documents;
create policy "results: admin update" on public.result_documents
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "results: admin delete" on public.result_documents;
create policy "results: admin delete" on public.result_documents
  for delete to authenticated using (public.is_admin());

-- 4) File bucket (public read, admin write, 50 MB cap = free-plan maximum) --
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'files', 'files', true, 52428800,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/png', 'image/jpeg', 'image/webp',
    'video/mp4'
  ]
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Admin-only SELECT: the storage API needs it when replacing/deleting files.
-- Visitors still download through the public URL; they just can't LIST the bucket.
drop policy if exists "files: admin select" on storage.objects;
create policy "files: admin select" on storage.objects
  for select to authenticated using (bucket_id = 'files' and public.is_admin());

drop policy if exists "files: admin insert" on storage.objects;
create policy "files: admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'files' and public.is_admin());

drop policy if exists "files: admin update" on storage.objects;
create policy "files: admin update" on storage.objects
  for update to authenticated
  using (bucket_id = 'files' and public.is_admin())
  with check (bucket_id = 'files' and public.is_admin());

drop policy if exists "files: admin delete" on storage.objects;
create policy "files: admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'files' and public.is_admin());
-- Public downloads work because the bucket is public (no public select policy needed,
-- so visitors cannot enumerate the bucket's file list through the API).

-- 5) AFTER you create your admin user in Authentication -> Users, run:
--    insert into public.admins (user_id)
--    select id from auth.users where email = 'YOUR-ADMIN-EMAIL@example.com';
