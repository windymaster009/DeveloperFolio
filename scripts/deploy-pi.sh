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
  # Recreate the process instead of reloading it. This is important because
  # DeveloperFolio changed from the previous Next.js server to a CRA static build.
  # PM2 reload can preserve the old script/args for an existing app name.
  pm2 delete developerfolio >/dev/null 2>&1 || true
  pm2 start ecosystem.config.cjs --only developerfolio
  pm2 save
else
  echo "PM2 is not installed. Install it with: sudo npm install -g pm2"
  exit 1
fi

echo "==> Done. Portfolio is running on http://0.0.0.0:3030"
