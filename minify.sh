#!/usr/bin/env bash
PRE='// try-catch-finally.js | http://j.mp/t-c-f'
SRC=$(npm view . main)
DST=$(MINIFIED=y ./main-path.js)
node_modules/.bin/uglifyjs -cm --preamble "$PRE" "$SRC" -o "$DST"
