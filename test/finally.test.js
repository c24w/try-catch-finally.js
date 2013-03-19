define(['chai', 'try-catch-finally'], function tryCatchFinallyTests(chai, _try) {

	var expect = chai.expect;

	describe('finally', function () {

		function doesNotThrow(){}

		it('should exist', function () {
			expect(_try().finally).to.be.a('function');
			expect(_try().catch().finally).to.be.a('function');
		});

		it('should do nothing if arguments are undefined', function () {
			expect(_try(doesNotThrow).catch().finally());
		});

		it('should not be chainable', function () {
			expect(_try(doesNotThrow).finally()).to.be.an('undefined');
		});

		it('should rethrow any uncaught error', function () {

			function tryBlock() { throw new Error('error message'); }

			expect(_try(tryBlock).finally).to.throw(Error, 'error message');

		});

	});

});