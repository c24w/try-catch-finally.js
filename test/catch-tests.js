describe('catch', function () {
	'use strict';
	var spy, assert = chai.assert;
	function noop() {}
	function throws(throwable) {
		return function willThrow() {
			throw throwable;
		};
	}
	function Spy() {
		function spy() {
			spy.calls.push(arguments);
			spy.firstCall = spy.firstCall || arguments;
		}
		spy.calls = [];
		spy.firstCall;
		return spy;
	}

	beforeEach(function () { spy = new Spy(); });

	it('is chainable', function () {
		assert.isFunction(_try().catch,
			'expected to chain catch from empty try');
		assert.isFunction(_try(noop).catch,
			'expected to chain catch from non-emtpy try');
		assert.isFunction(_try().catch().catch,
			'expected to chain catch from empty catch');
		assert.isFunction(_try().catch(noop).catch,
			'expected to chain catch from indiscriminate catch');
		assert.isFunction(_try().catch(123, noop).catch,
			'expected to chain catch from catch by value');
		assert.isFunction(_try().catch('string', noop).catch,
			'expected to chain catch from catch by name');
		assert.isFunction(_try().catch(Boolean, noop).catch,
			'expected to chain catch from catch by constructor');
	});

	var testCases = [
		{ name: 'undefined', value: undefined },
		{ name: 'null', value: null },
		{ name: 'string', value: 'blah', constructor: String },
		{ name: 'number', value: 123, constructor: Number },
		{ name: 'boolean', value: true, constructor: Boolean },
		{ name: 'array', value: [], constructor: Array },
		{ name: 'object', value: {}, constructor: Object },
		{ name: 'Error', value: new Error(),  constructor: Error }
	];

	function testCase(cb) {
		testCases.forEach(function (tc) {
			var ctor = tc.hasOwnProperty('constructor')
				? tc.constructor : undefined;
			cb(tc.name, tc.value, ctor);
		});
	}

	describe('indiscriminately', function () {

		it('is not called if try block does not throw', function () {
			_try(noop).catch(spy);
			assert.isUndefined(spy.firstCall);
		});

		it('is only called for the first match', function () {
			_try(throws({})).catch(spy).catch(spy);
			assert.lengthOf(spy.calls, 1, 'expected one catch');
		});

		testCase(function (name, value, constructor) {

			it('is called when ' + name + ' is thrown', function () {
				_try(throws(value)).catch(spy);

				assert.lengthOf(spy.calls, 1,
					'expected handler to be called once');
				assert.lengthOf(spy.firstCall, 1,
					'expected handler to be called with one argument');
				assert.equal(spy.firstCall[0], value,
					'expected handler to be called with thrown error');
			});
		});
	});

	describe('by value', function () {

		it('is not called if try block does not throw', function () {
			_try(noop).catch(true, spy);
			assert.isUndefined(spy.firstCall);
		});

		it('is not called if error does not match', function () {
			_try(throws('foo')).catch('bar', spy);
			assert.isUndefined(spy.firstCall);
		});

		it('is only called for the first match', function () {
			_try(throws(123)).catch(123, spy).catch(123, spy);
			assert.lengthOf(spy.calls, 1, 'expected one catch');
		});

		testCase(function (name, value, constructor) {

			it('is called for ' + name, function () {
				_try(throws(value)).catch(value, spy);
				
				assert.lengthOf(spy.calls, 1,
					'expected handler to be called once');
				assert.lengthOf(spy.firstCall, 1,
					'expected handler to be called with one argument');
				assert.equal(spy.firstCall[0], value,
					'expected handler to be called with thrown error');
			});
		});
	});

	describe('by name', function () {

		it('is not called if try block does not throw',
			function () {
			_try(noop).catch('string', spy);
			assert.isUndefined(spy.firstCall);
		});

		it('is not called if error does not match', function () {
			_try(throws(123)).catch('boolean', spy);
			assert.isUndefined(spy.firstCall);
		});

		it('is only called for the first match', function () {
			_try(throws(null)).catch('null', spy).catch('null', spy);
			assert.lengthOf(spy.calls, 1, 'expected one catch');
		});

		it('is not case-sensitive', function () {
			_try(throws(null)).catch('nUlL', spy);

			assert.lengthOf(spy.calls, 1,
				'expected handler to be called once');
			assert.lengthOf(spy.firstCall, 1,
				'expected handler to be called with one argument');
			assert.equal(spy.firstCall[0], null,
				'expected handler to be called with thrown error');
		});

		testCase(function (name, value, constructor) {

			it('is called for ' + name, function () {
				_try(throws(value)).catch(name, spy);
				
				assert.lengthOf(spy.calls, 1,
					'expected handler to be called once');
				assert.lengthOf(spy.firstCall, 1,
					'expected handler to be called with one argument');
				assert.equal(spy.firstCall[0], value,
					'expected handler to be called with thrown error');
			});
		});
	});

	describe('by constructor', function () {

		it('by constructor is not called if try block does not throw',
			function () {
			_try(noop).catch(Object, spy);
			assert.isUndefined(spy.firstCall);
		});

		it('is not called if error does not match', function () {
			_try(throws(true)).catch(Number, spy);
			assert.isUndefined(spy.firstCall);
		});

		it('is only called for the first match', function () {
			_try(throws([])).catch(Array, spy).catch(Array, spy);
			assert.lengthOf(spy.calls, 1, 'expected one catch');
		});

		testCase(function (name, value, constructor) {

			if (constructor) {
				it('is called for ' + name, function () {
					_try(throws(value)).catch(constructor, spy);
					
					assert.lengthOf(spy.calls, 1,
						'expected handler to be called once');
					assert.lengthOf(spy.firstCall, 1,
						'expected handler to be called with one argument');
					assert.equal(spy.firstCall[0], value,
						'expected handler to be called with thrown error');
				});
			}
		});
	});

});
