define(['chai', 'try-catch-finally'], function tryCatchFinallyTests(chai, _try) {

	var expect = chai.expect;

	describe('try', function () {

		it('should exist', function () {
			expect(_try).to.be.a('function');
		});

		it('should execute the function passed to try', function (done) {
			_try(done);
		});

	});

});