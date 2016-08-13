#!/usr/bin/env bash
set -eo pipefail

function die { echo "$2" && exit $1; }

function version {
  VERSION=$(node -e "console.log(require('$1/package.json').version);")
  echo "$1 v$VERSION"
}

npm i -q github-markdown-css

# Convert markdown to HTML and inject into index template
curl -X POST https://api.github.com/markdown/raw -s\
  -H 'Content-Type: text/x-markdown'\
  -d "$(cat readme.md)"\
  -o readme.html
sed -e '/{{MARKDOWN}}/{r readme.html' -e 'd}' gh-pages-template > index.html

# Build commit message
MASTER_SHA=$(git log -1 --pretty='%h')
GH_MD_CSS=$(version github-markdown-css)
MSG=$(git log -1 --pretty="Build documentation @$MASTER_SHA%n%n($GH_MD_CSS)")

# Seemingly impossible to just checkout the gh-pages branch with the way travis
# clones the build branch, so clone it instead
git clone --depth=1 --no-single-branch --branch=gh-pages\
  $(git config --get remote.origin.url) gh-pages

cp node_modules/github-markdown-css/github-markdown.css index.html gh-pages

cd gh-pages

git diff --quiet --exit-code HEAD..origin/gh-pages ||\
  die 0 'GH pages changed since build start' 

git add index.html github-markdown.css

git diff --cached --quiet --exit-code github-markdown.css index.html &&\
  die 0 'No changes to commit'

git config user.name 'Travis CI'
git config user.email $EMAIL > /dev/null 2>&1

git commit -m "$MSG"
# -q and output redirects prevent leaking the token!
AUTHED_ORIGIN=https://$GH_TOKEN@github.com/c24w/try-catch-finally.js.git
git push -q "$AUTHED_ORIGIN" gh-pages > /dev/null 2>&1 || die 1 'Push failed'
