#!/usr/bin/env bash
set -eo pipefail

function die { echo "$2" && exit $1; }

git checkout master # Get out of detached head state
git fetch origin master # Get latest
git diff --quiet --exit-code HEAD..origin/master ||\
  die 0 'Master changed since build start' 

MIN_FILE=$(MINIFIED=y ./main-path.js short)

git config user.name 'Travis CI'
git config user.email deploy@travis-ci.org

git add "$MIN_FILE"
git diff --cached --quiet --exit-code "$MIN_FILE" &&\
  die 0 "$MIN_FILE unchanged"

./build-readme.sh
git add readme.md

UGLIFY="($(node_modules/.bin/uglifyjs --version))"
MSG=$(git log -1 --pretty="Build $MIN_FILE @%h%n%n- %B%n$UGLIFY")
git commit -m "$MSG"
# -q and output redirects prevent leaking the token!
AUTHED_ORIGIN=https://$GH_TOKEN@github.com/c24w/try-catch-finally.js.git
git push -q "$AUTHED_ORIGIN" master > /dev/null 2>&1 ||\
  die 1 'Push failed'
