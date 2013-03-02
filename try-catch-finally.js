(function (c24w) {

	function TryCatch(tryBlock) {
		var actual, errorHandled;
		try {
			tryBlock();
		}
		catch (e) {
			actual = e;
		}
		this['catch'] = function (expected, callback) {
			if (errorWasCaught() && !errorHandled) {
				if (isUndefined(callback)) {
					callback = expected;
					expected = undefined;
				}
				if (isUndefined(expected) || caughtErrorIsType(expected)) {
					callback(actual);
					errorHandled = true;
				}
			}
			return this;
		};
		this['finally'] = function (callback) {
			if(callback) callback();
			if (errorWasCaught() && !errorHandled) throw actual;
		};
		function isUndefined(subject) { return typeof subject === 'undefined'; }
		function errorWasCaught() { return !isUndefined(actual); }
		function caughtErrorIsType(expected) {
			return actual instanceof expected
				|| actual.constructor.name === expected.name;
		}
	}

	c24w['try'] = function (tryBlock) {
		return new TryCatch(tryBlock);
	};

})(window.c24w = window.c24w || {});