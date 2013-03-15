define(['chai', 'tcf'], function (chai, _try) {

	var expect = chai.expect;

	function assert_catch_any(toThrow, done) {

		function tryBlock() { throw toThrow; }

		function handleError(e) {
			expect(e).to.equal(toThrow);
			done();
		}

		_try(tryBlock).catch(handleError).finally();

	}

	function assert_catch_specific(toThrow, toCatch, done) {

		function tryBlock() { throw toThrow; }

		function handleError(e) {
			expect(e).to.equal(toThrow);
			done();
		}

		_try(tryBlock).catch(toCatch, handleError).finally();

	}

	function batch_test_catches_for(toThrow, constructor, name) {
		var assert_catch_specific_by = assert_catch_specific.bind(null, toThrow),
			parentConstructor = Object;

		it('with indiscriminate catch', function (done) {
			assert_catch_any(toThrow, done);
		});

		it('by constructor', function (done) {
			assert_catch_specific_by(constructor, done);
		});

		it('by name', function (done) {
			assert_catch_specific_by(name, done);
		});

		it('by parent constructor', function (done) {
			assert_catch_specific_by(parentConstructor, done);
		});
	}

	return {
		assert_catch_any: assert_catch_any,
		assert_catch_specific: assert_catch_specific,
		batch_test_catches_for: batch_test_catches_for
	};

});