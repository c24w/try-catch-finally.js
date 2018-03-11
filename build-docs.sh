#!/usr/bin/env bash
set -eo pipefail

function die { echo "$2" && exit $1; }

mkdir -p docs

# Convert markdown to HTML and inject into index template
curl https://$GH_TOKEN@api.github.com/repos/c24w/try-catch-finally.js/readme -s\
  -H 'Content-Type: text/x-markdown'\
  -H 'Accept: application/vnd.github.html'\
  -o readme.html
sed -i 's/user-content-//' readme.html # Fix fragment links
sed -e '/{{MARKDOWN}}/{r readme.html' -e 'd}' docs-template.html > docs/index.html
