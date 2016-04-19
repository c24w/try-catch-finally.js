#!/usr/bin/env bash
PRE='// try-catch-finally.js | http://j.mp/t-c-f'
SRC=$(npm view . main)
DST=$(node -e "console.log(require('./package.json').main_min)")
node_modules/.bin/uglifyjs -cm --preamble "$PRE" "$SRC" -o "$DST"
