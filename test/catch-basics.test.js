define(['chai', 'tcf'], function tryCatchFinallyTests(chai, _try) {

	var expect = chai.expect;

	describe('catch', function () {

		it('should exist', function () {
			expect(_try().catch).to.be.a('function');
		});

		it('should be chainable', function () {
			expect(_try().catch().catch).to.be.a('function');
		});

		it('should do nothing if arguments are undefined', function () {
			expect(_try().catch());
		});

		it('should not call catch error handler if try block does not throw', function () {
			function doesNotThrow(){}

			function handleError() { throw 'expected this not to execute'; }

			_try(doesNotThrow).catch(handleError);
		});

		it('should not call catch error handler if catch by name doesn\'t match thrown error', function () {
			function throwsString(){ throw 'Literal string'; }

			function handleError() { throw 'expected this not to execute'; }

			_try(throwsString).catch('Strin', handleError);
		});

		it('should not call catch error handler if catch by constructor doesn\'t match thrown error', function () {
			function throwsString(){ throw []; }

			function handleError() { throw 'expected this not to execute'; }

			_try(throwsString).catch(String, handleError);
		});

		it('should not call catch error handler if catch by value doesn\'t match thrown error', function () {
			function throwsString(){ throw 12345; }

			function handleError() { throw 'expected this not to execute'; }

			_try(throwsString).catch(54321, handleError);
		});

	});

});