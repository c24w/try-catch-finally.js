define(['chai', 'tcf'], function tryCatchFinallyTests(chai, _try) {

	var expect = chai.expect;

	describe('catch', function () {

		function assert_catch_specific_fail(toThrow, toCatch) {
			function throwsString(){ throw toThrow; }

			function handleError() { throw 'expected this not to execute'; }

			_try(throwsString).catch(toCatch, handleError);
		}

		it('should not call catch error handler if try block does not throw', function () {
			function doesNotThrow(){}

			function handleError() { throw 'expected this not to execute'; }

			_try(doesNotThrow).catch(handleError);
		});

		it('should not call catch error handler if catch by name doesn\'t match thrown error', function () {
			assert_catch_specific_fail('Literal string', 'Strin');
		});

		it('should not call catch error handler if catch by constructor doesn\'t match thrown error', function () {
			assert_catch_specific_fail([], String);
		});

		it('should not call catch error handler if catch by value doesn\'t match thrown error', function () {
			assert_catch_specific_fail(12345, 1234);
		});

	});

});