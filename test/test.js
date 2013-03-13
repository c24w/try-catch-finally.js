define(['chai', 'tcf'], function tryCatchFinallyTests(chai, _try) {

	var expect = chai.expect;

	describe('try', function () {

		it('should exist', function () {
			expect(_try).to.be.a('function');
		});

		it('should execute the function passed to try', function (done) {
			_try(done);
		});

	});

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

		describe('type error with bad try block', function () {

			function assertTypeErrorCaughtFor(tryBlock, done) {
				_try(tryBlock).catch(TypeError, function (e) { done(); });
			}

			it('should catch TypeError if try block is undefined', function (done) {
				assertTypeErrorCaughtFor(undefined, done);
			});

			it('should catch TypeError if try block is null', function (done) {
				assertTypeErrorCaughtFor(null, done);
			});

			it('should catch TypeError if try block is an object', function (done) {
				assertTypeErrorCaughtFor(123, done);
			});

		});

		describe('literal object', function () {

			it('with indiscriminate catch', function (done) {
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

			it('with indiscriminate catch', function (done) {
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
				function tryBlock() { throw new Array(); }
				_try(tryBlock)
				.catch('Array', function (e) {
					expect(e).to.be.an('array');
					done();
				});
			});

		});

	});

	describe('finally', function () {

		it('should exist', function () {
			expect(_try().catch().finally).to.be.a('function');
		});

		it('should do nothing if arguments are undefined', function () {
			expect(_try().catch());
		});

		it('should rethrow TypeError if try block is undefined', function () {
			expect(_try().catch().finally).to.throw(TypeError);
		});

	});

	// check catch callback only expecting one argument?

});