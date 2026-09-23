# Kevin Nhim — DeveloperFolio

A modern developer portfolio inspired by DeveloperFolio, rebuilt with Next.js and automatic GitHub analysis.

## What it does

- Automatically reads public repositories from `windymaster009`
- Counts projects and detected programming languages
- Detects frameworks/tools from repository topics, names, descriptions, and common manifests
- Shows language usage and how many projects use each technology
- Filters forks, archived repositories, and empty repositories
- Highlights selected projects while keeping the rest GitHub-driven
- Includes light/dark theme support and a responsive layout

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- GitHub REST API

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Optional GitHub token

The site works with public GitHub data without a token. For a higher API limit, copy `.env.example` to `.env.local` and add a GitHub token:

```env
GITHUB_TOKEN=github_pat_xxx
```

Keep this token server-side only. Never expose it as a `NEXT_PUBLIC_*` variable.

## Customize

Edit `data/site.ts` to change the hero text, featured repositories, social links, and focus areas.

GitHub data is refreshed through Next.js server caching, so new public projects and detected technologies appear automatically after the cache refresh.

## Deploy

Vercel is the easiest option:

1. Import this repository into Vercel.
2. Optionally add `GITHUB_TOKEN` as a server-side environment variable.
3. Deploy.

Node.js 20+ is recommended.
