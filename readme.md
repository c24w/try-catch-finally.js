`try-catch-finally.js`
======================

Tested in the latest versions of Chrome, Firefox, Opera & Internet Explorer.  (Test coverage is ongoing.)

**See the [wiki](../../wiki) for more details.**

Set-up
------

### Standalone

	<script type="text/javascript" src="try-catch-finally.js"></script>

	console.log(typeof window.try) // -> function
	console.log(typeof window._try) // -> function

### [AMD][]

	define(['try-catch-finally'], function (_try) {
		console.log(typeof _try); // -> function
	});

---

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/c24w/try-catch-finally.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[AMD]: https://github.com/amdjs/amdjs-api/wiki/AMD
