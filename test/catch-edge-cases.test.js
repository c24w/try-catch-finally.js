define(['chai', 'tcf'], function tryCatchFinallyTests(chai, _try) {

	var expect = chai.expect;

	describe('catch', function () {

		it('by name ', function () {
			expect(_try().catch).to.be.a('function');
		});

	});

});