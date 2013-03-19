define(['chai', 'try-catch-finally'], function tryCatchFinallyTests(chai, _try) {

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

	});

});