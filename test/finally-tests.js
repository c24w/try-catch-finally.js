describe('finally', function () {
	'use strict';
	var assert = chai.assert;
	function throws(throwable) {
		return function willThrow() {
			throw throwable;
		};
	}
	function noop() {}

	it('is chainable once', function () {
		assert.isFunction(_try().finally,
			'expected to chain from empty try');
		assert.isFunction(_try(noop).finally,
			'expected to chain from non-empty try');
		assert.isFunction(_try(noop).catch(noop).finally,
			'expected to chain from indiscriminate catch');
		assert.isFunction(_try(noop).catch(123, noop).finally,
			'expected to chain from catch by value');
		assert.isFunction(_try(noop).catch('boolean', noop).finally,
			'expected to chain from catch by name');
		assert.isFunction(_try(noop).catch(Array, noop).finally,
			'expected to chain from catch by constructor');
		assert.isUndefined(_try().finally(),
			'expected to terminate after try');
		assert.isFunction(_try().catch().finally,
			'expected to chain from catch');
		assert.isUndefined(_try().catch().finally(),
			'expected to terminate after catch');
	});
	
	it('calls the finally block', function () {
		var called = false;
		_try().finally(function () { called = true; });
		assert.isTrue(called);
	});
	
	it('re-throws any uncaught error from the try block', function () {
		var throwFn = throws(new Error('blah'));
		assert.throws(_try(throwFn).finally, Error, 'blah');
	});

	it('does not throw if no error was thrown in the try block', function () {
		assert.doesNotThrow(_try(noop).finally);
	});

});
