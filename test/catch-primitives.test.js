define(['chai', 'tcf'], function tryCatchFinallyTests(chai, _try) {

	var expect = chai.expect;

	describe('catch primitives', function () {

		function assert_catch_specific(toThrow, toCatch, done) {

			function tryBlock() { throw toThrow; }

			function handleError(e) {
				expect(e).to.equal(toThrow);
				done();
			}

			_try(tryBlock).catch(toCatch, handleError).finally();

		}

		function assert_catch_any(toThrow, done) {

			function tryBlock() { throw toThrow; }

			function handleError(e) {
				expect(e).to.equal(toThrow);
				done();
			}

			_try(tryBlock).catch(handleError).finally();

		}

		describe('undefined', function () {

			var toThrow = undefined;
			var assert_catch_undefined_as = assert_catch_specific.bind(null, toThrow);

			it('with indiscriminate catch', function (done) {
				assert_catch_any(toThrow, done);
			});

			// undefined does not have an object equivalent, so cannot be coerced into an object
			// from which properties would normally be read and instance of checks made
			it.skip('by constructor', function (done) {
				assert_catch_undefined_as('?', done);
			});

			it.skip('by name', function (done) {
				assert_catch_undefined_as('Undefined', done);
			});

			it.skip('by parent constructor', function (done) {
				assert_catch_undefined_as(Object, done);
			});

		});

		// null does not have an object equivalent, so cannot be coerced into an object
		// from which properties would normally be read and instance of checks made
		xdescribe('null', function () {

			var toThrow = null;
			var assert_catch_null_as = assert_catch_specific.bind(null, toThrow);

			it('with indiscriminate catch', function (done) {
				assert_catch_any(toThrow, done);
			});

			it.skip('by constructor', function (done) {
				assert_catch_null_as('?', done);
			});

			it.skip('by name', function (done) {
				assert_catch_null_as('Object', done);
			});

			it.skip('by parent constructor', function (done) {
				assert_catch_null_as(Object, done);
			});

		});

		describe('string', function () {

			var toThrow = 'Literal string';
			var assert_catch_string_as = assert_catch_specific.bind(null, toThrow);

			it('with indiscriminate catch', function (done) {
				assert_catch_any(toThrow, done);
			});

			it('by constructor', function (done) {
				assert_catch_string_as(String, done);
			});

			it('by name', function (done) {
				assert_catch_string_as('String', done);
			});

			it('by parent constructor', function (done) {
				assert_catch_string_as(Object, done);
			});

		});

		describe('number', function () {

			var toThrow = 12345;
			var assert_catch_number_as = assert_catch_specific.bind(null, toThrow);

			it('with indiscriminate catch', function (done) {
				assert_catch_any(toThrow, done);
			});

			it('by constructor', function (done) {
				assert_catch_number_as(Number, done);
			});

			it('by name', function (done) {
				assert_catch_number_as('Number', done);
			});

			it('by parent constructor', function (done) {
				assert_catch_number_as(Object, done);
			});

		});

		describe('boolean', function () {

			var toThrow = true;
			var assert_catch_boolean_as = assert_catch_specific.bind(null, toThrow);

			it('with indiscriminate catch', function (done) {
				assert_catch_any(toThrow, done);
			});

			it('by constructor', function (done) {
				assert_catch_boolean_as(Boolean, done);
			});

			it('by name', function (done) {
				assert_catch_boolean_as('Boolean', done);
			});

			it('by parent constructor', function (done) {
				assert_catch_boolean_as(Object, done);
			});

		});

	});

});