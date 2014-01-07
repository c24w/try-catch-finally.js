`try-catch-finally.js`
======================

Tested in the latest versions of Chrome, Firefox, Opera & Internet Explorer.  (Test coverage is ongoing.)

**See the [wiki](../../wiki) for more details.**

Set-up
------

The _try_ function can be accessed standalone or with an AMD loader.

### Standalone

Namespaced to the global object.

For example, when loading with a script tag:

	<script type="text/javascript" src="try-catch-finally.js"></script>

it is accessible via:

	var _try = window.c24w.try;
	console.log(typeof _try) // -> function

### AMD loader

Imported as a function, without polluting the global object.

For example (as per the [AMD specification][]):

	define(['try-catch-finally'], function (_try) {
		console.log(typeof _try); // -> function
	});

---

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/c24w/try-catch-finally.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[AMD specification]: https://github.com/amdjs/amdjs-api/wiki/AMD
