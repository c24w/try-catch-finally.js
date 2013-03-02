describe('Tests', function () {

	var expect = chai.expect,
		_try = window.c24w['try'];

	it('should exist', function () {
		expect(_try).to.be.a('function');
	});

	it('should execute the function passed to try', function (done) {
		_try(done);
	});

	it('should be able to chain catch to try', function () {
		expect(_try().catch).to.be.a('function');
	});

});