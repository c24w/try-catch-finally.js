'use strict';
var assign = require('lodash.assign');

// Simulate browser globals for running tests in node
global.chai = require('chai');
global._try = require(require('../main-path'));

// Patch mocha colours
// https://github.com/mochajs/mocha/issues/1200
assign(require('mocha/lib/reporters/base').colors, {
  'pass': 92,
  'error stack': 92,
  'fast': 92,
  'light': 92,
  'diff gutter': 92,
  'diff added': 34,
  'diff removed': 33
});
