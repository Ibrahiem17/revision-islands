-- Run once in the Supabase SQL editor.
create table if not exists public.progress (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

drop policy if exists "progress select own" on public.progress;
drop policy if exists "progress insert own" on public.progress;
drop policy if exists "progress update own" on public.progress;

create policy "progress select own" on public.progress
  for select using (auth.uid() = user_id);
create policy "progress insert own" on public.progress
  for insert with check (auth.uid() = user_id);
create policy "progress update own" on public.progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- no delete policy: rows cannot be deleted via the API (they cascade with the user).
