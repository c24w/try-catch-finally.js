#!/usr/bin/env node 
'use strict';
/* jshint esversion: 6 */
const pkg = require('./package.json');
const min = process.env.MINIFIED;
const main = min ? pkg.main.replace('.js', '.min.js') : pkg.main;
const path = `${__dirname}/${main}`;

if (require.main === module) { // Called directly
  process.stdout.write(path);
} else { // Required
  module.exports = path;
}
