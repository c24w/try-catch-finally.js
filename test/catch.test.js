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

	});

});