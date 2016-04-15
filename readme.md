`try-catch-finally.js`
======================

[![Travis CI](https://img.shields.io/travis/c24w/try-catch-finally.js.svg?style=flat-square&label=tests)](https://travis-ci.org/c24w/try-catch-finally.js 'Travis CI')

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
