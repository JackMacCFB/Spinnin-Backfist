# 🥋 SPINNIN BACKFIST — Setup Guide

## What you have
- `App.jsx` — the full React app
- `schema.sql` — your Supabase database schema
- This guide

---

## Step 1 — Create a Supabase project (free)

1. Go to **[supabase.com](https://supabase.com)** and sign up (free)
2. Click **New Project**
3. Name it `spinnin-backfist`, pick a region, set a database password
4. Wait ~2 minutes for it to provision

---

## Step 2 — Run the database schema

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Paste the entire contents of `schema.sql`
4. Click **Run**

This creates:
- `profiles` table — stores each user's username, display name, bio, favorite fighter
- `fight_ratings` table — each user's star ratings + reviews for individual fights
- `card_ratings` table — each user's overall card ratings + reviews
- Automatic profile creation when someone signs up
- Row Level Security so users can only edit their own data

---

## Step 3 — Get your API keys

1. In Supabase, go to **Project Settings** (gear icon) → **API**
2. Copy:
   - **Project URL** → looks like `https://xxxxxxxxxxxx.supabase.co`
   - **anon / public** key → long string starting with `eyJ...`

---

## Step 4 — Add keys to the app

Open `App.jsx` and replace lines 7–8:

```js
const SUPABASE_URL = "https://your-project.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGci...your-anon-key...";
```

---

## Step 5 — Deploy the app (free)

### Option A — Vercel (recommended, easiest)
1. Push your code to a GitHub repo
2. Go to **[vercel.com](https://vercel.com)** → New Project → import your repo
3. Framework: **Vite** or **Create React App**
4. Deploy — you'll get a live URL instantly

### Option B — Run locally
```bash
npm create vite@latest spinnin-backfist -- --template react
cd spinnin-backfist
npm install
# Replace src/App.jsx with your App.jsx
npm run dev
```

---

## Step 6 — Enable email confirmation (optional)

By default Supabase requires email confirmation. To skip this during development:

1. Go to **Authentication** → **Providers** → **Email**
2. Toggle off **Confirm email**

---

## What users get

- ✅ Sign up with email + password
- ✅ Unique username + display name
- ✅ Rate every fight 1–5 stars + write a review
- ✅ Rate every card overall 1–5 stars + write a review
- ✅ Personal profile page with stats
- ✅ 2026 card leaderboard based on their ratings
- ✅ All data saved to their account, accessible from any device

---

## Adding new events

In `App.jsx`, find the `EVENTS` array at the top and add a new object:

```js
{
  id: "ufchouston",         // unique slug
  name: "UFC Houston",
  subtitle: "Pereira vs. Ankalaev",
  date: "April 12, 2026",
  venue: "Toyota Center, Houston TX",
  broadcast: "Paramount+",
  status: "upcoming",       // or "past"
  fights: [
    {
      id: 301,              // unique number
      section: "MAIN EVENT",
      fighter1: "Alex Pereira",
      fighter2: "Magomed Ankalaev",
      record1: "12-2",
      record2: "20-1-1",
      weightClass: "Light Heavyweight",
      lbs: 205,
      note: "Light heavyweight title on the line",
      belt: true,
      bio1: "UFC light heavyweight champion",
      bio2: "Russian contender, next in line"
    },
    // ... more fights
  ]
}
```

---

## Database tables at a glance

| Table | What it stores |
|---|---|
| `profiles` | username, display name, bio, favorite fighter |
| `fight_ratings` | user_id, event_id, fight_id, stars (1–5), review text |
| `card_ratings` | user_id, event_id, stars (1–5), review text |

Views `fight_rating_averages` and `card_rating_averages` are available if you later want to show community averages.
