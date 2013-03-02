# Examples / Quirks

## Normal behaviour

### Catching explicitly

	c24w.try(function () {
		throw new Error('error message');
	})
	.catch(String, function (e) {
		console.log('Caught String: ' + e);
	})
	.catch(Error, function (e) {
		console.log('Caught Error: ' + e);
	})
	.catch(function (e) {
		console.log('Caught other: ' + e);
	})
	.finally(function () {
		console.log('Error was caught explicitly');
	});

### Catching implicitly

	c24w.try(function () {
		throw new Error('error message');
	})
	.catch(Number, function (e) {
		console.log('Caught Number: ' + e);
	})
	.catch(String, function (e) {
		console.log('Caught String: ' + e);
	})
	.catch(function (e) {
		console.log('Caught other: ' + e);
	})
	.finally(function () {
		console.log('Error was caught implicitly');
	});

## Quirks

### Throwing / catching primitives

##### Literally declared primitives

Note: catching Object _doesn't_ catch the String.

	c24w.try(function () {
		throw 'a string error';
	})
	.catch(Object, function (e) {
		console.log('Caught Object: ' + e);
	})
	.catch(String, function (e) {
		console.log('Caught String: ' + e);
	})
	.finally(function () {
		console.log('Literal String was caught by String catch');
	});

##### Constructed primitives

Note: catching Object _does_ catch the String.

	c24w.try(function () {
		throw new String('a string error');
	})
	.catch(Object, function (e) {
		console.log('Caught Object: ' + e);
	})
	.catch(String, function (e) {
		console.log('Caught String: ' + e);
	})
	.finally(function () {
		console.log('Constructed String was caught by Object catch');
	});

### All errors are consumed

Due to the implementation, any thrown error is consumed.  If no catches are defined or correspond to the thrown error, the error will remain silently consumed, unless a _finally_ is used, causing it to be re-thrown and uncaught.

In the following code, the Error is silently consumed and not re-thrown.

	c24w.try(function () {
		throw new Error('error message');
	})
	.catch(String, function (e) {
		console.log('Caught String: ' + e);
	});

Whereas in the following code, the Error is re-thrown and remains uncaught.

	c24w.try(function () {
		throw new Error('error message');
	})
	.catch(String, function (e) {
		console.log('Caught String: ' + e);
	})
	.finally(function () {
		console.log('Error is thrown; consumed; not caught; re-thrown');
	});