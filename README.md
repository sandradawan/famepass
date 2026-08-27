# FamePass

**Your pass to the stars.**

Premium fan membership cards for American celebrities. Browse stars, request a digital fan card, download and share.

> Fan memorabilia only. Not affiliated with listed celebrities unless marked Official / Verified.

## Brand

| Token | Value |
|-------|--------|
| Name | **FamePass** |
| Tagline | *Your pass to the stars.* |
| Primary gold | `#C9A227` |
| Gold light | `#E8C547` |
| Ink | `#0B0B0F` |
| Surface | `#14141A` |
| Cream | `#F4EFE4` |
| Muted | `#9A958C` |

## Stack

- Next.js 15 (App Router)
- Tailwind CSS 4
- Supabase (optional until env is set)
- Framer Motion

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Without Supabase env vars, the app uses built-in seed celebrities and in-memory-style card codes (client + seed).

## Supabase

1. Create a project at supabase.com  
2. Run `supabase/schema.sql` in the SQL editor  
3. Add URL + anon key to `.env.local`

## Deploy

Vercel → import this repo → set env vars → deploy.
