#!/usr/bin/env bash
set -euo pipefail
PRE='// try-catch-finally.js | http://j.mp/t-c-f'
SRC=$(./main-path.js)
DST=$(MINIFIED=y ./main-path.js)
node_modules/.bin/uglifyjs -cm --preamble "$PRE" "$SRC" -o "$DST"
