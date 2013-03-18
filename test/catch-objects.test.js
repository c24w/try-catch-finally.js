define(['chai', 'tcf', 'catch-test-helpers'], function tryCatchFinallyTests(chai, _try, helpers) {

	var expect = chai.expect,
		batch_test_catches_for = helpers.batch_test_catches_for;

	describe('catch', function () {

		it('should catch TypeError if try block is not a function', function (done) {

			var tryBlocks = [undefined, null, 12345, 'string', false, []],
				typeErrorsCaught = 0;

			function handleTypeError(e) {
				expect(e.name).to.equal('TypeError');
				if (++typeErrorsCaught === tryBlocks.length) done();
			}

			function assert_try_block_throws_type_error(tryBlock) {
				_try(tryBlock).catch(TypeError, handleTypeError);
			}

			tryBlocks.forEach(assert_try_block_throws_type_error);

		});

		describe('literal array', function () {
			batch_test_catches_for([], Array, 'Array');
		});

	});

});