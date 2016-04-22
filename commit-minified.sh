#!/usr/bin/env bash
set -eo pipefail

MIN_FILE=$(MINIFIED=y ./main-path.js short)

git config user.name 'Travis CI'
git config user.email $EMAIL > /dev/null 2>&1

git add "$MIN_FILE"
git diff --cached --quiet --exit-code "$MIN_FILE" &&\
  echo "$MIN_FILE unchanged" && exit 0

MSG=$(git log -1 --pretty="Build $MIN_FILE @%h%n%n- %B")
git commit -m "$MSG"
# -q and output redirects prevent leaking the token!
git push -q "https://$GH_TOKEN@github.com/c24w/try-catch-finally.js.git" master > /dev/null 2>&1
