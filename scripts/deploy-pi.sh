#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/DeveloperFolio}"
BRANCH="${BRANCH:-main}"

echo "==> Deploying DeveloperFolio from $BRANCH"

if [ ! -d "$APP_DIR/.git" ]; then
  git clone https://github.com/windymaster009/DeveloperFolio.git "$APP_DIR"
fi

cd "$APP_DIR"

git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=1536}"

npm install
npm run build

mkdir -p .next/standalone/.next
rm -rf .next/standalone/.next/static
cp -R .next/static .next/standalone/.next/static

if [ -d public ]; then
  rm -rf .next/standalone/public
  cp -R public .next/standalone/public
fi

if command -v pm2 >/dev/null 2>&1; then
  pm2 startOrReload ecosystem.config.cjs
  pm2 save
else
  echo "PM2 is not installed. Install it with: sudo npm install -g pm2"
  exit 1
fi

echo "==> Done. Portfolio should be running on http://0.0.0.0:3030"
