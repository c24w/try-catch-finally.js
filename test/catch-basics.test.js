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

			function handleError(e) { throw 'this should not happen'; }

			_try(doesNotThrow).catch(handleError);
		});

	});

});