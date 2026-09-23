#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-$HOME/DeveloperFolio}"
BRANCH="${BRANCH:-main}"

echo "==> Deploying Kevin's DeveloperFolio from $BRANCH"

if [ ! -d "$APP_DIR/.git" ]; then
  echo "Repository not found at $APP_DIR"
  echo "Clone it first, then run this script again."
  exit 1
fi

cd "$APP_DIR"

git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=1400}"

npm install --legacy-peer-deps
npm run build

if command -v pm2 >/dev/null 2>&1; then
  pm2 startOrReload ecosystem.config.cjs
  pm2 save
else
  echo "PM2 is not installed. Install it with: sudo npm install -g pm2"
  exit 1
fi

echo "==> Done. Portfolio is running on http://0.0.0.0:3030"
