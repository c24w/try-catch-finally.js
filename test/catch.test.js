define(['chai', 'tcf'], function tryCatchFinallyTests(chai, _try) {

	var expect = chai.expect;

	describe('catch', function () {


		it('...should not catch anything when error is not thrown in try block', function () {
			function doesNotThrow(){}

			function handleError(e) {
				throw 'wtf';
			}

			_try(doesNotThrow).catch(handleError).finally();
		});

		it('should exist', function () {
			expect(_try().catch).to.be.a('function');
		});

		it('should be chainable', function () {
			expect(_try().catch().catch).to.be.a('function');
		});

		it('should do nothing if arguments are undefined', function () {
			expect(_try().catch());
		});

		describe('type error with bad try block', function () {

			function assert_throws_and_catches_type_error(tryBlock, done) {
				_try(tryBlock).catch(TypeError, function () { done(); });
			}

			it('should catch TypeError if try block is undefined', function (done) {
				assert_throws_and_catches_type_error(undefined, done);
			});

			it('should catch TypeError if try block is null', function (done) {
				assert_throws_and_catches_type_error(null, done);
			});

			it('should catch TypeError if try block is an object', function (done) {
				assert_throws_and_catches_type_error(123, done);
			});

			it('should catch TypeError if try block is an object', function (done) {
				assert_throws_and_catches_type_error(new RegExp(), done);
			});

		});

		function assert_catch_specific(options, done) {

			function tryBlock() { throw options.throw; }

			function handleError(e) {
				expect(e).to.be.a(options.assertIsType);
				done();
			}

			_try(tryBlock).catch(options.catch, handleError);

		}

		function assert_catch_any(options, done) {

			function tryBlock() { throw options.throw; }

			function handleError(e) {
				expect(e).to.be.a(options.assertIsType);
				done();
			}

			_try(tryBlock).catch(handleError);

		}

		describe('literal string', function () {

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
						throw: [1,2,3],
						catch: 'Array',
						assertIsType: 'Array'
					},
					done
				);
			});

			it('by parent constructor', function (done) {
				assert_catch_specific(
					{
						throw: /Literal RegExp/,
						catch: Object,
						assertIsType: 'RegExp'
					},
					done
				);
			});

		});

		describe('literal object', function () {

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
						throw: [1,2,3],
						catch: 'Array',
						assertIsType: 'Array'
					},
					done
				);
			});

			// currently a 'quirk' - instanceof doesn't work for literal STRINGS/NUMBERS, so inheritance lookup also fails
			it('by parent constructor', function (done) {
				assert_catch_specific(
					{
						throw: /Literal RegExp/,
						catch: Object,
						assertIsType: 'RegExp'
					},
					done
				);
			});

		});

		describe('constucted object', function () {

			it('with indiscriminate catch', function (done) {
				assert_catch_any(
					{
						throw: new String('Constructed String'),
						assertIsType: 'String'
					},
					done
				);
			});

			it('by constructor', function (done) {
				assert_catch_specific(
					{
						throw: new Number(12345),
						catch: Number,
						assertIsType: 'Number'
					},
					done
				);
			});

			it('by name', function (done) {
				assert_catch_specific(
					{
						throw: new Array(),
						catch: 'Array',
						assertIsType: 'Array'
					},
					done
				);
			});

			it('by parent constructor', function (done) {
				assert_catch_specific(
					{
						throw: new RegExp('Constructed RegExp'),
						catch: Object,
						assertIsType: 'RegExp'
					},
					done
				);
			});

		});

	});

	// check catch callback only expecting one argument?
	// configurable to only catch explicitly, i.e. catch(Object) would not catch a Number

});