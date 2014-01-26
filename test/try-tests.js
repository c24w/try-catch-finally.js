describe('try', function () {
	'use strict';
	var assert = chai.assert;

	it('exists', function () {
		assert.isFunction(_try);
	});

	it('calls the try block', function () {
		var fnCalled = false;
		_try(function () { fnCalled = true; });
		assert.isTrue(fnCalled);
	});

});
