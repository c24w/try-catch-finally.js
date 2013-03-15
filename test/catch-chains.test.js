define(['chai', 'tcf'], function tryCatchFinallyTests(chai, _try) {

	var expect = chai.expect;

	describe('catch chains', function () {

		function assert_catch_specific(toThrow, toCatch, done) {

			function tryBlock() { throw toThrow; }

			function handleError(e) {
				expect(e).to.equal(toThrow);
				done();
			}

			_try(tryBlock).catch(toCatch, handleError).finally();

		}

		function assert_catch_any(toThrow, done) {

			function tryBlock() { throw toThrow; }

			function handleError(e) {
				expect(e).to.equal(toThrow);
				done();
			}

			_try(tryBlock).catch(handleError).finally();

		}

		xdescribe('blah', function () {

			var toThrow;
			var assert_catch_undefined_as = assert_catch_specific.bind(null, toThrow);

			it('should not x', function (done) {

				function tryBlock() { throw {}; }

				_try(tryBlock).catch

			});

		});

	});

});