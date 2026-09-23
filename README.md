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

## Raspberry Pi deployment

The repository includes a production configuration for Raspberry Pi + PM2.

Requirements:

- Node.js 20 or newer
- Git
- PM2
- GitHub access to this repository (the repo is currently private)

Recommended first-time setup:

```bash
sudo apt update
sudo apt install -y git

node -v
npm -v

sudo npm install -g pm2
pm2 startup
```

Authenticate the Pi with GitHub using SSH or GitHub CLI, then clone:

```bash
cd ~
git clone git@github.com:windymaster009/DeveloperFolio.git
cd DeveloperFolio
chmod +x scripts/deploy-pi.sh
./scripts/deploy-pi.sh
```

The production server listens on:

```text
http://0.0.0.0:3030
```

Useful PM2 commands:

```bash
pm2 status
pm2 logs developerfolio
pm2 restart developerfolio
pm2 save
```

For later updates:

```bash
cd ~/DeveloperFolio
./scripts/deploy-pi.sh
```

The build uses Next.js standalone output and sets a conservative Node.js heap limit for the Raspberry Pi 4 2GB environment.

If you use Cloudflare Tunnel, point your portfolio hostname to:

```text
http://localhost:3030
```

## Vercel deployment

Vercel also works:

1. Import this repository into Vercel.
2. Optionally add `GITHUB_TOKEN` as a server-side environment variable.
3. Deploy.

Node.js 20+ is recommended.
