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

			it('with indiscriminate catch', function (done) {
				assert_catch_any(
					{
						throw: undefined,
						assertIsType: 'Undefined'
					},
					done
				);
			});

			// undefined can be thrown, although it has no properties or object equivalent
			// so operations such as instanceof and undefined.constructor.name all fail

			it.skip('by constructor', function (done) {
				assert_catch_specific(
					{
						throw: undefined,
						catch: String,
						assertIsType: 'Undefined'
					},
					done
				);
			});

			it.skip('by name', function (done) {
				assert_catch_specific(
					{
						throw: undefined,
						catch: 'Undefined',
						assertIsType: 'Undefined'
					},
					done
				);
			});

		});

		// null has no properties or object equivalent to be constructed to
		// so operations such as instanceof and undefined.constructor.name all fail
		xdescribe('null', function () {

			it('with indiscriminate catch', function (done) {
				assert_catch_any(
					{
						throw: null,
						assertIsType: 'Object'
					},
					done
				);
			});

			it('by constructor', function (done) {
				assert_catch_specific(
					{
						throw: null,
						catch: Object,
						assertIsType: 'Object'
					},
					done
				);
			});

			it('by name', function (done) {
				assert_catch_specific(
					{
						throw: null,
						catch: 'Object',
						assertIsType: 'Object'
					},
					done
				);
			});

		});

		describe('string', function () {

			it('with indiscriminate catch', function (done) {
				assert_catch_any(
					{
						throw: 'Literal String',
						assertIsType: 'String'
					},
					done
				);
			});

			it('by constructor', function (done) {
				assert_catch_specific(
					{
						throw: 'Literal String',
						catch: String,
						assertIsType: 'String'
					},
					done
				);
			});

			it('by name', function (done) {
				assert_catch_specific(
					{
						throw: 'Literal String',
						catch: 'String',
						assertIsType: 'String'
					},
					done
				);
			});

		});

		describe('number', function () {

			it('with indiscriminate catch', function (done) {
				assert_catch_any(
					{
						throw: 12345,
						assertIsType: 'Number'
					},
					done
				);
			});

			it('by constructor', function (done) {
				assert_catch_specific(
					{
						throw: 12345,
						catch: Number,
						assertIsType: 'Number'
					},
					done
				);
			});

			it('by name', function (done) {
				assert_catch_specific(
					{
						throw: 12345,
						catch: 'Number',
						assertIsType: 'Number'
					},
					done
				);
			});

		});

	});

	// check catch callback only expecting one argument?
	// configurable to only catch explicitly, i.e. catch(Object) would not catch a Number

});