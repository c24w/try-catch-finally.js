define(['chai', 'tcf', 'catch-test-helpers'], function tryCatchFinallyTests(chai, _try, helpers) {

	var expect = chai.expect,
		assert_catch_specific = helpers.assert_catch_specific,
		assert_catch_any = helpers.assert_catch_any;

	function batch_test_catches_for() {
		var args = arguments;
		return function () {
			return helpers.batch_test_catches_for.apply(this, args);
		};
	}

	describe('catch primitives', function () {

		describe('undefined', function () {

			var toThrow;
			var assert_catch_undefined_as = assert_catch_specific.bind(this, toThrow);

			it('with indiscriminate catch', function (done) {
				assert_catch_any(toThrow, done);
			});

			// undefined does not have an object equivalent, so cannot be coerced into an object
			// from which properties would normally be read and instance of checks made
			it.skip('by constructor', function (done) {
				assert_catch_undefined_as('?', done);
			});

			it('by name', function (done) {
				assert_catch_undefined_as('Undefined', done);
			});

			it.skip('by parent constructor', function (done) {
				assert_catch_undefined_as(Object, done);
			});
// BY VALUE!
		});

		describe('null', function () {

			var toThrow = null;
			var assert_null_caught_as = assert_catch_specific.bind(this, toThrow);

			it('with indiscriminate catch', function (done) {
				assert_catch_any(toThrow, done);
			});

			// null does not have an object equivalent, so cannot be coerced into an object
			// from which properties would normally be read and instance of checks made
			it.skip('by constructor', function (done) {
				assert_null_caught_as('?', done);
			});

			it('by name', function (done) {
				assert_null_caught_as('Null', done);
			});

			it.skip('by parent constructor', function (done) {
				assert_null_caught_as(Object, done);
			});

		});

		describe('string', batch_test_catches_for('Literal string', String, 'String'));

		describe('number', batch_test_catches_for(12345, Number, 'Number'));

		describe('boolean', batch_test_catches_for(true, Boolean, 'Boolean'));

	});

});