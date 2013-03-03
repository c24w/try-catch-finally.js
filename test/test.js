var expect = chai.expect,
	_try = window.c24w['try'];

describe('try', function () {

	it('should exist', function () {
		expect(_try).to.be.a('function');
	});

	it('should execute the function passed to try', function (done) {
		_try(done);
	});

	it('should be chainable', function () {
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

	it('should be ignored if arguments are undefined', function () {
		expect(_try().catch());
	});

	it('should be chainable', function () {
		expect(_try().catch(Object, function () {})).to.be.an('object');
	});


	describe('literal object', function () {

		it('with indiscrimiate catch', function (done) {
			function tryBlock() { throw 'blah'; }
			_try(tryBlock)
			.catch(function (e) {
				expect(e).to.be.a('string');
				done();
			});
		});

		it('by constructor', function (done) {
			function tryBlock() { throw 12345; }
			_try(tryBlock)
			.catch(Number, function (e) {
				expect(e).to.be.a('number');
				done();
			});
		});

		it('by name', function (done) {
			function tryBlock() { throw [1,2,3]; }
			_try(tryBlock)
			.catch('Array', function (e) {
				expect(e).to.be.an('array');
				done();
			});
		});

	});

	describe('constucted object', function () {

		it('with indiscrimiate catch', function (done) {
			function tryBlock() { throw new Error(); }
			_try(tryBlock)
			.catch(function (e) {
				expect(e.name).to.equal('Error');
				done();
			});
		});

		it('by constructor', function (done) {
			function tryBlock() { throw new RegExp(); }
			_try(tryBlock)
			.catch(RegExp, function (e) {
				expect(e).to.be.a('regexp');
				done();
			});
		});

		it('by name', function (done) {
			function tryBlock() { throw new Number(12345); }
			_try(tryBlock)
			.catch('Number', function (e) {
				expect(e).to.be.a('number');
				done();
			});
		});

	});

});