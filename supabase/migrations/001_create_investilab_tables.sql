-- InvestiLab tables (prefixo il_ para convivência com outras apps no mesmo projeto)
-- Aplicada em: 2026-06-08

-- ============ il_profiles ============
create table public.il_profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  created_at timestamptz default now()
);
alter table public.il_profiles enable row level security;

create policy "il_profiles: own select" on public.il_profiles
  for select using (auth.uid() = id);
create policy "il_profiles: own update" on public.il_profiles
  for update using (auth.uid() = id);

create or replace function public.il_handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.il_profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email,'@',1)));
  return new;
end; $$;

create trigger il_on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.il_handle_new_user();

-- ============ il_scenarios ============
create table public.il_scenarios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  description text,
  rows jsonb not null default '[]'::jsonb,
  assumptions jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.il_scenarios enable row level security;

create policy "il_scenarios: own all" on public.il_scenarios
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============ il_calculations ============
create table public.il_calculations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  type text not null check (type in ('renda_fixa','acoes','fii','cripto')),
  inputs jsonb not null,
  results jsonb,
  created_at timestamptz default now()
);
alter table public.il_calculations enable row level security;

create policy "il_calculations: own all" on public.il_calculations
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============ il_market_indicators ============
create table public.il_market_indicators (
  id text primary key,
  value numeric not null,
  unit text default '% a.a.',
  reference_date date,
  fetched_at timestamptz default now()
);
alter table public.il_market_indicators enable row level security;

create policy "il_indicators: public read" on public.il_market_indicators
  for select using (true);

-- ============ Trigger updated_at automático ============
create or replace function public.il_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

create trigger il_scenarios_updated_at
  before update on public.il_scenarios
  for each row execute procedure public.il_set_updated_at();
