#!/usr/bin/env node 
'use strict';
var path = require('path');
var pkg = require('./package.json');
var min = process.env.MINIFIED;
var mainFile = min ? pkg.main.replace('.js', '.min.js') : pkg.main;
var full = process.argv[2] !== 'short';
var mainPath = full ? path.join(__dirname, mainFile) : mainFile;

if (require.main === module) { // Called directly
  process.stdout.write(mainPath);
} else { // Required
  console.log('Using module path:', mainPath);
  module.exports = mainPath;
}
