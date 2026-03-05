-- ============================================================
-- SPINNIN BACKFIST — Supabase Database Schema
-- Run this in your Supabase SQL Editor (supabase.com)
-- ============================================================

-- USER PROFILES
-- Extends Supabase's built-in auth.users table
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  display_name text,
  avatar_url text,
  bio text,
  favorite_fighter text,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Anyone can read profiles (public)
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

-- Users can only update their own profile
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Users can insert their own profile
create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);


-- FIGHT RATINGS
create table public.fight_ratings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  event_id text not null,
  fight_id integer not null,
  stars integer check (stars >= 1 and stars <= 5) not null,
  review text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, event_id, fight_id)
);

alter table public.fight_ratings enable row level security;

create policy "Fight ratings are viewable by everyone"
  on public.fight_ratings for select using (true);

create policy "Users can insert own fight ratings"
  on public.fight_ratings for insert with check (auth.uid() = user_id);

create policy "Users can update own fight ratings"
  on public.fight_ratings for update using (auth.uid() = user_id);

create policy "Users can delete own fight ratings"
  on public.fight_ratings for delete using (auth.uid() = user_id);


-- CARD RATINGS
create table public.card_ratings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  event_id text not null,
  stars integer check (stars >= 1 and stars <= 5) not null,
  review text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, event_id)
);

alter table public.card_ratings enable row level security;

create policy "Card ratings are viewable by everyone"
  on public.card_ratings for select using (true);

create policy "Users can insert own card ratings"
  on public.card_ratings for insert with check (auth.uid() = user_id);

create policy "Users can update own card ratings"
  on public.card_ratings for update using (auth.uid() = user_id);

create policy "Users can delete own card ratings"
  on public.card_ratings for delete using (auth.uid() = user_id);


-- AUTO-CREATE PROFILE ON SIGNUP
-- This trigger fires whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- HELPFUL VIEWS

-- Average fight ratings across all users
create view public.fight_rating_averages as
  select
    event_id,
    fight_id,
    round(avg(stars)::numeric, 2) as avg_stars,
    count(*) as total_ratings
  from public.fight_ratings
  group by event_id, fight_id;

-- Average card ratings across all users
create view public.card_rating_averages as
  select
    event_id,
    round(avg(stars)::numeric, 2) as avg_stars,
    count(*) as total_ratings
  from public.card_ratings
  group by event_id;
