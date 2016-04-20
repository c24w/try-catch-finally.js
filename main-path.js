#!/usr/bin/env node 
'use strict';
var path = require('path');
var pkg = require('./package.json');
var min = process.env.MINIFIED;
var mainFile = min ? pkg.main.replace('.js', '.min.js') : pkg.main;
var mainPath = path.join(__dirname, mainFile);

if (require.main === module) { // Called directly
  process.stdout.write(mainPath);
} else { // Required
  module.exports = mainPath;
}
