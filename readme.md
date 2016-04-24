`try-catch-finally.js`
======================

[![Travis CI](https://img.shields.io/travis/c24w/try-catch-finally.js.svg?style=flat-square)](https://travis-ci.org/c24w/try-catch-finally.js 'Travis CI')
[![Coveralls](https://img.shields.io/coveralls/c24w/try-catch-finally.js.svg?style=flat-square)](https://coveralls.io/github/c24w/try-catch-finally.js 'Coveralls')
[![David](https://img.shields.io/david/c24w/try-catch-finally.js.svg?style=flat-square)](https://david-dm.org/c24w/try-catch-finally.js 'David')

[![npm](https://nodei.co/npm/try-catch-finally.png?compact=true)](https://www.npmjs.com/package/try-catch-finally 'npm')

**See the [wiki](../../wiki) for more details.**

Set-up
------

### Standalone

	<script type="text/javascript" src="try-catch-finally.js"></script>

	console.log(typeof window.try) // -> function
	console.log(typeof window._try) // -> function

### [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)

	define(['try-catch-finally'], function (_try) {
		console.log(typeof _try); // -> function
	});
