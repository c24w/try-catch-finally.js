'use strict';
var assign = require('lodash.assign');

// Make globals available for tests by attaching node modules to node global
global.chai = require('chai');
global._try = require(require('./main-path'));

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
