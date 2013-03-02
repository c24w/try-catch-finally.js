describe('try-catch-finally tests', function () {

	var expect = chai.expect,
	_try = window.c24w['try'];

	describe('try', function () {

		it('should exist', function () {
			expect(_try).to.be.a('function');
		});

		it('should execute the function passed to try', function (done) {
			_try(done);
		});

		it('should return itself', function () {
			expect(_try()).to.be.an('object');
		});

	});

	describe('catch', function () {

		it('should exist', function () {
			expect(_try().catch).to.be.a('function');
		});

		it('should catch TypeError if try block is undefined', function (done) {
			_try()
			.catch(TypeError, function (e) {
				expect(e.message).to.equal('undefined is not a function');
				done();
			});
		});

		it('should catch literal object when general catch is used', function (done) {
			var throwFunc = function () { throw 'blah'; };
			_try(throwFunc)
			.catch(function (e) {
				expect(e).to.be.a('string');
				done();
			});
		});

		it('should catch constructed object when general catch is used', function (done) {
			var throwFunc = function () { throw new RegExp(); };
			_try(throwFunc)
			.catch(function (e) {
				expect(e).to.be.a('RegExp');
				done();
			});
		});

	});

});