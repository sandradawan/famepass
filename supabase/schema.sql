-- FamePass schema (run in Supabase SQL editor)

create extension if not exists "pgcrypto";

create table if not exists public.celebrities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in ('music', 'film', 'sports', 'tv', 'creator')),
  bio text,
  image_url text,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- MVP-friendly requests (slug + name, no UUID required from app seed)
create table if not exists public.card_requests (
  id uuid primary key default gen_random_uuid(),
  celebrity_slug text not null,
  celebrity_name text not null,
  fan_name text not null,
  fan_email text not null,
  status text not null default 'issued'
    check (status in ('pending', 'approved', 'issued', 'rejected')),
  card_code text unique not null,
  created_at timestamptz default now()
);

create index if not exists celebrities_category_idx on public.celebrities(category);
create index if not exists celebrities_featured_idx on public.celebrities(is_featured);
create index if not exists card_requests_email_idx on public.card_requests(fan_email);
create index if not exists card_requests_slug_idx on public.card_requests(celebrity_slug);

alter table public.celebrities enable row level security;
alter table public.card_requests enable row level security;

drop policy if exists "Public read active celebrities" on public.celebrities;
create policy "Public read active celebrities"
  on public.celebrities for select
  using (is_active = true);

drop policy if exists "Anyone can request a card" on public.card_requests;
create policy "Anyone can request a card"
  on public.card_requests for insert
  with check (true);

drop policy if exists "Public read card requests" on public.card_requests;
create policy "Public read card requests"
  on public.card_requests for select
  using (true);

insert into public.celebrities (slug, name, category, bio, is_featured) values
  ('taylor-swift', 'Taylor Swift', 'music', 'American singer-songwriter. Global pop icon.', true),
  ('beyonce', 'Beyoncé', 'music', 'Singer, actress, and businesswoman.', true),
  ('leonardo-dicaprio', 'Leonardo DiCaprio', 'film', 'Academy Award-winning actor and producer.', true),
  ('serena-williams', 'Serena Williams', 'sports', 'Tennis champion and entrepreneur.', true),
  ('the-weeknd', 'The Weeknd', 'music', 'R&B and pop star.', false),
  ('zendaya', 'Zendaya', 'film', 'Actress and producer.', true),
  ('lebron-james', 'LeBron James', 'sports', 'NBA legend and media entrepreneur.', true),
  ('billie-eilish', 'Billie Eilish', 'music', 'Grammy-winning singer-songwriter.', false),
  ('dwayne-johnson', 'Dwayne Johnson', 'film', 'Actor and producer.', false),
  ('rihanna', 'Rihanna', 'music', 'Artist, founder of Fenty.', true),
  ('oprah-winfrey', 'Oprah Winfrey', 'tv', 'Media leader and philanthropist.', false),
  ('drake', 'Drake', 'music', 'Rapper, singer, and entrepreneur.', false)
on conflict (slug) do nothing;
