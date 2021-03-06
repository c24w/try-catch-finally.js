#!/usr/bin/env bash
set -euo pipefail

PRE='// try-catch-finally.js | (c) Chris Watson | http://git.io/tcf'
SRC=$(./main-path.js)
DST=$(MINIFIED=y ./main-path.js)

MIN=$(node_modules/.bin/uglifyjs "$SRC" -cm)

echo "$PRE" > "$DST"
echo "$MIN" >> "$DST"
