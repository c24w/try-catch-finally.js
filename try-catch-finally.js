
define('object-checker',[],function defineObjectChecker() {

	String.prototype.__coerceToObject__ =
	Number.prototype.__coerceToObject__ =
	Boolean.prototype.__coerceToObject__ =
	function __coerceToObject__() { return this; };

	function canCoerceToObject(obj) {
		return obj !== undefined
			&& obj !== null
			&& typeof obj.__coerceToObject__ === 'function';
	}

	function ObjectChecker(subject) { this.subject = subject; }

	ObjectChecker.prototype.valueEquals = function valueEquals(value) {
		return this.subject === value;
	};

	ObjectChecker.prototype.nameEquals = function nameEquals(name) {

		var nameMatchPattern, errorAsString;

		if (typeof name !== 'string') return false;

		nameMatchPattern = new RegExp('^\\[object ' + name + '\\]$');

		errorAsString = Object.prototype.toString.call(this.subject);

		return nameMatchPattern.test(errorAsString);
	};

	ObjectChecker.prototype.instanceOf = function instanceOf(constructor) {

		var subject = this.subject,
			subjectAsObject = canCoerceToObject(subject) ? subject.__coerceToObject__() : subject;

		return (typeof constructor === 'function') && (subjectAsObject instanceof constructor);
	};

	return ObjectChecker;

});

define('try-catch-finally',['object-checker'], function defineTryCatchFinally(ObjectChecker) {

	function errorShouldBeCaught(caughtError, toCatch) {

		caughtError = new ObjectChecker(caughtError);

		return caughtError.valueEquals(toCatch)
			|| caughtError.nameEquals(toCatch)
			|| caughtError.instanceOf(toCatch);
	}

	function TryCatchFinally(tryBlock) {

		var error = {
			raw: undefined,
			exists: false, // undefined can be thrown/caught so cannot check raw for undefined for presence of error
			handled: false
		};

		try {
			tryBlock();
		}
		catch (e) {
			error.raw = e;
			error.exists = true;
		}

		this['catch'] = function (toCatch, handleError) {

			function handleSuccessfulCatch() {
				handleError(error.raw);
				setErrorHandled();
			}

			var numArgs = arguments.length;

			if (numArgs > 0 && error.exists && !error.handled) {

				if (numArgs === 1) { // indiscriminate catch
					handleError = toCatch;
					toCatch = undefined;
					handleSuccessfulCatch();
				}
				else if (errorShouldBeCaught(error.raw, toCatch)) { // specific catch
					handleSuccessfulCatch();
				}

			}

			return this;
		};

		this['finally'] = function (finallyBlock) {
			if (finallyBlock) finallyBlock();
			if (error.exists && !error.handled) throw error.raw;
		};

		function setErrorHandled() { error.handled = true; }

	}

	return function _try(tryBlock) {
		return new TryCatchFinally(tryBlock);
	};

});