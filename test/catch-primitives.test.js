define(['chai', 'tcf'], function tryCatchFinallyTests(chai, _try) {

	var expect = chai.expect;

	describe('catch primitives', function () {

		function assert_catch_specific(options, done) {

			function tryBlock() { throw options.throw; }

			function handleError(e) {
				expect(e).to.be.a(options.assertIsType);
				done();
			}

			_try(tryBlock).catch(options.catch, handleError).finally();

		}

		function assert_catch_any(options, done) {

			function tryBlock() { throw options.throw; }

			function handleError(e) {
				expect(e).to.be.a(options.assertIsType);
				done();
			}

			_try(tryBlock).catch(handleError).finally();

		}

		describe('undefined', function () {

			var toThrow = undefined;

			it('with indiscriminate catch', function (done) {
				assert_catch_any(
					{
						throw: toThrow,
						assertIsType: 'Undefined'
					},
					done
				);
			});

			// undefined does not have an object equivalent, so cannot be coerced into an object
			// from which properties would normally be read and instance of checks made
			it.skip('by constructor', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: '?',
						assertIsType: 'Undefined'
					},
					done
				);
			});

			it.skip('by name', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: 'Undefined',
						assertIsType: 'Undefined'
					},
					done
				);
			});

			it.skip('by parent constructor', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: Object,
						assertIsType: 'Undefined'
					},
					done
				);
			});

		});

		// null does not have an object equivalent, so cannot be coerced into an object
		// from which properties would normally be read and instance of checks made
		describe('null', function () {

			var toThrow = null;

			it.skip('with indiscriminate catch', function (done) {
				assert_catch_any(
					{
						throw: toThrow,
						assertIsType: 'Object'
					},
					done
				);
			});

			it.skip('by constructor', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: '?',
						assertIsType: 'Object'
					},
					done
				);
			});

			it.skip('by name', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: 'Object',
						assertIsType: 'Object'
					},
					done
				);
			});

			it.skip('by parent constructor', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: Object,
						assertIsType: 'Undefined'
					},
					done
				);
			});

		});

		describe('string', function () {

			var toThrow = 'Literal string';

			it('with indiscriminate catch', function (done) {
				assert_catch_any(
					{
						throw: toThrow,
						assertIsType: 'String'
					},
					done
				);
			});

			it('by constructor', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: String,
						assertIsType: 'String'
					},
					done
				);
			});

			it('by name', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: 'String',
						assertIsType: 'String'
					},
					done
				);
			});

			it('by parent constructor', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: Object,
						assertIsType: 'String'
					},
					done
				);
			});

		});

		describe('number', function () {

			var toThrow = 12345;

			it('with indiscriminate catch', function (done) {
				assert_catch_any(
					{
						throw: toThrow,
						assertIsType: 'Number'
					},
					done
				);
			});

			it('by constructor', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: Number,
						assertIsType: 'Number'
					},
					done
				);
			});

			it('by name', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: 'Number',
						assertIsType: 'Number'
					},
					done
				);
			});

			it('by parent constructor', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: Object,
						assertIsType: 'Number'
					},
					done
				);
			});

		});

		describe('boolean', function () {

			var toThrow = true;

			it('with indiscriminate catch', function (done) {
				assert_catch_any(
					{
						throw: toThrow,
						assertIsType: 'Boolean'
					},
					done
				);
			});

			it('by constructor', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: Boolean,
						assertIsType: 'Boolean'
					},
					done
				);
			});

			it('by name', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: 'Boolean',
						assertIsType: 'Boolean'
					},
					done
				);
			});

			it('by parent constructor', function (done) {
				assert_catch_specific(
					{
						throw: toThrow,
						catch: Object,
						assertIsType: 'Boolean'
					},
					done
				);
			});

		});

	});

});